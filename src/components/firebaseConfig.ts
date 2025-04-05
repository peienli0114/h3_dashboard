// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEOWwZOU5eIae01cVhz2o2BI2U1jMcvgY",
  authDomain: "survey-app-b7e2b.firebaseapp.com",
  projectId: "survey-app-b7e2b",
  storageBucket: "survey-app-b7e2b.firebasestorage.app",
  messagingSenderId: "321835179876",
  appId: "1:321835179876:web:d89f0d1ed5e41f7a15e471"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
