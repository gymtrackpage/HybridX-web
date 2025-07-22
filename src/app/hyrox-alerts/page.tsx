
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// This sets the title that appears in the browser tab
export const metadata: Metadata = {
  title: 'Hyrox Alerts | HybridX Hub',
  description: 'Sign up for Hyrox alerts and notifications.',
};

export default function HyroxAlertsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        
        {/* Your page content goes here! */}
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary">Hyrox Alerts</h1>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              This is the page for Hyrox Alerts. You can add your content here.
            </p>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
