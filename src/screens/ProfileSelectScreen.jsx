import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { useBackStep } from "../utils/useBackStep";
import { listProfiles, createProfile, MAX_PROFILES } from "../firebase/profiles";

const COLORS = [C.forest, C.mustard, C.teal, C.plum, C.slate, C.rose];

export default function ProfileSelectScreen() {
  const { user, logOut } = useAuth();
  const { setProfile } = useProfile();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [error, setError] = useState("");

  // Physical back closes the add-profile form instead of exiting.
  useBackStep(adding, () => setAdding(false));

  useEffect(() => {
    let mounted = true;
    if (!user) return;
    (async () => {
      const list = await listProfiles(user.uid);
      if (mounted) { setProfiles(list); setLoading(false); }
    })();
    return () => { mounted = false; };
  }, [user]);

  const addProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setError("");
    try {
      const p = await createProfile(user.uid, name.trim(), color);
      setProfiles([...profiles, p]);
      setAdding(false);
      setName("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div style={{ padding: 24, fontFamily: sans, color: C.muted, fontSize: 13, textAlign: "center" }}>Loading profiles…</div>;
  }

  return (
    <div className="anim-fade-in" style={{ padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 22, color: C.ink, margin: "0 0 4px" }}>Who's this for?</p>
      <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, margin: "0 0 24px" }}>Up to {MAX_PROFILES} profiles on this account</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, width: "100%", marginBottom: 6, justifyItems: "center" }}>
        {profiles.map((p, i) => (
          <button key={p.id} onClick={() => setProfile(p)} className="btn-tap anim-scale-in" style={{ animationDelay: `${i * 0.05}s`, border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 68, height: 68, borderRadius: 18, background: p.color || C.forest, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: C.shadowMd }}>
              <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 24, color: C.white }}>{p.name.charAt(0).toUpperCase()}</span>
            </div>
            <span style={{ fontFamily: sans, fontSize: 12.5, fontWeight: 700, color: C.ink }}>{p.name}</span>
          </button>
        ))}

        {profiles.length < MAX_PROFILES && !adding && (
          <button onClick={() => setAdding(true)} className="btn-tap" style={{ border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 68, height: 68, borderRadius: 18, border: `2px dashed ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={22} color={C.faint} />
            </div>
            <span style={{ fontFamily: sans, fontSize: 12.5, fontWeight: 700, color: C.faint }}>Add profile</span>
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={addProfile} className="anim-slide-up" style={{ width: "100%", marginTop: 18 }}>
          <input autoFocus placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 12, border: `1.5px solid ${C.line}`, fontFamily: sans, fontSize: 14, marginBottom: 10 }} />
          <div style={{ display: "flex", gap: 8, marginBottom: 14, justifyContent: "center" }}>
            {COLORS.map((c) => (
              <button type="button" key={c} onClick={() => setColor(c)} className="btn-tap" style={{
                width: 26, height: 26, borderRadius: "50%", background: c, cursor: "pointer",
                border: color === c ? `2.5px solid ${C.ink}` : "2.5px solid transparent",
              }} />
            ))}
          </div>
          {error && <p style={{ fontFamily: sans, fontSize: 12, color: C.rose, margin: "0 0 10px", textAlign: "center" }}>{error}</p>}
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => { setAdding(false); setError(""); }} className="btn-tap" style={{ flex: 1, border: `1.5px solid ${C.line}`, background: C.white, color: C.muted, borderRadius: 12, padding: "12px", fontFamily: sans, fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit" className="btn-tap" style={{ flex: 1.4, border: "none", background: C.gradForest, color: C.white, borderRadius: 12, padding: "12px", fontFamily: sans, fontWeight: 700, fontSize: 13.5, cursor: "pointer", boxShadow: C.shadowSm }}>
              Add profile
            </button>
          </div>
        </form>
      )}

      {profiles.length >= MAX_PROFILES && !adding && (
        <p style={{ fontFamily: sans, fontSize: 11.5, color: C.faint, marginTop: 14 }}>Maximum of {MAX_PROFILES} profiles reached.</p>
      )}

      <button
        onClick={logOut}
        className="btn-tap"
        style={{ border: "none", background: "none", color: C.faint, fontFamily: sans, fontSize: 11.5, fontWeight: 700, marginTop: 22, cursor: "pointer", textDecoration: "underline" }}
      >
        Not you? Log out
      </button>
    </div>
  );
}
