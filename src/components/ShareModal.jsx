import React, { useState, useEffect } from "react";
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Send,
  Sparkles,
  FileText
} from "lucide-react";

// Official Crisp Brand SVG Icons
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.77 14.07c-.24.67-1.39 1.29-1.92 1.37-.5.08-1.15.11-3.32-.78-2.66-1.1-4.37-3.8-4.5-3.98-.13-.17-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .36.01.52.02.17.01.39-.06.61.47.23.55.78 1.9.85 2.04.07.14.12.31.02.5-.1.19-.15.31-.3.49-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.83.86 2.15 1.02.32.16.53.24.61.37.08.13.08.77-.16 1.44z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function ShareModal({
  isOpen,
  onClose,
  routine,
  onShowToast
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !routine) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://foodie-routine-adda.web.app";
  const routineTitle = routine.title || "My Daily Nutrition Plan";
  const routineCalories = routine.calories || 2000;
  const routineProtein = routine.protein || 75;
  const category = routine.category || "Healthy Lifestyle";

  // Formatted summary text for messaging apps
  const summaryText = `🥗 *${routineTitle}* (${category})\n🔥 ${routineCalories} kcal | 🍗 ${routineProtein}g Protein\n\nDaily Meals:\n${
    routine.dailyTimeline
      ? routine.dailyTimeline.map((m) => `• ${m.slotName} (${m.time}): ${m.title} [${m.calories} kcal]`).join("\n")
      : "• Structured whole food schedule"
  }\n\n🌟 Calibrated on Foodie-Routine-ADDA: ${currentUrl}`;

  const shareUrl = encodeURIComponent(currentUrl);
  const shareEncodedText = encodeURIComponent(summaryText);

  // Platform Links
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareEncodedText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my daily nutrition plan: ${routineTitle} on Foodie-Routine-ADDA!`)}&url=${shareUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(`Check out my health routine: ${routineTitle}!`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
  const telegramUrl = `https://t.me/share/url?url=${shareUrl}&text=${encodeURIComponent(`🥗 ${routineTitle} - Daily Routine on Foodie-Routine-ADDA`)}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      if (onShowToast) onShowToast("🔗 Plan link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyFormattedText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopiedText(true);
      if (onShowToast) onShowToast("📋 Formatted meal schedule copied for sharing!");
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  const handleInstagramShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `🥗 Daily Routine: ${routineTitle}\n🔥 ${routineCalories} kcal | 🍗 ${routineProtein}g Protein\n#FoodieRoutineADDA #HealthRoutine #MealPrep #Nutrition`
      );
      if (onShowToast) {
        onShowToast("📸 Caption copied! Opening Instagram...");
      }
    }
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Foodie-Routine-ADDA: ${routineTitle}`,
          text: `Check out my daily health routine: ${routineTitle} (${routineCalories} kcal, ${routineProtein}g protein)!`,
          url: currentUrl
        });
        if (onShowToast) onShowToast("✨ Routine shared successfully!");
      } catch (err) {
        if (err.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

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
          maxWidth: "580px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          overflow: "hidden",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        {/* Header */}
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
              <Share2 size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0, color: "#FFFFFF" }}>
                Share Your Meal Routine
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#94A3B8", margin: 0 }}>
                Spread the healthy routine on social platforms or with friends
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

        {/* Routine Preview Card */}
        <div style={{ padding: "1.25rem 1.5rem", background: "var(--bg-main)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}
          >
            {routine.image && (
              <img
                src={routine.image}
                alt={routineTitle}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-md)",
                  objectFit: "cover",
                  flexShrink: 0
                }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <span className="badge badge-green" style={{ fontSize: "0.7rem", marginBottom: "0.2rem" }}>
                {category}
              </span>
              <h4 style={{ fontSize: "0.98rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 0.2rem" }}>
                {routineTitle}
              </h4>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                🔥 {routineCalories} kcal • 🍗 {routineProtein}g protein • {routine.mealsCount || routine.dailyTimeline?.length || 6} meals
              </div>
            </div>
          </div>
        </div>

        {/* Share Platforms Grid */}
        <div style={{ padding: "1.5rem", overflowY: "auto" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", display: "block", marginBottom: "0.85rem" }}>
            Share Directly to Social Platforms
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: "0.85rem",
              marginBottom: "1.5rem"
            }}
          >
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.85rem 0.5rem",
                borderRadius: "var(--radius-lg)",
                background: "#E8F5E9",
                border: "1px solid #A5D6A7",
                color: "#1B5E20",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                gap: "0.4rem",
                transition: "transform 0.15s ease, box-shadow 0.15s ease"
              }}
              className="share-platform-btn"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#25D366",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(37, 211, 102, 0.35)"
                }}
              >
                <WhatsAppIcon size={20} />
              </div>
              <span>WhatsApp</span>
            </a>

            {/* Instagram */}
            <button
              onClick={handleInstagramShare}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.85rem 0.5rem",
                borderRadius: "var(--radius-lg)",
                background: "#FCE4EC",
                border: "1px solid #F48FB1",
                color: "#880E4F",
                fontWeight: 700,
                fontSize: "0.82rem",
                gap: "0.4rem",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease"
              }}
              className="share-platform-btn"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(221, 42, 123, 0.35)"
                }}
              >
                <InstagramIcon size={20} />
              </div>
              <span>Instagram</span>
            </button>

            {/* Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.85rem 0.5rem",
                borderRadius: "var(--radius-lg)",
                background: "#E3F2FD",
                border: "1px solid #90CAF9",
                color: "#0D47A1",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                gap: "0.4rem",
                transition: "transform 0.15s ease, box-shadow 0.15s ease"
              }}
              className="share-platform-btn"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#1877F2",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(24, 119, 242, 0.35)"
                }}
              >
                <FacebookIcon size={20} />
              </div>
              <span>Facebook</span>
            </a>

            {/* Twitter / X */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.85rem 0.5rem",
                borderRadius: "var(--radius-lg)",
                background: "#F1F5F9",
                border: "1px solid #CBD5E1",
                color: "#0F172A",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                gap: "0.4rem",
                transition: "transform 0.15s ease, box-shadow 0.15s ease"
              }}
              className="share-platform-btn"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#0F172A",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(15, 23, 42, 0.35)"
                }}
              >
                <TwitterIcon size={18} />
              </div>
              <span>Twitter / X</span>
            </a>

            {/* Telegram */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.85rem 0.5rem",
                borderRadius: "var(--radius-lg)",
                background: "#E1F5FE",
                border: "1px solid #81D4FA",
                color: "#01579B",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                gap: "0.4rem",
                transition: "transform 0.15s ease, box-shadow 0.15s ease"
              }}
              className="share-platform-btn"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#229ED9",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(34, 158, 217, 0.35)"
                }}
              >
                <TelegramIcon size={18} />
              </div>
              <span>Telegram</span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.85rem 0.5rem",
                borderRadius: "var(--radius-lg)",
                background: "#E8EAF6",
                border: "1px solid #9FA8DA",
                color: "#1A237E",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.82rem",
                gap: "0.4rem",
                transition: "transform 0.15s ease, box-shadow 0.15s ease"
              }}
              className="share-platform-btn"
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#0A66C2",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(10, 102, 194, 0.35)"
                }}
              >
                <LinkedInIcon size={18} />
              </div>
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Quick Copy Link & Full Text Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "var(--bg-card-subtle)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "0.5rem 0.75rem"
              }}
            >
              <input
                type="text"
                readOnly
                value={currentUrl}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  outline: "none"
                }}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={handleCopyLink}
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}
              >
                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>

            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleCopyFormattedText}
                style={{ flex: 1, justifyContent: "center" }}
              >
                {copiedText ? <Check size={14} /> : <FileText size={14} />}
                <span>{copiedText ? "Schedule Copied!" : "Copy Meal Schedule Text"}</span>
              </button>

              {typeof navigator !== "undefined" && navigator.share && (
                <button
                  className="btn btn-accent btn-sm"
                  onClick={handleNativeShare}
                  style={{ justifyContent: "center" }}
                >
                  <Share2 size={14} />
                  <span>Device Share</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
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
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            ⚡ Foodie-Routine-ADDA • Eat Better. Live Better.
          </span>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
