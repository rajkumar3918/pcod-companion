import { useMemo } from "react";
import { ShoppingBasket, ChevronDown, ChevronUp, Check, RotateCcw } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { CATEGORIES, ingredientsByCategory } from "../data/ingredients";
import IconBadge from "./IconBadge";

// pantry: shared household Set of ingredient keys currently in stock
// onToggleItem(key): flip one ingredient's in-stock state
// onRegenerate(): clear the whole pantry (full restock pass)
export default function ShoppingListCard({ pantry, onToggleItem, onRegenerate, open, onToggle }) {
  const grouped = useMemo(() => ingredientsByCategory(), []);
  const haveCount = pantry ? pantry.size : 0;
  const totalCount = useMemo(
    () => Object.values(grouped).reduce((sum, list) => sum + list.length, 0),
    [grouped]
  );

  return (
    <div className="anim-slide-up" style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.line}`, marginBottom: 16, overflow: "hidden", boxShadow: C.shadowSm }}>
      <button onClick={onToggle} className="btn-tap" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: "none", padding: "13px 16px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <IconBadge Icon={ShoppingBasket} color={C.mustard} bg={C.mustardLight} />
          <div style={{ textAlign: "left" }}>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 15.5, color: C.ink, display: "block" }}>Pantry & shopping list</span>
            <span style={{ fontFamily: sans, fontSize: 11.5, color: C.muted }}>{haveCount}/{totalCount} in stock</span>
          </div>
        </div>
        {open ? <ChevronUp size={16} color={C.muted} /> : <ChevronDown size={16} color={C.muted} />}
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px" }}>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, margin: "0 0 12px" }}>
            Tap what you already have — buy the rest whenever suits you (weekly, monthly, however). Diet suggestions get smarter as you check things off.
          </p>

          {CATEGORIES.map((cat) => {
            const items = grouped[cat.id];
            if (!items || !items.length) return null;
            return (
              <div key={cat.id} style={{ marginBottom: 14 }}>
                <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 800, color: C.faint, letterSpacing: 0.4, textTransform: "uppercase", margin: "0 0 6px" }}>
                  {cat.label}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map((ing) => {
                    const has = pantry && pantry.has(ing.key);
                    return (
                      <button key={ing.key} onClick={() => onToggleItem && onToggleItem(ing.key)} className="btn-tap" style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        border: has ? `1.5px solid ${C.forest}` : `1.5px solid ${C.line}`,
                        background: has ? C.forestLight : C.white, color: has ? C.forest : C.muted,
                        borderRadius: 20, padding: "6px 12px", fontSize: 12.5, fontWeight: 700,
                        fontFamily: sans, cursor: "pointer",
                      }}>
                        {has && <Check size={12} />} {ing.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <button onClick={onRegenerate} className="btn-tap" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%",
            border: `1.5px solid ${C.line}`, background: C.white, color: C.muted, borderRadius: 12,
            padding: "10px", fontFamily: sans, fontSize: 12.5, fontWeight: 700, cursor: "pointer", marginTop: 4,
          }}>
            <RotateCcw size={13} /> Regenerate (everything's run out)
          </button>
        </div>
      )}
    </div>
  );
}
