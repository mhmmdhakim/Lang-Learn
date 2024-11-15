// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjPju6mswJ8jd2UKn8zytrcTE7D8_8aYM",
  authDomain: "lang-learn-48b25.firebaseapp.com",
  projectId: "lang-learn-48b25",
  storageBucket: "lang-learn-48b25.firebasestorage.app",
  messagingSenderId: "477951104783",
  appId: "1:477951104783:web:02b890cddcd50862ed907a",
  measurementId: "G-09N4K8DQ0C",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
