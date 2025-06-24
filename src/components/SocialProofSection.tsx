import { Users, BookOpen, Trophy } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 'Thousands',
    label: 'of Athletes on the App',
  },
  {
    icon: BookOpen,
    value: 'Thousands',
    label: 'of Training Books Sold',
  },
  {
    icon: Trophy,
    value: 'Countless',
    label: 'PRs Smashed',
  },
];

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="bg-secondary/30">
      <div className="container mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <stat.icon className="h-10 w-10 text-accent mb-3" />
              <p className="text-3xl font-bold font-headline text-primary">{stat.value}</p>
              <p className="text-md text-muted-foreground font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
