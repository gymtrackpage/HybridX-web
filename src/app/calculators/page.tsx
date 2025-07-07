
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Route, Dumbbell, ClipboardList, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Fitness & Health Calculators | HybridX Hub',
  description: 'A comprehensive suite of free calculators for running, strength training, and general health to optimize your fitness journey.',
};

interface CalculatorCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  ctaText: string;
}

const calculatorCategories: CalculatorCategory[] = [
  {
    id: 'running-calculators',
    title: 'Running Calculators',
    description: 'Plan your pace, predict race times, find heart rate zones, and strategize your splits for any distance.',
    icon: Route,
    href: '/calculators/running',
    ctaText: 'View Running Calculators',
  },
  {
    id: 'strength-calculators',
    title: 'Strength Calculators',
    description: 'Estimate your 1RM, calculate training weights based on percentages, and determine your powerlifting score.',
    icon: Dumbbell,
    href: '/calculators/strength',
    ctaText: 'View Strength Calculators',
  },
  {
    id: 'general-health-calculators',
    title: 'General Health Calculators',
    description: 'Understand your body composition, daily calorie needs, and macronutrient targets for your specific goals.',
    icon: ClipboardList,
    href: '/calculators/general-health',
    ctaText: 'View Health Calculators',
  },
];

export default function CalculatorsHubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section id="calculators-overview" className="py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
              Fitness & Health Calculators
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto">
              Your one-stop hub for essential tools to measure, track, and optimize every aspect of your training and health.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {calculatorCategories.map((cat) => (
              <Card key={cat.id} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col bg-card/80 backdrop-blur-sm border-border/60 group border-t-2 border-accent/40">
                <CardHeader className="flex-row items-center space-x-4 pb-4 pt-6">
                  <div className="p-3 bg-accent/15 rounded-lg ring-1 ring-accent/30">
                    <cat.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-2xl text-primary group-hover:text-accent transition-colors duration-300">{cat.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <CardDescription className="font-body text-muted-foreground mb-6 flex-grow">
                    {cat.description}
                  </CardDescription>
                  <Button variant="default" className="mt-auto bg-primary text-primary-foreground hover:bg-primary/90 w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300 font-headline py-3 text-base" asChild>
                    <Link href={cat.href}>
                      {cat.ctaText} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
