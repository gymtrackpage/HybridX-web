import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const books = [
  {
    id: 'book1',
    title: 'The Hybrid Athlete\'s Handbook',
    description: 'Your comprehensive guide to mastering hybrid training. Includes detailed plans and nutritional advice.',
    imageUrl: 'https://placehold.co/300x450.png',
    imageHint: 'book cover fitness',
    amazonUrl: '#', // Placeholder Amazon link
  },
  {
    id: 'book2',
    title: 'Hybrid Cardio & Strength Blueprint',
    description: 'Unlock peak performance with synergistic cardio and strength protocols. Perfect for all fitness levels.',
    imageUrl: 'https://placehold.co/300x450.png',
    imageHint: 'book cover training',
    amazonUrl: '#', // Placeholder Amazon link
  },
];

export default function AmazonBookPromotion() {
  return (
    <section id="book-promotion" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            Get Our Training Guides
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Take your knowledge further with our in-depth paper training plan books, available on Amazon.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {books.map((book) => (
            <Card key={book.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 flex-shrink-0 relative h-64 sm:h-auto">
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={book.imageHint}
                    className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="font-headline text-2xl text-primary">{book.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-grow">
                    <CardDescription className="font-body text-muted-foreground mb-4">
                      {book.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-0 mt-4">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto transition-colors duration-300" asChild>
                      <Link href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="mr-2 h-5 w-5" /> Buy on Amazon
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
