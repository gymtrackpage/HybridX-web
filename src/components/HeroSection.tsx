import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Download, BookOpen, Smartphone, ArrowRight } from 'lucide-react';

const trainingOptions = [
  {
    icon: Download,
    title: "Free Personalized Plan",
    price: "£0",
    description: "Your race, your dates, your personalized 12-week PDF plan. The perfect starting point.",
    cta: "Get Your Free PDF",
    href: "/hyrox-domination",
    variant: "secondary" as const,
  },
  {
    icon: BookOpen,
    title: "Paperback Books",
    price: "From £8",
    description: "For the analog athlete. Unplug and focus with our popular, in-depth training guides.",
    cta: "Browse the Books",
    href: "/#book-promotion",
    variant: "outline" as const,
  },
  {
    icon: Smartphone,
    title: "The Pro App",
    price: "£5/mo",
    description: "The most affordable training app on the market. Daily workouts, tracking, and more. First month free.",
    cta: "Explore The App",
    href: "https://app.hybridx.club",
    variant: "default" as const,
    isExternal: true,
  }
];

const Pattern = () => (
    <svg
      className="absolute inset-0 w-full h-full text-black/5 dark:text-white/5"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
    >
      <path d="M0 0L60 60M0 60L60 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );

export default function HeroSection() {
  return (
    <section 
      className="relative py-20 md:py-28 bg-black text-white overflow-hidden"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
        paddingBottom: '12rem', // Add padding to compensate for the clip-path
      }}
    >
      <div className="absolute inset-0 opacity-50">
        <Pattern />
      </div>
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/80 via-black/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          Your Path to <span className="text-accent">Peak Performance</span> Starts Here.
        </h1>
        <p className="text-lg md:text-xl text-white/80 font-body max-w-3xl mx-auto mb-12">
          Whatever your budget or training style, we have a scientifically-backed plan to help you achieve your best. Choose the option that's right for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trainingOptions.map((option, index) => (
            <Card 
              key={option.title} 
              className="flex flex-col text-left shadow-2xl hover:-translate-y-2 transition-transform duration-300 bg-gray-900/40 backdrop-blur-sm border border-accent/20 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="flex-row items-center space-x-4 pb-3 pt-6">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <option.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="font-headline text-lg text-white">{option.title}</CardTitle>
                  <p className="font-bold text-md text-accent font-headline">{option.price}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-1">
                <CardDescription className="font-body text-white/70 text-sm">
                  {option.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pb-6">
                 <Button className="w-full font-headline bg-accent text-accent-foreground hover:bg-accent/80 transition-colors" variant={option.variant === 'default' ? 'default' : 'secondary'} asChild>
                  <Link href={option.href} target={option.isExternal ? '_blank' : '_self'}>
                    {option.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}