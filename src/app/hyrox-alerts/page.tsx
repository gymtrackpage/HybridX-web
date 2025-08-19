
'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HyroxAlertsForm from '@/components/hyrox/HyroxAlertsForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

// Metadata should be defined in a Server Component or at the page level, not in a client component.
// We will create a separate metadata export.
export const metadata: Metadata = {
    title: 'Hyrox Event Alerts | Never Miss a Race Announcement | HybridX Hub',
    description: 'Get instant email notifications when new Hyrox races are announced worldwide. Stay ahead of the competition and secure your spot with our free alert service.',
};


export default function HyroxAlertsPage() {
  const handleUnsubscribe = () => {
    // Note: This is a simple client-side prompt. A proper unsubscribe system
    // would involve a server action and a dedicated page/form.
    const email = prompt('Enter your email address to unsubscribe:');
    if (email) {
      alert(`Unsubscribe functionality is not fully implemented in this demo. Request for ${email} has been noted.`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-2xl md:text-3xl font-black text-primary mb-4 uppercase tracking-wider font-headline">
            HybridX
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-6 text-primary">
            Never Miss a Hyrox Event
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-body">
            Get instant notifications when new Hyrox races are announced worldwide. 
            Stay ahead of the competition and secure your spot.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Signup Form */}
          <div className="order-2 lg:order-1">
            <Card className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl">
              <CardHeader className="text-center">
                 <CardTitle className="text-2xl font-headline font-bold text-primary">Join the Elite</CardTitle>
              </CardHeader>
              <CardContent>
                <HyroxAlertsForm />
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-headline font-bold mb-8 text-primary">
                  What You&apos;ll Get
                </h3>
                <div className="space-y-6">
                  
                  <div className="bg-card/30 border border-border rounded-xl p-6 
                                hover:-translate-y-1 hover:bg-card/50 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl flex-shrink-0">⚡</div>
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-2 font-headline">Instant Alerts</h4>
                        <p className="text-muted-foreground font-body">Be the first to know when new races are announced worldwide</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/30 border border-border rounded-xl p-6 
                                hover:-translate-y-1 hover:bg-card/50 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl flex-shrink-0">🌍</div>
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-2 font-headline">Global Coverage</h4>
                        <p className="text-muted-foreground font-body">Events from all continents - Sydney to London, Singapore to New York</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/30 border border-border rounded-xl p-6 
                                hover:-translate-y-1 hover:bg-card/50 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl flex-shrink-0">📅</div>
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-2 font-headline">Complete Details</h4>
                        <p className="text-muted-foreground font-body">Dates, locations, and direct booking links - everything you need</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/30 border border-border rounded-xl p-6 
                                hover:-translate-y-1 hover:bg-card/50 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl flex-shrink-0">🚫</div>
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-2 font-headline">Zero Spam Promise</h4>
                        <p className="text-muted-foreground font-body">Only get emails when NEW events are added - no daily spam</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 mt-16 border-t border-border">
          <p className="text-muted-foreground text-sm font-body">
            This service is powered by{' '}
            <a 
              href="https://hybridx.club" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              HybridX
            </a>
            {' '} | {' '}
            <button 
              onClick={handleUnsubscribe}
              className="text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              Unsubscribe
            </button>
          </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
