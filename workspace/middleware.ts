
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the response to add headers
  const response = NextResponse.next();

  const isDevelopment = process.env.NODE_ENV === 'development';

  // Security headers
  const headers = [
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' }
  ];

  // Conditionally add HSTS header only in production
  if (!isDevelopment) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    });
  }

  headers.forEach(({ key, value }) => {
    response.headers.set(key, value);
  });
  
  // Content-Security-Policy
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://app.ecwid.com https://script.google.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: http:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.google-analytics.com https://www.google-analytics.com https://app.ecwid.com https://script.google.com",
    "frame-src 'self' https://app.ecwid.com https://script.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://script.google.com",
    "frame-ancestors 'self' https://*.cloudworkstations.dev https://*.idx.google.com",
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
  ];

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)',
  ],
};
