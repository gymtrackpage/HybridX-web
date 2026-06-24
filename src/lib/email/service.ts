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
  process.env.EMAIL_FROM || '"HybridX" <info@training.hybridx.club>';

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

let transporter: nodemailer.Transporter | null = null;
function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD
    ) {
      console.error('Missing SMTP environment variables');
      // jsonTransport does not send; it just serialises the message so the app
      // does not crash in environments without mail configured.
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

  const resend = getResend();
  if (resend) {
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
      throw new Error(`Resend send failed: ${error.name} - ${error.message}`);
    }
    return;
  }

  // Fallback: SMTP.
  const tx = getTransporter();
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
}
