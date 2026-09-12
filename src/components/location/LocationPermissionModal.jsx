import React, { useEffect } from "react";
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  Compass,
  AlertCircle,
  RefreshCw,
  SlidersHorizontal
} from "lucide-react";
import { useLocation } from "../../context/LocationContext";

export default function LocationPermissionModal() {
  const {
    isPermissionModalOpen,
    permissionState,
    locationStatus,
    error,
    requestLocation,
    dismissPermissionPrompt,
    setIsManualModalOpen
  } = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isPermissionModalOpen && locationStatus !== "loading") {
        dismissPermissionPrompt();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPermissionModalOpen, locationStatus, dismissPermissionPrompt]);

  if (!isPermissionModalOpen) return null;

  const handleOpenManual = () => {
    dismissPermissionPrompt();
    setIsManualModalOpen(true);
  };

  const isBlocked = permissionState === "denied" || (error && error.type === "denied");
  const isLoading = locationStatus === "loading";

  return (
    <div className="modal-overlay" onClick={isLoading ? undefined : dismissPermissionPrompt}>
      <div
        className="modal-content location-permission-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "540px", overflow: "hidden" }}
      >
        {/* Subtle Map Ambient Header Graphic */}
        <div className="location-modal-hero">
          <div className="location-pin-pulse-container">
            <div className="location-pin-wave" />
            <div className="location-pin-badge">
              <MapPin size={32} className="location-pin-icon" />
            </div>
          </div>

          {!isLoading && (
            <button
              className="modal-close-btn"
              onClick={dismissPermissionPrompt}
              aria-label="Close permission dialog"
              style={{ top: "14px", right: "14px", color: "var(--text-primary)" }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: "1.75rem 2rem 2rem" }}>
          {isLoading ? (
            /* Loading State */
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div className="location-detecting-spinner" />
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--primary-900)", marginTop: "1.25rem", marginBottom: "0.4rem" }}>
                Finding your location...
              </h3>
              <p style={{ color: "var(--primary-600)", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.75rem" }}>
                Personalizing your food experience...
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", maxWidth: "360px", margin: "0 auto" }}>
                Connecting with browser geolocation to discover healthy authentic dishes and meal routines available in your area.
              </p>
            </div>
          ) : isBlocked ? (
            /* Location Blocked State */
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#DC2626", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.5rem" }}>
                <AlertCircle size={16} />
                <span>Permission Blocked</span>
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.6rem" }}>
                Location Access Blocked
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                Location permission is currently blocked for this website in your browser settings. Please enable location access from your browser/site settings and try again, or pick your city manually.
              </p>

              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "#991B1B" }}>
                <strong>Tip:</strong> Click the padlock/settings icon 🔒 next to the website URL in your browser address bar to allow Location access.
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={requestLocation}
                  style={{ width: "100%" }}
                >
                  <RefreshCw size={18} />
                  <span>Try Again</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleOpenManual}
                  style={{ width: "100%" }}
                >
                  <SlidersHorizontal size={16} />
                  <span>Choose Location Manually</span>
                </button>
              </div>
            </div>
          ) : (
            /* Initial Prompt State */
            <div>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div className="badge badge-green" style={{ marginBottom: "0.6rem" }}>
                  <Sparkles size={13} />
                  <span>Smart Location Routine</span>
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>
                  Personalize Your Food Routine
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.45, maxWidth: "420px", margin: "0 auto" }}>
                  Allow location access to discover food routines and dishes available around you.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div
                style={{
                  background: "var(--bg-card-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 1.25rem",
                  marginBottom: "1.5rem",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary-900)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                  What you get with location:
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={17} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span>Discover food options available near you</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={17} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span>Get location-relevant meal suggestions</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={17} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span>Find authentic dishes available in your area</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={17} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span>Personalize your daily & weekly food routine</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={requestLocation}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <MapPin size={18} />
                  <span>Allow Location</span>
                </button>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={dismissPermissionPrompt}
                    style={{ flex: 1 }}
                  >
                    <span>Not Now</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleOpenManual}
                    style={{ flex: 1.2 }}
                  >
                    <SlidersHorizontal size={15} />
                    <span>Select City</span>
                  </button>
                </div>
              </div>

              {/* Privacy Notice */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4, textAlign: "center", justifyContent: "center" }}>
                <ShieldCheck size={15} style={{ color: "#059669", flexShrink: 0, marginTop: "1px" }} />
                <span>
                  Your location is used only to personalize nearby food recommendations. Precise coordinates are never stored permanently.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
