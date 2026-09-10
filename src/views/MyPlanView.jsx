import React from "react";
import DashboardWidgets from "../components/DashboardWidgets";
import WeeklyPlanner from "../components/WeeklyPlanner";
import ShoppingList from "../components/ShoppingList";
import YouTubeIcon from "../components/YouTubeIcon";
import { ROUTINES_DATA } from "../data/routinesData";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Utensils,
  Heart,
  RotateCw,
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function MyPlanView({
  activePlan,
  onOpenPlanWizard,
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
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
  // If user hasn't generated a plan yet, fallback to first routine
  const routine = activePlan || ROUTINES_DATA[0];

  const handleMealCheck = (e, mealId, mealTitle) => {
    e.stopPropagation();
    onToggleMealCompleted(mealId);
    const isNowDone = !completedMealsData?.meals?.includes(mealId);
    onShowToast(isNowDone ? `✅ Completed ${mealTitle}!` : `Unchecked ${mealTitle}`);
  };

  const handleFavClick = (e, mealId) => {
    e.stopPropagation();
    onToggleFavoriteMeal(mealId);
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
              <span
                className="badge"
                style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#6EE7B7",
                  border: "1px solid rgba(16, 185, 129, 0.4)"
                }}
              >
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
            <button className="btn btn-accent btn-sm" onClick={onOpenPlanWizard}>
              <RotateCw size={15} />
              <span>Regenerate Routine</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectRoutine(routine.id)}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.25rem"
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)" }}>
                    Today's Routine Timeline
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    Click any meal to view preparation recipe, YouTube guides, or Swiggy & Zomato ordering.
                  </p>
                </div>

                <span className="badge badge-green">
                  {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                </span>
              </div>

              {/* Meal Completion Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {routine.dailyTimeline &&
                  routine.dailyTimeline.map((meal) => {
                    const isDone = completedMealsData?.meals?.includes(meal.id);
                    const isFav = favoriteMeals.includes(meal.id);
                    const dishName = meal.orderQuery || meal.title;
                    const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(dishName)}`;
                    const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(dishName)}`;

                    return (
                      <div
                        key={meal.id}
                        className="my-plan-meal-card"
                        style={{
                          background: isDone ? "#F0FDF4" : "var(--bg-card-subtle)",
                          border: isDone ? "1.5px solid #86EFAC" : "1px solid var(--border-subtle)",
                          borderRadius: "var(--radius-xl)",
                          padding: "1.1rem",
                          transition: "all 0.22s ease",
                          cursor: "pointer"
                        }}
                        onClick={() => onOpenRecipe(meal, routine)}
                        title="Click to view full recipe, YouTube guides and delivery options"
                      >
                        {/* Top Info Header */}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                          {/* Checkbox Trigger */}
                          <button
                            onClick={(e) => handleMealCheck(e, meal.id, meal.title)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: isDone ? "#059669" : "var(--text-muted)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0.2rem",
                              flexShrink: 0,
                              marginTop: "2px"
                            }}
                            title={isDone ? "Mark uncompleted" : "Mark meal completed"}
                          >
                            {isDone ? (
                              <CheckCircle2 size={26} fill="#10B981" color="#FFFFFF" />
                            ) : (
                              <Circle size={26} />
                            )}
                          </button>

                          {/* Meal Thumbnail */}
                          {meal.image && (
                            <img
                              src={meal.image}
                              alt={meal.title}
                              style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "var(--radius-md)",
                                objectFit: "cover",
                                flexShrink: 0,
                                border: "1px solid var(--border-subtle)"
                              }}
                            />
                          )}

                          {/* Meal Details */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "0.5rem",
                                marginBottom: "0.2rem"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    color: "var(--primary-700)"
                                  }}
                                >
                                  {meal.slotName} • {meal.time}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    color: meal.isVeg ? "#059669" : "#DC2626",
                                    fontWeight: 600
                                  }}
                                >
                                  • {meal.dietType || (meal.isVeg ? "Veg" : "Non-Veg")}
                                </span>
                              </div>

                              <button
                                onClick={(e) => handleFavClick(e, meal.id)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: isFav ? "#EF4444" : "var(--text-muted)",
                                  padding: "0.2rem"
                                }}
                                title={isFav ? "Saved in favorite meals" : "Save meal to favorites"}
                              >
                                <Heart size={18} fill={isFav ? "#EF4444" : "none"} />
                              </button>
                            </div>

                            <h4
                              style={{
                                fontSize: "1.05rem",
                                fontWeight: 800,
                                color: isDone ? "#065F46" : "var(--text-primary)",
                                textDecoration: isDone ? "line-through" : "none",
                                marginBottom: "0.25rem"
                              }}
                            >
                              {meal.title}
                            </h4>

                            <div
                              style={{
                                fontSize: "0.78rem",
                                color: "var(--text-muted)",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.75rem"
                              }}
                            >
                              <span>🔥 {meal.calories} kcal</span>
                              <span>🍗 {meal.protein}g protein</span>
                              <span>🌾 {meal.carbs}g carbs</span>
                              <span>⏱️ {meal.prepTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Action Buttons Row */}
                        <div
                          style={{
                            marginTop: "0.9rem",
                            paddingTop: "0.85rem",
                            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "0.6rem"
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Recipe and YouTube Buttons */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => onOpenRecipe(meal, routine)}
                              title="View full ingredient checklist and preparation steps"
                            >
                              <Utensils size={14} />
                              <span>View Recipe</span>
                            </button>

                            {onOpenYouTube && (
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => onOpenYouTube(meal)}
                                style={{
                                  color: "#DC2626",
                                  background: "#FEF2F2",
                                  border: "1px solid #FECACA"
                                }}
                                title="Watch YouTube preparation video guides"
                              >
                                <YouTubeIcon size={14} color="#DC2626" fill={true} />
                                <span>Watch Video</span>
                              </button>
                            )}

                            {onOpenOrder && (
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => onOpenOrder(meal)}
                                style={{
                                  color: "#D97706",
                                  background: "#FFFBEB",
                                  border: "1px solid #FDE68A"
                                }}
                                title="Order this dish from nearby restaurants"
                              >
                                <ShoppingBag size={14} />
                                <span>Order Food</span>
                              </button>
                            )}
                          </div>

                          {/* Direct Quick Delivery Links (Swiggy & Zomato) */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <a
                              href={swiggyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                padding: "0.3rem 0.6rem",
                                borderRadius: "var(--radius-full)",
                                background: "rgba(252, 128, 25, 0.12)",
                                color: "#C2410C",
                                border: "1px solid rgba(252, 128, 25, 0.25)",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textDecoration: "none"
                              }}
                              title={`Order "${dishName}" on Swiggy`}
                            >
                              <span>🛵 Swiggy</span>
                              <ExternalLink size={11} />
                            </a>

                            <a
                              href={zomatoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                padding: "0.3rem 0.6rem",
                                borderRadius: "var(--radius-full)",
                                background: "rgba(226, 55, 68, 0.12)",
                                color: "#B91C1C",
                                border: "1px solid rgba(226, 55, 68, 0.25)",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textDecoration: "none"
                              }}
                              title={`Order "${dishName}" on Zomato`}
                            >
                              <span>🍴 Zomato</span>
                              <ExternalLink size={11} />
                            </a>
                          </div>
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
              onOpenYouTube={onOpenYouTube}
              onOpenOrder={onOpenOrder}
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

            <ShoppingList routine={routine} onShowToast={onShowToast} />
          </div>
        </div>
      </div>
    </div>
  );
}
