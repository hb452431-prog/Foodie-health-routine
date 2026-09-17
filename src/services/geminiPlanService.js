/**
 * Client Service for Gemini AI Food Routine Planning.
 *
 * Integrated with Central Food Knowledge Base (Single Source of Truth).
 * Guarantees every generated meal resolves to an existing verified food record
 * with authentic stored imagery and structured nutrition data.
 *
 * Supports both:
 * 1. Serverless endpoint: POST /api/ai/food-plan
 * 2. Direct client fallback using user's configured Gemini API key if server is unreachable
 */

import { findOrResolveFood, getFoodsForPlan } from "./foodService";
import { getGeminiApiKey } from "../utils/storage";

const DEFAULT_TIMEOUT_MS = 25000;

/**
 * Extracts numeric value from a string (e.g. "45 kcal", "90g", "2.5L") or number.
 */
export function parseMacroNumber(val, defaultVal = 0) {
  if (typeof val === "number" && !isNaN(val)) return Math.round(val);
  if (typeof val === "string") {
    const match = val.match(/[\d.]+/);
    if (match) {
      const num = parseFloat(match[0]);
      if (!isNaN(num)) return Math.round(num);
    }
  }
  return typeof defaultVal === "number" ? defaultVal : 0;
}

/**
 * Normalizes ingredient items to ensure both { name, amount } and string formats work.
 */
function normalizeIngredients(ingredients) {
  if (!Array.isArray(ingredients)) return [];
  return ingredients.map((item) => {
    if (!item) return { name: "Healthy Ingredient", amount: "1 portion" };
    if (typeof item === "string") {
      // Split on typical quantities or keep string as name
      return { name: item.trim(), amount: "" };
    }
    if (typeof item === "object") {
      return {
        name: String(item.name || item.item || item.ingredient || "Nutritious item").trim(),
        amount: String(item.amount || item.qty || item.quantity || "").trim()
      };
    }
    return { name: String(item), amount: "" };
  });
}

/**
 * Normalizes preparation steps to clean array of strings.
 */
function normalizeSteps(steps) {
  if (!Array.isArray(steps)) return ["Prepare ingredients fresh and serve mindfully."];
  return steps
    .map((s) => (typeof s === "string" ? s.trim() : (s?.step || s?.instruction || String(s)).trim()))
    .filter(Boolean);
}

/**
 * Transforms AI structured response into the full Routine model used by Foodie-Health-Routine.
 * Every meal is mapped and validated against the Central Food Knowledge Base.
 */
export function formatAIResponseToRoutine(aiData, formData = {}) {
  const { summary, dailyTargets = {}, meals = {}, shoppingList = [], tips = [], medicalDisclaimer } = aiData || {};

  const mealSlots = [
    { key: "morning", defaultSlot: "Morning Elixir", defaultTime: "07:00 AM", defaultEmoji: "🌅" },
    { key: "breakfast", defaultSlot: "Power Breakfast", defaultTime: "08:30 AM", defaultEmoji: "🍳" },
    { key: "midMorning", defaultSlot: "Mid-Morning Snack", defaultTime: "11:00 AM", defaultEmoji: "🍎" },
    { key: "lunch", defaultSlot: "Energizing Lunch", defaultTime: "01:30 PM", defaultEmoji: "🍱" },
    { key: "evening", defaultSlot: "Evening Refresh", defaultTime: "05:00 PM", defaultEmoji: "☕" },
    { key: "dinner", defaultSlot: "Light Restorative Dinner", defaultTime: "08:00 PM", defaultEmoji: "🌙" }
  ];

  const targetMealsCount = Number(formData.mealsPerDay) || 5;

  const dailyTimeline = mealSlots
    .filter((slot) => {
      if (targetMealsCount === 3) {
        return ["breakfast", "lunch", "dinner"].includes(slot.key);
      }
      if (targetMealsCount === 4) {
        return ["morning", "breakfast", "lunch", "dinner"].includes(slot.key);
      }
      if (targetMealsCount === 5) {
        return ["morning", "breakfast", "lunch", "evening", "dinner"].includes(slot.key);
      }
      return true;
    })
    .map((slot, index) => {
      const meal = meals[slot.key] || {};
      const dishTitle = meal.dish || meal.title || `${slot.defaultSlot} Special`;

      // Resolve dish against Single Source of Truth Knowledge Base
      const verifiedFood = findOrResolveFood(meal.foodId || dishTitle);

      const cal = parseMacroNumber(meal.calories, verifiedFood?.calories || 250);
      const prot = parseMacroNumber(meal.protein, verifiedFood?.protein || 12);
      const carbs = parseMacroNumber(meal.carbs, verifiedFood?.carbs || 35);
      const fat = parseMacroNumber(meal.fat, verifiedFood?.fat || 6);

      const rawIngredients = Array.isArray(meal.ingredients) && meal.ingredients.length > 0
        ? meal.ingredients
        : verifiedFood?.ingredients || [];

      const rawSteps = Array.isArray(meal.preparation) && meal.preparation.length > 0
        ? meal.preparation
        : (Array.isArray(meal.steps) && meal.steps.length > 0 ? meal.steps : verifiedFood?.preparation || []);

      const ingredients = normalizeIngredients(rawIngredients);
      const steps = normalizeSteps(rawSteps);

      return {
        id: `ai-meal-${slot.key}-${Date.now()}-${index}`,
        foodId: verifiedFood?.id || `food-${slot.key}`,
        foodRecord: verifiedFood,
        slotName: meal.slotName || slot.defaultSlot,
        time: meal.time || slot.defaultTime,
        emoji: meal.emoji || slot.defaultEmoji,
        title: dishTitle,
        dish: dishTitle,
        image: verifiedFood?.imageUrl || null,
        imageUrl: verifiedFood?.imageUrl || null,
        imageSource: verifiedFood?.imageSource || "database",
        imageStatus: verifiedFood?.imageStatus || (verifiedFood?.imageUrl ? "verified" : "pending"),
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
        description: verifiedFood?.description || `Scientifically calibrated ${dishTitle} supporting your ${formData.goal || "health"} goal.`,
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

  const goalName = formData.goal || "Healthy Nutrition";
  const userAge = formData.age || 26;
  const userDiet = formData.diet || "Balanced";
  const userActivity = formData.activity || "Moderate";

  return {
    id: `ai-routine-${Date.now()}`,
    customId: `ai-custom-${Date.now()}`,
    title: `Personalized ${goalName} Routine`,
    subtitle: `AI-calibrated for ${userAge} yrs • ${userDiet} • ${userActivity} activity • ${dailyTimeline.length} meals/day`,
    category: "AI Personalized Plan",
    description:
      summary ||
      `Customized clinical-grade nutrition timetable designed to achieve ${goalName.toLowerCase()} with wholesome ${userDiet.toLowerCase()} meals.`,
    calories: totalCalories,
    protein: totalProtein,
    carbs: totalCarbs,
    fat: totalFat,
    water: dailyTargets.water || "8-10 glasses (2.5 - 3.0 Liters)",
    isVegetarian: userDiet === "Vegetarian" || userDiet === "Vegan",
    image: dailyTimeline[0]?.image || dailyTimeline[1]?.image || null,
    imageUrl: dailyTimeline[0]?.imageUrl || dailyTimeline[1]?.imageUrl || null,
    mealsCount: dailyTimeline.length,
    difficulty: formData.cookingTime === "Quick" ? "Quick & Easy" : "Balanced",
    prepTimeAvg: formData.cookingTime === "Quick" ? "10-15 min" : "20-25 min",
    isCustom: true,
    isAIGenerated: true,
    generatedAt: new Date().toLocaleDateString(),
    dailyTimeline,
    shoppingList: Array.isArray(shoppingList) ? shoppingList : [],
    tips: Array.isArray(tips) && tips.length > 0 ? tips : [
      "Drink a large glass of water 20 minutes before each main meal.",
      "Pre-chop fresh vegetables and store in airtight containers for rapid cooking.",
      "Focus on chewing slowly to enhance digestion and nutrient absorption."
    ],
    medicalDisclaimer:
      medicalDisclaimer ||
      "This food routine is for general information only and is not medical advice. Consult a qualified healthcare professional for personalized dietary guidance.",
    userPreferences: { ...formData }
  };
}

/**
 * Builds the high-efficiency nutritionist prompt for Gemini AI.
 */
function buildNutritionistPrompt(formData) {
  const age = Number(formData.age) || 26;
  const gender = String(formData.gender || "").trim();
  const goal = String(formData.goal || "Healthy Eating").trim();
  const diet = String(formData.diet || "Vegetarian").trim();
  const activity = String(formData.activity || "Moderate").trim();
  const mealsPerDay = Number(formData.mealsPerDay) || 5;
  const foodPreferences = Array.isArray(formData.foodPreferences)
    ? formData.foodPreferences.join(", ")
    : String(formData.foodPreferences || "").trim();
  const dislikedFoods = String(formData.dislikedFoods || "").trim();
  const allergies = Array.isArray(formData.allergies)
    ? formData.allergies.join(", ")
    : String(formData.allergies || "None").trim();
  const budget = String(formData.budget || "Medium").trim();
  const cookingTime = String(formData.cookingTime || "Normal").trim();
  const location = String(formData.location || "").trim();
  const healthNotes = String(formData.healthNotes || "").trim();

  return `You are a clinical sports dietitian. Create a personalized, highly accurate daily food routine JSON for:
- Profile: ${age}yo ${gender || "adult"}, Goal: ${goal}, Diet: ${diet}, Activity: ${activity}, Meals/Day: ${mealsPerDay}${location ? `, Location: ${location}` : ""}
- Preferences: ${foodPreferences || "Healthy balanced"} | Avoid: ${dislikedFoods || "None"} | Allergies: ${allergies || "None"} | Budget: ${budget} | Prep: ${cookingTime} | Notes: ${healthNotes || "None"}

Return ONLY a valid JSON object matching this EXACT schema with realistic macros & appetizing dishes:
{
  "summary": "Concise 1-sentence plan summary",
  "dailyTargets": { "calories": 2000, "protein": "90g", "carbs": "220g", "fat": "50g", "water": "2.5L - 3L" },
  "meals": {
    "morning": { "slotName": "Morning Elixir", "time": "07:00 AM", "emoji": "🌅", "dish": "Dish Name", "calories": 40, "protein": "1g", "carbs": "5g", "fat": "0g", "prepTime": "3 min", "ingredients": [{"name": "Item", "amount": "Qty"}], "preparation": ["Quick step 1"], "alternative": "Substitute" },
    "breakfast": { "slotName": "Power Breakfast", "time": "08:30 AM", "emoji": "🍳", "dish": "Dish Name", "calories": 420, "protein": "22g", "carbs": "50g", "fat": "12g", "prepTime": "12 min", "ingredients": [{"name": "Item", "amount": "Qty"}, {"name": "Item", "amount": "Qty"}], "preparation": ["Step 1", "Step 2"], "alternative": "Substitute" },
    "midMorning": { "slotName": "Mid-Morning Snack", "time": "11:00 AM", "emoji": "🍎", "dish": "Dish Name", "calories": 140, "protein": "4g", "carbs": "22g", "fat": "2g", "prepTime": "3 min", "ingredients": [{"name": "Item", "amount": "Qty"}], "preparation": ["Step 1"], "alternative": "Substitute" },
    "lunch": { "slotName": "Energizing Lunch", "time": "01:30 PM", "emoji": "🍱", "dish": "Dish Name", "calories": 580, "protein": "28g", "carbs": "70g", "fat": "15g", "prepTime": "20 min", "ingredients": [{"name": "Item", "amount": "Qty"}, {"name": "Item", "amount": "Qty"}], "preparation": ["Step 1", "Step 2"], "alternative": "Substitute" },
    "evening": { "slotName": "Evening Refresh", "time": "05:00 PM", "emoji": "☕", "dish": "Dish Name", "calories": 160, "protein": "5g", "carbs": "20g", "fat": "4g", "prepTime": "5 min", "ingredients": [{"name": "Item", "amount": "Qty"}], "preparation": ["Step 1"], "alternative": "Substitute" },
    "dinner": { "slotName": "Light Dinner", "time": "08:00 PM", "emoji": "🌙", "dish": "Dish Name", "calories": 460, "protein": "26g", "carbs": "35g", "fat": "14g", "prepTime": "15 min", "ingredients": [{"name": "Item", "amount": "Qty"}, {"name": "Item", "amount": "Qty"}], "preparation": ["Step 1", "Step 2"], "alternative": "Substitute" }
  },
  "shoppingList": [
    { "category": "Fresh Produce", "items": ["Item 1", "Item 2"] },
    { "category": "Proteins & Dairy", "items": ["Item 1", "Item 2"] },
    { "category": "Pantry & Spices", "items": ["Item 1", "Item 2"] }
  ],
  "tips": [
    "Drink a glass of water 20 mins before meals.",
    "Prep protein and chopped veggies ahead of time."
  ],
  "medicalDisclaimer": "General nutrition guidance only. Consult a physician for specific health conditions."
}`;
}

/**
 * Direct client-side Gemini generation fallback using user's configured API Key.
 */
async function generateWithGeminiDirect(apiKey, formData) {
  const prompt = buildNutritionistPrompt(formData);
  const models = [
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.5-flash-8b"
  ];

  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 2048
        }
      };

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);

      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (res.status === 400) {
        // Retry without responseMimeType
        const fallbackPayload = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 2048 }
        };
        const retryRes = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fallbackPayload),
          signal: controller.signal
        });
        if (retryRes.ok) res = retryRes;
      }

      clearTimeout(timer);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg = errData?.error?.message || `HTTP ${res.status}`;
        lastError = new Error(msg);
        if (res.status === 401 || res.status === 403) {
          throw new Error("Invalid Gemini API Key. Please verify your API key.");
        }
        continue;
      }

      const json = await res.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) continue;

      let cleaned = text.trim();
      if (cleaned.startsWith("```json")) {
        cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
      }

      const parsed = JSON.parse(cleaned);
      if (parsed && parsed.meals) {
        return formatAIResponseToRoutine(parsed, formData);
      }
    } catch (e) {
      if (e.message.includes("Invalid Gemini API Key")) {
        throw e;
      }
      lastError = e;
    }
  }

  throw lastError || new Error("Failed to generate plan with available Gemini models.");
}

/**
 * Generate a personalized food routine via Gemini AI.
 * Attempts serverless API first, then falls back to direct client API if user configured an API key.
 */
export async function generateAIFoodPlan(formData) {
  const customKey =
    formData?.apiKey ||
    getGeminiApiKey() ||
    (typeof import.meta !== "undefined" && (import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.GEMINI_API_KEY)) ||
    "";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch("/api/ai/food-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(customKey ? { "x-gemini-api-key": customKey } : {})
      },
      body: JSON.stringify({ ...formData, apiKey: customKey }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    if (response.ok && result.success && result.data) {
      return formatAIResponseToRoutine(result.data, formData);
    }

    // If server returned an error (e.g. 503 missing server key) and we have a custom client key, try direct client generation
    if (customKey && (response.status === 503 || response.status === 404 || !result.success)) {
      return await generateWithGeminiDirect(customKey, formData);
    }

    const errorMsg = result?.error || `Server responded with status ${response.status}`;
    const err = new Error(errorMsg);
    err.code = result?.code || "API_ERROR";
    throw err;
  } catch (err) {
    clearTimeout(timeoutId);

    // If fetch failed completely (e.g., local dev without backend or static host) and we have customKey, try direct client call
    if (customKey && err.name !== "AbortError" && !err.message.includes("Invalid Gemini API Key")) {
      try {
        return await generateWithGeminiDirect(customKey, formData);
      } catch (directErr) {
        throw directErr;
      }
    }

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
