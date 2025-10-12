import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Download, BookOpen, Smartphone, ArrowRight } from 'lucide-react';
import { DecorativeX } from '@/components/DecorativeX';

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

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
      {/* Decorative background elements for the "ladder" effect */}
      <DecorativeX className="hidden md:block w-32 h-32 top-1/2 -translate-y-1/2 left-[calc(33%-4rem)]" />
      <DecorativeX className="hidden md:block w-32 h-32 top-1/2 -translate-y-1/2 right-[calc(33%-4rem)]" />
      <DecorativeX className="md:hidden w-20 h-20 top-[calc(33%)] -right-8" />
      <DecorativeX className="md:hidden w-20 h-20 top-[calc(66%)] -left-8" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6 leading-tight">
          Your Path to Peak Performance Starts Here.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto mb-12">
          Whatever your budget or training style, we have a scientifically-backed plan to help you achieve your best. Choose the option that's right for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {trainingOptions.map((option) => (
            <Card key={option.title} className="flex flex-col text-left shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 bg-card/80 backdrop-blur-sm group border-t-2 border-primary/20">
              <CardHeader className="flex-row items-start space-x-4 pb-2 pt-5">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <option.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="font-headline text-lg text-primary">{option.title}</CardTitle>
                  <p className="font-bold text-md text-accent font-headline">{option.price}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-1">
                <CardDescription className="font-body text-muted-foreground text-sm">
                  {option.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pb-5">
                 <Button className="w-full font-headline" variant={option.variant} asChild>
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
