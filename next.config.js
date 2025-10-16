/** @type {import('next').NextConfig} */

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
};

module.exports = nextConfig;
