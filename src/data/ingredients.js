// Master ingredient catalog — one entry per `key` tag already used across
// slots.js. This is what turns the free-text meal ingredients into a
// clean, deduplicated, categorized shopping checklist, and is also what
// the pantry-matching (scoreMatch) keys off of.
//
// If you add a new meal option to slots.js with a new `key`, add it here
// too, or it just won't show up on the shopping list / pantry matching.

export const CATEGORIES = [
  { id: "protein", label: "Protein" },
  { id: "carbs", label: "Carbs & Grains" },
  { id: "veg", label: "Fiber & Veg" },
  { id: "dairy", label: "Dairy" },
  { id: "nuts", label: "Nuts, Seeds & Fruits" },
  { id: "spices", label: "Spices & Flavorings" },
  { id: "other", label: "Other" },
];

export const INGREDIENT_CATALOG = {
  // protein
  "moong dal": { name: "Moong dal", category: "protein" },
  besan: { name: "Besan (gram flour)", category: "protein" },
  sambar: { name: "Sambar / dal mix", category: "protein" },
  eggs: { name: "Eggs", category: "protein" },
  sprouts: { name: "Sprouts (moong/chana)", category: "protein" },
  chana: { name: "Chana", category: "protein" },
  "methi dal": { name: "Methi dal", category: "protein" },
  rajma: { name: "Rajma", category: "protein" },
  "masoor dal": { name: "Masoor dal", category: "protein" },
  tofu: { name: "Tofu", category: "protein" },
  soya: { name: "Soya chunks", category: "protein" },
  dal: { name: "Dal (general)", category: "protein" },

  // carbs & grains
  poha: { name: "Poha", category: "carbs" },
  idli: { name: "Idli batter/rice", category: "carbs" },
  ragi: { name: "Ragi (flour/batter)", category: "carbs" },
  daliya: { name: "Daliya (broken wheat)", category: "carbs" },
  rice: { name: "Rice", category: "carbs" },
  khichdi: { name: "Rice + dal (for khichdi)", category: "carbs" },
  roti: { name: "Atta (for roti)", category: "carbs" },
  "millet roti": { name: "Jowar/bajra flour", category: "carbs" },

  // fiber & veg
  spinach: { name: "Spinach", category: "veg" },
  beetroot: { name: "Beetroot", category: "veg" },
  "drumstick leaves": { name: "Drumstick leaves", category: "veg" },
  mushroom: { name: "Mushroom", category: "veg" },
  greens: { name: "Mixed leafy greens", category: "veg" },

  // dairy
  curd: { name: "Curd", category: "dairy" },
  buttermilk: { name: "Buttermilk", category: "dairy" },
  paneer: { name: "Paneer", category: "dairy" },
  ghee: { name: "Ghee", category: "dairy" },

  // nuts, seeds & fruits
  sabja: { name: "Sabja (basil) seeds", category: "nuts" },
  flaxseed: { name: "Flaxseed", category: "nuts" },
  raisins: { name: "Raisins", category: "nuts" },
  peanuts: { name: "Peanuts", category: "nuts" },
  banana: { name: "Banana", category: "nuts" },
  almonds: { name: "Almonds", category: "nuts" },
  walnuts: { name: "Walnuts", category: "nuts" },
  dates: { name: "Dates", category: "nuts" },
  seeds: { name: "Mixed seeds", category: "nuts" },
  fruit: { name: "Seasonal fruit", category: "nuts" },
  pomegranate: { name: "Pomegranate", category: "nuts" },
  makhana: { name: "Makhana (fox nuts)", category: "nuts" },
  "pumpkin seeds": { name: "Pumpkin seeds", category: "nuts" },

  // spices & flavorings
  fenugreek: { name: "Fenugreek (methi) seeds", category: "spices" },
  cinnamon: { name: "Cinnamon", category: "spices" },
  cumin: { name: "Cumin (jeera)", category: "spices" },
  jaggery: { name: "Jaggery", category: "spices" },
  ginger: { name: "Ginger", category: "spices" },
  spearmint: { name: "Spearmint (leaves/tea)", category: "spices" },

  // other
  "coconut water": { name: "Coconut water", category: "other" },
  soup: { name: "Soup base / mixed veg", category: "other" },
};

// Everything grouped by category, in CATEGORIES order — this is what the
// shopping-list screen renders directly.
export function ingredientsByCategory() {
  const map = {};
  CATEGORIES.forEach((c) => { map[c.id] = []; });
  Object.entries(INGREDIENT_CATALOG).forEach(([key, info]) => {
    (map[info.category] || map.other).push({ key, ...info });
  });
  Object.values(map).forEach((list) => list.sort((a, b) => a.name.localeCompare(b.name)));
  return map;
}
