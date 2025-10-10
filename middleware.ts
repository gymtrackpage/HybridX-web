
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // --- Looser policy for Development/Preview ---
  // These headers are safe and do not interfere with iframes or local development.
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // --- Stricter policy for Production ---
  // These headers (HSTS, CSP) are only applied when NOT in development mode.
  // This prevents them from blocking the Studio web preview.
  if (!isDevelopment) {
    // Force HTTPS for 2 years
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );

    // Define a strict Content Security Policy for production
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://app.ecwid.com https://script.google.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: http:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.google-analytics.com https://www.google-analytics.com https://app.ecwid.com https://script.google.com",
      "frame-src 'self' https://app.ecwid.com https://script.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://script.google.com",
      // IMPORTANT: This allows Studio and other Google tools to embed the app
      "frame-ancestors 'self' https://*.cloudworkstations.dev https://*.idx.google.com",
      "upgrade-insecure-requests",
    ];
    response.headers.set('Content-Security-Policy', cspDirectives.join('; '));
  } else {
    // In development, have a very permissive frame-ancestors policy
    // to ensure the preview works without any issues.
    response.headers.set(
      'Content-Security-Policy',
      "frame-ancestors 'self' https://*.cloudworkstations.dev https://*.idx.google.com;"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - and common image/asset extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)',
  ],
};
