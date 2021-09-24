import { initializeApp, getApps } from "firebase/app"
// import firebase from 'firebase/compat/app';
import 'firebase/analytics'
// import 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/firestore'

const apps = getApps()



if (typeof window !== 'undefined' && apps.length === 0) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }

  initializeApp(firebaseConfig);
  // firebase.analytics();
}