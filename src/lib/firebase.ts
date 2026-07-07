// This file is the single source of truth for the Firebase configuration
// and initialization. All other files that need to interact with Firebase
// services should import them from here.

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL-gFhMxaJ_oAYgGvsIqvmmDBkIgF417E",
  authDomain: "hybridx-hub.firebaseapp.com",
  projectId: "hybridx-hub",
  storageBucket: "hybridx-hub.firebasestorage.app",
  messagingSenderId: "354413162075",
  appId: "1:354413162075:web:2dced5666f00d329b0197e"
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

// Initialize and export Firestore + Auth
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
