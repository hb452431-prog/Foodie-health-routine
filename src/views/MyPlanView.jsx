import React, { useState, useEffect } from "react";
import DashboardWidgets from "../components/DashboardWidgets";
import WeeklyPlanner from "../components/WeeklyPlanner";
import YouTubeIcon from "../components/YouTubeIcon";
import OrderDeliveryLinks from "../components/OrderDeliveryLinks";
import { ROUTINES_DATA, getRoutineById } from "../data/routinesData";
import { getAdaptedRoutineForLocation, getCurrentDayId } from "../data/regionalCuisinesData";
import { useLocation } from "../context/LocationContext";
import {
  CheckCircle2,
  Circle,
  Utensils,
  Heart,
  RotateCw,
  ShoppingBag,
  Share2,
  Clock,
  SlidersHorizontal,
  Bookmark,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function MyPlanView({
  activePlan,
  userProfile,
  onOpenPlanWizard,
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
  onShareRoutine,
  waterGlasses = 0,
  onUpdateWater,
  completedMealsData = { meals: [] },
  onToggleMealCompleted,
  favoriteMeals = [],
  onToggleFavoriteMeal,
  onShowToast,
  onSelectRoutine,
  savedRoutines = []
}) {
  const { locationData, setIsManualModalOpen } = useLocation();

  // Top Tabs: "today" | "weekly" | "saved"
  const [activePlanTab, setActivePlanTab] = useState("today");

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

  // Location cuisine resolution based on active location (GPS or manual)
  const userCountry = locationData?.country || userProfile?.country || "India";
  const userState = locationData?.state || userProfile?.state || "Karnataka";
  const userCity = locationData?.city || "Bengaluru";
  
  // Adapted routine based on selected cuisine mode and selected day of week
  const displayedRoutine = getAdaptedRoutineForLocation(
    routine,
    userCountry,
    userState,
    planCuisineMode,
    selectedDay
  ) || routine;

  const isCurrentlyRegional = planCuisineMode === "regional" || displayedRoutine.isRegionalAdapted;

  const safeDailyTimeline = Array.isArray(displayedRoutine.dailyTimeline)
    ? displayedRoutine.dailyTimeline
    : (routine.dailyTimeline || ROUTINES_DATA[0].dailyTimeline);

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

  // Saved routines list
  const savedRoutinesList = ROUTINES_DATA.filter((r) => savedRoutines.includes(r.id));

  // Favorite meals list
  const favoriteMealsObjects = [];
  ROUTINES_DATA.forEach((r) => {
    r.dailyTimeline?.forEach((m) => {
      if (safeFavoriteMeals.includes(m.id) && !favoriteMealsObjects.some((item) => item.id === m.id)) {
        favoriteMealsObjects.push({ ...m, parentRoutine: r });
      }
    });
  });

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
                  background: (displayedRoutine.isCustom || displayedRoutine.isAIGenerated || String(displayedRoutine.id || "").startsWith("ai-routine-") || String(displayedRoutine.id || "").startsWith("custom-"))
                    ? "rgba(16, 185, 129, 0.25)"
                    : isCurrentlyRegional
                    ? "rgba(16, 185, 129, 0.2)"
                    : "rgba(255, 255, 255, 0.15)",
                  color: (displayedRoutine.isCustom || displayedRoutine.isAIGenerated || String(displayedRoutine.id || "").startsWith("ai-routine-") || String(displayedRoutine.id || "").startsWith("custom-"))
                    ? "#86EFAC"
                    : isCurrentlyRegional
                    ? "#6EE7B7"
                    : "#FFFFFF",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  fontWeight: 800
                }}
              >
                {(displayedRoutine.isCustom || displayedRoutine.isAIGenerated || String(displayedRoutine.id || "").startsWith("ai-routine-") || String(displayedRoutine.id || "").startsWith("custom-"))
                  ? "✨ AI Personalized Active Routine"
                  : isCurrentlyRegional
                  ? `📍 ${userState} Heritage Routine`
                  : "⭐ Standard Active Routine"}
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

            {/* Quick Macro Target Chips */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.85rem" }}>
              <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700, color: "#FED7AA" }}>
                🔥 {displayedRoutine.calories || 2000} kcal
              </span>
              <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700, color: "#93C5FD" }}>
                🥩 {displayedRoutine.protein || 85}g Protein
              </span>
              <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700, color: "#BBF7D0" }}>
                🌾 {displayedRoutine.carbs || 220}g Carbs
              </span>
              <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.78rem", fontWeight: 700, color: "#FDE68A" }}>
                🥑 {displayedRoutine.fat || 50}g Fats
              </span>
            </div>

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

        {/* 3 Main Tabs: [ Today ] [ Weekly ] [ Saved ] */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            background: "#FFFFFF",
            padding: "0.4rem",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-xs)",
            marginBottom: "1.5rem",
            maxWidth: "480px"
          }}
        >
          <button
            type="button"
            onClick={() => setActivePlanTab("today")}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "var(--radius-lg)",
              fontWeight: 800,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              background: activePlanTab === "today" ? "linear-gradient(135deg, #059669 0%, #10B981 100%)" : "transparent",
              color: activePlanTab === "today" ? "#FFFFFF" : "var(--text-secondary)",
              boxShadow: activePlanTab === "today" ? "0 2px 8px rgba(5, 150, 105, 0.25)" : "none",
              transition: "all 0.18s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem"
            }}
          >
            <span>🌅 Today</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlanTab("weekly")}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "var(--radius-lg)",
              fontWeight: 800,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              background: activePlanTab === "weekly" ? "linear-gradient(135deg, #059669 0%, #10B981 100%)" : "transparent",
              color: activePlanTab === "weekly" ? "#FFFFFF" : "var(--text-secondary)",
              boxShadow: activePlanTab === "weekly" ? "0 2px 8px rgba(5, 150, 105, 0.25)" : "none",
              transition: "all 0.18s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem"
            }}
          >
            <span>🗓️ Weekly</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlanTab("saved")}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "var(--radius-lg)",
              fontWeight: 800,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              background: activePlanTab === "saved" ? "linear-gradient(135deg, #059669 0%, #10B981 100%)" : "transparent",
              color: activePlanTab === "saved" ? "#FFFFFF" : "var(--text-secondary)",
              boxShadow: activePlanTab === "saved" ? "0 2px 8px rgba(5, 150, 105, 0.25)" : "none",
              transition: "all 0.18s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem"
            }}
          >
            <span>⭐ Saved ({savedRoutinesList.length + favoriteMealsObjects.length})</span>
          </button>
        </div>

        {/* TAB 1: TODAY'S SCHEDULE & MEAL CHECKLIST */}
        {activePlanTab === "today" && (
          <div>
            {/* Location-Aware Cuisine Dishes Switcher Bar OR AI Routine Confirmation */}
            {(displayedRoutine.isCustom || displayedRoutine.isAIGenerated || String(displayedRoutine.id || "").startsWith("ai-routine-") || String(displayedRoutine.id || "").startsWith("custom-")) ? (
              <div
                style={{
                  background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
                  border: "1.5px solid #6EE7B7",
                  borderRadius: "var(--radius-xl)",
                  padding: "0.9rem 1.25rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>✨</span>
                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#065F46" }}>
                      Active AI Custom Nutrition Routine
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#047857" }}>
                      Customized with verified authentic dishes from your Central Food Knowledge Base.
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={onOpenPlanWizard}
                    style={{
                      background: "linear-gradient(135deg, #10B981, #059669)",
                      fontSize: "0.78rem",
                      padding: "0.35rem 0.75rem"
                    }}
                  >
                    <RotateCw size={13} style={{ marginRight: "0.3rem" }} />
                    Modify Routine
                  </button>
                </div>
              </div>
            ) : (
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
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{planCuisineMode === "regional" ? "📍" : "🌎"}</span>
                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 800, color: planCuisineMode === "regional" ? "#065F46" : "#1E40AF" }}>
                      {planCuisineMode === "regional"
                        ? `Showing Authentic Healthy ${userCity}, ${userState} Dishes for ${routine.badge || "this Health Plan"}`
                        : `Showing Western & Global Dishes for ${routine.badge || "this Health Plan"}`}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: planCuisineMode === "regional" ? "#047857" : "#3B82F6" }}>
                      {planCuisineMode === "regional"
                        ? `Featuring authentic ${userCity} & ${userState} low-GI / nutrient-dense dishes tailored for ${routine.title}`
                        : `Featuring standard international whole-food recipes tailored for ${routine.title}`}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsManualModalOpen(true)}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,0.1)",
                      color: "var(--text-secondary)",
                      padding: "0.35rem 0.75rem",
                      fontSize: "0.78rem"
                    }}
                    title="Change your location"
                  >
                    <SlidersHorizontal size={13} />
                    <span>Change City ({userCity})</span>
                  </button>

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
                        if (onShowToast) onShowToast(`📍 Switched to authentic ${userCity}, ${userState} healthy dishes!`);
                      }}
                      style={{
                        padding: "0.35rem 0.85rem",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        background: planCuisineMode === "regional" ? "#059669" : "transparent",
                        color: planCuisineMode === "regional" ? "#FFFFFF" : "var(--text-secondary)"
                      }}
                    >
                      📍 {userCity} Dishes
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
                        color: planCuisineMode === "global" ? "#FFFFFF" : "var(--text-secondary)"
                      }}
                    >
                      🌎 Western / Global
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2-Column Dashboard Grid */}
            <div className="dashboard-grid">
              {/* Left Column: Today's Schedule & Meal Tracker */}
              <div>
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
                        Today's Meal Routine
                      </h3>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        Check off each meal as you complete it. Click any card to view recipes, YouTube videos or delivery.
                      </p>
                    </div>

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
                      <span className="live-pulsing-dot-green" />
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#065F46" }}>
                        {shortDateStr}
                      </span>
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
                        >
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

                          {/* Action Buttons Row */}
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
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => onOpenRecipe && onOpenRecipe(meal, displayedRoutine)}
                              >
                                <Utensils size={14} />
                                <span>View Recipe</span>
                              </button>

                              {onOpenYouTube && (
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => onOpenYouTube(meal)}
                                  style={{ color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA" }}
                                >
                                  <YouTubeIcon size={14} color="#DC2626" fill={true} />
                                  <span>Watch Video</span>
                                </button>
                              )}

                              {onOpenOrder && (
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => onOpenOrder(meal)}
                                  style={{ color: "#D97706", background: "#FFFBEB", border: "1px solid #FDE68A" }}
                                >
                                  <ShoppingBag size={14} />
                                  <span>Order Food</span>
                                </button>
                              )}
                            </div>

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
        )}

        {/* TAB 2: WEEKLY TIMETABLE */}
        {activePlanTab === "weekly" && (
          <div>
            <WeeklyPlanner
              routine={displayedRoutine}
              onOpenRecipe={onOpenRecipe}
              onOpenYouTube={onOpenYouTube}
              onOpenOrder={onOpenOrder}
            />
          </div>
        )}

        {/* TAB 3: SAVED ROUTINES & FAVORITE RECIPES */}
        {activePlanTab === "saved" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Saved Routines */}
            <div className="widget-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                    Saved Food Routines ({savedRoutinesList.length})
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
                    Your saved nutrition blueprints ready to apply to your daily plan anytime.
                  </p>
                </div>
              </div>

              {savedRoutinesList.length > 0 ? (
                <div className="routines-grid">
                  {savedRoutinesList.map((routineItem) => (
                    <div
                      key={routineItem.id}
                      className="routine-card"
                      style={{ cursor: "pointer" }}
                      onClick={() => onSelectRoutine && onSelectRoutine(routineItem.id)}
                    >
                      <img
                        src={routineItem.image}
                        alt={routineItem.title}
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                      />
                      <div style={{ padding: "1rem" }}>
                        <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                          {routineItem.title}
                        </h4>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                          🔥 {routineItem.calories} kcal • 🍗 {routineItem.protein}g P
                        </div>
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ width: "100%", justifyContent: "center" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectRoutine) onSelectRoutine(routineItem.id);
                          }}
                        >
                          <span>Open Routine</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
                  <Bookmark size={36} color="#CBD5E1" style={{ margin: "0 auto 0.5rem" }} />
                  <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>No saved food routines yet.</p>
                  <p style={{ fontSize: "0.82rem" }}>Browse Explore and click the bookmark icon on any routine!</p>
                </div>
              )}
            </div>

            {/* Favorite Recipes */}
            <div className="widget-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                    Favorite Recipes & Meals ({favoriteMealsObjects.length})
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
                    Quick access to all dishes you've marked with a heart.
                  </p>
                </div>
              </div>

              {favoriteMealsObjects.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                  {favoriteMealsObjects.map((meal) => (
                    <div
                      key={meal.id}
                      style={{
                        background: "var(--bg-card-subtle)",
                        borderRadius: "var(--radius-lg)",
                        padding: "1rem",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        gap: "0.85rem",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                      onClick={() => { if (onOpenRecipe) onOpenRecipe(meal, meal.parentRoutine || displayedRoutine); }}
                    >
                      {meal.image && (
                        <img
                          src={meal.image}
                          alt={meal.title}
                          style={{ width: "60px", height: "60px", borderRadius: "var(--radius-md)", objectFit: "cover", flexShrink: 0 }}
                        />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--primary-900)", margin: "0 0 0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {meal.title}
                        </h4>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                          🔥 {meal.calories} kcal • ⏱️ {meal.prepTime || "15 min"}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.3rem" }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "0.25rem 0.6rem", fontSize: "0.72rem" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenRecipe) onOpenRecipe(meal, meal.parentRoutine || displayedRoutine);
                            }}
                          >
                            <Utensils size={11} />
                            <span>View Recipe</span>
                          </button>
                          <OrderDeliveryLinks dishName={meal.orderQuery || meal.title} variant="pills" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
                  <Heart size={36} color="#CBD5E1" style={{ margin: "0 auto 0.5rem" }} />
                  <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>No favorite recipes saved yet.</p>
                  <p style={{ fontSize: "0.82rem" }}>Click the heart icon on any meal to access it here anytime!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
