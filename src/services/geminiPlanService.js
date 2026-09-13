/**
 * Client Service for Gemini AI Food Routine Planning.
 *
 * Calls server-side endpoint POST /api/ai/food-plan.
 * Never handles or exposes GEMINI_API_KEY on the client.
 */

const DEFAULT_TIMEOUT_MS = 25000;

/**
 * Maps goal/diet to appropriate curated imagery.
 */
function getHeroImageForPlan(goal, diet) {
  if (diet === "Vegan") {
    return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80";
  }
  if (goal === "Fitness/Muscle" || goal === "Weight Gain") {
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80";
  }
  if (goal === "Weight Loss") {
    return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80";
  }
  return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80";
}

/**
 * Safely extracts integer from macro strings (e.g. "95g" -> 95, "1900 kcal" -> 1900).
 */
function parseMacroNumber(val, fallback = 0) {
  if (typeof val === "number" && !isNaN(val)) return val;
  if (!val) return fallback;
  const match = String(val).match(/\d+/);
  return match ? parseInt(match[0], 10) : fallback;
}

/**
 * Transforms AI structured response into the full Routine model used by Foodie-Health-Routine.
 */
export function formatAIResponseToRoutine(aiData, formData) {
  const { summary, dailyTargets = {}, meals = {}, shoppingList = [], tips = [], medicalDisclaimer } = aiData;

  const mealSlots = [
    { key: "morning", defaultSlot: "Morning Elixir", defaultTime: "07:00 AM", defaultEmoji: "🌅" },
    { key: "breakfast", defaultSlot: "Power Breakfast", defaultTime: "08:30 AM", defaultEmoji: "🍳" },
    { key: "midMorning", defaultSlot: "Mid-Morning Snack", defaultTime: "11:00 AM", defaultEmoji: "🍎" },
    { key: "lunch", defaultSlot: "Energizing Lunch", defaultTime: "01:30 PM", defaultEmoji: "🍱" },
    { key: "evening", defaultSlot: "Evening Refresh", defaultTime: "05:00 PM", defaultEmoji: "☕" },
    { key: "dinner", defaultSlot: "Light Restorative Dinner", defaultTime: "08:00 PM", defaultEmoji: "🌙" }
  ];

  const dailyTimeline = mealSlots
    .filter((slot) => {
      // If user selected 3 meals, include breakfast, lunch, dinner
      if (formData.mealsPerDay === 3) {
        return ["breakfast", "lunch", "dinner"].includes(slot.key);
      }
      // If user selected 4 meals, include morning, breakfast, lunch, dinner
      if (formData.mealsPerDay === 4) {
        return ["morning", "breakfast", "lunch", "dinner"].includes(slot.key);
      }
      // If user selected 5 meals, include morning, breakfast, lunch, evening, dinner
      if (formData.mealsPerDay === 5) {
        return ["morning", "breakfast", "lunch", "evening", "dinner"].includes(slot.key);
      }
      // 6 meals includes all
      return true;
    })
    .map((slot, index) => {
      const meal = meals[slot.key] || {};
      const cal = parseMacroNumber(meal.calories, 200);
      const prot = parseMacroNumber(meal.protein, 10);
      const carbs = parseMacroNumber(meal.carbs, 25);
      const fat = parseMacroNumber(meal.fat, 6);

      return {
        id: `ai-meal-${slot.key}-${Date.now()}-${index}`,
        slotName: meal.slotName || slot.defaultSlot,
        time: meal.time || slot.defaultTime,
        emoji: meal.emoji || slot.defaultEmoji,
        title: meal.dish || `${slot.defaultSlot} Special`,
        calories: cal,
        protein: prot,
        carbs: carbs,
        fat: fat,
        prepTime: meal.prepTime || "15 min",
        isVeg: formData.diet === "Vegetarian" || formData.diet === "Vegan",
        dietType: formData.diet || "Balanced",
        ingredients: Array.isArray(meal.ingredients) ? meal.ingredients : [],
        steps: Array.isArray(meal.preparation) ? meal.preparation : [],
        alternative: meal.alternative || "Nutrient-Dense Fresh Seasonal Salad",
        orderQuery: meal.dish || slot.defaultSlot
      };
    });

  // Calculate totals from meals or dailyTargets
  const totalCalories =
    parseMacroNumber(dailyTargets.calories) ||
    dailyTimeline.reduce((sum, m) => sum + (m.calories || 0), 0) ||
    2000;
  const totalProtein =
    parseMacroNumber(dailyTargets.protein) ||
    dailyTimeline.reduce((sum, m) => sum + (m.protein || 0), 0) ||
    80;
  const totalCarbs =
    parseMacroNumber(dailyTargets.carbs) ||
    dailyTimeline.reduce((sum, m) => sum + (m.carbs || 0), 0) ||
    220;
  const totalFat =
    parseMacroNumber(dailyTargets.fat) ||
    dailyTimeline.reduce((sum, m) => sum + (m.fat || 0), 0) ||
    55;

  return {
    id: `ai-routine-${Date.now()}`,
    customId: `ai-custom-${Date.now()}`,
    title: `Personalized ${formData.goal} Routine`,
    subtitle: `AI-calibrated for ${formData.age} yrs • ${formData.diet} • ${formData.activity} activity • ${dailyTimeline.length} meals/day`,
    category: "AI Personalized Plan",
    description:
      summary ||
      `Customized clinical-grade nutrition timetable designed to achieve ${formData.goal.toLowerCase()} with wholesome ${formData.diet.toLowerCase()} meals.`,
    calories: totalCalories,
    protein: totalProtein,
    carbs: totalCarbs,
    fat: totalFat,
    water: dailyTargets.water || "8-10 glasses (2.5 - 3.0 Liters)",
    isVegetarian: formData.diet === "Vegetarian" || formData.diet === "Vegan",
    image: getHeroImageForPlan(formData.goal, formData.diet),
    mealsCount: dailyTimeline.length,
    difficulty: formData.cookingTime === "Quick" ? "Quick & Easy" : "Balanced",
    prepTimeAvg: formData.cookingTime === "Quick" ? "10-15 min" : "20-25 min",
    isCustom: true,
    isAIGenerated: true,
    generatedAt: new Date().toLocaleDateString(),
    dailyTimeline,
    shoppingList,
    tips: tips.length > 0 ? tips : [
      "Drink a large glass of water 20 minutes before each main meal.",
      "Pre-chop fresh vegetables and store in airtight containers for rapid cooking.",
      "Focus on chewing slowly to enhance digestion and nutrient absorption."
    ],
    medicalDisclaimer:
      medicalDisclaimer ||
      "This information is for general educational purposes and is not a substitute for advice from a qualified healthcare professional. If you have a medical condition, severe allergies, or specific dietary restrictions, consult a doctor or registered dietitian before making significant dietary changes.",
    userPreferences: { ...formData }
  };
}

/**
 * Generate a personalized food routine via Gemini AI serverless API.
 */
export async function generateAIFoodPlan(formData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch("/api/ai/food-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    if (!response.ok || !result.success) {
      const errorMsg = result?.error || `Server responded with status ${response.status}`;
      const err = new Error(errorMsg);
      err.code = result?.code || "API_ERROR";
      throw err;
    }

    return formatAIResponseToRoutine(result.data, formData);
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      const timeoutErr = new Error("Generation took too long. Please check your internet connection and try again.");
      timeoutErr.code = "TIMEOUT";
      throw timeoutErr;
    }
    throw err;
  }
}

/**
 * Safe offline fallback generator if the network drops or API is unreachable.
 */
export function generateOfflineFallbackPlan(formData) {
  const isVeg = formData.diet === "Vegetarian" || formData.diet === "Vegan";
  const goal = formData.goal || "Healthy Eating";

  const fallbackData = {
    summary: `Scientifically calibrated ${goal.toLowerCase()} routine featuring high-fiber, balanced macronutrients tailored for ${formData.diet.toLowerCase()} lifestyle.`,
    dailyTargets: {
      calories: goal === "Weight Loss" ? 1750 : goal === "Weight Gain" ? 2400 : 2050,
      protein: goal === "Fitness/Muscle" ? "110g" : "85g",
      carbs: "210g",
      fat: "50g",
      water: "8-10 glasses (2.5L)"
    },
    meals: {
      morning: {
        slotName: "Morning Elixir",
        time: "07:00 AM",
        emoji: "🌅",
        dish: "Warm Lemon Chia Detox Water",
        calories: 50,
        protein: "2g",
        carbs: "6g",
        fat: "1g",
        prepTime: "3 min",
        ingredients: [
          { name: "Chia seeds (soaked)", amount: "1 tbsp" },
          { name: "Warm water", amount: "300 ml" },
          { name: "Fresh lemon juice", amount: "1 tbsp" }
        ],
        preparation: [
          "Soak chia seeds in warm water for 5 minutes.",
          "Add lemon juice and stir gently.",
          "Sip warm on an empty stomach."
        ],
        alternative: "Warm Cumin (Jeera) Infused Herbal Water"
      },
      breakfast: {
        slotName: "Power Breakfast",
        time: "08:30 AM",
        emoji: "🍳",
        dish: isVeg
          ? "High-Protein Oats & Greek Yogurt Bowl with Chia & Berries"
          : "3-Egg Scramble with Whole Wheat Toast & Sauteed Spinach",
        calories: 440,
        protein: isVeg ? "24g" : "28g",
        carbs: "52g",
        fat: "12g",
        prepTime: "10 min",
        ingredients: isVeg
          ? [
              { name: "Rolled oats", amount: "60g" },
              { name: "Greek yogurt", amount: "150g" },
              { name: "Mixed berries", amount: "50g" },
              { name: "Chia seeds & crushed almonds", amount: "1 tbsp" }
            ]
          : [
              { name: "Eggs (2 whole + 1 white)", amount: "3 eggs" },
              { name: "Whole wheat sourdough toast", amount: "1 slice" },
              { name: "Fresh baby spinach", amount: "1 cup" }
            ],
        preparation: isVeg
          ? [
              "Soak oats in warm water or milk for 3 minutes.",
              "Layer thick Greek yogurt on top.",
              "Garnish with mixed berries and toasted chia seeds."
            ]
          : [
              "Whisk eggs with a pinch of black pepper and sea salt.",
              "Soft scramble in a light pan with olive oil.",
              "Serve with toasted whole wheat bread and sauteed baby spinach."
            ],
        alternative: isVeg ? "Moong Dal Spinach Chilla with Mint Chutney" : "Boiled Egg White Salad"
      },
      midMorning: {
        slotName: "Mid-Morning Snack",
        time: "11:00 AM",
        emoji: "🍎",
        dish: "Fresh Papaya / Apple with 6 Soaked Almonds",
        calories: 140,
        protein: "4g",
        carbs: "24g",
        fat: "3g",
        prepTime: "3 min",
        ingredients: [
          { name: "Fresh fruit (Papaya or Apple)", amount: "1 cup diced" },
          { name: "Soaked peeled almonds", amount: "6 pieces" }
        ],
        preparation: [
          "Enjoy sliced fresh fruit with soaked raw almonds for clean energy."
        ],
        alternative: "Tender Coconut Water with Chia"
      },
      lunch: {
        slotName: "Energizing Lunch",
        time: "01:30 PM",
        emoji: "🍱",
        dish: isVeg
          ? "Brown Rice / Quinoa with Sambar, Spiced Paneer & Green Beans"
          : "Grilled Chicken Breast / Fish with Steamed Quinoa & Roasted Veggies",
        calories: 580,
        protein: isVeg ? "28g" : "38g",
        carbs: "72g",
        fat: "15g",
        prepTime: "20 min",
        ingredients: isVeg
          ? [
              { name: "Cooked Brown Rice or Quinoa", amount: "1 cup" },
              { name: "Mixed Lentil Vegetable Sambar", amount: "1.5 cups" },
              { name: "Pan-seared low-fat Paneer or Tofu", amount: "100g" },
              { name: "Steamed French beans with mustard seeds", amount: "1 cup" }
            ]
          : [
              { name: "Herb Grilled Chicken Breast or Fish", amount: "160g" },
              { name: "Steamed Quinoa or Brown Rice", amount: "3/4 cup" },
              { name: "Roasted broccoli, carrots & bell peppers", amount: "1.5 cups" }
            ],
        preparation: [
          "Plate whole grains with protein and generous portion of fiber-rich veggies.",
          "Add fresh lemon squeeze and enjoy warm."
        ],
        alternative: "Mixed Sprouts & Quinoa Power Bowl"
      },
      evening: {
        slotName: "Evening Refresh",
        time: "05:00 PM",
        emoji: "☕",
        dish: "Roasted Makhana (Foxnuts) & Spiced Herbal Green Tea",
        calories: 150,
        protein: "5g",
        carbs: "22g",
        fat: "3g",
        prepTime: "5 min",
        ingredients: [
          { name: "Lightly roasted foxnuts with turmeric", amount: "1.5 cups" },
          { name: "Fresh herbal green tea", amount: "1 mug" }
        ],
        preparation: [
          "Roast makhana with a drop of cold-pressed oil, turmeric, and rock salt.",
          "Pair with freshly brewed antioxidant-rich green tea."
        ],
        alternative: "Boiled Chana (Chickpea) Chaat with Tomatoes & Onions"
      },
      dinner: {
        slotName: "Light Restorative Dinner",
        time: "08:00 PM",
        emoji: "🌙",
        dish: isVeg
          ? "Grilled Tofu / Paneer Tikka with Clear Vegetable Broth Soup"
          : "Lemon Herb Grilled Salmon / Chicken with Light Garden Salad",
        calories: 460,
        protein: isVeg ? "26g" : "32g",
        carbs: "34g",
        fat: "16g",
        prepTime: "15 min",
        ingredients: isVeg
          ? [
              { name: "Low-fat Paneer or Firm Tofu", amount: "140g" },
              { name: "Diced bell peppers and onions", amount: "1 cup" },
              { name: "Warm vegetable clear soup with greens", amount: "1.5 cups" }
            ]
          : [
              { name: "Grilled fish or chicken fillets", amount: "140g" },
              { name: "Warm clear chicken veggie broth", amount: "1.5 cups" },
              { name: "Cucumber tomato mint salad", amount: "1 cup" }
            ],
        preparation: [
          "Pan-sear seasoned protein until lightly charred and fragrant.",
          "Serve alongside hot nourishing clear soup."
        ],
        alternative: "Light Moong Dal Khichdi with Steamed Veggies"
      }
    },
    shoppingList: [
      { category: "Fresh Produce", items: ["Spinach", "Papaya / Apples", "Green Beans", "Broccoli", "Lemons", "Ginger & Mint"] },
      { category: "Proteins & Dairy", items: [isVeg ? "Low-fat Paneer or Tofu" : "Eggs & Chicken Breast", "Greek Yogurt", "Yellow Moong Dal", "Lentils"] },
      { category: "Grains & Pantry", items: ["Rolled Oats", "Brown Rice / Quinoa", "Foxnuts (Makhana)", "Chia Seeds", "Almonds"] },
      { category: "Spices & Essentials", items: ["Turmeric", "Cumin", "Black Pepper", "Rock Salt", "Herbal Green Tea"] }
    ],
    tips: [
      "Hydrate well with 1 glass of water 20 minutes before each main meal.",
      "Prep your soaked seeds and chopped veggies the night before to save morning prep time.",
      "Complete dinner at least 2 hours before sleep for deeper rest and optimal glucose regulation."
    ],
    medicalDisclaimer:
      "This information is for general educational purposes and is not a substitute for advice from a qualified healthcare professional. If you have a medical condition, severe allergies, or specific dietary restrictions, consult a doctor or registered dietitian before making significant dietary changes."
  };

  return formatAIResponseToRoutine(fallbackData, formData);
}
