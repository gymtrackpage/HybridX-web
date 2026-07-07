import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Inter, Space_Grotesk, Anton, Archivo } from 'next/font/google';
import { SITE_CONFIG, createOrganizationSchema, createWebSiteSchema, createSportsOrganizationSchema } from '@/lib/seo';

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

// Display + label faces for the "Build a Bigger Engine" funnel (self-hosted by Next).
const anton = Anton({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
  weight: ['400'],
});

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'HybridX: Hyrox Training Plans, Workouts & Coaching App',
    template: '%s | HybridX Hub',
  },
  description: 'Expert Hyrox training plans and hybrid workout programs. Master Hyrox competitions with scientifically-backed training, books, and coaching. Free fitness calculators.',
  keywords: [
    'hyrox',
    'hyrox training',
    'hyrox workout',
    'what is hyrox',
    'hyrox competition',
    'hyrox training plan',
    'hybrid training',
    'hyrox race',
    'hyrox preparation',
    'running calculators',
    'strength calculators',
    'fitness calculators',
    'training plans',
    'hybrid athlete',
    'functional fitness',
  ],
  authors: [{ name: 'HybridX Hub', url: 'https://hybridx.club' }],
  creator: 'HybridX Hub',
  publisher: 'HybridX Hub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/Icon Logo.png',
    apple: '/Icon Logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_CONFIG.name,
    title: 'HybridX: Hyrox Training Plans, Workouts & Coaching App',
    description: 'Expert Hyrox training plans and hybrid workout programs. Master Hyrox competitions with scientifically-backed training, books, and coaching.',
    images: [
      {
        url: '/Icon Logo.png',
        width: 1200,
        height: 630,
        alt: 'HybridX Hub - Hybrid Training',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HybridX: Hyrox Training Plans, Workouts & Coaching App',
    description: 'Expert Hyrox training plans and hybrid workout programs. Master Hyrox competitions with scientifically-backed training, books, and coaching.',
    images: ['/Icon Logo.png'],
    creator: '@hybridxhub',
  },
  alternates: {
    canonical: (process.env.NODE_ENV === 'production' &&
                !process.env.GOOGLE_CLOUD_WORKSTATIONS &&
                !process.env.WEB_HOST) ? SITE_CONFIG.url : undefined,
  },
  verification: {
    google: 'pqqqhsjCj9Bk1lngrIUZozN4Gg187vaRgwfVHXcNUPg', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = createOrganizationSchema();
  const webSiteSchema = createWebSiteSchema();
  const sportsOrgSchema = createSportsOrganizationSchema();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${anton.variable} ${archivo.variable}`}>
      <head>
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema — entity recognition + sitelinks search for AI engines */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        {/* SportsOrganization Schema — domain authority signal for Hyrox/fitness niche */}
        <Script
          id="sports-org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsOrgSchema) }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XKH1WYE7CQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XKH1WYE7CQ', {
              linker: { domains: ['hybridx.club', 'app.hybridx.club'] }
            });
          `}
        </Script>
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
