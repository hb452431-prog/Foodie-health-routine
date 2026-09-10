import React, { useState } from "react";
import DashboardWidgets from "../components/DashboardWidgets";
import WeeklyPlanner from "../components/WeeklyPlanner";
import ShoppingList from "../components/ShoppingList";
import { ROUTINES_DATA } from "../data/routinesData";
import { Sparkles, Calendar, CheckCircle2, Circle, Utensils, Heart, Plus, Clock, ExternalLink, RotateCw } from "lucide-react";

export default function MyPlanView({
  activePlan,
  onOpenPlanWizard,
  onOpenRecipe,
  waterGlasses,
  onUpdateWater,
  completedMealsData,
  onToggleMealCompleted,
  favoriteMeals,
  onToggleFavoriteMeal,
  onShowToast,
  onExploreClick,
  onSelectRoutine
}) {
  // If user hasn't generated a plan yet, fallback to Diabetes-friendly or default routine
  const routine = activePlan || ROUTINES_DATA[0];

  const handleMealCheck = (mealId, mealTitle) => {
    onToggleMealCompleted(mealId);
    const isNowDone = !completedMealsData?.meals?.includes(mealId);
    onShowToast(isNowDone ? `✅ Completed ${mealTitle}!` : `Unchecked ${mealTitle}`);
  };

  return (
    <div style={{ padding: "2rem 0 4rem" }}>
      <div className="container">
        {/* Header with Active Routine Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #0F382A 0%, #14532D 100%)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            color: "#FFFFFF",
            boxShadow: "var(--shadow-md)",
            marginBottom: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="badge" style={{ background: "rgba(16, 185, 129, 0.2)", color: "#6EE7B7", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
                {activePlan?.isCustom ? "✨ Custom Active Routine" : "⭐ Standard Active Routine"}
              </span>
              <span className="badge" style={{ background: "rgba(255, 255, 255, 0.15)", color: "#FFFFFF" }}>
                {routine.category}
              </span>
            </div>

            <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.4rem" }}>
              {routine.title}
            </h1>
            <p style={{ color: "#E2E8F0", fontSize: "0.9rem", maxWidth: "600px" }}>
              {routine.subtitle || routine.description}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              className="btn btn-accent btn-sm"
              onClick={onOpenPlanWizard}
            >
              <RotateCw size={15} />
              <span>Regenerate Routine</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectRoutine(routine.id)}
              style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Full Details
            </button>
          </div>
        </div>

        {/* 2-Column Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Left Column: Today's Schedule & Meal Tracker + Weekly Planner */}
          <div>
            {/* Today's Schedule Box */}
            <div className="widget-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)" }}>
                    Today's Routine Timeline
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    Tap checkmark as you consume each meal to track daily calories & protein.
                  </p>
                </div>

                <span className="badge badge-green">
                  {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                </span>
              </div>

              {/* Meal Completion Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {routine.dailyTimeline && routine.dailyTimeline.map((meal) => {
                  const isDone = completedMealsData?.meals?.includes(meal.id);
                  const isFav = favoriteMeals.includes(meal.id);

                  return (
                    <div
                      key={meal.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem",
                        background: isDone ? "#F0FDF4" : "var(--bg-card-subtle)",
                        border: isDone ? "1.5px solid #86EFAC" : "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-lg)",
                        transition: "all 0.2s ease",
                        gap: "1rem"
                      }}
                    >
                      {/* Checkbox Trigger */}
                      <button
                        onClick={() => handleMealCheck(meal.id, meal.title)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: isDone ? "#059669" : "var(--text-muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.2rem",
                          flexShrink: 0
                        }}
                        title={isDone ? "Mark uncompleted" : "Mark meal completed"}
                      >
                        {isDone ? (
                          <CheckCircle2 size={26} fill="#10B981" color="#FFFFFF" />
                        ) : (
                          <Circle size={26} />
                        )}
                      </button>

                      {/* Meal Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary-700)" }}>
                            {meal.slotName} • {meal.time}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: meal.isVeg ? "#059669" : "#DC2626", fontWeight: 600 }}>
                            • {meal.dietType || (meal.isVeg ? "Veg" : "Non-Veg")}
                          </span>
                        </div>

                        <h4
                          style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: isDone ? "#065F46" : "var(--text-primary)",
                            textDecoration: isDone ? "line-through" : "none"
                          }}
                        >
                          {meal.title}
                        </h4>

                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", gap: "0.75rem", marginTop: "0.2rem" }}>
                          <span>🔥 {meal.calories} kcal</span>
                          <span>🍗 {meal.protein}g protein</span>
                          <span>🌾 {meal.carbs}g carbs</span>
                        </div>
                      </div>

                      {/* Recipe & Favorite actions */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <button
                          onClick={() => onToggleFavoriteMeal(meal.id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: isFav ? "#EF4444" : "var(--text-muted)",
                            padding: "0.3rem"
                          }}
                          title={isFav ? "Saved in favorite meals" : "Save meal to favorites"}
                        >
                          <Heart size={18} fill={isFav ? "#EF4444" : "none"} />
                        </button>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onOpenRecipe(meal, routine)}
                        >
                          <Utensils size={14} />
                          <span>Recipe</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Schedule */}
            <WeeklyPlanner
              routine={routine}
              onOpenRecipe={onOpenRecipe}
            />
          </div>

          {/* Right Column: Dashboard Widgets & Smart Shopping List */}
          <div>
            <DashboardWidgets
              waterGlasses={waterGlasses}
              onUpdateWater={onUpdateWater}
              completedMealsData={completedMealsData}
              totalMealsCount={routine.dailyTimeline?.length || 6}
              onToggleMealCompleted={onToggleMealCompleted}
              routine={routine}
              savedRecipesCount={favoriteMeals.length}
              onShowToast={onShowToast}
            />

            <ShoppingList
              routine={routine}
              onShowToast={onShowToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
