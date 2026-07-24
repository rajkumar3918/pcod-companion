import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "pcod_active_profile";
const ProfileContext = createContext({ profile: null, setProfile: () => {}, clearProfile: () => {} });

// Remembers the last-picked profile on this device/browser, the same way
// a shared family tablet would — not tied to any account, just local.
export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfileState(JSON.parse(raw));
    } catch (e) {
      // ignore corrupt/missing storage
    }
    setReady(true);
  }, []);

  const setProfile = (p) => {
    setProfileState(p);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch (e) { /* storage unavailable, profile still works for this session */ }
  };

  const clearProfile = () => {
    setProfileState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
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
