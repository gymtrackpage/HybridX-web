import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { createFAQSchema, SITE_CONFIG } from '@/lib/seo';
import EngineLeadForm from '@/components/engine/EngineLeadForm';
import EngineLogo, { EngineX } from '@/components/engine/EngineLogo';
import Heartbeat from '@/components/engine/Heartbeat';
import Rise from '@/components/engine/Rise';
import StickyCta from '@/components/engine/StickyCta';

const PAGE_PATH = '/build-a-bigger-engine';

export const metadata: Metadata = {
  title: 'Free VO2max Guide for Runners and Hybrid Athletes | HybridX',
  description:
    'Build a Bigger Engine is a free, science-backed guide to raising your VO2max for running and hybrid performance. The latest research in plain language you can use this week.',
  keywords: [
    'vo2max guide',
    'how to increase vo2max',
    'vo2max training',
    'free vo2max guide',
    'norwegian method',
    'running endurance',
    'hyrox engine',
    'hybrid training',
    'vo2max intervals',
  ],
  alternates: { canonical: `${SITE_CONFIG.url}${PAGE_PATH}` },
  openGraph: {
    title: 'Build a Bigger Engine | Free VO2max Guide',
    description:
      'The science of raising your VO2max for running and hybrid performance. The stuff that actually works, in plain language. Free guide.',
    type: 'website',
    url: `${SITE_CONFIG.url}${PAGE_PATH}`,
    images: [
      {
        url: `${SITE_CONFIG.url}/build-a-bigger-engine/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Build a Bigger Engine - free VO2max guide from HybridX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build a Bigger Engine | Free VO2max Guide',
    description:
      'The science of raising your VO2max for running and hybrid performance. Free guide, plain language.',
    images: [`${SITE_CONFIG.url}/build-a-bigger-engine/og-image.png`],
  },
};

// ── Shared bits ──────────────────────────────────────────────────────────

function Kicker({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p
      className={`font-archivo font-bold uppercase text-[13px] sm:text-sm mb-3 ${
        tone === 'dark' ? 'text-engine-heart' : 'text-engine-crimson'
      }`}
      style={{ letterSpacing: '0.2em' }}
    >
      {children}
    </p>
  );
}

function FreePill() {
  return (
    <span
      className="inline-flex items-center rounded-full bg-engine-crimson px-4 py-1.5 font-archivo font-extrabold uppercase text-engine-paper text-xs sm:text-sm"
      style={{ letterSpacing: '0.16em' }}
    >
      Free Guide
    </span>
  );
}

// ── Sections ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(120% 90% at 85% 0%, rgba(193,18,31,0.45) 0%, rgba(106,16,32,0.25) 35%, rgba(44,7,16,0) 70%), linear-gradient(160deg, #6A1020 0%, #3A0A12 45%, #1C050A 100%)',
      }}
    >
      {/* Faint X watermark */}
      <EngineX
        className="pointer-events-none absolute -bottom-16 -right-10 h-[420px] w-[420px] opacity-[0.06]"
        color="#FBF5EF"
      />

      <div className="container mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy + form */}
          <div className="relative z-10">
            <EngineLogo className="mb-7" />
            <div className="mb-5">
              <FreePill />
            </div>

            <h1 className="font-anton uppercase text-engine-paper leading-[0.92] tracking-[0.005em]"
                style={{ fontSize: 'clamp(48px, 9vw, 88px)' }}>
              Build a Bigger
              <br />
              <span className="text-engine-crimson">Engine</span>
            </h1>

            <Heartbeat color="#E63946" animate className="my-6 h-7 w-64 max-w-full" />

            <p className="font-body text-engine-paper/85 max-w-xl mb-8"
               style={{ fontSize: 'clamp(16px, 2.4vw, 19px)', lineHeight: 1.55 }}>
              The science-backed guide to raising your VO2max for running and hybrid
              performance. The latest research, in plain language you can use this week.
            </p>

            <EngineLeadForm formId="hero" placement="hero" variant="dark" className="max-w-xl" />

            <p className="mt-5 font-body text-sm text-engine-paper/60 max-w-xl">
              Join runners and Hyrox athletes building a bigger engine.
            </p>
          </div>

          {/* Guide cover mockup */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div
              className="relative"
              style={{ perspective: '1400px' }}
            >
              <div
                className="rounded-xl shadow-2xl ring-1 ring-white/10"
                style={{
                  transform: 'rotateY(-14deg) rotateX(3deg)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)',
                }}
              >
                <Image
                  src="/build-a-bigger-engine/guide-cover.png"
                  alt="Build a Bigger Engine VO2max guide cover"
                  width={1241}
                  height={1754}
                  priority
                  sizes="(max-width: 1024px) 70vw, 380px"
                  className="h-auto w-[260px] sm:w-[320px] lg:w-[380px] rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  const stats = [
    { big: '~50%', cap: 'of your VO2max is genetic. The rest is trainable.' },
    { big: '100%', cap: 'worth training, at any level, at any age.' },
    { big: '11', cap: 'pages of cutting edge science in plain language.' },
  ];
  return (
    <section className="bg-engine-paper">
      <div className="container mx-auto max-w-5xl px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((s) => (
            <Rise
              key={s.big}
              className="rounded-2xl border-t-[3px] border-engine-crimson bg-engine-blush px-6 py-7 text-center"
            >
              <p className="font-anton text-engine-ox leading-none" style={{ fontSize: 'clamp(40px, 7vw, 56px)' }}>
                {s.big}
              </p>
              <p className="mt-3 font-body text-sm text-engine-inkSoft">{s.cap}</p>
            </Rise>
          ))}
        </div>
        {/* Testimonials placeholder: drop real social proof here once available. */}
      </div>
    </section>
  );
}

function ValueTiles() {
  const tiles = [
    { n: '01', t: 'The 3 pillars', d: 'that actually decide your endurance.' },
    { n: '02', t: 'The interval formula', d: 'the newest meta-analyses keep landing on.' },
    { n: '03', t: 'The Norwegian method', d: 'explained for normal humans.' },
    { n: '04', t: 'The hybrid edge', d: 'train strength and engine without the trade-off.' },
    { n: '05', t: 'Free wins', d: 'sleep, heat, and what is genuinely overhyped.' },
    { n: '06', t: 'A full sample week', d: 'you can start on Monday.' },
  ];
  return (
    <section className="bg-engine-paper">
      <div className="container mx-auto max-w-5xl px-6 pb-16 sm:pb-20">
        <Rise className="text-center mb-10">
          <Kicker tone="light">Inside the guide</Kicker>
          <h2 className="font-anton uppercase text-engine-ink leading-[0.95]"
              style={{ fontSize: 'clamp(30px, 5vw, 46px)' }}>
            What you&apos;ll learn
          </h2>
        </Rise>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <Rise
              key={tile.n}
              className="rounded-2xl border border-engine-line bg-engine-blush p-6"
            >
              <p className="font-anton text-engine-crimson text-3xl leading-none mb-3">{tile.n}</p>
              <h3 className="font-archivo font-extrabold text-engine-ink text-lg leading-snug">
                {tile.t}
              </h3>
              <p className="mt-1 font-body text-engine-inkSoft">{tile.d}</p>
            </Rise>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Heartbeat color="#C1121F" className="h-6 w-72 max-w-full" />
        </div>
      </div>
    </section>
  );
}

function AuthoritySection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(110% 80% at 10% 0%, rgba(193,18,31,0.35) 0%, rgba(106,16,32,0.2) 35%, rgba(44,7,16,0) 70%), linear-gradient(160deg, #3A0A12 0%, #2C0710 60%, #1C050A 100%)',
      }}
    >
      <EngineX
        className="pointer-events-none absolute -left-16 top-1/2 h-[360px] w-[360px] -translate-y-1/2 opacity-[0.05]"
        color="#FBF5EF"
      />
      <div className="container mx-auto max-w-4xl px-6 py-16 sm:py-20 relative z-10">
        <Rise>
          <Kicker tone="dark">Why your engine matters</Kicker>
          <h2 className="font-anton uppercase text-engine-paper leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(30px, 5vw, 46px)' }}>
            VO2max is performance <span className="text-engine-crimson">and</span> health
          </h2>
          <p className="font-body text-engine-paper/85 mb-4" style={{ fontSize: 'clamp(16px, 2.4vw, 19px)', lineHeight: 1.6 }}>
            A bigger engine means faster run splits and faster recovery between every
            station. It is also one of the strongest predictors of long-term health we
            can measure. The same training that wins races protects your future.
          </p>
          <p className="font-body text-engine-paper/70" style={{ fontSize: 'clamp(16px, 2.4vw, 19px)', lineHeight: 1.6 }}>
            This guide turns that science into training you can actually run. No jargon
            walls, no lab required. Effort-based, and built for real weeks.
          </p>
        </Rise>
      </div>
    </section>
  );
}

function ConversionBand() {
  return (
    <section id="get-the-guide" className="bg-engine-crimson scroll-mt-20">
      <div className="container mx-auto max-w-3xl px-6 py-14 sm:py-16 text-center">
        <Rise>
          <h2 className="font-anton uppercase text-engine-paper leading-[0.95] mb-3"
              style={{ fontSize: 'clamp(28px, 4.6vw, 44px)' }}>
            Get the 11-page guide free
          </h2>
          <p className="font-body text-engine-paper/90 mb-7" style={{ fontSize: 'clamp(16px, 2.4vw, 18px)' }}>
            Delivered to your inbox in seconds.
          </p>
          <EngineLeadForm
            formId="mid"
            placement="mid"
            variant="band"
            className="mx-auto max-w-xl text-left"
          />
        </Rise>
      </div>
    </section>
  );
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="bg-engine-paper">
      <div className="container mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <Rise className="text-center mb-8">
          <Kicker tone="light">Before you ask</Kicker>
          <h2 className="font-anton uppercase text-engine-ink leading-[0.95]"
              style={{ fontSize: 'clamp(30px, 5vw, 46px)' }}>
            Questions, answered
          </h2>
        </Rise>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-engine-line">
              <AccordionTrigger className="text-left font-archivo font-bold text-engine-ink hover:text-engine-crimson hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-engine-inkSoft text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden scroll-mt-20"
      style={{
        background:
          'radial-gradient(120% 90% at 50% 0%, rgba(193,18,31,0.4) 0%, rgba(106,16,32,0.22) 35%, rgba(44,7,16,0) 70%), linear-gradient(160deg, #5C0F1A 0%, #2C0710 55%, #1C050A 100%)',
      }}
    >
      <div className="container mx-auto max-w-2xl px-6 py-16 sm:py-20 text-center relative z-10">
        <Rise>
          <Heartbeat color="#E63946" className="mx-auto mb-7 h-7 w-64 max-w-full" />
          <h2 className="font-anton uppercase text-engine-paper leading-[0.95] mb-4"
              style={{ fontSize: 'clamp(32px, 6vw, 56px)' }}>
            Now go build <span className="text-engine-crimson">that engine</span>
          </h2>
          <p className="font-body text-engine-paper/85 mb-8" style={{ fontSize: 'clamp(16px, 2.4vw, 19px)' }}>
            The science is settled enough to act on. Grab the guide and put Section 4
            into your very next session.
          </p>
          <EngineLeadForm formId="final" placement="final" variant="dark" className="mx-auto max-w-xl text-left" />

          <div className="mt-12 flex flex-col items-center gap-2">
            <EngineLogo withWordmark={false} className="opacity-90" />
            <p className="font-archivo font-extrabold uppercase tracking-[0.18em] text-engine-paper/80 text-sm">
              HybridX.Club
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}

function EngineFooter() {
  return (
    <footer className="bg-engine-oxdeep">
      <div className="container mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <EngineLogo />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body text-sm text-engine-paper/70">
            <Link href="/privacy-policy" className="hover:text-engine-heart transition-colors">
              Privacy Policy
            </Link>
            <Link href="/privacy-policy#terms" className="hover:text-engine-heart transition-colors">
              Terms
            </Link>
            <a href="mailto:hello@hybridx.club" className="hover:text-engine-heart transition-colors">
              Contact
            </a>
          </div>
        </div>
        <p className="mt-6 border-t border-white/10 pt-6 text-center font-body text-xs text-engine-paper/50">
          &copy; {new Date().getFullYear()} HybridX.Club. All rights reserved. hybridx.club is
          not affiliated with HYROX GmbH. HYROX&reg; is a registered trademark of HYROX GmbH.
        </p>
      </div>
    </footer>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────

export default function BuildABiggerEnginePage() {
  const faqs = [
    {
      question: 'Is it really free?',
      answer:
        'Yes, completely. We are building the best hybrid-training community and this is how we say hello. No card, no catch.',
    },
    {
      question: 'Who is it for?',
      answer:
        'Runners, Hyrox and hybrid athletes, any level. It is written in plain language, so there are no jargon walls to climb.',
    },
    {
      question: 'Will you spam me?',
      answer:
        'No. You get the guide, then occasional useful training emails. You can unsubscribe in one click anytime.',
    },
    {
      question: 'Do I need a fancy watch or a lab test?',
      answer:
        'No. Everything in the guide is doable with effort-based training. No gadgets required.',
    },
    {
      question: 'What format is it?',
      answer: 'A downloadable PDF you can keep, print, and come back to whenever you want.',
    },
  ];

  const faqSchema = createFAQSchema(faqs);

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: 'Build a Bigger Engine: Free VO2max Guide',
    description:
      'A free, science-backed guide to raising your VO2max for running and hybrid performance.',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${SITE_CONFIG.url}${PAGE_PATH}`,
    seller: { '@type': 'Organization', name: 'HybridX' },
  };

  return (
    <>
      <Script
        id="engine-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="engine-offer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />

      <main className="bg-engine-oxdeep">
        <HeroSection />
        <ProofStrip />
        <ValueTiles />
        <AuthoritySection />
        <ConversionBand />
        <FaqSection faqs={faqs} />
        <FinalCta />
        <EngineFooter />
      </main>

      <StickyCta targetId="get-the-guide" />
    </>
  );
}
