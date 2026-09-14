import React, { useState, useMemo, useEffect } from "react";
import RoutineCard from "../components/RoutineCard";
import CentralFoodExplorer from "../components/CentralFoodExplorer";
import MealDbExplorer from "../components/MealDbExplorer";
import DiseaseRoutineGenerator from "../components/DiseaseRoutineGenerator";
import { ROUTINES_DATA } from "../data/routinesData";
import { getAdaptedRoutinesList } from "../data/regionalCuisinesData";
import { CATEGORIES_DATA } from "../data/categoriesData";
import { useLocation } from "../context/LocationContext";
import { useAuth } from "../context/AuthContext";
import { Search, RotateCcw, Sparkles, Check, MapPin, ShieldAlert, Dumbbell, ChefHat, Calendar, Database, Globe, Activity } from "lucide-react";

export default function ExploreView({
  userProfile,
  initialQuery = "",
  initialCategory = "all",
  onSelectRoutine,
  onOpenShare,
  onApplyPlan,
  savedRoutines = [],
  onToggleSaveRoutine,
  onShowToast
}) {
  const { requireAuth } = useAuth();
  const { locationData, setIsManualModalOpen } = useLocation();

  const isDiseaseKeyword = (q) => {
    if (!q) return false;
    const lower = q.toLowerCase();
    return [
      "diabetes", "sugar", "pcos", "pcod", "thyroid", "hypertension", "bp", "pressure",
      "cholesterol", "liver", "fatty liver", "gerd", "acid", "reflux", "uric", "gout",
      "kidney", "renal", "anemia", "iron", "ibs", "gut", "heart", "disease", "illness",
      "condition", "health routine", "blood pressure"
    ].some((k) => lower.includes(k));
  };

  // Active Explorer Mode: "food-kb", "disease-ai", "routines", or "mealdb"
  const [exploreMode, setExploreMode] = useState(() => {
    if (initialCategory === "health" || initialCategory === "disease" || isDiseaseKeyword(initialQuery)) {
      return "disease-ai";
    }
    return "food-kb";
  });

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterHighProtein, setFilterHighProtein] = useState(false);
  const [filterLowSugar, setFilterLowSugar] = useState(false);
  const [calorieRange, setCalorieRange] = useState(3200); // max kcal

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      if (isDiseaseKeyword(initialQuery)) {
        setExploreMode("disease-ai");
      }
    }
  }, [initialQuery]);

  useEffect(() => {
    if (initialCategory === "disease" || initialCategory === "health") {
      setExploreMode("disease-ai");
    }
  }, [initialCategory]);

  const userCountry = locationData?.country || userProfile?.country || "India";
  const userState = locationData?.state || userProfile?.state || "Karnataka";
  const userCity = locationData?.city || "Bengaluru";

  const adaptedRoutines = useMemo(() => {
    return getAdaptedRoutinesList(ROUTINES_DATA, userCountry, userState);
  }, [userCountry, userState]);

  // Check if search query matches health condition
  const isHealthConditionQuery = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return q.includes("diabetes") || q.includes("sugar") || q.includes("heart") || q.includes("pressure") || q.includes("bp") || q.includes("cholesterol");
  }, [searchQuery]);

  // Check if search query matches fitness
  const isFitnessQuery = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return q.includes("gym") || q.includes("muscle") || q.includes("protein") || q.includes("hypertrophy") || q.includes("workout");
  }, [searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setFilterVegOnly(false);
    setFilterHighProtein(false);
    setFilterLowSugar(false);
    setCalorieRange(3200);
  };

  // Direct Action Handlers
  const handleSelectRoutineWithAuth = (routineId) => {
    if (onSelectRoutine) onSelectRoutine(routineId);
  };

  const handleToggleSaveWithAuth = (routineId) => {
    if (onToggleSaveRoutine) onToggleSaveRoutine(routineId);
  };

  const handleShareWithAuth = (routine) => {
    if (onOpenShare) onOpenShare(routine);
  };

  // Filtered routines logic
  const filteredRoutines = useMemo(() => {
    return adaptedRoutines.filter((routine) => {
      // 1. Search query match (title, description, tags, dish names)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = routine.title.toLowerCase().includes(q);
        const matchesDesc = routine.description.toLowerCase().includes(q);
        const matchesCategory = routine.category.toLowerCase().includes(q);
        const matchesTags = routine.tags?.some((t) => t.toLowerCase().includes(q));
        const matchesDishes = routine.dailyTimeline?.some((m) =>
          m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
        );

        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTags && !matchesDishes) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== "all") {
        if (routine.categoryId !== selectedCategory && !routine.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // 3. Vegetarian toggle
      if (filterVegOnly && !routine.isVegetarian) {
        return false;
      }

      // 4. High protein toggle
      if (filterHighProtein && !routine.isHighProtein && routine.protein < 120) {
        return false;
      }

      // 5. Low sugar toggle
      if (filterLowSugar && !routine.isLowSugar) {
        return false;
      }

      // 6. Calorie range
      if (routine.calories > calorieRange) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, filterVegOnly, filterHighProtein, filterLowSugar, calorieRange, adaptedRoutines]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (filterVegOnly ? 1 : 0) +
    (filterHighProtein ? 1 : 0) +
    (filterLowSugar ? 1 : 0) +
    (calorieRange < 3200 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div style={{ padding: "2rem 0 4rem" }}>
      <div className="container">
        {/* Page Title & Search Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary-600)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>
              <Sparkles size={15} />
              <span>Discover & Explore</span>
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.5rem" }}>
              Central Food & Recipe Explorer
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "600px" }}>
              {exploreMode === "food-kb"
                ? "Unified single source of truth database powering all dish searches, ingredients, recipes, and verified imagery."
                : exploreMode === "disease-ai"
                ? "AI-powered clinical food routines tailored for specific diseases, metabolic conditions, and health protocols."
                : exploreMode === "routines"
                ? "Find full day-by-day food routines calibrated for your metabolism, fitness targets, and lifestyle."
                : "Search thousands of global dishes and recipes from TheMealDB open catalog."}
            </p>
          </div>

          {/* Location Context Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
              padding: "0.4rem 0.85rem",
              borderRadius: "var(--radius-full)",
              boxShadow: "var(--shadow-xs)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--primary-800)" }}>
              <MapPin size={14} color="#059669" />
              <span>Adapted for {userCity}, {userState}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsManualModalOpen(true)}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--primary-600)",
                cursor: "pointer",
                paddingLeft: "0.3rem",
                borderLeft: "1px solid var(--border-subtle)"
              }}
            >
              Change
            </button>
          </div>
        </div>

        {/* 4-Way Sub-Mode Segmented Control */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--bg-card-subtle)",
            padding: "0.35rem",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "2rem",
            boxShadow: "var(--shadow-xs)",
            flexWrap: "wrap",
            gap: "0.25rem"
          }}
        >
          <button
            type="button"
            onClick={() => setExploreMode("food-kb")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              border: "none",
              background: exploreMode === "food-kb" ? "#FFFFFF" : "transparent",
              color: exploreMode === "food-kb" ? "var(--primary-900)" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.88rem",
              padding: "0.55rem 1.15rem",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              boxShadow: exploreMode === "food-kb" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            <Database size={15} style={{ color: exploreMode === "food-kb" ? "var(--primary-600)" : undefined }} />
            <span>Food Knowledge Base</span>
            <span
              style={{
                fontSize: "0.68rem",
                background: "#10B981",
                color: "#FFFFFF",
                padding: "0.1rem 0.45rem",
                borderRadius: "var(--radius-full)",
                fontWeight: 800
              }}
            >
              CORE
            </span>
          </button>

          <button
            type="button"
            onClick={() => setExploreMode("disease-ai")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              border: "none",
              background: exploreMode === "disease-ai" ? "#FFFFFF" : "transparent",
              color: exploreMode === "disease-ai" ? "#065F46" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.88rem",
              padding: "0.55rem 1.15rem",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              boxShadow: exploreMode === "disease-ai" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            <Activity size={15} style={{ color: "#10B981" }} />
            <span>AI Disease Routine Search</span>
            <span
              style={{
                fontSize: "0.68rem",
                background: "linear-gradient(135deg, #10B981, #059669)",
                color: "#FFFFFF",
                padding: "0.1rem 0.45rem",
                borderRadius: "var(--radius-full)",
                fontWeight: 800
              }}
            >
              AI
            </span>
          </button>

          <button
            type="button"
            onClick={() => setExploreMode("routines")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              border: "none",
              background: exploreMode === "routines" ? "#FFFFFF" : "transparent",
              color: exploreMode === "routines" ? "var(--primary-900)" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.88rem",
              padding: "0.55rem 1.15rem",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              boxShadow: exploreMode === "routines" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            <Calendar size={15} style={{ color: exploreMode === "routines" ? "var(--primary-600)" : undefined }} />
            <span>Health Routines ({ROUTINES_DATA.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setExploreMode("mealdb")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              border: "none",
              background: exploreMode === "mealdb" ? "#FFFFFF" : "transparent",
              color: exploreMode === "mealdb" ? "var(--primary-900)" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.88rem",
              padding: "0.55rem 1.15rem",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              boxShadow: exploreMode === "mealdb" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            <Globe size={15} style={{ color: exploreMode === "mealdb" ? "#0284C7" : undefined }} />
            <span>TheMealDB API</span>
          </button>
        </div>

        {/* ============================================================
           VIEW 1: CENTRAL FOOD MASTER KNOWLEDGE BASE
        ============================================================ */}
        {exploreMode === "food-kb" && (
          <CentralFoodExplorer onShowToast={onShowToast} />
        )}

        {/* ============================================================
           VIEW 2: AI DISEASE & CLINICAL ROUTINE GENERATOR
        ============================================================ */}
        {exploreMode === "disease-ai" && (
          <DiseaseRoutineGenerator
            onApplyPlan={onApplyPlan}
            onShowToast={onShowToast}
            initialDiseaseQuery={searchQuery || initialQuery}
          />
        )}

        {/* ============================================================
           VIEW 3: THEMEALDB LIVE RECIPE EXPLORER
        ============================================================ */}
        {exploreMode === "mealdb" && (
          <MealDbExplorer onShowToast={onShowToast} />
        )}

        {/* ============================================================
           VIEW 4: HEALTH & METABOLIC ROUTINES LIBRARY
        ============================================================ */}
        {exploreMode === "routines" && (
          <>
            {/* Health Condition Search Disclaimer Banner */}
            {isHealthConditionQuery && (
              <div
                style={{
                  background: "linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)",
                  border: "1.5px solid #FCD34D",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 1.25rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.85rem",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <ShieldAlert size={22} style={{ color: "#D97706", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#92400E", marginBottom: "0.2rem" }}>
                    🩺 Metabolic Health Food Routine (Adapted for {userCity}, {userState})
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#B45309", lineHeight: 1.45, margin: 0 }}>
                    For general educational information only. May be suitable as part of a balanced diet; consult a qualified healthcare professional.
                  </p>
                </div>
              </div>
            )}

            {/* Fitness / Muscle Query Banner */}
            {isFitnessQuery && (
              <div
                style={{
                  background: "linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)",
                  border: "1.5px solid #93C5FD",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 1.25rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <Dumbbell size={22} style={{ color: "#2563EB", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1E40AF", marginBottom: "0.15rem" }}>
                    💪 High-Protein & Fitness Food Routines Near {userCity}
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#3B82F6", margin: 0 }}>
                    Showing protein-dense meals, athletic macros, and muscle recovery food routines available in your region.
                  </p>
                </div>
              </div>
            )}

            {/* Search & Filter Toolbar */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                padding: "1.25rem",
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--border-subtle)",
                marginBottom: "2rem"
              }}
            >
              {/* Main Search Input */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "var(--bg-card-subtle)", padding: "0.6rem 1rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", marginBottom: "1rem" }}>
                <Search size={20} style={{ color: "var(--primary-600)" }} />
                <input
                  type="text"
                  placeholder="Search by goal, dish, ingredients, or condition (e.g., diabetes, oats, high protein)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: "0.95rem" }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Chips Carousel / Row */}
              <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem", marginBottom: "1rem", scrollbarWidth: "thin" }}>
                <button
                  className={`badge ${selectedCategory === "all" ? "badge-green" : "badge-blue"}`}
                  style={{ padding: "0.5rem 1rem", cursor: "pointer", fontSize: "0.85rem", whiteSpace: "nowrap" }}
                  onClick={() => setSelectedCategory("all")}
                >
                  🌟 All Categories ({ROUTINES_DATA.length})
                </button>
                {CATEGORIES_DATA.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      className={`badge ${isSelected ? "badge-green" : "badge-blue"}`}
                      style={{
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        whiteSpace: "nowrap",
                        background: isSelected ? "var(--primary-800)" : undefined,
                        color: isSelected ? "#FFFFFF" : undefined
                      }}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.emoji} {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Quick Dietary Toggles & Sliders */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  paddingTop: "0.85rem",
                  borderTop: "1px solid var(--border-subtle)"
                }}
              >
                {/* Toggles */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className={`btn btn-sm ${filterVegOnly ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setFilterVegOnly(!filterVegOnly)}
                  >
                    {filterVegOnly && <Check size={14} />}
                    <span>🥗 100% Vegetarian</span>
                  </button>

                  <button
                    type="button"
                    className={`btn btn-sm ${filterHighProtein ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setFilterHighProtein(!filterHighProtein)}
                  >
                    {filterHighProtein && <Check size={14} />}
                    <span>🍗 High Protein (&gt;120g)</span>
                  </button>

                  <button
                    type="button"
                    className={`btn btn-sm ${filterLowSugar ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setFilterLowSugar(!filterLowSugar)}
                  >
                    {filterLowSugar && <Check size={14} />}
                    <span>🩺 Low-GI / Sugar Smart</span>
                  </button>
                </div>

                {/* Calorie Range Slider */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Max Calories:</span>
                  <input
                    type="range"
                    min="1400"
                    max="3200"
                    step="100"
                    value={calorieRange}
                    onChange={(e) => setCalorieRange(Number(e.target.value))}
                    style={{ accentColor: "var(--primary-600)", cursor: "pointer" }}
                  />
                  <span style={{ fontWeight: 700, color: "var(--primary-900)" }}>{calorieRange} kcal</span>
                </div>

                {/* Reset Filter Button */}
                {activeFiltersCount > 0 && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleResetFilters}
                    style={{ color: "#EF4444" }}
                  >
                    <RotateCcw size={14} />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>
            </div>

            {/* Results Count Summary */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--primary-900)" }}>
                Showing {filteredRoutines.length} {filteredRoutines.length === 1 ? "routine" : "routines"}
              </div>
            </div>

            {/* Routines Grid */}
            {filteredRoutines.length > 0 ? (
              <div className="routines-grid">
                {filteredRoutines.map((routine) => (
                  <RoutineCard
                    key={routine.id}
                    routine={routine}
                    onSelectRoutine={handleSelectRoutineWithAuth}
                    isSaved={savedRoutines.includes(routine.id)}
                    onToggleSave={handleToggleSaveWithAuth}
                    onOpenShare={handleShareWithAuth}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "var(--radius-xl)",
                  padding: "3.5rem 1.5rem",
                  textAlign: "center",
                  border: "1px dashed var(--border-subtle)",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                  No Food Routines Match Your Filters
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
                  Try loosening your search keywords or resetting your dietary constraints to explore our full library.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={16} />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
