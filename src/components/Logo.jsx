import React from "react";

export default function Logo({ size = 38, showText = true, isDark = false }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: "drop-shadow(0 2px 6px rgba(16, 185, 129, 0.25))" }}
      >
        <defs>
          <linearGradient id="logoPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0F382A" />
          </linearGradient>
          <linearGradient id="logoAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <radialGradient id="logoInnerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ECFDF5" />
            <stop offset="100%" stopColor="#D1FAE5" />
          </radialGradient>
        </defs>

        {/* Soft Background Plate Disc */}
        <circle cx="24" cy="24" r="22" fill="url(#logoInnerGlow)" stroke="#A7F3D0" strokeWidth="1.5" />

        {/* Healthy Plate Rim (Organic Curved Bottom Arc) */}
        <path
          d="M 10 24 C 10 32.5 16.5 38.5 24 38.5 C 31.5 38.5 38 32.5 38 24"
          stroke="url(#logoPrimaryGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Heartbeat / Vitality Pulse Line */}
        <path
          d="M 11 24 H 17 L 20 16 L 24 31 L 28 20 L 31 24 H 37"
          stroke="url(#logoAmberGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fresh Vital Green Leaf Sprout */}
        <path
          d="M 25 13 C 25 13 30.5 9.5 35 11 C 36.5 15.5 33 20 33 20 C 33 20 29.5 17 25 13 Z"
          fill="#10B981"
        />
        <path
          d="M 25 13 C 28.5 16.5 33 20 33 20"
          stroke="#047857"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <span
          className="brand-logo-text"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: size >= 38 ? "clamp(0.95rem, 3.8vw, 1.22rem)" : "clamp(0.85rem, 3.2vw, 1.05rem)",
            color: isDark ? "#FFFFFF" : "var(--primary-900)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            whiteSpace: "nowrap"
          }}
        >
          Foodie<span style={{ color: "#10B981" }}>-Health</span>
          <span style={{ color: "#F59E0B" }}>-Routine</span>
        </span>
      )}
    </div>
  );
}
