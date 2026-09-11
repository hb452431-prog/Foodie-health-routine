import React from "react";
import Logo from "./Logo";
import { Search, Sparkles, User, Calendar, Compass, Home, Droplet, Flame, Plus } from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenPlanWizard,
  waterGlasses = 0,
  onUpdateWater,
  userProfile,
  onShowToast
}) {
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

  const streakDays = userProfile?.streakDays || 7;
  const avatarUrl = userProfile?.avatar?.url || userProfile?.avatar;

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab("home")}
          style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer" }}
          aria-label="Foodie-Routine-ADDA Home"
        >
          <Logo size={36} />
        </button>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links-desktop">
            <li>
              <button
                className={`nav-link-item ${activeTab === "home" ? "active" : ""}`}
                onClick={() => setActiveTab("home")}
                title="Go to Home overview (Press 1)"
              >
                <Home size={17} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-link-item ${activeTab === "explore" ? "active" : ""}`}
                onClick={() => setActiveTab("explore")}
                title="Explore all Food Routines (Press 2)"
              >
                <Compass size={17} />
                <span>Explore</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-link-item ${activeTab === "my-plan" ? "active" : ""}`}
                onClick={() => setActiveTab("my-plan")}
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
                onClick={() => setActiveTab("profile")}
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
          {/* Universal Search Button with ⌘K Badge */}
          <button
            className="nav-search-btn"
            onClick={onOpenSearch}
            title="Search food routines, recipes & quick actions (Ctrl+K / ⌘K)"
          >
            <Search size={14} />
            <span>Search routines, recipes...</span>
            <kbd className="nav-search-kbd">⌘K</kbd>
          </button>

          {/* Quick Water Pill in Header */}
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

          {/* User Profile Quick Pill */}
          <button
            className="nav-profile-pill"
            onClick={() => setActiveTab("profile")}
            title="Open your Profile & Streaks"
          >
            <span className="nav-streak-tag">
              <Flame size={12} fill="#EA580C" color="#EA580C" />
              <span>{streakDays}d</span>
            </span>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="nav-avatar-img"
              />
            ) : (
              <div className="nav-avatar-placeholder">
                <User size={13} />
              </div>
            )}
          </button>

          {/* Create Plan CTA */}
          <button
            className="btn btn-accent btn-sm"
            onClick={onOpenPlanWizard}
            title="Create your AI-tailored personalized nutrition routine"
          >
            <Sparkles size={15} />
            <span>Create Plan</span>
          </button>
        </div>

        {/* Action CTAs Mobile */}
        <div className="nav-actions-mobile">
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

          <button
            className="mobile-header-icon-btn"
            onClick={onOpenSearch}
            title="Universal Search (Tap to search)"
            aria-label="Search"
          >
            <Search size={17} />
          </button>

          <button
            className="mobile-header-plan-btn"
            onClick={onOpenPlanWizard}
            title="Create your personalized food plan"
            aria-label="Create Plan"
          >
            <Sparkles size={14} />
            <span>Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
}
