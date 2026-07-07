import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

export const ADMIN_SESSION_COOKIE = 'admin_session';

// Firebase ID tokens are valid for 1 hour; store the token itself (verified
// via verifyIdToken, which needs no special IAM grant) rather than a Firebase
// "session cookie" (which requires signBlob / Service Account Token Creator
// permission on the backend's service account to mint). Set the cookie to
// expire a little before the token actually does, to be safe.
const SESSION_EXPIRES_IN_MS = 55 * 60 * 1000; // 55 minutes

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

/** Verifies the stored ID token and checks the email allow-list. Returns null if not a valid admin. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const idToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!idToken) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
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

  return { cookie: idToken, email };
}

export { SESSION_EXPIRES_IN_MS };
