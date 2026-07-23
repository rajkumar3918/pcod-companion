import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import { sans, serif, C } from "../data/theme";
import { SLOTS } from "../data/slots";
import { HABITS } from "../data/habits";
import { CONDITIONS } from "../data/conditions";
import { monthKey } from "../utils/dates";
import { useAuth } from "../contexts/AuthContext";
import { listLogsForMonth } from "../firebase/firestore";

function conditionColor(id) {
  const c = CONDITIONS.find((c) => c.id === id);
  return c ? c.color : C.forest;
}

export default function CalendarScreen() {
  const { user } = useAuth();
  const [cursor, setCursor] = useState(new Date()); // any date within the viewed month
  const [logs, setLogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!user) return;
    setLoading(true);
    (async () => {
      const data = await listLogsForMonth(user.uid, monthKey(cursor));
      if (mounted) { setLogs(data); setLoading(false); }
    })();
    return () => { mounted = false; };
  }, [user, cursor]);

  const grid = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ day: d, key });
    }
    return cells;
  }, [cursor]);

  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const loggedCount = Object.keys(logs).length;
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

  const selectedLog = selectedDate ? logs[selectedDate] : null;

  return (
    <div style={{ padding: "18px 16px 30px" }}>
      <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 23, color: C.ink, margin: "0 0 4px" }}>Calendar</p>
      <p style={{ fontFamily: sans, fontSize: 12.5, color: C.muted, margin: "0 0 16px" }}>
        {loading ? "Loading…" : `${loggedCount} of ${daysInMonth} days logged this month`}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} style={{ border: "none", background: C.white, borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(40,39,31,0.08)" }}>
          <ChevronLeft size={15} color={C.ink} />
        </button>
        <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: C.ink }}>{monthLabel}</span>
        <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} style={{ border: "none", background: C.white, borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(40,39,31,0.08)" }}>
          <ChevronRight size={15} color={C.ink} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4 }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontFamily: sans, fontSize: 10.5, fontWeight: 700, color: C.faint }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {grid.map((cell, i) => {
          if (!cell) return <div key={i} />;
          const log = logs[cell.key];
          const isToday = cell.key === new Date().toISOString().slice(0, 10);
          return (
            <button key={cell.key} onClick={() => log && setSelectedDate(cell.key)} style={{
              aspectRatio: "1", border: isToday ? `1.5px solid ${C.forest}` : `1px solid ${C.line}`,
              background: C.white, borderRadius: 10, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", cursor: log ? "pointer" : "default", padding: 0,
            }}>
              <span style={{ fontFamily: sans, fontSize: 12, fontWeight: isToday ? 800 : 600, color: C.ink }}>{cell.day}</span>
              {log && <div style={{ width: 5, height: 5, borderRadius: "50%", background: conditionColor(log.condition), marginTop: 2 }} />}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
        {CONDITIONS.map((c) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />
            <span style={{ fontFamily: sans, fontSize: 11, color: C.muted }}>{c.label}</span>
          </div>
        ))}
      </div>

      {selectedDate && selectedLog && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(40,39,31,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 50 }} onClick={() => setSelectedDate(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.cream, width: "100%", maxWidth: 390, maxHeight: "78%", overflowY: "auto", borderRadius: "24px 24px 0 0", padding: "18px 18px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, color: C.ink, margin: 0 }}>
                {new Date(selectedDate + "T00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <button onClick={() => setSelectedDate(null)} style={{ border: "none", background: C.white, borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={14} color={C.muted} />
              </button>
            </div>

            <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, color: conditionColor(selectedLog.condition), margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>
              {(CONDITIONS.find((c) => c.id === selectedLog.condition) || {}).label || "Normal"} day
            </p>

            <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 0.4, margin: "0 0 6px" }}>MEALS</p>
            <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.line}`, marginBottom: 16 }}>
              {SLOTS.map((slot, i) => {
                const mealName = selectedLog.meals && selectedLog.meals[slot.id];
                if (!mealName) return null;
                return (
                  <div key={slot.id} style={{ padding: "10px 14px", borderBottom: i < SLOTS.length - 1 ? `1px solid ${C.line}` : "none", display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontFamily: sans, fontSize: 11.5, fontWeight: 700, color: slot.color }}>{slot.label}</span>
                    <span style={{ fontFamily: sans, fontSize: 12.5, color: C.ink, textAlign: "right" }}>{mealName}</span>
                  </div>
                );
              })}
            </div>

            <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 0.4, margin: "0 0 6px" }}>HABITS</p>
            <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.line}` }}>
              {HABITS.map((h, i) => {
                const done = selectedLog.habits && selectedLog.habits[h.id];
                return (
                  <div key={h.id} style={{ padding: "9px 14px", borderBottom: i < HABITS.length - 1 ? `1px solid ${C.line}` : "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 5, background: done ? C.forest : C.line, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {done && <Check size={11} color={C.white} strokeWidth={3} />}
                    </div>
                    <span style={{ fontFamily: sans, fontSize: 12.5, color: done ? C.ink : C.faint }}>{h.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
