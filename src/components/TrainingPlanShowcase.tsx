
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, HeartPulse, Dumbbell } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface Plan {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  ctaText: string;
  href: string;
}

const plans: Plan[] = [
  {
    id: 'hybrid-running',
    title: 'Hybrid Running Plans',
    description: 'Crush your PRs. Combine elite running protocols with targeted strength work for explosive speed and endurance.',
    icon: Activity,
    ctaText: 'View Running Plans',
    href: '#', 
  },
  {
    id: 'hyrox-specific',
    title: 'Hyrox Specific Plans',
    description: 'For beginner, intermediate, and advanced athletes. Tailored programs to conquer every station and run.',
    icon: HeartPulse,
    ctaText: 'View Hyrox Blueprint',
    href: '/hyrox-domination', 
  },
  {
    id: 'offseason-strength',
    title: 'Offseason Strength Plans',
    description: 'Build your foundation. Focused strength and power programs to prepare you for your next competitive season.',
    icon: Dumbbell,
    ctaText: 'Explore Strength Plans',
    href: '#', 
  },
];

export default function TrainingPlanShowcase() {
  return (
    <section id="training-plans" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            Your Path to Elite Hybrid Performance Starts Here
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Choose your focus or combine them all. Our expertly designed plans are your roadmap to results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card/80 backdrop-blur-sm border-t-2 border-accent/50">
              <CardHeader className="items-center text-center pt-8">
                <div className="p-4 bg-accent/20 rounded-full mb-4 ring-2 ring-accent/30">
                  <plan.icon className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col text-center">
                <CardDescription className="font-body text-muted-foreground mb-6 flex-grow px-2">
                  {plan.description}
                </CardDescription>
                <Button variant="outline" className="mt-auto border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full transition-colors duration-300 font-headline py-3" asChild>
                  <Link href={plan.href}>{plan.ctaText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
