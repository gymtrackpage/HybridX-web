
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EcwidStore from '@/components/EcwidStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HybridX Store | Training Gear and Apparel',
  description: 'Shop official HybridX training gear, apparel, and accessories. Get equipped to dominate your training and races.',
};

export default function StorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-border/60">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl font-headline text-primary">HybridX Store</CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-body mt-2">
                Get the official gear to support your training journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EcwidStore />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
