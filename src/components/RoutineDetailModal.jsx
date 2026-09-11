import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  Flame,
  Utensils,
  Heart,
  ShoppingBag,
  ShieldAlert,
  CheckCircle,
  Share2,
  MapPin,
  Globe,
  Sparkles
} from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";
import { getAdaptedRoutineForLocation } from "../data/regionalCuisinesData";

export default function RoutineDetailModal({
  routine,
  userProfile,
  onClose,
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
  onOpenShare,
  favoriteMeals,
  onToggleFavoriteMeal,
  isSavedRoutine,
  onToggleSaveRoutine,
  onShowToast
}) {
  const [cuisineMode, setCuisineMode] = useState("regional"); // "regional" | "global"

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!routine) return null;

  const userCountry = userProfile?.country || "India";
  const userState = userProfile?.state || "Karnataka";

  // Compute location-adapted version of this health routine
  const displayedRoutine = getAdaptedRoutineForLocation(
    routine,
    userCountry,
    userState,
    cuisineMode
  ) || routine;

  const handleShare = () => {
    if (onOpenShare) {
      onOpenShare(displayedRoutine);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast("Routine link copied to clipboard!");
    } else {
      onShowToast("Routine link ready to share!");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header with Background Image and Gradient Overlay */}
        <div className="detail-modal-header">
          <img
            src={displayedRoutine.image || routine.image}
            alt={displayedRoutine.title}
            className="detail-header-img"
          />
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="detail-header-overlay">
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <span className="badge badge-green">{displayedRoutine.category}</span>
              <span className="badge badge-amber">{displayedRoutine.badge || routine.badge}</span>
              <span className="badge badge-blue" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                <MapPin size={11} />
                <span>{userState}, {userCountry}</span>
              </span>
            </div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.3rem" }}>
              {displayedRoutine.title}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#E2E8F0", maxWidth: "600px" }}>
              {displayedRoutine.subtitle || displayedRoutine.description}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="detail-modal-body">
          {/* Action Bar (Save, Share, Macros summary) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              paddingBottom: "1.25rem",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "1.25rem"
            }}
          >
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <div style={{ background: "var(--bg-card-subtle)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
                <strong>{displayedRoutine.calories}</strong> <span style={{ color: "var(--text-muted)" }}>Total kcal</span>
              </div>
              <div style={{ background: "var(--bg-card-subtle)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
                <strong>{displayedRoutine.protein}g</strong> <span style={{ color: "var(--text-muted)" }}>Protein</span>
              </div>
              <div style={{ background: "var(--bg-card-subtle)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
                <strong>{displayedRoutine.carbs}g</strong> <span style={{ color: "var(--text-muted)" }}>Carbs</span>
              </div>
              <div style={{ background: "var(--bg-card-subtle)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
                <strong>{displayedRoutine.fat}g</strong> <span style={{ color: "var(--text-muted)" }}>Fats</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className={`btn btn-sm ${isSavedRoutine ? "btn-accent" : "btn-secondary"}`}
                onClick={() => onToggleSaveRoutine(routine.id)}
              >
                <Heart size={15} fill={isSavedRoutine ? "#FFFFFF" : "none"} />
                <span>{isSavedRoutine ? "Saved in My Library" : "Save Routine"}</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={handleShare}
                title="Share routine link"
              >
                <Share2 size={15} />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Location-Aware Regional vs Global Dishes Toggle */}
          <div
            style={{
              background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)",
              border: "1.5px solid #86EFAC",
              borderRadius: "var(--radius-lg)",
              padding: "0.85rem 1rem",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 800, color: "#14532D", fontSize: "0.9rem" }}>
                <Sparkles size={16} color="#059669" />
                <span>Cultural Cuisine Adaptation ({userState}, {userCountry})</span>
              </div>
              <p style={{ fontSize: "0.78rem", color: "#15803D", margin: "0.15rem 0 0" }}>
                Showing healthy {cuisineMode === "regional" ? `traditional ${userState} dishes` : "standard / Western dishes"} tailored for this routine.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.35rem", background: "#FFFFFF", padding: "0.25rem", borderRadius: "var(--radius-full)", border: "1px solid #BAE6FD" }}>
              <button
                type="button"
                onClick={() => setCuisineMode("regional")}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  background: cuisineMode === "regional" ? "#059669" : "transparent",
                  color: cuisineMode === "regional" ? "#FFFFFF" : "var(--text-secondary)",
                  transition: "all 0.15s ease"
                }}
              >
                📍 {userState} Dishes
              </button>
              <button
                type="button"
                onClick={() => setCuisineMode("global")}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  background: cuisineMode === "global" ? "#0F382A" : "transparent",
                  color: cuisineMode === "global" ? "#FFFFFF" : "var(--text-secondary)",
                  transition: "all 0.15s ease"
                }}
              >
                🌎 Western / Global
              </button>
            </div>
          </div>

          {/* Medical Educational Disclaimer Note */}
          <div
            style={{
              background: "#FEF3C7",
              border: "1px solid #FDE68A",
              borderRadius: "var(--radius-md)",
              padding: "0.9rem 1.1rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              marginBottom: "1.75rem",
              fontSize: "0.82rem",
              color: "#92400E",
              lineHeight: 1.45
            }}
          >
            <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: "2px", color: "#D97706" }} />
            <div>
              <strong>Important Guidance: </strong>
              {routine.disclaimer || "For general educational guidance only. Consult a qualified healthcare professional or certified dietitian for personalized medical nutrition advice."}
            </div>
          </div>

          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
            Daily Meal Timeline ({displayedRoutine.dailyTimeline?.length || 6} Meals)
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Follow this structured timeline throughout your day for peak metabolic response, steady energy, and health goal satisfaction.
          </p>

          {/* Daily Timeline */}
          <div className="timeline-container">
            {displayedRoutine.dailyTimeline && displayedRoutine.dailyTimeline.map((meal) => {
              const isFav = favoriteMeals.includes(meal.id);
              const dishName = meal.orderQuery || meal.title;
              const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(dishName)}`;
              const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(dishName)}`;

              return (
                <div key={meal.id} className="timeline-slot">
                  {/* Timeline Node */}
                  <div className="timeline-dot">
                    <span>{meal.emoji || "🥗"}</span>
                  </div>

                  {/* Slot Time Header */}
                  <div className="timeline-time-tag">
                    <span>{meal.slotName}</span> • <span>{meal.time}</span>
                  </div>

                  {/* Meal Card */}
                  <div className="meal-card-timeline">
                    <div className="meal-card-top">
                      {meal.image && (
                        <img
                          src={meal.image}
                          alt={meal.title}
                          className="meal-img-timeline"
                          loading="lazy"
                        />
                      )}
                      <div className="meal-card-content">
                        <div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.25rem" }}>
                            <span
                              style={{
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                color: meal.isVeg ? "#059669" : "#DC2626",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem"
                              }}
                            >
                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  backgroundColor: meal.isVeg ? "#10B981" : "#EF4444",
                                  display: "inline-block"
                                }}
                              />
                              <span>{meal.dietType || (meal.isVeg ? "Veg" : "Non-Veg")}</span>
                            </span>

                            <button
                              onClick={() => onToggleFavoriteMeal(meal.id)}
                              className={`fav-btn ${isFav ? "active" : ""}`}
                              title={isFav ? "Remove from favorite recipes" : "Add to favorite recipes"}
                              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.2rem" }}
                            >
                              <Heart size={17} fill={isFav ? "#EF4444" : "none"} color={isFav ? "#EF4444" : "var(--text-muted)"} />
                            </button>
                          </div>

                          <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                            {meal.title}
                          </h4>
                          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.75rem", lineHeight: 1.45 }}>
                            {meal.description}
                          </p>
                        </div>

                        {/* Nutrition Macros Pill Bar */}
                        <div className="meal-macros-row">
                          <span className="macro-pill">
                            🔥 {meal.calories} kcal
                          </span>
                          <span className="macro-pill">
                            🍗 {meal.protein}g protein
                          </span>
                          <span className="macro-pill">
                            🌾 {meal.carbs}g carbs
                          </span>
                          <span className="macro-pill">
                            🥑 {meal.fat}g fat
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Meal Card Actions (Recipe, YouTube, Swiggy, Zomato) */}
                    <div className="meal-card-actions">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onOpenRecipe(meal, displayedRoutine)}
                      >
                        <Utensils size={14} />
                        <span>View Recipe</span>
                      </button>

                      {onOpenYouTube && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onOpenYouTube(meal)}
                          style={{ color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA" }}
                          title="Watch video preparation guides"
                        >
                          <YouTubeIcon size={14} color="#DC2626" fill={true} />
                          <span>Watch Video</span>
                        </button>
                      )}

                      {onOpenOrder && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onOpenOrder(meal)}
                          style={{ color: "#D97706", background: "#FFFBEB", border: "1px solid #FDE68A" }}
                          title="Order food delivery"
                        >
                          <ShoppingBag size={14} />
                          <span>Order Food</span>
                        </button>
                      )}

                      {/* Direct Swiggy & Zomato Quick Delivery Pills */}
                      <a
                        href={swiggyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          padding: "0.35rem 0.65rem",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(252, 128, 25, 0.1)",
                          color: "#C2410C",
                          border: "1px solid rgba(252, 128, 25, 0.25)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textDecoration: "none"
                        }}
                        title={`Search "${dishName}" on Swiggy`}
                      >
                        <span>🛵 Swiggy</span>
                      </a>

                      <a
                        href={zomatoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          padding: "0.35rem 0.65rem",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(226, 55, 68, 0.1)",
                          color: "#B91C1C",
                          border: "1px solid rgba(226, 55, 68, 0.25)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textDecoration: "none"
                        }}
                        title={`Search "${dishName}" on Zomato`}
                      >
                        <span>🍴 Zomato</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
