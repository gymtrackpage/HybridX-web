// src/lib/rate-limit.ts
//
// Sliding-window in-memory rate limiter, shared by every capture form.
//
// This replaces three verbatim copies — one per funnel action — each of which
// kept its own Map and pruned nothing. Entries were only ever reset when the
// same IP came back after its window expired, so an address that submitted once
// and never returned stayed resident for the life of the process. A scripted
// probe rotating source addresses would grow the map without bound.
//
// The implementation mirrors `src/lib/rate-limit.ts` in the app deliberately:
// the two projects should behave the same way under abuse, and a limiter that
// differs between them is one more thing to reason about twice.
//
// NOTE: state is per-process. That is sufficient while App Hosting runs this
// backend at maxInstances: 1, and stops being sufficient the moment it does
// not — every limit silently multiplies by the instance count. Moving to a
// Firestore-backed limiter is a prerequisite for scaling up, not a follow-up.

interface Window {
  count: number;
  resetAt: number; // epoch ms
}

const store = new Map<string, Window>();

// Prune expired entries periodically, so the map is bounded by *active* keys
// rather than by every key ever seen.
let lastPrune = Date.now();
function maybePrune() {
  const now = Date.now();
  if (now - lastPrune < 60_000) return;
  lastPrune = now;
  for (const [key, w] of store) {
    if (now >= w.resetAt) store.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

/**
 * Check whether `identifier` is within the allowed rate.
 *
 * @param identifier Unique key, e.g. `"funnel:1.2.3.4"`.
 * @param windowMs   Rolling window size in milliseconds.
 * @param max        Maximum requests allowed within the window.
 */
export function checkRateLimit(
  identifier: string,
  windowMs: number,
  max: number,
): RateLimitResult {
  maybePrune();
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now >= entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfterMs: 0 };
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remaining: max - entry.count, retryAfterMs: 0 };
}

/** Submissions allowed per IP per hour on a public capture form. */
export const CAPTURE_LIMIT = 8;
export const CAPTURE_WINDOW_MS = 60 * 60 * 1000;

/**
 * The gate every funnel form uses.
 *
 * An unresolved IP is never limited: behind a proxy that strips the header,
 * limiting on the string `"unknown"` would throttle every visitor as though
 * they were one person.
 */
export function isCaptureRateLimited(ip: string, bucket = 'capture'): boolean {
  if (!ip || ip === 'unknown') return false;
  return !checkRateLimit(`${bucket}:${ip}`, CAPTURE_WINDOW_MS, CAPTURE_LIMIT).allowed;
}
