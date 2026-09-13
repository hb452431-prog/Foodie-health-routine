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
import { getStoredItem, setStoredItem } from "../utils/storage";

export const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  // Permission state: 'unknown' | 'prompt' | 'granted' | 'denied' | 'unsupported'
  const [permissionState, setPermissionState] = useState("unknown");

  // Loading state: boolean
  const [loading, setLoading] = useState(false);

  // Active Location Data
  const [locationData, setLocationData] = useState(() => getSavedLocationPreference());

  // Error state: null | { code, type, title, message, instructions }
  const [error, setError] = useState(null);

  // Modals visibility state
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);

  // Flag indicating if location is currently enabled/active
  const isLocationEnabled = Boolean(
    locationData?.isGps ? (permissionState === "granted" && !error) : true
  );

  // Lock to prevent duplicate concurrent geolocation requests
  const isRequestingRef = useRef(false);

  // User-Triggered or System Geolocation Request
  const requestLocation = useCallback(async (options = {}) => {
    if (isRequestingRef.current) return { success: false, inProgress: true };
    isRequestingRef.current = true;

    setLoading(true);
    setError(null);

    try {
      const position = await getCurrentPositionPromise(options);
      const { latitude, longitude, accuracy } = position.coords;

      setPermissionState("granted");
      try {
        setStoredItem(STORAGE_KEYS.PERMISSION_PREF, "granted");
      } catch (e) {}

      const resolved = await reverseGeocodeCoordinates(latitude, longitude);
      const updatedLocation = {
        ...resolved,
        accuracy: Math.round(accuracy || 0),
        isGps: true
      };

      setLocationData(updatedLocation);
      saveLocationPreference(updatedLocation);
      setError(null);
      setLoading(false);
      setIsPermissionModalOpen(false);
      return { success: true, location: updatedLocation };
    } catch (err) {
      setLoading(false);
      if (err.type === "denied") {
        setPermissionState("denied");
        try {
          setStoredItem(STORAGE_KEYS.PERMISSION_PREF, "denied");
        } catch (e) {}
      }
      setError(err);
      if (options.showModalOnError !== false) {
        setIsPermissionModalOpen(true);
      }
      return { success: false, error: err };
    } finally {
      isRequestingRef.current = false;
    }
  }, []);

  // Dedicated Retry Location function
  const retryLocation = useCallback(async () => {
    return await requestLocation({ enableHighAccuracy: true });
  }, [requestLocation]);

  // Manual Location Selection (supports City, State, Country, Area, Pincode)
  const setManualLocation = useCallback((cityInput, stateInput = "Karnataka", countryInput = "India", areaInput = "", pincodeInput = "") => {
    const matched = getLocationFoodData(cityInput, stateInput, countryInput);
    const displayLabel = areaInput ? `${areaInput}, ${matched.city}` : `${matched.city}, ${matched.state}`;

    const newLocation = {
      latitude: null,
      longitude: null,
      city: matched.city,
      state: matched.state,
      country: matched.country,
      area: areaInput || "",
      pincode: pincodeInput || "",
      regionName: `${matched.city}, ${matched.state}`,
      label: displayLabel,
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
      setStoredItem(STORAGE_KEYS.PROMPT_DISMISSED, "true");
    } catch (e) {
      console.warn("Could not set prompt dismissed flag:", e);
    }
  }, []);


  // Safe, non-blocking initialization on initial app load
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

          // If permission is already granted, verify position quietly without opening error popups automatically
          if (permStatus.state === "granted") {
            try {
              const position = await getCurrentPositionPromise({ timeout: 6000, maximumAge: 600000 });
              if (isMounted && position?.coords) {
                const { latitude, longitude, accuracy } = position.coords;
                const resolved = await reverseGeocodeCoordinates(latitude, longitude);
                const updated = {
                  ...resolved,
                  accuracy: Math.round(accuracy || 0),
                  isGps: true
                };
                setLocationData(updated);
                saveLocationPreference(updated);
                setError(null);
              }
            } catch (posErr) {
              if (isMounted) {
                // If GPS is off on device, record state without crashing or blocking page
                if (posErr.type === "gps_off") {
                  setError(posErr);
                }
              }
            }
          }

          permStatus.onchange = () => {
            if (isMounted) {
              setPermissionState(permStatus.state);
              if (permStatus.state === "granted") {
                requestLocation({ showModalOnError: false });
              }
            }
          };
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
  }, [requestLocation]);

  // Current active city food dataset
  const currentCityFoodData = getLocationFoodData(
    locationData?.city || "Bengaluru",
    locationData?.state || "Karnataka",
    locationData?.country || "India"
  );

  const contextValue = {
    // Permission & Status
    permissionState,
    permissionStatus: permissionState,
    loading,
    locationStatus: loading ? "loading" : error ? "error" : "success",
    locationEnabled: isLocationEnabled,

    // Location Data
    location: locationData || DEFAULT_LOCATION,
    locationData: locationData || DEFAULT_LOCATION,
    currentCityFoodData,
    error,

    // Modal Visibility & Toggles
    isPermissionModalOpen,
    setIsPermissionModalOpen,
    isManualModalOpen,
    setIsManualModalOpen,
    isLocationPanelOpen,
    setIsLocationPanelOpen,

    // Actions
    requestLocation,
    retryLocation,
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
      permissionStatus: "unknown",
      loading: false,
      locationStatus: "idle",
      locationEnabled: true,
      location: DEFAULT_LOCATION,
      locationData: DEFAULT_LOCATION,
      currentCityFoodData: getLocationFoodData("Bengaluru", "Karnataka", "India"),
      error: null,
      isPermissionModalOpen: false,
      setIsPermissionModalOpen: () => {},
      isManualModalOpen: false,
      setIsManualModalOpen: () => {},
      isLocationPanelOpen: false,
      setIsLocationPanelOpen: () => {},
      requestLocation: async () => ({ success: false }),
      retryLocation: async () => ({ success: false }),
      setManualLocation: () => {},
      dismissPermissionPrompt: () => {}
    };
  }
  return context;
}

