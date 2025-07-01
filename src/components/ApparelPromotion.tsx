import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shirt, ArrowUpRight } from 'lucide-react';

const apparelItems = [
  {
    id: 'performance-tee',
    name: 'Performance Tee',
    imageUrl: 'https://placehold.co/500x500.png',
    dataAiHint: 't-shirt apparel',
  },
  {
    id: 'training-hoodie',
    name: 'Training Hoodie',
    imageUrl: 'https://placehold.co/500x500.png',
    dataAiHint: 'hoodie apparel',
  },
];

export default function ApparelPromotion() {
  return (
    <section id="apparel-promotion" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <Shirt className="h-16 w-16 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            Gear Up. Look the Part.
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Train in comfort and style with the official HybridX apparel collection. High-performance gear designed for the hybrid athlete.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {apparelItems.map((item) => (
            <Card key={item.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden bg-card/80 backdrop-blur-sm group border-t-2 border-primary/30">
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                   <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      data-ai-hint={item.dataAiHint}
                    />
                </div>
                <div className="p-4 text-center bg-card rounded-b-lg">
                    <h3 className="font-headline text-xl text-primary group-hover:text-accent transition-colors">{item.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/store">
                    Shop The Collection <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
