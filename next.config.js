/** @type {import('next').NextConfig} */

const nextConfig = {
  // ✅ ENABLED: Catch TypeScript errors during build
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      // Old long-form sales page — duplicated /free-hyrox-plan and split
      // ranking signals for "hyrox training plan" across three URLs.
      {
        source: '/hyrox-domination',
        destination: '/free-hyrox-plan',
        permanent: true,
      },
      // Legacy "early access" waitlist page — the app is live; /app is the
      // marketing page and app.hybridx.club is the product.
      {
        source: '/sign-up',
        destination: '/app',
        permanent: true,
      },
    ];
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
};

module.exports = nextConfig;
