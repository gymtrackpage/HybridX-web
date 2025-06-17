import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    id: 'faq1',
    question: 'What is Hybrid Training?',
    answer:
      'Hybrid training combines multiple training disciplines, such as endurance running, strength training, and cardio, into a single, cohesive program. The goal is to develop a well-rounded athleticism rather than specializing in one area.',
  },
  {
    id: 'faq2',
    question: 'Who are these training plans and books for?',
    answer:
      'Our plans and books are designed for individuals of all fitness levels who are interested in hybrid training. Whether you\'re a beginner looking to get started or an experienced athlete aiming to optimize performance, you\'ll find valuable resources.',
  },
  {
    id: 'faq3',
    question: 'How do I access the HybridX app?',
    answer:
      'You can access the HybridX app by visiting app.hybridx.club. It\'s a web-based application accessible from any device with an internet browser. We recommend bookmarking it for easy access.',
  },
  {
    id: 'faq4',
    question: 'Are the books different from the app content?',
    answer:
      'Our books offer in-depth knowledge, foundational principles, and often include comprehensive programs that can be followed offline. The app provides interactive tracking, dynamic plan adjustments (in future versions), and a convenient way to access your plans on the go. They are designed to be complementary.',
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Find answers to common questions about Hybrid Training and our products.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b border-border hover:bg-background/50 transition-colors duration-200 rounded-md mb-2 shadow-sm bg-background">
                <AccordionTrigger className="p-6 text-left font-headline text-lg text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 font-body text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
