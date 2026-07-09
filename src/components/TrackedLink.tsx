'use client';

import Link from 'next/link';
import { forwardRef, useEffect, useState } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { trackEvent } from '@/lib/analytics';

interface TrackedLinkProps extends ComponentPropsWithRef<typeof Link> {
  /** Omit to render a plain, untracked link (useful in shared/looped markup). */
  event?: string;
  eventParams?: Record<string, unknown>;
}

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

/**
 * Appends the visitor's current UTM params onto an absolute (cross-domain)
 * URL — e.g. a CTA into app.hybridx.club — so trial signups on the app can
 * be attributed back to the marketing page/campaign that drove them.
 */
function withForwardedUtms(href: string): string {
  const current = new URLSearchParams(window.location.search);
  if (!UTM_PARAMS.some((key) => current.has(key))) return href;
  const url = new URL(href);
  for (const key of UTM_PARAMS) {
    const value = current.get(key);
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}

/**
 * Drop-in replacement for next/link that fires a GA4 event on click, and —
 * for absolute (cross-domain) hrefs — forwards UTM params so attribution
 * survives the jump to the app.
 *
 * The forwarded href is only computed client-side after mount (not during
 * the initial render) so it matches server output and avoids a hydration
 * mismatch on the `href` attribute.
 */
const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({ event, eventParams, onClick, href, ...props }, ref) => {
    const isAbsolute = typeof href === 'string' && /^https?:\/\//.test(href);
    const [resolvedHref, setResolvedHref] = useState(href);

    useEffect(() => {
      if (isAbsolute) setResolvedHref(withForwardedUtms(href as string));
    }, [href, isAbsolute]);

    return (
      <Link
        {...props}
        href={resolvedHref}
        ref={ref}
        onClick={(e) => {
          if (event) trackEvent(event, eventParams);
          onClick?.(e);
        }}
      />
    );
  }
);
TrackedLink.displayName = 'TrackedLink';

export default TrackedLink;
