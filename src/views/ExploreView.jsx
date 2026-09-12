import React, { useState, useMemo } from "react";
import RoutineCard from "../components/RoutineCard";
import { ROUTINES_DATA } from "../data/routinesData";
import { getAdaptedRoutinesList } from "../data/regionalCuisinesData";
import { CATEGORIES_DATA } from "../data/categoriesData";
import { useLocation } from "../context/LocationContext";
import { Search, SlidersHorizontal, RotateCcw, Sparkles, Filter, Check, MapPin, ShieldAlert, HeartPulse, Dumbbell } from "lucide-react";

export default function ExploreView({
  userProfile,
  initialQuery = "",
  initialCategory = "all",
  onSelectRoutine,
  onOpenShare,
  savedRoutines,
  onToggleSaveRoutine
}) {
  const { locationData, setIsManualModalOpen } = useLocation();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterHighProtein, setFilterHighProtein] = useState(false);
  const [filterLowSugar, setFilterLowSugar] = useState(false);
  const [maxPrepTime, setMaxPrepTime] = useState(60); // minutes
  const [calorieRange, setCalorieRange] = useState(3200); // max kcal

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
    setMaxPrepTime(60);
    setCalorieRange(3200);
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
  }, [searchQuery, selectedCategory, filterVegOnly, filterHighProtein, filterLowSugar, calorieRange]);

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary-600)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>
              <Sparkles size={15} />
              <span>Discover & Filter</span>
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.5rem" }}>
              Explore Food Routines
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "600px" }}>
              Find the exact meal schedule suited for your metabolism, fitness targets, and lifestyle.
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
                🩺 Diabetes & Metabolic Health Food Routine (Adapted for {userCity}, {userState})
              </div>
              <p style={{ fontSize: "0.82rem", color: "#B45309", lineHeight: 1.45 }}>
                For general educational information only. Food requirements may vary by individual. Consult a qualified healthcare professional or certified dietitian for personalized medical advice.
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
                onSelectRoutine={onSelectRoutine}
                isSaved={savedRoutines.includes(routine.id)}
                onToggleSave={onToggleSaveRoutine}
                onOpenShare={onOpenShare}
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
      </div>
    </div>
  );
}
