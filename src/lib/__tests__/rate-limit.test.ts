import { describe, it, expect, vi, afterEach } from 'vitest';
import { CAPTURE_LIMIT, checkRateLimit, isCaptureRateLimited } from '../rate-limit';

afterEach(() => vi.useRealTimers());

describe('checkRateLimit', () => {
  it('allows up to the cap and then refuses', () => {
    const key = `k-${Math.random()}`;
    for (let i = 0; i < 3; i++) expect(checkRateLimit(key, 60_000, 3).allowed).toBe(true);
    expect(checkRateLimit(key, 60_000, 3).allowed).toBe(false);
  });

  it('reports how long until the window reopens', () => {
    const key = `k-${Math.random()}`;
    checkRateLimit(key, 60_000, 1);
    const blocked = checkRateLimit(key, 60_000, 1);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
    expect(blocked.retryAfterMs).toBeLessThanOrEqual(60_000);
  });

  it('keys are independent, so one caller cannot exhaust another', () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    checkRateLimit(a, 60_000, 1);
    expect(checkRateLimit(a, 60_000, 1).allowed).toBe(false);
    expect(checkRateLimit(b, 60_000, 1).allowed).toBe(true);
  });

  it('reopens once the window has passed', () => {
    vi.useFakeTimers();
    const key = `k-${Math.random()}`;
    checkRateLimit(key, 1000, 1);
    expect(checkRateLimit(key, 1000, 1).allowed).toBe(false);

    vi.advanceTimersByTime(1500);
    expect(checkRateLimit(key, 1000, 1).allowed).toBe(true);
  });
});

describe('isCaptureRateLimited', () => {
  it('lets a human through and stops a script', () => {
    const ip = `1.2.3.${Math.floor(Math.random() * 250)}`;
    for (let i = 0; i < CAPTURE_LIMIT; i++) {
      expect(isCaptureRateLimited(ip, 'test'), `submission ${i + 1}`).toBe(false);
    }
    expect(isCaptureRateLimited(ip, 'test')).toBe(true);
  });

  it('separates buckets, so filling one form does not lock out another', () => {
    // Three funnels shared one limiter before this was consolidated; hitting
    // the race-card limit would have blocked the VO2max guide too.
    const ip = `9.9.9.${Math.floor(Math.random() * 250)}`;
    for (let i = 0; i < CAPTURE_LIMIT; i++) isCaptureRateLimited(ip, 'race-card');

    expect(isCaptureRateLimited(ip, 'race-card')).toBe(true);
    expect(isCaptureRateLimited(ip, 'engine-guide')).toBe(false);
  });

  it('never limits an unresolved IP', () => {
    // Behind a proxy that strips the header, limiting on the literal "unknown"
    // would throttle every visitor as though they were one person.
    for (let i = 0; i < CAPTURE_LIMIT * 3; i++) {
      expect(isCaptureRateLimited('unknown', 'test')).toBe(false);
    }
    expect(isCaptureRateLimited('', 'test')).toBe(false);
  });
});
