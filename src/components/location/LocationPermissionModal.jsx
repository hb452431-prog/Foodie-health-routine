import React, { useEffect } from "react";
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  AlertCircle,
  RefreshCw,
  SlidersHorizontal,
  Settings,
  Smartphone,
  Navigation
} from "lucide-react";
import { useLocation } from "../../context/LocationContext";

export default function LocationPermissionModal() {
  const {
    isPermissionModalOpen,
    permissionState,
    locationStatus,
    error,
    requestLocation,
    retryLocation,
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

  const handleRetry = () => {
    retryLocation ? retryLocation() : requestLocation();
  };

  const isLoading = locationStatus === "loading";
  const isGpsOff = error && (error.type === "gps_off" || error.code === 2);
  const isDenied = permissionState === "denied" || (error && (error.type === "denied" || error.code === 1));
  const isTimeout = error && (error.type === "timeout" || error.code === 3);
  const isUnavailable = error && error.type === "unavailable" && !isGpsOff && !isDenied && !isTimeout;

  return (
    <div
      className="modal-overlay location-modal-backdrop"
      onClick={isLoading ? undefined : dismissPermissionPrompt}
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div
        className="modal-content location-permission-card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(92vw, 500px)", maxWidth: "500px", overflow: "hidden" }}
      >
        {/* Modal Ambient Graphic Header */}
        <div className={`location-modal-hero ${isDenied ? "hero-denied" : isGpsOff ? "hero-warning" : ""}`}>
          <div className="location-pin-pulse-container">
            <div className={`location-pin-wave ${isDenied ? "wave-red" : isGpsOff ? "wave-amber" : ""}`} />
            <div className={`location-pin-badge ${isDenied ? "badge-red" : isGpsOff ? "badge-amber" : ""}`}>
              {isDenied ? (
                <AlertCircle size={30} className="location-pin-icon" />
              ) : isGpsOff ? (
                <Smartphone size={30} className="location-pin-icon" />
              ) : isLoading ? (
                <RefreshCw size={30} className="location-pin-icon location-icon-spin" />
              ) : (
                <MapPin size={32} className="location-pin-icon" />
              )}
            </div>
          </div>

          {!isLoading && (
            <button
              className="modal-close-btn"
              onClick={dismissPermissionPrompt}
              aria-label="Close location dialog"
              style={{ top: "14px", right: "14px", color: "var(--text-primary)" }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: "clamp(1.25rem, 4vw, 1.75rem)" }}>
          {isLoading ? (
            /* 1. Loading / Detecting State */
            <div style={{ textAlign: "center", padding: "0.75rem 0" }}>
              <div className="location-detecting-spinner" />
              <h3
                id="location-modal-title"
                style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--primary-900)", marginTop: "1.25rem", marginBottom: "0.35rem" }}
              >
                Detecting your location...
              </h3>
              <p style={{ color: "var(--primary-600)", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.75rem" }}>
                Personalizing your food experience...
              </p>
              <p style={{ fontSize: "0.84rem", color: "var(--text-muted)", maxWidth: "380px", margin: "0 auto", lineHeight: 1.5 }}>
                Connecting with browser geolocation to discover healthy authentic dishes and meal routines available in your area.
              </p>
            </div>
          ) : isGpsOff ? (
            /* 2. Device Location / GPS OFF State */
            <div>
              <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "#D97706",
                    background: "#FEF3C7",
                    border: "1px solid #FDE68A",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    marginBottom: "0.6rem"
                  }}
                >
                  <Smartphone size={14} />
                  <span>GPS / Location Service OFF</span>
                </div>
                <h2
                  id="location-modal-title"
                  style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}
                >
                  Turn On Location
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, maxWidth: "420px", margin: "0 auto" }}>
                  Location is currently turned off on your device. Turn on Location services to discover nearby restaurants, food recommendations and location-based features.
                </p>
              </div>

              {/* Step-by-step Instructions Box */}
              <div
                style={{
                  background: "#FFFBEB",
                  border: "1px solid #FDE68A",
                  borderRadius: "var(--radius-lg)",
                  padding: "0.9rem 1.1rem",
                  marginBottom: "1.25rem",
                  fontSize: "0.82rem",
                  color: "#92400E",
                  lineHeight: 1.45
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Settings size={14} />
                  <span>How to enable:</span>
                </div>
                <div>
                  Please turn on Location services in your device/browser settings, then return to this website and tap <strong>Retry</strong>.
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.1rem" }}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleRetry}
                  style={{ width: "100%", justifyContent: "center", fontWeight: 700 }}
                >
                  <RefreshCw size={17} />
                  <span>Retry Location</span>
                </button>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleOpenManual}
                    style={{ justifyContent: "center" }}
                  >
                    <SlidersHorizontal size={15} />
                    <span>Enter Manually</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={dismissPermissionPrompt}
                    style={{ justifyContent: "center" }}
                  >
                    <span>Not Now</span>
                  </button>
                </div>
              </div>

              {/* Privacy Notice */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                <ShieldCheck size={14} style={{ color: "#059669", flexShrink: 0 }} />
                <span>Your location is used only to provide nearby recommendations.</span>
              </div>
            </div>
          ) : isDenied ? (
            /* 3. Location Permission Denied State */
            <div>
              <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "#DC2626",
                    background: "#FEF2F2",
                    border: "1px solid #FECACA",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    marginBottom: "0.6rem"
                  }}
                >
                  <AlertCircle size={14} />
                  <span>Permission Blocked</span>
                </div>
                <h2
                  id="location-modal-title"
                  style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.4rem" }}
                >
                  Location Permission Denied
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, maxWidth: "420px", margin: "0 auto" }}>
                  Location permission is currently blocked for this website in your browser settings. To discover nearby recommendations, please allow location access in your browser settings or choose your city manually.
                </p>
              </div>

              {/* Browser Settings Guide */}
              <div
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "var(--radius-lg)",
                  padding: "0.9rem 1.1rem",
                  marginBottom: "1.25rem",
                  fontSize: "0.82rem",
                  color: "#991B1B",
                  lineHeight: 1.45
                }}
              >
                <strong>Tip:</strong> Tap the padlock or site settings icon 🔒 in your browser address bar → <strong>Permissions</strong> → <strong>Allow Location</strong>, then tap <strong>Try Again</strong>.
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.1rem" }}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleRetry}
                  style={{ width: "100%", justifyContent: "center", fontWeight: 700 }}
                >
                  <RefreshCw size={17} />
                  <span>Try Again</span>
                </button>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleOpenManual}
                    style={{ justifyContent: "center" }}
                  >
                    <SlidersHorizontal size={15} />
                    <span>Enter Manually</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={dismissPermissionPrompt}
                    style={{ justifyContent: "center" }}
                  >
                    <span>Not Now</span>
                  </button>
                </div>
              </div>

              {/* Privacy Notice */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                <ShieldCheck size={14} style={{ color: "#059669", flexShrink: 0 }} />
                <span>Your location is used only to provide nearby recommendations.</span>
              </div>
            </div>
          ) : isTimeout || isUnavailable ? (
            /* 4. Timeout or Position Unavailable State */
            <div>
              <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "#D97706",
                    background: "#FEF3C7",
                    border: "1px solid #FDE68A",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    marginBottom: "0.6rem"
                  }}
                >
                  <AlertCircle size={14} />
                  <span>{isTimeout ? "Connection Timeout" : "Signal Unavailable"}</span>
                </div>
                <h2
                  id="location-modal-title"
                  style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.4rem" }}
                >
                  {isTimeout ? "Location request timed out" : "Unable to detect your location"}
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, maxWidth: "420px", margin: "0 auto" }}>
                  {isTimeout
                    ? "The request to detect your location took too long. Please ensure your GPS has a clear signal and tap Retry, or enter your location manually."
                    : "We couldn't determine your location. Please check your network or GPS connection and try again."}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.1rem" }}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleRetry}
                  style={{ width: "100%", justifyContent: "center", fontWeight: 700 }}
                >
                  <RefreshCw size={17} />
                  <span>Retry Location</span>
                </button>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleOpenManual}
                    style={{ justifyContent: "center" }}
                  >
                    <SlidersHorizontal size={15} />
                    <span>Enter Manually</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={dismissPermissionPrompt}
                    style={{ justifyContent: "center" }}
                  >
                    <span>Not Now</span>
                  </button>
                </div>
              </div>

              {/* Privacy Notice */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                <ShieldCheck size={14} style={{ color: "#059669", flexShrink: 0 }} />
                <span>Your location is used only to provide nearby recommendations.</span>
              </div>
            </div>
          ) : (
            /* 5. Initial Permission Prompt State */
            <div>
              <div style={{ textAlign: "center", marginBottom: "1.35rem" }}>
                <div className="badge badge-green" style={{ marginBottom: "0.6rem" }}>
                  <Sparkles size={13} />
                  <span>Smart Location Routine</span>
                </div>
                <h2
                  id="location-modal-title"
                  style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.35rem", letterSpacing: "-0.01em" }}
                >
                  Turn On Location
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.45, maxWidth: "420px", margin: "0 auto" }}>
                  Location is currently turned off on your device. Turn on Location services to discover nearby restaurants, food recommendations and location-based features.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div
                style={{
                  background: "var(--bg-card-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: "0.95rem 1.15rem",
                  marginBottom: "1.35rem",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary-900)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.65rem" }}>
                  What you get with location:
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontSize: "0.86rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span>Discover food options available near you</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontSize: "0.86rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span>Get location-relevant meal suggestions</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontSize: "0.86rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span>Find authentic dishes available in your area</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontSize: "0.86rem", color: "var(--text-primary)" }}>
                    <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }} />
                    <span>Personalize your daily & weekly food routine</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.1rem" }}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => requestLocation()}
                  style={{ width: "100%", justifyContent: "center", fontWeight: 700 }}
                >
                  <Navigation size={17} />
                  <span>Turn On Location</span>
                </button>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleOpenManual}
                    style={{ justifyContent: "center" }}
                  >
                    <SlidersHorizontal size={15} />
                    <span>Enter Manually</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={dismissPermissionPrompt}
                    style={{ justifyContent: "center" }}
                  >
                    <span>Not Now</span>
                  </button>
                </div>
              </div>

              {/* Privacy Notice */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                <ShieldCheck size={14} style={{ color: "#059669", flexShrink: 0 }} />
                <span>Your location is used only to provide nearby recommendations.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

