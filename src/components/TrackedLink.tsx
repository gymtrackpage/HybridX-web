'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { trackEvent } from '@/lib/analytics';

interface TrackedLinkProps extends ComponentPropsWithRef<typeof Link> {
  /** Omit to render a plain, untracked link (useful in shared/looped markup). */
  event?: string;
  eventParams?: Record<string, unknown>;
}

/** Drop-in replacement for next/link that fires a GA4 event on click. */
const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({ event, eventParams, onClick, ...props }, ref) => {
    return (
      <Link
        {...props}
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
