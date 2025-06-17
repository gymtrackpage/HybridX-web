
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PowerliftingScoreCalculatorForm from '@/components/calculators/PowerliftingScoreCalculatorForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Powerlifting Score Calculator (Wilks, DOTS) | HybridX Hub',
  description: 'Calculate your Wilks or DOTS powerlifting score to compare strength across different bodyweights.',
};

export default function PowerliftingScoreCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-border/60">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl font-headline text-primary">Powerlifting Score Calculator</CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-body mt-2">
                Calculate your Wilks or DOTS score to benchmark your powerlifting total.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PowerliftingScoreCalculatorForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
