import { sans } from "../data/theme";

export default function Chip({ children, color, bg }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 700, padding: "4px 10px",
      borderRadius: 20, background: bg, color, marginRight: 6, marginBottom: 6,
      fontFamily: sans, letterSpacing: 0.2,
    }}>{children}</span>
  );
}
