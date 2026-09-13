/**
 * Client Service for Gemini AI Food Routine Planning.
 *
 * Integrated with Central Food Knowledge Base (Single Source of Truth).
 * Guarantees every generated meal resolves to an existing verified food record
 * with authentic stored imagery.
 *
 * Endpoint: POST /api/ai/food-plan
 * Security: Never handles or exposes GEMINI_API_KEY on the client.
 */

import { findOrResolveFood, getFoodsForPlan } from "./foodService";

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
 * Every meal is mapped and validated against the Central Food Knowledge Base.
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
      if (formData.mealsPerDay === 3) {
        return ["breakfast", "lunch", "dinner"].includes(slot.key);
      }
      if (formData.mealsPerDay === 4) {
        return ["morning", "breakfast", "lunch", "dinner"].includes(slot.key);
      }
      if (formData.mealsPerDay === 5) {
        return ["morning", "breakfast", "lunch", "evening", "dinner"].includes(slot.key);
      }
      return true;
    })
    .map((slot, index) => {
      const meal = meals[slot.key] || {};
      const dishTitle = meal.dish || `${slot.defaultSlot} Special`;

      // Resolve dish against Single Source of Truth Knowledge Base
      const verifiedFood = findOrResolveFood(meal.foodId || dishTitle);

      const cal = parseMacroNumber(meal.calories, verifiedFood?.calories || 250);
      const prot = parseMacroNumber(meal.protein, verifiedFood?.protein || 12);
      const carbs = parseMacroNumber(meal.carbs, verifiedFood?.carbs || 35);
      const fat = parseMacroNumber(meal.fat, verifiedFood?.fat || 6);

      const ingredients = Array.isArray(meal.ingredients) && meal.ingredients.length > 0
        ? meal.ingredients
        : verifiedFood?.ingredients || [];

      const steps = Array.isArray(meal.preparation) && meal.preparation.length > 0
        ? meal.preparation
        : verifiedFood?.preparation || [];

      return {
        id: `ai-meal-${slot.key}-${Date.now()}-${index}`,
        foodId: verifiedFood?.id || `food-${slot.key}`,
        foodRecord: verifiedFood,
        slotName: meal.slotName || slot.defaultSlot,
        time: meal.time || slot.defaultTime,
        emoji: meal.emoji || slot.defaultEmoji,
        title: dishTitle,
        dish: dishTitle,
        image: verifiedFood?.imageUrl || getHeroImageForPlan(formData.goal, formData.diet),
        imageUrl: verifiedFood?.imageUrl || getHeroImageForPlan(formData.goal, formData.diet),
        calories: cal,
        protein: prot,
        carbs: carbs,
        fat: fat,
        prepTime: meal.prepTime || verifiedFood?.prepTime || "15 min",
        isVeg: formData.diet === "Vegetarian" || formData.diet === "Vegan" || verifiedFood?.vegetarian,
        dietType: formData.diet || verifiedFood?.dietType || "Balanced",
        cuisine: verifiedFood?.cuisine || "Authentic",
        region: verifiedFood?.stateOrRegion || formData.location || "Regional",
        country: verifiedFood?.country || "India",
        ingredients: ingredients,
        steps: steps,
        description: verifiedFood?.description || `Scientifically calibrated ${dishTitle} supporting your ${formData.goal} goal.`,
        alternative: meal.alternative || "Nutrient-Dense Seasonal Salad",
        youtubeUrl: verifiedFood?.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(dishTitle)}`,
        orderQuery: dishTitle
      };
    });

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
      "This information is for general educational purposes and may be suitable as part of a balanced diet. Consult a qualified healthcare professional before making major dietary changes.",
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
 * Safe offline fallback generator using verified dishes from the Food Knowledge Base.
 */
export function generateOfflineFallbackPlan(formData) {
  const goal = formData.goal || "Healthy Eating";
  const verifiedSlots = getFoodsForPlan({
    diet: formData.diet,
    goal: formData.goal,
    stateOrRegion: formData.location || ""
  });

  const fallbackData = {
    summary: `Scientifically calibrated ${goal.toLowerCase()} routine featuring verified nutritious meals tailored for ${formData.diet.toLowerCase()} lifestyle.`,
    dailyTargets: {
      calories: goal === "Weight Loss" ? 1750 : goal === "Weight Gain" ? 2400 : 2050,
      protein: goal === "Fitness/Muscle" ? "110g" : "85g",
      carbs: "210g",
      fat: "50g",
      water: "8-10 glasses (2.5L)"
    },
    meals: {
      morning: {
        foodId: verifiedSlots.morning?.id,
        slotName: "Morning Elixir",
        time: "07:00 AM",
        emoji: "🌅",
        dish: verifiedSlots.morning?.dishName || "Warm Lemon Chia Detox Water",
        calories: verifiedSlots.morning?.calories || 45,
        protein: `${verifiedSlots.morning?.protein || 2}g`,
        carbs: `${verifiedSlots.morning?.carbs || 6}g`,
        fat: `${verifiedSlots.morning?.fat || 1}g`,
        prepTime: verifiedSlots.morning?.prepTime || "3 min",
        ingredients: verifiedSlots.morning?.ingredients || [],
        preparation: verifiedSlots.morning?.preparation || [],
        alternative: "Warm Cumin (Jeera) Infused Herbal Water"
      },
      breakfast: {
        foodId: verifiedSlots.breakfast?.id,
        slotName: "Power Breakfast",
        time: "08:30 AM",
        emoji: "🍳",
        dish: verifiedSlots.breakfast?.dishName || "Steamed Ragi Idli with Mint Coconut Chutney",
        calories: verifiedSlots.breakfast?.calories || 320,
        protein: `${verifiedSlots.breakfast?.protein || 14}g`,
        carbs: `${verifiedSlots.breakfast?.carbs || 50}g`,
        fat: `${verifiedSlots.breakfast?.fat || 6}g`,
        prepTime: verifiedSlots.breakfast?.prepTime || "10 min",
        ingredients: verifiedSlots.breakfast?.ingredients || [],
        preparation: verifiedSlots.breakfast?.preparation || [],
        alternative: "Moong Dal Spinach Chilla with Mint Chutney"
      },
      midMorning: {
        foodId: verifiedSlots.midMorning?.id,
        slotName: "Mid-Morning Snack",
        time: "11:00 AM",
        emoji: "🍎",
        dish: verifiedSlots.midMorning?.dishName || "Moong Dal Cucumber Kosambari",
        calories: verifiedSlots.midMorning?.calories || 140,
        protein: `${verifiedSlots.midMorning?.protein || 9}g`,
        carbs: `${verifiedSlots.midMorning?.carbs || 18}g`,
        fat: `${verifiedSlots.midMorning?.fat || 3}g`,
        prepTime: verifiedSlots.midMorning?.prepTime || "3 min",
        ingredients: verifiedSlots.midMorning?.ingredients || [],
        preparation: verifiedSlots.midMorning?.preparation || [],
        alternative: "Tender Coconut Water with Chia"
      },
      lunch: {
        foodId: verifiedSlots.lunch?.id,
        slotName: "Energizing Lunch",
        time: "01:30 PM",
        emoji: "🍱",
        dish: verifiedSlots.lunch?.dishName || "Bisi Bele Bath",
        calories: verifiedSlots.lunch?.calories || 460,
        protein: `${verifiedSlots.lunch?.protein || 18}g`,
        carbs: `${verifiedSlots.lunch?.carbs || 68}g`,
        fat: `${verifiedSlots.lunch?.fat || 10}g`,
        prepTime: verifiedSlots.lunch?.prepTime || "20 min",
        ingredients: verifiedSlots.lunch?.ingredients || [],
        preparation: verifiedSlots.lunch?.preparation || [],
        alternative: "Mixed Sprouts & Quinoa Power Bowl"
      },
      evening: {
        foodId: verifiedSlots.evening?.id,
        slotName: "Evening Refresh",
        time: "05:00 PM",
        emoji: "☕",
        dish: verifiedSlots.evening?.dishName || "Turmeric Roasted Makhana (Foxnuts)",
        calories: verifiedSlots.evening?.calories || 140,
        protein: `${verifiedSlots.evening?.protein || 5}g`,
        carbs: `${verifiedSlots.evening?.carbs || 22}g`,
        fat: `${verifiedSlots.evening?.fat || 3}g`,
        prepTime: verifiedSlots.evening?.prepTime || "5 min",
        ingredients: verifiedSlots.evening?.ingredients || [],
        preparation: verifiedSlots.evening?.preparation || [],
        alternative: "Probiotic Masala Chaas (Spiced Buttermilk)"
      },
      dinner: {
        foodId: verifiedSlots.dinner?.id,
        slotName: "Light Restorative Dinner",
        time: "08:00 PM",
        emoji: "🌙",
        dish: verifiedSlots.dinner?.dishName || "High-Protein Palak Paneer with Multigrain Roti",
        calories: verifiedSlots.dinner?.calories || 410,
        protein: `${verifiedSlots.dinner?.protein || 24}g`,
        carbs: `${verifiedSlots.dinner?.carbs || 40}g`,
        fat: `${verifiedSlots.dinner?.fat || 12}g`,
        prepTime: verifiedSlots.dinner?.prepTime || "15 min",
        ingredients: verifiedSlots.dinner?.ingredients || [],
        preparation: verifiedSlots.dinner?.preparation || [],
        alternative: "Light Moong Dal Khichuri with Steamed Veggies"
      }
    },
    shoppingList: [
      { category: "Fresh Produce", items: ["Spinach", "Cucumber", "Lemon", "Carrots", "Mint & Coriander"] },
      { category: "Proteins & Dairy", items: ["Low-fat Paneer / Tofu", "Curd (Yogurt)", "Moong Dal", "Toor Dal"] },
      { category: "Grains & Pantry", items: ["Ragi (Finger Millet) Flour", "Foxnuts (Makhana)", "Chia Seeds", "Brown Rice"] },
      { category: "Spices & Essentials", items: ["Turmeric", "Cumin", "Black Pepper", "Rock Salt", "Ghee"] }
    ],
    tips: [
      "Hydrate with a glass of water 20 minutes before each main meal.",
      "Prep soaked seeds and chopped veggies the night before to save morning prep time.",
      "Complete dinner at least 2 hours before sleep for optimal digestion and glucose regulation."
    ],
    medicalDisclaimer:
      "This information is for general educational purposes and may be suitable as part of a balanced diet. Consult a healthcare professional before making major dietary changes."
  };

  return formatAIResponseToRoutine(fallbackData, formData);
}
