import React, { useState, useEffect } from "react";
import { X, Globe, Tag, Utensils, ExternalLink, Play, BookOpen } from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";
import { getMealById } from "../services/mealDbService";

const FALLBACK_DISH_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80";

export default function MealDbRecipeModal({ meal, onClose, onShowToast }) {
  const [detailedMeal, setDetailedMeal] = useState(meal);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [imgError, setImgError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // If meal has only basic fields (from category/area filter), fetch full details
  useEffect(() => {
    let isMounted = true;

    async function loadFullDetails() {
      if (!meal?.idMeal && !meal?.id) return;
      const id = meal.idMeal || meal.id;

      // If already has ingredients, no need to refetch
      if (Array.isArray(meal.ingredients) && meal.ingredients.length > 0 && meal.instructions) {
        setDetailedMeal(meal);
        return;
      }

      setLoadingDetails(true);
      try {
        const full = await getMealById(id);
        if (isMounted && full) {
          setDetailedMeal(full);
        }
      } catch (err) {
        console.error("Failed to load full recipe details:", err);
      } finally {
        if (isMounted) setLoadingDetails(false);
      }
    }

    loadFullDetails();
    return () => {
      isMounted = false;
    };
  }, [meal]);

  if (!meal) return null;

  const current = detailedMeal || meal;
  const title = current.strMeal || current.title || "Delicious Recipe";
  const image = imgError ? FALLBACK_DISH_IMG : (current.strMealThumb || current.image || FALLBACK_DISH_IMG);
  const area = current.strArea || current.area || "Global";
  const category = current.strCategory || current.category || "Main Dish";
  const youtubeUrl = current.strYoutube || current.youtubeUrl;
  const ingredients = Array.isArray(current.ingredients) ? current.ingredients : [];
  const steps = Array.isArray(current.steps) ? current.steps : [];

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(title)}`;
  const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(title)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "880px", maxHeight: "90vh", display: "flex", flexDirection: "column" }}
      >
        {/* Header Hero Image */}
        <div style={{ position: "relative", height: "280px", flexShrink: 0, background: "#0F172A", overflow: "hidden" }}>
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(15, 23, 42, 0.75)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(6px)"
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              color: "#FFFFFF"
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <span
                className="badge"
                style={{
                  background: "rgba(56, 189, 248, 0.25)",
                  color: "#38BDF8",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <Globe size={13} />
                <span>{area} Cuisine</span>
              </span>

              <span
                className="badge"
                style={{
                  background: "rgba(16, 185, 129, 0.25)",
                  color: "#34D399",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <Tag size={13} />
                <span>{category}</span>
              </span>

              {current.tags && current.tags.length > 0 && current.tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    color: "#F1F5F9",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem"
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>

            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#FFFFFF", margin: 0, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: "1.75rem", overflowY: "auto", flex: 1 }}>
          {loadingDetails ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div className="spinner" style={{ margin: "0 auto 1rem", width: "32px", height: "32px" }} />
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Loading recipe details, ingredients & cooking instructions...
              </p>
            </div>
          ) : (
            <>
              {/* 2-Column Recipe Grid: Ingredients vs Cooking Instructions */}
              <div className="recipe-modal-grid" style={{ marginBottom: "2rem" }}>
                {/* Ingredients Column */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-900)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Utensils size={18} style={{ color: "var(--primary-600)" }} />
                      <span>Ingredients Checklist ({ingredients.length})</span>
                    </h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Tap to check
                    </span>
                  </div>

                  {ingredients.length > 0 ? (
                    <ul className="ingredient-checklist" style={{ maxHeight: "380px", overflowY: "auto", paddingRight: "0.25rem" }}>
                      {ingredients.map((item, idx) => {
                        const isChecked = !!checkedIngredients[idx];
                        return (
                          <li
                            key={idx}
                            className={`ingredient-item ${isChecked ? "checked" : ""}`}
                            onClick={() => toggleIngredient(idx)}
                            style={{ cursor: "pointer", transition: "all 0.15s ease" }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              style={{ accentColor: "#10B981", cursor: "pointer", width: "16px", height: "16px" }}
                            />
                            <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ fontWeight: 600, color: isChecked ? "var(--text-muted)" : "var(--text-main)" }}>
                                {item.name}
                              </span>
                              <span style={{ color: "var(--primary-700)", fontWeight: 700, fontSize: "0.82rem", background: "var(--bg-card-subtle)", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                                {item.amount}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      Standard regional ingredients for this dish.
                    </p>
                  )}
                </div>

                {/* Instructions Column */}
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <BookOpen size={18} style={{ color: "var(--primary-600)" }} />
                    <span>Step-by-Step Preparation</span>
                  </h4>

                  {steps.length > 0 ? (
                    <div className="recipe-steps-list" style={{ maxHeight: "380px", overflowY: "auto", paddingRight: "0.25rem" }}>
                      {steps.map((step, idx) => (
                        <div key={idx} className="recipe-step-item">
                          <div className="step-number-badge">{idx + 1}</div>
                          <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.55 }}>
                            {step}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : current.instructions ? (
                    <div style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-secondary)", whiteSpace: "pre-line" }}>
                      {current.instructions}
                    </div>
                  ) : (
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      Follow standard recipe directions.
                    </p>
                  )}
                </div>
              </div>

              {/* YouTube Video Section if available */}
              {youtubeUrl && (
                <div
                  style={{
                    background: "linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%)",
                    border: "1.5px solid #FECDD3",
                    borderRadius: "var(--radius-xl)",
                    padding: "1.25rem",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "#EF4444",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
                      }}
                    >
                      <Play size={20} fill="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#991B1B" }}>
                        Watch Official Video Tutorial
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "#B91C1C", margin: 0 }}>
                        Step-by-step video walk-through on YouTube for {title}
                      </p>
                    </div>
                  </div>

                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{
                      background: "#DC2626",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.55rem 1.15rem",
                      borderRadius: "var(--radius-lg)"
                    }}
                  >
                    <YouTubeIcon size={16} color="#FFFFFF" fill={true} />
                    <span>Watch on YouTube</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              {/* Quick Online Food Delivery Ordering Links */}
              <div className="order-online-banner" style={{ marginTop: "1rem" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#9A3412", marginBottom: "0.25rem" }}>
                  Craving this dish right now?
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#C2410C", maxWidth: "500px", margin: "0 auto 0.85rem" }}>
                  Order authentic {title} from top-rated restaurants near you.
                </p>

                <div className="order-btn-group">
                  <a
                    href={swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-swiggy btn-sm"
                  >
                    <span>🛵 Search on Swiggy</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href={zomatoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-zomato btn-sm"
                  >
                    <span>🍴 Search on Zomato</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Source attribution */}
              <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.75rem", color: "var(--text-light)" }}>
                Data and recipe imagery provided by TheMealDB open database.
                {current.sourceUrl && (
                  <a
                    href={current.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "0.5rem", color: "var(--primary-600)", textDecoration: "underline" }}
                  >
                    Original Source Recipe
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
