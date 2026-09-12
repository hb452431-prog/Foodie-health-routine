import React from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Antigravity ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F8FAF9",
            padding: "2rem",
            fontFamily: "var(--font-body, -apple-system, BlinkMacSystemFont, sans-serif)"
          }}
        >
          <div
            style={{
              maxWidth: "520px",
              width: "100%",
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "2.5rem 2rem",
              textAlign: "center",
              boxShadow: "0 20px 40px -10px rgba(15, 56, 42, 0.12)",
              border: "1px solid #E2E8F0"
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#FEF2F2",
                color: "#DC2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem"
              }}
            >
              <AlertCircle size={32} />
            </div>

            <h1
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "0.5rem"
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                fontSize: "0.92rem",
                color: "#64748B",
                lineHeight: 1.55,
                marginBottom: "1.75rem"
              }}
            >
              The application encountered an unexpected state. We've preserved your healthy food routines and preferences. Click below to safely restore the application.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.75rem 1.4rem",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #0F382A 0%, #14532D 100%)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(15, 56, 42, 0.25)"
                }}
              >
                <RotateCcw size={16} />
                <span>Reload Website</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
