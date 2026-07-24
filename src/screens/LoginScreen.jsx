import { useState } from "react";
import { Leaf } from "lucide-react";
import { serif, sans, C } from "../data/theme";
import { signInWithGoogle } from "../firebase/auth";
import { useAuth } from "../contexts/AuthContext";

// Google's standard multicolor "G" mark, used per Google's own Sign-In
// branding guidelines for third-party "Sign in with Google" buttons.
function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 009 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 013.68 9c0-.59.1-1.17.27-1.7V4.97H.98A9 9 0 000 9c0 1.45.35 2.83.98 4.03l2.97-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

export default function LoginScreen() {
  const { authError } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    setBusy(true);
    try {
      await signInWithGoogle();
      // Redirect flows navigate away; popup flows resolve here and
      // AuthContext's onAuthStateChanged listener picks up the user.
    } catch (err) {
      console.error(err);
      setError(
        err.code === "auth/popup-closed-by-user"
          ? "Sign-in was closed before finishing — try again."
          : "Couldn't sign you in. Try again in a moment."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="anim-fade-in" style={{ padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div className="anim-scale-in" style={{
        width: 64, height: 64, borderRadius: 20, background: C.gradForest,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
        boxShadow: "0 12px 28px rgba(14,107,79,0.32)",
      }}>
        <Leaf size={30} color={C.white} />
      </div>

      <p className="anim-slide-up" style={{ fontFamily: serif, fontWeight: 700, fontSize: 24, color: C.ink, margin: "0 0 6px", textAlign: "center" }}>
        PCOD Companion
      </p>
      <p className="anim-slide-up" style={{ fontFamily: sans, fontSize: 13, color: C.muted, margin: "0 0 32px", textAlign: "center", maxWidth: 300, animationDelay: ".05s" }}>
        Sign in to keep your diet and habit tracking synced and private. You'll stay signed in on this device until you log out.
      </p>

      <button
        onClick={handleSignIn}
        disabled={busy}
        className="btn-tap anim-slide-up"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          width: "100%", maxWidth: 320, border: `1.5px solid ${C.line}`, background: C.white,
          borderRadius: 14, padding: "14px 18px", fontFamily: sans, fontWeight: 700, fontSize: 14.5,
          color: C.ink, cursor: busy ? "default" : "pointer", opacity: busy ? 0.65 : 1,
          boxShadow: C.shadowSm, animationDelay: ".1s",
        }}
      >
        <GoogleG size={18} />
        {busy ? "Signing in…" : "Continue with Google"}
      </button>

      {(error || authError) && (
        <p style={{ fontFamily: sans, fontSize: 12, color: C.rose, margin: "14px 0 0", textAlign: "center", maxWidth: 300 }}>
          {error || authError}
        </p>
      )}
    </div>
  );
}
