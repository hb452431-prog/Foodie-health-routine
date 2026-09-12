import React, { useRef, useEffect } from "react";
import {
  MapPin,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Compass,
  Sparkles
} from "lucide-react";
import { useLocation } from "../../context/LocationContext";

export default function LocationIndicator() {
  const {
    locationData,
    permissionState,
    locationStatus,
    isLocationPanelOpen,
    setIsLocationPanelOpen,
    requestLocation,
    setIsManualModalOpen
  } = useLocation();

  const panelRef = useRef(null);

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsLocationPanelOpen(false);
      }
    };
    if (isLocationPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLocationPanelOpen, setIsLocationPanelOpen]);

  const handleRefresh = (e) => {
    e.stopPropagation();
    requestLocation();
    setIsLocationPanelOpen(false);
  };

  const handleOpenManual = (e) => {
    e.stopPropagation();
    setIsLocationPanelOpen(false);
    setIsManualModalOpen(true);
  };

  const isGpsActive = locationData?.isGps && permissionState === "granted";
  const isBlocked = permissionState === "denied";
  const isLoading = locationStatus === "loading";

  return (
    <div className="location-indicator-wrapper" ref={panelRef}>
      {/* Navbar Trigger Pill */}
      <button
        type="button"
        className={`location-nav-pill ${isGpsActive ? "gps-active" : ""}`}
        onClick={() => setIsLocationPanelOpen(!isLocationPanelOpen)}
        title={`Current Location: ${locationData?.label || "Bengaluru"}. Click to refresh or change.`}
        aria-label="Current Location Menu"
      >
        <span className="location-nav-pin-dot">
          <MapPin size={13} className={isLoading ? "location-icon-spin" : ""} />
        </span>
        <span className="location-nav-city-text">
          {locationData?.city || "Bengaluru"}
        </span>
        <span className="location-nav-state-desktop">
          , {locationData?.state?.split(" ")[0] || "Karnataka"}
        </span>
        <ChevronDown size={12} className={`location-chevron ${isLocationPanelOpen ? "rotated" : ""}`} />
      </button>

      {/* Popover Panel */}
      {isLocationPanelOpen && (
        <div className="location-popover-panel animate-scale-up">
          {/* Header */}
          <div className="location-panel-header">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Your Location
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  color: isGpsActive ? "#059669" : isBlocked ? "#DC2626" : "#D97706",
                  background: isGpsActive ? "#ECFDF5" : isBlocked ? "#FEF2F2" : "#FFFBEB",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "var(--radius-full)"
                }}
              >
                {isGpsActive ? (
                  <>
                    <CheckCircle2 size={11} />
                    <span>GPS Active</span>
                  </>
                ) : isBlocked ? (
                  <>
                    <AlertCircle size={11} />
                    <span>Blocked</span>
                  </>
                ) : (
                  <>
                    <Compass size={11} />
                    <span>Manual</span>
                  </>
                )}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--primary-100)",
                  color: "var(--primary-700)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary-900)" }}>
                  {locationData?.city}, {locationData?.state}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {locationData?.country || "India"}
                </div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div style={{ padding: "0.75rem 1rem", background: "var(--bg-card-subtle)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            {isGpsActive ? (
              <span style={{ color: "#059669", fontWeight: 600 }}>
                ✓ Location access enabled — food routines customized for {locationData?.city}.
              </span>
            ) : isBlocked ? (
              <span style={{ color: "#DC2626" }}>
                Location blocked in browser. Using manual selection.
              </span>
            ) : (
              <span>
                Personalized dishes & weekly meal schedules adapted for {locationData?.city}.
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ padding: "0.75rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleRefresh}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <RefreshCw size={13} className={isLoading ? "location-icon-spin" : ""} />
              <span>{isLoading ? "Detecting Location..." : "Refresh Location"}</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleOpenManual}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <SlidersHorizontal size={13} />
              <span>Change Location</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
