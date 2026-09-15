import React, { useState } from "react";
import { Utensils, MapPin, Tag, ArrowRight, Sparkles, Flame } from "lucide-react";
import OrderDeliveryLinks from "./OrderDeliveryLinks";
import FoodImage from "./FoodImage";

export default function FoodCard({ food, onViewFood }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!food) return null;

  const title = food.dishName || food.title || food.strMeal || "Authentic Dish";
  const region = food.stateOrRegion || food.region || food.strArea || "Authentic";
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
      {/* Thumbnail with exact dish image */}
      <div style={{ position: "relative", width: "100%", height: "205px", overflow: "hidden", background: "#F1F5F9" }}>
        <FoodImage
          dish={food}
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
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0.85rem",
            pointerEvents: "none"
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
              <Flame size={14} fill="#059669" color="#059669" />
              <span>{calories} kcal</span>
            </span>
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
            {food.description || `Authentic ${title} crafted with wholesome traditional ingredients.`}
          </p>
        </div>

        <div>
          {/* Quick Macro Specs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              background: "var(--bg-main)",
              padding: "0.5rem",
              borderRadius: "var(--radius-md)",
              textAlign: "center",
              marginBottom: "0.9rem",
              fontSize: "0.75rem"
            }}
          >
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.68rem" }}>Protein</div>
              <div style={{ fontWeight: 800, color: "var(--primary-900)" }}>{protein}g</div>
            </div>
            <div style={{ borderLeft: "1px solid var(--border-subtle)", borderRight: "1px solid var(--border-subtle)" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.68rem" }}>Carbs</div>
              <div style={{ fontWeight: 800, color: "var(--primary-900)" }}>{food.carbs || 45}g</div>
            </div>
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.68rem" }}>Fats</div>
              <div style={{ fontWeight: 800, color: "var(--primary-900)" }}>{food.fat || 8}g</div>
            </div>
          </div>

          {/* Delivery quick links */}
          <div style={{ marginBottom: "0.75rem" }}>
            <OrderDeliveryLinks
              dishName={title}
              cityName={region}
              size="sm"
            />
          </div>

          {/* Actions */}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onViewFood && onViewFood(food)}
            style={{ width: "100%", justifyContent: "center", gap: "0.4rem" }}
          >
            <span>View Recipe & Macros</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
