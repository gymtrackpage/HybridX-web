import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpenCheck, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const books = [
  {
    id: 'hyrox-12-week-prep',
    title: "Hyrox 12 Week Training Plan for Hyrox Race Preparation",
    description: "This comprehensive training guide is designed to help athletes of all levels excel in Hyrox and similar hybrid fitness events. Rooted in science and practical application, the book provides an in-depth approach to mastering Hyrox-specific movements, optimising running performance, and building the strength required to succeed. Each section is packed with expert advice, technique breakdowns, progressive training strategies, and common pitfalls to avoid, ensuring athletes can train effectively and efficiently. Whether you’re preparing for your first race or aiming for a competitive edge, this guide equips you with the knowledge and tools to enhance your fitness, improve your performance, and confidently tackle the demands of hybrid sports.",
    imageUrl: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/d555d4e2-4284-4579-a41f-2af4bec009bd.__CR250,0,500,666_PT0_SX300_V1___.png",
    amazonUrl: "https://amzn.to/3SSh8sz",
    ctaText: "Get Your Copy",
  },
  {
    id: 'elite-hyrox-training-plan',
    title: "Elite Hyrox Training Plan - 12 Week Training Plan for Hyrox Race Preparation",
    description: "This comprehensive training guide is designed to help athletes of all levels excel in Hyrox and similar hybrid fitness events. Rooted in science and practical application, the book provides an unique and highly effective approach to training for Hyrox by optimising the energy systems in the most effective method. Building a high level anaerobic strength and power alongside the aerobic capacity required to succeed.",
    imageUrl: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b9871c7d-2cc7-4004-8416-c3e18450520e.__CR350,0,1400,1400_PT0_SX300_V1___.png",
    amazonUrl: "https://amzn.to/44jOd74",
    ctaText: "Get Your Copy",
  },
  {
    id: 'train-for-hyrox-at-home',
    title: "Train for Hyrox at Home - 12 Week Training Plan",
    description: "Prepare for your Hyrox event with \"Train for Hyrox at Home,\" the 12-week beginner's training program designed for results without needing a gym. If you're new to Hyrox or hybrid fitness, this guide introduces you to the 8km of running and 8 functional workout stations, providing a clear, step-by-step path to success. You'll learn how to creatively use minimal equipment – just your own bodyweight, a versatile loaded backpack, durable resistance bands, and a single kettlebell or dumbbell – to build comprehensive functional strength and race-day endurance. This plan features detailed at-home workout alternatives for every Hyrox station, including SkiErg simulations using bands , effective sled push alternatives like towel pushes on smooth surfaces or powerful hill sprints with your backpack , and smart sandbag lunge variations using your weighted backpack. Master the crucial skill of compromised running through engaging outdoor running workouts, leveraging stair climbs for power , park workouts for variety, and integrated bodyweight circuits to boost both strength and conditioning. This full-body workout plan is more than just exercise; it’s a full training plan to uncover your potential, improve your running technique, and achieve your fitness goals, whether that's weight loss, enhanced athletic performance, or completing your first Hyrox event.",
    imageUrl: "https://m.media-amazon.com/images/I/61kK7bA85OL._SY466_.jpg",
    amazonUrl: "https://amzn.to/445PMV1",
    ctaText: "Get Your Copy",
  },
];

export default function AmazonBookPromotion() {
  return (
    <section id="book-promotion" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <BookOpenCheck className="h-16 w-16 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            Unlock Expert Hybrid Strategies with Our Guides
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Go beyond the basics. Our bestselling books provide in-depth knowledge and actionable frameworks, available on Amazon.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {books.map((book) => (
            <Card key={book.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm group border-t-2 border-primary/30">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 flex-shrink-0 relative h-64 sm:h-auto overflow-hidden">
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="font-headline text-2xl text-primary group-hover:text-accent transition-colors duration-300">{book.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <CardDescription className="font-body text-muted-foreground mb-4">
                      {book.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-0 mt-4">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto transition-colors duration-300 font-headline py-3" asChild>
                      <Link href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="mr-2 h-5 w-5" /> {book.ctaText}
                      </Link>
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
