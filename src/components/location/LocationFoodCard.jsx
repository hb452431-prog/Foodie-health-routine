import React from "react";
import {
  Clock,
  Utensils,
  ShoppingBag,
  ExternalLink,
  Flame,
  Zap,
  Heart
} from "lucide-react";
import YouTubeIcon from "../YouTubeIcon";
import FoodImage from "../FoodImage";

export default function LocationFoodCard({
  dish,
  cityName = "Bengaluru",
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
  isFavorite = false,
  onToggleFavorite
}) {
  if (!dish) return null;

  const dishName = dish.orderQuery || dish.title;
  const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(dishName)}`;
  const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(dishName)}`;

  return (
    <div className="location-dish-card glass-card">
      {/* Top Image & Floating Badges */}
      <div className="location-dish-img-wrap" style={{ position: "relative", overflow: "hidden" }}>
        <FoodImage
          dish={dish}
          alt={`Authentic ${dish.title}`}
          style={{ width: "100%", height: "100%" }}
          showAiBadge={true}
        />

        {/* Slot / Category Tag */}
        <div className="location-dish-tag">
          {dish.tag || dish.slotName || "Local Favorite"}
        </div>

        {/* Veg / Non-Veg Indicator */}
        <div className="location-dish-veg-badge">
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: dish.isVeg ? "#10B981" : "#EF4444",
              display: "inline-block"
            }}
          />
          <span>{dish.dietType || (dish.isVeg ? "Veg" : "Non-Veg")}</span>
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            type="button"
            className={`location-dish-fav-btn ${isFavorite ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(dish.id);
            }}
            title={isFavorite ? "Remove from favorites" : "Save recipe"}
            aria-label="Favorite recipe"
          >
            <Heart size={16} fill={isFavorite ? "#EF4444" : "none"} />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="location-dish-body">
        {/* Title & Prep Time */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <h3 className="location-dish-title">
            {dish.title}
          </h3>
        </div>

        <p className="location-dish-desc">
          {dish.description}
        </p>

        {/* Macros Breakdown Row */}
        <div className="location-dish-macros">
          <span className="macro-chip">
            🔥 {dish.calories} kcal
          </span>
          <span className="macro-chip">
            🍗 {dish.protein}g protein
          </span>
          <span className="macro-chip">
            🌾 {dish.carbs}g carbs
          </span>
          <span className="macro-chip">
            🥑 {dish.fat}g fat
          </span>
        </div>

        {/* Prep Time & Meta */}
        <div className="location-dish-meta-row">
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>
            <Clock size={13} style={{ color: "var(--primary-600)" }} />
            <span>Prep: {dish.prepTime || "10 min"}</span>
          </div>

          <div style={{ fontSize: "0.78rem", color: "var(--primary-700)", fontWeight: 700 }}>
            📍 In {cityName}
          </div>
        </div>

        {/* Actions Button Grid */}
        <div className="location-dish-actions">
          {/* View Recipe */}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onOpenRecipe && onOpenRecipe(dish)}
            style={{ flex: 1 }}
          >
            <Utensils size={13} />
            <span>View Recipe</span>
          </button>

          {/* Watch Recipe Video */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onOpenYouTube && onOpenYouTube(dish)}
            style={{ color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA" }}
            title="Watch curated video preparation guides"
          >
            <YouTubeIcon size={14} color="#DC2626" fill={true} />
            <span>Watch</span>
          </button>

          {/* Order Nearby */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onOpenOrder && onOpenOrder(dish)}
            style={{ color: "#D97706", background: "#FFFBEB", border: "1px solid #FDE68A" }}
            title={`Order ${dish.title} nearby on Swiggy or Zomato`}
          >
            <ShoppingBag size={13} />
            <span>Order</span>
          </button>
        </div>

        {/* Direct Swiggy & Zomato Delivery Shortcuts */}
        <div className="location-dish-delivery-row">
          <a
            href={swiggyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-pill swiggy-pill"
            title={`Order ${dishName} on Swiggy in ${cityName}`}
          >
            <span>🛵 Swiggy</span>
            <ExternalLink size={10} />
          </a>

          <a
            href={zomatoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-pill zomato-pill"
            title={`Order ${dishName} on Zomato in ${cityName}`}
          >
            <span>🍴 Zomato</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}
