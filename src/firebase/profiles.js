import { collection, doc, getDocs, setDoc, deleteDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

const MAX_PROFILES = 4;

export async function listProfiles(deviceUid) {
  const snap = await getDocs(query(collection(db, "users", deviceUid, "profiles"), orderBy("createdAt", "asc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createProfile(deviceUid, name, color) {
  const existing = await listProfiles(deviceUid);
  if (existing.length >= MAX_PROFILES) {
    throw new Error(`Only ${MAX_PROFILES} profiles allowed.`);
  }
  const ref = doc(collection(db, "users", deviceUid, "profiles"));
  await setDoc(ref, { name, color, createdAt: serverTimestamp() });
  return { id: ref.id, name, color };
}

export async function deleteProfile(deviceUid, profileId) {
  await deleteDoc(doc(db, "users", deviceUid, "profiles", profileId));
  // Note: this does not recursively delete that profile's logs subcollection.
  // Firestore doesn't cascade-delete client-side; for a small personal app
  // this is fine to leave (orphaned data costs nothing meaningful at this
  // scale), but a Cloud Function could clean it up later if it ever matters.
}

export { MAX_PROFILES };
