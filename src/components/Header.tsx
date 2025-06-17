import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogIn } from 'lucide-react';

const navItems = [
  { label: 'Training Plans', href: '#training-plans' },
  { label: 'Our App', href: '#app-promotion' },
  { label: 'Books', href: '#book-promotion' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold font-headline text-xl text-primary hover:text-accent transition-colors">HybridX Hub</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-accent text-foreground/80 font-body"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-headline" asChild>
            <Link href="https://app.hybridx.club" target="_blank" rel="noopener noreferrer">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-5 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition-colors hover:text-accent text-lg font-headline text-foreground/90"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4 py-3 text-base font-headline" asChild>
                  <Link href="https://app.hybridx.club" target="_blank" rel="noopener noreferrer">
                     <LogIn className="mr-2 h-5 w-5" /> Login / Sign Up
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
