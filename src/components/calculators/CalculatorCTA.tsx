import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TrackedLink from '@/components/TrackedLink';

interface CalculatorCTAProps {
  /** Calculator slug, for analytics (e.g. "pace-calculator"). */
  calculator: string;
}

/** Consistent cross-sell shown under every calculator's result. No signup required to use the tool itself. */
export default function CalculatorCTA({ calculator }: CalculatorCTAProps) {
  return (
    <Card className="mt-8 bg-primary/5 border-primary/20 text-center p-6 md:p-8">
      <CardContent className="p-0">
        <h2 className="font-headline text-xl md:text-2xl font-bold text-primary mb-2">
          Now turn that number into a plan
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-5">
          Get a free, personalised 12-week Hyrox training plan built around your race date and ability level.
        </p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <TrackedLink
            href="/free-hyrox-plan"
            event="cta_calculator_click"
            eventParams={{ location: calculator }}
          >
            Get My Free Hyrox Plan <ArrowRight className="ml-2 h-4 w-4" />
          </TrackedLink>
        </Button>
      </CardContent>
    </Card>
  );
}
