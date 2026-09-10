import { X, Clock, Flame, Utensils, Heart, CheckCircle, ExternalLink, ShieldAlert, Sparkles } from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";

export default function RecipeModal({
  meal,
  routine,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShowToast
}) {
  const [checkedIngredients, setCheckedIngredients] = useState({});

  if (!meal) return null;

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(meal.orderQuery || meal.title)}`;
  const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(meal.orderQuery || meal.title)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "860px" }}>
        {/* Header Visual */}
        <div style={{ position: "relative", height: "260px" }}>
          <img
            src={meal.image}
            alt={meal.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.85) 100%)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              color: "#FFFFFF"
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
              <span className="badge badge-green">
                {meal.dietType || (meal.isVeg ? "100% Vegetarian" : "Non-Vegetarian")}
              </span>
              <span className="badge badge-amber">
                ⏱️ Prep: {meal.prepTime} | Cook: {meal.cookTime || "10 min"}
              </span>
            </div>
            <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.3rem" }}>
              {meal.title}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#E2E8F0" }}>
              {meal.description}
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: "1.75rem" }}>
          {/* Quick Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1.5rem",
              background: "#F8FAF9",
              padding: "1rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Calories</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)" }}>{meal.calories} kcal</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Protein</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#059669" }}>{meal.protein}g</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Carbohydrates</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#D97706" }}>{meal.carbs}g</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Healthy Fats</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#475569" }}>{meal.fat}g</div>
            </div>
          </div>

          {/* Key Benefits Pills */}
          {meal.benefits && meal.benefits.length > 0 && (
            <div style={{ marginBottom: "1.75rem" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.5rem" }}>
                ✨ Health & Metabolic Benefits
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {meal.benefits.map((benefit, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#ECFDF5",
                      color: "#065F46",
                      border: "1px solid #A7F3D0",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.82rem",
                      fontWeight: 600
                    }}
                  >
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 2-Column Recipe Grid: Ingredients vs Steps */}
          <div className="recipe-modal-grid">
            {/* Ingredients Column */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary-900)" }}>
                  Ingredients Checklist
                </h4>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Tap to check off
                </span>
              </div>

              <ul className="ingredient-checklist">
                {meal.ingredients && meal.ingredients.map((item, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <li
                      key={idx}
                      className={`ingredient-item ${isChecked ? "checked" : ""}`}
                      onClick={() => toggleIngredient(idx)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ accentColor: "#10B981", cursor: "pointer", width: "16px", height: "16px" }}
                      />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                        <span style={{ color: "var(--text-muted)", marginLeft: "0.4rem", fontSize: "0.82rem" }}>
                          ({item.amount})
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Chef Notes */}
              {meal.chefTips && (
                <div
                  style={{
                    background: "#F0FDFA",
                    border: "1px solid #99F6E4",
                    borderRadius: "var(--radius-md)",
                    padding: "0.85rem",
                    marginTop: "1.25rem",
                    fontSize: "0.82rem",
                    color: "#0F766E",
                    lineHeight: 1.45
                  }}
                >
                  <strong>💡 Nutritionist / Chef Tip: </strong>
                  {meal.chefTips}
                </div>
              )}
            </div>

            {/* Preparation Steps Column */}
            <div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary-900)" }}>
                Step-by-Step Preparation
              </h4>
              <div className="recipe-steps-list">
                {meal.steps && meal.steps.map((step, idx) => (
                  <div key={idx} className="recipe-step-item">
                    <div className="step-number-badge">{idx + 1}</div>
                    <div style={{ color: "var(--text-secondary)" }}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* YouTube Resource Section */}
          <div style={{ marginTop: "2.25rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <YouTubeIcon size={20} color="#EF4444" fill={true} />
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary-900)" }}>
                Watch Recipe & Health Video Guides
              </h4>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Explore curated culinary walk-throughs and nutritional breakdown videos.
            </p>

            <div className="youtube-resources-grid">
              {meal.youtubeVideos && meal.youtubeVideos.map((video, idx) => (
                <a
                  key={video.id || idx}
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.query || video.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-card"
                  title={`Watch "${video.title}" on YouTube`}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        background: "#FEE2E2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#DC2626",
                        flexShrink: 0
                      }}
                    >
                      <YouTubeIcon size={16} color="#DC2626" fill={true} />
                    </div>
                    <div className="youtube-card-title">{video.title}</div>
                  </div>

                  <div className="youtube-channel-tag">
                    <span>{video.channel}</span>
                    <span>⏱️ {video.duration}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* External Food Ordering Section (Swiggy / Zomato) */}
          <div className="order-online-banner">
            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#9A3412", marginBottom: "0.3rem" }}>
              Short on time? Want to order this meal instead?
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#C2410C", maxWidth: "500px", margin: "0 auto" }}>
              Order comparable healthy options directly from top health kitchens in your area via our delivery partners.
            </p>

            <div className="order-btn-group">
              <a
                href={swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-swiggy btn-sm"
              >
                <span>🛵 Order on Swiggy</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-zomato btn-sm"
              >
                <span>🍴 Order on Zomato</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Health Disclaimer */}
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              fontSize: "0.75rem",
              color: "var(--text-light)"
            }}
          >
            For general educational guidance only. Consult a qualified healthcare professional for personalized medical nutrition advice.
          </div>
        </div>
      </div>
    </div>
  );
}
