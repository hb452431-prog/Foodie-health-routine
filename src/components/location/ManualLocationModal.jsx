import React, { useState, useEffect } from "react";
import {
  MapPin,
  X,
  Search,
  Check,
  Compass,
  Navigation,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useLocation } from "../../context/LocationContext";
import { MAJOR_LOCATIONS } from "../../data/locationFoodData";

const QUICK_CITIES = [
  { city: "Bengaluru", state: "Karnataka", country: "India", emoji: "🌸" },
  { city: "Mumbai", state: "Maharashtra", country: "India", emoji: "🌊" },
  { city: "Delhi", state: "Delhi & North India", country: "India", emoji: "🏛️" },
  { city: "Chennai", state: "Tamil Nadu", country: "India", emoji: "🌴" },
  { city: "Hyderabad", state: "Andhra Pradesh & Telangana", country: "India", emoji: "💎" },
  { city: "Pune", state: "Maharashtra", country: "India", emoji: "⛰️" },
  { city: "Kolkata", state: "West Bengal", country: "India", emoji: "🎭" },
  { city: "Ahmedabad", state: "Gujarat", country: "India", emoji: "🪁" },
  { city: "Jaipur", state: "Rajasthan", country: "India", emoji: "🏰" },
  { city: "Kochi", state: "Kerala", country: "India", emoji: "🥥" }
];

export default function ManualLocationModal() {
  const {
    isManualModalOpen,
    setIsManualModalOpen,
    locationData,
    setManualLocation,
    requestLocation
  } = useLocation();

  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("Karnataka");
  const [selectedCity, setSelectedCity] = useState("Bengaluru");

  useEffect(() => {
    if (locationData) {
      setSelectedCountry(locationData.country || "India");
      setSelectedState(locationData.state || "Karnataka");
      setSelectedCity(locationData.city || "Bengaluru");
    }
  }, [locationData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isManualModalOpen) {
        setIsManualModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isManualModalOpen, setIsManualModalOpen]);

  if (!isManualModalOpen) return null;

  const handleSelectCityDirect = (cityObj) => {
    setManualLocation(cityObj.city, cityObj.state, cityObj.country);
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    if (selectedCity) {
      setManualLocation(selectedCity, selectedState, selectedCountry);
    }
  };

  const handleRetryGps = () => {
    setIsManualModalOpen(false);
    requestLocation();
  };

  const filteredQuickCities = QUICK_CITIES.filter((c) =>
    c.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.state.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={() => setIsManualModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "560px" }}
      >
        {/* Header */}
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--primary-100)",
                color: "var(--primary-700)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Compass size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)" }}>
                Choose Your Location
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Personalize food routines, recipes & nearby orders
              </p>
            </div>
          </div>

          <button
            className="modal-close-btn"
            onClick={() => setIsManualModalOpen(false)}
            aria-label="Close modal"
            style={{ position: "static", background: "var(--bg-card-subtle)", color: "var(--text-primary)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "1.5rem" }}>
          {/* Use Current GPS Location CTA */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRetryGps}
            style={{
              width: "100%",
              marginBottom: "1.25rem",
              background: "linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)",
              border: "1.5px solid #86EFAC",
              color: "#166534",
              justifyContent: "center",
              fontWeight: 700
            }}
          >
            <Navigation size={16} />
            <span>Use Current Device Location (GPS)</span>
          </button>

          {/* Search Filter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--bg-card-subtle)",
              padding: "0.55rem 0.9rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              marginBottom: "1.25rem"
            }}
          >
            <Search size={16} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search Indian or global city..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "0.9rem",
                fontFamily: "inherit"
              }}
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter("")}
                style={{ background: "none", border: "none", fontSize: "0.75rem", color: "var(--text-muted)", cursor: "pointer", fontWeight: 600 }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Major Cities Grid */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>
              Popular Hubs
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "0.5rem" }}>
              {filteredQuickCities.map((c) => {
                const isSelected = locationData?.city?.toLowerCase() === c.city.toLowerCase();
                return (
                  <button
                    key={c.city}
                    type="button"
                    onClick={() => handleSelectCityDirect(c)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.6rem 0.75rem",
                      borderRadius: "var(--radius-md)",
                      border: isSelected ? "2px solid #10B981" : "1px solid var(--border-subtle)",
                      background: isSelected ? "#ECFDF5" : "#FFFFFF",
                      color: isSelected ? "#065F46" : "var(--text-primary)",
                      fontWeight: isSelected ? 700 : 600,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <span>{c.emoji} {c.city}</span>
                    {isSelected && <Check size={14} style={{ color: "#10B981" }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cascading Country / State / City Form */}
          <form onSubmit={handleApplyCustom} style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Custom Selection
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.85rem" }}
                >
                  <option value="India">🇮🇳 India</option>
                  <option value="United States">🇺🇸 United States</option>
                  <option value="United Kingdom">🇬🇸 United Kingdom</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                  State / Region
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.85rem" }}
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi & North India">Delhi / NCR</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Andhra Pradesh & Telangana">Andhra & Telangana</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Punjab">Punjab</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                  City
                </label>
                <input
                  type="text"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="e.g. Bengaluru"
                  style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.85rem" }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Apply Location ({selectedCity})</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
