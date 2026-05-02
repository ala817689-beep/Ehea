import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default empty config to prevent crash if file missing
const defaultConfig = {
  apiKey: "pending",
  authDomain: "pending",
  projectId: "pending",
  storageBucket: "pending",
  messagingSenderId: "pending",
  appId: "pending",
  firestoreDatabaseId: "(default)"
};

let firebaseConfig = defaultConfig;

try {
  // We use a dynamic import or require to handle missing file gracefully during setup
  // @ts-ignore
  const config = await import('../../firebase-applet-config.json', { assert: { type: 'json' } });
  firebaseConfig = config.default || config;
} catch (e) {
  console.warn("Firebase config not available yet.");
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
