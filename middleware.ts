
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is now intentionally left blank. 
// All header logic has been centralized in `next.config.js` to avoid conflicts
// and provide a single source of truth for security policies.
// This file is kept to demonstrate where one might add other middleware logic
// (e.g., authentication checks, redirects) in the future.

export function middleware(request: NextRequest) {
  // No-op. Return the response to continue the request chain.
  return NextResponse.next();
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
