
'use client';

import { useActionState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { subscribeToNewsletter, type SubscribeState } from './actions';

const initialState: SubscribeState = { status: 'idle', message: '' };

export default function SignUpPage() {
    const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState);
    const trackedRef = useRef<SubscribeState['status'] | null>(null);

    useEffect(() => {
        if (state.status === trackedRef.current) return;
        trackedRef.current = state.status;
        if (state.status === 'success') {
            trackEvent('generate_lead', { placement: 'sign_up_page', currency: 'GBP', value: 0 });
        } else if (state.status === 'error') {
            trackEvent('lead_submit_error', { placement: 'sign_up_page', message: state.message });
        }
    }, [state]);

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

                {state.status !== 'success' && (
                    <div id="signup-form-container" className="bg-[#1a1a1a] p-8 rounded-lg max-w-md mx-auto">
                        <p className="text-center font-semibold text-white mb-4">
                            Get exclusive insights and early access to the app that adapts to you.
                        </p>
                        <form action={formAction} className="space-y-4">
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="w-full p-6 text-base rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="Your First Name"
                                required
                                disabled={isPending}
                            />
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-6 text-base rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400"
                                placeholder="Your Best Email Address"
                                required
                                disabled={isPending}
                            />
                            <Button
                                type="submit"
                                id="submit-button"
                                className="w-full p-6 text-lg font-semibold bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                disabled={isPending}
                            >
                                {isPending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> SUBMITTING...</> : 'GET EARLY ACCESS'}
                            </Button>
                        </form>
                        <p className="text-xs text-gray-500 opacity-70 mt-4">*100% free. No spam. Unsubscribe anytime.*</p>
                    </div>
                )}

                {state.status === 'success' && (
                    <div id="success-message" className="bg-[#1a1a1a] p-8 rounded-lg max-w-md mx-auto">
                        <h3 className="text-2xl font-headline font-bold text-yellow-400">Thank You!</h3>
                        <p className="text-white mt-2">{state.message}</p>
                    </div>
                )}

                 {state.status === 'error' && (
                    <p className="text-red-500 mt-4">{state.message}</p>
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
