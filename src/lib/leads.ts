import { createHash } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { adminFirestore } from '@/lib/firebase-admin';
import { forwardLeadAsync } from '@/lib/marketing-bridge';

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
  /**
   * Tags to carry into the mailing system alongside the ones its own intake
   * registry applies for this source. Lowercase, `[a-z0-9:-]`, at most five —
   * the receiving end validates and drops anything else.
   */
  tags?: string[];
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

  // Push into the mailing system so this person can actually be nurtured.
  // Single opt-in magnets carry consent: the forms state that signing up means
  // ongoing email and that they can unsubscribe at any time, which is what the
  // consent flag records. Fire-and-forget — the lead is already saved here.
  forwardLeadAsync({
    email,
    name: input.name?.trim() || undefined,
    source: input.source,
    consent: true,
    consentMethod: `magnet:${input.source}`,
    utm: input.utm,
    tags: input.tags,
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

  // Forwarded WITHOUT consent. This magnet uses confirmed opt-in, and someone
  // who has requested a confirmation link has not yet given it — recording
  // consent now would defeat the point of asking twice. They land on the list
  // as a known contact, and markLeadConfirmed grants consent if they click.
  forwardLeadAsync({
    email,
    name: input.name?.trim() || undefined,
    source: input.source,
    consent: false,
    consentMethod: `magnet:${input.source}:pending`,
    utm: input.utm,
    tags: input.tags,
  });
}

/**
 * Marks an address as having clicked the confirmation link. Upserts, so a
 * confirmation still lands even if the pending write failed earlier.
 */
export async function markLeadConfirmed(
  source: LeadSource,
  email: string,
  tags?: string[],
): Promise<void> {
  const normalised = email.trim().toLowerCase();

  // A clicked confirmation link is the strongest consent evidence available,
  // so this is where the mailing system is told they may be emailed. That
  // grant is also what raises `consentGranted` there, which is the trigger a
  // confirmed opt-in nurture sequence starts from — so this call is not merely
  // bookkeeping, it is what actually begins the sequence.
  forwardLeadAsync({
    email: normalised,
    source,
    consent: true,
    consentMethod: `magnet:${source}:confirmed`,
    tags,
  });

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
