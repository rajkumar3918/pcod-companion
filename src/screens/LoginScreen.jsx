import { useState } from "react";
import { Leaf } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { signIn } from "../firebase/auth";

export default function LoginScreen({ onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 24px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${C.forest}, ${C.forestDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Leaf size={24} color={C.white} />
        </div>
      </div>
      <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 24, color: C.ink, margin: "0 0 4px", textAlign: "center" }}>PCOD Companion</p>
      <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, margin: "0 0 28px", textAlign: "center" }}>Sign in to see your diet and habits</p>

      <form onSubmit={submit}>
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.line}`, fontFamily: sans, fontSize: 14, marginBottom: 10 }} />
        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${C.line}`, fontFamily: sans, fontSize: 14, marginBottom: 14 }} />
        {error && <p style={{ fontFamily: sans, fontSize: 12.5, color: C.rose, margin: "0 0 12px" }}>{error}</p>}
        <button type="submit" disabled={loading} style={{
          width: "100%", border: "none", background: `linear-gradient(135deg, ${C.forest}, ${C.forestDark})`,
          color: C.white, borderRadius: 12, padding: "13px", fontFamily: sans, fontWeight: 700, fontSize: 14,
          cursor: "pointer", opacity: loading ? 0.7 : 1,
        }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <button onClick={onGoToSignup} style={{ border: "none", background: "none", color: C.muted, fontFamily: sans, fontSize: 12.5, marginTop: 16, cursor: "pointer" }}>
        No account yet? <span style={{ color: C.forest, fontWeight: 700 }}>Create one</span>
      </button>
    </div>
  );
}
