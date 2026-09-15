import React, { useState } from "react";
import { Utensils, Sparkles, ImageOff } from "lucide-react";
import { useExactDishImage } from "../services/imageService";

export default function FoodImage({
  dish,
  alt = "",
  className = "",
  style = {},
  imgStyle = {},
  showAiBadge = true,
  loadingHeight = "200px"
}) {
  const [hasRuntimeError, setHasRuntimeError] = useState(false);
  const { imageUrl, imageStatus, imageSource, isAiGenerated, loading } = useExactDishImage(dish);

  const dishName = typeof dish === "object"
    ? (dish?.dishName || dish?.name || dish?.title || "Healthy Dish")
    : (dish || "Healthy Dish");

  const accessibleAlt = alt || `Authentic ${dishName}`;

  // 1. Loading State: Clean Shimmer Skeleton
  if (loading && !imageUrl) {
    return (
      <div
        className={`food-img-skeleton ${className}`}
        style={{
          width: "100%",
          height: style.height || loadingHeight,
          background: "linear-gradient(90deg, #F1F5F9 0%, #E2E8F0 50%, #F1F5F9 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-load 1.5s infinite",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          color: "var(--text-muted)",
          fontSize: "0.75rem",
          borderRadius: style.borderRadius || "inherit",
          ...style
        }}
      >
        <Utensils size={20} className="location-icon-spin" style={{ opacity: 0.5 }} />
        <span style={{ fontWeight: 600 }}>Searching exact dish image...</span>
      </div>
    );
  }

  // 2. Unavailable State: Clean Minimalist Placeholder (NEVER random food!)
  if (!imageUrl || imageStatus === "unavailable" || hasRuntimeError) {
    return (
      <div
        className={`food-img-unavailable ${className}`}
        style={{
          width: "100%",
          height: style.height || loadingHeight,
          background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
          border: "1px solid #E2E8F0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
          color: "var(--text-muted)",
          padding: "1rem",
          textAlign: "center",
          borderRadius: style.borderRadius || "inherit",
          position: "relative",
          ...style
        }}
        title={`Image unavailable for ${dishName}`}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748B"
          }}
        >
          <ImageOff size={18} />
        </div>
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>
          Image unavailable
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            color: "#94A3B8",
            maxWidth: "180px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {dishName}
        </span>
      </div>
    );
  }

  // 3. Verified or AI-Generated Image Display
  return (
    <div
      className={`food-img-container ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: style.height || "100%",
        overflow: "hidden",
        borderRadius: style.borderRadius || "inherit",
        ...style
      }}
    >
      <img
        src={imageUrl}
        alt={accessibleAlt}
        loading="lazy"
        decoding="async"
        onError={() => setHasRuntimeError(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          ...imgStyle
        }}
      />

      {/* Subtle AI-Generated Image Badge */}
      {showAiBadge && (isAiGenerated || imageSource === "ai-generated") && (
        <span
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            background: "rgba(15, 23, 42, 0.82)",
            backdropFilter: "blur(6px)",
            color: "#F8FAFC",
            fontSize: "0.68rem",
            fontWeight: 700,
            padding: "0.2rem 0.5rem",
            borderRadius: "var(--radius-full)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            pointerEvents: "none"
          }}
          title="Generated accurately by AI culinary imaging"
        >
          <Sparkles size={10} style={{ color: "#34D399" }} />
          <span>AI-generated image</span>
        </span>
      )}
    </div>
  );
}
