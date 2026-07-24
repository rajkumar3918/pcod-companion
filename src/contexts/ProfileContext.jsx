import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const STORAGE_PREFIX = "pcod_active_profile_";
const ProfileContext = createContext({ profile: null, setProfile: () => {}, clearProfile: () => {}, ready: false });

// Remembers the last-picked profile per signed-in account (keyed by uid), so
// on a shared device logging in as a different phone number doesn't show
// the previous person's profile, and logging back in restores your own pick.
export function ProfileProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfileState] = useState(null);
  const [ready, setReady] = useState(false);

  const storageKey = user ? `${STORAGE_PREFIX}${user.uid}` : null;

  useEffect(() => {
    if (!storageKey) {
      // No signed-in user yet (or just logged out) — nothing to restore.
      setProfileState(null);
      setReady(true);
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey);
      setProfileState(raw ? JSON.parse(raw) : null);
    } catch (e) {
      setProfileState(null);
    }
    setReady(true);
  }, [storageKey]);

  const setProfile = (p) => {
    setProfileState(p);
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(p));
    } catch (e) { /* storage unavailable, profile still works for this session */ }
  };

  const clearProfile = () => {
    setProfileState(null);
    if (!storageKey) return;
    try {
      localStorage.removeItem(storageKey);
    } catch (e) { /* ignore */ }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, clearProfile, ready }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
