import { doc, getDoc, setDoc, collection, getDocs, query, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

// One document per day, per profile: users/{deviceUid}/profiles/{profileId}/logs/{YYYY-MM-DD}
function logRef(deviceUid, profileId, dateStr) {
  return doc(db, "users", deviceUid, "profiles", profileId, "logs", dateStr);
}

export async function getLog(deviceUid, profileId, dateStr) {
  const snap = await getDoc(logRef(deviceUid, profileId, dateStr));
  return snap.exists() ? snap.data() : null;
}

export async function setLog(deviceUid, profileId, dateStr, data) {
  await setDoc(
    logRef(deviceUid, profileId, dateStr),
    { ...data, date: dateStr, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function listLogsForMonth(deviceUid, profileId, yyyymm) {
  const snap = await getDocs(query(collection(db, "users", deviceUid, "profiles", profileId, "logs")));
  const result = {};
  snap.forEach((d) => {
    if (d.id.startsWith(yyyymm)) result[d.id] = d.data();
  });
  return result;
}
