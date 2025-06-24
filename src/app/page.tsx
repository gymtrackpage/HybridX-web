import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import AmazonBookPromotion from '@/components/AmazonBookPromotion';
import AppPromotion from '@/components/AppPromotion';
import FaqSection from '@/components/FaqSection';
import InstagramSection from '@/components/InstagramSection';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'HybridX | Training Plans, Books, and Coaching App',
  description: 'Join thousands of athletes training with HybridX. Choose your path: focused training plan books or our streamlined coaching app. Get started today.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow space-y-20 md:space-y-28">
        <HeroSection />
        <SocialProofSection />
        <AppPromotion />
        <AmazonBookPromotion />
        <FaqSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
