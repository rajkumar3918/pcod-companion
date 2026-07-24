import { useState, useEffect } from "react";
import { Flame, Check } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { HABITS } from "../data/habits";
import { todayKey } from "../utils/dates";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { getLog, setLog } from "../firebase/firestore";

async function computeStreak(uid, profileId) {
  let count = 0;
  const todayLog = await getLog(uid, profileId, todayKey(0));
  const todayHabits = todayLog && todayLog.habits ? todayLog.habits : {};
  const todayHasAny = Object.values(todayHabits).some(Boolean);
  let offset = todayHasAny ? 0 : 1;
  if (offset === 0) count = 1;
  for (let i = offset; i < 45; i++) {
    const log = await getLog(uid, profileId, todayKey(i));
    const habits = log && log.habits ? log.habits : {};
    if (Object.values(habits).some(Boolean)) count++;
    else break;
  }
  return count;
}

export default function TrackerScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [checked, setChecked] = useState({});
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!user || !profile) return;
    (async () => {
      const log = await getLog(user.uid, profile.id, todayKey(0));
      if (mounted) setChecked((log && log.habits) || {});
      const s = await computeStreak(user.uid, profile.id);
      if (mounted) setStreak(s);
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [user, profile]);

  const toggle = async (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try {
      await setLog(user.uid, profile.id, todayKey(0), { habits: next });
    } catch (e) {
      console.error("Failed to save habit", e);
    }
    const s = await computeStreak(user.uid, profile.id);
    setStreak(s);
  };

  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneCount / HABITS.length) * 100);

  if (loading) {
    return <div style={{ padding: 24, fontFamily: sans, color: C.muted, fontSize: 13 }}>Loading habits…</div>;
  }

  return (
    <div style={{ padding: "18px 16px 30px" }}>
      <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 23, color: C.ink, margin: "0 0 4px" }}>Daily habits</p>
      <p style={{ fontFamily: sans, fontSize: 12.5, color: C.muted, margin: "0 0 18px" }}>Small consistent habits move PCOD markers over weeks, not days.</p>

      <div className="anim-slide-up" style={{ display: "flex", alignItems: "center", gap: 16, background: C.white, border: `1px solid ${C.line}`, borderRadius: 18, padding: "16px 18px", marginBottom: 18, boxShadow: C.shadowSm }}>
        <div style={{ width: 62, height: 62, borderRadius: "50%", background: `conic-gradient(${C.forest} ${pct * 3.6}deg, ${C.forestLight} 0deg)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: sans, fontWeight: 800, fontSize: 13, color: C.forest }}>{pct}%</span>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Flame size={16} color={C.mustard} />
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 17, color: C.ink }}>{streak}-day streak</span>
          </div>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, margin: "3px 0 0" }}>{doneCount} of {HABITS.length} done today</p>
        </div>
      </div>

      <div className="anim-slide-up" style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.line}`, overflow: "hidden", boxShadow: C.shadowSm, animationDelay: ".05s" }}>
        {HABITS.map((h, i) => {
          const isOn = !!checked[h.id];
          return (
            <button key={h.id} onClick={() => toggle(h.id)} className="btn-tap" style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12, textAlign: "left",
              border: "none", background: "none", padding: "13px 16px",
              borderBottom: i < HABITS.length - 1 ? `1px solid ${C.line}` : "none", cursor: "pointer",
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, border: isOn ? "none" : `2px solid ${C.line}`, background: isOn ? C.gradForest : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isOn && <Check size={14} color={C.white} strokeWidth={3} className="anim-pop" />}
              </div>
              <span style={{ fontFamily: sans, fontSize: 13.5, color: isOn ? C.faint : C.ink, textDecoration: isOn ? "line-through" : "none", fontWeight: 600 }}>{h.label}</span>
            </button>
          );
        })}
      </div>
      <p style={{ fontFamily: sans, fontSize: 11, color: C.faint, textAlign: "center", marginTop: 14 }}>
        Saved automatically to this profile — comes back tomorrow with a fresh checklist.
      </p>
    </div>
  );
}
