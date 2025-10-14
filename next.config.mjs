/** @type {import('next').NextConfig} */

// Detect if running in a Firebase App Hosting preview environment
const isPreview = !!process.env.FIREBASE_APP_HOSTING_URL;
// Detect if running in Firebase Studio (Cloud Workstations)
const isStudio = !!process.env.GOOGLE_CLOUD_WORKSTATIONS || !!process.env.WEB_HOST;

const getSecurityHeaders = () => {
  const baseSecurityHeaders = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
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

  // Define Content Security Policy directives
  const cspDirectives = [
    "default-src 'self'",
    // Added *.google-analytics.com to connect-src for full analytics support
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com https://app.ecwid.com https://script.google.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: http:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.google-analytics.com https://app.ecwid.com https://script.google.com",
    "frame-src 'self' https://app.ecwid.com https://script.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://script.google.com",
    // ALWAYS allow framing by Studio's domains.
    "frame-ancestors 'self' https://*.cloudworkstations.dev https://*.idx.google.com",
  ];

  // In Firebase Studio or Preview, relax CSP and headers. In production, be strict.
  if (isStudio || isPreview) {
    // Don't add HSTS in preview/studio environments
  } else {
    // Add production-only headers
    baseSecurityHeaders.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    });
    // Add production-only CSP directives
    cspDirectives.push("upgrade-insecure-requests");
  }

  // In non-production environments, we need a less restrictive frame-ancestors policy
  // to allow for previewing in iframes.
  if (isStudio || isPreview) {
      // Find and remove the default frame-ancestors policy if it exists
      const faIndex = cspDirectives.findIndex(dir => dir.startsWith("frame-ancestors"));
      if (faIndex > -1) {
          cspDirectives.splice(faIndex, 1);
      }
      // Add a more permissive policy for development environments
      cspDirectives.push("frame-ancestors 'self' https://*.cloudworkstations.dev https://*.idx.google.com");
  }


  const finalHeaders = [
    ...baseSecurityHeaders,
    {
      key: 'Content-Security-Policy',
      value: cspDirectives.join('; ').replace(/\s{2,}/g, ' ').trim()
    }
  ];
  
  return finalHeaders;
};

const nextConfig = {
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
    // In Firebase Studio, we don't apply headers to allow the preview to work
    if (isStudio) {
      return [];
    }
    return [
      {
        source: '/(.*)',
        headers: getSecurityHeaders(),
      },
    ];
  },
};

export default nextConfig;
