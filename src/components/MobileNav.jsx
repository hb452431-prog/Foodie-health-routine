import React from "react";
import { useAuth } from "../context/AuthContext";
import { Home, Compass, Calendar, User, Sparkles } from "lucide-react";

export default function MobileNav({ activeTab, setActiveTab, onOpenPlanWizard }) {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePlanClick = () => {
    if (onOpenPlanWizard) onOpenPlanWizard();
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button
        className={`mobile-nav-btn ${activeTab === "home" ? "active" : ""}`}
        onClick={() => handleTabClick("home")}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === "explore" ? "active" : ""}`}
        onClick={() => handleTabClick("explore", "Sign in to explore all food routines.")}
      >
        <Compass size={20} />
        <span>Explore</span>
      </button>

      {/* Center AI Plan Wizard Trigger */}
      <button
        className="mobile-nav-btn mobile-center-plan-btn"
        onClick={handlePlanClick}
        title="Create your AI Nutrition Routine"
      >
        <div className="mobile-center-circle">
          <Sparkles size={18} />
        </div>
        <span style={{ fontWeight: 800, color: "var(--primary-800)" }}>Plan</span>
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === "my-plan" ? "active" : ""}`}
        onClick={() => handleTabClick("my-plan", "Sign in to view your live daily plan.")}
      >
        <div style={{ position: "relative", display: "inline-flex" }}>
          <Calendar size={20} />
          <span className="mobile-nav-dot" />
        </div>
        <span>My Plan</span>
      </button>

      <button
        className={`mobile-nav-btn ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => handleTabClick("profile", "Sign in to view your health profile.")}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
