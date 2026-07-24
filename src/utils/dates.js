export function todayKey(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10);
}

export function monthKey(date = new Date()) {
  return date.toISOString().slice(0, 7); // YYYY-MM
}

export function dayIndexFor(len) {
  const day = new Date().getDate();
  return len > 0 ? day % len : 0;
}

// Picks the "current" meal for a slot: whatever was explicitly saved for
// this condition today; else, if the pantry has a strong match, the
// best-matching option; else the day-rotation default.
export function getCurrentMeal(slot, condition, savedMealsForCondition, pantry) {
  const options = slot.options[condition] || slot.options.normal;
  const savedName = savedMealsForCondition && savedMealsForCondition[slot.id];
  const found = options.find((o) => o.name === savedName);
  if (found) return found;

  if (pantry && pantry.size) {
    const best = options
      .map((o) => ({ o, m: scoreMatch(o, pantry) }))
      .filter((x) => x.m && x.m.matched > 0)
      .sort((a, b) => b.m.matched - a.m.matched)[0];
    if (best) return best.o;
  }

  return options[dayIndexFor(options.length)];
}

export function scoreMatch(option, pantry) {
  if (!pantry.size || !option.key.length) return null;
  const matched = option.key.filter((k) => pantry.has(k)).length;
  return { matched, total: option.key.length };
}
