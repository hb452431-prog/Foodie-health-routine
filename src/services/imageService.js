/**
 * Centralized Exact Dish Image Service (Single Source of Truth for Food Images).
 *
 * Implements strict priority:
 * 1. Central Food Database (foodKnowledgeBase.js) exact ID & alias matches
 * 2. Cached verified / AI-generated dish images (in-memory + localStorage with stable keys)
 * 3. TheMealDB API with strict relevance and title validation
 * 4. Server-Side Gemini Nano Banana Image Generation (/api/generate-food-image)
 * 5. Clean structured state (NEVER random or unrelated food images)
 */

import { useState, useEffect, useCallback } from "react";
import { FOOD_KNOWLEDGE_BASE, FOOD_BY_ID, FOOD_BY_ALIAS } from "../data/foodKnowledgeBase.js";
import { searchMeals as searchMealDb } from "./mealDbService.js";

// LocalStorage persistent cache key
const EXACT_IMAGE_STORAGE_KEY = "foodie_exact_dish_images_v3";

// In-memory runtime cache for instantaneous synchronous lookups
const memoryImageCache = new Map();

// In-flight request deduplication map to prevent redundant concurrent API calls
const inFlightRequests = new Map();

/**
 * Normalizes a dish name string for exact matching:
 * - Lowercase
 * - Trim extra spaces
 * - Strip punctuation, special characters, and dashes
 * - Normalize common suffix noise
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
 * Returns a stable storage cache key for a dish
 * Format: food-image-{cleanIdOrName}
 */
export function getStableImageKey(dishOrName) {
  if (!dishOrName) return "food-image-unknown";
  if (typeof dishOrName === "object" && dishOrName.id) {
    const cleanId = String(dishOrName.id).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `food-image-${cleanId}`;
  }
  const raw = typeof dishOrName === "object"
    ? (dishOrName.dishName || dishOrName.name || dishOrName.title || dishOrName.id || "")
    : String(dishOrName || "");
  const clean = normalizeDishName(raw).replace(/\s+/g, "-");
  return `food-image-${clean || "dish"}`;
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
 * Saves a resolved image to persistent cache (localStorage + memory)
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
 * Priority 3: Server-Side Gemini Nano Banana AI Image Generation (/api/generate-food-image)
 */
async function generateExactDishImageAI(dishInfo) {
  const dishName = dishInfo.dishName || dishInfo.name || dishInfo.title || dishInfo.id || "Healthy Dish";
  const cuisine = dishInfo.cuisine || "Authentic Regional";
  const region = dishInfo.region || dishInfo.stateOrRegion || "";
  const ingredients = Array.isArray(dishInfo.ingredients)
    ? dishInfo.ingredients.map((i) => (typeof i === "string" ? i : i.name)).filter(Boolean)
    : [];

  const foodId = dishInfo.id || `dish-${normalizeDishName(dishName).replace(/\s+/g, "-")}`;

  const payload = {
    foodId,
    dishName,
    cuisine,
    region,
    ingredients,
    dishPrompt: dishInfo.dishPrompt || undefined
  };

  console.log(`[imageService] Requesting AI image generation for "${dishName}" via /api/generate-food-image...`);

  // Try primary endpoint first, then fallback to /api/ai/generate-food-image
  let response = null;
  try {
    response = await fetch("/api/generate-food-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (_e) {
    response = await fetch("/api/ai/generate-food-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success || !data.imageUrl) {
    const errorMsg = data.error || data.userMessage || `Image generation failed (${response.status})`;
    console.error(`[imageService] Generation failed for "${dishName}":`, errorMsg);
    const err = new Error(errorMsg);
    err.userMessage = data.userMessage || "We couldn't generate an image right now. Please try again.";
    err.code = data.code || "IMAGE_GEN_FAILED";
    throw err;
  }

  return {
    imageUrl: data.imageUrl,
    imageSource: "ai-generated",
    imageStatus: "generated",
    dishName,
    cuisine,
    region,
    model: data.model,
    imageGeneratedAt: data.timestamp || new Date().toISOString(),
    imageVerified: false
  };
}

/**
 * Main Centralized Image Resolver: getExactDishImage(dish, options)
 *
 * Follows strict priority order:
 * 1. Database Match
 * 2. Persistent / Memory Cache (food-image-{key})
 * 3. TheMealDB Exact Match
 * 4. Gemini Nano Banana AI Generation
 * 5. Controlled fallback (no random images)
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
  const cacheKey = getStableImageKey(dishInfo);

  // 2. Check in-memory cache (instantaneous)
  if (memoryImageCache.has(cacheKey)) {
    const cached = memoryImageCache.get(cacheKey);
    if (cached && cached.imageUrl) {
      return cached;
    }
  }

  // 3. Check localStorage persistent cache
  const persistentCache = getPersistentCache();
  if (persistentCache[cacheKey] && persistentCache[cacheKey].imageUrl) {
    const cached = persistentCache[cacheKey];
    memoryImageCache.set(cacheKey, cached);
    return cached;
  }

  // 4. Check if request is already in-flight (Deduplication)
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  // Start execution promise
  const fetchPromise = (async () => {
    try {
      // Step 1: Check existing Food Database
      const dbMatch = findInFoodDatabase(dishOrName);
      if (dbMatch && dbMatch.imageUrl) {
        saveToPersistentCache(cacheKey, dbMatch);
        return dbMatch;
      }

      // If existing dishInfo already has a verified explicit imageUrl
      if (dishInfo.imageUrl && typeof dishInfo.imageUrl === "string" && (dishInfo.imageUrl.startsWith("http") || dishInfo.imageUrl.startsWith("data:"))) {
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

      // Step 2: Search TheMealDB API with strict validation
      const mealDbMatch = await findInTheMealDB(rawName);
      if (mealDbMatch && mealDbMatch.imageUrl) {
        saveToPersistentCache(cacheKey, mealDbMatch);
        return mealDbMatch;
      }

      // Step 3: Server-Side Gemini AI Image Generation (only if allowed by options)
      if (!options.skipAiGeneration) {
        try {
          const aiGenerated = await generateExactDishImageAI(dishInfo);
          if (aiGenerated && aiGenerated.imageUrl) {
            saveToPersistentCache(cacheKey, aiGenerated);
            return aiGenerated;
          }
        } catch (aiErr) {
          console.warn(`[imageService] AI generation for "${rawName}" failed:`, aiErr?.message);
          // Return failure object with error details for UI retry, but do NOT permanently cache as unavailable
          return {
            imageUrl: null,
            imageSource: "unavailable",
            imageStatus: "unavailable",
            dishName: rawName,
            error: aiErr.message,
            userMessage: aiErr.userMessage || "Image generation temporarily unavailable"
          };
        }
      }

      // Final structured fallback (NEVER random unrelated food!)
      return {
        imageUrl: null,
        imageSource: "unavailable",
        imageStatus: "unavailable",
        dishName: rawName
      };
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, fetchPromise);
  return fetchPromise;
}

/**
 * React Hook for seamless component integration: useExactDishImage(dish, options)
 * Provides progressive loading states and safe retry trigger
 */
export function useExactDishImage(dishOrName, options = {}) {
  const [loadingPhase, setLoadingPhase] = useState("finding"); // "finding" | "generating" | "saving"
  const [retryCount, setRetryCount] = useState(0);

  const [imageState, setImageState] = useState(() => {
    if (!dishOrName) {
      return { imageUrl: null, imageStatus: "unavailable", imageSource: "unavailable", loading: false };
    }
    const cacheKey = getStableImageKey(dishOrName);

    // Immediate synchronous cache hit
    if (memoryImageCache.has(cacheKey)) {
      const hit = memoryImageCache.get(cacheKey);
      if (hit?.imageUrl) return { ...hit, loading: false, error: null };
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

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function resolve() {
      if (!dishOrName) {
        if (isMounted) {
          setImageState({ imageUrl: null, imageStatus: "unavailable", imageSource: "unavailable", loading: false, error: null });
        }
        return;
      }

      if (isMounted) {
        setLoadingPhase("finding");
      }

      // Advance loading stage visualizer after short interval to inform user
      const timerGen = setTimeout(() => {
        if (isMounted) setLoadingPhase("generating");
      }, 700);

      const timerSave = setTimeout(() => {
        if (isMounted) setLoadingPhase("saving");
      }, 2500);

      try {
        const result = await getExactDishImage(dishOrName, options);
        clearTimeout(timerGen);
        clearTimeout(timerSave);

        if (isMounted) {
          setImageState({
            imageUrl: result.imageUrl,
            imageStatus: result.imageStatus || (result.imageUrl ? "verified" : "unavailable"),
            imageSource: result.imageSource || "database",
            isAiGenerated: result.imageSource === "ai-generated" || result.imageStatus === "generated",
            loading: false,
            error: result.error || null,
            userMessage: result.userMessage || null
          });
        }
      } catch (err) {
        clearTimeout(timerGen);
        clearTimeout(timerSave);

        if (isMounted) {
          setImageState({
            imageUrl: null,
            imageStatus: "unavailable",
            imageSource: "unavailable",
            isAiGenerated: false,
            loading: false,
            error: err?.message,
            userMessage: err?.userMessage || "We couldn't generate an image right now. Please try again."
          });
        }
      }
    }

    resolve();

    return () => {
      isMounted = false;
    };
  }, [
    typeof dishOrName === "object" ? (dishOrName.id || dishOrName.dishName || dishOrName.title) : dishOrName,
    retryCount
  ]);

  return {
    ...imageState,
    loadingPhase,
    retry
  };
}
