import React, { useState } from "react";
import { Calendar, CheckCircle, Clock, Utensils, ChevronRight } from "lucide-react";

export default function WeeklyPlanner({ routine, onSelectMeal, onOpenRecipe }) {
  const days = [
    { id: "mon", label: "Mon", full: "Monday", date: "Sep 14" },
    { id: "tue", label: "Tue", full: "Tuesday", date: "Sep 15" },
    { id: "wed", label: "Wed", full: "Wednesday", date: "Sep 16" },
    { id: "thu", label: "Thu", full: "Thursday", date: "Sep 17" },
    { id: "fri", label: "Fri", full: "Friday", date: "Sep 18" },
    { id: "sat", label: "Sat", full: "Saturday", date: "Sep 19" },
    { id: "sun", label: "Sun", full: "Sunday", date: "Sep 20" }
  ];

  const [activeDay, setActiveDay] = useState("mon");

  if (!routine) return null;

  return (
    <div className="widget-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)" }}>
            Weekly Routine Schedule
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            7-day plan distribution based on {routine.title}
          </p>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="weekly-days-tabs">
        {days.map((day) => {
          const isActive = activeDay === day.id;
          return (
            <button
              key={day.id}
              className={`day-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => setActiveDay(day.id)}
            >
              <span>{day.label}</span>
              <span style={{ fontSize: "0.72rem", opacity: isActive ? 0.9 : 0.6 }}>{day.date}</span>
            </button>
          );
        })}
      </div>

      {/* Active Day Meal List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {routine.dailyTimeline && routine.dailyTimeline.map((meal) => (
          <div
            key={meal.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.85rem 1rem",
              background: "var(--bg-card-subtle)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
              gap: "1rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <span style={{ fontSize: "1.3rem" }}>{meal.emoji}</span>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary-700)" }}>
                  {meal.slotName} • {meal.time}
                </div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {meal.title}
                </h4>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {meal.calories} kcal • {meal.protein}g protein
                </div>
              </div>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenRecipe(meal, routine)}
            >
              <span>Recipe</span>
              <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
