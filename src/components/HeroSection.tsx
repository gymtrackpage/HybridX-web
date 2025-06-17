import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6 leading-tight">
          Unleash Your Potential with <span className="text-accent">HybridX</span> Hub
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10">
          Discover expertly crafted training plans, insightful guides, and our dedicated app designed to elevate your hybrid training journey.
        </p>
        <div className="space-x-4">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200" asChild>
            <Link href="#training-plans">Explore Plans</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/5 shadow-lg transform hover:scale-105 transition-transform duration-200" asChild>
            <Link href="#app-promotion">Our App</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
