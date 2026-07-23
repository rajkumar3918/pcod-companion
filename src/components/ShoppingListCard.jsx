import { useMemo } from "react";
import { ShoppingBasket, ChevronDown, ChevronUp } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { SLOTS } from "../data/slots";
import { getCurrentMeal } from "../utils/dates";
import IconBadge from "./IconBadge";

// selections: { [slotId]: mealName } for today's saved choices
export default function ShoppingListCard({ condition, selections, open, onToggle }) {
  const grouped = useMemo(() => {
    const map = {};
    SLOTS.forEach((slot) => {
      const current = getCurrentMeal(slot, condition, selections);
      current.ingredients.forEach((ing) => {
        if (!map[ing.n]) map[ing.n] = [];
        map[ing.n].push(ing.q);
      });
    });
    return Object.entries(map);
  }, [condition, selections]);

  return (
    <div style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.line}`, marginBottom: 16, overflow: "hidden" }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: "none", padding: "13px 16px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <IconBadge Icon={ShoppingBasket} color={C.mustard} bg={C.mustardLight} />
          <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 15.5, color: C.ink }}>Today's shopping list</span>
        </div>
        {open ? <ChevronUp size={16} color={C.muted} /> : <ChevronDown size={16} color={C.muted} />}
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px" }}>
          {grouped.map(([name, uses]) => (
            <div key={name} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.line}` }}>
              <span style={{ fontFamily: sans, fontSize: 13, color: C.ink, fontWeight: 600 }}>{name}</span>
              <span style={{ fontFamily: sans, fontSize: 12.5, color: C.muted }}>{uses.join(" + ")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
