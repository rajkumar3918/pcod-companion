import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToAuth, logOut as firebaseLogOut, checkRedirectResult } from "../firebase/auth";

const AuthContext = createContext({ user: null, loading: true, logOut: () => {}, authError: "" });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    // Fires immediately with whatever session Firebase restored from local
    // storage — this is what makes login "stick" until the user logs out.
    const unsub = subscribeToAuth((u) => {
      setUser(u);
      setLoading(false);
    });
    // Surfaces errors from a redirect-based Google sign-in (used inside
    // installed/standalone PWAs where popups aren't reliable).
    checkRedirectResult().catch((err) => {
      console.error(err);
      setAuthError("Couldn't sign you in. Please try again.");
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logOut: firebaseLogOut, authError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
