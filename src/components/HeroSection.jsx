import React, { useState } from "react";
import { Search, Sparkles, ArrowRight, Activity, Flame, Heart, ShieldCheck, Zap } from "lucide-react";

export default function HeroSection({
  onSearchSubmit,
  onOpenPlanWizard,
  onExploreClick,
  onSelectRoutine
}) {
  const [searchInput, setSearchInput] = useState("");

  const suggestions = [
    { label: "Diabetes-friendly routine", query: "diabetes" },
    { label: "Gym beginner routine", query: "gym" },
    { label: "Weight management", query: "weight" },
    { label: "Muscle gain", query: "muscle" },
    { label: "Student routine", query: "student" },
    { label: "Vegetarian routine", query: "vegetarian" },
    { label: "High-protein meals", query: "protein" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    } else {
      onExploreClick();
    }
  };

  const handleSuggestionClick = (query) => {
    setSearchInput(query);
    onSearchSubmit(query);
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Copy & Search Interface */}
          <div className="animate-fade-in">
            <div className="hero-pill-badge">
              <Sparkles size={14} style={{ color: "#10B981" }} />
              <span>Personalized Food & Health Routines</span>
            </div>

            <h1 className="hero-headline">
              Eat Better. <br />
              <span className="hero-headline-accent">Live Better.</span> <br />
              Every Day.
            </h1>

            <p className="hero-subheading">
              Discover personalized food routines, healthy recipes and simple meal
              ideas designed around your lifestyle, fitness goals, and general health.
            </p>

            {/* Prominent Search Box */}
            <form onSubmit={handleSearch} className="hero-search-wrapper">
              <Search size={20} className="hero-search-icon" />
              <input
                type="text"
                className="hero-search-input"
                placeholder="What food routine are you looking for?"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Search food routines"
              />
              <button type="submit" className="btn btn-accent btn-sm">
                <span>Find Routine</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Example Suggestions */}
            <div className="hero-suggestions-row">
              <span className="hero-suggestions-label">Try searching:</span>
              {suggestions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="hero-suggestion-chip"
                  onClick={() => handleSuggestionClick(item.query)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hero-cta-group">
              <button
                className="btn btn-primary btn-lg"
                onClick={onExploreClick}
              >
                <span>Explore Food Routines</span>
                <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={onOpenPlanWizard}
              >
                <Sparkles size={18} style={{ color: "#10B981" }} />
                <span>Create My Plan</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Floating Micro-Cards */}
          <div className="hero-visual-container">
            {/* Top Floating Card */}
            <div className="floating-widget-card floating-widget-top">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "#ECFDF5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#059669",
                  flexShrink: 0
                }}
              >
                <Activity size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>
                  Daily Macro Balance
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary-900)" }}>
                  100% Whole Food Fueled
                </div>
              </div>
            </div>

            {/* Main Hero Card */}
            <div className="hero-main-card">
              <div className="hero-food-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80"
                  alt="Healthy balanced power bowl"
                  className="hero-food-img"
                  loading="eager"
                />
                <div className="hero-floating-badge">
                  <Flame size={14} style={{ color: "#FBBF24" }} />
                  <span>Low GI • High Fiber</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <div>
                  <span className="badge badge-green" style={{ marginBottom: "0.3rem" }}>
                    ⭐ Featured Routine
                  </span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary-900)" }}>
                    Diabetes-Friendly Low-GI Routine
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                Clinically balanced 6-meal daily schedule for glucose stabilization and all-day vitality.
              </p>

              {/* Quick macros row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  background: "#F8FAF9",
                  padding: "0.6rem",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                  marginBottom: "1rem"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary-900)" }}>1,750</span>
                  <span style={{ fontSize: "0.68rem", display: "block", color: "var(--text-muted)" }}>KCAL</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary-900)" }}>88g</span>
                  <span style={{ fontSize: "0.68rem", display: "block", color: "var(--text-muted)" }}>PROTEIN</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary-900)" }}>165g</span>
                  <span style={{ fontSize: "0.68rem", display: "block", color: "var(--text-muted)" }}>CARBS</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary-900)" }}>42g</span>
                  <span style={{ fontSize: "0.68rem", display: "block", color: "var(--text-muted)" }}>FIBER</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => onSelectRoutine("diabetes-friendly")}
              >
                <span>View Full Daily Timeline</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Bottom Floating Card */}
            <div className="floating-widget-card floating-widget-bottom">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "#FEF3C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#D97706",
                  flexShrink: 0
                }}
              >
                <Zap size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)" }}>
                  Hydration & Prep
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary-900)" }}>
                  Step-by-Step Recipes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
