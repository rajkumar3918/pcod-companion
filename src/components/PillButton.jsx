import { sans, C } from "../data/theme";

export default function PillButton({ children, onClick, active, color, bg, Icon }) {
  return (
    <button onClick={onClick} className="btn-tap" style={{
      display: "flex", alignItems: "center", gap: 6,
      border: active ? `1.5px solid ${color}` : `1.5px solid ${C.line}`,
      background: active ? bg : C.white, color: active ? color : C.muted,
      borderRadius: 20, padding: "8px 14px", fontSize: 13, fontWeight: 700,
      fontFamily: sans, cursor: "pointer",
    }}>
      {Icon && <Icon size={14} />} {children}
    </button>
  );
}
