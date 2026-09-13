/**
 * Serverless API handler for Gemini AI Personalized Food Routine Generation.
 * Endpoint: POST /api/ai/food-plan
 *
 * Capabilities:
 * - Dynamic model auto-discovery: Queries Google's model catalog to discover which
 *   Gemini models the user's specific GEMINI_API_KEY supports.
 * - Multi-model fallback: Seamlessly falls back through candidate models if a model
 *   is not found or restricted.
 * - Security: Reads GEMINI_API_KEY strictly from server environment (process.env).
 *   Never exposes keys in client responses or server logs.
 */

// Helper to sanitize error messages so no API key or token is ever leaked
function sanitizeErrorMessage(msg, key) {
  if (!msg || typeof msg !== "string") return "Unknown Gemini API error.";
  let clean = msg;
  if (key && typeof key === "string" && key.length > 5) {
    clean = clean.split(key).join("[REDACTED_API_KEY]");
  }
  return clean.replace(/key=[a-zA-Z0-9_\-]+/gi, "key=[REDACTED]");
}

/**
 * Dynamically queries Google Generative Language API to discover which models
 * are supported and enabled for this specific API key.
 */
async function discoverSupportedModels(apiKey) {
  try {
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(listUrl, {
      method: "GET",
      headers: { Accept: "application/json" }
    });

    if (!res.ok) {
      console.warn(`[API /api/ai/food-plan] Model list API returned status ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data?.models)) {
      return [];
    }

    // Filter models that support content generation
    const available = data.models
      .filter((m) => {
        const methods = m.supportedGenerationMethods || [];
        return Array.isArray(methods) && methods.includes("generateContent");
      })
      .map((m) => (m.name || "").replace(/^models\//, "").trim())
      .filter(Boolean);

    console.log(`[API /api/ai/food-plan] Discovered ${available.length} models supporting generateContent for this key:`, available.join(", "));
    return available;
  } catch (err) {
    console.warn("[API /api/ai/food-plan] Model discovery query failed:", err?.message);
    return [];
  }
}

/**
 * Rates and sorts candidate models in order of priority (latest & fastest first).
 */
function rankModels(discoveredModels, envModel) {
  const preferredPriority = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-2.5-pro",
    "gemini-2.0-pro",
    "gemini-1.5-pro",
    "gemini-3.8-flash",
    "gemini-3.5-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash-8b",
    "gemini-pro"
  ];

  const candidateSet = new Set();

  // 1. User-configured environment override has highest priority
  if (envModel && typeof envModel === "string" && envModel.trim()) {
    candidateSet.add(envModel.trim().replace(/^models\//, ""));
  }

  // 2. Discovered models that match our priority list
  for (const model of preferredPriority) {
    if (discoveredModels.includes(model)) {
      candidateSet.add(model);
    }
  }

  // 3. Any other discovered models (Flash first, then others)
  for (const model of discoveredModels) {
    if (model.includes("flash") && !candidateSet.has(model)) {
      candidateSet.add(model);
    }
  }
  for (const model of discoveredModels) {
    if (!candidateSet.has(model)) {
      candidateSet.add(model);
    }
  }

  // 4. Fallback priority models in case model discovery was blocked or empty
  for (const model of preferredPriority) {
    candidateSet.add(model);
  }

  return Array.from(candidateSet);
}

/**
 * Attempt to generate content using a specific Gemini model
 */
async function generateWithModel(model, apiKey, prompt) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  
  // Try with structured JSON mode first
  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4
    }
  };

  let response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  // If 400 (some models don't support responseMimeType: application/json), retry without responseMimeType
  if (response.status === 400) {
    const fallbackPayload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.4
      }
    };
    const retryRes = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fallbackPayload)
    });
    if (retryRes.ok) {
      response = retryRes;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const status = response.status;
    const rawMsg = errorData?.error?.message || `HTTP ${status}`;
    const safeMsg = sanitizeErrorMessage(rawMsg, apiKey);

    return {
      success: false,
      status,
      message: safeMsg,
      code: errorData?.error?.status || (status === 401 || status === 403 ? "AUTH_ERROR" : status === 429 ? "RATE_LIMIT" : status === 404 ? "MODEL_NOT_FOUND" : "API_ERROR")
    };
  }

  const geminiResult = await response.json();
  const candidateText = geminiResult?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!candidateText) {
    return {
      success: false,
      status: 500,
      message: `Empty response content returned by model ${model}`,
      code: "EMPTY_RESPONSE"
    };
  }

  let cleanedText = candidateText.trim();
  if (cleanedText.startsWith("```json")) {
    cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  // Handle cases where response has leading/trailing non-json text
  const firstBrace = cleanedText.indexOf("{");
  const lastBrace = cleanedText.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
  }

  const parsedData = JSON.parse(cleanedText);
  if (!parsedData.meals || typeof parsedData.meals !== "object") {
    return {
      success: false,
      status: 500,
      message: "Invalid structure: 'meals' object missing in AI response.",
      code: "INVALID_STRUCTURE"
    };
  }

  return {
    success: true,
    data: parsedData
  };
}

export default async function handler(req, res) {
  // Set CORS headers for safe local / cross-origin requests
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed. Please send a POST request.",
      code: "METHOD_NOT_ALLOWED"
    });
  }

  try {
    // Read server environment variable with multi-alias support
    const rawKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENAI_API_KEY ||
      process.env.GEMINI_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const apiKey = typeof rawKey === "string" ? rawKey.trim() : "";

    // Safe boolean debug logging (Never logs the key)
    console.log(`[API /api/ai/food-plan] GEMINI_API_KEY configured: ${Boolean(apiKey && apiKey.length > 0)}`);

    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: "GEMINI_API_KEY is not detected in server environment. Please ensure GEMINI_API_KEY is configured in your Vercel Project Settings > Environment Variables.",
        code: "MISSING_API_KEY"
      });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    // Sanitize and normalize input values
    const age = Number(body.age) || 26;
    const gender = String(body.gender || "").trim();
    const goal = String(body.goal || "Healthy Eating").trim();
    const diet = String(body.diet || "Vegetarian").trim();
    const activity = String(body.activity || "Moderate").trim();
    const mealsPerDay = Number(body.mealsPerDay) || 5;
    const foodPreferences = Array.isArray(body.foodPreferences)
      ? body.foodPreferences.join(", ")
      : String(body.foodPreferences || "").trim();
    const dislikedFoods = String(body.dislikedFoods || "").trim();
    const allergies = Array.isArray(body.allergies)
      ? body.allergies.join(", ")
      : String(body.allergies || "None").trim();
    const budget = String(body.budget || "Medium").trim();
    const cookingTime = String(body.cookingTime || "Normal").trim();
    const location = String(body.location || "").trim();
    const healthNotes = String(body.healthNotes || "").trim();

    // Construct structured nutritionist prompt
    const prompt = `You are a world-class clinical dietitian, sports nutritionist, and culinary master chef.
Create a highly personalized, practical, scientifically balanced daily food routine for the following user:

USER PROFILE:
- Age: ${age} years old${gender ? `\n- Gender: ${gender}` : ""}
- Primary Health Goal: ${goal}
- Dietary Lifestyle: ${diet}
- Daily Physical Activity Level: ${activity}
- Target Meals per Day: ${mealsPerDay}
- Regional / Cuisine Preferences: ${foodPreferences || "Wholesome balanced cuisine"}
- Disliked Foods (STRICTLY AVOID): ${dislikedFoods || "None specified"}
- Allergies / Intolerances (CRITICAL - ZERO TOLERANCE): ${allergies || "None"}
- Budget Preference: ${budget}
- Available Cooking Time: ${cookingTime}
- User Location / Region: ${location || "General (adaptable)"}
- Specific Health Notes / Medical Conditions: ${healthNotes || "None"}

REQUIREMENTS:
1. Provide a realistic daily food schedule covering:
   - "morning" (Morning hydration / detox elixir)
   - "breakfast" (Nutrient-dense morning meal)
   - "midMorning" (Light energizing snack)
   - "lunch" (Wholesome balanced main meal)
   - "evening" (Healthy snack / beverage)
   - "dinner" (Restorative evening meal)
2. For EVERY meal provide:
   - slotName (e.g. "Power Breakfast", "Morning Elixir", "Energizing Lunch", etc.)
   - time (suggested time string, e.g. "08:30 AM")
   - emoji (appropriate food emoji, e.g. 🌅, 🍳, 🍎, 🍱, ☕, 🌙)
   - dish (appetizing, clear dish name)
   - calories (integer approximate calories)
   - protein (string with grams, e.g. "24g")
   - carbs (string with grams, e.g. "55g")
   - fat (string with grams, e.g. "12g")
   - prepTime (string, e.g. "15 min")
   - ingredients (array of objects: [{"name": "...", "amount": "..."}])
   - preparation (array of step-by-step strings)
   - alternative (a quick healthy substitute dish name)
3. Ensure daily total calories, protein, carbs, and fat realistically match the user's goal (${goal}), age (${age}), and activity level (${activity}).
4. Categorize a practical shopping list (e.g. Produce, Proteins/Dairy, Grains/Pantry, Spices/Seeds).
5. Provide 3 practical tips for prep and hydration.
6. Provide a standard medical safety disclaimer.

Return ONLY a valid JSON object with EXACTLY this structure:
{
  "summary": "Concise 2-sentence summary of how this routine achieves the user's goal",
  "dailyTargets": {
    "calories": 1900,
    "protein": "95g",
    "carbs": "210g",
    "fat": "50g",
    "water": "8-10 glasses (2.5L)"
  },
  "meals": {
    "morning": {
      "slotName": "Morning Elixir",
      "time": "07:00 AM",
      "emoji": "🌅",
      "dish": "Dish Name",
      "calories": 40,
      "protein": "1g",
      "carbs": "6g",
      "fat": "0g",
      "prepTime": "3 min",
      "ingredients": [{"name": "Ingredient", "amount": "Amount"}],
      "preparation": ["Step 1", "Step 2"],
      "alternative": "Alternative Dish"
    },
    "breakfast": {
      "slotName": "Power Breakfast",
      "time": "08:30 AM",
      "emoji": "🍳",
      "dish": "Dish Name",
      "calories": 420,
      "protein": "22g",
      "carbs": "50g",
      "fat": "12g",
      "prepTime": "15 min",
      "ingredients": [{"name": "Ingredient", "amount": "Amount"}],
      "preparation": ["Step 1", "Step 2"],
      "alternative": "Alternative Dish"
    },
    "midMorning": {
      "slotName": "Mid-Morning Snack",
      "time": "11:00 AM",
      "emoji": "🍎",
      "dish": "Dish Name",
      "calories": 130,
      "protein": "3g",
      "carbs": "25g",
      "fat": "2g",
      "prepTime": "5 min",
      "ingredients": [{"name": "Ingredient", "amount": "Amount"}],
      "preparation": ["Step 1"],
      "alternative": "Alternative Dish"
    },
    "lunch": {
      "slotName": "Energizing Lunch",
      "time": "01:30 PM",
      "emoji": "🍱",
      "dish": "Dish Name",
      "calories": 580,
      "protein": "28g",
      "carbs": "75g",
      "fat": "15g",
      "prepTime": "25 min",
      "ingredients": [{"name": "Ingredient", "amount": "Amount"}],
      "preparation": ["Step 1", "Step 2"],
      "alternative": "Alternative Dish"
    },
    "evening": {
      "slotName": "Evening Refresh",
      "time": "05:00 PM",
      "emoji": "☕",
      "dish": "Dish Name",
      "calories": 160,
      "protein": "5g",
      "carbs": "22g",
      "fat": "4g",
      "prepTime": "5 min",
      "ingredients": [{"name": "Ingredient", "amount": "Amount"}],
      "preparation": ["Step 1"],
      "alternative": "Alternative Dish"
    },
    "dinner": {
      "slotName": "Light Restorative Dinner",
      "time": "08:00 PM",
      "emoji": "🌙",
      "dish": "Dish Name",
      "calories": 480,
      "protein": "28g",
      "carbs": "35g",
      "fat": "16g",
      "prepTime": "20 min",
      "ingredients": [{"name": "Ingredient", "amount": "Amount"}],
      "preparation": ["Step 1", "Step 2"],
      "alternative": "Alternative Dish"
    }
  },
  "shoppingList": [
    { "category": "Fresh Produce", "items": ["Item 1", "Item 2"] },
    { "category": "Proteins & Dairy", "items": ["Item 1", "Item 2"] },
    { "category": "Grains & Pantry", "items": ["Item 1", "Item 2"] },
    { "category": "Spices & Essentials", "items": ["Item 1", "Item 2"] }
  ],
  "tips": [
    "Tip 1 for meal prep",
    "Tip 2 for hydration and satiety",
    "Tip 3 for consistent digestion"
  ],
  "medicalDisclaimer": "This information is for general educational purposes and is not a substitute for advice from a qualified healthcare professional. If you have a medical condition, severe allergies, or specific dietary restrictions, consult a doctor or registered dietitian before making significant dietary changes."
}`;

    // Step 1: Discover which models are supported by the user's API key
    const discovered = await discoverSupportedModels(apiKey);

    // Step 2: Build prioritized candidate models list
    const candidateModels = rankModels(discovered, process.env.GEMINI_MODEL);
    console.log(`[API /api/ai/food-plan] Model candidate priority list:`, candidateModels.slice(0, 5).join(", "));

    let successfulPlan = null;
    let successfulModel = null;
    let lastError = null;

    // Step 3: Iterate through candidate models until success
    for (const model of candidateModels) {
      console.log(`[API /api/ai/food-plan] Attempting routine generation with model: ${model}...`);
      const result = await generateWithModel(model, apiKey, prompt);

      if (result.success) {
        successfulPlan = result.data;
        successfulModel = model;
        console.log(`[API /api/ai/food-plan] Successfully generated routine with model: ${model}`);
        break;
      }

      lastError = { ...result, model };
      console.warn(`[API /api/ai/food-plan] Model ${model} failed (${result.status || result.code}): ${result.message}`);

      // Stop immediately on critical Auth error (wrong API key)
      if (result.status === 401 || result.status === 403) {
        break;
      }
    }

    if (successfulPlan) {
      return res.status(200).json({
        success: true,
        data: successfulPlan,
        model: successfulModel,
        timestamp: new Date().toISOString()
      });
    }

    // Return detailed diagnostic error if all models fail
    const statusCode = lastError?.status && lastError.status >= 400 && lastError.status < 600 ? lastError.status : 500;
    
    let userFriendlyError = "Unable to generate your food routine right now.";
    if (statusCode === 401 || statusCode === 403) {
      userFriendlyError = "Gemini API key verification failed. Please check the GEMINI_API_KEY in your Vercel settings.";
    } else if (statusCode === 429) {
      userFriendlyError = "Gemini AI rate limit reached. Please wait a few seconds and try again.";
    } else if (statusCode === 404) {
      userFriendlyError = `None of the available Gemini models were accessible with this API key. Attempted: ${candidateModels.slice(0, 3).join(", ")}.`;
    } else if (lastError?.message) {
      userFriendlyError = `Gemini AI error (${lastError.code || statusCode}): ${lastError.message}`;
    }

    return res.status(statusCode).json({
      success: false,
      error: userFriendlyError,
      status: statusCode,
      code: lastError?.code || "AI_GENERATION_FAILED",
      attemptedModels: candidateModels.slice(0, 5),
      lastError: lastError?.message || "Unknown error"
    });
  } catch (error) {
    console.error("[API /api/ai/food-plan] Uncaught exception:", error?.message);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while generating your food routine. Please try again or create a manual plan.",
      status: 500,
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
