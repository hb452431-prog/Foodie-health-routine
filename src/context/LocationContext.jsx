import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getLocationFoodData,
  getNearestCityFromCoords,
  normalizeLocationQuery
} from "../data/locationFoodData";

const LocationContext = createContext(null);

const STORAGE_KEYS = {
  PROMPT_DISMISSED: "fhr_location_prompt_dismissed",
  SAVED_LOCATION: "fhr_saved_location",
  PERMISSION_PREF: "fhr_location_permission_pref"
};

export function LocationProvider({ children }) {
  // Permission state: 'prompt' | 'granted' | 'denied' | 'unsupported'
  const [permissionState, setPermissionState] = useState("prompt");

  // Detection status: 'idle' | 'loading' | 'success' | 'error'
  const [locationStatus, setLocationStatus] = useState("idle");

  // Location Data Object (Zero permanent storage of raw GPS lat/lon)
  const [locationData, setLocationData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_LOCATION);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.city) {
          return {
            city: parsed.city,
            state: parsed.state || "Karnataka",
            country: parsed.country || "India",
            regionName: `${parsed.city}, ${parsed.state || "Karnataka"}`,
            isGps: !!parsed.isGps,
            label: `${parsed.city}, ${parsed.state || "Karnataka"}`
          };
        }
      }
    } catch (e) {
      console.warn("Error reading saved location:", e);
    }
    // Default initial location: Bengaluru, Karnataka
    return {
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      regionName: "Bengaluru, Karnataka",
      isGps: false,
      label: "Bengaluru, Karnataka"
    };
  });

  // Detailed error description for friendly UI rendering
  const [error, setError] = useState(null);

  // Modals visibility state
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);

  // Reverse geocoding helper with graceful fallback
  const reverseGeocode = async (lat, lon) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

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
          const matchedFoodData = getLocationFoodData(rawCity, rawState, rawCountry);
          return {
            city: matchedFoodData.city,
            state: matchedFoodData.state,
            country: matchedFoodData.country,
            regionName: `${matchedFoodData.city}, ${matchedFoodData.state}`,
            isGps: true,
            label: `${matchedFoodData.city}, ${matchedFoodData.state}`
          };
        }
      }
    } catch (err) {
      console.log("Online reverse geocoder unavailable, using coordinate distance resolver:", err);
    }

    // High-accuracy offline distance resolver matching nearest known Indian/Global city
    const nearest = getNearestCityFromCoords(lat, lon);
    return {
      city: nearest.city,
      state: nearest.state,
      country: nearest.country,
      regionName: `${nearest.city}, ${nearest.state}`,
      isGps: true,
      label: `${nearest.city}, ${nearest.state}`
    };
  };

  // Execute real browser geolocation request
  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setPermissionState("unsupported");
      setLocationStatus("error");
      setError({
        type: "unsupported",
        title: "Browser Geolocation Unsupported",
        message: "Your current browser does not support standard geolocation services. You can select your location manually."
      });
      return;
    }

    setLocationStatus("loading");
    setError(null);

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          setPermissionState("granted");
          localStorage.setItem(STORAGE_KEYS.PERMISSION_PREF, "granted");

          const resolved = await reverseGeocode(latitude, longitude);
          setLocationData({
            ...resolved,
            accuracy: Math.round(accuracy || 0)
          });
          setLocationStatus("success");
          setIsPermissionModalOpen(false);

          // Save approximate label (strictly no exact lat/lon permanently stored)
          localStorage.setItem(
            STORAGE_KEYS.SAVED_LOCATION,
            JSON.stringify({
              city: resolved.city,
              state: resolved.state,
              country: resolved.country,
              isGps: true
            })
          );
        } catch (err) {
          setLocationStatus("success"); // Still graceful fallback
          setIsPermissionModalOpen(false);
        }
      },
      (geoError) => {
        let errorType = "unknown";
        let errorTitle = "Location Detection Error";
        let errorMessage = "Unable to determine your current location. Please choose your city manually.";

        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            errorType = "denied";
            errorTitle = "Location Access Blocked";
            errorMessage = "Location permission is currently blocked for this website. Please enable location access in your browser or site settings and try again.";
            setPermissionState("denied");
            localStorage.setItem(STORAGE_KEYS.PERMISSION_PREF, "denied");
            break;
          case geoError.POSITION_UNAVAILABLE:
            errorType = "unavailable";
            errorTitle = "GPS Signal Unavailable";
            errorMessage = "Your device's location network is currently unavailable. Please verify your connection or select your city manually.";
            break;
          case geoError.TIMEOUT:
            errorType = "timeout";
            errorTitle = "Location Request Timed Out";
            errorMessage = "The request to detect your location took too long. Please try again or pick your city manually.";
            break;
          default:
            break;
        }

        setLocationStatus("error");
        setError({
          type: errorType,
          title: errorTitle,
          message: errorMessage
        });
      },
      geoOptions
    );
  }, []);

  // Manual location selection
  const setManualLocation = useCallback((cityInput, stateInput = "Karnataka", countryInput = "India") => {
    const matched = getLocationFoodData(cityInput, stateInput, countryInput);
    const newLocation = {
      city: matched.city,
      state: matched.state,
      country: matched.country,
      regionName: `${matched.city}, ${matched.state}`,
      isGps: false,
      label: `${matched.city}, ${matched.state}`
    };

    setLocationData(newLocation);
    setLocationStatus("success");
    setError(null);
    setIsManualModalOpen(false);
    setIsPermissionModalOpen(false);

    try {
      localStorage.setItem(
        STORAGE_KEYS.SAVED_LOCATION,
        JSON.stringify({
          city: matched.city,
          state: matched.state,
          country: matched.country,
          isGps: false
        })
      );
    } catch (e) {
      console.warn("Could not save manual location:", e);
    }
  }, []);

  // Dismiss permission modal ("Not Now")
  const dismissPermissionPrompt = useCallback(() => {
    setIsPermissionModalOpen(false);
    try {
      localStorage.setItem(STORAGE_KEYS.PROMPT_DISMISSED, "true");
    } catch (e) {
      console.warn("Could not set prompt dismissed flag:", e);
    }
  }, []);

  // Initial startup permission check
  useEffect(() => {
    let permissionStatusObj = null;

    const checkPermissions = async () => {
      if (navigator.permissions && navigator.permissions.query) {
        try {
          permissionStatusObj = await navigator.permissions.query({ name: "geolocation" });
          setPermissionState(permissionStatusObj.state);

          if (permissionStatusObj.state === "granted") {
            // Automatically retrieve location silently without showing modal
            requestLocation();
          } else if (permissionStatusObj.state === "prompt") {
            const wasDismissed = localStorage.getItem(STORAGE_KEYS.PROMPT_DISMISSED) === "true";
            if (!wasDismissed) {
              // Delay slightly for smooth page load experience
              const timer = setTimeout(() => {
                setIsPermissionModalOpen(true);
              }, 1200);
              return () => clearTimeout(timer);
            }
          } else if (permissionStatusObj.state === "denied") {
            setPermissionState("denied");
          }

          // Listen to dynamic browser permissions changes
          permissionStatusObj.onchange = () => {
            setPermissionState(permissionStatusObj.state);
            if (permissionStatusObj.state === "granted") {
              requestLocation();
            }
          };
        } catch (e) {
          // Permissions API fallback
          const wasDismissed = localStorage.getItem(STORAGE_KEYS.PROMPT_DISMISSED) === "true";
          if (!wasDismissed) {
            setIsPermissionModalOpen(true);
          }
        }
      } else {
        const wasDismissed = localStorage.getItem(STORAGE_KEYS.PROMPT_DISMISSED) === "true";
        if (!wasDismissed) {
          setIsPermissionModalOpen(true);
        }
      }
    };

    checkPermissions();

    return () => {
      if (permissionStatusObj) {
        permissionStatusObj.onchange = null;
      }
    };
  }, [requestLocation]);

  // Current active city food dataset
  const currentCityFoodData = getLocationFoodData(locationData.city, locationData.state, locationData.country);

  return (
    <LocationContext.Provider
      value={{
        permissionState,
        locationStatus,
        locationData,
        currentCityFoodData,
        error,
        isPermissionModalOpen,
        setIsPermissionModalOpen,
        isManualModalOpen,
        setIsManualModalOpen,
        isLocationPanelOpen,
        setIsLocationPanelOpen,
        requestLocation,
        setManualLocation,
        dismissPermissionPrompt
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
