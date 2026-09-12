import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Lock, LogIn, Sparkles } from "lucide-react";

/**
 * ProtectedRoute component wrapper.
 * If user is logged in, renders children.
 * If logged out, displays a clean lock banner and prompts login.
 */
export default function ProtectedRoute({ children, title = "Login Required", subtitle = "Please sign in to access this feature." }) {
  const { isAuthenticated, openAuthModal } = useAuth();

  if (isAuthenticated) {
    return children;
  }

  return (
    <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <div
        className="widget-card"
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          padding: "2.5rem 1.75rem",
          textAlign: "center"
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#ECFDF5",
            color: "#059669",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem"
          }}
        >
          <Lock size={26} />
        </div>

        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.5rem" }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.75rem", lineHeight: 1.5 }}>
          {subtitle}
        </p>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => openAuthModal(subtitle)}
        >
          <LogIn size={18} />
          <span>Sign In to Continue</span>
        </button>
      </div>
    </div>
  );
}
