import { Sunrise, Coffee, Apple, UtensilsCrossed, Leaf, Moon } from "lucide-react";
import { C } from "./theme";

export const SLOTS = [
  { id: "empty", label: "Empty Stomach", time: "On waking", color: C.sage, bg: C.sageLight, icon: Sunrise,
    options: {
      normal: [
        { name: "Methi (fenugreek) water", qty: "1 glass", ingredients: [{ n: "Fenugreek seeds", q: "1 tsp, soaked overnight" }, { n: "Warm water", q: "1 glass" }], key: ["fenugreek"], benefits: ["Improves insulin sensitivity", "Evidence-backed"] },
        { name: "Cinnamon water", qty: "1 glass", ingredients: [{ n: "Cinnamon powder", q: "1/2 tsp" }, { n: "Warm water", q: "1 glass" }], key: ["cinnamon"], benefits: ["Supports blood sugar control"] },
        { name: "Jeera (cumin) water", qty: "1 glass", ingredients: [{ n: "Cumin seeds", q: "1 tsp, soaked overnight" }, { n: "Warm water", q: "1 glass" }], key: ["cumin"], benefits: ["Aids digestion", "Gentle on stomach"] },
        { name: "Soaked sabja (basil) seed water", qty: "1 glass", ingredients: [{ n: "Sabja seeds", q: "1 tsp" }, { n: "Warm water", q: "1 glass" }], key: ["sabja"], benefits: ["Cooling", "Hydrating"] },
        { name: "Flaxseed powder water", qty: "1 glass", ingredients: [{ n: "Flaxseed powder", q: "1 tsp" }, { n: "Warm water", q: "1 glass" }], key: ["flaxseed"], benefits: ["Omega-3", "Balances estrogen"] },
      ],
      unwell: [
        { name: "Plain warm water", qty: "1 glass", ingredients: [{ n: "Warm water", q: "1 glass" }], key: [], benefits: ["Gentlest option", "Won't trigger nausea"] },
        { name: "Warm water + soaked raisins", qty: "1 glass + 5 raisins", ingredients: [{ n: "Raisins", q: "5, soaked" }, { n: "Warm water", q: "1 glass" }], key: ["raisins"], benefits: ["Mild natural sugar for energy"] },
      ],
      periods: [
        { name: "Warm water + jaggery", qty: "1 glass + small piece", ingredients: [{ n: "Jaggery", q: "~2g" }, { n: "Warm water", q: "1 glass" }], key: ["jaggery"], benefits: ["Gentle iron + quick energy"] },
        { name: "Warm ginger water", qty: "1 glass", ingredients: [{ n: "Ginger", q: "1 small piece" }, { n: "Warm water", q: "1 glass" }], key: ["ginger"], benefits: ["Eases cramps"] },
      ],
    } },
  { id: "breakfast", label: "Breakfast", time: "Within 1 hr of waking", color: C.mustard, bg: C.mustardLight, icon: Coffee,
    options: {
      normal: [
        { name: "Moong dal chilla", qty: "2 chillas (~150g batter)", ingredients: [{ n: "Moong dal batter", q: "150g" }, { n: "Mint chutney", q: "2 tbsp" }], key: ["moong dal", "besan"], benefits: ["High protein", "Low GI"] },
        { name: "Vegetable poha", qty: "1 bowl (~150g)", ingredients: [{ n: "Poha", q: "150g cooked" }, { n: "Peanuts", q: "1 tbsp" }, { n: "Turmeric", q: "pinch" }], key: ["poha", "peanuts"], benefits: ["Quick energy", "Light on stomach"] },
        { name: "Besan cheela", qty: "2 cheelas (~120g batter)", ingredients: [{ n: "Besan batter", q: "120g" }, { n: "Tomato chutney", q: "2 tbsp" }], key: ["besan"], benefits: ["High protein", "Keeps you full"] },
        { name: "Idli + sambar", qty: "3 idli + 1 katori sambar", ingredients: [{ n: "Idli", q: "3" }, { n: "Sambar", q: "150ml" }], key: ["idli", "sambar"], benefits: ["Fermented — gut-friendly", "Easy to digest"] },
        { name: "Ragi dosa", qty: "2 small dosas", ingredients: [{ n: "Ragi batter", q: "2 dosas worth" }], key: ["ragi"], benefits: ["Very iron-rich", "Low GI"] },
        { name: "Vegetable daliya", qty: "1 bowl (~150g cooked)", ingredients: [{ n: "Daliya (broken wheat)", q: "40g dry" }, { n: "Mixed vegetables", q: "1/2 cup" }], key: ["daliya"], benefits: ["High fiber", "Slow-release energy"] },
        { name: "Vegetable omelette", qty: "2 eggs", ingredients: [{ n: "Eggs", q: "2" }, { n: "Spinach + capsicum", q: "1/2 cup" }], key: ["eggs", "spinach"], benefits: ["Complete protein", "Iron from spinach"] },
        { name: "Sprouts bowl", qty: "1 cup (~120g)", ingredients: [{ n: "Moong + chana sprouts", q: "120g" }, { n: "Lemon + chaat masala", q: "to taste" }], key: ["sprouts"], benefits: ["High protein + fiber", "Vitamin C for iron"] },
      ],
      unwell: [
        { name: "Curd rice", qty: "1 bowl (~150g)", ingredients: [{ n: "Cooked rice", q: "100g" }, { n: "Curd", q: "1/2 cup" }], key: ["rice", "curd"], benefits: ["Very easy to digest", "Cooling"] },
        { name: "Banana + soaked almonds", qty: "1 banana + 5 almonds", ingredients: [{ n: "Banana", q: "1 small" }, { n: "Almonds", q: "5, soaked" }], key: ["banana", "almonds"], benefits: ["Quick, gentle energy"] },
        { name: "Plain khichdi", qty: "1 small bowl (~150g)", ingredients: [{ n: "Moong dal + rice", q: "150g cooked" }], key: ["khichdi"], benefits: ["Soft, easy on the gut"] },
      ],
      periods: [
        { name: "Moong dal chilla + boiled egg", qty: "2 chillas + 1 egg", ingredients: [{ n: "Moong dal batter", q: "150g" }, { n: "Boiled egg", q: "1" }], key: ["moong dal", "eggs"], benefits: ["Extra iron + protein for bleeding days"] },
        { name: "Ragi porridge with jaggery", qty: "1 bowl", ingredients: [{ n: "Ragi", q: "40g" }, { n: "Jaggery", q: "small amount" }, { n: "Nuts", q: "1 tbsp" }], key: ["ragi", "jaggery"], benefits: ["Very iron-rich", "Filling"] },
      ],
    } },
  { id: "mid", label: "Mid-Morning", time: "10:30 – 11:30 AM", color: C.teal, bg: C.tealLight, icon: Apple,
    options: {
      normal: [
        { name: "Soaked almonds + walnuts", qty: "8 almonds + 4 walnuts", ingredients: [{ n: "Almonds", q: "8, soaked" }, { n: "Walnuts", q: "4" }], key: ["almonds", "walnuts"], benefits: ["Healthy fats", "Vitamin E"] },
        { name: "Dates + boiled egg", qty: "2 dates + 1 egg", ingredients: [{ n: "Dates", q: "2" }, { n: "Boiled egg", q: "1" }], key: ["dates", "eggs"], benefits: ["Iron + protein combo"] },
        { name: "Mixed seeds + fruit", qty: "1 tbsp seeds + 1 fruit", ingredients: [{ n: "Mixed seeds", q: "1 tbsp" }, { n: "Seasonal fruit", q: "1 medium" }], key: ["seeds", "fruit"], benefits: ["Zinc + fiber"] },
        { name: "Roasted chana", qty: "1 small handful (~30g)", ingredients: [{ n: "Roasted chana", q: "30g" }], key: ["chana"], benefits: ["Protein + fiber, filling"] },
        { name: "Buttermilk with cumin", qty: "1 glass", ingredients: [{ n: "Buttermilk", q: "200ml" }, { n: "Cumin + mint", q: "pinch" }], key: ["buttermilk"], benefits: ["Probiotic", "Cooling"] },
      ],
      unwell: [
        { name: "Coconut water", qty: "1 glass", ingredients: [{ n: "Coconut water", q: "200ml" }], key: ["coconut water"], benefits: ["Natural electrolytes", "Hydrating"] },
        { name: "Banana", qty: "1 medium", ingredients: [{ n: "Banana", q: "1" }], key: ["banana"], benefits: ["Light, easy to hold down"] },
      ],
      periods: [
        { name: "Dates + jaggery", qty: "2–3 dates or small piece jaggery", ingredients: [{ n: "Dates", q: "2–3" }], key: ["dates", "jaggery"], benefits: ["Iron + quick energy for bleeding days"] },
        { name: "Pomegranate seeds", qty: "1/2 cup", ingredients: [{ n: "Pomegranate", q: "1/2 cup seeds" }], key: ["pomegranate"], benefits: ["Excellent for iron and blood health"] },
      ],
    } },
  { id: "lunch", label: "Lunch", time: "1:00 – 2:00 PM · biggest meal", color: C.olive, bg: C.oliveLight, icon: UtensilsCrossed,
    options: {
      normal: [
        { name: "Methi dal + roti + salad", qty: "2 roti + 1 katori dal", ingredients: [{ n: "Roti", q: "2 (~40g each)" }, { n: "Methi dal", q: "1 katori" }, { n: "Beetroot-carrot salad", q: "1 cup" }, { n: "Curd", q: "1/2 cup" }], key: ["roti", "methi dal", "beetroot"], benefits: ["Iron + protein powerhouse"] },
        { name: "Rajma rice", qty: "3/4 cup rice + 1 katori rajma", ingredients: [{ n: "Brown rice", q: "3/4 cup cooked" }, { n: "Rajma curry", q: "1 katori" }, { n: "Cucumber salad", q: "1 cup" }], key: ["rice", "rajma"], benefits: ["Excellent iron + fibre"] },
        { name: "Black chana + roti", qty: "2 roti + 1 katori chana", ingredients: [{ n: "Roti", q: "2" }, { n: "Black chana curry", q: "1 katori" }, { n: "Lauki sabzi", q: "1/2 cup" }], key: ["roti", "chana"], benefits: ["Very high iron", "Stabilises blood sugar"] },
        { name: "Millet roti + paneer curry", qty: "2 jowar/bajra roti + paneer", ingredients: [{ n: "Jowar/bajra roti", q: "2" }, { n: "Paneer curry", q: "80g paneer" }, { n: "Spinach sabzi", q: "1/2 cup" }], key: ["millet roti", "paneer"], benefits: ["Hormone-friendly low-GI grains"] },
        { name: "Brown rice + sambar", qty: "3/4 cup rice + 1 katori sambar", ingredients: [{ n: "Brown rice", q: "3/4 cup" }, { n: "Sambar (dal + veg)", q: "1 katori" }, { n: "Curd", q: "small" }], key: ["rice", "sambar"], benefits: ["Balanced, South Indian style"] },
        { name: "Masoor dal + rice", qty: "3/4 cup rice + 1 katori dal", ingredients: [{ n: "Brown rice", q: "3/4 cup" }, { n: "Masoor dal", q: "1 katori" }, { n: "Mixed sabzi", q: "1/2 cup" }], key: ["rice", "masoor dal"], benefits: ["One of the highest-iron dals"] },
        { name: "Tofu stir fry + rice", qty: "3/4 cup rice + tofu", ingredients: [{ n: "Brown rice", q: "3/4 cup" }, { n: "Tofu", q: "100g" }, { n: "Bell peppers + spinach", q: "1/2 cup" }], key: ["rice", "tofu"], benefits: ["Plant protein", "Iron-rich"] },
        { name: "Soya chunks curry + roti", qty: "2 roti + soya curry", ingredients: [{ n: "Roti", q: "2" }, { n: "Soya chunks curry", q: "1 katori" }, { n: "Green sabzi", q: "1/2 cup" }], key: ["roti", "soya"], benefits: ["Very high protein"] },
      ],
      unwell: [
        { name: "Small khichdi bowl", qty: "1 small bowl (~150g)", ingredients: [{ n: "Moong dal + rice", q: "150g" }, { n: "Ghee", q: "1 tsp" }], key: ["khichdi"], benefits: ["Gentle, easy to digest"] },
        { name: "Curd rice", qty: "1 bowl", ingredients: [{ n: "Rice", q: "100g" }, { n: "Curd", q: "1/2 cup" }], key: ["rice", "curd"], benefits: ["Cooling, settles the stomach"] },
      ],
      periods: [
        { name: "Methi dal + beetroot + ghee", qty: "2 roti + 1 katori dal", ingredients: [{ n: "Roti", q: "2" }, { n: "Methi dal", q: "1 katori" }, { n: "Beetroot sabzi", q: "1/2 cup" }, { n: "Ghee", q: "1 tsp" }], key: ["methi dal", "beetroot", "ghee"], benefits: ["Iron priority + warming energy"] },
        { name: "Drumstick-leaf dal + rice", qty: "3/4 cup rice + dal", ingredients: [{ n: "Rice", q: "3/4 cup" }, { n: "Drumstick-leaf dal", q: "1 katori" }], key: ["drumstick leaves"], benefits: ["Very high iron"] },
      ],
    } },
  { id: "evening", label: "Evening", time: "4:30 – 5:30 PM · light", color: C.plum, bg: C.plumLight, icon: Leaf,
    options: {
      normal: [
        { name: "Buttermilk + roasted seeds", qty: "1 glass + 1 tbsp seeds", ingredients: [{ n: "Buttermilk", q: "200ml" }, { n: "Roasted seeds", q: "1 tbsp" }], key: ["buttermilk", "seeds"], benefits: ["Probiotic + zinc"] },
        { name: "Spearmint tea", qty: "1 cup", ingredients: [{ n: "Spearmint tea", q: "1 cup" }], key: ["spearmint"], benefits: ["Evidence shows it may lower androgens"] },
        { name: "Roasted makhana", qty: "1 cup (~20g)", ingredients: [{ n: "Makhana", q: "20g" }], key: ["makhana"], benefits: ["Light, crunchy snack"] },
        { name: "Sprouts chaat", qty: "1 cup (~100g)", ingredients: [{ n: "Sprouts", q: "100g" }, { n: "Lemon + chaat masala", q: "to taste" }], key: ["sprouts"], benefits: ["Protein + vitamin C"] },
        { name: "Roasted pumpkin seeds", qty: "1 tbsp", ingredients: [{ n: "Pumpkin seeds", q: "1 tbsp" }], key: ["pumpkin seeds"], benefits: ["Zinc for hormone balance"] },
      ],
      unwell: [
        { name: "Ginger tea + makhana", qty: "1 cup + small handful", ingredients: [{ n: "Ginger tea", q: "1 cup" }, { n: "Makhana", q: "~15g" }], key: ["ginger"], benefits: ["Helps settle nausea"] },
      ],
      periods: [
        { name: "Warm cinnamon tea", qty: "1 cup", ingredients: [{ n: "Cinnamon tea", q: "1 cup" }], key: ["cinnamon"], benefits: ["Soothing for cramps"] },
        { name: "Warm ginger tea", qty: "1 cup", ingredients: [{ n: "Ginger", q: "1 small piece" }], key: ["ginger"], benefits: ["Eases cramps"] },
      ],
    } },
  { id: "dinner", label: "Dinner", time: "7:30 – 8:30 PM · lighter than lunch", color: C.slate, bg: C.slateLight, icon: Moon,
    options: {
      normal: [
        { name: "Grilled paneer + sabzi + roti", qty: "80g paneer + 1 roti", ingredients: [{ n: "Paneer", q: "80g" }, { n: "Lauki sabzi", q: "1/2 cup" }, { n: "Roti", q: "1" }], key: ["paneer", "roti"], benefits: ["Protein without heaviness"] },
        { name: "Moong dal khichdi", qty: "1 bowl (~200g)", ingredients: [{ n: "Moong dal + rice", q: "200g" }, { n: "Mixed veggies", q: "1/2 cup" }], key: ["khichdi"], benefits: ["Easy digestion at night"] },
        { name: "Egg bhurji + roti + spinach", qty: "2 eggs + 1 roti", ingredients: [{ n: "Eggs", q: "2" }, { n: "Roti", q: "1" }, { n: "Sautéed spinach", q: "1/2 cup" }], key: ["eggs", "spinach"], benefits: ["Protein + iron"] },
        { name: "Egg curry + roti + greens", qty: "2 eggs + 1 roti", ingredients: [{ n: "Egg curry", q: "2 eggs" }, { n: "Roti", q: "1" }, { n: "Sautéed greens", q: "1/2 cup" }], key: ["eggs"], benefits: ["Warm, filling, protein-rich"] },
        { name: "Vegetable soup + roti", qty: "1 bowl + 1 roti", ingredients: [{ n: "Mixed veg soup", q: "1 bowl" }, { n: "Roti", q: "1" }], key: ["soup"], benefits: ["Light on the gut"] },
        { name: "Mushroom soup", qty: "1 bowl + 1 roti", ingredients: [{ n: "Mushroom soup", q: "1 bowl" }, { n: "Roti", q: "1" }], key: ["mushroom"], benefits: ["Iron-rich without a heavy meal"] },
        { name: "Ragi roti + simple sabzi", qty: "2 ragi roti", ingredients: [{ n: "Ragi roti", q: "2" }, { n: "Simple sabzi", q: "1/2 cup" }], key: ["ragi"], benefits: ["Very iron-rich for evening"] },
      ],
      unwell: [
        { name: "Light soup", qty: "1 bowl", ingredients: [{ n: "Vegetable soup", q: "1 bowl" }], key: ["soup"], benefits: ["Smallest, gentlest meal of the day"] },
        { name: "Curd rice", qty: "1 small bowl", ingredients: [{ n: "Rice", q: "80g" }, { n: "Curd", q: "1/2 cup" }], key: ["rice", "curd"], benefits: ["Cooling, easy to digest"] },
      ],
      periods: [
        { name: "Dal + sautéed greens, kept warm", qty: "1 katori dal + 1/2 cup greens", ingredients: [{ n: "Dal", q: "1 katori" }, { n: "Sautéed greens", q: "1/2 cup" }], key: ["dal", "greens"], benefits: ["Warm and iron-rich for bleeding days"] },
        { name: "Ragi roti + moong dal", qty: "2 ragi roti + dal", ingredients: [{ n: "Ragi roti", q: "2" }, { n: "Moong dal", q: "1 katori" }], key: ["ragi", "moong dal"], benefits: ["Iron + easy digestion"] },
      ],
    } },
];
export default SLOTS;
