import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function AppPromotion() {
  return (
    <section id="app-promotion" className="relative py-16 md:py-24 bg-secondary/30 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-subtle-x-light dark:bg-subtle-x-dark opacity-40 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
              Your Hybrid Coach, <span className="text-accent">In Your Pocket. 24/7.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-8">
              Track every rep, every run, every win. Our app seamlessly integrates your training plans, monitors progress, and keeps you laser-focused on your goals.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-transform duration-200" asChild>
              <Link href="https://app.hybridx.club" target="_blank" rel="noopener noreferrer">
                <Smartphone className="mr-2 h-5 w-5" /> Access the App Now
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative aspect-[16/10] rounded-xl shadow-2xl overflow-hidden group">
              <Image
                src="https://placehold.co/800x500.png"
                alt="HybridX App Interface showing progress tracking"
                layout="fill"
                objectFit="cover"
                data-ai-hint="modern fitness app"
                className="transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
