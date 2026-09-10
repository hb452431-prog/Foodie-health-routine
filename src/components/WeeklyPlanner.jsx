import React, { useState } from "react";
import { Calendar, CheckCircle, Clock, Utensils, ChevronRight, ShoppingBag } from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";
import { ROUTINES_DATA } from "../data/routinesData";

export default function WeeklyPlanner({ routine, onOpenRecipe, onOpenYouTube, onOpenOrder }) {
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

  const safeTimeline = (routine && Array.isArray(routine.dailyTimeline) && routine.dailyTimeline.length > 0)
    ? routine.dailyTimeline
    : (ROUTINES_DATA[0].dailyTimeline || []);

  const safeTitle = routine?.title || "Active Routine";

  return (
    <div className="widget-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)" }}>
            Weekly Routine Schedule
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            7-day plan distribution based on {safeTitle}. Click any meal to view recipes, YouTube videos, or delivery options.
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
        {safeTimeline.map((meal, index) => {
          const mealId = meal.id || `weekly-meal-${index}`;
          const mealTitle = meal.title || "Healthy Meal";
          const mealEmoji = meal.emoji || "🥗";
          const mealCalories = meal.calories || 300;
          const mealProtein = meal.protein || 15;

          return (
            <div
              key={mealId}
              className="weekly-meal-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 1rem",
                background: "var(--bg-card-subtle)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-subtle)",
                gap: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onClick={() => onOpenRecipe && onOpenRecipe(meal, routine)}
              title="Click to view preparation recipe and details"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{mealEmoji}</span>
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--primary-700)"
                    }}
                  >
                    {meal.slotName || `Meal ${index + 1}`} • {meal.time || "Daily"}
                  </div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {mealTitle}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {mealCalories} kcal • {mealProtein}g protein
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onOpenRecipe && onOpenRecipe(meal, routine)}
                  title="View Recipe Details"
                >
                  <Utensils size={13} />
                  <span>Recipe</span>
                </button>

                {onOpenYouTube && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenYouTube(meal)}
                    style={{ color: "#DC2626", padding: "0.35rem 0.55rem" }}
                    title="Watch YouTube Guide"
                  >
                    <YouTubeIcon size={14} color="#DC2626" fill={true} />
                  </button>
                )}

                {onOpenOrder && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenOrder(meal)}
                    style={{ color: "#D97706", padding: "0.35rem 0.55rem" }}
                    title="Order on Swiggy / Zomato"
                  >
                    <ShoppingBag size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
