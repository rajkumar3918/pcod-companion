import { doc, getDoc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./config";

// One pantry per account (household), shared across all profiles on it —
// not per profile, since everyone's shopping from the same kitchen.
function pantryRef(accountId) {
  return doc(db, "users", accountId, "household", "pantry");
}

export async function getPantry(accountId) {
  const snap = await getDoc(pantryRef(accountId));
  const have = snap.exists() ? snap.data().have || [] : [];
  return new Set(have);
}

export async function addToPantry(accountId, key) {
  await setDoc(pantryRef(accountId), { have: arrayUnion(key) }, { merge: true });
}

export async function removeFromPantry(accountId, key) {
  await setDoc(pantryRef(accountId), { have: arrayRemove(key) }, { merge: true });
}

// Full reset — used by the "Regenerate" button once everything's run out.
export async function clearPantry(accountId) {
  await setDoc(pantryRef(accountId), { have: [] }, { merge: true });
}
