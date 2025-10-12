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
    href: "/hyrox-performance",
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
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6 leading-tight">
          Your Path to Peak Performance Starts Here.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto mb-12">
          Whatever your budget or training style, we have a scientifically-backed plan to help you achieve your best. Choose the option that's right for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trainingOptions.map((option) => (
            <Card key={option.title} className="flex flex-col text-left shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 bg-card/80 backdrop-blur-sm group border-t-2 border-primary/20">
              <CardHeader className="flex-row items-start space-x-4 pb-3">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <option.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="font-headline text-xl text-primary">{option.title}</CardTitle>
                  <p className="font-bold text-lg text-accent font-headline">{option.price}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="font-body text-muted-foreground">
                  {option.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
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