import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, Sparkles } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { scoreMatch } from "../utils/dates";
import { useViewport } from "../utils/useViewport";
import { useBackStep } from "../utils/useBackStep";
import IconBadge from "./IconBadge";
import Chip from "./Chip";

export default function ChangeMealSheet({ slot, condition, onClose, onSelect, currentName, pantry, onTogglePantryItem }) {
  const { isDesktop } = useViewport();
  const [closing, setClosing] = useState(false);
  const activePantry = pantry || new Set();
  const options = slot.options[condition] || [];

  // Rendered in a portal straight to <body> and fixed to the viewport, so
  // it's a true full-screen overlay regardless of where it's triggered from
  // (not clipped to, or scaled with, the meal card that opened it).
  useBackStep(true, () => handleClose());

  const allKeys = useMemo(() => {
    const s = new Set();
    options.forEach((o) => o.key.forEach((k) => s.add(k)));
    return Array.from(s);
  }, [options]);

  const ranked = useMemo(() => {
    return options
      .map((o) => ({ o, m: scoreMatch(o, activePantry) }))
      .sort((a, b) => {
        if (!activePantry.size) return 0;
        const sa = a.m ? a.m.matched : -1;
        const sb = b.m ? b.m.matched : -1;
        return sb - sa;
      });
  }, [options, activePantry]);

  // Small closing animation before actually unmounting, so the sheet/backdrop
  // doesn't just vanish — matches the entrance treatment in reverse.
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 160);
  };

  const handleSelect = (name) => {
    onSelect(name);
    handleClose();
  };

  return createPortal(
    <div
      className="backdrop-blur"
      style={{
        position: "fixed", inset: 0, background: "rgba(20,18,12,0.55)", zIndex: 1000,
        display: "flex", alignItems: isDesktop ? "center" : "flex-end", justifyContent: "center",
        padding: isDesktop ? 24 : 0,
        animation: `${closing ? "fadeIn .16s ease reverse both" : "backdropIn .22s ease both"}`,
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={closing ? "" : (isDesktop ? "anim-scale-in" : "anim-sheet-up")}
        style={{
          background: C.cream, width: "100%",
          maxWidth: isDesktop ? 560 : "100%",
          maxHeight: isDesktop ? "85vh" : "88vh",
          overflowY: "auto",
          borderRadius: isDesktop ? 24 : "26px 26px 0 0",
          padding: "20px 20px 26px",
          boxShadow: C.shadowLg,
          opacity: closing ? 0 : 1,
          transform: closing ? (isDesktop ? "scale(0.96)" : "translateY(16px)") : undefined,
          transition: closing ? "opacity .16s ease, transform .16s ease" : undefined,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <IconBadge Icon={slot.icon} color={slot.color} bg={slot.bg} size={36} />
            <div>
              <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 20, color: C.ink, margin: 0 }}>Change {slot.label.toLowerCase()}</p>
              <p style={{ fontFamily: sans, fontSize: 11.5, color: C.muted, margin: 0 }}>{ranked.length} options</p>
            </div>
          </div>
          <button onClick={handleClose} className="btn-tap" style={{ border: "none", background: C.white, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: C.shadowSm, flexShrink: 0 }}>
            <X size={17} color={C.muted} />
          </button>
        </div>
        <p style={{ fontFamily: sans, fontSize: 12.5, color: C.muted, margin: "6px 0 14px" }}>
          Tap what's in the pantry — options with more matches float to the top.
        </p>

        {allKeys.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {allKeys.map((k) => {
              const has = activePantry.has(k);
              return (
                <button key={k} onClick={() => onTogglePantryItem && onTogglePantryItem(k)} className="btn-tap" style={{
                  border: has ? `1.5px solid ${C.forest}` : `1.5px solid ${C.line}`,
                  background: has ? C.forestLight : C.white, color: has ? C.forest : C.muted,
                  borderRadius: 20, padding: "6px 12px", fontSize: 12.5, fontWeight: 700,
                  fontFamily: sans, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}>
                  {has && <Check size={12} />} {k}
                </button>
              );
            })}
          </div>
        )}

        <div style={isDesktop ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } : undefined}>
          {ranked.map(({ o, m }, i) => {
            const isCurrent = o.name === currentName;
            const isBest = activePantry.size > 0 && i === 0 && m && m.matched > 0;
            return (
              <button key={o.name} onClick={() => handleSelect(o.name)} className="btn-tap card-hover" style={{
                width: "100%", textAlign: "left",
                border: isCurrent ? `1.5px solid ${slot.color}` : `1px solid ${C.line}`,
                background: C.white, borderRadius: 16, padding: "14px 15px", marginBottom: isDesktop ? 0 : 10,
                cursor: "pointer", boxShadow: C.shadowSm,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <p style={{ fontFamily: sans, fontWeight: 700, fontSize: 14.5, color: C.ink, margin: 0 }}>{o.name}</p>
                  {isBest && <Chip color={C.forest} bg={C.forestLight}><Sparkles size={10} style={{ marginRight: 2, verticalAlign: "-1px" }} />Best match</Chip>}
                  {isCurrent && !isBest && <Chip color={slot.color} bg={slot.bg}>Current</Chip>}
                </div>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, margin: "3px 0 6px" }}>{o.qty}</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.faint, margin: 0 }}>
                  {o.ingredients.map((ing) => `${ing.n} (${ing.q})`).join(" · ")}
                </p>
                {m && activePantry.size > 0 && (
                  <p style={{ fontFamily: sans, fontSize: 11.5, color: C.forest, margin: "6px 0 0", fontWeight: 700 }}>
                    Matches {m.matched}/{m.total} of what you have
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
