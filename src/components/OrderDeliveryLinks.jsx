import React from "react";
import { ExternalLink, ShoppingBag, MapPin } from "lucide-react";
import { useLocation } from "../context/LocationContext";

export default function OrderDeliveryLinks({
  dishName = "",
  variant = "pills", // "pills" | "buttons" | "banner" | "compact"
  style = {},
  showCityBadge = false,
  className = ""
}) {
  const { locationData } = useLocation();

  if (!dishName) return null;

  const cityName = locationData?.city || "Bengaluru";
  const cleanDish = dishName.trim();
  const queryWithCity = `${cleanDish} ${cityName}`.trim();

  const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(queryWithCity)}`;
  const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(queryWithCity)}`;

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  if (variant === "compact" || variant === "pills") {
    return (
      <div
        className={`delivery-pills-row ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          flexWrap: "wrap",
          ...style
        }}
        onClick={handleLinkClick}
      >
        <a
          href={swiggyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="order-pill order-pill-swiggy"
          title={`Order ${cleanDish} on Swiggy in ${cityName}`}
          onClick={handleLinkClick}
        >
          <span className="order-pill-icon">🛵</span>
          <span className="order-pill-text">Swiggy</span>
          <ExternalLink size={10} className="order-pill-ext" />
        </a>

        <a
          href={zomatoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="order-pill order-pill-zomato"
          title={`Order ${cleanDish} on Zomato in ${cityName}`}
          onClick={handleLinkClick}
        >
          <span className="order-pill-icon">🍴</span>
          <span className="order-pill-text">Zomato</span>
          <ExternalLink size={10} className="order-pill-ext" />
        </a>
      </div>
    );
  }

  if (variant === "buttons") {
    return (
      <div
        className={`order-buttons-group ${className}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          ...style
        }}
        onClick={handleLinkClick}
      >
        <a
          href={swiggyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-swiggy btn-sm"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.85rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            borderRadius: "var(--radius-lg)",
            textDecoration: "none"
          }}
          onClick={handleLinkClick}
        >
          <span>🛵 Order on Swiggy</span>
          <ExternalLink size={13} />
        </a>

        <a
          href={zomatoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-zomato btn-sm"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.85rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            borderRadius: "var(--radius-lg)",
            textDecoration: "none"
          }}
          onClick={handleLinkClick}
        >
          <span>🍴 Order on Zomato</span>
          <ExternalLink size={13} />
        </a>
      </div>
    );
  }

  // "banner" Variant for large modals
  return (
    <div
      className={`order-online-banner ${className}`}
      style={{
        background: "linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)",
        border: "1.5px dashed #FDBA74",
        borderRadius: "var(--radius-xl)",
        padding: "1.25rem",
        textAlign: "center",
        marginTop: "1.25rem",
        ...style
      }}
      onClick={handleLinkClick}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(251, 146, 60, 0.15)", color: "#C2410C", padding: "0.2rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.4rem" }}>
        <ShoppingBag size={13} />
        <span>FAST DELIVERY NEARBY</span>
        {showCityBadge && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", borderLeft: "1px solid rgba(194, 65, 12, 0.3)", paddingLeft: "0.4rem", marginLeft: "0.2rem" }}>
            <MapPin size={10} />
            <span>{cityName}</span>
          </span>
        )}
      </div>

      <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#9A3412", margin: "0 0 0.25rem 0" }}>
        Short on time? Order this dish online
      </h4>
      <p style={{ fontSize: "0.82rem", color: "#C2410C", maxWidth: "480px", margin: "0 auto 0.85rem" }}>
        Order healthy, wholesome "{cleanDish}" directly from cloud kitchens and restaurants in {cityName}.
      </p>

      <div className="order-btn-group" style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <a
          href={swiggyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-swiggy btn-sm"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.55rem 1.15rem", borderRadius: "var(--radius-lg)", fontWeight: 700, textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <span>🛵 Search on Swiggy</span>
          <ExternalLink size={14} />
        </a>

        <a
          href={zomatoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-zomato btn-sm"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.55rem 1.15rem", borderRadius: "var(--radius-lg)", fontWeight: 700, textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <span>🍴 Search on Zomato</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
