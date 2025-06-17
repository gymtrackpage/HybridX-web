import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpenCheck, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const books = [
  {
    id: 'book1',
    title: 'Hybrid Athlete\'s Deep Dive',
    description: 'Unlock the science and strategy behind peak hybrid performance. Essential reading for serious athletes.',
    imageUrl: 'https://placehold.co/300x450.png',
    imageHint: 'dynamic fitness book',
    amazonUrl: '#', 
    ctaText: 'Get Your Copy',
  },
  {
    id: 'book2',
    title: 'Cardio & Strength Synergy',
    description: 'Master the art of concurrent training. Build elite endurance without sacrificing strength gains. Includes advanced protocols.',
    imageUrl: 'https://placehold.co/300x450.png',
    imageHint: 'synergy training book',
    amazonUrl: '#', 
    ctaText: 'View on Amazon',
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
                    data-ai-hint={book.imageHint}
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
