import { useState, useEffect, useMemo } from "react";
import { AlertCircle } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { SLOTS } from "../data/slots";
import { CONDITIONS } from "../data/conditions";
import { INGREDIENT_CATALOG } from "../data/ingredients";
import { todayKey } from "../utils/dates";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import { getLog, setLog } from "../firebase/firestore";
import { getPantry, addToPantry, removeFromPantry, clearPantry } from "../firebase/pantry";
import PillButton from "../components/PillButton";
import MealCard from "../components/MealCard";
import ShoppingListCard from "../components/ShoppingListCard";
import { useViewport } from "../utils/useViewport";

export default function DietScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { isDesktop } = useViewport();
  const [condition, setCondition] = useState("normal");
  const [selections, setSelections] = useState({});
  const [listOpen, setListOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pantry, setPantry] = useState(new Set());

  useEffect(() => {
    let mounted = true;
    if (!user || !profile) return;
    (async () => {
      const log = await getLog(user.uid, profile.id, todayKey(0));
      if (mounted && log) {
        setCondition(log.condition || "normal");
        setSelections(log.meals || {});
      }
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [user, profile]);

  // Pantry is shared per account (household), not per profile.
  useEffect(() => {
    let mounted = true;
    if (!user) return;
    (async () => {
      const p = await getPantry(user.uid);
      if (mounted) setPantry(p);
    })();
    return () => { mounted = false; };
  }, [user]);

  const togglePantryItem = (key) => {
    const has = pantry.has(key);
    const next = new Set(pantry);
    has ? next.delete(key) : next.add(key);
    setPantry(next);
    if (!user) return;
    (has ? removeFromPantry(user.uid, key) : addToPantry(user.uid, key)).catch((e) =>
      console.error("Failed to update pantry", e)
    );
  };

  const regeneratePantry = () => {
    setPantry(new Set());
    if (!user) return;
    clearPantry(user.uid).catch((e) => console.error("Failed to reset pantry", e));
  };

  const persist = async (nextCondition, nextSelections) => {
    if (!user || !profile) return;
    try {
      await setLog(user.uid, profile.id, todayKey(0), { condition: nextCondition, meals: nextSelections });
    } catch (e) {
      console.error("Failed to save diet log", e);
    }
  };

  const changeCondition = (id) => {
    setCondition(id);
    persist(id, selections);
  };

  const setMealFor = (slotId, name) => {
    const next = { ...selections, [slotId]: name };
    setSelections(next);
    persist(condition, next);
  };

  // For periods/unwell days: what today's condition-specific options need,
  // that isn't already in the pantry. Not part of the weekly checklist —
  // just a one-off "go grab these" nudge, since these days aren't planned
  // for in advance.
  const todayShortfall = useMemo(() => {
    if (condition === "normal") return [];
    const missing = new Map();
    SLOTS.forEach((slot) => {
      const options = slot.options[condition] || [];
      options.forEach((o) => {
        o.key.forEach((k) => {
          if (!pantry.has(k) && !missing.has(k)) {
            missing.set(k, INGREDIENT_CATALOG[k]?.name || k);
          }
        });
      });
    });
    return Array.from(missing.values());
  }, [condition, pantry]);

  if (loading) {
    return <div style={{ padding: 24, fontFamily: sans, color: C.muted, fontSize: 13 }}>Loading today's plan…</div>;
  }

  return (
    <div style={{ padding: "18px 16px 24px" }}>
      <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 23, color: C.ink, margin: "0 0 14px" }}>
        {profile ? `${profile.name}'s diet` : "Today's diet"}
      </p>

      <p style={{ fontFamily: sans, fontSize: 12.5, color: C.muted, margin: "0 0 8px", fontWeight: 700 }}>How is she feeling today?</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {CONDITIONS.map((c) => (
          <PillButton key={c.id} active={condition === c.id} color={c.color} bg={c.bg} Icon={c.icon} onClick={() => changeCondition(c.id)}>
            {c.label}
          </PillButton>
        ))}
      </div>

      {todayShortfall.length > 0 && (
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: C.roseLight, border: `1px solid ${C.rose}`, borderRadius: 14, padding: "12px 14px", marginBottom: 16 }}>
          <AlertCircle size={16} color={C.rose} style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ fontFamily: sans, fontSize: 12.5, fontWeight: 700, color: C.ink, margin: "0 0 3px" }}>Today's shopping</p>
            <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, margin: 0 }}>
              For today's {condition} meals, you don't have: {todayShortfall.join(", ")}.
            </p>
          </div>
        </div>
      )}

      <ShoppingListCard
        pantry={pantry} onToggleItem={togglePantryItem} onRegenerate={regeneratePantry}
        open={listOpen} onToggle={() => setListOpen(!listOpen)}
      />

      <div style={isDesktop ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } : undefined}>
        {SLOTS.map((slot, i) => (
          <MealCard
            key={slot.id} slot={slot} condition={condition}
            selectedName={selections[slot.id]} onChange={(name) => setMealFor(slot.id, name)}
            pantry={pantry} onTogglePantryItem={togglePantryItem}
            delay={i * 0.04}
          />
        ))}
      </div>

      <p style={{ fontFamily: sans, fontSize: 11.5, color: C.faint, textAlign: "center", marginTop: 6 }}>
        Suggestions favor what's in your pantry; otherwise meals rotate automatically each day. Changes save automatically to this profile.
      </p>
    </div>
  );
}
