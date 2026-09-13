import React, { useState } from "react";
import { Utensils, Globe, Tag, ArrowRight } from "lucide-react";
import OrderDeliveryLinks from "./OrderDeliveryLinks";

// Safe fallback image if CDN thumbnail fails to load
const FALLBACK_DISH_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

export default function MealDbCard({ meal, onViewRecipe }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!meal) return null;

  const imgSrc = imgError ? FALLBACK_DISH_IMG : (meal.strMealThumb || meal.image || FALLBACK_DISH_IMG);
  const title = meal.strMeal || meal.title || "Delicious Dish";
  const area = meal.strArea || meal.area || "Global";
  const category = meal.strCategory || meal.category || "Specialty";

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
      {/* Visual Thumbnail */}
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden", background: "#F1F5F9" }}>
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
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)",
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
              <Globe size={12} style={{ color: "#38BDF8" }} />
              <span>{area}</span>
            </span>

            <span
              className="badge"
              style={{
                background: "rgba(16, 185, 129, 0.85)",
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
              <Tag size={12} />
              <span>{category}</span>
            </span>
          </div>

          {/* Bottom Title on Image */}
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

      {/* Card Body */}
      <div style={{ padding: "1.15rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-secondary)", fontSize: "0.82rem", marginBottom: "0.4rem" }}>
            <Utensils size={14} style={{ color: "var(--primary-600)" }} />
            <span>Authentic {area} Cuisine Recipe</span>
          </div>

          {meal.tags && meal.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.4rem" }}>
              {meal.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: "0.72rem",
                    background: "var(--bg-card-subtle)",
                    color: "var(--text-secondary)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: View Recipe + Swiggy / Zomato Ordering */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <button
            type="button"
            onClick={() => onViewRecipe && onViewRecipe(meal)}
            className="btn btn-primary btn-sm"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.55rem 1rem",
              fontWeight: 700,
              borderRadius: "var(--radius-lg)"
            }}
          >
            <Utensils size={14} />
            <span>View Recipe</span>
            <ArrowRight size={14} />
          </button>

          {/* Quick Online Order Links */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.35rem" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>Order:</span>
            <OrderDeliveryLinks dishName={title} variant="pills" />
          </div>
        </div>
      </div>
    </div>
  );
}
