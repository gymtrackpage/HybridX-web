
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '12 Week Hyrox Training Plan | HybridX Hub',
  description: 'Access the 12-week Hyrox training plan.',
  robots: 'noindex, nofollow', // Prevents search engines from indexing this page
};

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwlvvy64K-lwmq4Mf3EMWyim5SPBcsrbGXKBWkHDLEDOxbCy3BGd1BcDq3iHzSJxFSu/exec";

export default function TwelveWeekHyroxPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-xl border-border/60 overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-headline text-primary">12-Week Hyrox Training Plan</CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-body mt-2">
                Your embedded training plan is loading below.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-2 md:p-4">
              <div className="aspect-[4/3] bg-muted/30 rounded-md overflow-hidden">
                <iframe
                  src={APPS_SCRIPT_URL}
                  className="w-full h-full border-0"
                  title="12 Week Hyrox Training Plan"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                >
                   <div className="p-8 text-center text-destructive-foreground">
                     <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
                     <h2 className="text-xl font-bold">Embedding Failed</h2>
                     <p>Your browser does not support iframes, or the content is being blocked. Please ensure you have the correct permissions to view this content.</p>
                   </div>
                </iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
