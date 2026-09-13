/**
 * Serverless API handler for Gemini AI Personalized Food Routine Generation.
 * Endpoint: POST /api/ai/food-plan
 *
 * Security:
 * - Reads GEMINI_API_KEY strictly from server-side environment (process.env).
 * - Never returns the API key or raw server stack traces to the client.
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

    // Active Gemini production model
    const activeModel = process.env.GEMINI_MODEL || "gemini-3.8-flash";

    let lastError = null;
    let successfulPlan = null;

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const geminiPayload = {
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

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(geminiPayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;
        const rawMsg = errorData?.error?.message || `HTTP ${status}`;
        const safeMsg = sanitizeErrorMessage(rawMsg, apiKey);

        console.error(`[API /api/ai/food-plan] Model ${activeModel} returned error: ${status} - ${safeMsg}`);

        lastError = {
          status,
          message: safeMsg,
          model: activeModel,
          code: errorData?.error?.status || (status === 401 || status === 403 ? "AUTH_ERROR" : status === 429 ? "RATE_LIMIT" : "API_ERROR")
        };
      } else {
        const geminiResult = await response.json();
        const candidateText = geminiResult?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!candidateText) {
          throw new Error(`Empty response content returned by model ${activeModel}`);
        }

        let cleanedText = candidateText.trim();
        if (cleanedText.startsWith("```json")) {
          cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        } else if (cleanedText.startsWith("```")) {
          cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "");
        }

        const parsedData = JSON.parse(cleanedText);
        if (!parsedData.meals || typeof parsedData.meals !== "object") {
          throw new Error("Invalid structure: 'meals' object missing in AI response.");
        }

        successfulPlan = parsedData;
      }
    } catch (err) {
      lastError = {
        status: 500,
        message: sanitizeErrorMessage(err?.message, apiKey),
        model: activeModel,
        code: "PARSING_ERROR"
      };
    }

    if (successfulPlan) {
      return res.status(200).json({
        success: true,
        data: successfulPlan,
        model: activeModel,
        timestamp: new Date().toISOString()
      });
    }

    // Return specific diagnostic error
    const statusCode = lastError?.status && lastError.status >= 400 && lastError.status < 600 ? lastError.status : 500;
    
    let userFriendlyError = "Unable to generate your food routine right now.";
    if (statusCode === 401 || statusCode === 403) {
      userFriendlyError = "Gemini API key verification failed. Please check the GEMINI_API_KEY in your Vercel settings.";
    } else if (statusCode === 429) {
      userFriendlyError = "Gemini AI rate limit reached. Please wait a few seconds and try again.";
    } else if (statusCode === 404) {
      userFriendlyError = `Requested Gemini model (${lastError?.model || activeModel}) was not found for this API key.`;
    } else if (lastError?.message) {
      userFriendlyError = `Gemini AI error (${lastError.code || statusCode}): ${lastError.message}`;
    }

    return res.status(statusCode).json({
      success: false,
      error: userFriendlyError,
      status: statusCode,
      code: lastError?.code || "AI_GENERATION_FAILED",
      model: activeModel,
      details: lastError?.message || "Unknown error"
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
