import React from "react";
import { Droplet, Flame, Utensils, CheckCircle2, Circle, Plus, Minus, Heart, Award } from "lucide-react";

export default function DashboardWidgets({
  waterGlasses,
  onUpdateWater,
  completedMealsData,
  totalMealsCount = 6,
  onToggleMealCompleted,
  routine,
  savedRecipesCount = 0,
  onShowToast
}) {
  const targetGlasses = 8;
  const completedCount = completedMealsData?.meals?.length || 0;
  const completionPercentage = Math.round((completedCount / (totalMealsCount || 6)) * 100);

  const handleAddGlass = () => {
    if (waterGlasses < 16) {
      onUpdateWater(waterGlasses + 1);
      onShowToast("💧 Logged 1 glass (+250ml) of water!");
    }
  };

  const handleRemoveGlass = () => {
    if (waterGlasses > 0) {
      onUpdateWater(waterGlasses - 1);
    }
  };

  return (
    <div>
      {/* Water Intake Tracker Box */}
      <div className="water-tracker-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#0284C7",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Droplet size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#0369A1" }}>
                Daily Hydration Tracker
              </h4>
              <p style={{ fontSize: "0.78rem", color: "#0284C7" }}>
                Target: {targetGlasses} glasses (2,000 ml)
              </p>
            </div>
          </div>

          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0369A1" }}>
            {waterGlasses * 250} <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>ml</span>
          </div>
        </div>

        {/* Glasses Visual Grid */}
        <div className="water-glasses-row">
          {Array.from({ length: targetGlasses }).map((_, idx) => {
            const isFilled = idx < waterGlasses;
            return (
              <div
                key={idx}
                className={`water-glass-item ${isFilled ? "filled" : ""}`}
                onClick={() => onUpdateWater(idx + 1 === waterGlasses ? idx : idx + 1)}
                title={`Glass ${idx + 1} (250 ml)`}
              >
                <Droplet size={16} fill={isFilled ? "#FFFFFF" : "none"} />
              </div>
            );
          })}
        </div>

        {/* Quick +250ml Buttons */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button
            className="btn btn-sm"
            style={{ background: "#0284C7", color: "#FFFFFF", padding: "0.4rem 0.8rem" }}
            onClick={handleAddGlass}
          >
            <Plus size={14} />
            <span>+250 ml Glass</span>
          </button>

          {waterGlasses > 0 && (
            <button
              className="btn btn-secondary btn-sm"
              style={{ padding: "0.4rem 0.6rem" }}
              onClick={handleRemoveGlass}
              title="Remove one glass"
            >
              <Minus size={14} />
            </button>
          )}

          <span style={{ fontSize: "0.78rem", color: "#0369A1", fontWeight: 600, marginLeft: "auto" }}>
            {waterGlasses >= targetGlasses ? "🎉 Target Met!" : `${targetGlasses - waterGlasses} glasses left`}
          </span>
        </div>
      </div>

      {/* Routine Progress Overview Card */}
      <div className="widget-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--primary-900)" }}>
            Today's Routine Progress
          </h4>
          <span className="badge badge-green">
            {completedCount}/{totalMealsCount} Meals Done
          </span>
        </div>

        <div className="progress-bar-container">
          <div className="progress-header">
            <span style={{ color: "var(--text-secondary)" }}>Completion</span>
            <span style={{ color: "var(--primary-700)" }}>{completionPercentage}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill-green"
              style={{ width: `${completionPercentage}%`, transition: "width 0.3s ease" }}
            />
          </div>
        </div>

        {/* Quick Nutrition Breakdown */}
        {routine && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
              background: "var(--bg-card-subtle)",
              padding: "0.85rem",
              borderRadius: "var(--radius-lg)",
              marginTop: "1rem"
            }}
          >
            <div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Target Calories</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-900)" }}>
                {routine.calories} kcal
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Target Protein</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-600)" }}>
                {routine.protein}g / day
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      <div className="widget-card">
        <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.85rem" }}>
          Wellness Streaks & Badges
        </h4>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", color: "#D97706" }}>
              <Flame size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>7-Day Streak Active</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Logged healthy meals all week</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", color: "#EF4444" }}>
              <Heart size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{savedRecipesCount} Saved Recipes</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>In your personal recipe book</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
