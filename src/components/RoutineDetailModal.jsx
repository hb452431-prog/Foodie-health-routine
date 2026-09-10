import { X, Clock, Flame, Utensils, Heart, ShoppingBag, ShieldAlert, CheckCircle, Share2 } from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";

export default function RoutineDetailModal({
  routine,
  onClose,
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
  favoriteMeals,
  onToggleFavoriteMeal,
  isSavedRoutine,
  onToggleSaveRoutine,
  onShowToast
}) {
  if (!routine) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
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
            src={routine.image}
            alt={routine.title}
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
              <span className="badge badge-green">{routine.category}</span>
              <span className="badge badge-amber">{routine.badge}</span>
            </div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.3rem" }}>
              {routine.title}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#E2E8F0", maxWidth: "600px" }}>
              {routine.subtitle || routine.description}
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
              marginBottom: "1.5rem"
            }}
          >
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <div style={{ background: "var(--bg-card-subtle)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
                <strong>{routine.calories}</strong> <span style={{ color: "var(--text-muted)" }}>Total kcal</span>
              </div>
              <div style={{ background: "var(--bg-card-subtle)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
                <strong>{routine.protein}g</strong> <span style={{ color: "var(--text-muted)" }}>Protein</span>
              </div>
              <div style={{ background: "var(--bg-card-subtle)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
                <strong>{routine.carbs}g</strong> <span style={{ color: "var(--text-muted)" }}>Carbs</span>
              </div>
              <div style={{ background: "var(--bg-card-subtle)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem" }}>
                <strong>{routine.fat}g</strong> <span style={{ color: "var(--text-muted)" }}>Fats</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className={`btn btn-sm ${isSavedRoutine ? "btn-accent" : "btn-secondary"}`}
                onClick={() => onToggleSaveRoutine(routine.id)}
              >
                <Heart size={15} fill={isSavedRoutine ? "#FFFFFF" : "none"} />
                <span>{isSavedRoutine ? "Saved in My Plan" : "Save Routine"}</span>
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

          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.5rem" }}>
            Daily Meal Timeline
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Follow this structured timeline throughout your day for peak metabolic response and energy.
          </p>

          {/* Daily Timeline */}
          <div className="timeline-container">
            {routine.dailyTimeline && routine.dailyTimeline.map((meal) => {
              const isFav = favoriteMeals.includes(meal.id);

              return (
                <div key={meal.id} className="timeline-slot">
                  {/* Timeline Node */}
                  <div className="timeline-dot">
                    <span>{meal.emoji}</span>
                  </div>

                  {/* Slot Time Header */}
                  <div className="timeline-time-tag">
                    <span>{meal.slotName}</span> • <span>{meal.time}</span>
                  </div>

                  {/* Meal Card */}
                  <div className="meal-card-timeline">
                    <div className="meal-card-top">
                      <img
                        src={meal.image}
                        alt={meal.title}
                        className="meal-img-timeline"
                        loading="lazy"
                      />
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
                              {meal.dietType || (meal.isVeg ? "Vegetarian" : "Non-Veg")}
                            </span>

                            <button
                              onClick={() => onToggleFavoriteMeal(meal.id)}
                              style={{
                                color: isFav ? "#EF4444" : "var(--text-muted)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "0.2rem"
                              }}
                              title={isFav ? "Saved in favorite meals" : "Save meal to favorites"}
                            >
                              <Heart size={18} fill={isFav ? "#EF4444" : "none"} />
                            </button>
                          </div>

                          <h4 className="meal-title">{meal.title}</h4>
                          <p className="meal-desc">{meal.description}</p>
                        </div>

                        {/* Nutrition Pills */}
                        <div className="meal-pill-group">
                          <span style={{ color: "var(--primary-800)", background: "#ECFDF5", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                            🔥 {meal.calories} kcal
                          </span>
                          <span style={{ color: "#0369A1", background: "#F0F9FF", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                            🍗 {meal.protein}g protein
                          </span>
                          <span style={{ color: "#B45309", background: "#FEF3C7", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                            🌾 {meal.carbs}g carbs
                          </span>
                          <span style={{ color: "var(--text-muted)", background: "var(--bg-card-subtle)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                            ⏱️ {meal.prepTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Meal Actions Row */}
                    <div className="meal-actions-row">
                      <div className="meal-actions-left">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onOpenRecipe(meal, routine)}
                        >
                          <Utensils size={14} />
                          <span>View Recipe</span>
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onOpenYouTube(meal)}
                          style={{ color: "#DC2626" }}
                        >
                          <YouTubeIcon size={15} color="#DC2626" />
                          <span>Watch Video</span>
                        </button>
                      </div>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onOpenOrder(meal)}
                        style={{ color: "#D97706" }}
                      >
                        <ShoppingBag size={14} />
                        <span>Order Food</span>
                      </button>
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
