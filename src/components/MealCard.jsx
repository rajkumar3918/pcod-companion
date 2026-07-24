import { useState } from "react";
import { RotateCw, ShoppingBasket, Info, ChevronDown, ChevronUp } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { getCurrentMeal } from "../utils/dates";
import Chip from "./Chip";
import ChangeMealSheet from "./ChangeMealSheet";

// selectedName: the meal explicitly saved for this slot+condition today (or undefined)
// onChange(name): called when the person picks a different meal — caller persists it
// pantry: shared household Set of ingredient keys currently in stock
// onTogglePantryItem(key): flips one ingredient's in-stock state
// delay: optional stagger delay (seconds) for the entrance animation
export default function MealCard({ slot, condition, selectedName, onChange, pantry, onTogglePantryItem, delay = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const options = slot.options[condition] || slot.options.normal;
  const current = getCurrentMeal(slot, condition, { [slot.id]: selectedName }, pantry);
  const Icon = slot.icon;

  const cycle = () => {
    const idx = options.findIndex((o) => o.name === current.name);
    const next = options[(idx + 1) % options.length];
    onChange(next.name);
  };

  return (
    <div className="anim-slide-up card-hover" style={{ animationDelay: `${delay}s`, background: C.white, borderRadius: 20, border: `1px solid ${C.line}`, marginBottom: 14, overflow: "hidden", position: "relative", boxShadow: C.shadowSm }}>
      <div style={{ background: slot.color, padding: "13px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 10, background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={16} color={C.white} />
        </div>
        <div>
          <p style={{ fontFamily: sans, fontWeight: 800, fontSize: 13.5, color: C.white, margin: 0, letterSpacing: 0.4 }}>{slot.label.toUpperCase()}</p>
          <p style={{ fontFamily: sans, fontSize: 11.5, color: "rgba(255,255,255,0.85)", margin: "1px 0 0" }}>{slot.time}</p>
        </div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 17.5, color: C.ink, margin: "0 0 3px" }}>{current.name}</p>
        <p style={{ fontFamily: sans, fontSize: 12.5, color: C.muted, margin: "0 0 10px", fontWeight: 600 }}>{current.qty}</p>

        <div style={{ marginBottom: 10 }}>
          {current.benefits.map((b) => <Chip key={b} color={slot.color} bg={slot.bg}>{b}</Chip>)}
        </div>

        <button onClick={() => setExpanded(!expanded)} className="btn-tap" style={{
          display: "flex", alignItems: "center", gap: 4, border: "none", background: "none",
          color: C.muted, fontFamily: sans, fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: expanded ? 8 : 0,
        }}>
          <Info size={13} /> Ingredients & why it helps {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {expanded && (
          <div className="anim-fade-in" style={{ background: slot.bg, borderRadius: 12, padding: "10px 12px", marginBottom: 10 }}>
            <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 800, color: slot.color, margin: "0 0 4px", letterSpacing: 0.3 }}>INGREDIENTS</p>
            {current.ingredients.map((ing) => (
              <p key={ing.n} style={{ fontFamily: sans, fontSize: 12.5, color: C.ink, margin: "0 0 2px" }}>• {ing.n} — {ing.q}</p>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button onClick={cycle} className="btn-tap" style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            border: `1.5px solid ${C.line}`, background: C.white, color: C.ink, borderRadius: 12,
            padding: "10px 10px", fontFamily: sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>
            <RotateCw size={14} /> Shuffle
          </button>
          <button onClick={() => setSheetOpen(true)} className="btn-tap" style={{
            flex: 1.4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            border: "none", background: slot.color, color: C.white, borderRadius: 12,
            padding: "10px 10px", fontFamily: sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
            boxShadow: `0 6px 16px ${slot.color}40`,
          }}>
            <ShoppingBasket size={14} /> Change meal
          </button>
        </div>
      </div>

      {sheetOpen && (
        <ChangeMealSheet
          slot={slot} condition={condition} currentName={current.name}
          onClose={() => setSheetOpen(false)} onSelect={onChange}
          pantry={pantry} onTogglePantryItem={onTogglePantryItem}
        />
      )}
    </div>
  );
}
