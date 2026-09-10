import React from "react";
import Logo from "./Logo";
import { Search, Sparkles, User, Calendar, Compass, Home } from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenPlanWizard
}) {
  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab("home")}
          style={{ background: "none", border: "none", padding: 0, textAlign: "left" }}
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
              >
                <Home size={18} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-link-item ${activeTab === "explore" ? "active" : ""}`}
                onClick={() => setActiveTab("explore")}
              >
                <Compass size={18} />
                <span>Explore</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-link-item ${activeTab === "my-plan" ? "active" : ""}`}
                onClick={() => setActiveTab("my-plan")}
              >
                <Calendar size={18} />
                <span>My Plan</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-link-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Action CTAs Desktop */}
        <div className="nav-actions-desktop">
          <button
            className="nav-search-btn"
            onClick={onOpenSearch}
            title="Search food routines (Press to search)"
          >
            <Search size={15} />
            <span>Search...</span>
          </button>

          <button
            className="btn btn-accent btn-sm"
            onClick={onOpenPlanWizard}
          >
            <Sparkles size={16} />
            <span>Create My Plan</span>
          </button>
        </div>

        {/* Action CTAs Mobile */}
        <div className="nav-actions-mobile">
          <button
            className="mobile-header-icon-btn"
            onClick={onOpenSearch}
            title="Search food routines"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <button
            className="mobile-header-plan-btn"
            onClick={onOpenPlanWizard}
            title="Create your personalized food plan"
            aria-label="Create Plan"
          >
            <Sparkles size={15} />
            <span>Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
}
