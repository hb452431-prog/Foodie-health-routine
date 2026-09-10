import React from "react";
import { Clock, Utensils, Heart, ArrowRight, Activity, Flame } from "lucide-react";

export default function RoutineCard({
  routine,
  onSelectRoutine,
  isSaved,
  onToggleSave
}) {
  return (
    <div className="routine-card">
      {/* Image & Badges */}
      <div className="routine-card-img-wrap">
        <img
          src={routine.image}
          alt={routine.title}
          className="routine-card-img"
          loading="lazy"
        />
        <div className="routine-badge-category">
          {routine.category}
        </div>
        <button
          className={`routine-fav-btn ${isSaved ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(routine.id);
          }}
          title={isSaved ? "Remove from saved routines" : "Save routine to favorites"}
          aria-label={isSaved ? "Remove from saved" : "Save routine"}
        >
          <Heart size={18} fill={isSaved ? "#EF4444" : "none"} />
        </button>
      </div>

      {/* Body Content */}
      <div className="routine-card-body">
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
          <span className="badge badge-green">
            {routine.badge || "Health-Tested"}
          </span>
          {routine.isVegetarian && (
            <span className="badge badge-blue">100% Veg</span>
          )}
        </div>

        <h3 className="routine-card-title">{routine.title}</h3>
        <p className="routine-card-desc">{routine.description}</p>

        {/* Nutritional Macros Breakdown */}
        <div className="routine-macros-row">
          <div className="macro-stat">
            <span className="macro-value">{routine.calories}</span>
            <span className="macro-label">kcal</span>
          </div>
          <div className="macro-stat">
            <span className="macro-value">{routine.protein}g</span>
            <span className="macro-label">protein</span>
          </div>
          <div className="macro-stat">
            <span className="macro-value">{routine.carbs}g</span>
            <span className="macro-label">carbs</span>
          </div>
          <div className="macro-stat">
            <span className="macro-value">{routine.fat}g</span>
            <span className="macro-label">fat</span>
          </div>
        </div>

        {/* Meta Info (Meals, Difficulty, Prep Time) */}
        <div className="routine-meta-row">
          <div className="routine-meta-item">
            <Utensils size={14} style={{ color: "var(--primary-600)" }} />
            <span>{routine.mealsCount} Meals/Day</span>
          </div>
          <div className="routine-meta-item">
            <Activity size={14} style={{ color: "var(--accent-amber)" }} />
            <span>{routine.difficulty}</span>
          </div>
          <div className="routine-meta-item">
            <Clock size={14} style={{ color: "var(--text-muted)" }} />
            <span>{routine.prepTimeAvg}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "auto" }}
          onClick={() => onSelectRoutine(routine.id)}
        >
          <span>View Routine</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
