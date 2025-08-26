
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
  title: 'HybridX Hub | Hybrid Training Plans, Books, and Coaching App',
  description: 'The central hub for the hybrid athlete. Achieve peak performance with our training plans for running and lifting, expert books, and our coaching app. Get started today.',
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
