
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VDOTCalculatorForm from '@/components/calculators/VDOTCalculatorForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free VDOT Calculator — Jack Daniels Training Paces | HybridX Hub',
  description:
    'Calculate your Jack Daniels VDOT score from any race result and get all five training zone paces (Easy, Marathon, Threshold, Interval, Repetition). Free tool for runners and Hyrox athletes.',
};

export default function VDOTCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-lg mx-auto">
          <Card className="shadow-xl border-border/60">
            <CardHeader className="text-center pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                HybridX Club · Training Tools
              </p>
              <CardTitle className="text-3xl md:text-4xl font-headline text-foreground leading-tight">
                Jack Daniels<br />
                <span className="text-primary">VDOT Calculator</span>
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground font-body mt-2">
                Enter a recent race result to get your VDOT score and all five training zone paces.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VDOTCalculatorForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
