import React, { useState, useEffect } from "react";
import {
  X,
  Globe,
  Tag,
  Utensils,
  MapPin,
  ExternalLink,
  Play,
  Sparkles,
  BookOpen,
  Heart,
  Flame,
  ShieldAlert,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";
import OrderDeliveryLinks from "./OrderDeliveryLinks";
import { generateAndStoreFoodImage } from "../services/foodService";

const FALLBACK_FOOD_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80";

export default function FoodDetailsModal({
  food,
  onClose,
  onShowToast,
  isFavorite = false,
  onToggleFavorite
}) {
  const [currentFood, setCurrentFood] = useState(food);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setCurrentFood(food);
    setCheckedIngredients({});
    setImgError(false);
  }, [food]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!currentFood) return null;

  const title = currentFood.dishName || currentFood.title || currentFood.strMeal || "Nutritious Dish";
  const image = imgError ? FALLBACK_FOOD_IMG : (currentFood.imageUrl || currentFood.strMealThumb || currentFood.image || FALLBACK_FOOD_IMG);
  const cuisine = currentFood.cuisine || (currentFood.strArea ? `${currentFood.strArea} Cuisine` : "Global");
  const region = currentFood.stateOrRegion || currentFood.strArea || "Authentic";
  const country = currentFood.country || "Global";
  const category = currentFood.category || currentFood.strCategory || "Main Course";
  const calories = currentFood.calories || 380;
  const protein = currentFood.protein || 14;
  const carbs = currentFood.carbs || 55;
  const fat = currentFood.fat || 8;
  const ingredients = Array.isArray(currentFood.ingredients) ? currentFood.ingredients : [];
  const steps = Array.isArray(currentFood.preparation) ? currentFood.preparation : Array.isArray(currentFood.steps) ? currentFood.steps : [];
  const healthTags = Array.isArray(currentFood.healthTags) ? currentFood.healthTags : [];
  const dietaryTags = Array.isArray(currentFood.dietaryTags) ? currentFood.dietaryTags : [];
  const youtubeUrl = currentFood.youtubeUrl || currentFood.strYoutube;

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleGenerateAiImage = async () => {
    setIsGeneratingImg(true);
    try {
      const res = await generateAndStoreFoodImage(currentFood.id, `Authentic ${cuisine} ${title} from ${region}, ${country}`);
      if (res && res.imageUrl) {
        setCurrentFood((prev) => ({
          ...prev,
          imageUrl: res.imageUrl,
          imageSource: "AI_GENERATED",
          imageGenerated: true
        }));
        if (onShowToast) {
          onShowToast("✨ Generated & stored authentic AI dish photo!");
        }
      }
    } catch (err) {
      if (onShowToast) {
        onShowToast("Image generation is temporarily unavailable.");
      }
    } finally {
      setIsGeneratingImg(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "880px", maxHeight: "90vh", display: "flex", flexDirection: "column" }}
      >
        {/* Visual Hero Header */}
        <div style={{ position: "relative", height: "290px", flexShrink: 0, background: "#0F172A", overflow: "hidden" }}>
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Close Button */}
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

          {/* Overlay info */}
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
            {/* Top Tag Badges */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
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
                <MapPin size={13} />
                <span>{region}, {country}</span>
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
                <span>{cuisine}</span>
              </span>

              {/* Source / AI Generated Badge */}
              {currentFood.imageGenerated ? (
                <span
                  style={{
                    background: "rgba(168, 85, 247, 0.25)",
                    color: "#C084FC",
                    border: "1px solid rgba(168, 85, 247, 0.4)",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  <Sparkles size={12} />
                  <span>AI-Generated Image</span>
                </span>
              ) : currentFood.imageSource === "THEMEALDB" ? (
                <span
                  style={{
                    background: "rgba(234, 88, 12, 0.25)",
                    color: "#FB923C",
                    border: "1px solid rgba(234, 88, 12, 0.4)",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  TheMealDB
                </span>
              ) : (
                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "#F8FAFC",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  Verified Recipe
                </span>
              )}
            </div>

            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#FFFFFF", margin: 0, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              {title}
            </h2>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div style={{ padding: "1.75rem", overflowY: "auto", flex: 1 }}>
          {/* Quick Macro Bar */}
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
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)" }}>{calories} kcal</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Protein</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#059669" }}>{protein}g</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Carbohydrates</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#D97706" }}>{carbs}g</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Healthy Fats</span>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#475569" }}>{fat}g</div>
            </div>
          </div>

          {/* Description */}
          {currentFood.description && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                {currentFood.description}
              </p>
            </div>
          )}

          {/* Health & Dietary Badges */}
          {(healthTags.length > 0 || dietaryTags.length > 0) && (
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                ✨ Health & Dietary Profile:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {healthTags.map((tag, i) => (
                  <span
                    key={`h-${i}`}
                    style={{
                      background: "#ECFDF5",
                      color: "#065F46",
                      border: "1px solid #A7F3D0",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      textTransform: "capitalize"
                    }}
                  >
                    ✓ {tag.replace(/-/g, " ")}
                  </span>
                ))}
                {dietaryTags.map((tag, i) => (
                  <span
                    key={`d-${i}`}
                    style={{
                      background: "#EFF6FF",
                      color: "#1E40AF",
                      border: "1px solid #BFDBFE",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      textTransform: "capitalize"
                    }}
                  >
                    {tag.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 2-Column Grid: Ingredients Checklist vs Cooking Preparation */}
          <div className="recipe-modal-grid" style={{ marginBottom: "2rem" }}>
            {/* Ingredients Column */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-900)", display: "flex", alignItems: "center", gap: "0.4rem", margin: 0 }}>
                  <Utensils size={18} style={{ color: "var(--primary-600)" }} />
                  <span>Ingredients Checklist ({ingredients.length})</span>
                </h4>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Tap to check
                </span>
              </div>

              {ingredients.length > 0 ? (
                <ul className="ingredient-checklist" style={{ maxHeight: "360px", overflowY: "auto", paddingRight: "0.25rem" }}>
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
                  Standard authentic ingredients used for this recipe.
                </p>
              )}
            </div>

            {/* Preparation Steps Column */}
            <div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", margin: 0 }}>
                <BookOpen size={18} style={{ color: "var(--primary-600)" }} />
                <span>Step-by-Step Preparation</span>
              </h4>

              {steps.length > 0 ? (
                <div className="recipe-steps-list" style={{ maxHeight: "360px", overflowY: "auto", paddingRight: "0.25rem" }}>
                  {steps.map((step, idx) => (
                    <div key={idx} className="recipe-step-item">
                      <div className="step-number-badge">{idx + 1}</div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.55 }}>
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  Follow traditional cooking directions for this authentic dish.
                </p>
              )}
            </div>
          </div>

          {/* YouTube Video Guide if available */}
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
                    Watch Video Recipe Tutorial
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#B91C1C", margin: 0 }}>
                    Step-by-step masterclass walk-through on YouTube for {title}
                  </p>
                </div>
              </div>

              <a
                href={youtubeUrl.startsWith("http") ? youtubeUrl : `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeUrl)}`}
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

          {/* Quick Ordering Online (Swiggy / Zomato) */}
          <OrderDeliveryLinks dishName={title} variant="banner" showCityBadge={true} />

          {/* Standard Medical & Educational Disclaimer */}
          <div
            style={{
              marginTop: "1.75rem",
              padding: "0.85rem 1rem",
              background: "#F8FAF9",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem"
            }}
          >
            <ShieldAlert size={16} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.45, margin: 0 }}>
              <strong>Medical Disclaimer: </strong> This dish information is provided for general nutritional education and may be suitable as part of a balanced diet. It is not intended to treat, cure, or replace advice from a qualified healthcare practitioner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
