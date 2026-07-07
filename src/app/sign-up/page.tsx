
'use client';

import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

// This is the URL for your deployed Apps Script Web App
const SCRIPT_URL = 'https://script.google.com/a/macros/hybridx.club/s/AKfycbxCDBD1B5-1p2fF4_VJs2SCX2HdQm9V3PkWNEr2gn-1_Pedu2ogLmrciyze2iz_LWL4/exec';


export default function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Essential for cross-origin requests to Apps Script
                headers: {
                  // This header is important, but be aware 'no-cors' mode might restrict it.
                  // The key part is sending the data in the format the script expects.
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstName,
                  email,
                }),
            });
            
            // In 'no-cors' mode, we cannot read the response. We assume success if no error is thrown.
            setStatus('success');
            setMessage('Thank you for subscribing! Your first email is on its way.');
            trackEvent('generate_lead', { placement: 'sign_up_page', currency: 'GBP', value: 0 });

        } catch (error) {
            setStatus('error');
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
            setMessage(`An error occurred: ${errorMessage}. Please try again later.`);
            trackEvent('lead_submit_error', { placement: 'sign_up_page', message: errorMessage });
            console.error('Submission Error:', error);
        }
    };


  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-body">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
            <div className="container max-w-3xl mx-auto px-5">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight mb-5">
                    Stop Following a Static Plan. Start Having a <span className="text-yellow-400">Training Conversation.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                    For the hybrid athlete who knows their performance is being limited by a generic PDF. Get the elite structure you need, powered by an AI coach that provides the personalized guidance you've been missing.
                </p>
                
                {status !== 'success' && (
                    <div id="signup-form-container" className="bg-[#1a1a1a] p-8 rounded-lg max-w-md mx-auto">
                        <p className="text-center font-semibold text-white mb-4">
                            Get exclusive insights and early access to the app that adapts to you.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-6 text-base rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="Your First Name"
                                required
                                disabled={status === 'loading'}
                            />
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-6 text-base rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="Your Best Email Address"
                                required
                                disabled={status === 'loading'}
                            />
                            <Button
                                type="submit"
                                id="submit-button"
                                className="w-full p-6 text-lg font-semibold bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> SUBMITTING...</> : 'GET EARLY ACCESS'}
                            </Button>
                        </form>
                        <p className="text-xs text-gray-500 opacity-70 mt-4">*100% free. No spam. Unsubscribe anytime.*</p>
                    </div>
                )}
                
                {status === 'success' && (
                    <div id="success-message" className="bg-[#1a1a1a] p-8 rounded-lg max-w-md mx-auto">
                        <h3 className="text-2xl font-headline font-bold text-yellow-400">Thank You!</h3>
                        <p className="text-white mt-2">{message}</p>
                    </div>
                )}

                 {status === 'error' && (
                    <p className="text-red-500 mt-4">{message}</p>
                 )}

            </div>
        </section>

        {/* Agitation Section */}
        <section className="py-16 md:py-24 text-center border-t border-gray-800">
            <div className="container max-w-3xl mx-auto px-5">
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-10">If This Sounds Familiar, You're Not Alone...</h2>
                <ul className="list-none p-0 text-left max-w-xl mx-auto space-y-4">
                    <li className="relative pl-9">
                        <span className="absolute left-0 top-1 text-yellow-400">✅</span>
                        <strong>Your running has plateaued.</strong> You're not getting faster, and those 1k repeats feel more like a chore than a challenge.
                    </li>
                    <li className="relative pl-9">
                        <span className="absolute left-0 top-1 text-yellow-400">✅</span>
                        <strong>You're guessing how to balance lifting and running.</strong> Your PDF plan doesn't give you the 'why' behind the programming.
                    </li>
                    <li className="relative pl-9">
                        <span className="absolute left-0 top-1 text-yellow-400">✅</span>
                        <strong>You have specific questions about technique or strategy,</strong> but no one to ask for an instant, reliable answer.
                    </li>
                    <li className="relative pl-9">
                         <span className="absolute left-0 top-1 text-yellow-400">✅</span>
                        <strong>You're strong, but not "Hyrox strong."</strong> You can lift heavy, but your engine dies 40 minutes into a race simulation.
                    </li>
                </ul>
                <p className="mt-10 text-lg md:text-xl">This isn't a work ethic problem. <strong>It's a guidance problem.</strong></p>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
