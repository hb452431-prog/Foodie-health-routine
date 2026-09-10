import React, { useState, useEffect } from "react";
import { X, Check, Sparkles, User, Camera, Link as LinkIcon } from "lucide-react";
import { AVATAR_COLLECTION } from "../data/avatarsData";

export default function AvatarPickerModal({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
  onShowToast
}) {
  const [activeGender, setActiveGender] = useState("all");
  const [customUrl, setCustomUrl] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAvatars = AVATAR_COLLECTION.filter((avatar) => {
    if (activeGender === "all") return true;
    return avatar.gender === activeGender;
  });

  const handleSelect = (url, name) => {
    onSelectAvatar(url);
    if (onShowToast) {
      onShowToast(`✨ Avatar updated to ${name}!`);
    }
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onSelectAvatar(customUrl.trim());
      if (onShowToast) {
        onShowToast("✨ Custom avatar photo applied!");
      }
      onClose();
    }
  };

  const boyCount = AVATAR_COLLECTION.filter((a) => a.gender === "boy").length;
  const girlCount = AVATAR_COLLECTION.filter((a) => a.gender === "girl").length;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="widget-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          overflow: "hidden",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            background: "linear-gradient(135deg, #0F382A 0%, #1E293B 100%)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.2)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#34D399"
              }}
            >
              <Camera size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0, color: "#FFFFFF" }}>
                Choose Your Snapchat-Style Avatar
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#94A3B8", margin: 0 }}>
                Select a Snapchat Bitmoji style boy or girl avatar for your foodie profile
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: "#FFFFFF",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease"
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Tabs & Custom Toggle */}
        <div
          style={{
            padding: "1rem 1.5rem 0.5rem",
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem"
          }}
        >
          <div style={{ display: "flex", gap: "0.4rem" }}>
            <button
              onClick={() => {
                setActiveGender("all");
                setShowCustomInput(false);
              }}
              className={`filter-chip ${activeGender === "all" && !showCustomInput ? "active" : ""}`}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.82rem", fontWeight: 700 }}
            >
              👻 All Bitmojis ({AVATAR_COLLECTION.length})
            </button>
            <button
              onClick={() => {
                setActiveGender("boy");
                setShowCustomInput(false);
              }}
              className={`filter-chip ${activeGender === "boy" && !showCustomInput ? "active" : ""}`}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.82rem", fontWeight: 700 }}
            >
              👦 Boys ({boyCount})
            </button>
            <button
              onClick={() => {
                setActiveGender("girl");
                setShowCustomInput(false);
              }}
              className={`filter-chip ${activeGender === "girl" && !showCustomInput ? "active" : ""}`}
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.82rem", fontWeight: 700 }}
            >
              👧 Girls ({girlCount})
            </button>
          </div>

          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            style={{
              background: showCustomInput ? "var(--primary-100)" : "transparent",
              color: showCustomInput ? "var(--primary-800)" : "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-full)",
              padding: "0.35rem 0.75rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem"
            }}
          >
            <LinkIcon size={13} />
            <span>Custom URL</span>
          </button>
        </div>

        {/* Custom URL Input Section */}
        {showCustomInput && (
          <form
            onSubmit={handleCustomSubmit}
            style={{
              padding: "1rem 1.5rem",
              background: "var(--primary-50)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              gap: "0.6rem"
            }}
          >
            <input
              type="url"
              placeholder="Paste direct image URL (https://...)"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              style={{
                flex: 1,
                padding: "0.55rem 0.85rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                fontSize: "0.85rem"
              }}
              required
            />
            <button type="submit" className="btn btn-primary btn-sm">
              <Check size={14} />
              <span>Apply</span>
            </button>
          </form>
        )}

        {/* Avatars Grid */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(135px, 1fr))",
            gap: "1rem",
            background: "var(--bg-main)"
          }}
        >
          {filteredAvatars.map((avatar) => {
            const isSelected = currentAvatar === avatar.url;

            return (
              <div
                key={avatar.id}
                onClick={() => handleSelect(avatar.url, avatar.name)}
                style={{
                  background: isSelected ? "#ECFDF5" : "var(--bg-card)",
                  border: isSelected ? "2px solid #10B981" : "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-xl)",
                  padding: "0.9rem 0.6rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isSelected
                    ? "0 4px 14px rgba(16, 185, 129, 0.25)"
                    : "0 1px 3px rgba(0,0,0,0.05)",
                  position: "relative"
                }}
                className="avatar-card-option"
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "6px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#10B981",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}

                {/* Avatar Image with Ring */}
                <div style={{ position: "relative", width: "72px", height: "72px", margin: "0 auto 0.6rem" }}>
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: isSelected ? "3px solid #10B981" : "2px solid #E2E8F0",
                      transition: "transform 0.2s ease"
                    }}
                  />
                </div>

                <h4
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: isSelected ? "var(--primary-800)" : "var(--text-primary)",
                    marginBottom: "0.15rem"
                  }}
                >
                  {avatar.name}
                </h4>

                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: isSelected ? "#047857" : "var(--text-muted)",
                    lineHeight: 1.2,
                    marginBottom: "0.35rem"
                  }}
                >
                  {avatar.tag}
                </div>

                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.15
                  }}
                >
                  {avatar.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "0.9rem 1.5rem",
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            💡 Click any avatar to apply immediately
          </span>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
