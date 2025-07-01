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

export const metadata: Metadata = {
  title: 'HybridX Hub | Training Plans, Books, and Coaching App',
  description: 'Join thousands of athletes on the HybridX app and using our training books. Achieve peak performance with our training plans, books, and coaching app. Get started today.',
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
        <ApparelPromotion />
        <FaqSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
