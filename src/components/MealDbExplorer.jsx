import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Globe, Tag, Sparkles, RotateCcw, Shuffle, AlertCircle, ChefHat } from "lucide-react";
import MealDbCard from "./MealDbCard";
import MealDbRecipeModal from "./MealDbRecipeModal";
import {
  searchMeals,
  getMealsByArea,
  getMealsByCategory,
  getCategories,
  getAreas,
  getRandomMeal
} from "../services/mealDbService";

// Popular curated search suggestions
const QUICK_SEARCH_CHIPS = [
  "Biryani",
  "Pizza",
  "Pasta",
  "Dosa",
  "Ramen",
  "Tacos",
  "Fried Rice",
  "Chicken Curry",
  "Salmon",
  "Pancakes"
];

// Curated popular world cuisines
const POPULAR_AREAS = [
  "All Cuisines",
  "Indian",
  "Italian",
  "Chinese",
  "Japanese",
  "Mexican",
  "American",
  "British",
  "Canadian",
  "French",
  "Greek"
];

export default function MealDbExplorer({ onShowToast }) {
  const [query, setQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("Biryani"); // Initial popular search
  const [selectedArea, setSelectedArea] = useState("All Cuisines");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dynamic filter options loaded from API
  const [allCategories, setAllCategories] = useState([]);
  const [allAreas, setAllAreas] = useState(POPULAR_AREAS);

  // Active modal recipe
  const [activeRecipeMeal, setActiveRecipeMeal] = useState(null);

  // Load categories and areas on mount
  useEffect(() => {
    let isMounted = true;
    async function loadMetadata() {
      try {
        const [cats, areas] = await Promise.all([getCategories(), getAreas()]);
        if (isMounted) {
          if (Array.isArray(cats) && cats.length > 0) {
            setAllCategories(["All", ...cats.map((c) => c.name)]);
          }
          if (Array.isArray(areas) && areas.length > 0) {
            // Keep common popular ones at the front
            const combined = Array.from(new Set([...POPULAR_AREAS, ...areas]));
            setAllAreas(combined);
          }
        }
      } catch (err) {
        console.warn("Could not load TheMealDB metadata:", err);
      }
    }
    loadMetadata();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch meals based on current query / filter
  const fetchMealsData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let results = [];

      if (selectedCategory !== "All") {
        results = await getMealsByCategory(selectedCategory);
      } else if (selectedArea !== "All Cuisines") {
        results = await getMealsByArea(selectedArea);
      } else {
        const searchTerm = activeSearch.trim() || "Biryani";
        results = await searchMeals(searchTerm);
      }

      setMeals(results);
    } catch (err) {
      console.error("TheMealDB fetch error:", err);
      setError("Unable to load dishes right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [activeSearch, selectedArea, selectedCategory]);

  useEffect(() => {
    fetchMealsData();
  }, [fetchMealsData]);

  // Handle Search Input Form Submit
  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setSelectedArea("All Cuisines");
    setSelectedCategory("All");
    setActiveSearch(query.trim());
  };

  const handleChipClick = (dishName) => {
    setQuery(dishName);
    setSelectedArea("All Cuisines");
    setSelectedCategory("All");
    setActiveSearch(dishName);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setSelectedCategory("All");
    setQuery("");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedArea("All Cuisines");
    setQuery("");
  };

  const handleRandomDish = async () => {
    setLoading(true);
    try {
      const randomDish = await getRandomMeal();
      if (randomDish) {
        setActiveRecipeMeal(randomDish);
        if (onShowToast) {
          onShowToast(`🎲 Discovered: ${randomDish.strMeal}!`);
        }
      }
    } catch (err) {
      if (onShowToast) {
        onShowToast("Unable to fetch random dish. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setActiveSearch("Biryani");
    setSelectedArea("All Cuisines");
    setSelectedCategory("All");
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Explorer Header & Search Toolbar */}
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
        {/* Search Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--primary-600)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.2rem" }}>
              <ChefHat size={16} />
              <span>Live Global Food & Recipe Database</span>
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
              Search Dishes & Authentic Recipes
            </h3>
          </div>

          {/* Random Meal Surprise Button */}
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

        {/* Main Search Input Form */}
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
              placeholder="Search dishes, cuisines or recipes (e.g. Biryani, Pizza, Pasta, Dosa, Ramen)..."
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

        {/* Popular Quick-Search Suggestions Chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>Popular:</span>
          {QUICK_SEARCH_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="badge"
              style={{
                background: activeSearch.toLowerCase() === chip.toLowerCase() && selectedArea === "All Cuisines" && selectedCategory === "All"
                  ? "var(--primary-800)"
                  : "var(--bg-card-subtle)",
                color: activeSearch.toLowerCase() === chip.toLowerCase() && selectedArea === "All Cuisines" && selectedCategory === "All"
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

        {/* Area / Cuisine Filter Chips Carousel */}
        <div style={{ paddingTop: "0.85rem", borderTop: "1px solid var(--border-subtle)", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--primary-900)" }}>
            <Globe size={14} style={{ color: "var(--primary-600)" }} />
            <span>Filter by World Cuisine / Area:</span>
          </div>

          <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.4rem", scrollbarWidth: "thin" }}>
            {allAreas.slice(0, 16).map((area) => {
              const isSelected = selectedArea === area;
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => handleAreaSelect(area)}
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
                  {area}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Chips Carousel */}
        {allCategories.length > 0 && (
          <div style={{ paddingTop: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--primary-900)" }}>
              <Tag size={14} style={{ color: "var(--primary-600)" }} />
              <span>Filter by Dish Category:</span>
            </div>

            <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.4rem", scrollbarWidth: "thin" }}>
              {allCategories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className="badge"
                    style={{
                      background: isSelected ? "var(--primary-700)" : "var(--bg-card-subtle)",
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
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--primary-900)" }}>
          {loading ? (
            "Searching dishes from TheMealDB..."
          ) : (
            `Showing ${meals.length} ${meals.length === 1 ? "dish" : "dishes"} ${
              selectedCategory !== "All"
                ? `in "${selectedCategory}"`
                : selectedArea !== "All Cuisines"
                ? `from "${selectedArea}"`
                : `for "${activeSearch}"`
            }`
          )}
        </div>

        {(selectedArea !== "All Cuisines" || selectedCategory !== "All" || activeSearch !== "Biryani") && (
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

      {/* ============================================================
         STATE 1: LOADING SKELETON
      ============================================================ */}
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
              <div style={{ height: "200px", background: "linear-gradient(90deg, #F1F5F9 0%, #E2E8F0 50%, #F1F5F9 100%)", backgroundSize: "200% 100%", animation: "pulse 1.5s infinite" }} />
              <div style={{ padding: "1.25rem" }}>
                <div style={{ height: "20px", background: "#E2E8F0", borderRadius: "4px", width: "70%", marginBottom: "0.75rem" }} />
                <div style={{ height: "14px", background: "#F1F5F9", borderRadius: "4px", width: "40%", marginBottom: "1.25rem" }} />
                <div style={{ height: "36px", background: "#E2E8F0", borderRadius: "var(--radius-lg)" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================
         STATE 2: ERROR STATE
      ============================================================ */}
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
            Unable to load dishes right now. Please try again.
          </h4>
          <p style={{ color: "#B91C1C", fontSize: "0.88rem", maxWidth: "450px", margin: "0 auto 1.25rem" }}>
            Please check your internet connection or retry the request.
          </p>
          <button type="button" onClick={fetchMealsData} className="btn btn-primary btn-sm">
            <RotateCcw size={15} />
            <span>Retry Search</span>
          </button>
        </div>
      )}

      {/* ============================================================
         STATE 3: EMPTY STATE
      ============================================================ */}
      {!loading && !error && meals.length === 0 && (
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
            No dishes found for "{query || activeSearch}". Try another dish name.
          </h4>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
            TheMealDB open catalog contains thousands of global recipes. Try popular terms like Biryani, Pizza, Pasta, Dosa, Ramen, or Chicken.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            {["Biryani", "Pizza", "Pasta", "Chicken"].map((suggest) => (
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

      {/* ============================================================
         STATE 4: RESPONSIVE CARDS GRID
      ============================================================ */}
      {!loading && !error && meals.length > 0 && (
        <div className="routines-grid">
          {meals.map((meal) => (
            <MealDbCard
              key={meal.idMeal || meal.id}
              meal={meal}
              onViewRecipe={(m) => setActiveRecipeMeal(m)}
            />
          ))}
        </div>
      )}

      {/* Full Recipe Detail Modal */}
      {activeRecipeMeal && (
        <MealDbRecipeModal
          meal={activeRecipeMeal}
          onClose={() => setActiveRecipeMeal(null)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
}
