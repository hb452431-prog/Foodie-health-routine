import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, LogOut, Calendar, Settings, ChevronDown, Sparkles, Flame, LogIn } from "lucide-react";

export default function UserMenu({ onNavigateTab, userProfile, onShowToast }) {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => openAuthModal("Sign in to save routines, build custom meal plans, and track your daily nutrition.")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontWeight: 700,
          borderColor: "var(--primary-300)",
          color: "var(--primary-800)",
          background: "#FFFFFF"
        }}
      >
        <LogIn size={15} color="#059669" />
        <span>Sign In</span>
      </button>
    );
  }

  const streakDays = userProfile?.streakDays || user?.streakDays || 7;
  const avatarUrl = user?.avatar || userProfile?.avatar?.url || userProfile?.avatar;
  const displayName = user?.name || userProfile?.name || "Foodie User";
  const displayEmail = user?.email || userProfile?.email || "user@example.com";

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    if (onNavigateTab) onNavigateTab("home");
    if (onShowToast) {
      onShowToast("👋 You have been logged out. See you soon!");
    }
  };

  const handleNav = (tab) => {
    setIsOpen(false);
    if (onNavigateTab) onNavigateTab(tab);
  };

  return (
    <div className="user-menu-wrapper" ref={menuRef} style={{ position: "relative" }}>
      <button
        type="button"
        className="user-menu-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        title={`${displayName} - Account & Settings`}
        aria-label="User Account Menu"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.3rem 0.65rem 0.3rem 0.35rem",
          borderRadius: "var(--radius-full)",
          background: "#FFFFFF",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-xs)",
          cursor: "pointer",
          transition: "all 0.18s ease"
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1.5px solid #10B981"
            }}
          />
        ) : (
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "#ECFDF5",
              color: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <User size={15} />
          </div>
        )}

        <span
          className="user-menu-name-text"
          style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "var(--primary-900)",
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {displayName.split(" ")[0]}
        </span>

        <span
          className="user-menu-streak-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.2rem",
            fontSize: "0.72rem",
            fontWeight: 800,
            color: "#EA580C",
            background: "#FFF7ED",
            padding: "0.15rem 0.4rem",
            borderRadius: "var(--radius-full)"
          }}
        >
          <Flame size={11} fill="#EA580C" />
          <span>{streakDays}d</span>
        </span>

        <ChevronDown size={13} className="user-menu-chevron" color="var(--text-muted)" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          className="user-menu-dropdown animate-scale-up"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "240px",
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            border: "1px solid var(--border-subtle)",
            padding: "0.5rem",
            zIndex: 200
          }}
        >
          {/* Header Info */}
          <div style={{ padding: "0.75rem 0.75rem 0.5rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "0.35rem" }}>
            <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--primary-900)" }}>
              {displayName}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>
              {displayEmail}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <button
              type="button"
              className="user-menu-item"
              onClick={() => handleNav("my-plan")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <Calendar size={15} color="#059669" />
              <span>My Plan & Schedule</span>
            </button>

            <button
              type="button"
              className="user-menu-item"
              onClick={() => handleNav("profile")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <User size={15} color="#0284C7" />
              <span>Profile & Goals</span>
            </button>

            <div style={{ height: "1px", background: "var(--border-subtle)", margin: "0.3rem 0" }} />

            <button
              type="button"
              className="user-menu-item"
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                width: "100%",
                padding: "0.6rem 0.75rem",
                borderRadius: "var(--radius-md)",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#DC2626",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
