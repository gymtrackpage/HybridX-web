// Lightweight, typed GA4 / gtag event helper. No-ops if gtag is absent
// (e.g. during SSR, or if a consent/ad-blocker has stripped it).
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, params);
  }
}
