'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { SITE_CONFIG } from '@/lib/seo';
import { sendEngineGuideEmail } from '@/lib/email/send-engine-guide';

// Public path to the lead magnet (served from /public).
const PDF_PATH = '/build-a-bigger-engine/HybridX-Build-A-Bigger-Engine-VO2max-Guide.pdf';

// Tag the ESP / sheet uses to route these leads into the VO2max nurture sequence.
// Kept internal: a 'use server' module may only export async functions.
const ESP_TAG = 'vo2max-guide';

export type EngineLeadState = {
  status: '' | 'success' | 'error';
  message: string;
  /** Absolute URL to the guide, returned so the success state can offer a direct download. */
  pdfUrl?: string;
};

const LeadSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'That email looks incomplete. Please check and try again.' }),
  firstName: z.string().trim().max(80).optional(),
});

// Very small in-memory rate limiter. App Hosting runs a single instance here, so this
// is a cheap first line of defence. Swap for Firestore / Redis if traffic grows.
const RATE_LIMIT = 8; // submissions
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour per IP
const hits = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  if (!ip || ip === 'unknown') return false;
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

/**
 * Best-effort lead persistence. Reuses the existing Google Apps Script endpoint so Jon
 * does not need to stand up new infrastructure. The script can branch on `magnet`/`tag`
 * to route these into a dedicated sheet or tab. Never blocks the user on failure.
 */
async function storeLead(payload: Record<string, unknown>): Promise<void> {
  const scriptUrl = process.env.NEXT_PUBLIC_HYROX_SCRIPT_URL;
  if (!scriptUrl) return;
  try {
    await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('[engine-lead] Failed to store lead:', error);
  }
}

export async function submitEngineLead(
  _prevState: EngineLeadState,
  formData: FormData
): Promise<EngineLeadState> {
  // Honeypot: if the hidden "company" field is filled, silently drop (pretend success).
  const honeypot = (formData.get('company') as string) || '';
  if (honeypot.trim() !== '') {
    return { status: 'success', message: '', pdfUrl: `${SITE_CONFIG.url}${PDF_PATH}` };
  }

  const parsed = LeadSchema.safeParse({
    email: formData.get('email'),
    firstName: formData.get('firstName') || undefined,
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.errors[0]?.message || 'Please enter a valid email address.',
    };
  }

  const { email, firstName } = parsed.data;

  // Gather request metadata for abuse auditing + rate limiting.
  const hdrs = await headers();
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    hdrs.get('x-real-ip') ||
    'unknown';
  const userAgent = hdrs.get('user-agent') || '';

  if (isRateLimited(ip)) {
    return {
      status: 'error',
      message: 'Too many attempts. Please wait a little while and try again.',
    };
  }

  const source = (formData.get('src') as string) || 'direct';
  const utm = {
    source: (formData.get('utm_source') as string) || '',
    medium: (formData.get('utm_medium') as string) || '',
    campaign: (formData.get('utm_campaign') as string) || '',
    content: (formData.get('utm_content') as string) || '',
    term: (formData.get('utm_term') as string) || '',
  };

  const pdfUrl = `${SITE_CONFIG.url}${PDF_PATH}`;

  // 1) Persist the lead (best effort, never blocks delivery).
  await storeLead({
    type: 'lead',
    magnet: 'build-a-bigger-engine',
    tag: ESP_TAG,
    email,
    firstName: firstName || '',
    source,
    utm,
    userAgent,
    createdAt: new Date().toISOString(),
  });

  // 2) Deliver the guide. This is the critical action the user is waiting on.
  try {
    await sendEngineGuideEmail({
      to: email,
      pdfUrl,
      siteUrl: SITE_CONFIG.url,
      firstName,
    });
  } catch (error) {
    console.error('[engine-lead] Failed to send guide email:', error);
    return {
      status: 'error',
      message:
        'We could not send your guide just now. Please try again in a moment, or email us if it keeps happening.',
    };
  }

  return {
    status: 'success',
    message: '',
    pdfUrl,
  };
}
