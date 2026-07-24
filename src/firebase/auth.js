import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

// No login screen — every device silently gets a stable anonymous identity.
// This is NOT "no security": Firestore rules still require a matching
// auth.uid, so a stranger with just the URL can't read/write your data.
// It just means there's no email/password to manage for a shared-device
// family app with a handful of profiles.
export function ensureAnonymousAuth() {
  return signInAnonymously(auth);
}

export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
