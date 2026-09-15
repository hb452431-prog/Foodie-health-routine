import React, { useState } from "react";
import { Utensils, Globe, Tag, ArrowRight } from "lucide-react";
import OrderDeliveryLinks from "./OrderDeliveryLinks";
import FoodImage from "./FoodImage";

export default function MealDbCard({ meal, onViewRecipe }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!meal) return null;

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
        <FoodImage
          dish={meal}
          alt={`Authentic ${title}`}
          style={{ width: "100%", height: "100%" }}
          imgStyle={{
            transition: "transform 0.4s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }}
          showAiBadge={true}
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
            padding: "0.85rem",
            pointerEvents: "none"
          }}
        >
          {/* Top Badges */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            <span style={{ fontWeight: 600 }}>{category} Recipe</span>
            <span style={{ fontWeight: 700, color: "var(--primary-700)" }}>{area} Cuisine</span>
          </div>

          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: "1rem"
            }}
          >
            {meal.instructions
              ? `${meal.instructions.slice(0, 140)}...`
              : `Authentic ${title} recipe with detailed ingredient measurements and cooking instructions.`}
          </p>
        </div>

        <div>
          {/* Delivery quick links */}
          <div style={{ marginBottom: "0.75rem" }}>
            <OrderDeliveryLinks
              dishName={title}
              cityName={area}
              size="sm"
            />
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onViewRecipe && onViewRecipe(meal)}
            style={{ width: "100%", justifyContent: "center", gap: "0.4rem" }}
          >
            <span>View Full Recipe</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
