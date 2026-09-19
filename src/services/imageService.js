/**
 * Centralized Exact Dish Image Service (Single Source of Truth for Food Images).
 *
 * Implements strict priority:
 * 1. Direct verified image on dish object (imageUrl, image, img, strMealThumb, photoUrl)
 * 2. Comprehensive Food Database Index (foodKnowledgeBase, locationFoodData, routinesData, regionalCuisinesData)
 * 3. Cached verified / AI-generated dish images (in-memory + localStorage with stable keys)
 * 4. TheMealDB API with strict relevance and title validation
 * 5. Server-Side Gemini Nano Banana Image Generation (/api/generate-food-image)
 * 6. Clean structured state (NEVER random or unrelated food images)
 */

import { useState, useEffect, useCallback } from "react";
import { FOOD_KNOWLEDGE_BASE, FOOD_BY_ID, FOOD_BY_ALIAS } from "../data/foodKnowledgeBase.js";
import { MAJOR_LOCATIONS } from "../data/locationFoodData.js";
import { ROUTINES_DATA } from "../data/routinesData.js";
import { REGIONAL_DAILY_MENUS, GLOBAL_DAILY_MENUS, DISEASE_DAILY_NUTRITION_MAP } from "../data/regionalCuisinesData.js";
import { searchMeals as searchMealDb } from "./mealDbService.js";
import { getGeminiApiKey } from "../utils/storage.js";

// LocalStorage persistent cache key
const EXACT_IMAGE_STORAGE_KEY = "foodie_exact_dish_images_v4";

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
    .replace(/\b(authentic|traditional|healthy|crispy|steamed|homestyle|special|style|recipe|dish|bowl|platter|fresh|organic)\b/gi, " ")
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
 * Global Fast Lookup Index: Maps normalized dish titles & aliases to verified image records
 */
const GLOBAL_DISH_IMAGE_INDEX = new Map();

function buildGlobalDishIndex() {
  if (GLOBAL_DISH_IMAGE_INDEX.size > 0) return;

  const register = (title, imgUrl, meta = {}) => {
    if (!title || !imgUrl || typeof imgUrl !== "string" || imgUrl.length < 5) return;
    if (!imgUrl.startsWith("http://") && !imgUrl.startsWith("https://") && !imgUrl.startsWith("data:")) return;

    const clean = normalizeDishName(title);
    if (clean && !GLOBAL_DISH_IMAGE_INDEX.has(clean)) {
      GLOBAL_DISH_IMAGE_INDEX.set(clean, {
        imageUrl: imgUrl.trim(),
        imageSource: meta.imageSource || "database",
        imageStatus: "verified",
        dishName: meta.dishName || title,
        cuisine: meta.cuisine || "Authentic",
        region: meta.stateOrRegion || meta.region || "",
        imageVerified: true
      });
    }
  };

  // 1. Food Knowledge Base
  if (Array.isArray(FOOD_KNOWLEDGE_BASE)) {
    for (const food of FOOD_KNOWLEDGE_BASE) {
      if (food.imageUrl) {
        register(food.dishName, food.imageUrl, food);
        if (Array.isArray(food.aliases)) {
          for (const alias of food.aliases) {
            register(alias, food.imageUrl, food);
          }
        }
      }
    }
  }

  // 2. Major Locations Dishes
  if (Array.isArray(MAJOR_LOCATIONS)) {
    for (const loc of MAJOR_LOCATIONS) {
      const dishesObj = loc.dishes || {};
      for (const slot of Object.keys(dishesObj)) {
        const slotDishes = dishesObj[slot] || [];
        for (const d of slotDishes) {
          const img = d.image || d.imageUrl || d.img;
          if (img) register(d.title || d.dishName, img, { ...d, stateOrRegion: loc.state });
        }
      }
    }
  }

  // 3. Routines Data Meals
  if (Array.isArray(ROUTINES_DATA)) {
    for (const routine of ROUTINES_DATA) {
      if (Array.isArray(routine.dailyTimeline)) {
        for (const meal of routine.dailyTimeline) {
          const img = meal.image || meal.imageUrl || meal.img;
          if (img) register(meal.title || meal.dish || meal.dishName, img, meal);
        }
      }
    }
  }

  // 4. Regional Daily Menus
  if (REGIONAL_DAILY_MENUS && typeof REGIONAL_DAILY_MENUS === "object") {
    for (const regionKey of Object.keys(REGIONAL_DAILY_MENUS)) {
      const menu = REGIONAL_DAILY_MENUS[regionKey] || {};
      for (const slot of Object.keys(menu)) {
        const slotItem = menu[slot];
        if (slotItem) {
          const img = slotItem.img || slotItem.image || slotItem.imageUrl;
          if (img) register(slotItem.title, img, { cuisine: regionKey });
        }
      }
    }
  }

  // 5. Global Daily Menus
  if (GLOBAL_DAILY_MENUS && typeof GLOBAL_DAILY_MENUS === "object") {
    for (const cuisineKey of Object.keys(GLOBAL_DAILY_MENUS)) {
      const menu = GLOBAL_DAILY_MENUS[cuisineKey] || {};
      for (const slot of Object.keys(menu)) {
        const slotItem = menu[slot];
        if (slotItem) {
          const img = slotItem.img || slotItem.image || slotItem.imageUrl;
          if (img) register(slotItem.title, img, { cuisine: cuisineKey });
        }
      }
    }
  }

  // 6. Disease Daily Nutrition Map
  if (DISEASE_DAILY_NUTRITION_MAP && typeof DISEASE_DAILY_NUTRITION_MAP === "object") {
    for (const diseaseKey of Object.keys(DISEASE_DAILY_NUTRITION_MAP)) {
      const condition = DISEASE_DAILY_NUTRITION_MAP[diseaseKey] || {};
      const menu = condition.menu || {};
      for (const slot of Object.keys(menu)) {
        const slotItem = menu[slot];
        if (slotItem) {
          const img = slotItem.img || slotItem.image || slotItem.imageUrl;
          if (img) register(slotItem.title, img, { disease: diseaseKey });
        }
      }
    }
  }
}

// Build index immediately
buildGlobalDishIndex();

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
 * Search the Central Food Database & Global Datasets for verified exact dish image
 */
function findInFoodDatabase(dishOrName) {
  if (!dishOrName) return null;

  // Case A: Direct image property on incoming object
  if (typeof dishOrName === "object") {
    const directUrl =
      dishOrName.imageUrl ||
      dishOrName.image ||
      dishOrName.img ||
      dishOrName.strMealThumb ||
      dishOrName.thumbnail ||
      dishOrName.photoUrl;

    if (directUrl && typeof directUrl === "string" && directUrl.trim().length > 5) {
      const cleanUrl = directUrl.trim();
      if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://") || cleanUrl.startsWith("data:")) {
        return {
          imageUrl: cleanUrl,
          imageSource: dishOrName.imageSource || "verified",
          imageStatus: "verified",
          dishName: dishOrName.dishName || dishOrName.name || dishOrName.title || "Authentic Dish",
          cuisine: dishOrName.cuisine || "Authentic",
          region: dishOrName.stateOrRegion || dishOrName.region || "",
          imageVerified: true
        };
      }
    }

    // Direct ID Match in Food Knowledge Base
    if (dishOrName.id && FOOD_BY_ID.has(dishOrName.id)) {
      const match = FOOD_BY_ID.get(dishOrName.id);
      if (match.imageUrl && match.imageUrl.trim().length > 5) {
        return {
          imageUrl: match.imageUrl.trim(),
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

  // Direct Match in Global Dish Registry
  if (GLOBAL_DISH_IMAGE_INDEX.has(clean)) {
    return GLOBAL_DISH_IMAGE_INDEX.get(clean);
  }

  // Alias Match in Food Knowledge Base
  if (FOOD_BY_ALIAS.has(clean)) {
    const match = FOOD_BY_ALIAS.get(clean);
    if (match.imageUrl && match.imageUrl.trim().length > 5) {
      return {
        imageUrl: match.imageUrl.trim(),
        imageSource: match.imageSource || "database",
        imageStatus: "verified",
        dishName: match.dishName,
        cuisine: match.cuisine,
        region: match.stateOrRegion,
        imageVerified: true
      };
    }
  }

  // Substring Match across Global Dish Index
  for (const [key, item] of GLOBAL_DISH_IMAGE_INDEX.entries()) {
    if (clean.includes(key) || key.includes(clean)) {
      return item;
    }
  }

  return null;
}

/**
 * Priority 4: Query TheMealDB API with strict relevance validation
 */
async function findInTheMealDB(dishName) {
  const clean = normalizeDishName(dishName);
  if (!clean || clean.length < 3) return null;

  try {
    const results = await searchMealDb(clean);
    if (!results || !Array.isArray(results) || results.length === 0) {
      return null;
    }

    // Validate that the returned meal title is an actual match
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
    return null;
  }
}

/**
 * Priority 5: Server-Side Gemini Nano Banana AI Image Generation (/api/generate-food-image)
 */
async function generateExactDishImageAI(dishInfo) {
  const dishName = dishInfo.dishName || dishInfo.name || dishInfo.title || dishInfo.id || "Healthy Dish";
  const cuisine = dishInfo.cuisine || "Authentic Regional";
  const region = dishInfo.region || dishInfo.stateOrRegion || "";
  const ingredients = Array.isArray(dishInfo.ingredients)
    ? dishInfo.ingredients.map((i) => (typeof i === "string" ? i : i.name)).filter(Boolean)
    : [];

  const foodId = dishInfo.id || `dish-${normalizeDishName(dishName).replace(/\s+/g, "-")}`;

  const apiKey = getGeminiApiKey();

  const payload = {
    foodId,
    dishName,
    cuisine,
    region,
    ingredients,
    dishPrompt: dishInfo.dishPrompt || undefined,
    apiKey: apiKey || undefined
  };

  const reqHeaders = {
    "Content-Type": "application/json",
    ...(apiKey ? { "x-gemini-api-key": apiKey } : {})
  };

  console.log(`[imageService] Calling AI Image Generation for "${dishName}"...`);

  let response = null;
  try {
    response = await fetch("/api/generate-food-image", {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(payload)
    });
  } catch (_e) {
    response = await fetch("/api/ai/generate-food-image", {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(payload)
    });
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success || !data.imageUrl) {
    const errorMsg = data.error || data.userMessage || `Image generation failed (${response.status})`;
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

  // 2. Direct check on object or Database / Dataset Index (instantaneous)
  const dbMatch = findInFoodDatabase(dishOrName);
  if (dbMatch && dbMatch.imageUrl) {
    saveToPersistentCache(cacheKey, dbMatch);
    return dbMatch;
  }

  // 3. Check in-memory cache
  if (memoryImageCache.has(cacheKey)) {
    const cached = memoryImageCache.get(cacheKey);
    if (cached && cached.imageUrl) {
      return cached;
    }
  }

  // 4. Check localStorage persistent cache
  const persistentCache = getPersistentCache();
  if (persistentCache[cacheKey] && persistentCache[cacheKey].imageUrl) {
    const cached = persistentCache[cacheKey];
    memoryImageCache.set(cacheKey, cached);
    return cached;
  }

  // 5. Check if request is already in-flight (Deduplication)
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  // Start execution promise
  const fetchPromise = (async () => {
    try {
      // Step A: Search TheMealDB API
      const mealDbMatch = await findInTheMealDB(rawName);
      if (mealDbMatch && mealDbMatch.imageUrl) {
        saveToPersistentCache(cacheKey, mealDbMatch);
        return mealDbMatch;
      }

      // Step B: Server-Side Gemini Nano Banana AI Image Generation
      if (!options.skipAiGeneration) {
        try {
          const aiGenerated = await generateExactDishImageAI(dishInfo);
          if (aiGenerated && aiGenerated.imageUrl) {
            saveToPersistentCache(cacheKey, aiGenerated);
            return aiGenerated;
          }
        } catch (aiErr) {
          console.warn(`[imageService] AI generation for "${rawName}" failed:`, aiErr?.message);
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

      // Final fallback (NEVER random unrelated food!)
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
 * React Hook: useExactDishImage(dish, options)
 */
export function useExactDishImage(dishOrName, options = {}) {
  const [loadingPhase, setLoadingPhase] = useState("finding");
  const [retryCount, setRetryCount] = useState(0);

  const [imageState, setImageState] = useState(() => {
    if (!dishOrName) {
      return { imageUrl: null, imageStatus: "unavailable", imageSource: "unavailable", loading: false };
    }

    // Immediate check on object or Database / Dataset Index
    const dbMatch = findInFoodDatabase(dishOrName);
    if (dbMatch && dbMatch.imageUrl) {
      return { ...dbMatch, loading: false, error: null };
    }

    const cacheKey = getStableImageKey(dishOrName);

    if (memoryImageCache.has(cacheKey)) {
      const hit = memoryImageCache.get(cacheKey);
      if (hit?.imageUrl) return { ...hit, loading: false, error: null };
    }

    const pCache = getPersistentCache();
    if (pCache[cacheKey] && pCache[cacheKey].imageUrl) {
      return { ...pCache[cacheKey], loading: false, error: null };
    }

    return {
      imageUrl: typeof dishOrName === "object" ? (dishOrName.imageUrl || dishOrName.image || dishOrName.img) : null,
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

      // Check synchronous match first
      const instantMatch = findInFoodDatabase(dishOrName);
      if (instantMatch && instantMatch.imageUrl) {
        if (isMounted) {
          setImageState({
            imageUrl: instantMatch.imageUrl,
            imageStatus: "verified",
            imageSource: instantMatch.imageSource || "database",
            isAiGenerated: false,
            loading: false,
            error: null
          });
        }
        return;
      }

      if (isMounted) {
        setLoadingPhase("finding");
      }

      const timerGen = setTimeout(() => {
        if (isMounted) setLoadingPhase("generating");
      }, 600);

      const timerSave = setTimeout(() => {
        if (isMounted) setLoadingPhase("saving");
      }, 2200);

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
