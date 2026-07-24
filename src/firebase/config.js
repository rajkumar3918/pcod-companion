import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// All values come from .env (copy .env.example to .env and fill in
// from Firebase console > Project settings > General > Your apps).
const firebaseConfig = {
  apiKey: "AIzaSyClBAuPtwDNvzKzl0_jL7IoQUGIymP972Q",
  authDomain: "pcod-companion.firebaseapp.com",
  projectId: "pcod-companion",
  storageBucket: "pcod-companion.firebasestorage.app",
  messagingSenderId: "752756089126",
  appId: "1:752756089126:web:2f4a6b86995fb8fcab61e7",
  measurementId: "G-79XVC71VVP"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
