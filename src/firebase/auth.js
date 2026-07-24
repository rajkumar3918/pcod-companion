import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./config";

// Web sessions persist in IndexedDB by default, but we set this explicitly
// so the intent is obvious: once someone signs in, they stay signed in
// across restarts/tabs until they tap "Log out". No repeated sign-in prompts.
setPersistence(auth, browserLocalPersistence);

const googleProvider = new GoogleAuthProvider();

// Popups are unreliable inside an installed/standalone PWA (some browsers
// block window.open there), so use a full-page redirect in that context
// instead, and fall back to redirect if a popup attempt fails for any reason.
function isStandalone() {
  return (
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    window.navigator.standalone === true
  );
}

export async function signInWithGoogle() {
  if (isStandalone()) {
    return signInWithRedirect(auth, googleProvider);
  }
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (err) {
    if (err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request" || err.code === "auth/operation-not-supported-in-this-environment") {
      return signInWithRedirect(auth, googleProvider);
    }
    throw err;
  }
}

// Call once on load to surface any error from a redirect-based sign-in
// (onAuthStateChanged will pick up success on its own).
export function checkRedirectResult() {
  return getRedirectResult(auth);
}

export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function logOut() {
  return firebaseSignOut(auth);
}
