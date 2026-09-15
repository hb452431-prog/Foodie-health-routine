/**
 * Image Storage and In-Memory Cache Abstraction for Food Images.
 *
 * Provides a clean layer to store and retrieve AI-generated and verified food images.
 * Designed for serverless environments (Vercel) and local development.
 */

// In-memory runtime cache for serverless execution lifecycle
const serverMemoryCache = new Map();

/**
 * Normalizes dish identifiers into a stable persistent key
 * Format: food-image-{normalizedId}
 */
export function getStableImageKey(foodIdOrName) {
  if (!foodIdOrName || typeof foodIdOrName !== "string") {
    return "food-image-unknown";
  }
  const clean = foodIdOrName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `food-image-${clean || "default"}`;
}

/**
 * Validates and converts image data into a clean data URL or storage URL
 */
export function formatImageResponse(base64Data, mimeType = "image/jpeg") {
  if (!base64Data) return null;
  if (base64Data.startsWith("http://") || base64Data.startsWith("https://") || base64Data.startsWith("data:")) {
    return base64Data;
  }
  const cleanMime = mimeType.toLowerCase().includes("png") ? "image/png" : "image/jpeg";
  return `data:${cleanMime};base64,${base64Data.trim()}`;
}

/**
 * Checks if an image exists in server cache
 */
export async function getCachedImage(key) {
  if (!key) return null;
  const stableKey = getStableImageKey(key);
  if (serverMemoryCache.has(stableKey)) {
    return serverMemoryCache.get(stableKey);
  }
  return null;
}

/**
 * Saves generated image to storage abstraction
 */
export async function saveGeneratedImage(key, imageRecord) {
  if (!key || !imageRecord) return imageRecord;
  const stableKey = getStableImageKey(key);
  const record = {
    ...imageRecord,
    storageKey: stableKey,
    savedAt: new Date().toISOString()
  };
  serverMemoryCache.set(stableKey, record);
  return record;
}
