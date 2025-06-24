
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AmazonBookPromotion from '@/components/AmazonBookPromotion';
import AppPromotion from '@/components/AppPromotion';
import FaqSection from '@/components/FaqSection';
import ContactFormSection from '@/components/ContactFormSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AppPromotion />
        <AmazonBookPromotion />
        <FaqSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
