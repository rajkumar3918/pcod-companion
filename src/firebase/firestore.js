import { doc, getDoc, setDoc, collection, getDocs, query, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

// One document per day: users/{uid}/logs/{YYYY-MM-DD}
function logRef(uid, dateStr) {
  return doc(db, "users", uid, "logs", dateStr);
}

export async function getLog(uid, dateStr) {
  const snap = await getDoc(logRef(uid, dateStr));
  return snap.exists() ? snap.data() : null;
}

export async function setLog(uid, dateStr, data) {
  await setDoc(
    logRef(uid, dateStr),
    { ...data, date: dateStr, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

// Returns { "2026-07-01": {...}, "2026-07-02": {...}, ... }
// Fetches the user's logs collection and filters client-side by YYYY-MM
// prefix — simple and well within free-tier limits at this app's scale.
export async function listLogsForMonth(uid, yyyymm) {
  const snap = await getDocs(query(collection(db, "users", uid, "logs")));
  const result = {};
  snap.forEach((d) => {
    if (d.id.startsWith(yyyymm)) result[d.id] = d.data();
  });
  return result;
}
