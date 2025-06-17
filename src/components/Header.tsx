
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogIn, ChevronDown, Route, X, TrendingUp, HeartPulse } from 'lucide-react'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  label: string;
  href?: string;
  isDropdown?: boolean;
  items?: SubNavItem[];
  icon?: React.ReactNode;
}

interface SubNavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Training Plans', href: '#training-plans' },
  { label: 'Our App', href: '#app-promotion' },
  { label: 'Books', href: '#book-promotion' },
  { 
    label: 'Calculators', 
    isDropdown: true, 
    items: [
      { label: 'Pace Calculator', href: '/calculators/pace-calculator', icon: <Route className="mr-2 h-5 w-5" /> },
      { label: 'Race Time Predictor', href: '/calculators/race-time-predictor', icon: <TrendingUp className="mr-2 h-5 w-5" /> },
      { label: 'Heart Rate Zones', href: '/calculators/heart-rate-zone-calculator', icon: <HeartPulse className="mr-2 h-5 w-5" /> },
    ] 
  },
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
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-medium">
          {navItems.map((item) => (
            item.isDropdown && item.items ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center transition-colors hover:text-accent text-foreground/80 font-body px-2 lg:px-3 py-2 text-sm">
                    {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border-border/60">
                  {item.items.map(subItem => (
                    <DropdownMenuItem key={subItem.label} asChild className="hover:bg-accent/10 focus:bg-accent/10">
                      <Link href={subItem.href} className="font-body text-foreground/90 flex items-center">
                        {subItem.icon} {subItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button key={item.label} variant="ghost" asChild className="transition-colors hover:text-accent text-foreground/80 font-body px-2 lg:px-3 py-2 text-sm">
                <Link href={item.href!}>
                  {item.label}
                </Link>
              </Button>
            )
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
              <Button variant="ghost" size="icon" className="md:hidden text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[320px] bg-background p-6 border-l-border/60">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
               <div className="flex justify-between items-center mb-8">
                 <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold font-headline text-xl text-primary">HybridX Hub</span>
                 </Link>
                <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-primary">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </Button>
                </SheetClose>
               </div>
              <nav className="flex flex-col space-y-1">
                {navItems.flatMap((item) => 
                  item.isDropdown && item.items ? (
                    <>
                      <p className="px-3 py-3 text-base font-headline text-foreground/70">{item.label}</p>
                      {item.items.map(subItem => (
                        <SheetClose asChild key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className="flex items-center rounded-md px-3 py-3 transition-colors hover:bg-accent/10 text-base font-headline text-foreground/90 ml-3"
                          >
                            {subItem.icon} {subItem.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </>
                  ) : (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href!}
                        className="flex items-center rounded-md px-3 py-3 transition-colors hover:bg-accent/10 text-base font-headline text-foreground/90"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  )
                )}
                <SheetClose asChild>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 mt-6 py-3 text-base font-headline w-full" asChild>
                    <Link href="https://app.hybridx.club" target="_blank" rel="noopener noreferrer">
                       <LogIn className="mr-2 h-5 w-5" /> Login / Sign Up
                    </Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
