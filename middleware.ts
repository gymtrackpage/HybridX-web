
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the response to add headers
  const response = NextResponse.next();

  const isDevelopment = process.env.NODE_ENV === 'development';
  const studioHost = '*.cloudworkstations.dev';
  const idxHost = '*.idx.google.com';

  // ✅ DNS Prefetch Control - Allow DNS prefetching for performance
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // Conditionally add HSTS header only in production
  if (!isDevelopment) {
      response.headers.set(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload'
      );
  }

  // ✅ X-Content-Type-Options - Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // ✅ X-XSS-Protection - Enable XSS filter (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // ✅ Referrer-Policy - Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // ✅ Permissions-Policy - Control browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // ✅ Content-Security-Policy - Mitigate XSS and injection attacks
  const cspDirectives = [
    "default-src 'self'",
    // Scripts: Allow self, inline scripts (needed for Next.js), and trusted domains
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://app.ecwid.com https://script.google.com",
    // Styles: Allow self and inline styles (needed for Tailwind/Next.js)
    "style-src 'self' 'unsafe-inline'",
    // Images: Allow self, data URIs, and external image sources
    "img-src 'self' data: https: http:",
    // Fonts: Allow self and data URIs
    "font-src 'self' data:",
    // Connect (API calls): Allow self and trusted domains
    "connect-src 'self' https://*.google-analytics.com https://www.google-analytics.com https://app.ecwid.com https://script.google.com",
    // Frames: Allow Ecwid and Google Apps Script iframes
    "frame-src 'self' https://app.ecwid.com https://script.google.com",
    // Object/Embed: Disallow plugins
    "object-src 'none'",
    // Base URI: Restrict base tag usage
    "base-uri 'self'",
    // Form actions: Restrict where forms can submit
    "form-action 'self' https://script.google.com",
    // Frame ancestors: Prevent embedding, but ALWAYS allow Studio & IDX
    `frame-ancestors 'self' https://${studioHost} https://${idxHost}`,
    // Upgrade insecure requests (disabled in dev to allow preview)
    ...(isDevelopment ? [] : ["upgrade-in-secure-requests"]),
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
