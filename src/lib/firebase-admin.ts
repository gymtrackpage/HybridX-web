import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// On Firebase App Hosting, initializeApp() with no credential uses the
// backend's default service account (Application Default Credentials) — no
// secrets required there. Locally, set GOOGLE_APPLICATION_CREDENTIALS or the
// individual GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY vars already
// used elsewhere in this project for the Sheets API.
function initializeAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || 'hybridx-hub';
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      projectId,
    });
  }

  // App Hosting runtime: falls back to Application Default Credentials.
  return initializeApp({ projectId });
}

const adminApp = initializeAdminApp();

export const adminFirestore = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
