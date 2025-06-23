
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogIn, ChevronDown, ListChecks, Dumbbell, ClipboardList } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

interface NavItem {
  label: string;
  href?: string;
  isDropdown?: boolean;
  items?: SubNavItem[];
  icon?: React.ReactNode;
}

interface SubNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isSeparator?: boolean;
}


const navItems: NavItem[] = [
  { label: 'Training Plans', href: '#training-plans' },
  { label: 'Our App', href: 'https://app.hybridx.club' },
  { label: 'Books', href: '#book-promotion' },
  {
    label: 'Calculators',
    isDropdown: true,
    items: [
      { label: 'Running Calculators', href: '/calculators/running', icon: <ListChecks className="mr-2 h-5 w-5" /> },
      { label: 'Strength Calculators', href: '/calculators/strength', icon: <Dumbbell className="mr-2 h-5 w-5" /> },
      { label: 'General Health Calculators', href: '/calculators/general-health', icon: <ClipboardList className="mr-2 h-5 w-5" /> },
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
          <Image
            src="/Full Logo (2).png"
            alt="HybridX Hub Logo"
            width={110} 
            height={40} 
            className="dark:filter dark:invert"
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-medium">
          {navItems.map((item) => (
            item.isDropdown && item.items ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center transition-colors hover:text-accent text-foreground/80 font-body px-2 lg:px-3 py-2 text-sm">
                    {item.icon} {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border-border/60">
                  {item.items.map(subItem => (
                    subItem.isSeparator ? (
                      <React.Fragment key={subItem.label}>
                         {/* Separators not currently used, but logic remains if needed */}
                      </React.Fragment>
                    ) : (
                      <DropdownMenuItem key={subItem.label} asChild className="hover:bg-accent/10 focus:bg-accent/10">
                        <Link href={subItem.href!} className="font-body text-foreground/90 flex items-center">
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
                  {item.icon} {item.label}
                </Link>
              </Button>
            )
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggleButton />
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
               <div className="flex justify-between items-center mb-6">
                 <Link href="/" className="flex items-center space-x-2">
                    <Image
                      src="/Full Logo (2).png" 
                      alt="HybridX Hub Logo"
                      width={110}
                      height={40}
                      className="dark:filter dark:invert"
                       style={{ objectFit: 'contain' }}
                    />
                 </Link>
               </div>
               <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) =>
                  item.isDropdown && item.items ? (
                    <React.Fragment key={`${item.label}-${index}-mobile`}>
                      <p className="px-3 py-3 text-lg font-headline text-primary">{item.label}</p>
                      {item.items.map(subItem => (
                        subItem.isSeparator ? (
                           null // Separators not currently used
                        ) : (
                          <SheetClose asChild key={`${subItem.label}-mobile`}>
                            <Link
                              href={subItem.href!}
                              className="flex items-center rounded-md px-3 py-3 transition-colors hover:bg-accent/10 text-base font-body text-foreground/90 ml-3"
                            >
                              {subItem.icon} {subItem.label}
                            </Link>
                          </SheetClose>
                        )
                      ))}
                    </React.Fragment>
                  ) : (
                    <SheetClose asChild key={`${item.label}-mobile`}>
                      <Link
                        href={item.href!}
                        className="flex items-center rounded-md px-3 py-3 transition-colors hover:bg-accent/10 text-base font-headline text-foreground/90"
                      >
                        {item.icon} {item.label}
                      </Link>
                    </SheetClose>
                  )
                )}
                <div className="mt-6 pt-4 border-t border-border/40 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggleButton />
                </div>
                <SheetClose asChild>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4 py-3 text-base font-headline w-full" asChild>
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
