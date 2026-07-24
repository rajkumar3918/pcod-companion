import { Leaf, ChevronRight, Users } from "lucide-react";
import { useViewport } from "../utils/useViewport";
import { sans, serif, C } from "../data/theme";
import { INFO_TOPICS } from "../data/infoTopics";
import { useProfile } from "../contexts/ProfileContext";
import IconBadge from "../components/IconBadge";

export default function HomeScreen({ onOpenTopic, onGoToDiet }) {
  const { profile, clearProfile } = useProfile();
  const { isDesktop } = useViewport();

  return (
    <div style={{ padding: "22px 16px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: `linear-gradient(135deg, ${C.forest}, ${C.forestDark})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Leaf size={20} color={C.white} />
          </div>
          <div>
            <p style={{ fontFamily: sans, fontSize: 11, color: C.muted, letterSpacing: 1, textTransform: "uppercase", margin: 0, fontWeight: 800 }}>PCOD Companion</p>
            <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 21, color: C.ink, margin: 0 }}>
              {profile ? `Hi ${profile.name}` : "Take care, today."}
            </p>
          </div>
        </div>
        <button onClick={clearProfile} title="Switch profile" style={{
          border: "none", background: profile ? (profile.color || C.forest) : C.white, borderRadius: "50%",
          width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          boxShadow: "0 2px 6px rgba(40,39,31,0.12)",
        }}>
          {profile
            ? <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 13, color: C.white }}>{profile.name.charAt(0).toUpperCase()}</span>
            : <Users size={15} color={C.muted} />}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {INFO_TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <button key={topic.id} onClick={() => onOpenTopic(topic)} style={{
              textAlign: "left", border: `1px solid ${C.line}`, background: C.white, borderRadius: 16,
              padding: "14px 12px", cursor: "pointer", boxShadow: "0 2px 8px rgba(40,39,31,0.04)",
            }}>
              <IconBadge Icon={Icon} color={topic.color} bg={topic.bg} size={30} />
              <p style={{ fontFamily: sans, fontWeight: 700, fontSize: 12.5, color: C.ink, margin: "9px 0 0", lineHeight: 1.3 }}>{topic.title}</p>
            </button>
          );
        })}
      </div>

      <button onClick={onGoToDiet} style={{
        width: "100%", border: "none", background: `linear-gradient(135deg, ${C.forest}, ${C.forestDark})`,
        color: C.white, borderRadius: 18, padding: "17px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer", boxShadow: "0 8px 20px rgba(47,82,51,0.28)",
      }}>
        <span style={{ textAlign: "left" }}>
          <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 17, margin: 0 }}>Go to today's diet</p>
          <p style={{ fontFamily: sans, fontSize: 12, margin: "2px 0 0", opacity: 0.85, fontWeight: 500 }}>Auto-picked meals, ready to adjust</p>
        </span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
