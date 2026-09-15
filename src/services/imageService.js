/**
 * Centralized Exact Dish Image Service (Single Source of Truth for Food Images).
 *
 * Implements strict priority:
 * 1. Central Food Database (foodKnowledgeBase.js) exact ID & alias matches
 * 2. Cached verified / AI-generated dish images (in-memory + localStorage)
 * 3. TheMealDB API with strict relevance and title validation
 * 4. Server-Side Gemini / Imagen AI Image Generation (/api/ai/generate-food-image)
 * 5. Clean "Image unavailable" fallback (NEVER random or unrelated food images)
 */

import { useState, useEffect } from "react";
import { FOOD_KNOWLEDGE_BASE, FOOD_BY_ID, FOOD_BY_ALIAS } from "../data/foodKnowledgeBase";
import { searchMeals as searchMealDb } from "./mealDbService";

// LocalStorage persistent cache key
const EXACT_IMAGE_STORAGE_KEY = "foodie_exact_dish_images_v2";

// In-memory runtime cache for instantaneous lookups
const memoryImageCache = new Map();

// In-flight request deduplication map to prevent redundant concurrent API calls
const inFlightRequests = new Map();

/**
 * Normalizes a dish name string for exact matching:
 * - Lowercase
 * - Trim extra spaces
 * - Strip punctuation, special characters, and dashes
 * - Normalize common suffix noise (e.g. "recipe", "dish", "special")
 */
export function normalizeDishName(name = "") {
  if (!name || typeof name !== "string") return "";
  return name
    .toLowerCase()
    .replace(/[\(\)\[\]\{\}\-\_\,\.\:\;\/\\\"\']/g, " ")
    .replace(/\b(authentic|traditional|healthy|crispy|steamed|homestyle|special|style|recipe|dish|bowl|platter)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Reads persistent image cache from localStorage
 */
function getPersistentCache() {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(EXACT_IMAGE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Saves a resolved image to persistent cache
 */
export function saveToPersistentCache(key, imageRecord) {
  if (!key || !imageRecord || typeof window === "undefined" || !window.localStorage) return;
  try {
    memoryImageCache.set(key, imageRecord);
    const cache = getPersistentCache();
    cache[key] = {
      ...imageRecord,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(EXACT_IMAGE_STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn("[imageService] Could not persist to localStorage:", e);
  }
}

/**
 * Priority 1: Search the Central Food Database for verified exact dish image
 */
function findInFoodDatabase(dishOrName) {
  if (!dishOrName) return null;

  // Case A: dishOrName is an object with id
  if (typeof dishOrName === "object") {
    if (dishOrName.id && FOOD_BY_ID.has(dishOrName.id)) {
      const match = FOOD_BY_ID.get(dishOrName.id);
      if (match.imageUrl && match.imageUrl.trim().length > 5) {
        return {
          imageUrl: match.imageUrl,
          imageSource: match.imageSource || "database",
          imageStatus: "verified",
          dishName: match.dishName,
          cuisine: match.cuisine,
          region: match.stateOrRegion,
          imageVerified: true
        };
      }
    }
  }

  const rawName = typeof dishOrName === "object"
    ? (dishOrName.dishName || dishOrName.name || dishOrName.title || dishOrName.id || "")
    : String(dishOrName || "");

  const clean = normalizeDishName(rawName);
  if (!clean) return null;

  // Check direct alias map
  if (FOOD_BY_ALIAS.has(clean)) {
    const match = FOOD_BY_ALIAS.get(clean);
    if (match.imageUrl && match.imageUrl.trim().length > 5) {
      return {
        imageUrl: match.imageUrl,
        imageSource: match.imageSource || "database",
        imageStatus: "verified",
        dishName: match.dishName,
        cuisine: match.cuisine,
        region: match.stateOrRegion,
        imageVerified: true
      };
    }
  }

  // Check exact dishName or aliases in knowledge base
  for (const food of FOOD_KNOWLEDGE_BASE) {
    const normFoodName = normalizeDishName(food.dishName);
    if (normFoodName === clean) {
      return {
        imageUrl: food.imageUrl,
        imageSource: food.imageSource || "database",
        imageStatus: "verified",
        dishName: food.dishName,
        cuisine: food.cuisine,
        region: food.stateOrRegion,
        imageVerified: true
      };
    }
    if (food.aliases?.some((a) => normalizeDishName(a) === clean)) {
      return {
        imageUrl: food.imageUrl,
        imageSource: food.imageSource || "database",
        imageStatus: "verified",
        dishName: food.dishName,
        cuisine: food.cuisine,
        region: food.stateOrRegion,
        imageVerified: true
      };
    }
  }

  return null;
}

/**
 * Priority 2: Query TheMealDB API with strict relevance validation
 */
async function findInTheMealDB(dishName) {
  const clean = normalizeDishName(dishName);
  if (!clean || clean.length < 3) return null;

  try {
    const results = await searchMealDb(clean);
    if (!results || !Array.isArray(results) || results.length === 0) {
      return null;
    }

    // Validate that the returned meal title is an actual match (not a generic unrelated recipe)
    const exactMatch = results.find((m) => {
      const mealTitle = normalizeDishName(m.strMeal || m.title);
      return mealTitle.includes(clean) || clean.includes(mealTitle);
    });

    if (exactMatch && (exactMatch.strMealThumb || exactMatch.image)) {
      return {
        imageUrl: exactMatch.strMealThumb || exactMatch.image,
        imageSource: "themealdb",
        imageStatus: "verified",
        dishName: exactMatch.strMeal || exactMatch.title,
        cuisine: exactMatch.strArea || "Global",
        region: exactMatch.strArea || "International",
        imageVerified: true
      };
    }

    return null;
  } catch (err) {
    console.warn("[imageService] TheMealDB search error:", err?.message);
    return null;
  }
}

/**
 * Priority 4: Server-Side Gemini AI Image Generation (/api/ai/generate-food-image)
 */
async function generateExactDishImageAI(dishInfo) {
  const dishName = dishInfo.dishName || dishInfo.name || dishInfo.title || dishInfo.id || "Healthy Dish";
  const cuisine = dishInfo.cuisine || "Authentic Regional";
  const region = dishInfo.region || dishInfo.stateOrRegion || "";
  const ingredientsList = Array.isArray(dishInfo.ingredients)
    ? dishInfo.ingredients.map((i) => (typeof i === "string" ? i : i.name)).join(", ")
    : "";

  // Construct high-detail, authentic culinary prompt with negative constraints
  const dishPrompt =
    `Create a realistic high-quality food photograph of authentic ${dishName}, ` +
    `a ${cuisine} ${region ? `from ${region}` : ""} dish ` +
    `${ingredientsList ? `prepared with ${ingredientsList}` : "made with traditional fresh wholesome ingredients"}. ` +
    `Show only the exact dish freshly prepared on a clean plate or bowl in appetizing natural lighting with authentic garnishes. ` +
    `Do not include pizza, bread, roti, noodles, or unrelated food. ` +
    `No text, no labels, no logo, no people, no watermark.`;

  const foodId = dishInfo.id || `dish-${normalizeDishName(dishName).replace(/\s+/g, "-")}`;

  const res = await fetch("/api/ai/generate-food-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      foodId,
      dishName,
      cuisine,
      dishPrompt
    })
  });

  const data = await res.json();
  if (!res.ok || !data.success || !data.imageUrl) {
    throw new Error(data.error || "AI Image generation returned empty image.");
  }

  return {
    imageUrl: data.imageUrl,
    imageSource: "ai-generated",
    imageStatus: "generated",
    dishName,
    cuisine,
    region,
    imagePrompt: dishPrompt,
    imageGeneratedAt: new Date().toISOString(),
    imageVerified: false
  };
}

/**
 * Main Centralized Image Resolver: getExactDishImage(dish)
 * Follows strict priority order with deduplication & caching.
 */
export async function getExactDishImage(dishOrName, options = {}) {
  if (!dishOrName) {
    return {
      imageUrl: null,
      imageSource: "unavailable",
      imageStatus: "unavailable"
    };
  }

  // 1. Resolve dish info object
  let dishInfo = {};
  if (typeof dishOrName === "object") {
    dishInfo = { ...dishOrName };
  } else {
    dishInfo = { dishName: String(dishOrName) };
  }

  const rawName = dishInfo.dishName || dishInfo.name || dishInfo.title || dishInfo.id || "";
  const cacheKey = dishInfo.id ? `id_${dishInfo.id}` : `name_${normalizeDishName(rawName)}`;

  // 2. Check in-memory cache
  if (memoryImageCache.has(cacheKey)) {
    return memoryImageCache.get(cacheKey);
  }

  // 3. Check localStorage persistent cache
  const persistentCache = getPersistentCache();
  if (persistentCache[cacheKey] && persistentCache[cacheKey].imageUrl) {
    const cached = persistentCache[cacheKey];
    memoryImageCache.set(cacheKey, cached);
    return cached;
  }

  // 4. Check if exact request is already in-flight (Request Deduplication)
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  // Start execution promise
  const fetchPromise = (async () => {
    try {
      // Priority 1: Check existing Food Database
      const dbMatch = findInFoodDatabase(dishOrName);
      if (dbMatch && dbMatch.imageUrl) {
        saveToPersistentCache(cacheKey, dbMatch);
        return dbMatch;
      }

      // If existing dishInfo already has a verified explicit imageUrl
      if (dishInfo.imageUrl && typeof dishInfo.imageUrl === "string" && dishInfo.imageUrl.startsWith("http")) {
        const directRecord = {
          imageUrl: dishInfo.imageUrl,
          imageSource: dishInfo.imageSource || "database",
          imageStatus: "verified",
          dishName: rawName,
          cuisine: dishInfo.cuisine || "Authentic",
          region: dishInfo.region || dishInfo.stateOrRegion || "",
          imageVerified: true
        };
        saveToPersistentCache(cacheKey, directRecord);
        return directRecord;
      }

      // Priority 2: Search TheMealDB API with strict validation
      const mealDbMatch = await findInTheMealDB(rawName);
      if (mealDbMatch && mealDbMatch.imageUrl) {
        saveToPersistentCache(cacheKey, mealDbMatch);
        return mealDbMatch;
      }

      // Priority 4: Server-Side Gemini AI Image Generation (only if allowed by options)
      if (!options.skipAiGeneration) {
        try {
          const aiGenerated = await generateExactDishImageAI(dishInfo);
          if (aiGenerated && aiGenerated.imageUrl) {
            saveToPersistentCache(cacheKey, aiGenerated);
            return aiGenerated;
          }
        } catch (aiErr) {
          console.warn(`[imageService] AI image generation for "${rawName}" failed:`, aiErr?.message);
        }
      }

      // Fallback: Clean Image Unavailable State (NEVER random unrelated food!)
      const unavailableRecord = {
        imageUrl: null,
        imageSource: "unavailable",
        imageStatus: "unavailable",
        dishName: rawName
      };
      saveToPersistentCache(cacheKey, unavailableRecord);
      return unavailableRecord;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, fetchPromise);
  return fetchPromise;
}

/**
 * React Hook for seamless component integration: useExactDishImage(dish)
 */
export function useExactDishImage(dishOrName, options = {}) {
  const [imageState, setImageState] = useState(() => {
    if (!dishOrName) {
      return { imageUrl: null, imageStatus: "unavailable", imageSource: "unavailable", loading: false };
    }
    const rawName = typeof dishOrName === "object"
      ? (dishOrName.dishName || dishOrName.name || dishOrName.title || dishOrName.id || "")
      : String(dishOrName || "");
    const cacheKey = dishOrName?.id ? `id_${dishOrName.id}` : `name_${normalizeDishName(rawName)}`;

    // Immediate synchronous cache hit
    if (memoryImageCache.has(cacheKey)) {
      return { ...memoryImageCache.get(cacheKey), loading: false, error: null };
    }
    const pCache = getPersistentCache();
    if (pCache[cacheKey] && pCache[cacheKey].imageUrl) {
      return { ...pCache[cacheKey], loading: false, error: null };
    }

    // Direct database hit
    const dbMatch = findInFoodDatabase(dishOrName);
    if (dbMatch && dbMatch.imageUrl) {
      return { ...dbMatch, loading: false, error: null };
    }

    return {
      imageUrl: typeof dishOrName === "object" ? dishOrName.imageUrl || dishOrName.image : null,
      imageStatus: "loading",
      imageSource: "pending",
      loading: true,
      error: null
    };
  });

  useEffect(() => {
    let isMounted = true;

    async function resolve() {
      if (!dishOrName) {
        if (isMounted) {
          setImageState({ imageUrl: null, imageStatus: "unavailable", imageSource: "unavailable", loading: false, error: null });
        }
        return;
      }

      try {
        const result = await getExactDishImage(dishOrName, options);
        if (isMounted) {
          setImageState({
            imageUrl: result.imageUrl,
            imageStatus: result.imageStatus || (result.imageUrl ? "verified" : "unavailable"),
            imageSource: result.imageSource || "database",
            isAiGenerated: result.imageSource === "ai-generated" || result.imageStatus === "generated",
            loading: false,
            error: null
          });
        }
      } catch (err) {
        if (isMounted) {
          setImageState({
            imageUrl: null,
            imageStatus: "unavailable",
            imageSource: "unavailable",
            isAiGenerated: false,
            loading: false,
            error: err?.message
          });
        }
      }
    }

    resolve();

    return () => {
      isMounted = false;
    };
  }, [
    typeof dishOrName === "object" ? (dishOrName.id || dishOrName.dishName || dishOrName.title) : dishOrName
  ]);

  return imageState;
}
