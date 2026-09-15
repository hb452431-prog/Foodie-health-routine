import React from "react";
import Logo from "./Logo";
import LocationIndicator from "./location/LocationIndicator";
import UserMenu from "./auth/UserMenu";
import { useAuth } from "../context/AuthContext";
import { Sparkles, User, Calendar, Compass, Home, Droplet, Plus } from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenPlanWizard,
  waterGlasses = 0,
  onUpdateWater,
  userProfile,
  onShowToast
}) {
  const { requireAuth } = useAuth();

  const handleQuickWater = (e) => {
    e.stopPropagation();
    if (onUpdateWater) {
      const nextCount = Math.min(16, Number(waterGlasses || 0) + 1);
      onUpdateWater(nextCount);
      if (onShowToast) {
        onShowToast("💧 +250ml Water logged! (" + nextCount + "/8 glasses)");
      }
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreatePlanClick = () => {
    if (onOpenPlanWizard) onOpenPlanWizard();
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo: Foodie-Health-Routine */}
        <button
          onClick={() => setActiveTab("home")}
          style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer" }}
          aria-label="Foodie-Health-Routine Home"
        >
          <Logo size={36} />
        </button>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links-desktop">
            <li>
              <button
                className={`nav-link-item ${activeTab === "home" ? "active" : ""}`}
                onClick={() => handleTabClick("home")}
                title="Go to Home overview (Press 1)"
              >
                <Home size={17} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-link-item ${activeTab === "explore" ? "active" : ""}`}
                onClick={() => handleTabClick("explore")}
                title="Explore all Food Routines (Press 2)"
              >
                <Compass size={17} />
                <span>Explore</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-link-item ${activeTab === "my-plan" ? "active" : ""}`}
                onClick={() => handleTabClick("my-plan")}
                title="View today's live nutrition schedule & timetable (Press 3)"
              >
                <Calendar size={17} />
                <span>My Plan</span>
                <span className="nav-pulse-indicator" />
              </button>
            </li>
            <li>
              <button
                className={`nav-link-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => handleTabClick("profile")}
                title="View your Health Profile & saved routines (Press 4)"
              >
                <User size={17} />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Action CTAs Desktop */}
        <div className="nav-actions-desktop">
          {/* Location Indicator Badge */}
          <LocationIndicator />

          {/* Quick Water Pill */}
          <div
            className="nav-water-pill"
            onClick={handleQuickWater}
            title={`Daily Hydration: ${waterGlasses}/8 glasses (${waterGlasses * 250}ml). Click to log +250ml.`}
          >
            <Droplet size={14} fill="#0284C7" color="#0284C7" />
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0369A1" }}>
              {waterGlasses}/8
            </span>
            <button
              className="nav-water-plus-btn"
              onClick={handleQuickWater}
              title="Add 1 glass of water"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* User Menu / Sign In Button */}
          <UserMenu
            onNavigateTab={setActiveTab}
            userProfile={userProfile}
            onShowToast={onShowToast}
          />

          {/* Primary CTA: Create My Plan */}
          <button
            className="btn btn-accent btn-sm"
            onClick={handleCreatePlanClick}
            title="Create your AI-tailored personalized nutrition routine"
          >
            <Sparkles size={15} />
            <span>Create My Plan</span>
          </button>
        </div>

        {/* Action CTAs Mobile */}
        <div className="nav-actions-mobile">
          <LocationIndicator />

          {/* Quick Water Log for Mobile Header */}
          <button
            className="mobile-header-water-btn"
            onClick={handleQuickWater}
            title={`Hydration: ${waterGlasses}/8 glasses. Tap to add +250ml.`}
          >
            <Droplet size={15} fill="#0284C7" color="#0284C7" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284C7" }}>
              {waterGlasses}
            </span>
          </button>

          <UserMenu
            onNavigateTab={setActiveTab}
            userProfile={userProfile}
            onShowToast={onShowToast}
          />
        </div>
      </div>
    </header>
  );
}
