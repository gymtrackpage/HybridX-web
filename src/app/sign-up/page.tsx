import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignUpFormEmbed from '@/components/SignUpFormEmbed';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up for Alerts | HybridX Hub',
  description: 'Sign up to get the latest alerts, news, and updates from the HybridX community.',
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-border/60">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl font-headline text-primary">Sign Up</CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-body mt-2">
                Complete the form below to get alerts and updates from HybridX.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpFormEmbed />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
