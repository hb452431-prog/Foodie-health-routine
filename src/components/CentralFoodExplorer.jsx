import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Globe, Tag, Sparkles, RotateCcw, Shuffle, AlertCircle, ChefHat, Heart, Flame, ShieldAlert, Check } from "lucide-react";
import FoodCard from "./FoodCard";
import FoodDetailsModal from "./FoodDetailsModal";
import { searchFoods, filterFoods } from "../services/foodService";

const QUICK_SEARCH_CHIPS = [
  "Biryani",
  "Dosa",
  "Pizza",
  "Pasta",
  "Ragi Mudde",
  "Pesarattu",
  "Palak Paneer",
  "Rajma Chawal",
  "Ramen",
  "Avocado Toast",
  "Diabetes-Conscious",
  "High Protein"
];

const HEALTH_FILTER_CHIPS = [
  { id: "all", label: "🌟 All Foods", tag: null },
  { id: "diabetes", label: "🩺 Diabetes-Conscious", tag: "diabetes-conscious" },
  { id: "protein", label: "💪 High-Protein", tag: "high-protein" },
  { id: "heart", label: "❤️ Heart-Conscious", tag: "heart-conscious" },
  { id: "fiber", label: "🌾 High-Fiber", tag: "high-fiber" },
  { id: "sugar", label: "🍃 Low Added Sugar", tag: "low-added-sugar" },
  { id: "calcium", label: "🦴 Calcium-Rich", tag: "calcium-rich" },
  { id: "student", label: "⚡ Student-Friendly", tag: "student-friendly" }
];

const REGION_FILTER_CHIPS = [
  "All Regions",
  "Karnataka",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Telangana",
  "Kerala",
  "Maharashtra",
  "Punjab",
  "Gujarat",
  "West Bengal",
  "Rajasthan",
  "Italy",
  "Mexico",
  "Japan",
  "United States"
];

export default function CentralFoodExplorer({ onShowToast }) {
  const [query, setQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedHealthTag, setSelectedHealthTag] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFoodDetail, setActiveFoodDetail] = useState(null);

  const fetchFoodData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let results = [];

      if (activeSearch.trim()) {
        results = await searchFoods(activeSearch.trim());
      } else {
        const filters = {};
        if (filterVegOnly) filters.vegetarian = true;
        if (selectedRegion !== "All Regions") filters.stateOrRegion = selectedRegion;
        if (selectedCategory !== "All") filters.category = selectedCategory;
        if (selectedHealthTag !== "all") {
          const matchedTagObj = HEALTH_FILTER_CHIPS.find((c) => c.id === selectedHealthTag);
          if (matchedTagObj?.tag) filters.healthTags = [matchedTagObj.tag];
        }

        results = filterFoods(filters);
      }

      // If active search also had vegetarian/region filter applied
      if (filterVegOnly) {
        results = results.filter((f) => f.vegetarian);
      }
      if (selectedRegion !== "All Regions") {
        results = results.filter((f) => f.stateOrRegion?.toLowerCase().includes(selectedRegion.toLowerCase()) || f.country?.toLowerCase().includes(selectedRegion.toLowerCase()));
      }

      setFoods(results);
    } catch (err) {
      console.error("Food knowledge base search error:", err);
      setError("Unable to load dishes from the Food Knowledge Base.");
    } finally {
      setLoading(false);
    }
  }, [activeSearch, selectedHealthTag, selectedRegion, filterVegOnly, selectedCategory]);

  useEffect(() => {
    fetchFoodData();
  }, [fetchFoodData]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setSelectedHealthTag("all");
    setSelectedRegion("All Regions");
    setActiveSearch(query.trim());
  };

  const handleChipClick = (dishName) => {
    setQuery(dishName);
    setSelectedHealthTag("all");
    setSelectedRegion("All Regions");
    setActiveSearch(dishName);
  };

  const handleHealthTagSelect = (tagId) => {
    setSelectedHealthTag(tagId);
    setQuery("");
    setActiveSearch("");
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setQuery("");
    setActiveSearch("");
  };

  const handleRandomDish = () => {
    if (foods.length === 0) return;
    const rand = foods[Math.floor(Math.random() * foods.length)];
    if (rand) {
      setActiveFoodDetail(rand);
      if (onShowToast) {
        onShowToast(`🎲 Discovered: ${rand.dishName || rand.title}!`);
      }
    }
  };

  const handleReset = () => {
    setQuery("");
    setActiveSearch("");
    setSelectedHealthTag("all");
    setSelectedRegion("All Regions");
    setFilterVegOnly(false);
    setSelectedCategory("All");
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Search Header Bar */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          padding: "1.5rem",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border-subtle)",
          marginBottom: "2rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary-600)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.2rem" }}>
              <ChefHat size={16} />
              <span>Central Food Knowledge Base (Single Source of Truth)</span>
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
              Search Dishes, Cuisines & Health Routines
            </h3>
          </div>

          <button
            type="button"
            onClick={handleRandomDish}
            className="btn btn-secondary btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700 }}
          >
            <Shuffle size={15} style={{ color: "var(--primary-600)" }} />
            <span>Surprise Me / Random Dish</span>
          </button>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "var(--bg-card-subtle)",
              padding: "0.6rem 1rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <Search size={20} style={{ color: "var(--primary-600)", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search dishes, state cuisines, or conditions (e.g. Biryani, Dosa, Pizza, Diabetes, High Protein)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "0.95rem",
                color: "var(--text-main)"
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ padding: "0.45rem 1rem", fontWeight: 700 }}
            >
              Search
            </button>
          </div>
        </form>

        {/* Popular Quick-Search Suggestion Chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>Popular:</span>
          {QUICK_SEARCH_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="badge"
              style={{
                background: activeSearch.toLowerCase() === chip.toLowerCase()
                  ? "var(--primary-800)"
                  : "var(--bg-card-subtle)",
                color: activeSearch.toLowerCase() === chip.toLowerCase()
                  ? "#FFFFFF"
                  : "var(--text-main)",
                border: "1px solid var(--border-subtle)",
                padding: "0.3rem 0.65rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8rem",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.15s ease"
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Health Profile / Goal Tag Filter Chips */}
        <div style={{ paddingTop: "0.85rem", borderTop: "1px solid var(--border-subtle)", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--primary-900)" }}>
            <Heart size={14} style={{ color: "#EF4444" }} />
            <span>Health & Nutritional Focus:</span>
          </div>

          <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.4rem", scrollbarWidth: "thin" }}>
            {HEALTH_FILTER_CHIPS.map((h) => {
              const isSelected = selectedHealthTag === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => handleHealthTagSelect(h.id)}
                  className="badge"
                  style={{
                    background: isSelected ? "var(--primary-800)" : "var(--bg-card-subtle)",
                    color: isSelected ? "#FFFFFF" : "var(--text-main)",
                    border: "1px solid var(--border-subtle)",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    transition: "all 0.15s ease"
                  }}
                >
                  {h.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* State / Region Filter Chips */}
        <div style={{ paddingTop: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--primary-900)" }}>
              <Globe size={14} style={{ color: "var(--primary-600)" }} />
              <span>State & Regional Cuisines:</span>
            </div>

            {/* Quick 100% Veg toggle */}
            <button
              type="button"
              className={`btn btn-sm ${filterVegOnly ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              style={{ padding: "0.25rem 0.65rem", fontSize: "0.78rem" }}
            >
              {filterVegOnly && <Check size={13} />}
              <span>🥗 100% Vegetarian</span>
            </button>
          </div>

          <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.4rem", scrollbarWidth: "thin" }}>
            {REGION_FILTER_CHIPS.map((reg) => {
              const isSelected = selectedRegion === reg;
              return (
                <button
                  key={reg}
                  type="button"
                  onClick={() => handleRegionSelect(reg)}
                  className="badge"
                  style={{
                    background: isSelected ? "#0284C7" : "var(--bg-card-subtle)",
                    color: isSelected ? "#FFFFFF" : "var(--text-main)",
                    border: "1px solid var(--border-subtle)",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    transition: "all 0.15s ease"
                  }}
                >
                  {reg}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--primary-900)" }}>
          {loading ? (
            "Searching Food Knowledge Base..."
          ) : (
            `Showing ${foods.length} verified ${foods.length === 1 ? "dish" : "dishes"} ${
              activeSearch
                ? `for "${activeSearch}"`
                : selectedRegion !== "All Regions"
                ? `from "${selectedRegion}"`
                : selectedHealthTag !== "all"
                ? `with ${HEALTH_FILTER_CHIPS.find((h) => h.id === selectedHealthTag)?.label}`
                : ""
            }`
          )}
        </div>

        {(selectedRegion !== "All Regions" || selectedHealthTag !== "all" || activeSearch || filterVegOnly) && (
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "0.8rem", color: "#EF4444", display: "flex", alignItems: "center", gap: "0.3rem" }}
          >
            <RotateCcw size={13} />
            <span>Reset Search</span>
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="routines-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              style={{
                background: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-xs)"
              }}
            >
              <div style={{ height: "205px", background: "linear-gradient(90deg, #F1F5F9 0%, #E2E8F0 50%, #F1F5F9 100%)", backgroundSize: "200% 100%", animation: "pulse 1.5s infinite" }} />
              <div style={{ padding: "1.25rem" }}>
                <div style={{ height: "20px", background: "#E2E8F0", borderRadius: "4px", width: "70%", marginBottom: "0.75rem" }} />
                <div style={{ height: "14px", background: "#F1F5F9", borderRadius: "4px", width: "40%", marginBottom: "1.25rem" }} />
                <div style={{ height: "36px", background: "#E2E8F0", borderRadius: "var(--radius-lg)" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div
          style={{
            background: "#FEF2F2",
            border: "1.5px solid #FECDD3",
            borderRadius: "var(--radius-xl)",
            padding: "2.5rem 1.5rem",
            textAlign: "center"
          }}
        >
          <AlertCircle size={42} style={{ color: "#DC2626", margin: "0 auto 0.75rem" }} />
          <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#991B1B", marginBottom: "0.4rem" }}>
            {error}
          </h4>
          <button type="button" onClick={fetchFoodData} className="btn btn-primary btn-sm">
            <RotateCcw size={15} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && foods.length === 0 && (
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
          <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🍲</div>
          <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
            No matching foods found for "{activeSearch || query}".
          </h4>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
            Try searching for authentic Indian or global dishes like Biryani, Dosa, Pizza, Pasta, or Ragi Mudde.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            {["Biryani", "Dosa", "Pizza", "Palak Paneer"].map((suggest) => (
              <button
                key={suggest}
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleChipClick(suggest)}
              >
                Search "{suggest}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Food Cards Grid */}
      {!loading && !error && foods.length > 0 && (
        <div className="routines-grid">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onViewFood={(f) => setActiveFoodDetail(f)}
            />
          ))}
        </div>
      )}

      {/* Unified Food Details Modal */}
      {activeFoodDetail && (
        <FoodDetailsModal
          food={activeFoodDetail}
          onClose={() => setActiveFoodDetail(null)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
}
