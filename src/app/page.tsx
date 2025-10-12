
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import AmazonBookPromotion from '@/components/AmazonBookPromotion';
import AppPromotion from '@/components/AppPromotion';
import FaqSection from '@/components/FaqSection';
import InstagramSection from '@/components/InstagramSection';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import ApparelPromotion from '@/components/ApparelPromotion';
import TrainingPlanShowcase from '@/components/TrainingPlanShowcase';

export const metadata: Metadata = {
  title: 'HybridX Hub | Hyrox Training Plans, Workout Programs & Coaching App',
  description: 'Expert Hyrox training plans and hybrid workout programs. Achieve your best performance in Hyrox competitions with our scientifically-backed training plans, books, and coaching app. Free calculators and resources.',
  keywords: [
    'hyrox',
    'hyrox training',
    'hyrox workout',
    'what is hyrox',
    'hyrox competition',
    'hyrox training plan',
    'hybrid training',
    'hybrid athlete',
    'training plans',
    'running training',
    'strength training',
    'fitness calculators',
    'hybrid training app',
  ],
  openGraph: {
    title: 'HybridX Hub | Hyrox Training Plans, Workout Programs & Coaching App',
    description: 'Expert Hyrox training plans and hybrid workout programs. Achieve your best performance in Hyrox competitions with our scientifically-backed training plans, books, and coaching app.',
    type: 'website',
    images: [
      {
        url: '/Icon Logo.png',
        width: 1200,
        height: 630,
        alt: 'HybridX Hub - Training Plans and Coaching App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HybridX Hub | Hyrox Training Plans, Workout Programs & Coaching App',
    description: 'Expert Hyrox training plans and hybrid workout programs. Achieve your best performance in Hyrox competitions with our scientifically-backed training plans, books, and coaching app.',
    images: ['/Icon Logo.png'],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow space-y-20 md:space-y-28">
        <HeroSection />
        <SocialProofSection />
        <TrainingPlanShowcase />
        <AppPromotion />
        <AmazonBookPromotion />
        <ApparelPromotion />
        <FaqSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
