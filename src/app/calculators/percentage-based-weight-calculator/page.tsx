
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PercentageBasedWeightCalculatorForm from '@/components/calculators/PercentageBasedWeightCalculatorForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage-Based Weight Calculator | HybridX Hub',
  description: 'Calculate specific training weights based on percentages of your 1RM (One-Rep Max).',
};

export default function PercentageBasedWeightCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-border/60">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl font-headline text-primary">Percentage-Based Weight Calculator</CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-body mt-2">
                Determine the exact weight to lift for any given percentage of your One-Rep Max (1RM).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PercentageBasedWeightCalculatorForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
