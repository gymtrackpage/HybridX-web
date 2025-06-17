
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogIn, ChevronDown, Route, TrendingUp, HeartPulse, Timer, ListChecks, Dumbbell, Target, Trophy, Percent, ClipboardList, Utensils } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
  isSeparator?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Training Plans', href: '#training-plans' },
  { label: 'Our App', href: '#app-promotion' },
  { label: 'Books', href: '#book-promotion' },
  {
    label: 'Calculators',
    isDropdown: true,
    items: [
      { label: 'Running Calculators Overview', href: '/calculators/running', icon: <ListChecks className="mr-2 h-5 w-5" /> },
      { isSeparator: true, label: 'Running Tools', href: '#' }, 
      { label: 'Pace Calculator', href: '/calculators/pace-calculator', icon: <Route className="mr-2 h-5 w-5" /> },
      { label: 'Race Time Predictor', href: '/calculators/race-time-predictor', icon: <TrendingUp className="mr-2 h-5 w-5" /> },
      { label: 'Heart Rate Zones', href: '/calculators/heart-rate-zone-calculator', icon: <HeartPulse className="mr-2 h-5 w-5" /> },
      { label: 'Split Time Calculator', href: '/calculators/split-time-calculator', icon: <Timer className="mr-2 h-5 w-5" /> },
      { isSeparator: true, label: 'Strength Tools', href: '#' },
      { label: '1RM Calculator', href: '/calculators/one-rep-max-calculator', icon: <Dumbbell className="mr-2 h-5 w-5" /> },
      { label: 'Percentage Weight Calculator', href: '/calculators/percentage-based-weight-calculator', icon: <Target className="mr-2 h-5 w-5" /> },
      { label: 'Powerlifting Score Calculator', href: '/calculators/powerlifting-score-calculator', icon: <Trophy className="mr-2 h-5 w-5" /> },
      { isSeparator: true, label: 'General Health Tools', href: '#' },
      { label: 'Body Fat Calculator', href: '/calculators/body-fat-calculator', icon: <Percent className="mr-2 h-5 w-5" /> },
      { label: 'Calorie & Macro Calculator', href: '/calculators/calorie-macronutrient-calculator', icon: <Utensils className="mr-2 h-5 w-5" /> },
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
                    subItem.isSeparator ? (
                      subItem.label.toLowerCase().includes("tools") ? (
                        <React.Fragment key={subItem.label}>
                          <DropdownMenuSeparator className="my-1" />
                          <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground flex items-center">
                            {
                              subItem.label.toLowerCase().includes("running") ? <ListChecks className="mr-2 h-4 w-4" /> :
                              subItem.label.toLowerCase().includes("strength") ? <Dumbbell className="mr-2 h-4 w-4" /> :
                              subItem.label.toLowerCase().includes("health") ? <ClipboardList className="mr-2 h-4 w-4" /> : null
                            }
                            {subItem.label}
                          </p>
                        </React.Fragment>
                      ) : (
                        <DropdownMenuSeparator key={subItem.label} className="my-1" />
                      )
                    ) : (
                      <DropdownMenuItem key={subItem.label} asChild className="hover:bg-accent/10 focus:bg-accent/10">
                        <Link href={subItem.href} className="font-body text-foreground/90 flex items-center">
                          {subItem.icon} {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    )
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
               <div className="flex justify-between items-center mb-8">
                 <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold font-headline text-xl text-primary">HybridX Hub</span>
                 </Link>
               </div>
               <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <nav className="flex flex-col space-y-1">
                {navItems.flatMap((item, index) =>
                  item.isDropdown && item.items ? (
                    <React.Fragment key={`${item.label}-${index}`}>
                      <p className="px-3 py-3 text-lg font-headline text-primary">{item.label}</p>
                      {item.items.map(subItem => (
                        subItem.isSeparator ? (
                          subItem.label.toLowerCase().includes("tools") ? (
                            <p key={subItem.label} className="px-3 pt-3 pb-1 text-sm font-medium text-foreground/70 ml-1 flex items-center">
                               {
                                subItem.label.toLowerCase().includes("running") ? <ListChecks className="mr-2 h-4 w-4" /> :
                                subItem.label.toLowerCase().includes("strength") ? <Dumbbell className="mr-2 h-4 w-4" /> :
                                subItem.label.toLowerCase().includes("health") ? <ClipboardList className="mr-2 h-4 w-4" /> : null
                               }
                              {subItem.label}
                            </p>
                          ) : (
                            <hr key={subItem.label} className="my-2 border-border/30" />
                          )
                        ) : (
                          <SheetClose asChild key={subItem.label}>
                            <Link
                              href={subItem.href}
                              className="flex items-center rounded-md px-3 py-3 transition-colors hover:bg-accent/10 text-base font-body text-foreground/90 ml-3"
                            >
                              {subItem.icon} {subItem.label}
                            </Link>
                          </SheetClose>
                        )
                      ))}
                    </React.Fragment>
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
