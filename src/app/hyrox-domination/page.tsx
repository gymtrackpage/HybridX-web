
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShieldCheck, Trophy, Star, Clock, AlertTriangle, ChevronRight, BarChart, BookOpen, Calendar, BrainCircuit } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Hyrox Domination: The Ultimate 12-Week Blueprint',
  description: "The scientifically-backed 12-week blueprint that's helped over 1,000+ athletes shave minutes off their Hyrox times.",
};

// --- Section Components ---

const HeroSection = () => (
  <section className="relative bg-background text-center py-20 md:py-32 overflow-hidden">
    <div className="absolute inset-0 bg-subtle-x-light dark:bg-subtle-x-dark opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"></div>
    <div className="container mx-auto px-6 relative z-10">
      <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4 leading-tight">
        Stop Guessing. Start <span className="text-accent">DOMINATING</span>. The Only Hyrox Training Plan That Guarantees You'll Crush Your Race Time
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto mb-8">
        (Or We'll Refund Every Penny)
      </p>
      <p className="text-md md:text-lg text-muted-foreground font-body max-w-2xl mx-auto mb-10">
        The scientifically-backed 12-week blueprint that's helped over 1,000+ athletes shave minutes off their Hyrox times - even if you've never stepped foot in a functional fitness gym before.
      </p>
      <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200">
        <Link href="#pricing">YES! I Want To Dominate My Hyrox Race</Link>
      </Button>
    </div>
  </section>
);

const ProblemAgitationSection = () => (
  <section className="py-16 md:py-24 bg-secondary/30">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8">Here's What NOBODY Tells You About Hyrox Training...</h2>
      <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto mb-12">
        Let me guess. You've signed up for a Hyrox race and now you're panicking, right? You've probably tried following random CrossFit workouts or copying some influencer's "Hyrox prep" from Instagram. <span className="font-bold text-primary">Spoiler: it doesn't work.</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
        <Card className="bg-background/80">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center"><AlertTriangle className="mr-2" /> The Brutal Truth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 font-body text-muted-foreground">
            <p>❌ You're wasting MONTHS on ineffective training that'll leave you gasping for air at station 3.</p>
            <p>❌ You have no idea how to pace your runs between stations (and it's costing you precious minutes).</p>
            <p>❌ Your "cardio base" means nothing when you can't maintain running speed after the sleds.</p>
            <p>❌ You're about to embarrass yourself in front of hundreds of people because you trained all wrong.</p>
          </CardContent>
        </Card>
        <div className="bg-primary text-primary-foreground p-8 rounded-lg flex flex-col justify-center">
          <h3 className="font-headline text-2xl mb-4 text-accent">The Worst Part?</h3>
          <p className="font-body text-lg">
            You KNOW you're capable of so much more, but you're following advice from people who've never even completed a Hyrox race themselves. Most people fail miserably because they train like it's a marathon when it's a completely different beast.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const AuthorityCredibilitySection = () => (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <Image
              src="https://placehold.co/400x400.png"
              data-ai-hint="fitness coach"
              alt="Coach Photo"
              width={400}
              height={400}
              className="rounded-full shadow-2xl mx-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Who Am I?</h2>
            <p className="text-lg text-muted-foreground font-body mb-6">
              I'm not some social media "fitness guru" selling you the latest fad. I'm the coach who's guided <span className="text-primary font-bold">1,000+ athletes</span> to PR their Hyrox times using the exact system you're about to discover.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-body">
              <div className="flex items-start space-x-3">
                <Trophy className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <p><span className="font-bold text-primary">8-12 minute average</span> reduction in race times.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <p><span className="font-bold text-primary">Dominated age group podiums</span> across Europe and the US.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <p>Results achieved even with <span className="font-bold text-primary">busy careers and family commitments.</span></p>
              </div>
            </div>
            <p className="mt-6 font-headline text-xl text-primary">This isn't theory. This is proven, results-driven methodology.</p>
          </div>
        </div>
      </div>
    </section>
  );

const SolutionRevealSection = () => (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Finally, The Hyrox Domination System</h2>
        <p className="text-xl text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            Built from the ground up for ONE PURPOSE: Making you faster, stronger, and more efficient at every single Hyrox station.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
                <CardHeader><CardTitle>Phase-Specific Periodization</CardTitle></CardHeader>
                <CardContent>Foundation, Strength Endurance, Peak Performance, and a Competition Taper.</CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Compromised Running Mastery</CardTitle></CardHeader>
                <CardContent>The secret sauce. Master the art of running fast AFTER your legs are screaming from stations.</CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Hyrox-Specific Skill Development</CardTitle></CardHeader>
                <CardContent>Optimize every movement for maximum efficiency and minimum energy waste.</CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>RPE-Based Programming</CardTitle></CardHeader>
                <CardContent>Precise intensity targets that adapt to YOUR fitness level, eliminating guesswork.</CardContent>
            </Card>
        </div>
      </div>
    </section>
  );

const WhatsIncludedSection = () => {
    const includedItems = [
      { icon: Calendar, title: "The 12-Week Blueprint", value: "$497 Value", description: "84 days of precise, progressive programming with daily workout cards."},
      { icon: BarChart, title: "Compromised Running Mastery", value: "$297 Value", description: "Exclusive protocols and pacing strategies for running fast after stations."},
      { icon: BookOpen, title: "Hyrox Station Efficiency Guide", value: "$197 Value", description: "Movement breakdowns and energy-saving techniques for every station."},
      { icon: BrainCircuit, title: "RPE Training Guide", value: "$147 Value", description: "Master the Rate of Perceived Exertion system to train at the perfect intensity."},
      { icon: Trophy, title: "Race Day Execution Plan", value: "$197 Value", description: "Detailed warm-up, nutrition, and mental preparation protocols."},
      { icon: CheckCircle, title: "Printable PDF Calendar", value: "$97 Value", description: "Track your progress week by week and stay motivated."},
      { icon: ShieldCheck, title: "BONUS: Deload & Recovery Protocols", value: "$147 Value", description: "Science-based recovery strategies and injury prevention."},
    ];
  
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">The Complete Domination Package</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includedItems.map((item, index) => (
              <Card key={index} className="shadow-lg border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <item.icon className="h-8 w-8 text-accent"/>
                    <span className="text-sm font-bold text-accent bg-accent/10 px-2 py-1 rounded">{item.value}</span>
                  </div>
                  <CardTitle className="pt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
const PricingSection = () => (
    <section id="pricing" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Your Investment</h2>
                <p className="text-lg text-muted-foreground mt-2">Choose the plan that's right for you. Price increases in 48 hours.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="border-2 border-primary shadow-2xl relative overflow-hidden">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-headline">DIY DOMINATION</CardTitle>
                        <p className="text-4xl font-bold text-primary my-4">$297</p>
                        <p className="text-muted-foreground line-through">$1,583 Value</p>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-6">Everything you need to crush your Hyrox time, delivered instantly.</p>
                        <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Get DIY Domination</Button>
                    </CardContent>
                </Card>
                <Card className="border-2 border-accent shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-sm font-bold px-4 py-1 rounded-bl-lg">MOST POPULAR</div>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-headline">COMPLETE DOMINATION</CardTitle>
                        <p className="text-4xl font-bold text-accent my-4">$497</p>
                        <p className="text-muted-foreground line-through">$3,438 Total Value</p>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-6">Everything in DIY, PLUS a 1-on-1 coaching call, personalization, and all bonuses.</p>
                        <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Get Complete Domination</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
);
  
const GuaranteeSection = () => (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <Card className="bg-primary/5 border-primary/20 p-8 text-center">
          <ShieldCheck className="h-16 w-16 text-accent mx-auto mb-4"/>
          <h2 className="text-3xl font-headline font-bold text-primary">60-Day "Faster Or Free" Guarantee</h2>
          <p className="text-lg text-muted-foreground mt-4 font-body">
            Follow the plan for 12 weeks. If you don't improve your Hyrox time by at least 5 minutes (or complete your first race if you're a beginner), I'll refund every penny. No questions asked. No hoops to jump through.
          </p>
          <p className="mt-4 font-bold text-primary font-body">Why am I so confident? Because this system works. Period.</p>
        </Card>
      </div>
    </section>
);
  
const FaqSection = () => (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-headline font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>I'm not fit enough for this program</AccordionTrigger>
            <AccordionContent>Perfect. This plan is designed to take you from wherever you are to Hyrox-ready in 12 weeks. My biggest success stories are people who thought they "weren't ready."</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>I don't have 2 hours a day to train</AccordionTrigger>
            <AccordionContent>You don't need 2 hours. Sessions range from 35-110 minutes, with most under 75 minutes. If you have time to scroll social media, you have time to transform your fitness.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>I can find free programs online</AccordionTrigger>
            <AccordionContent>You can also find free medical advice online. Free programs got you where you are now. If that was good enough, you wouldn't be here. This is a proven system.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger>What if I can't do all the exercises?</AccordionTrigger>
            <AccordionContent>Every exercise has modifications and progressions. The RPE system means you're always training at YOUR level while progressing toward the standard.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
);

const FinalCloseSection = () => (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-accent">The Choice Is Yours</h2>
        <p className="text-lg font-body max-w-3xl mx-auto mb-8">
            Keep doing what you're doing and regret what could have been, or invest in a proven system and cross the finish line knowing you dominated your race. Which athlete do you want to be?
        </p>
        <p className="font-bold text-destructive mb-8">This price disappears in 47 hours and 23 minutes.</p>
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Link href="#pricing">👇 Click Below and Let's Build Your Domination Story 👇</Link>
        </Button>
      </div>
    </section>
);

// --- Main Page Component ---

export default function HyroxDominationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ProblemAgitationSection />
        <AuthorityCredibilitySection />
        <SolutionRevealSection />
        <WhatsIncludedSection />
        <PricingSection />
        <GuaranteeSection />
        <FaqSection />
        <FinalCloseSection />
      </main>
      <Footer />
    </div>
  );
}
