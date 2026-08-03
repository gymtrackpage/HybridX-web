import nodemailer from 'nodemailer';
import { Resend } from 'resend';
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
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
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
 * Single entry point for all outbound email. Routes to Resend when
 * RESEND_API_KEY is set, otherwise falls back to SMTP. Centralising here means
 * From identity, Reply-To, plain-text, and unsubscribe headers are applied
 * consistently to every message we send.
 */
export async function sendEmail(opts: SendEmailOptions): Promise<void> {
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
