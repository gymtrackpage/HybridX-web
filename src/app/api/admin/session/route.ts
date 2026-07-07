import { NextRequest, NextResponse } from 'next/server';
import { createAdminSessionCookie, ADMIN_SESSION_COOKIE, SESSION_EXPIRES_IN_MS } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const { idToken } = await request.json().catch(() => ({ idToken: null }));

  if (typeof idToken !== 'string' || !idToken) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  let result;
  try {
    result = await createAdminSessionCookie(idToken);
  } catch (error) {
    console.error('[admin-session] Failed to verify ID token:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  if (!result) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, result.cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_EXPIRES_IN_MS / 1000,
  });
  return response;
}
