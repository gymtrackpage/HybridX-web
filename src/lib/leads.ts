import { FieldValue } from 'firebase-admin/firestore';
import { adminFirestore } from '@/lib/firebase-admin';

export type LeadSource = 'free_hyrox_plan' | 'sign_up' | 'build_a_bigger_engine';

export interface LeadInput {
  source: LeadSource;
  email: string;
  name?: string;
  /** Free-form extra fields specific to the source (event, eventDate, tag, etc). */
  extra?: Record<string, unknown>;
  utm?: Record<string, string>;
  userAgent?: string;
  ip?: string;
}

/**
 * Single write path for every lead magnet on the site. Throws on failure —
 * callers decide whether that should surface to the user or just be logged,
 * but it must never be swallowed silently.
 */
export async function saveLead(input: LeadInput): Promise<void> {
  const email = input.email.trim().toLowerCase();

  await adminFirestore.collection('leads').add({
    source: input.source,
    email,
    name: input.name?.trim() || null,
    extra: input.extra || {},
    utm: input.utm || {},
    userAgent: input.userAgent || '',
    ip: input.ip || '',
    createdAt: FieldValue.serverTimestamp(),
  });
}
