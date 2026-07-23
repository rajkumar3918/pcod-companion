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

// Picks the "current" meal for a slot: whatever was explicitly saved
// for this condition today, else the day-rotation default.
export function getCurrentMeal(slot, condition, savedMealsForCondition) {
  const options = slot.options[condition] || slot.options.normal;
  const savedName = savedMealsForCondition && savedMealsForCondition[slot.id];
  const found = options.find((o) => o.name === savedName);
  return found || options[dayIndexFor(options.length)];
}

export function scoreMatch(option, pantry) {
  if (!pantry.size || !option.key.length) return null;
  const matched = option.key.filter((k) => pantry.has(k)).length;
  return { matched, total: option.key.length };
}
