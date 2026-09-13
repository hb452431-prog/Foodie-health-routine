import React, { useState } from "react";
import { Utensils, MapPin, Tag, ArrowRight, Sparkles, Flame } from "lucide-react";

const FALLBACK_FOOD_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

export default function FoodCard({ food, onViewFood }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!food) return null;

  const imgSrc = imgError ? FALLBACK_FOOD_IMG : (food.imageUrl || food.strMealThumb || food.image || FALLBACK_FOOD_IMG);
  const title = food.dishName || food.title || food.strMeal || "Delicious Dish";
  const region = food.stateOrRegion || food.strArea || "Authentic";
  const country = food.country || "Global";
  const cuisine = food.cuisine || (food.strArea ? `${food.strArea} Cuisine` : "Regional");
  const calories = food.calories || 350;
  const protein = food.protein || 12;

  const topHealthTag = food.healthTags?.[0] || food.dietaryTags?.[0] || (food.vegetarian ? "100% Vegetarian" : "Balanced");

  return (
    <div
      className="routine-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#FFFFFF",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
        boxShadow: isHovered ? "0 12px 28px rgba(0, 0, 0, 0.08)" : "var(--shadow-sm)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)"
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", width: "100%", height: "205px", overflow: "hidden", background: "#F1F5F9" }}>
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0.85rem"
          }}
        >
          {/* Top Badges */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.4rem" }}>
            <span
              className="badge"
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                backdropFilter: "blur(6px)",
                color: "#FFFFFF",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.25rem 0.6rem",
                borderRadius: "var(--radius-full)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <MapPin size={12} style={{ color: "#38BDF8" }} />
              <span>{region}</span>
            </span>

            {food.imageGenerated ? (
              <span
                style={{
                  background: "rgba(168, 85, 247, 0.85)",
                  backdropFilter: "blur(6px)",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  padding: "0.2rem 0.55rem",
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem"
                }}
              >
                <Sparkles size={11} />
                <span>AI Photo</span>
              </span>
            ) : (
              <span
                className="badge"
                style={{
                  background: "rgba(16, 185, 129, 0.85)",
                  backdropFilter: "blur(6px)",
                  color: "#FFFFFF",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "0.25rem 0.6rem",
                  borderRadius: "var(--radius-full)"
                }}
              >
                {topHealthTag.replace(/-/g, " ")}
              </span>
            )}
          </div>

          {/* Title on Image */}
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#FFFFFF",
              margin: 0,
              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
            title={title}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.15rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--text-secondary)", fontSize: "0.82rem", marginBottom: "0.6rem" }}>
            <span style={{ fontWeight: 600 }}>{cuisine}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--primary-700)", fontWeight: 700 }}>
              <Flame size={13} />
              {calories} kcal • {protein}g prot
            </span>
          </div>

          {food.description && (
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                lineHeight: 1.45,
                margin: "0 0 1rem 0",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}
            >
              {food.description}
            </p>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onViewFood && onViewFood(food)}
          className="btn btn-primary btn-sm"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.6rem 1rem",
            fontWeight: 700,
            borderRadius: "var(--radius-lg)"
          }}
        >
          <span>View Dish Details</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
