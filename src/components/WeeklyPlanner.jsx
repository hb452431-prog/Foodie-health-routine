import React, { useState, useMemo } from "react";
import { Calendar, CheckCircle, Clock, Utensils, ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";
import { ROUTINES_DATA } from "../data/routinesData";

// Helper function to calculate current week's 7 days based on today
function getWeeklyCalendarDays() {
  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  
  // Calculate offset to reach Monday of current week
  // If Sunday (0), distance to Monday is -6 days
  const mondayOffset = currentDayIndex === 0 ? -6 : 1 - currentDayIndex;
  
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const dayDefinitions = [
    { id: "mon", label: "Mon", full: "Monday" },
    { id: "tue", label: "Tue", full: "Tuesday" },
    { id: "wed", label: "Wed", full: "Wednesday" },
    { id: "thu", label: "Thu", full: "Thursday" },
    { id: "fri", label: "Fri", full: "Friday" },
    { id: "sat", label: "Sat", full: "Saturday" },
    { id: "sun", label: "Sun", full: "Sunday" }
  ];

  const todayId = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][currentDayIndex];

  const days = dayDefinitions.map((item, index) => {
    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + index);
    const isToday = item.id === todayId;

    return {
      id: item.id,
      label: item.label,
      full: item.full,
      date: targetDate.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      fullDate: targetDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
      isToday,
      rawDate: targetDate
    };
  });

  return { days, todayId };
}

export default function WeeklyPlanner({ routine, onOpenRecipe, onOpenYouTube, onOpenOrder }) {
  const { days, todayId } = useMemo(() => getWeeklyCalendarDays(), []);
  
  // Automatically select today's day tab by default
  const [activeDay, setActiveDay] = useState(todayId);

  const activeDayObj = days.find((d) => d.id === activeDay) || days[0];
  const todayDayObj = days.find((d) => d.id === todayId) || days[0];

  const safeTimeline = (routine && Array.isArray(routine.dailyTimeline) && routine.dailyTimeline.length > 0)
    ? routine.dailyTimeline
    : (ROUTINES_DATA[0].dailyTimeline || []);

  const safeTitle = routine?.title || "Active Routine";

  return (
    <div className="widget-card">
      {/* Timetable Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
            <Calendar size={20} color="var(--primary-700)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
              Weekly Routine Timetable
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
            Showing schedule for <strong style={{ color: "var(--primary-900)" }}>{activeDayObj.full}, {activeDayObj.date}</strong> (Auto-synced with current week) • {safeTitle}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {activeDayObj.isToday ? (
            <span
              className="badge"
              style={{
                background: "#DCFCE7",
                color: "#15803D",
                border: "1px solid #86EFAC",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.35rem 0.75rem",
                fontWeight: 700
              }}
            >
              <span className="live-pulsing-dot-green" />
              <span>Today's Timetable</span>
            </span>
          ) : (
            <button
              className="btn btn-sm btn-accent"
              onClick={() => setActiveDay(todayId)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              title={`Switch view back to today (${todayDayObj.full})`}
            >
              <Sparkles size={13} />
              <span>Jump to Today ({todayDayObj.label})</span>
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Day Selector Tabs */}
      <div className="weekly-days-tabs">
        {days.map((day) => {
          const isActive = activeDay === day.id;
          return (
            <button
              key={day.id}
              className={`day-tab-btn ${isActive ? "active" : ""} ${day.isToday ? "today-tab" : ""}`}
              onClick={() => setActiveDay(day.id)}
              title={`${day.full}, ${day.date}${day.isToday ? " (Today)" : ""}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span>{day.label}</span>
                {day.isToday && <span className="live-pulsing-dot-green" style={{ width: "6px", height: "6px" }} />}
              </div>
              <span style={{ fontSize: "0.72rem", opacity: isActive ? 0.95 : 0.7 }}>{day.date}</span>
              {day.isToday && <span className="day-today-tag">TODAY</span>}
            </button>
          );
        })}
      </div>

      {/* Selected Day Timetable Banner */}
      <div
        style={{
          background: activeDayObj.isToday ? "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)" : "var(--bg-card-subtle)",
          border: activeDayObj.isToday ? "1px solid #86EFAC" : "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          padding: "0.75rem 1rem",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Clock size={16} color={activeDayObj.isToday ? "#15803D" : "var(--primary-700)"} />
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: activeDayObj.isToday ? "#14532D" : "var(--text-primary)" }}>
            {activeDayObj.fullDate} {activeDayObj.isToday && "• Today's Meals"}
          </span>
        </div>
        <span style={{ fontSize: "0.78rem", color: activeDayObj.isToday ? "#15803D" : "var(--text-muted)", fontWeight: 600 }}>
          {safeTimeline.length} Planned Meals
        </span>
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
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", margin: "0.15rem 0" }}>
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
