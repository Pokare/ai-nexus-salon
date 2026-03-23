import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCD9N51P9miLEgNbNOt4I70XgdqHiapzCY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'ai-nexus-salon.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ai-nexus-salon',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'ai-nexus-salon.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1040137405282',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1040137405282:web:d9e1ba143d35997b5e623b',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-X9HJHJ8F08',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
