import { useState, useMemo } from "react";
import { X, Check } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { scoreMatch } from "../utils/dates";
import IconBadge from "./IconBadge";
import Chip from "./Chip";

export default function ChangeMealSheet({ slot, condition, onClose, onSelect, currentName }) {
  const [pantry, setPantry] = useState(new Set());
  const options = slot.options[condition] || [];
  const allKeys = useMemo(() => {
    const s = new Set();
    options.forEach((o) => o.key.forEach((k) => s.add(k)));
    return Array.from(s);
  }, [options]);

  const ranked = useMemo(() => {
    return options
      .map((o) => ({ o, m: scoreMatch(o, pantry) }))
      .sort((a, b) => {
        if (!pantry.size) return 0;
        const sa = a.m ? a.m.matched : -1;
        const sb = b.m ? b.m.matched : -1;
        return sb - sa;
      });
  }, [options, pantry]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(40,39,31,0.5)", display: "flex", alignItems: "flex-end", zIndex: 40 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.cream, width: "100%", maxHeight: "82%", overflowY: "auto", borderRadius: "24px 24px 0 0", padding: "18px 18px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IconBadge Icon={slot.icon} color={slot.color} bg={slot.bg} />
            <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 19, color: C.ink, margin: 0 }}>Change {slot.label.toLowerCase()}</p>
          </div>
          <button onClick={onClose} style={{ border: "none", background: C.white, borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={16} color={C.muted} />
          </button>
        </div>
        <p style={{ fontFamily: sans, fontSize: 12.5, color: C.muted, margin: "4px 0 12px" }}>
          Tap what you have — options with more matches float to the top.
        </p>

        {allKeys.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 14 }}>
            {allKeys.map((k) => {
              const has = pantry.has(k);
              return (
                <button key={k} onClick={() => {
                  const next = new Set(pantry);
                  has ? next.delete(k) : next.add(k);
                  setPantry(next);
                }} style={{
                  border: has ? `1.5px solid ${C.forest}` : `1.5px solid ${C.line}`,
                  background: has ? C.forestLight : C.white, color: has ? C.forest : C.muted,
                  borderRadius: 20, padding: "6px 12px", fontSize: 12.5, fontWeight: 700,
                  fontFamily: sans, cursor: "pointer", marginRight: 6, marginBottom: 6,
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}>
                  {has && <Check size={12} />} {k}
                </button>
              );
            })}
          </div>
        )}

        <div>
          {ranked.map(({ o, m }, i) => {
            const isCurrent = o.name === currentName;
            const isBest = pantry.size > 0 && i === 0 && m && m.matched > 0;
            return (
              <button key={o.name} onClick={() => { onSelect(o.name); onClose(); }} style={{
                width: "100%", textAlign: "left", border: isCurrent ? `1.5px solid ${slot.color}` : `1px solid ${C.line}`,
                background: C.white, borderRadius: 14, padding: "12px 14px", marginBottom: 10, cursor: "pointer",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <p style={{ fontFamily: sans, fontWeight: 700, fontSize: 14.5, color: C.ink, margin: 0 }}>{o.name}</p>
                  {isBest && <Chip color={C.forest} bg={C.forestLight}>Best match</Chip>}
                  {isCurrent && !isBest && <Chip color={slot.color} bg={slot.bg}>Current</Chip>}
                </div>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, margin: "3px 0 6px" }}>{o.qty}</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.faint, margin: 0 }}>
                  {o.ingredients.map((ing) => `${ing.n} (${ing.q})`).join(" · ")}
                </p>
                {m && pantry.size > 0 && (
                  <p style={{ fontFamily: sans, fontSize: 11.5, color: C.forest, margin: "6px 0 0", fontWeight: 700 }}>
                    Matches {m.matched}/{m.total} of what you have
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
