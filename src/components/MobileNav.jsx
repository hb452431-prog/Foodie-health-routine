import React from "react";
import { Home, Compass, Calendar, User, Sparkles } from "lucide-react";

export default function MobileNav({ activeTab, setActiveTab, onOpenPlanWizard }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button
        className={`mobile-nav-btn ${activeTab === "home" ? "active" : ""}`}
        onClick={() => setActiveTab("home")}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === "explore" ? "active" : ""}`}
        onClick={() => setActiveTab("explore")}
      >
        <Compass size={20} />
        <span>Explore</span>
      </button>

      {/* Floating center highlight button for wizard */}
      <button
        className="mobile-nav-btn"
        onClick={onOpenPlanWizard}
        style={{ color: "#059669" }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10B981, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            boxShadow: "0 4px 10px rgba(16, 185, 129, 0.4)",
            marginTop: "-14px",
            marginBottom: "2px"
          }}
        >
          <Sparkles size={18} />
        </div>
        <span>Plan</span>
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === "my-plan" ? "active" : ""}`}
        onClick={() => setActiveTab("my-plan")}
      >
        <Calendar size={20} />
        <span>My Plan</span>
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => setActiveTab("profile")}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
