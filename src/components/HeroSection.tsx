
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DecorativeX } from './DecorativeX';

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
      {/* Decorative X elements */}
      <DecorativeX className="w-32 h-32 top-10 left-10 opacity-60 dark:opacity-40 transform rotate-[15deg]" />
      <DecorativeX className="w-48 h-48 bottom-[-5rem] right-[-2rem] opacity-50 dark:opacity-30 transform -rotate-[25deg]" />
      <DecorativeX className="hidden md:block w-64 h-64 top-1/2 left-1/4 opacity-30 dark:opacity-20 transform -translate-y-1/2 rotate-[30deg]" />
      <DecorativeX className="hidden lg:block w-24 h-24 top-1/4 right-1/4 opacity-70 dark:opacity-50 transform rotate-[45deg]" />
      
      <div aria-hidden="true" className="absolute inset-0 bg-subtle-x-light dark:bg-subtle-x-dark opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6 leading-tight">
          Master Hyrox Training & <span className="text-accent">Dominate Your Competition.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto mb-10">
          Scientifically-backed Hyrox training plans and hybrid workout programs. Whether you're racing Hyrox competitions or building hybrid fitness, get expert plans, books, and coaching to achieve peak performance.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-transform duration-200 w-full md:w-auto" asChild>
            <Link href="#app-promotion">Explore the App</Link>
          </Button>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transform hover:scale-105 transition-transform duration-200 w-full md:w-auto" asChild>
            <Link href="#book-promotion">Browse the Books</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
