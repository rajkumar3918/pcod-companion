// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClBAuPtwDNvzKzl0_jL7IoQUGIymP972Q",
  authDomain: "pcod-companion.firebaseapp.com",
  projectId: "pcod-companion",
  storageBucket: "pcod-companion.firebasestorage.app",
  messagingSenderId: "752756089126",
  appId: "1:752756089126:web:2f4a6b86995fb8fcab61e7",
  measurementId: "G-79XVC71VVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);