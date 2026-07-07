import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

export const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_EXPIRES_IN_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

function getAllowedEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export interface AdminSession {
  uid: string;
  email: string;
}

/** Verifies the session cookie and checks the email allow-list. Returns null if not a valid admin. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const email = (decoded.email || '').toLowerCase();
    const allowed = getAllowedEmails();
    if (!email || !allowed.includes(email)) return null;
    return { uid: decoded.uid, email };
  } catch {
    return null;
  }
}

export async function createAdminSessionCookie(idToken: string): Promise<{ cookie: string; email: string } | null> {
  const decoded = await adminAuth.verifyIdToken(idToken);
  const email = (decoded.email || '').toLowerCase();
  const allowed = getAllowedEmails();
  if (!email || !allowed.includes(email)) return null;

  const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_EXPIRES_IN_MS });
  return { cookie, email };
}

export { SESSION_EXPIRES_IN_MS };
