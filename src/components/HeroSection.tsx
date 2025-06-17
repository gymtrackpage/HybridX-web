import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6 leading-tight">
          Stop Guessing. Start <span className="text-accent">Dominating</span>. Your Ultimate Hybrid Training Blueprint Awaits.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10">
          Transform your fitness with scientifically-backed training plans, expert guides, and our revolutionary app. Achieve peak performance, faster.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200 w-full md:w-auto" asChild>
            <Link href="#training-plans">Explore Training Plans</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10 shadow-md transform hover:scale-105 transition-transform duration-200 w-full md:w-auto" asChild>
            <Link href="#app-promotion">Discover the App</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
