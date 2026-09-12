import {
  getLocationFoodData,
  getNearestCityFromCoords
} from "../data/locationFoodData";

export const STORAGE_KEYS = {
  PROMPT_DISMISSED: "fhr_location_prompt_dismissed",
  SAVED_LOCATION: "fhr_saved_location",
  PERMISSION_PREF: "fhr_location_permission_pref"
};

export const DEFAULT_LOCATION = {
  latitude: null,
  longitude: null,
  city: "Bengaluru",
  state: "Karnataka",
  country: "India",
  regionName: "Bengaluru, Karnataka",
  label: "Bengaluru, Karnataka",
  isGps: false,
  accuracy: null
};

/**
 * Safely get stored location preference from localStorage
 */
export function getSavedLocationPreference() {
  if (typeof window === "undefined") return DEFAULT_LOCATION;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_LOCATION);
    if (!raw) return DEFAULT_LOCATION;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.city) {
      return {
        ...DEFAULT_LOCATION,
        city: parsed.city,
        state: parsed.state || "Karnataka",
        country: parsed.country || "India",
        regionName: `${parsed.city}, ${parsed.state || "Karnataka"}`,
        label: `${parsed.city}, ${parsed.state || "Karnataka"}`,
        isGps: !!parsed.isGps
      };
    }
  } catch (e) {
    console.warn("Could not parse saved location preference:", e);
  }
  return DEFAULT_LOCATION;
}

/**
 * Safely save location preference (city/state only, no raw coordinates)
 */
export function saveLocationPreference(loc) {
  if (typeof window === "undefined" || !loc) return;
  try {
    localStorage.setItem(
      STORAGE_KEYS.SAVED_LOCATION,
      JSON.stringify({
        city: loc.city || "Bengaluru",
        state: loc.state || "Karnataka",
        country: loc.country || "India",
        isGps: !!loc.isGps
      })
    );
  } catch (e) {
    console.warn("Could not save location preference:", e);
  }
}

/**
 * Check if geolocation is supported in the current environment
 */
export function isGeolocationSupported() {
  return typeof window !== "undefined" && typeof navigator !== "undefined" && "geolocation" in navigator;
}

/**
 * Query Permissions API safely (handles iOS Safari where query({name: 'geolocation'}) throws)
 */
export async function queryGeolocationPermission() {
  if (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    navigator.permissions &&
    typeof navigator.permissions.query === "function"
  ) {
    try {
      const status = await navigator.permissions.query({ name: "geolocation" });
      return status;
    } catch (e) {
      // iOS Safari and some browsers throw or don't support 'geolocation' permission name
      return null;
    }
  }
  return null;
}

/**
 * Reverse geocode coordinates to city/state with graceful fallback
 */
export async function reverseGeocodeCoordinates(lat, lon) {
  if (typeof lat !== "number" || typeof lon !== "number" || isNaN(lat) || isNaN(lon)) {
    return DEFAULT_LOCATION;
  }

  // 1. Try OpenStreetMap Nominatim with a short 3-second timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "en",
          "User-Agent": "FoodieHealthRoutine/2.0"
        },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const address = data.address || {};
      const rawCity = address.city || address.town || address.village || address.suburb || address.state_district || address.county;
      const rawState = address.state || address.region || "Karnataka";
      const rawCountry = address.country || "India";

      if (rawCity) {
        const matched = getLocationFoodData(rawCity, rawState, rawCountry);
        return {
          latitude: lat,
          longitude: lon,
          city: matched.city,
          state: matched.state,
          country: matched.country,
          regionName: `${matched.city}, ${matched.state}`,
          label: `${matched.city}, ${matched.state}`,
          isGps: true
        };
      }
    }
  } catch (err) {
    // Network failure or timeout: fallback to offline distance resolver
  }

  // 2. High-accuracy offline distance resolver
  const nearest = getNearestCityFromCoords(lat, lon);
  return {
    latitude: lat,
    longitude: lon,
    city: nearest.city,
    state: nearest.state,
    country: nearest.country,
    regionName: `${nearest.city}, ${nearest.state}`,
    label: `${nearest.city}, ${nearest.state}`,
    isGps: true
  };
}

/**
 * Execute getCurrentPosition with high accuracy and standard options
 */
export function getCurrentPositionPromise(options = {}) {
  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 300000,
    ...options
  };

  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject({
        code: "UNSUPPORTED",
        type: "unsupported",
        title: "Browser Geolocation Unsupported",
        message: "Your browser does not support geolocation. Please choose your city manually."
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (geoError) => {
        let type = "unknown";
        let title = "Unable to determine your location";
        let message = "We couldn't determine your location. Please choose your location manually or try again.";

        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            type = "denied";
            title = "Location access is blocked";
            message = "Please allow location access for Foodie-Health-Routine in your browser/device settings.";
            break;
          case geoError.POSITION_UNAVAILABLE:
            type = "unavailable";
            title = "We couldn't determine your location";
            message = "Check that Location/GPS is enabled on your device and try again.";
            break;
          case geoError.TIMEOUT:
            type = "timeout";
            title = "Location request timed out";
            message = "The request to detect your location took too long. Please try again or choose your city manually.";
            break;
          default:
            break;
        }

        reject({
          code: geoError.code,
          type,
          title,
          message
        });
      },
      defaultOptions
    );
  });
}
