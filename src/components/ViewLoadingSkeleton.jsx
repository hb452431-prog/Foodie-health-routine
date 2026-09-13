import React from "react";

export default function ViewLoadingSkeleton({ message = "Loading..." }) {
  return (
    <div
      style={{
        padding: "3rem 1rem",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "4px solid #D1FAE5",
          borderTopColor: "#10B981",
          borderRadius: "50%",
          animation: "spinLocation 0.8s linear infinite",
          marginBottom: "1.25rem"
        }}
      />
      <div
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--primary-900, #09261c)",
          marginBottom: "0.35rem"
        }}
      >
        {message}
      </div>
      <div
        style={{
          fontSize: "0.82rem",
          color: "var(--text-muted, #64748B)"
        }}
      >
        Preparing your personalized food routine...
      </div>
    </div>
  );
}
