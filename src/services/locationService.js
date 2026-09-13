import {
  getLocationFoodData,
  getNearestCityFromCoords
} from "../data/locationFoodData";
import { getStoredItem, setStoredItem } from "../utils/storage";

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
  area: "",
  pincode: "",
  regionName: "Bengaluru, Karnataka",
  label: "Bengaluru, Karnataka",
  isGps: false,
  accuracy: null
};

/**
 * Safely get stored location preference from safe storage
 */
export function getSavedLocationPreference() {
  try {
    const parsed = getStoredItem(STORAGE_KEYS.SAVED_LOCATION, null);
    if (parsed && parsed.city) {
      const city = parsed.city;
      const state = parsed.state || "Karnataka";
      const country = parsed.country || "India";
      const area = parsed.area || "";
      const pincode = parsed.pincode || "";
      const displayLabel = area ? `${area}, ${city}` : `${city}, ${state}`;

      return {
        ...DEFAULT_LOCATION,
        city,
        state,
        country,
        area,
        pincode,
        latitude: parsed.latitude || null,
        longitude: parsed.longitude || null,
        regionName: `${city}, ${state}`,
        label: displayLabel,
        isGps: !!parsed.isGps
      };
    }
  } catch (e) {
    console.warn("Could not parse saved location preference:", e);
  }
  return DEFAULT_LOCATION;
}

/**
 * Safely save location preference to safe storage (non-sensitive city/state/area/coords)
 */
export function saveLocationPreference(loc) {
  if (!loc) return;
  try {
    setStoredItem(STORAGE_KEYS.SAVED_LOCATION, {
      city: loc.city || "Bengaluru",
      state: loc.state || "Karnataka",
      country: loc.country || "India",
      area: loc.area || "",
      pincode: loc.pincode || "",
      latitude: loc.latitude || null,
      longitude: loc.longitude || null,
      isGps: !!loc.isGps
    });
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
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=12&addressdetails=1`,
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
      const rawSuburb = address.suburb || address.neighbourhood || address.residential || "";
      const rawPostcode = address.postcode || "";

      if (rawCity) {
        const matched = getLocationFoodData(rawCity, rawState, rawCountry);
        return {
          latitude: lat,
          longitude: lon,
          city: matched.city,
          state: matched.state,
          country: matched.country,
          area: rawSuburb,
          pincode: rawPostcode,
          regionName: `${matched.city}, ${matched.state}`,
          label: rawSuburb ? `${rawSuburb}, ${matched.city}` : `${matched.city}, ${matched.state}`,
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
    area: "",
    pincode: "",
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
    timeout: 12000,
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
        let type = "unavailable";
        let title = "Unable to detect your location";
        let message = "We couldn't determine your location. Please choose your location manually or try again.";
        let instructions = "";

        switch (geoError.code) {
          case geoError.PERMISSION_DENIED: // Code 1
            type = "denied";
            title = "Location Permission Denied";
            message = "Location permission is currently blocked for this website in your browser settings. To discover nearby recommendations, please allow location access in your browser settings or choose your city manually.";
            instructions = "Tap the padlock or site settings icon 🔒 in your browser address bar → Permissions → Allow Location, then tap Try Again.";
            break;

          case geoError.POSITION_UNAVAILABLE: // Code 2: Device GPS is OFF or cell tower signal unavailable
            type = "gps_off";
            title = "Turn On Location";
            message = "Location is currently turned off on your device. Turn on Location services to discover nearby restaurants, food recommendations and location-based features.";
            instructions = "Please turn on Location services in your device/browser settings, then return to this website and tap Retry.";
            break;

          case geoError.TIMEOUT: // Code 3
            type = "timeout";
            title = "Location request timed out";
            message = "The request to detect your location took too long. Please ensure your GPS has a signal and try again, or enter your location manually.";
            instructions = "Check that you have a stable connection and tap Retry.";
            break;

          default:
            type = "unavailable";
            title = "Unable to detect your location";
            message = "We couldn't determine your location. Please check your network or GPS connection and try again.";
            break;
        }

        reject({
          code: geoError.code,
          type,
          title,
          message,
          instructions
        });
      },
      defaultOptions
    );
  });
}

