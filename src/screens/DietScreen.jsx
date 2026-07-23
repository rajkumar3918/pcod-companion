import { useState, useEffect } from "react";
import { sans, serif, C } from "../data/theme";
import { SLOTS } from "../data/slots";
import { CONDITIONS } from "../data/conditions";
import { todayKey } from "../utils/dates";
import { useAuth } from "../contexts/AuthContext";
import { getLog, setLog } from "../firebase/firestore";
import PillButton from "../components/PillButton";
import MealCard from "../components/MealCard";
import ShoppingListCard from "../components/ShoppingListCard";

export default function DietScreen() {
  const { user } = useAuth();
  const [condition, setCondition] = useState("normal");
  const [selections, setSelections] = useState({}); // { [slotId]: mealName } for today
  const [listOpen, setListOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load today's saved log once on mount (or when the user changes).
  useEffect(() => {
    let mounted = true;
    if (!user) return;
    (async () => {
      const log = await getLog(user.uid, todayKey(0));
      if (mounted && log) {
        setCondition(log.condition || "normal");
        setSelections(log.meals || {});
      }
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [user]);

  const persist = async (nextCondition, nextSelections) => {
    if (!user) return;
    try {
      await setLog(user.uid, todayKey(0), { condition: nextCondition, meals: nextSelections });
    } catch (e) {
      // Non-fatal: UI already updated optimistically; a retry on next
      // change will resync. Consider surfacing a toast here in production.
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

  if (loading) {
    return <div style={{ padding: 24, fontFamily: sans, color: C.muted, fontSize: 13 }}>Loading today's plan…</div>;
  }

  return (
    <div style={{ padding: "18px 16px 24px" }}>
      <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 23, color: C.ink, margin: "0 0 14px" }}>Today's diet</p>

      <p style={{ fontFamily: sans, fontSize: 12.5, color: C.muted, margin: "0 0 8px", fontWeight: 700 }}>How is she feeling today?</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {CONDITIONS.map((c) => (
          <PillButton key={c.id} active={condition === c.id} color={c.color} bg={c.bg} Icon={c.icon} onClick={() => changeCondition(c.id)}>
            {c.label}
          </PillButton>
        ))}
      </div>

      <ShoppingListCard condition={condition} selections={selections} open={listOpen} onToggle={() => setListOpen(!listOpen)} />

      {SLOTS.map((slot) => (
        <MealCard
          key={slot.id} slot={slot} condition={condition}
          selectedName={selections[slot.id]} onChange={(name) => setMealFor(slot.id, name)}
        />
      ))}

      <p style={{ fontFamily: sans, fontSize: 11.5, color: C.faint, textAlign: "center", marginTop: 6 }}>
        Meals rotate automatically each day. Changes save to your account automatically.
      </p>
    </div>
  );
}
