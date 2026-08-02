import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';
import { Button } from '@/components/ui/button';
import {
  AlertOctagon,
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronRight,
  Clock,
  Footprints,
  Info,
  ThumbsUp,
  Timer,
  Users,
  XCircle,
} from 'lucide-react';
import {
  createFAQSchema,
  createArticleSchema,
  createBreadcrumbSchema,
  createWebApplicationSchema,
} from '@/lib/seo';
import {
  RULE_FAQS,
  LAP_CONFIGS,
  DOUBLES_STANDARDS,
  RELAY_FINISH_STEPS,
  countBySeverity,
} from '@/lib/hyrox-rules-2026';
import RuleTriageBoard from '@/components/hyrox-rules/RuleTriageBoard';
import PenaltyCalculator from '@/components/hyrox-rules/PenaltyCalculator';
import StationDqMap from '@/components/hyrox-rules/StationDqMap';
import DoublesGapMeter from '@/components/hyrox-rules/DoublesGapMeter';
import RaceDayChecklist from '@/components/hyrox-rules/RaceDayChecklist';
import StickySectionNav from '@/components/hyrox-rules/StickySectionNav';
import ShareRow from '@/components/hyrox-rules/ShareRow';

const PATH = '/hyrox-rule-changes-2026';
const PUBLISHED = '2026-08-02';

export const metadata: Metadata = {
  title: 'HYROX Rule Changes 2026/27 — What Actually Matters (Interactive Guide)',
  description:
    'Every 2026/27 HYROX rule change, triaged by what it costs you. An incomplete station is now a disqualification, missed run laps have a published penalty scale, and the doubles gap is down to 10 seconds. Includes a free penalty calculator.',
  keywords: [
    'hyrox rule changes 2026',
    'hyrox rules 2026/27',
    'hyrox 2027 rules',
    'hyrox disqualification rules',
    'hyrox penalties',
    'hyrox missed lap penalty',
    'hyrox sandbag rule',
    'hyrox doubles rules',
    'hyrox relay rules',
    'hyrox rulebook summary',
    'hyrox wall balls 100 reps',
  ],
  alternates: { canonical: `https://hybridx.club${PATH}` },
  openGraph: {
    title: 'HYROX Rule Changes 2026/27 — What Actually Matters',
    description:
      'One change this season can end your race outright. Every 2026/27 rule change, triaged by what it costs you, plus an interactive penalty calculator.',
    type: 'article',
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HYROX Rule Changes 2026/27 — What Actually Matters',
    description:
      'One change this season can end your race outright. Every 2026/27 rule change, triaged by what it costs you.',
  },
};

const articleSchema = createArticleSchema({
  title: 'The 2026/27 HYROX Rule Changes: What Actually Matters',
  description:
    'A practical reading of the 2026/27 HYROX Singles, Doubles and Team Relay rulebooks, triaged into what will cost you the race, what will cost you time, and what is worth knowing.',
  url: PATH,
  datePublished: PUBLISHED,
});

const faqSchema = createFAQSchema(RULE_FAQS);

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'HYROX Rule Changes 2026/27', url: PATH },
]);

const toolSchema = createWebApplicationSchema({
  name: 'HYROX 2026/27 Penalty Calculator',
  description:
    'Free interactive calculator that applies the 2026/27 HYROX penalty scales — missed run laps, sandbag infringements, chalk, water and incomplete stations — to your target finish time.',
  url: `${PATH}#penalty-calculator`,
  keywords: ['hyrox penalty calculator', 'hyrox missed lap penalty', 'hyrox disqualification'],
});

const heroStats = [
  { value: '8/8', label: 'stations must be completed in full', tone: 'dq' as const },
  { value: '7 min', label: 'worst-case missed lap penalty', tone: 'time' as const },
  { value: '15 sec', label: 'per sandbag infringement, no warnings', tone: 'time' as const },
  { value: '10 sec', label: 'maximum doubles gap', tone: 'time' as const },
];

const toneStyles = {
  dq: 'text-rose-400',
  time: 'text-accent',
};

export default function HyroxRuleChanges2026() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Script
        id="rules-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="rules-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="rules-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="rules-tool-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <Header />

      <main>
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-black py-16 text-white md:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fadb5c 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.18) 0%, transparent 70%)' }}
          />
          <div className="container relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-1.5 font-headline text-sm font-semibold text-accent">
                2026/27 Season
              </span>
              <span className="font-body text-sm text-white/50">
                Singles · Doubles · Team Relay · updated August 2026
              </span>
            </div>

            <h1 className="mb-6 font-headline text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              The 2026/27 HYROX rule changes:{' '}
              <span className="text-accent">what actually matters</span>
            </h1>

            <p className="mb-8 max-w-3xl font-body text-lg text-white/75 md:text-xl">
              One change this season can end your race outright, and it is the sort of thing a tired
              athlete does without thinking. Here is all three rulebooks, triaged into what will cost
              you the race, what will cost you time, and what you can safely ignore.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-accent font-headline text-black hover:bg-accent/90"
                asChild
              >
                <Link href="#the-big-one">
                  Start with the one that ends races <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent font-headline text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="#penalty-calculator">
                  <Calculator className="mr-2 h-4 w-4" /> What would a mistake cost me?
                </Link>
              </Button>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bg-neutral-950 px-4 py-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span
                      className={`block font-headline text-2xl font-extrabold md:text-3xl ${toneStyles[stat.tone]}`}
                    >
                      {stat.value}
                    </span>
                    <span className="mt-1 block font-body text-xs leading-relaxed text-white/60">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <StickySectionNav />

        {/* ── The short version ──────────────────────────────────────────── */}
        <section className="border-b border-accent/30 bg-accent/10 py-10">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="mb-4 font-headline text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              The short version
            </h2>
            <p className="mb-4 font-body text-lg leading-relaxed text-foreground">
              <strong className="font-headline">
                Every workout station must now be completed in full — an incomplete station is a
                disqualification, not a penalty.
              </strong>{' '}
              That is the change that matters. Alongside it: missed run laps now carry a published
              penalty scale that runs from 3 minutes to disqualification depending on your venue, the
              sandbag two-drop disqualification has been replaced by 15 seconds per infringement,
              chalk is restricted to the sled pull and farmers carry, tipping aid station water over
              your head costs 2 minutes, and the doubles togetherness gap is down to ten seconds.
            </p>
            <p className="border-l-2 border-accent/60 pl-4 font-body leading-relaxed text-foreground/80">
              Two changes go the other way and are genuinely good news: a jumping motion on the
              SkiErg is now explicitly legal, and overtaking on the lunges, burpee broad jumps and
              farmers carry is officially fine. Most of the rest are small, sensible tidy-ups.
            </p>
            <div className="mt-6">
              <ShareRow compact />
            </div>
          </div>
        </section>

        {/* ── The big one ────────────────────────────────────────────────── */}
        <section id="the-big-one" className="scroll-mt-32 py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 max-w-3xl">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-white">
                <AlertOctagon className="h-3.5 w-3.5" aria-hidden="true" />
                Ends your race
              </span>
              <h2 className="mb-4 font-headline text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                An incomplete station is now a disqualification
              </h2>
              <p className="mb-4 font-body text-lg leading-relaxed text-muted-foreground">
                Every workout station must be completed in full. All eight of them. If you do not
                finish a station, you are out. Not penalised, not given a time with an asterisk.
                Disqualified.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                The SkiErg and the rower are the traps. You are deep in a race, your eyes are
                streaming, the monitor is a blur, and you decide you have done enough. Under the old
                interpretation there was room for argument. There is none now. Tap through the map
                below to see what &ldquo;finished&rdquo; means at each station — and where each one
                catches people out.
              </p>
            </div>

            <StationDqMap />
          </div>
        </section>

        {/* ── Every change, triaged ──────────────────────────────────────── */}
        <section id="all-changes" className="scroll-mt-32 border-y border-border bg-muted/30 py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 max-w-3xl">
              <h2 className="mb-4 font-headline text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                Every change, triaged by what it costs you
              </h2>
              <p className="font-body text-lg leading-relaxed text-muted-foreground">
                Filter by consequence, or by the format you actually race. {countBySeverity('dq')}{' '}
                change can end your race, {countBySeverity('time')} will cost you time,{' '}
                {countBySeverity('good')} are in your favour, and the rest are worth knowing but will
                probably never affect you.
              </p>
            </div>

            <RuleTriageBoard />
          </div>
        </section>

        {/* ── Penalty calculator ─────────────────────────────────────────── */}
        <section id="penalty-calculator" className="scroll-mt-32 py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 max-w-3xl">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
                Free tool
              </span>
              <h2 className="mb-4 font-headline text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                The cost of a bad day
              </h2>
              <p className="font-body text-lg leading-relaxed text-muted-foreground">
                A 7 minute penalty means nothing until you watch it move your 1:29 to a 1:36. Set
                your format, your venue layout and your target time, then log the mistakes and see
                what lands on the board.
              </p>
            </div>

            <PenaltyCalculator />
          </div>
        </section>

        {/* ── Lap map ────────────────────────────────────────────────────── */}
        <section id="laps" className="scroll-mt-32 border-y border-border bg-muted/30 py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 max-w-3xl">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-black">
                <Footprints className="h-3.5 w-3.5" aria-hidden="true" />
                Costs you time
              </span>
              <h2 className="mb-4 font-headline text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                Know your lap map before the gun
              </h2>
              <p className="font-body text-lg leading-relaxed text-muted-foreground">
                Missed run laps used to sit in a vague range. Now the penalty is published, and it
                depends entirely on how your venue lays out a kilometre. Same mistake, four very
                different outcomes.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {LAP_CONFIGS.map((config) => {
                const isDq = config.penaltySeconds === null;
                return (
                  <div
                    key={config.lapsPerKm}
                    className={`rounded-2xl border-2 p-5 ${
                      isDq
                        ? 'border-rose-500/50 bg-rose-500/[0.06]'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="mb-4 flex items-end gap-1" aria-hidden="true">
                      {Array.from({ length: config.lapsPerKm }).map((_, i) => (
                        <span
                          key={i}
                          className={`block h-8 flex-1 rounded-sm ${
                            isDq ? 'bg-rose-500/70' : 'bg-foreground/70'
                          }`}
                          style={{ height: `${16 + (4 - config.lapsPerKm) * 6}px` }}
                        />
                      ))}
                    </div>
                    <h3 className="font-headline text-lg font-bold text-foreground">
                      {config.label}
                    </h3>
                    <p
                      className={`mt-1 font-headline text-2xl font-extrabold ${
                        isDq ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {config.penaltyLabel}
                    </p>
                    <p className="font-headline text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      per missed lap
                    </p>
                    <p className="mt-3 border-t border-border/60 pt-3 font-body text-sm leading-relaxed text-muted-foreground">
                      {config.note}
                    </p>
                    <p className="mt-2 font-headline text-xs font-bold text-foreground">
                      {config.lapsPerKm * 8} laps to count across the race
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 rounded-2xl border-l-2 border-accent bg-accent/10 px-5 py-4 font-body leading-relaxed text-foreground">
              <strong className="font-headline">One-lap venues are the ones to watch. </strong>
              If your race is a big arena with a single long loop, a missed lap is not a penalty, it
              is the end of your day. And the lap screens at the venue are a convenience, not an
              official record — the rulebook says so directly. Count your own.
            </p>
          </div>
        </section>

        {/* ── Doubles ────────────────────────────────────────────────────── */}
        <section id="doubles" className="scroll-mt-32 py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 max-w-3xl">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Doubles
              </span>
              <h2 className="mb-4 font-headline text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                The gap just got tighter
              </h2>
              <p className="font-body text-lg leading-relaxed text-muted-foreground">
                The togetherness standard is down to a maximum ten second gap between partners. If
                you race doubles, this is the change to actually train for — ten seconds is not much
                when one of you is having a rough run.
              </p>
            </div>

            <DoublesGapMeter />

            <h3 className="mb-4 mt-10 font-headline text-xl font-bold text-foreground">
              Four standards that are not new, but catch people every single event
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {DOUBLES_STANDARDS.map((standard) => (
                <div key={standard.title} className="rounded-2xl border border-border bg-card p-5">
                  <h4 className="mb-2 flex items-start gap-2 font-headline text-base font-bold text-foreground">
                    <XCircle
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-500"
                      aria-hidden="true"
                    />
                    {standard.title}
                  </h4>
                  <p className="pl-6 font-body text-sm leading-relaxed text-muted-foreground">
                    {standard.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Relay ──────────────────────────────────────────────────────── */}
        <section id="relay" className="scroll-mt-32 border-y border-border bg-muted/30 py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 max-w-3xl">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 font-headline text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                Team Relay
              </span>
              <h2 className="mb-4 font-headline text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                The transition zone rule nobody knows
              </h2>
              <p className="font-body text-lg leading-relaxed text-muted-foreground">
                If you are doing a relay this season, read this bit even if you skip everything else.
              </p>
            </div>

            <div className="mb-10 rounded-2xl border-2 border-amber-500/40 bg-amber-500/[0.06] p-5 sm:p-6">
              <h3 className="mb-3 flex items-start gap-2 font-headline text-xl font-bold text-foreground">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-amber-600" aria-hidden="true" />
                Back-to-back legs still run the transition zone
              </h3>
              <p className="mb-3 font-body leading-relaxed text-muted-foreground">
                If one member does two runs and two stations back to back, they still have to run
                through the transition zone after each workout so their chip gets read. Missing that
                is an automatic penalty.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                It feels wrong, because you have not swapped with anyone. But the timing system needs
                to see you.
              </p>
            </div>

            <h3 className="mb-5 font-headline text-xl font-bold text-foreground">
              And the finish has a protocol
            </h3>
            <ol className="relative space-y-4 border-l-2 border-border pl-6">
              {RELAY_FINISH_STEPS.map((step, index) => (
                <li key={step.step} className="relative">
                  <span
                    className="absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full bg-foreground font-headline text-[11px] font-bold text-background"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <h4 className="font-headline text-base font-bold text-foreground">{step.step}</h4>
                    <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-body leading-relaxed text-muted-foreground">
              Most teams do not know this and end up scattered across the venue for the photo.
            </p>
          </div>
        </section>

        {/* ── Myth-buster ────────────────────────────────────────────────── */}
        <section className="py-14 md:py-16">
          <div className="container mx-auto max-w-3xl px-6">
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/[0.06] p-6">
              <h2 className="mb-3 flex items-start gap-2 font-headline text-xl font-bold text-foreground">
                <ThumbsUp className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" aria-hidden="true" />
                While we are here: women&rsquo;s wall balls are 100 reps
              </h2>
              <p className="font-body leading-relaxed text-muted-foreground">
                Rules change between seasons, and a few sites this year have confidently repeated a
                change that never happened. Women&rsquo;s wall balls are 100 reps in every division,
                and have been since September 2024. If you see somebody claiming 75, they are working
                from an old page.
              </p>
            </div>
          </div>
        </section>

        {/* ── What to do ─────────────────────────────────────────────────── */}
        <section id="do-this" className="scroll-mt-32 border-y border-border bg-muted/30 py-14 md:py-20">
          <div className="container mx-auto max-w-3xl px-6">
            <div className="mb-8">
              <h2 className="mb-4 font-headline text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                What I would actually do about it
              </h2>
              <p className="font-body text-lg leading-relaxed text-muted-foreground">
                Everything above is worth knowing. These three are the ones that decide whether you
                get a finish time at all.
              </p>
            </div>

            <RaceDayChecklist />

            <p className="mt-8 flex items-start gap-2 rounded-2xl border border-border bg-card p-5 font-body text-sm leading-relaxed text-muted-foreground">
              <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span>
                The official Singles, Doubles and Team Relay rulebooks are published on{' '}
                <a
                  href="https://hyrox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline underline-offset-2"
                >
                  hyrox.com
                </a>{' '}
                and they are the only thing that counts on the day. Everything on this page is our
                reading of them, not a substitute for them.
              </span>
            </p>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section id="faq" className="scroll-mt-32 py-14 md:py-20">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="mb-8 font-headline text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
              Questions people are asking
            </h2>
            <div className="space-y-4">
              {RULE_FAQS.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="mb-2 flex items-start gap-2 font-headline text-base font-bold text-foreground">
                    <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                    {faq.question}
                  </h3>
                  <p className="pl-6 font-body text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Share ──────────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30 py-12">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="mb-3 font-headline text-2xl font-bold text-foreground">
              Know someone racing this season?
            </h2>
            <p className="mb-6 font-body leading-relaxed text-muted-foreground">
              The incomplete-station rule is the one that will catch people out. Send this to your
              training group before their next race.
            </p>
            <ShareRow />
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-black py-16 text-white md:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fadb5c 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
            <h2 className="mb-4 font-headline text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Training for a race this season?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-body text-lg text-white/75">
              The HybridX app builds running and strength into one plan around your race date, and
              pushes your sessions straight to your Garmin.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-accent font-headline text-black hover:bg-accent/90" asChild>
                <TrackedLink
                  href="https://app.hybridx.club"
                  event="cta_app_click"
                  eventParams={{ location: 'rules_2026_footer_cta' }}
                >
                  Start free at hybridx.club <ArrowRight className="ml-2 h-4 w-4" />
                </TrackedLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent font-headline text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/how-to-train-for-hyrox">
                  Read the full training guide <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-8 font-body text-sm text-white/60">
              <Link href="/free-hyrox-plan" className="hover:text-accent">
                Free 12-week Hyrox plan
              </Link>
              <Link href="/calculators/split-time-calculator" className="hover:text-accent">
                Hyrox split time calculator
              </Link>
              <Link href="/hyrox-training-plan" className="hover:text-accent">
                12-week training plan
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
