import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, HeartPulse, Dumbbell } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Plan {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  IconComponent?: React.ElementType; // For custom SVGs if needed
}

const plans: Plan[] = [
  {
    id: 'running',
    title: 'Hybrid Running',
    description: 'Optimize your endurance and speed with our specialized running programs, seamlessly integrated with strength work.',
    icon: Activity,
  },
  {
    id: 'cardio',
    title: 'Peak Cardio',
    description: 'Elevate your cardiovascular health and stamina through diverse and challenging cardio routines.',
    icon: HeartPulse,
  },
  {
    id: 'weight-training',
    title: 'Strength Fusion',
    description: 'Build functional strength and power with comprehensive weight training plans designed for the hybrid athlete.',
    icon: Dumbbell,
  },
];

export default function TrainingPlanShowcase() {
  return (
    <section id="training-plans" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            Explore Our Training Plans
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Tailored for hybrid athletes, our plans cover running, cardio, and weight training to help you achieve peak performance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-accent/20 rounded-full mb-4">
                  <plan.icon className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col text-center">
                <CardDescription className="font-body text-muted-foreground mb-6 flex-grow">
                  {plan.description}
                </CardDescription>
                <Button variant="outline" className="mt-auto border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full transition-colors duration-300">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
