import React from "react";
import { X, ExternalLink, ShoppingBag, MapPin, Sparkles } from "lucide-react";

export default function OrderModal({ meal, onClose }) {
  if (!meal) return null;

  const dishName = meal.orderQuery || meal.title;
  const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(dishName)}`;
  const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(dishName)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
        {/* Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D97706"
              }}
            >
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)" }}>
                Order from Nearby Kitchens
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Fast delivery matching "{dishName}"
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} style={{ position: "static", background: "var(--bg-card-subtle)", color: "var(--text-primary)" }}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", background: "#F8FAF9", padding: "1rem", borderRadius: "var(--radius-lg)", marginBottom: "1.5rem" }}>
            <img
              src={meal.image}
              alt={meal.title}
              style={{ width: "70px", height: "70px", borderRadius: "var(--radius-md)", objectFit: "cover" }}
            />
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {meal.title}
              </h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Estimated {meal.calories} kcal • {meal.protein}g protein
              </p>
            </div>
          </div>

          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.25rem", textAlign: "center" }}>
            Select your preferred delivery platform to search healthy cloud kitchens & restaurants near you:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {/* Swiggy Button */}
            <a
              href={swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-lg)",
                background: "#FC8019",
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 4px 14px rgba(252, 128, 25, 0.3)",
                transition: "transform 0.15s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.4rem" }}>🛵</span>
                <span>Order on Swiggy</span>
              </div>
              <ExternalLink size={18} />
            </a>

            {/* Zomato Button */}
            <a
              href={zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-lg)",
                background: "#E23744",
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 4px 14px rgba(226, 55, 68, 0.3)",
                transition: "transform 0.15s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.4rem" }}>🍴</span>
                <span>Order on Zomato</span>
              </div>
              <ExternalLink size={18} />
            </a>
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.75rem", color: "var(--text-light)" }}>
            * Opens external search on partner platforms in a new tab.
          </div>
        </div>
      </div>
    </div>
  );
}
