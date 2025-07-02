
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
  title: 'HybridX: Training Plans, Calculators & Coaching App',
  description: 'Your central hub for hybrid training plans, books, and app. Access free running and strength calculators to optimize your performance.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22 viewBox=%220 0 50 50%22 fill=%22none%22 stroke=%22black%22 stroke-width=%225%22><line x1=%220%22 y1=%220%22 x2=%2250%22 y2=%2250%22 /><line x1=%2250%22 y1=%220%22 x2=%220%22 y2=%2250%22 /></svg>",
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
