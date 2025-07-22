
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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
  },
  experimental: {
    allowedDevOrigins: [
      // Specific origin from the error log, assuming https
      'https://6000-firebase-studio-1750151528468.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev',
      // Local development server address from logs
      'http://localhost:9002',
    ],
    serverActions: true,
  },
};

export default nextConfig;
