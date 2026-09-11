import React, { useState, useEffect, useMemo } from "react";
import DashboardWidgets from "../components/DashboardWidgets";
import WeeklyPlanner from "../components/WeeklyPlanner";
import YouTubeIcon from "../components/YouTubeIcon";
import { ROUTINES_DATA, getRoutineById } from "../data/routinesData";
import { getRegionalRoutineForLocation, getAdaptedRoutineForLocation, getCurrentDayId } from "../data/regionalCuisinesData";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Utensils,
  Heart,
  RotateCw,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Share2,
  Clock,
  Calendar,
  MapPin,
  Globe,
  ArrowRight
} from "lucide-react";

export default function MyPlanView({
  activePlan,
  userProfile,
  onOpenPlanWizard,
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
  onShareRoutine,
  onApplyPlan,
  waterGlasses = 0,
  onUpdateWater,
  completedMealsData = { meals: [] },
  onToggleMealCompleted,
  favoriteMeals = [],
  onToggleFavoriteMeal,
  onShowToast,
  onExploreClick,
  onSelectRoutine
}) {
  // Live Real-Time Clock & Date State
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [planCuisineMode, setPlanCuisineMode] = useState("regional"); // "regional" | "global"
  const [selectedDay, setSelectedDay] = useState(() => getCurrentDayId());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatted date and time strings
  const dayName = currentTime.toLocaleDateString(undefined, { weekday: "long" });
  const fullDateStr = currentTime.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const shortDateStr = currentTime.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const timeStr = currentTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  const currentHour = currentTime.getHours();
  let greeting = "Good Evening";
  let greetingEmoji = "🌆";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
    greetingEmoji = "🌅";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
    greetingEmoji = "☀️";
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = "Good Evening";
    greetingEmoji = "🌆";
  } else {
    greeting = "Good Night";
    greetingEmoji = "🌙";
  }

  // Ultra-robust routine resolution
  let routine = activePlan;
  if (typeof routine === "string") {
    routine = getRoutineById(routine);
  }
  if (
    !routine ||
    typeof routine !== "object" ||
    !Array.isArray(routine.dailyTimeline) ||
    routine.dailyTimeline.length === 0
  ) {
    routine = (routine && routine.id && getRoutineById(routine.id)) || ROUTINES_DATA[0];
  }

  // Regional cuisine resolution for user's country & state
  const userCountry = userProfile?.country || "India";
  const userState = userProfile?.state || "Karnataka";
  const regionalRoutine = getRegionalRoutineForLocation(userCountry, userState);
  
  // Adapted routine based on selected cuisine mode and selected day of week
  const displayedRoutine = getAdaptedRoutineForLocation(
    routine,
    userCountry,
    userState,
    planCuisineMode,
    selectedDay
  ) || routine;

  const isCurrentlyRegional = planCuisineMode === "regional" || displayedRoutine.isRegionalAdapted;

  const completedMealsList =
    completedMealsData && Array.isArray(completedMealsData.meals)
      ? completedMealsData.meals
      : [];

  const safeFavoriteMeals = Array.isArray(favoriteMeals) ? favoriteMeals : [];

  const handleMealCheck = (e, mealId, mealTitle) => {
    e.stopPropagation();
    if (onToggleMealCompleted) onToggleMealCompleted(mealId);
    const isNowDone = !completedMealsList.includes(mealId);
    if (onShowToast) {
      if (isNowDone) {
        const nextCount = completedMealsList.length + 1;
        if (nextCount >= safeDailyTimeline.length) {
          onShowToast(`🎉 All ${safeDailyTimeline.length} meals completed today! Daily Routine Master badge unlocked!`);
        } else {
          onShowToast(`✅ Completed ${mealTitle}! (${nextCount}/${safeDailyTimeline.length} meals done)`);
        }
      } else {
        onShowToast(`Unchecked ${mealTitle}`);
      }
    }
  };

  const handleFavClick = (e, mealId) => {
    e.stopPropagation();
    if (onToggleFavoriteMeal) onToggleFavoriteMeal(mealId);
  };

  const safeDailyTimeline = Array.isArray(displayedRoutine.dailyTimeline)
    ? displayedRoutine.dailyTimeline
    : (routine.dailyTimeline || ROUTINES_DATA[0].dailyTimeline);

  return (
    <div style={{ padding: "2rem 0 4rem" }}>
      <div className="container">
        {/* Header with Active Routine Banner & Live Clock */}
        <div
          style={{
            background: "linear-gradient(135deg, #0F382A 0%, #14532D 100%)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            color: "#FFFFFF",
            boxShadow: "var(--shadow-md)",
            marginBottom: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
              <span
                className="badge"
                style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#6EE7B7",
                  border: "1px solid rgba(16, 185, 129, 0.4)"
                }}
              >
                {displayedRoutine.isCustom ? "✨ Custom Active Routine" : isCurrentlyRegional ? `📍 ${userState} Heritage Routine` : "⭐ Standard Active Routine"}
              </span>
              <span className="badge" style={{ background: "rgba(255, 255, 255, 0.15)", color: "#FFFFFF" }}>
                {displayedRoutine.category || "Health & Wellness"}
              </span>
              <span className="badge" style={{ background: "rgba(2, 132, 199, 0.2)", color: "#7DD3FC", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
                📍 {userState}, {userCountry}
              </span>
            </div>

            <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.3rem" }}>
              {displayedRoutine.title || "My Daily Nutrition Plan"}
            </h1>
            <p style={{ color: "#E2E8F0", fontSize: "0.9rem", maxWidth: "600px", marginBottom: "0.75rem" }}>
              {displayedRoutine.subtitle || displayedRoutine.description || "Personalized daily food routine for health and vitality."}
            </p>

            {/* Live Real-Time Date & Clock Bar */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                padding: "0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#FFFFFF",
                flexWrap: "wrap"
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <span className="live-pulsing-dot" />
                <span style={{ color: "#86EFAC", fontWeight: 700 }}>{dayName}, {fullDateStr}</span>
              </span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "#FEF08A", fontFamily: "monospace", fontWeight: 700, fontSize: "0.88rem" }}>
                <Clock size={13} />
                <span>{timeStr}</span>
              </span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>{greetingEmoji} {greeting}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn btn-accent btn-sm" onClick={onOpenPlanWizard}>
              <RotateCw size={15} />
              <span>Regenerate Routine</span>
            </button>

            {onShareRoutine && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onShareRoutine(displayedRoutine)}
                style={{
                  background: "#25D366",
                  color: "#FFFFFF",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(37, 211, 102, 0.3)"
                }}
                title="Share this plan to WhatsApp, Instagram, Facebook, and more"
              >
                <Share2 size={15} />
                <span>Share Plan</span>
              </button>
            )}

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectRoutine && onSelectRoutine(displayedRoutine.id || routine.id || "diabetes-friendly")}
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

        {/* Location-Aware Cuisine Dishes Switcher Bar */}
        <div
          style={{
            background: planCuisineMode === "regional" 
              ? "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)" 
              : "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
            border: planCuisineMode === "regional" ? "1.5px solid #6EE7B7" : "1.5px solid #93C5FD",
            borderRadius: "var(--radius-xl)",
            padding: "0.9rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            boxShadow: "var(--shadow-xs)",
            transition: "all 0.25s ease"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.5rem" }}>{planCuisineMode === "regional" ? "📍" : "🌎"}</span>
            <div>
              <div style={{ fontSize: "0.92rem", fontWeight: 800, color: planCuisineMode === "regional" ? "#065F46" : "#1E40AF" }}>
                {planCuisineMode === "regional"
                  ? `Showing Authentic Healthy ${userState} Dishes for ${routine.badge || "this Health Plan"}`
                  : `Showing Western & Global Dishes for ${routine.badge || "this Health Plan"}`}
              </div>
              <div style={{ fontSize: "0.8rem", color: planCuisineMode === "regional" ? "#047857" : "#3B82F6" }}>
                {planCuisineMode === "regional"
                  ? `Featuring authentic ${userState} low-GI / nutrient-dense dishes tailored for ${routine.title}`
                  : `Featuring standard international whole-food recipes tailored for ${routine.title}`}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              background: "#FFFFFF",
              padding: "0.25rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "var(--shadow-xs)"
            }}
          >
            <button
              type="button"
              onClick={() => {
                setPlanCuisineMode("regional");
                if (onShowToast) onShowToast(`📍 Switched to authentic ${userState} healthy dishes!`);
              }}
              style={{
                padding: "0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.78rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: planCuisineMode === "regional" ? "#059669" : "transparent",
                color: planCuisineMode === "regional" ? "#FFFFFF" : "var(--text-secondary)",
                transition: "all 0.18s ease"
              }}
            >
              📍 {userState} Dishes
            </button>
            <button
              type="button"
              onClick={() => {
                setPlanCuisineMode("global");
                if (onShowToast) onShowToast("🌎 Switched to Western / Global healthy dishes!");
              }}
              style={{
                padding: "0.35rem 0.85rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.78rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: planCuisineMode === "global" ? "#2563EB" : "transparent",
                color: planCuisineMode === "global" ? "#FFFFFF" : "var(--text-secondary)",
                transition: "all 0.18s ease"
              }}
            >
              🌎 Western / Global
            </button>
          </div>
        </div>

        {/* 2-Column Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Left Column: Today's Schedule & Meal Tracker + Weekly Planner Timetable */}
          <div>
            {/* Today's Schedule Box */}
            <div className="widget-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "1.25rem"
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)" }}>
                    Today's Routine Timeline
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    Real-time meal schedule for {dayName}, {fullDateStr}. Click any meal to view recipes, YouTube guides, or order food.
                  </p>
                </div>

                {/* Live Date, Time & Day Tag */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    background: "#F0FDF4",
                    border: "1.5px solid #86EFAC",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-xs)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span className="live-pulsing-dot-green" />
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#065F46" }}>
                      {shortDateStr}
                    </span>
                  </div>
                  <span style={{ color: "#86EFAC" }}>|</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#047857", fontFamily: "monospace" }}>
                    {timeStr}
                  </span>
                </div>
              </div>

              {/* Day-by-Day Varied Schedule Selector Tabs */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Calendar size={14} color="#059669" />
                    <span>Select Day of the Week:</span>
                  </div>
                  {selectedDay !== getCurrentDayId() && (
                    <button
                      className="btn btn-sm btn-accent"
                      onClick={() => {
                        setSelectedDay(getCurrentDayId());
                        if (onShowToast) onShowToast("📅 Jumped back to Today's schedule");
                      }}
                      style={{ padding: "0.25rem 0.6rem", fontSize: "0.72rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                    >
                      <Sparkles size={12} />
                      <span>Back to Today ({dayName.slice(0, 3)})</span>
                    </button>
                  )}
                </div>

                <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
                  {[
                    { id: "mon", label: "Mon", full: "Monday" },
                    { id: "tue", label: "Tue", full: "Tuesday" },
                    { id: "wed", label: "Wed", full: "Wednesday" },
                    { id: "thu", label: "Thu", full: "Thursday" },
                    { id: "fri", label: "Fri", full: "Friday" },
                    { id: "sat", label: "Sat", full: "Saturday" },
                    { id: "sun", label: "Sun", full: "Sunday" }
                  ].map((d) => {
                    const isSelected = selectedDay === d.id;
                    const isToday = getCurrentDayId() === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          setSelectedDay(d.id);
                          if (onShowToast) onShowToast(`🗓️ Showing ${d.full}'s authentic ${userState} healthy menu`);
                        }}
                        style={{
                          padding: "0.45rem 0.85rem",
                          borderRadius: "var(--radius-lg)",
                          border: isSelected ? "2px solid #059669" : "1px solid var(--border-subtle)",
                          background: isSelected ? "linear-gradient(135deg, #059669 0%, #10B981 100%)" : "var(--bg-card)",
                          color: isSelected ? "#FFFFFF" : "var(--text-primary)",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          whiteSpace: "nowrap",
                          boxShadow: isSelected ? "0 2px 8px rgba(5, 150, 105, 0.25)" : "none",
                          transition: "all 0.18s ease"
                        }}
                      >
                        <span>{d.label}</span>
                        {isToday && (
                          <span
                            style={{
                              background: isSelected ? "#FEF08A" : "#10B981",
                              color: isSelected ? "#713F12" : "#FFFFFF",
                              fontSize: "0.62rem",
                              fontWeight: 800,
                              padding: "0.1rem 0.35rem",
                              borderRadius: "var(--radius-full)"
                            }}
                          >
                            TODAY
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Meal Completion Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {safeDailyTimeline.map((meal, index) => {
                  const mealId = meal.id || `meal-${index}`;
                  const isDone = completedMealsList.includes(mealId);
                  const isFav = safeFavoriteMeals.includes(mealId);
                  const mealTitle = meal.title || "Healthy Meal";
                  const dishName = meal.orderQuery || mealTitle;
                  const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(dishName)}`;
                  const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(dishName)}`;

                  return (
                    <div
                      key={mealId}
                      className="my-plan-meal-card"
                      style={{
                        background: isDone ? "#F0FDF4" : "var(--bg-card-subtle)",
                        border: isDone ? "1.5px solid #86EFAC" : "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-xl)",
                        padding: "1.1rem",
                        transition: "all 0.22s ease",
                        cursor: "pointer"
                      }}
                      onClick={() => onOpenRecipe && onOpenRecipe(meal, displayedRoutine)}
                      title="Click to view full recipe, YouTube guides and delivery options"
                    >
                      {/* Top Info Header */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                        {/* Checkbox Trigger */}
                        <button
                          onClick={(e) => handleMealCheck(e, mealId, mealTitle)}
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
                            alt={mealTitle}
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
                                {meal.slotName || `Slot ${index + 1}`} • {meal.time || "Daily"}
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
                              onClick={(e) => handleFavClick(e, mealId)}
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
                            {mealTitle}
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
                            <span>🔥 {meal.calories || 300} kcal</span>
                            <span>🍗 {meal.protein || 15}g protein</span>
                            <span>🌾 {meal.carbs || 35}g carbs</span>
                            <span>⏱️ {meal.prepTime || "15 min"}</span>
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
                            onClick={() => onOpenRecipe && onOpenRecipe(meal, displayedRoutine)}
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

            {/* Weekly Timetable Schedule (Auto-synced with current week) */}
            <WeeklyPlanner
              routine={displayedRoutine}
              onOpenRecipe={onOpenRecipe}
              onOpenYouTube={onOpenYouTube}
              onOpenOrder={onOpenOrder}
            />
          </div>

          {/* Right Column: Dashboard Widgets (Hydration, Progress, Streaks) */}
          <div>
            <DashboardWidgets
              waterGlasses={waterGlasses}
              onUpdateWater={onUpdateWater}
              completedMealsData={completedMealsData}
              totalMealsCount={safeDailyTimeline.length}
              onToggleMealCompleted={onToggleMealCompleted}
              routine={displayedRoutine}
              savedRecipesCount={safeFavoriteMeals.length}
              onShowToast={onShowToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
