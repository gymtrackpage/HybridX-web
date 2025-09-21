
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | HybridX Hub',
  description: 'Learn how HybridX Hub collects, uses, and protects your personal information and activity data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-border/60">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl font-headline text-primary">Privacy Policy</CardTitle>
              <CardDescription className="text-lg text-muted-foreground font-body mt-2">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 font-body text-foreground/90">
              <div className="p-4 bg-destructive/10 border-l-4 border-destructive text-destructive-foreground/90">
                <p className="font-bold">Disclaimer:</p>
                <p className="text-sm">This is a template privacy policy and is not legal advice. You should consult with a legal professional to ensure this policy meets your specific needs and complies with all applicable laws and regulations.</p>
              </div>

              <section>
                <h2 className="text-2xl font-headline text-primary mb-3">1. Introduction</h2>
                <p className="text-muted-foreground">
                  Welcome to HybridX Hub ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, including any services like our fitness calculators, training plan sign-ups, and our app.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-headline text-primary mb-3">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    <strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you sign up for our training plans or mailing lists.
                  </li>
                  <li>
                    <strong>Data from Calculators:</strong> Information you provide to our fitness calculators, such as age, weight, height, gender, lift numbers, and race times. This data is processed in your browser to provide you with results and may be used in an aggregated, anonymous form for service improvement.
                  </li>
                  <li>
                    <strong>Derivative Data (Analytics):</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site. We use Google Analytics for this purpose.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-headline text-primary mb-3">3. How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                  <li>Deliver your personalized training plan via email.</li>
                  <li>Send you our newsletter or other marketing communications that you have opted into.</li>
                  <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                  <li>Generate anonymized, aggregated data for internal analysis and service improvement.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-headline text-primary mb-3">4. Disclosure of Your Information</h2>
                <p className="text-muted-foreground">
                  We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may share information we have collected about you in certain situations:
                </p>
                 <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                  <li>
                    <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.
                  </li>
                  <li>
                    <strong>Third-Party Service Providers:</strong> We may share your data with third-party service providers that perform services for us or on our behalf, including data analysis (Google Analytics) and email delivery (for training plans and newsletters).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-headline text-primary mb-3">5. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground">
                  We may use cookies and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-headline text-primary mb-3">6. Security of Your Information</h2>
                <p className="text-muted-foreground">
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-headline text-primary mb-3">7. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions or comments about this Privacy Policy, please contact us at: [Your Contact Email Address]
                </p>
              </section>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
