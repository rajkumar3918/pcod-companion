import { Circle } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import BackButton from "../components/BackButton";
import IconBadge from "../components/IconBadge";

export default function InfoDetailScreen({ topic, onBack }) {
  if (!topic) return null;
  const Icon = topic.icon;
  return (
    <div style={{ padding: "16px 16px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <BackButton onClick={onBack} />
        <IconBadge Icon={Icon} color={topic.color} bg={topic.bg} />
        <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 19, color: C.ink, margin: 0 }}>{topic.title}</p>
      </div>
      <div style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.line}`, padding: "6px 16px", boxShadow: "0 2px 10px rgba(40,39,31,0.05)" }}>
        {topic.items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: i < topic.items.length - 1 ? `1px solid ${C.line}` : "none" }}>
            <Circle size={6} color={topic.color} fill={topic.color} style={{ marginTop: 6, flexShrink: 0 }} />
            <p style={{ fontFamily: sans, fontSize: 13.5, color: C.ink, margin: 0, lineHeight: 1.55 }}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
