import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { getSuppressionState } from '@/lib/marketing-bridge';
import dotenv from 'dotenv';

// Load environment variables from .env file for local development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' });
}

/**
 * Default From identity. This MUST be on a domain you have authenticated
 * (SPF + DKIM + DMARC) in your email provider. The site lives on hybridx.club,
 * so the From domain must be hybridx.club (or a subdomain like mail.hybridx.club)
 * for inbox placement. A mismatched From domain is a top cause of Gmail spam.
 *
 * Using a real, monitored mailbox (hello@) rather than noreply@ also improves
 * trust and engagement signals.
 */
export const EMAIL_FROM =
  process.env.EMAIL_FROM || '"HybridX" <info@train.hybridx.club>';

/** Where replies go. Keep this a real, monitored inbox. */
export const EMAIL_REPLY_TO =
  process.env.EMAIL_REPLY_TO || 'training@hybridx.club';

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export interface SendEmailOptions {
  to: string;
  /**
   * Skip the shared suppression check. Only for internal diagnostics that need
   * to prove the transport works regardless of list state — never for anything
   * a visitor receives.
   */
  ignoreSuppression?: boolean;
  subject: string;
  html: string;
  /** Plain-text alternative. Always provide one: HTML-only mail is a spam signal. */
  text: string;
  from?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
  /**
   * Full List-Unsubscribe header value, e.g.
   * "<https://hybridx.club/unsubscribe?e=...>, <mailto:unsubscribe@hybridx.club>".
   * Strongly recommended for any marketing/list mail (Gmail & Yahoo bulk rules).
   */
  listUnsubscribe?: string;
  /**
   * Set true only when listUnsubscribe contains an HTTPS URL that accepts a POST.
   * Enables one-click unsubscribe (List-Unsubscribe-Post).
   */
  oneClickUnsubscribe?: boolean;
}

// ── Resend (preferred) ─────────────────────────────────────────────────────

let resendClient: Resend | null = null;
function getResend(): Resend | null {
  // .trim() matters: secrets set from a file or piped on stdin routinely pick
  // up a trailing newline, and the key is then rejected as invalid. That
  // failure is near-invisible — the request never authenticates, so it does
  // not even appear in the Resend dashboard's logs.
  const key = process.env.RESEND_API_KEY?.trim();
  if (!resendClient && key) {
    resendClient = new Resend(key);
  }
  return resendClient;
}

/**
 * Shape of the configured Resend key, for diagnostics. Reports only what is
 * needed to spot a malformed value — never enough to use it.
 */
export function describeResendKey(): {
  present: boolean;
  looksLikeResendKey: boolean;
  hadSurroundingWhitespace: boolean;
  length: number;
} | null {
  const raw = process.env.RESEND_API_KEY;
  if (!raw) return { present: false, looksLikeResendKey: false, hadSurroundingWhitespace: false, length: 0 };
  const trimmed = raw.trim();
  return {
    present: true,
    looksLikeResendKey: trimmed.startsWith('re_'),
    hadSurroundingWhitespace: raw !== trimmed,
    length: trimmed.length,
  };
}

// ── SMTP / nodemailer (fallback) ───────────────────────────────────────────

function hasSmtpConfig(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD
  );
}

let transporter: nodemailer.Transporter | null = null;
function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    if (!hasSmtpConfig()) {
      // Development convenience only. jsonTransport serialises the message and
      // reports success without sending, so the app is usable locally without
      // mail credentials. sendEmail() refuses to use this in production.
      return nodemailer.createTransport({ jsonTransport: true });
    }

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export type EmailProvider = 'resend' | 'smtp' | 'none';

/**
 * Which transport outbound mail will actually use. Exposed so the admin email
 * diagnostic and the error logs agree on what was attempted — "it didn't
 * send" is not a diagnosis, "Resend rejected the From domain" is.
 */
export function getEmailProvider(): EmailProvider {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (hasSmtpConfig()) return 'smtp';
  return 'none';
}

function buildHeaders(opts: SendEmailOptions): Record<string, string> | undefined {
  const headers: Record<string, string> = {};
  if (opts.listUnsubscribe) {
    headers['List-Unsubscribe'] = opts.listUnsubscribe;
    // One-click only valid when an HTTPS endpoint is present.
    if (opts.oneClickUnsubscribe) {
      headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
    }
  }
  return Object.keys(headers).length ? headers : undefined;
}

/**
 * Single entry point for all outbound email.
 *
 * Transport is Brevo SMTP, the same relay and sending domain the app
 * (app.hybridx.club) uses. The two properties were previously on different
 * providers with separate suppression lists, which meant an unsubscribe on one
 * was invisible to the other and reputation was being built in two places for
 * one brand.
 *
 * The Resend path is retained as a rollback: getEmailProvider() prefers it
 * whenever RESEND_API_KEY is present, so unsetting the secret is the switch and
 * re-setting it is the way back.
 *
 * Centralising here means From identity, Reply-To, plain-text, unsubscribe
 * headers and the shared suppression check apply to every message.
 */
export async function sendEmail(opts: SendEmailOptions): Promise<void> {
  // One suppression list across both properties. Checked here rather than at
  // each call site so nothing can bypass it by accident.
  //
  // Only a spam complaint blocks the send. Everything this site sends is
  // something the recipient asked for seconds earlier — a guide, a
  // confirmation link — and withholding that because they once unsubscribed
  // from a campaign would fail the person while solving nothing. A complaint
  // is different: mailing a complainant again endangers delivery for every
  // other recipient on a domain both properties share.
  //
  // Fails open. If the bridge is unreachable the visitor still gets the thing
  // they requested; the alternative is an outage in one service silently
  // breaking lead magnets in another.
  if (!opts.ignoreSuppression) {
    const state = await getSuppressionState(opts.to);
    if (state.complained) {
      console.warn('[email] refusing to send: recipient previously reported spam');
      return;
    }
  }

  const from = opts.from || EMAIL_FROM;
  const replyTo = opts.replyTo || EMAIL_REPLY_TO;
  const headers = buildHeaders(opts);
  const provider = getEmailProvider();

  // Refuse to silently discard mail in production. jsonTransport reports
  // success without sending, which previously turned a misconfigured deploy
  // into invisible data loss — subscribers who never got what they asked for.
  if (provider === 'none') {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'No email transport configured: set RESEND_API_KEY, or all of SMTP_HOST, ' +
          'SMTP_PORT, SMTP_USER and SMTP_PASSWORD.'
      );
    }
    console.warn('[email] No transport configured — message discarded (development only).');
  }

  if (provider === 'resend') {
    const resend = getResend();
    if (!resend) throw new Error('Resend client could not be created from RESEND_API_KEY.');

    const { error } = await resend.emails.send({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo,
      headers,
      attachments: opts.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
        contentType: a.contentType,
      })),
    });
    if (error) {
      // Include the From identity: an unverified sending domain is the most
      // common cause, and the message alone does not always say which.
      throw new Error(
        `Resend rejected the send (from: ${from}): ${error.name} - ${error.message}`
      );
    }
    return;
  }

  // SMTP.
  const tx = getTransporter();
  try {
    await tx.sendMail({
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo,
      headers,
      attachments: opts.attachments,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `SMTP send failed via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} — ${detail}`
    );
  }
}
