
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TreadmillTcxGeneratorForm from '@/components/calculators/TreadmillTcxGeneratorForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Garmin TCX Generator for Treadmill Workouts | HybridX Hub',
  description:
    'Rebuild treadmill interval sessions your watch mangled. Define intervals, paces and inclines, keep your real heart rate, and export a TCX file Garmin Connect and Strava accept — free and fully in your browser.',
  keywords: [
    'tcx generator',
    'garmin tcx file creator',
    'treadmill workout garmin connect',
    'create tcx file online',
    'treadmill interval workout tracker',
    'fix treadmill distance garmin',
    'manual activity file garmin',
  ],
  openGraph: {
    title: 'Free Garmin TCX Generator for Treadmill Workouts',
    description:
      'Rebuild the treadmill session your watch should have recorded and export a TCX file for Garmin Connect or Strava — splits, inclines and real heart rate included.',
    url: 'https://hybridx.club/calculators/garmin-tcx-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Garmin TCX Generator for Treadmill Workouts',
    description:
      'Rebuild the treadmill session your watch mangled and export a Garmin-ready TCX file, real heart rate included.',
  },
};

export default function GarminTcxGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
              Treadmill TCX Generator
            </h1>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Your watch lost the plot on the treadmill. Rebuild the session it should have recorded — define the
              intervals, paces and inclines you actually ran, keep your real heart rate, and export a TCX file that
              Garmin Connect and Strava read as a real running activity, splits and all.
            </p>
          </div>

          <TreadmillTcxGeneratorForm />

          <div className="mt-16 max-w-4xl mx-auto space-y-8 text-left">
            <div>
              <h2 className="text-2xl font-bold font-headline text-primary mb-4">
                Why Treadmill Runs Get Mangled
              </h2>
              <p className="text-muted-foreground font-body">
                Indoors, your watch has no GPS to lean on, so it estimates pace and distance from wrist movement.
                For steady jogging that&apos;s often close enough — but interval sessions break the model. Rapid
                changes between sprint and recovery paces, holding the handrail, or a treadmill calibrated
                differently from your watch can leave you with a recorded 6&nbsp;km when the belt clearly read
                10&nbsp;km. This tool lets you rebuild the session from what the treadmill console actually showed,
                so your training log, weekly mileage, and pace trends stay honest.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-headline text-primary mb-4">How to Use the Generator</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground font-body">
                <li>Pick a starting template — time intervals, distance intervals, steady state — or build from blank.</li>
                <li>Set each segment&apos;s duration or distance, pace, and treadmill incline. Use repeat blocks for interval sets.</li>
                <li>
                  Optionally attach the GPX or TCX file your watch recorded: the heart rate and cadence stream is
                  lifted out and re-timed onto the rebuilt session, while its wrong pace and distance are discarded.
                </li>
                <li>Check the effort profile and lap splits, set the session name and start time, then export.</li>
                <li>
                  Upload the file in Garmin Connect via <em>Import Data</em> (top-right cloud icon), or directly to
                  Strava. Each segment appears as its own lap.
                </li>
              </ol>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-headline text-primary mb-4">Frequently Asked Questions</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-1">Will Garmin Connect accept the file?</h3>
                  <p className="text-muted-foreground font-body">
                    Yes — the export is a standard TCX (Training Center XML) running activity with laps, trackpoints,
                    speed, elevation, and optional heart rate, the same format Garmin devices have exported for
                    years. Note that manually imported activities don&apos;t count toward Garmin badges or challenges,
                    and won&apos;t update device-computed metrics like VO2max.
                  </p>
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-1">Should I delete the original activity?</h3>
                  <p className="text-muted-foreground font-body">
                    If your watch already synced the mangled version, delete it before or after importing the rebuilt
                    one, otherwise your weekly totals will double-count the session.
                  </p>
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-1">Is my data uploaded anywhere?</h3>
                  <p className="text-muted-foreground font-body">
                    No. Everything — the workout builder, the file parsing, and the TCX generation — runs entirely in
                    your browser. Your watch file and workout never leave your device.
                  </p>
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-1">How is incline handled?</h3>
                  <p className="text-muted-foreground font-body">
                    Each segment&apos;s incline drives the elevation written to every trackpoint, so a hill session
                    shows real climb in Garmin Connect and Strava. Total ascent appears in the session profile as you
                    build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
