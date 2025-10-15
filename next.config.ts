import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';

// Base security headers
const baseSecurityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  }
];

// Production-only security headers
const productionSecurityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }
];

// Content-Security-Policy
const cspDirectives = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://app.ecwid.com https://script.google.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: http:;
  font-src 'self' data:;
  connect-src 'self' https://*.google-analytics.com https://www.google-analytics.com https://app.ecwid.com https://script.google.com;
  frame-src 'self' https://app.ecwid.com https://script.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://script.google.com;
  frame-ancestors 'self' https://*.cloudworkstations.dev https://*.idx.google.com;
  ${isDevelopment ? '' : 'upgrade-insecure-requests;'}
`.replace(/\s{2,}/g, ' ').trim();


// Determine final security headers
const securityHeaders = [
  ...baseSecurityHeaders,
  ...(!isDevelopment ? productionSecurityHeaders : []),
  {
    key: 'Content-Security-Policy',
    value: cspDirectives
  }
];

const nextConfig: NextConfig = {
  // ✅ ENABLED: Catch TypeScript errors during build
  typescript: {
    ignoreBuildErrors: false,
  },
  // ✅ ENABLED: Enforce code quality with ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      }
    ],
    // Performance: Enable image optimization
    formats: ['image/webp', 'image/avif'],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // ✅ SECURITY: Apply headers to all routes (works with Firebase App Hosting)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
