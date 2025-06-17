
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitTimeCalculatorForm from '@/components/calculators/SplitTimeCalculatorForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Split Time Calculator | HybridX Hub',
  description: 'Calculate your race splits, with optional GPX upload for elevation-adjusted recommendations.',
};

export default function SplitTimeCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-border/60">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl font-headline text-primary">Split Time Calculator</CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-body mt-2">
                Plan your race with precise split times. Upload a GPX file for AI-powered, elevation-adjusted recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SplitTimeCalculatorForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
