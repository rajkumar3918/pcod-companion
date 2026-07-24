import { Home, UtensilsCrossed, ClipboardList, CalendarDays } from "lucide-react";
import { sans, C } from "../data/theme";

const items = [
  { id: "/", label: "Home", icon: Home },
  { id: "/diet", label: "Diet", icon: UtensilsCrossed },
  { id: "/tracker", label: "Habits", icon: ClipboardList },
  { id: "/calendar", label: "Calendar", icon: CalendarDays },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${C.line}`, background: C.white, height: 64, flexShrink: 0, boxShadow: "0 -6px 20px rgba(24,22,15,0.05)" }}>
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.id;
        return (
          <button key={it.id} onClick={() => onNavigate(it.id)} className="btn-tap" style={{
            flex: 1, border: "none", background: "none", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", position: "relative",
          }}>
            {isActive && <div style={{ position: "absolute", top: 2, width: 26, height: 3, borderRadius: 4, background: C.gradForest }} />}
            <Icon size={19} color={isActive ? C.forest : C.faint} strokeWidth={isActive ? 2.4 : 2} />
            <span style={{ fontFamily: sans, fontSize: 10.5, fontWeight: 700, color: isActive ? C.forest : C.faint }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
