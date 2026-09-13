/**
 * TheMealDB Free V1 API Service.
 * Base URL: https://www.themealdb.com/api/json/v1/1/
 * Key: 1 (Free public developer tier)
 *
 * Provides live search, recipe lookup, category/area filtering,
 * random meal discovery, and clean ingredient/step formatting.
 *
 * Includes an in-memory session cache for instant subsequent lookups.
 */

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const DEFAULT_TIMEOUT_MS = 10000;

// In-memory cache to prevent redundant network requests in the same session
const cache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Safe fetch wrapper with timeout
 */
async function fetchMealDb(endpoint, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const url = `${BASE_URL}/${endpoint}`;
  const cached = getCached(url);
  if (cached) {
    return cached;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal
    });

    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`TheMealDB API error: HTTP ${response.status}`);
    }

    const data = await response.json();
    setCached(url, data);
    return data;
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      throw new Error("Request to TheMealDB timed out. Please try again.");
    }
    throw err;
  }
}

/**
 * Extracts and pairs non-empty ingredients and measurements (strIngredient1..20, strMeasure1..20).
 */
export function extractIngredients(rawMeal) {
  if (!rawMeal) return [];
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = rawMeal[`strIngredient${i}`];
    const measure = rawMeal[`strMeasure${i}`];

    const cleanIng = typeof ingredient === "string" ? ingredient.trim() : "";
    const cleanMeas = typeof measure === "string" ? measure.trim() : "";

    // Skip empty or null values
    if (cleanIng && cleanIng.toLowerCase() !== "null" && cleanIng.toLowerCase() !== "undefined") {
      ingredients.push({
        name: cleanIng,
        amount: cleanMeas || "As needed"
      });
    }
  }

  return ingredients;
}

/**
 * Splits cooking instructions into clean structured step items.
 */
export function formatInstructions(rawInstructions) {
  if (!rawInstructions || typeof rawInstructions !== "string") return [];

  // Split by line breaks, numbered steps, or sentences
  const rawSteps = rawInstructions
    .split(/\r\n\r\n|\n\n|\r\n|\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  if (rawSteps.length > 0) {
    return rawSteps.map((step) => step.replace(/^STEP\s*\d+[:.-]?\s*/i, "").replace(/^\d+[\).:-]\s*/, "").trim());
  }

  // Fallback: split on sentence boundaries if single paragraph
  return rawInstructions
    .split(/\.\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));
}

/**
 * Formats a raw TheMealDB response item into a rich, consistent UI model.
 */
export function formatMealDbRecipe(rawMeal) {
  if (!rawMeal) return null;

  const ingredients = extractIngredients(rawMeal);
  const steps = formatInstructions(rawMeal.strInstructions);
  const area = rawMeal.strArea || rawMeal.strCountry || "Global";
  const category = rawMeal.strCategory || "Main Course";

  // Check vegetarian / vegan indicators
  const isVeg =
    category.toLowerCase().includes("vegetarian") ||
    category.toLowerCase().includes("vegan") ||
    rawMeal.strMeal?.toLowerCase().includes("paneer") ||
    rawMeal.strMeal?.toLowerCase().includes("dal") ||
    rawMeal.strMeal?.toLowerCase().includes("dosa") ||
    rawMeal.strMeal?.toLowerCase().includes("idli");

  return {
    id: rawMeal.idMeal,
    idMeal: rawMeal.idMeal,
    title: rawMeal.strMeal,
    strMeal: rawMeal.strMeal,
    category: category,
    strCategory: category,
    area: area,
    strArea: area,
    image: rawMeal.strMealThumb,
    strMealThumb: rawMeal.strMealThumb,
    thumbnail: rawMeal.strMealThumb,
    instructions: rawMeal.strInstructions || "",
    strInstructions: rawMeal.strInstructions || "",
    steps: steps.length > 0 ? steps : ["Follow standard culinary preparation for this recipe."],
    ingredients: ingredients,
    youtubeUrl: rawMeal.strYoutube || "",
    strYoutube: rawMeal.strYoutube || "",
    sourceUrl: rawMeal.strSource || "",
    tags: rawMeal.strTags
      ? rawMeal.strTags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    isVegetarian: isVeg,
    dietType: isVeg ? "Vegetarian" : "Balanced",
    source: "TheMealDB",
    isMealDb: true
  };
}

/**
 * 1. Search meals by name (e.g. Biryani, Pizza, Pasta, Dosa, Ramen, etc.)
 * Endpoint: search.php?s={dishName}
 */
export async function searchMeals(query = "") {
  const cleanQuery = query.trim();
  const endpoint = `search.php?s=${encodeURIComponent(cleanQuery)}`;
  const data = await fetchMealDb(endpoint);

  if (!data?.meals || !Array.isArray(data.meals)) {
    return [];
  }

  return data.meals.map(formatMealDbRecipe).filter(Boolean);
}

/**
 * 2. Get full meal details by ID
 * Endpoint: lookup.php?i={mealId}
 */
export async function getMealById(id) {
  if (!id) return null;
  const endpoint = `lookup.php?i=${encodeURIComponent(id)}`;
  const data = await fetchMealDb(endpoint);

  if (!data?.meals || !data.meals[0]) {
    return null;
  }

  return formatMealDbRecipe(data.meals[0]);
}

/**
 * 3. Filter meals by Area / Cuisine (e.g. Indian, Italian, Chinese, Mexican)
 * Endpoint: filter.php?a={area}
 */
export async function getMealsByArea(area = "Indian") {
  const cleanArea = area.trim();
  let endpoint = `filter.php?a=${encodeURIComponent(cleanArea)}`;
  let data = await fetchMealDb(endpoint);

  // If empty and area is "Indian", fallback to "India" or vice versa
  if ((!data?.meals || data.meals.length === 0) && cleanArea.toLowerCase() === "indian") {
    data = await fetchMealDb("filter.php?a=India");
  } else if ((!data?.meals || data.meals.length === 0) && cleanArea.toLowerCase() === "india") {
    data = await fetchMealDb("filter.php?a=Indian");
  }

  if (!data?.meals || !Array.isArray(data.meals)) {
    return [];
  }

  return data.meals.map((m) => ({
    id: m.idMeal,
    idMeal: m.idMeal,
    title: m.strMeal,
    strMeal: m.strMeal,
    image: m.strMealThumb,
    strMealThumb: m.strMealThumb,
    area: cleanArea,
    strArea: cleanArea,
    category: "Cuisine Special",
    isMealDb: true
  }));
}

/**
 * 4. Filter meals by Category (e.g. Seafood, Chicken, Vegetarian, Pasta, Dessert)
 * Endpoint: filter.php?c={category}
 */
export async function getMealsByCategory(category = "Seafood") {
  const cleanCategory = category.trim();
  const endpoint = `filter.php?c=${encodeURIComponent(cleanCategory)}`;
  const data = await fetchMealDb(endpoint);

  if (!data?.meals || !Array.isArray(data.meals)) {
    return [];
  }

  return data.meals.map((m) => ({
    id: m.idMeal,
    idMeal: m.idMeal,
    title: m.strMeal,
    strMeal: m.strMeal,
    image: m.strMealThumb,
    strMealThumb: m.strMealThumb,
    category: cleanCategory,
    strCategory: cleanCategory,
    area: "Global",
    strArea: "Global",
    isMealDb: true
  }));
}

/**
 * 5. Get all available Categories with thumbnails & descriptions
 * Endpoint: categories.php
 */
export async function getCategories() {
  const endpoint = "categories.php";
  const data = await fetchMealDb(endpoint);

  if (!data?.categories || !Array.isArray(data.categories)) {
    return [];
  }

  return data.categories.map((cat) => ({
    id: cat.idCategory,
    name: cat.strCategory,
    image: cat.strCategoryThumb,
    description: cat.strCategoryDescription
  }));
}

/**
 * 6. Get all available Areas / Countries
 * Endpoint: list.php?a=list
 */
export async function getAreas() {
  const endpoint = "list.php?a=list";
  const data = await fetchMealDb(endpoint);

  if (!data?.meals || !Array.isArray(data.meals)) {
    return [];
  }

  return data.meals
    .map((m) => m.strArea || m.strCountry)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * 7. Get a Random Meal
 * Endpoint: random.php
 */
export async function getRandomMeal() {
  // Bypasses cache by appending timestamp query
  const url = `${BASE_URL}/random.php?_t=${Date.now()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Failed to fetch random meal");
  const data = await res.json();
  if (!data?.meals || !data.meals[0]) return null;
  return formatMealDbRecipe(data.meals[0]);
}
