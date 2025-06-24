
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'HybridX Hub: Training Plans, Calculators & Coaching App',
  description: 'Your central hub for hybrid training plans, books, and app. Access free running and strength calculators to optimize your performance.',
  icons: {
    icon: '/Icon Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Removed direct Google Font links, next/font handles this now */}
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          defaultTheme="light"
          storageKey="hybridx-ui-theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
