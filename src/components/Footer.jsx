import React from "react";
import Logo from "./Logo";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function Footer({ onNavigateTab }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <Logo size={36} isDark={true} />
            </div>
            <p style={{ color: "#94A3B8", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: "340px", marginBottom: "1rem" }}>
              Eat Better. Live Better. Every Day. Discover personalized food routines,
              scientifically calibrated recipes, and lifestyle nutrition systems.
            </p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <span className="badge" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                🌱 100% Whole Food Principles
              </span>
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>
              Explore Routines
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem", color: "#94A3B8" }}>
              <li>
                <button onClick={() => onNavigateTab("explore")} style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Diabetes-Friendly Low-GI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("explore")} style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Gym Beginner & Hypertrophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("explore")} style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Weight Management & Fat Loss
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("explore")} style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Cardio-Protective Mediterranean
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("explore")} style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Student Budget & Speed
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>
              Platform
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem", color: "#94A3B8" }}>
              <li>
                <button onClick={() => onNavigateTab("home")} style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("my-plan")} style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  My Plan Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("profile")} style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Profile & Preferences
                </button>
              </li>
              <li>
                <span style={{ color: "#64748B" }}>Privacy Policy</span>
              </li>
              <li>
                <span style={{ color: "#64748B" }}>Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Tagline & Assurance */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Our Promise
            </h4>
            <p style={{ fontSize: "0.82rem", color: "#94A3B8", lineHeight: 1.5 }}>
              Foodie-Routine-ADDA bridges the gap between everyday delicious food and long-term vitality. Clean nutrition made accessible to everyone.
            </p>

            <div className="footer-disclaimer-box">
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#FBBF24", fontWeight: 700, marginBottom: "0.3rem" }}>
                <ShieldCheck size={16} />
                <span>Medical Disclaimer</span>
              </div>
              All routine schedules, recipes, and dietary suggestions are provided for general educational guidance only. Consult a qualified physician or registered dietitian before starting any restrictive dietary regimen.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} Foodie-Routine-ADDA — Eat Better. Live Better. Every Day. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>Crafted with</span>
            <Heart size={14} fill="#EF4444" color="#EF4444" />
            <span>for health and good food</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
