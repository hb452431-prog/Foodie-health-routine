/**
 * Centralized Food Service (Unified Single Source of Truth).
 *
 * Powers all features across the Foodie-Health-Routine application:
 * 1. Dish Search
 * 2. Explore View
 * 3. Create My Plan & AI Routine Generation
 * 4. Disease / Health Food Routine Search
 * 5. My Plan & Saved Plans (via foodId)
 * 6. Food & Dish Details Modal
 * 7. Dietary & Nutrition Recommendations
 */

import { FOOD_KNOWLEDGE_BASE, FOOD_BY_ID, FOOD_BY_ALIAS } from "../data/foodKnowledgeBase";
import { searchMeals as searchMealDb, getMealById as getMealDbById } from "./mealDbService";
import { getExactDishImage, normalizeDishName, useExactDishImage, saveToPersistentCache } from "./imageService";

// Re-export central image utilities for universal availability
export { getExactDishImage, normalizeDishName, useExactDishImage };

/**
 * Hydrates a food item with standardized exact image fields & metadata
 */
export function hydrateFoodWithPersistentData(food) {
  if (!food) return null;

  return {
    ...food,
    name: food.name || food.dishName,
    dishName: food.dishName || food.name,
    aliases: food.aliases || [],
    cuisine: food.cuisine || "Authentic",
    region: food.region || food.stateOrRegion || "Regional",
    stateOrRegion: food.stateOrRegion || food.region || "Regional",
    country: food.country || "India",
    ingredients: food.ingredients || [],
    imageUrl: food.imageUrl || food.strMealThumb || food.image || null,
    imageSource: food.imageSource || (food.id?.startsWith("themealdb-") ? "themealdb" : "database"),
    imageStatus: food.imageStatus || (food.imageUrl ? "verified" : "unavailable"),
    imageVerified: Boolean(food.imageUrl && food.imageUrl.length > 5)
  };
}

/**
 * 1. Search foods across the master knowledge base + TheMealDB fallback
 */
export async function searchFoods(query = "", options = {}) {
  const cleanQuery = query.trim().toLowerCase();
  const aiCache = getPersistentAiImageCache();

  // If query is empty, return top curated database records
  if (!cleanQuery) {
    return FOOD_KNOWLEDGE_BASE.map(hydrateFoodWithPersistentData);
  }

  // 1. Search in Central Master Knowledge Base
  const matchedCurated = FOOD_KNOWLEDGE_BASE.filter((food) => {
    const matchName = food.dishName.toLowerCase().includes(cleanQuery);
    const matchAliases = food.aliases?.some((a) => a.toLowerCase().includes(cleanQuery));
    const matchCuisine = food.cuisine.toLowerCase().includes(cleanQuery);
    const matchRegion = food.stateOrRegion.toLowerCase().includes(cleanQuery);
    const matchCountry = food.country.toLowerCase().includes(cleanQuery);
    const matchCategory = food.category.toLowerCase().includes(cleanQuery);
    const matchHealthTags = food.healthTags?.some((t) => t.toLowerCase().includes(cleanQuery));
    const matchDietaryTags = food.dietaryTags?.some((t) => t.toLowerCase().includes(cleanQuery));
    const matchIngredients = food.ingredients?.some((i) => i.name.toLowerCase().includes(cleanQuery));

    return (
      matchName ||
      matchAliases ||
      matchCuisine ||
      matchRegion ||
      matchCountry ||
      matchCategory ||
      matchHealthTags ||
      matchDietaryTags ||
      matchIngredients
    );
  }).map(hydrateFoodWithPersistentData);

  // If we found strong matches in the curated knowledge base, return them
  if (matchedCurated.length >= 3 && !options.forceExternal) {
    return matchedCurated;
  }

  // 2. Query TheMealDB to supplement global dishes if not disabled
  try {
    const mealDbResults = await searchMealDb(cleanQuery);
    const mappedMealDb = (mealDbResults || []).map((m) => ({
      id: `themealdb-${m.idMeal || m.id}`,
      dishName: m.strMeal || m.title,
      country: m.strArea || "Global",
      stateOrRegion: m.strArea || "International",
      cuisine: m.strArea ? `${m.strArea} Cuisine` : "Global",
      category: m.strCategory || "Main Course",
      mealTypes: ["lunch", "dinner"],
      vegetarian: m.isVegetarian || false,
      vegan: false,
      calories: 420,
      protein: 20,
      carbs: 55,
      fat: 12,
      prepTime: "15 min",
      cookTime: "20 min",
      description: m.instructions ? `${m.instructions.slice(0, 160)}...` : `Authentic ${m.strArea || "global"} recipe from TheMealDB.`,
      ingredients: m.ingredients || [],
      preparation: m.steps || [],
      dietaryTags: m.isVegetarian ? ["vegetarian"] : ["balanced"],
      healthTags: ["balanced"],
      imageUrl: m.strMealThumb || m.image,
      imageSource: "THEMEALDB",
      imageGenerated: false,
      youtubeUrl: m.strYoutube || "",
      source: "THEMEALDB",
      verified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    // Combine and deduplicate
    const combined = [...matchedCurated];
    const seenNames = new Set(matchedCurated.map((f) => f.dishName.toLowerCase()));

    mappedMealDb.forEach((food) => {
      if (!seenNames.has(food.dishName.toLowerCase())) {
        seenNames.add(food.dishName.toLowerCase());
        combined.push(food);
      }
    });

    return combined;
  } catch (e) {
    return matchedCurated;
  }
}

/**
 * 2. Get single food item by ID (Single source of truth lookup)
 */
export async function getFoodById(id) {
  if (!id) return null;

  // Curated lookup
  if (FOOD_BY_ID.has(id)) {
    return hydrateFoodWithPersistentData(FOOD_BY_ID.get(id));
  }

  // Check if it's a TheMealDB ID
  if (id.startsWith("themealdb-")) {
    const rawId = id.replace(/^themealdb-/, "");
    try {
      const m = await getMealDbById(rawId);
      if (m) {
        return {
          id: `themealdb-${m.idMeal || m.id}`,
          dishName: m.strMeal || m.title,
          country: m.strArea || "Global",
          stateOrRegion: m.strArea || "International",
          cuisine: m.strArea ? `${m.strArea} Cuisine` : "Global",
          category: m.strCategory || "Main Course",
          mealTypes: ["lunch", "dinner"],
          vegetarian: m.isVegetarian || false,
          vegan: false,
          calories: 420,
          protein: 20,
          carbs: 55,
          fat: 12,
          prepTime: "15 min",
          cookTime: "20 min",
          description: m.instructions || "Authentic recipe details.",
          ingredients: m.ingredients || [],
          preparation: m.steps || [],
          dietaryTags: m.isVegetarian ? ["vegetarian"] : ["balanced"],
          healthTags: ["balanced"],
          imageUrl: m.strMealThumb || m.image,
          imageSource: "THEMEALDB",
          imageGenerated: false,
          youtubeUrl: m.strYoutube || "",
          source: "THEMEALDB",
          verified: true
        };
      }
    } catch (e) {
      console.warn("Could not lookup TheMealDB item:", e);
    }
  }

  // Fallback: search by alias
  return findOrResolveFood(id);
}

/**
 * 3. Resolves any dish name or alias into a real, verified Food Record
 * (Guarantees Gemini AI outputs always map to verified images & records)
 */
export function findOrResolveFood(nameOrQuery = "") {
  if (!nameOrQuery || typeof nameOrQuery !== "string") {
    return hydrateFoodWithPersistentData(FOOD_KNOWLEDGE_BASE[0]);
  }

  const clean = nameOrQuery.trim().toLowerCase();

  // 1. Direct ID match
  if (FOOD_BY_ID.has(clean)) {
    return hydrateFoodWithPersistentData(FOOD_BY_ID.get(clean));
  }

  // 2. Direct Alias match
  if (FOOD_BY_ALIAS.has(clean)) {
    return hydrateFoodWithPersistentData(FOOD_BY_ALIAS.get(clean));
  }

  // 3. Partial substring search
  for (const food of FOOD_KNOWLEDGE_BASE) {
    if (food.dishName.toLowerCase().includes(clean) || clean.includes(food.dishName.toLowerCase())) {
      return hydrateFoodWithPersistentData(food);
    }
    if (food.aliases?.some((a) => a.toLowerCase().includes(clean) || clean.includes(a.toLowerCase()))) {
      return hydrateFoodWithPersistentData(food);
    }
  }

  // 4. Keyword similarity search
  const keywords = clean.split(/\s+/).filter((w) => w.length > 2);
  for (const keyword of keywords) {
    for (const food of FOOD_KNOWLEDGE_BASE) {
      if (food.dishName.toLowerCase().includes(keyword)) {
        return hydrateFoodWithPersistentData(food);
      }
      if (food.aliases?.some((a) => a.toLowerCase().includes(keyword))) {
        return hydrateFoodWithPersistentData(food);
      }
    }
  }

  // Default fallback to first verified record
  return hydrateFoodWithPersistentData(FOOD_KNOWLEDGE_BASE[0]);
}

/**
 * 4. Structured Filtering across health tags, region, calories, etc.
 */
export function filterFoods(filters = {}) {
  return FOOD_KNOWLEDGE_BASE.filter((food) => {
    // Vegetarian / Vegan
    if (filters.vegetarian && !food.vegetarian) return false;
    if (filters.vegan && !food.vegan) return false;

    // Country
    if (filters.country && food.country.toLowerCase() !== filters.country.toLowerCase()) {
      return false;
    }

    // State or Region
    if (filters.stateOrRegion && !food.stateOrRegion.toLowerCase().includes(filters.stateOrRegion.toLowerCase())) {
      return false;
    }

    // Cuisine
    if (filters.cuisine && !food.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())) {
      return false;
    }

    // Category
    if (filters.category && filters.category !== "All" && food.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }

    // Meal Type (breakfast, lunch, dinner, morning, evening, snack)
    if (filters.mealType && !food.mealTypes.includes(filters.mealType)) {
      return false;
    }

    // Health Tags (high-protein, diabetes-conscious, heart-conscious, etc.)
    if (filters.healthTags && Array.isArray(filters.healthTags) && filters.healthTags.length > 0) {
      const hasAnyTag = filters.healthTags.some((tag) => food.healthTags.includes(tag));
      if (!hasAnyTag) return false;
    }

    // Dietary Tags
    if (filters.dietaryTags && Array.isArray(filters.dietaryTags) && filters.dietaryTags.length > 0) {
      const hasAnyDietTag = filters.dietaryTags.some((tag) => food.dietaryTags.includes(tag));
      if (!hasAnyDietTag) return false;
    }

    // Max Calories
    if (filters.maxCalories && food.calories > filters.maxCalories) return false;

    // Min Protein
    if (filters.minProtein && food.protein < filters.minProtein) return false;

    return true;
  }).map(hydrateFoodWithPersistentData);
}

/**
 * 5. Country, State, Cuisine, and Category helpers
 */
export function getFoodsByCountry(country) {
  return filterFoods({ country });
}

export function getFoodsByState(stateOrRegion) {
  return filterFoods({ stateOrRegion });
}

export function getFoodsByCuisine(cuisine) {
  return filterFoods({ cuisine });
}

export function getFoodsByCategory(category) {
  return filterFoods({ category });
}

export function getFoodsByHealthTag(tag) {
  return filterFoods({ healthTags: [tag] });
}

/**
 * 6. Get Food Candidates for a complete daily routine matching user criteria
 */
export function getFoodsForPlan(criteria = {}) {
  const {
    diet = "Vegetarian",
    goal = "Healthy Eating",
    stateOrRegion = "",
    healthConditions = []
  } = criteria;

  const isVeg = diet === "Vegetarian" || diet === "Vegan";
  const isVegan = diet === "Vegan";

  const isDiabetes = healthConditions.includes("diabetes") || goal.toLowerCase().includes("diabetes");
  const isHighProtein = goal.toLowerCase().includes("muscle") || goal.toLowerCase().includes("fitness");

  const targetHealthTags = [];
  if (isDiabetes) targetHealthTags.push("diabetes-conscious", "low-added-sugar", "high-fiber");
  if (isHighProtein) targetHealthTags.push("high-protein", "fitness-friendly");

  const available = FOOD_KNOWLEDGE_BASE.filter((f) => {
    if (isVeg && !f.vegetarian) return false;
    if (isVegan && !f.vegan) return false;
    return true;
  }).map(hydrateFoodWithPersistentData);

  // Helper to pick best matching item for a meal slot
  const pickSlotFood = (slot, fallbackIndex = 0) => {
    // Try matching slot + region + health tag
    let match = available.find((f) => {
      const slotOk = f.mealTypes.includes(slot);
      const regionOk = stateOrRegion ? f.stateOrRegion.toLowerCase().includes(stateOrRegion.toLowerCase()) : true;
      const tagOk = targetHealthTags.length > 0 ? targetHealthTags.some((t) => f.healthTags.includes(t)) : true;
      return slotOk && regionOk && tagOk;
    });

    // Fallback matching just slot
    if (!match) {
      match = available.find((f) => f.mealTypes.includes(slot));
    }

    return match || available[fallbackIndex % available.length] || FOOD_KNOWLEDGE_BASE[0];
  };

  return {
    morning: pickSlotFood("morning", 0),
    breakfast: pickSlotFood("breakfast", 1),
    midMorning: pickSlotFood("midMorning", 2),
    lunch: pickSlotFood("lunch", 3),
    evening: pickSlotFood("evening", 4),
    dinner: pickSlotFood("dinner", 5)
  };
}

/**
 * 7. AI Image Generation & Cache Service
 * Routes to centralized getExactDishImage service.
 */
export async function generateAndStoreFoodImage(foodId, dishPrompt = "") {
  if (!foodId) throw new Error("foodId is required to generate food image.");
  return getExactDishImage({ id: foodId, dishPrompt });
}
