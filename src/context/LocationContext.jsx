import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import {
  getSavedLocationPreference,
  saveLocationPreference,
  reverseGeocodeCoordinates,
  getCurrentPositionPromise,
  queryGeolocationPermission,
  DEFAULT_LOCATION,
  STORAGE_KEYS
} from "../services/locationService";
import { getLocationFoodData } from "../data/locationFoodData";

export const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  // Permission state: 'unknown' | 'prompt' | 'granted' | 'denied' | 'unsupported'
  const [permissionState, setPermissionState] = useState("unknown");

  // Loading state: boolean
  const [loading, setLoading] = useState(false);

  // Active Location Data
  const [locationData, setLocationData] = useState(() => getSavedLocationPreference());

  // Error state: null | { code, type, title, message }
  const [error, setError] = useState(null);

  // Modals visibility state
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);

  // Lock to prevent duplicate concurrent geolocation requests
  const isRequestingRef = useRef(false);

  // User-Triggered Geolocation Request
  const requestLocation = useCallback(async () => {
    if (isRequestingRef.current) return;
    isRequestingRef.current = true;

    setLoading(true);
    setError(null);

    try {
      const position = await getCurrentPositionPromise();
      const { latitude, longitude, accuracy } = position.coords;

      setPermissionState("granted");
      try {
        localStorage.setItem(STORAGE_KEYS.PERMISSION_PREF, "granted");
      } catch (e) {}

      const resolved = await reverseGeocodeCoordinates(latitude, longitude);
      const updatedLocation = {
        ...resolved,
        accuracy: Math.round(accuracy || 0)
      };

      setLocationData(updatedLocation);
      saveLocationPreference(updatedLocation);
      setLoading(false);
      setIsPermissionModalOpen(false);
    } catch (err) {
      setLoading(false);
      if (err.type === "denied") {
        setPermissionState("denied");
        try {
          localStorage.setItem(STORAGE_KEYS.PERMISSION_PREF, "denied");
        } catch (e) {}
      }
      setError(err);
    } finally {
      isRequestingRef.current = false;
    }
  }, []);

  // Manual Location Selection
  const setManualLocation = useCallback((cityInput, stateInput = "Karnataka", countryInput = "India") => {
    const matched = getLocationFoodData(cityInput, stateInput, countryInput);
    const newLocation = {
      latitude: null,
      longitude: null,
      city: matched.city,
      state: matched.state,
      country: matched.country,
      regionName: `${matched.city}, ${matched.state}`,
      label: `${matched.city}, ${matched.state}`,
      isGps: false,
      accuracy: null
    };

    setLocationData(newLocation);
    saveLocationPreference(newLocation);
    setError(null);
    setIsManualModalOpen(false);
    setIsPermissionModalOpen(false);
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

  // Non-blocking initialization on mount
  useEffect(() => {
    let isMounted = true;
    let permObj = null;

    const initLocationStatus = async () => {
      try {
        const permStatus = await queryGeolocationPermission();
        if (!isMounted) return;

        if (permStatus) {
          permObj = permStatus;
          setPermissionState(permStatus.state);

          if (permStatus.state === "prompt") {
            const dismissed = localStorage.getItem(STORAGE_KEYS.PROMPT_DISMISSED) === "true";
            if (!dismissed) {
              const timer = setTimeout(() => {
                if (isMounted) setIsPermissionModalOpen(true);
              }, 1500);
              return () => clearTimeout(timer);
            }
          } else if (permStatus.state === "denied") {
            setPermissionState("denied");
          }

          permStatus.onchange = () => {
            if (isMounted) {
              setPermissionState(permStatus.state);
            }
          };
        } else {
          // Permissions API unsupported (e.g. iOS Safari) -> check if prompt dismissed
          const dismissed = localStorage.getItem(STORAGE_KEYS.PROMPT_DISMISSED) === "true";
          if (!dismissed) {
            const timer = setTimeout(() => {
              if (isMounted) setIsPermissionModalOpen(true);
            }, 1500);
            return () => clearTimeout(timer);
          }
        }
      } catch (e) {
        // Fail-safe: app continues normally
        console.warn("Location initialization check completed with fallback:", e);
      }
    };

    initLocationStatus();

    return () => {
      isMounted = false;
      if (permObj) {
        permObj.onchange = null;
      }
    };
  }, []);

  // Current active city food dataset
  const currentCityFoodData = getLocationFoodData(
    locationData?.city || "Bengaluru",
    locationData?.state || "Karnataka",
    locationData?.country || "India"
  );

  const contextValue = {
    permissionState,
    loading,
    locationStatus: loading ? "loading" : error ? "error" : "success",
    locationData: locationData || DEFAULT_LOCATION,
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
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}

/**
 * Custom hook for using location safely across any component.
 * Guaranteed NEVER to crash if used outside provider.
 */
export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    // Safe fallback object if rendered outside LocationProvider
    return {
      permissionState: "unknown",
      loading: false,
      locationStatus: "idle",
      locationData: DEFAULT_LOCATION,
      currentCityFoodData: getLocationFoodData("Bengaluru", "Karnataka", "India"),
      error: null,
      isPermissionModalOpen: false,
      setIsPermissionModalOpen: () => {},
      isManualModalOpen: false,
      setIsManualModalOpen: () => {},
      isLocationPanelOpen: false,
      setIsLocationPanelOpen: () => {},
      requestLocation: async () => {},
      setManualLocation: () => {},
      dismissPermissionPrompt: () => {}
    };
  }
  return context;
}
