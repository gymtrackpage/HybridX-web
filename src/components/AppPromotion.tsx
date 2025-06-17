import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function AppPromotion() {
  return (
    <section id="app-promotion" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
              Take Your Training <span className="text-accent">Anywhere</span>
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-8">
              Access all your HybridX training plans, track your progress, and stay motivated with our dedicated mobile app.
              Available now for a seamless training experience.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200" asChild>
              <Link href="https://app.hybridx.club" target="_blank" rel="noopener noreferrer">
                <Smartphone className="mr-2 h-5 w-5" /> Go to HybridX App
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="https://placehold.co/800x450.png"
                alt="HybridX App Interface"
                layout="fill"
                objectFit="cover"
                data-ai-hint="app interface fitness"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
