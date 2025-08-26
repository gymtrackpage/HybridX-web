
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Trophy, AlertTriangle, ChevronRight, Calendar, TrendingUp, Dumbbell, Zap, Users, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import HyroxDominationForm from '@/components/hyrox/HyroxDominationForm';


export const metadata: Metadata = {
  title: 'Hyrox Training Plan: The Ultimate 12-Week Blueprint to Dominate',
  description: "The scientifically-backed 12-week Hyrox training plan that's helped over 1,000+ athletes crush their race times. For beginners and advanced competitors.",
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
        <Link href="#get-the-plan">YES! I Want My Free Hyrox Plan</Link>
      </Button>
    </div>
  </section>
);

const ProblemAgitationSection = () => (
  <section className="py-20 md:py-28 bg-secondary/30">
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

const SolutionRevealSection = () => (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Finally, The Hyrox Domination System</h2>
        <p className="text-xl text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            Built from the ground up for ONE PURPOSE: Making you faster, stronger, and more efficient at every single Hyrox station. This isn't just a collection of workouts; it's a complete system for peak performance.
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
      { icon: Calendar, title: "Beginner to Advanced Hyrox Race Preparation", value: "Included", description: "Complete 12-week progressive plans for every fitness level, from first-timers to elite competitors."},
      { icon: TrendingUp, title: "Running Specific Plan", value: "Included", description: "Build a massive running threshold with specialized protocols for speed, endurance, and compromised running."},
      { icon: Dumbbell, title: "Strength Improvement Plan", value: "Included", description: "Targeted strength and conditioning to power through every station with confidence and reduce injury risk."},
      { icon: Zap, title: "Off-Season Olympic Lifting Plan", value: "Included", description: "Build explosive power and speed in your offseason with our specialized Olympic lifting and plyometrics program."},
      { icon: Users, title: "Specific Pairs Plan", value: "Included", description: "Dominate the pairs division with strategies and workouts designed for seamless transitions and synchronized effort."},
      { icon: Trophy, title: "BONUS: Race Day Execution Plan", value: "Included", description: "Detailed warm-up, nutrition, and mental preparation protocols to ensure you peak on race day."},
    ];
  
    return (
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">The Complete Domination Package</h2>
            <p className="text-lg text-muted-foreground mt-2">Everything you need for your best Hyrox performance ever.</p>
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
  
const GetThePlanSection = () => (
    <section id="get-the-plan" className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Get Your Custom Hyrox Training Plan</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Select your target event, enter your email, and we'll automatically generate and send your personalized 12-week training plan.</p>
            </div>
            <div className="flex justify-center">
                <Card className="border-2 border-accent shadow-2xl relative overflow-hidden max-w-lg w-full">
                     <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-4 py-1 rounded-b-lg shadow-lg">
                        <Trophy className="inline-block h-4 w-4 mr-1.5 -mt-0.5" />
                        100% FREE
                     </div>
                    <CardHeader className="text-center pt-12 pb-4">
                        <CardTitle className="text-2xl font-headline uppercase tracking-wider">Hyrox Domination Plan</CardTitle>
                        <CardDescription>Your Personalized Path to the Finish Line</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center px-4 sm:px-8 pb-8">
                        <HyroxDominationForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
);
  
const GuaranteeSection = () => (
    <section className="py-20 md:py-28 bg-background">
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
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-headline font-bold text-primary text-center mb-8">Frequently Asked Questions about Hyrox Training</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>What if I'm a complete beginner?</AccordionTrigger>
            <AccordionContent>Perfect. This plan is designed to take you from wherever you are to Hyrox-ready in 12 weeks. It uses RPE (Rate of Perceived Exertion) so the intensity automatically scales to your current fitness level. My biggest success stories are people who thought they "weren't ready."</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>How much time do I need to train per week?</AccordionTrigger>
            <AccordionContent>You don't need to live in the gym. Sessions range from 45-90 minutes, with most under 75 minutes, 4-5 days a week. If you have time to scroll social media, you have time to transform your fitness.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>Why is this free? What's the catch?</AccordionTrigger>
            <AccordionContent>There's no catch. We believe this is the most effective Hyrox training system available, and we want to prove it to you. Our hope is that you'll get incredible results, love the system, and consider our premium app or books in the future. But this 12-week plan is 100% free.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger>What equipment do I need for this plan?</AccordionTrigger>
            <AccordionContent>The plan is designed for a standard functional fitness gym. You'll need access to things like a squat rack, barbells, dumbbells, kettlebells, a rowing machine, a ski-erg, and space for sled pushes/pulls. We provide substitution suggestions where possible.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
);

const FinalCloseSection = () => (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-accent">The Choice Is Yours</h2>
        <p className="text-lg font-body max-w-3xl mx-auto mb-8">
            Keep doing what you're doing and regret what could have been, or invest in a proven system and cross the finish line knowing you dominated your race. Which athlete do you want to be?
        </p>
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Link href="#get-the-plan">Get My Free Plan Now</Link>
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
        <SolutionRevealSection />
        <WhatsIncludedSection />
        <GetThePlanSection />
        <GuaranteeSection />
        <FaqSection />
        <FinalCloseSection />
      </main>
      <Footer />
    </div>
  );
}
