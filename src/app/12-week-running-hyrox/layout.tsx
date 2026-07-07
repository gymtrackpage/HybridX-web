import type { Metadata } from 'next';

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  alternates: { canonical: '/12-week-running-hyrox' },
  title: 'Free 12-Week Running Plan for Hyrox | Interactive',
  description:
    'A free, interactive 12-week hybrid running plan built for Hyrox — threshold sessions, intervals, long runs, and compromised running, week by week, with a built-in pace calculator.',
  keywords: [
    'hyrox running plan',
    'running plan for hyrox',
    '12 week running plan',
    'compromised running plan',
    'hybrid running plan',
    'faster running for hyrox',
  ],
  openGraph: {
    title: 'Free 12-Week Running Plan for Hyrox',
    description:
      'Interactive week-by-week running plan for Hyrox athletes — threshold, intervals, long runs, and compromised running. Free, no sign-up.',
    type: 'website',
    url: '/12-week-running-hyrox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 12-Week Running Plan for Hyrox',
    description:
      'Interactive week-by-week running plan for Hyrox athletes — free, no sign-up.',
  },
};

export default function TwelveWeekRunningHyroxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
