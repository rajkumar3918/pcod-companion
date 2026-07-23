import { sans } from "../data/theme";

export default function IconBadge({ Icon, color, bg, size = 30 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.32, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={size * 0.5} color={color} />
    </div>
  );
}
