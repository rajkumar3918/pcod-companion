import { ArrowLeft } from "lucide-react";
import { C } from "../data/theme";

export default function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      border: "none", background: C.white, borderRadius: "50%", width: 34, height: 34,
      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      boxShadow: "0 2px 6px rgba(40,39,31,0.10)",
    }}>
      <ArrowLeft size={16} color={C.ink} />
    </button>
  );
}
