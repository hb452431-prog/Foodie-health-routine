import React, { useEffect } from "react";
import { X, ExternalLink, Play } from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";

export default function YouTubeModal({ meal, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!meal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#DC2626"
              }}
            >
              <YouTubeIcon size={20} color="#DC2626" fill={true} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)" }}>
                Watch Recipe Guides
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Curated videos for {meal.title}
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} style={{ position: "static", background: "var(--bg-card-subtle)", color: "var(--text-primary)" }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {meal.youtubeVideos && meal.youtubeVideos.map((video, idx) => {
              const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(video.query || video.title)}`;

              return (
                <a
                  key={idx}
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-subtle)",
                    background: "#FFFFFF",
                    textDecoration: "none",
                    transition: "all 0.2s ease"
                  }}
                  className="glass-card"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #EF4444, #DC2626)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
                      }}
                    >
                      <Play size={20} fill="#FFFFFF" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                        {video.title}
                      </h4>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", gap: "0.75rem" }}>
                        <span>📺 {video.channel}</span>
                        <span>⏱️ {video.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ color: "var(--primary-600)", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", fontWeight: 600 }}>
                    <span>Watch</span>
                    <ExternalLink size={15} />
                  </div>
                </a>
              );
            })}
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent("healthy recipe " + meal.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <span>Search More on YouTube</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
