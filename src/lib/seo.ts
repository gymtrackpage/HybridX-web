import { Metadata } from 'next';

// Detect if running in Firebase Studio (Cloud Workstations) or development
const isStudio = typeof process !== 'undefined' &&
  (!!process.env.GOOGLE_CLOUD_WORKSTATIONS || !!process.env.WEB_HOST);
const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

// Use localhost or Studio URL in dev/studio, production URL otherwise
const getBaseUrl = () => {
  if (isStudio && typeof process !== 'undefined' && process.env.WEB_HOST) {
    return `https://${process.env.WEB_HOST}`;
  }
  if (isDev) {
    return 'http://localhost:3000';
  }
  return 'https://hybridx.club';
};

export const SITE_CONFIG = {
  name: 'HybridX Hub',
  description: 'Expert Hyrox training plans and hybrid workout programs. Master Hyrox competitions with scientifically-backed training plans, books, and coaching app. Free fitness calculators.',
  url: getBaseUrl(),
  ogImage: '/Icon Logo.png', // Update with your OG image path
  links: {
    twitter: 'https://twitter.com/hybridxhub', // Update with your Twitter
    instagram: 'https://instagram.com/hybridx.club', // Update with your Instagram
  },
};

export function createMetadata({
  title,
  description,
  image = SITE_CONFIG.ogImage,
  type = 'website',
  noIndex = false,
  path = '',
  keywords = [],
}: {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@hybridxhub', // Update with your Twitter handle
    },
  };
}

// Helper function to create FAQ schema
export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Helper function to create Organization schema
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/Icon Logo.png`,
    description: SITE_CONFIG.description,
    sameAs: [
      SITE_CONFIG.links.twitter,
      SITE_CONFIG.links.instagram,
    ],
  };
}

// Helper function to create HowTo schema
export function createHowToSchema({
  name,
  description,
  steps,
  image,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image: image ? `${SITE_CONFIG.url}${image}` : undefined,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// Helper function to create Product schema
export function createProductSchema({
  name,
  description,
  image,
  price,
  currency = 'GBP',
  availability = 'InStock',
}: {
  name: string;
  description: string;
  image: string;
  price: string;
  currency?: string;
  availability?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `${SITE_CONFIG.url}${image}`,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: SITE_CONFIG.url,
    },
  };
}

// Helper function to create BreadcrumbList schema
export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
