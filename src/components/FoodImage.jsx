import React, { useState } from "react";
import { Utensils, Sparkles, ImageOff, RefreshCw, Wand2, Database } from "lucide-react";
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
  const {
    imageUrl,
    imageStatus,
    imageSource,
    isAiGenerated,
    loading,
    loadingPhase,
    userMessage,
    error,
    retry
  } = useExactDishImage(dish);

  const dishName = typeof dish === "object"
    ? (dish?.dishName || dish?.name || dish?.title || "Healthy Dish")
    : (dish || "Healthy Dish");

  const accessibleAlt = alt || `Authentic ${dishName}`;

  const handleRetry = (e) => {
    e.stopPropagation();
    setHasRuntimeError(false);
    if (typeof retry === "function") {
      retry();
    }
  };

  // 1. Loading State: Progressive multi-phase shimmer with dynamic status
  if (loading && !imageUrl) {
    let phaseText = "Finding image...";
    let PhaseIcon = Utensils;

    if (loadingPhase === "generating") {
      phaseText = "Generating image with AI...";
      PhaseIcon = Wand2;
    } else if (loadingPhase === "saving") {
      phaseText = "Saving image...";
      PhaseIcon = Database;
    }

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
          fontSize: "0.78rem",
          borderRadius: style.borderRadius || "inherit",
          padding: "1rem",
          textAlign: "center",
          ...style
        }}
      >
        <PhaseIcon size={22} className="location-icon-spin" style={{ opacity: 0.6, color: "var(--primary, #10B981)" }} />
        <span style={{ fontWeight: 600, color: "var(--text-main, #334155)" }}>{phaseText}</span>
        <span style={{ fontSize: "0.7rem", color: "var(--text-muted, #94A3B8)", maxWidth: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {dishName}
        </span>
      </div>
    );
  }

  // 2. Unavailable / Failed State: Clean Minimalist Card with Safe Retry Button (NEVER random food!)
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
        title={error || `Image for ${dishName}`}
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
          Image temporarily unavailable
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            color: "#94A3B8",
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {dishName}
        </span>

        {/* Safe User Retry Button */}
        <button
          type="button"
          onClick={handleRetry}
          style={{
            marginTop: "0.35rem",
            background: "#FFFFFF",
            border: "1px solid #CBD5E1",
            borderRadius: "var(--radius-full, 9999px)",
            padding: "0.25rem 0.65rem",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "#0F766E",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0F766E")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#CBD5E1")}
        >
          <RefreshCw size={11} />
          <span>Try again</span>
        </button>
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
            borderRadius: "var(--radius-full, 9999px)",
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
