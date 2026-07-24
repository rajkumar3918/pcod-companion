import { Home, UtensilsCrossed, ClipboardList, CalendarDays, Leaf } from "lucide-react";
import { sans, serif, C } from "../data/theme";

const items = [
  { id: "/", label: "Home", icon: Home },
  { id: "/diet", label: "Diet", icon: UtensilsCrossed },
  { id: "/tracker", label: "Habits", icon: ClipboardList },
  { id: "/calendar", label: "Calendar", icon: CalendarDays },
];

export default function SideNav({ active, onNavigate }) {
  return (
    <div style={{
      width: 220, flexShrink: 0, borderRight: `1px solid ${C.line}`, background: C.white,
      display: "flex", flexDirection: "column", padding: "24px 14px", height: "100vh",
      position: "sticky", top: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 30 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${C.forest}, ${C.forestDark})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Leaf size={17} color={C.white} />
        </div>
        <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 16, color: C.ink }}>PCOD Companion</span>
      </div>

      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.id;
        return (
          <button key={it.id} onClick={() => onNavigate(it.id)} style={{
            display: "flex", alignItems: "center", gap: 12, border: "none",
            background: isActive ? C.forestLight : "none", color: isActive ? C.forest : C.muted,
            borderRadius: 12, padding: "11px 14px", marginBottom: 4, cursor: "pointer",
            fontFamily: sans, fontSize: 13.5, fontWeight: 700, textAlign: "left",
          }}>
            <Icon size={17} strokeWidth={isActive ? 2.4 : 2} />
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
