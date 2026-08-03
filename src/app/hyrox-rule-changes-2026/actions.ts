'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { SITE_CONFIG } from '@/lib/seo';
import { sendRaceDayCardEmail } from '@/lib/email/send-race-day-card';
import { saveLead } from '@/lib/leads';

// Public path to the lead magnet (served from /public).
const PDF_PATH = '/hyrox-rule-changes-2026/hyrox-race-day-card-fold.pdf';
const PAGE_PATH = '/hyrox-rule-changes-2026';

// Tag the ESP / sheet uses to route these leads into the race day nurture
// sequence, and to segment them later. Someone taking a rules card has a race
// booked, so this cohort behaves differently to the general list.
// Kept internal: a 'use server' module may only export async functions.
const ESP_TAG = 'hyrox-rules-card-2026';

export type RaceCardLeadState = {
  status: '' | 'success' | 'error';
  message: string;
  /** Absolute URL to the card, returned so the success state can offer a direct download. */
  pdfUrl?: string;
};

const LeadSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'That email looks incomplete. Please check and try again.' }),
  firstName: z.string().trim().max(80).optional(),
  /** Optional — powers the race-date framing in the follow-up sequence. */
  raceDate: z.string().trim().max(20).optional(),
});

// Very small in-memory rate limiter, matching the VO2max funnel. App Hosting
// runs a single instance here, so this is a cheap first line of defence.
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

export async function submitRaceCardLead(
  _prevState: RaceCardLeadState,
  formData: FormData
): Promise<RaceCardLeadState> {
  const pdfUrl = `${SITE_CONFIG.url}${PDF_PATH}`;

  // Honeypot: if the hidden "company" field is filled, silently drop (pretend success).
  const honeypot = (formData.get('company') as string) || '';
  if (honeypot.trim() !== '') {
    return { status: 'success', message: '', pdfUrl };
  }

  const parsed = LeadSchema.safeParse({
    email: formData.get('email'),
    firstName: formData.get('firstName') || undefined,
    raceDate: formData.get('raceDate') || undefined,
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.errors[0]?.message || 'Please enter a valid email address.',
    };
  }

  const { email, firstName, raceDate } = parsed.data;

  // Request metadata for abuse auditing + rate limiting.
  const hdrs = await headers();
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || hdrs.get('x-real-ip') || 'unknown';
  const userAgent = hdrs.get('user-agent') || '';

  if (isRateLimited(ip)) {
    return {
      status: 'error',
      message: 'Too many attempts. Please wait a little while and try again.',
    };
  }

  // Which channel sent them — gyms, social or communities. Forwarded from the
  // page's query string so the three distribution channels stay separable.
  const src = (formData.get('src') as string) || 'direct';
  const utm = {
    source: (formData.get('utm_source') as string) || '',
    medium: (formData.get('utm_medium') as string) || '',
    campaign: (formData.get('utm_campaign') as string) || '',
    content: (formData.get('utm_content') as string) || '',
    term: (formData.get('utm_term') as string) || '',
  };

  // 1) Persist the lead (best effort, never blocks delivery).
  try {
    await saveLead({
      source: 'hyrox_rules_card',
      email,
      name: firstName,
      extra: {
        magnet: 'hyrox-race-day-card',
        tag: ESP_TAG,
        src,
        raceDate: raceDate || null,
      },
      utm,
      ip,
      userAgent,
    });
  } catch (error) {
    console.error('[race-card-lead] Failed to save lead:', error);
  }

  // 2) Deliver the card. This is the action the visitor is waiting on.
  try {
    await sendRaceDayCardEmail({
      to: email,
      pdfUrl,
      pageUrl: `${SITE_CONFIG.url}${PAGE_PATH}`,
      siteUrl: SITE_CONFIG.url,
      firstName,
    });
  } catch (error) {
    console.error('[race-card-lead] Failed to send card email:', error);
    return {
      status: 'error',
      message:
        'We could not email your card just now. Please try again in a moment, or email us if it keeps happening.',
    };
  }

  return { status: 'success', message: '', pdfUrl };
}
