import { createHash } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { adminFirestore } from '@/lib/firebase-admin';

export type LeadSource =
  | 'free_hyrox_plan'
  | 'sign_up'
  | 'build_a_bigger_engine'
  | 'hyrox_rules_card';

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

/**
 * Deterministic document id for one address on one magnet. Emails can contain
 * characters Firestore rejects in ids, so the address is hashed rather than
 * used directly.
 */
function leadDocId(source: LeadSource, email: string): string {
  const hash = createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
  return `${source}__${hash}`;
}

/**
 * Write path for confirmed-opt-in magnets. Unlike saveLead this upserts on
 * (source, email), so someone who requests the card twice produces one record
 * rather than two — which keeps the confirmation rate honest.
 */
export async function upsertPendingLead(input: LeadInput): Promise<void> {
  const email = input.email.trim().toLowerCase();

  await adminFirestore
    .collection('leads')
    .doc(leadDocId(input.source, email))
    .set(
      {
        source: input.source,
        email,
        name: input.name?.trim() || null,
        extra: input.extra || {},
        utm: input.utm || {},
        userAgent: input.userAgent || '',
        ip: input.ip || '',
        confirmed: false,
        createdAt: FieldValue.serverTimestamp(),
      },
      // Never let a repeat request downgrade an already-confirmed lead.
      { mergeFields: ['source', 'email', 'name', 'extra', 'utm', 'userAgent', 'ip', 'createdAt'] }
    );
}

/**
 * Marks an address as having clicked the confirmation link. Upserts, so a
 * confirmation still lands even if the pending write failed earlier.
 */
export async function markLeadConfirmed(source: LeadSource, email: string): Promise<void> {
  const normalised = email.trim().toLowerCase();

  await adminFirestore
    .collection('leads')
    .doc(leadDocId(source, normalised))
    .set(
      {
        source,
        email: normalised,
        confirmed: true,
        confirmedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
}
