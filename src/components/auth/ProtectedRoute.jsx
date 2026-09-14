import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Lock, LogIn, Sparkles, ArrowRight, Eye } from "lucide-react";

/**
 * ProtectedRoute component wrapper.
 * If user is logged in, renders children.
 * If logged out, offers a smooth sign-in modal or 1-click Guest Preview mode so users can test immediately.
 */
export default function ProtectedRoute({
  children,
  title = "Login Required",
  subtitle = "Please sign in to access this feature.",
  allowGuestPreview = true
}) {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [guestPreview, setGuestPreview] = useState(false);

  if (isAuthenticated || (allowGuestPreview && guestPreview)) {
    return (
      <div>
        {!isAuthenticated && (
          <div
            style={{
              background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
              borderBottom: "1px solid #A7F3D0",
              padding: "0.6rem 1rem",
              fontSize: "0.84rem",
              color: "#065F46",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 600 }}>
              <Sparkles size={15} style={{ color: "#059669" }} />
              <span>You are exploring in <strong>Guest Mode</strong>. Data is saved locally in your browser.</span>
            </div>
            <button
              type="button"
              className="btn btn-accent btn-sm"
              style={{ padding: "0.25rem 0.75rem", fontSize: "0.78rem" }}
              onClick={() => openAuthModal("Sign in to sync your routines and meal plans across all your devices.")}
            >
              <LogIn size={13} />
              <span>Save to Account</span>
            </button>
          </div>
        )}
        {children}
      </div>
    );
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

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => openAuthModal(subtitle)}
          >
            <LogIn size={18} />
            <span>Sign In to Continue</span>
          </button>

          {allowGuestPreview && (
            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setGuestPreview(true)}
            >
              <Eye size={16} />
              <span>Explore in Guest Mode</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
