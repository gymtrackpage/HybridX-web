
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpenCheck, ShoppingCart, ArrowUpRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';

const books = [
  {
    id: 'hyrox-12-week-prep',
    title: "Hyrox 12 Week Training Plan for Hyrox Race Preparation",
    description: "Excel in Hyrox with this comprehensive 12-week guide. Master movements, optimize running, and build strength with expert advice and progressive strategies. Ideal for all levels.",
    imageUrl: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/d555d4e2-4284-4579-a41f-2af4bec009bd.__CR250,0,500,666_PT0_SX300_V1___.png",
    amazonUrl: "https://amzn.to/3SSh8sz",
    ctaText: "Get Your Copy",
  },
  {
    id: 'elite-hyrox-training-plan',
    title: "Elite Hyrox Training Plan - 12 Week Training Plan for Hyrox Race Preparation",
    description: "Achieve elite Hyrox performance with this 12-week plan. Focuses on optimizing energy systems to build high-level anaerobic power and aerobic capacity for peak race-day results.",
    imageUrl: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b9871c7d-2cc7-4004-8416-c3e18450520e.__CR350,0,1400,1400_PT0_SX300_V1___.png",
    amazonUrl: "https://amzn.to/44jOd74",
    ctaText: "Get Your Copy",
  },
  {
    id: 'train-for-hyrox-at-home',
    title: "Train for Hyrox at Home - 12 Week Training Plan",
    description: "Conquer Hyrox from home with this 12-week beginner plan. Train for all Hyrox stations and 8km running using minimal equipment. Build functional strength and endurance for your first event.",
    imageUrl: "https://m.media-amazon.com/images/I/61kK7bA85OL._SY466_.jpg",
    amazonUrl: "https://amzn.to/445PMV1",
    ctaText: "Get Your Copy",
  },
  {
    id: 'advanced-hyrox-workouts',
    title: "45 Advanced Hyrox Workouts",
    description: "For experienced Hyrox competitors ready to elevate their training. This guide provides 45 advanced workouts designed to push your limits and help you achieve your best performance.",
    imageUrl: "https://m.media-amazon.com/images/I/612iiof3NPL._SY466_.jpg",
    amazonUrl: "https://amzn.to/4livuyq",
    ctaText: "Get Your Copy",
  }
];

export default function AmazonBookPromotion() {
  return (
    <section id="book-promotion" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <BookOpenCheck className="h-16 w-16 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            For the Analog Athlete: <span className="text-accent">Your Plan, On Paper.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Tired of screen-time distractions? Our training books are for the athlete who wants to unplug and focus. Physically record your progress, avoid notifications, and own your plan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {books.map((book) => (
            <Card key={book.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm group border-t-2 border-primary/30">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 flex-shrink-0 p-4 flex items-center justify-center bg-muted/10 md:rounded-l-lg md:rounded-tr-none rounded-t-lg">
                  <div className="relative w-full max-w-[200px] md:max-w-full aspect-[2/3]">
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      width={200} 
                      height={300}
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 767px) 200px, 33vw"
                      className="group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="font-headline text-xl md:text-2xl text-primary group-hover:text-accent transition-colors duration-300">{book.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <CardDescription className="font-body text-sm md:text-base text-muted-foreground mb-4">
                      {book.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-0 mt-4">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:w-auto transition-colors duration-300 font-headline py-3 text-sm md:text-base" asChild>
                      <TrackedLink
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        event="cta_book_click"
                        eventParams={{ book_id: book.id, location: 'book_promotion' }}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" /> {book.ctaText} <ArrowUpRight className="ml-1.5 h-4 w-4" />
                      </TrackedLink>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
