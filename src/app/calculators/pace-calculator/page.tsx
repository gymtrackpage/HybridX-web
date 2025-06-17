
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaceCalculatorForm from '@/components/calculators/PaceCalculatorForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pace Calculator | HybridX Hub',
  description: 'Calculate your running pace, time, or distance with the HybridX Hub Pace Calculator.',
};

export default function PaceCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-border/60">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl font-headline text-primary">Pace Calculator</CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-body mt-2">
                Easily calculate your running pace, finish time, or distance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaceCalculatorForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
