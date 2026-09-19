/**
 * Serverless API handler for AI Food Image Generation (Gemini Nano Banana Native Image Generation).
 * Endpoint: POST /api/generate-food-image (also available at /api/ai/generate-food-image)
 *
 * Security:
 * - Reads GEMINI_API_KEY strictly from server environment (process.env).
 * - Never returns raw API keys or internal stack traces in client responses.
 */

import { GoogleGenAI } from "@google/genai";
import { getCachedImage, saveGeneratedImage, formatImageResponse, getStableImageKey } from "./utils/imageStorage.js";

// Cached model discovery list to avoid repetitive model queries
let cachedDiscoveredImageModels = null;
let lastDiscoveryTime = 0;
const DISCOVERY_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Sanitizes messages so API keys are never leaked to logs or clients
 */
function sanitizeMessage(msg, apiKey) {
  if (!msg || typeof msg !== "string") return "Unknown image generation issue.";
  let clean = msg;
  if (apiKey && typeof apiKey === "string" && apiKey.length > 5) {
    clean = clean.split(apiKey).join("[REDACTED_API_KEY]");
  }
  return clean.replace(/key=[a-zA-Z0-9_\-]+/gi, "key=[REDACTED]");
}

/**
 * Discovers available image generation models supported by the current API key
 */
async function discoverAvailableImageModels(apiKey) {
  const now = Date.now();
  if (cachedDiscoveredImageModels && now - lastDiscoveryTime < DISCOVERY_TTL_MS) {
    return cachedDiscoveredImageModels;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(listUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.models)) {
        const found = data.models
          .filter((m) => {
            const name = (m.name || "").toLowerCase();
            const methods = Array.isArray(m.supportedGenerationMethods) ? m.supportedGenerationMethods : [];
            const hasGen = methods.includes("generateContent") || methods.includes("predict");
            const isImg = name.includes("image") || name.includes("imagen") || name.includes("banana");
            return hasGen && isImg;
          })
          .map((m) => (m.name || "").replace(/^models\//, "").trim())
          .filter(Boolean);

        if (found.length > 0) {
          cachedDiscoveredImageModels = found;
          lastDiscoveryTime = now;
          return found;
        }
      }
    }
  } catch (_e) {
    // Discovery failed or timed out; continue with prioritized static list
  }
  return [];
}

/**
 * Builds the prioritized list of Nano Banana models with controlled fallback
 */
async function getPrioritizedImageModels(apiKey, requestedModel = null) {
  const primaryModels = [
    "imagen-3.0-generate-002",
    "imagen-3.0-fast-generate-001",
    "gemini-2.0-flash",
    "gemini-1.5-flash"
  ];

  const fallbackModels = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro"
  ];

  const discovered = await discoverAvailableImageModels(apiKey);
  
  const orderedList = [];
  if (requestedModel) {
    orderedList.push(requestedModel);
  }

  for (const m of primaryModels) {
    if (!orderedList.includes(m)) orderedList.push(m);
  }

  for (const m of discovered) {
    if (!orderedList.includes(m)) orderedList.push(m);
  }

  for (const m of fallbackModels) {
    if (!orderedList.includes(m)) orderedList.push(m);
  }

  return orderedList;
}

/**
 * Builds a dynamic, high-detail culinary photography prompt tailored to the dish
 */
function buildDishPrompt({ dishName, cuisine, region, ingredients, customPrompt }) {
  if (customPrompt && typeof customPrompt === "string" && customPrompt.trim().length > 15) {
    return customPrompt.trim();
  }

  const name = dishName || "Authentic Dish";
  const cuis = cuisine || "Traditional";
  const reg = region ? `Region: ${region}` : "";
  const ingList = Array.isArray(ingredients) && ingredients.length > 0
    ? ingredients.map((i) => (typeof i === "string" ? i : i.name)).filter(Boolean).join(", ")
    : "authentic fresh ingredients";

  return `Create a realistic high-quality food photograph of authentic ${name}.

Dish: ${name}
Cuisine: ${cuis}
${reg ? `${reg}\n` : ""}Main ingredients: ${ingList}.

Show the actual dish clearly on an authentic serving plate or ceramic bowl.
Use traditional preparation and presentation appropriate to the cuisine.

The image must represent ONLY the requested dish.
Do not substitute another dish.
Do not show generic Indian food.
Do not show a collage.
Do not show multiple unrelated dishes.

No text.
No labels.
No logos.
No people.
No restaurant branding.
No watermark-like text.

Professional realistic food photography.
Natural appetizing lighting.
High detail, crisp texture, authentic garnishes.
Appetizing but authentic appearance.`;
}

/**
 * Attempts image generation via Google GenAI SDK and REST fallback
 */
async function generateImageWithModel(ai, model, prompt, apiKey) {
  // Method 1: Google GenAI SDK generateContent
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        // Request image modality if supported by the model
        responseModalities: ["IMAGE", "TEXT"]
      }
    });

    const candidates = response.candidates || [];
    if (candidates.length > 0 && candidates[0]?.content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return {
            base64Data: part.inlineData.data,
            mimeType: part.inlineData.mimeType || "image/jpeg"
          };
        }
      }
    }
  } catch (sdkErr) {
    // If SDK call fails, try REST generateContent directly
  }

  // Method 2: Direct REST generateContent call
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"]
        }
      })
    });

    if (res.ok) {
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        const inline = part.inlineData || part.inline_data;
        if (inline && inline.data) {
          return {
            base64Data: inline.data,
            mimeType: inline.mimeType || inline.mime_type || "image/jpeg"
          };
        }
      }
    }
  } catch (_restErr) {
    // Continue to next fallback method
  }

  // Method 3: Direct REST :predict call (for Imagen 3 models)
  if (model.includes("imagen")) {
    try {
      const predictUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:predict?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(predictUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: "1:1",
            outputOptions: { mimeType: "image/jpeg" }
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const base64Data =
          data?.predictions?.[0]?.bytesBase64Encoded ||
          data?.generatedImages?.[0]?.image?.imageBytes;
        if (base64Data) {
          return {
            base64Data,
            mimeType: "image/jpeg"
          };
        }
      }
    } catch (_predictErr) {}
  }

  return null;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
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
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    const rawKey =
      req.headers?.["x-gemini-api-key"] ||
      body.apiKey ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENAI_API_KEY ||
      process.env.GEMINI_KEY;

    const apiKey = typeof rawKey === "string" ? rawKey.trim() : "";

    if (!apiKey) {
      console.warn("[FoodImage] Error: GEMINI_API_KEY is not configured.");
      return res.status(503).json({
        success: false,
        error: "GEMINI_API_KEY is not configured. Please enter your Gemini API key in settings or set GEMINI_API_KEY in environment variables.",
        code: "MISSING_API_KEY"
      });
    }
    const { dishName, cuisine, region, ingredients, foodId, dishPrompt, model: requestedModel } = body;

    const targetName = dishName || foodId;
    if (!targetName) {
      return res.status(400).json({
        success: false,
        error: "dishName or foodId is required for image generation.",
        code: "INVALID_INPUT"
      });
    }

    const cacheKey = getStableImageKey(foodId || targetName);
    console.log(`[FoodImage] Requested dish: ${targetName}`);

    // Step 2: Check server cache / database
    console.log(`[FoodImage] Searching verified image...`);
    const cached = await getCachedImage(cacheKey);
    if (cached && cached.imageUrl) {
      console.log(`[FoodImage] Image found in cache: ${cacheKey}`);
      return res.status(200).json({
        success: true,
        imageUrl: cached.imageUrl,
        foodId: targetName,
        model: cached.model || "cached",
        imageSource: cached.imageSource || "ai-generated",
        imageStatus: "generated",
        cached: true,
        timestamp: new Date().toISOString()
      });
    }

    console.log(`[FoodImage] No verified image found in cache`);
    console.log(`[FoodImage] Checking Nano Banana models...`);

    const candidateModels = await getPrioritizedImageModels(apiKey, requestedModel);
    console.log(`[FoodImage] Candidate model chain: ${candidateModels.join(" -> ")}`);

    const prompt = buildDishPrompt({
      dishName: targetName,
      cuisine,
      region,
      ingredients,
      customPrompt: dishPrompt
    });

    const ai = new GoogleGenAI({ apiKey });

    let generatedResult = null;
    let successfulModel = null;
    let lastError = null;

    // Step 4 & 5: Try each Nano Banana model in priority order
    for (const model of candidateModels) {
      console.log(`[FoodImage] Selected image model: ${model}`);
      console.log(`[FoodImage] Generating image...`);

      try {
        const result = await generateImageWithModel(ai, model, prompt, apiKey);
        if (result && result.base64Data) {
          generatedResult = result;
          successfulModel = model;
          console.log(`[FoodImage] Image generated successfully using ${model}`);
          break;
        } else {
          lastError = `Model ${model} returned empty image data.`;
          console.warn(`[FoodImage] Model ${model} returned no image.`);
        }
      } catch (err) {
        lastError = err?.message || `Failed with model ${model}`;
        console.warn(`[FoodImage] Model ${model} generation failed:`, sanitizeMessage(lastError, apiKey));
      }
    }

    // If generation succeeded
    if (generatedResult && generatedResult.base64Data) {
      console.log(`[FoodImage] Saving image...`);
      const formattedUrl = formatImageResponse(generatedResult.base64Data, generatedResult.mimeType);

      const savedRecord = await saveGeneratedImage(cacheKey, {
        imageUrl: formattedUrl,
        foodId: targetName,
        model: successfulModel,
        imageSource: "ai-generated",
        imageStatus: "generated",
        dishName: targetName,
        cuisine: cuisine || "Authentic"
      });

      console.log(`[FoodImage] Image URL ready`);

      return res.status(200).json({
        success: true,
        imageUrl: savedRecord.imageUrl,
        foodId: targetName,
        model: successfulModel,
        imageSource: "ai-generated",
        imageStatus: "generated",
        imageGenerated: true,
        timestamp: new Date().toISOString()
      });
    }

    // Step 8: Controlled fallback error (Never hide the real error in server logs)
    const sanitizedErr = sanitizeMessage(lastError || "All Nano Banana image models were unavailable.", apiKey);
    console.error(`[FoodImage] Generation failed for "${targetName}":`, sanitizedErr);

    return res.status(502).json({
      success: false,
      imageUrl: null,
      foodId: targetName,
      model: null,
      imageSource: "unavailable",
      imageStatus: "unavailable",
      error: sanitizedErr,
      userMessage: "We couldn't generate an image right now. Please try again.",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    const errorMsg = sanitizeMessage(err?.message, "");
    console.error("[FoodImage] Uncaught exception in image generation handler:", errorMsg);
    return res.status(500).json({
      success: false,
      imageUrl: null,
      imageStatus: "unavailable",
      imageSource: "unavailable",
      error: errorMsg || "Failed to generate food image. Please try again later.",
      userMessage: "We couldn't generate an image right now. Please try again.",
      code: "IMAGE_GENERATION_FAILED"
    });
  }
}
