// This file is the single source of truth for the Firebase configuration
// and initialization. All other files that need to interact with Firebase
// services should import them from here.

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// This object is populated by the `RequestFirebaseProjectWithConfig` tool
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};


// Initialize Firebase
// We wrap this in a function to ensure we don't try to initialize the app more
// than once, which is a common issue in Next.js with its hot-reloading.
function initializeFirebase() {
    if (getApps().length > 0) {
      return getApps()[0];
    }
    return initializeApp(firebaseConfig);
}

const app = initializeFirebase();

// Initialize and export Firestore
const firestore = getFirestore(app);

export { app, firestore };
