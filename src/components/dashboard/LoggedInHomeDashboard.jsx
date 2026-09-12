import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "../../context/LocationContext";
import {
  Sparkles,
  Search,
  MapPin,
  Compass,
  Calendar,
  ArrowRight,
  Utensils,
  Clock,
  Flame,
  CheckCircle2,
  Circle,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Navigation
} from "lucide-react";
import { ROUTINES_DATA, getRoutineById } from "../../data/routinesData";
import { getAdaptedRoutineForLocation } from "../../data/regionalCuisinesData";

export default function LoggedInHomeDashboard({
  userProfile,
  activePlan,
  onSearchSubmit,
  onOpenPlanWizard,
  onExploreClick,
  onNavigateTab,
  onSelectRoutine,
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
  onOpenShare,
  savedRoutines = [],
  favoriteMeals = [],
  completedMealsData = { meals: [] },
  onToggleMealCompleted
}) {
  const { user } = useAuth();
  const {
    locationData,
    permissionState,
    locationStatus,
    requestLocation,
    setIsManualModalOpen
  } = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState("all"); // "all" | "healthy" | "fitness" | "local" | "saved"

  // Time of Day Greeting
  const currentHour = new Date().getHours();
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

  const displayName = user?.name?.split(" ")[0] || userProfile?.name?.split(" ")[0] || "Foodie";
  const userCity = locationData?.city || "Bengaluru";
  const userState = locationData?.state || "Karnataka";
  const userCountry = locationData?.country || "India";

  // Resolve active plan routine
  let routine = activePlan;
  if (typeof routine === "string") {
    routine = getRoutineById(routine);
  }
  if (!routine || !Array.isArray(routine.dailyTimeline)) {
    routine = ROUTINES_DATA[0];
  }

  const adaptedRoutine = getAdaptedRoutineForLocation(
    routine,
    userCountry,
    userState,
    "regional"
  ) || routine;

  const dailyTimeline = adaptedRoutine.dailyTimeline || [];
  const completedMeals = completedMealsData?.meals || [];

  // Group meals by 4 core daily slots: Breakfast, Lunch, Evening, Dinner
  const breakfastMeal = dailyTimeline.find((m) => m.slotId === "breakfast" || m.title.toLowerCase().includes("breakfast") || m.title.toLowerCase().includes("idli") || m.title.toLowerCase().includes("oats") || m.slotName?.toLowerCase().includes("breakfast")) || dailyTimeline[1] || dailyTimeline[0];
  const lunchMeal = dailyTimeline.find((m) => m.slotId === "lunch" || m.title.toLowerCase().includes("lunch") || m.title.toLowerCase().includes("meal") || m.slotName?.toLowerCase().includes("lunch")) || dailyTimeline[2] || dailyTimeline[0];
  const eveningMeal = dailyTimeline.find((m) => m.slotId === "evening" || m.title.toLowerCase().includes("evening") || m.title.toLowerCase().includes("snack") || m.slotName?.toLowerCase().includes("snack")) || dailyTimeline[3] || dailyTimeline[0];
  const dinnerMeal = dailyTimeline.find((m) => m.slotId === "dinner" || m.title.toLowerCase().includes("dinner") || m.slotName?.toLowerCase().includes("dinner")) || dailyTimeline[4] || dailyTimeline[0];

  const coreDailyMeals = [
    { label: "Breakfast", emoji: "🌅", slotTime: "8:00 AM", meal: breakfastMeal },
    { label: "Lunch", emoji: "☀️", slotTime: "1:00 PM", meal: lunchMeal },
    { label: "Evening Snack", emoji: "🌆", slotTime: "5:00 PM", meal: eveningMeal },
    { label: "Dinner", emoji: "🌙", slotTime: "8:00 PM", meal: dinnerMeal }
  ].filter((item) => !!item.meal);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    } else {
      onExploreClick();
    }
  };

  // Recommended routines filtering based on active tab
  const getFilteredRecommended = () => {
    if (activeFilterTab === "fitness") {
      return ROUTINES_DATA.filter((r) => r.isHighProtein || r.category.toLowerCase().includes("fitness") || r.id.includes("gym")).slice(0, 4);
    }
    if (activeFilterTab === "local") {
      return ROUTINES_DATA.slice(0, 4);
    }
    if (activeFilterTab === "saved") {
      const saved = ROUTINES_DATA.filter((r) => savedRoutines.includes(r.id));
      return saved.length > 0 ? saved : ROUTINES_DATA.slice(0, 4);
    }
    // "healthy" or "all"
    return ROUTINES_DATA.slice(0, 4);
  };

  const recommendedRoutines = getFilteredRecommended();

  return (
    <div style={{ padding: "2rem 0 4rem" }}>
      <div className="container">
        {/* Top Greeting & Location Banner */}
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
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
              <span
                style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#6EE7B7",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <Sparkles size={13} />
                <span>Personalized Dashboard</span>
              </span>
            </div>

            <h1 style={{ fontSize: "2.1rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 0.4rem" }}>
              {greeting}, {displayName} {greetingEmoji}
            </h1>
            <p style={{ color: "#E2E8F0", fontSize: "0.92rem", margin: 0, maxWidth: "540px" }}>
              Your daily meal schedule is calibrated for vitality. Check your routine timeline below or explore healthy dishes.
            </p>
          </div>

          {/* Location Controls */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "var(--radius-lg)",
              padding: "1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#86EFAC", fontSize: "0.82rem", fontWeight: 700 }}>
                <MapPin size={15} />
                <span>📍 {userCity}, {userState}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsManualModalOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                Change City
              </button>
            </div>

            {permissionState !== "granted" && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.78rem", color: "#CBD5E1" }}>
                  Get local food recommendations:
                </span>
                <button
                  type="button"
                  onClick={requestLocation}
                  disabled={locationStatus === "loading"}
                  style={{
                    background: "#10B981",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  <Navigation size={11} />
                  <span>{locationStatus === "loading" ? "Locating..." : "Use My Location"}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Prominent Search Bar: "What are you eating today?" */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            padding: "1.25rem",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "2.5rem"
          }}
        >
          <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.6rem" }}>
            What are you eating today?
          </div>

          <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "var(--bg-card-subtle)",
                padding: "0.65rem 1rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <Search size={18} color="var(--primary-600)" />
              <input
                type="text"
                placeholder="Search breakfast, low-GI foods, high protein meals, local dishes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: "0.92rem"
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: "0.65rem 1.25rem" }}>
              <span>Search</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick Filter Search Chips */}
          <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.85rem", overflowX: "auto", paddingBottom: "0.2rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", alignSelf: "center", whiteSpace: "nowrap" }}>
              Popular:
            </span>
            {[
              { label: "Diabetes-friendly", q: "diabetes" },
              { label: "Gym beginner", q: "gym" },
              { label: "Weight management", q: "weight" },
              { label: "High protein", q: "protein" },
              { label: "Student food", q: "student" },
              { label: "100% Veg", q: "vegetarian" }
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                className="hero-suggestion-chip"
                onClick={() => {
                  setSearchInput(chip.q);
                  onSearchSubmit(chip.q);
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Today's Routine Section (4 Core Slots: Breakfast, Lunch, Evening, Dinner) */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--primary-600)", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.2rem" }}>
                <Calendar size={14} />
                <span>Today's Active Blueprint</span>
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                Today's Routine
              </h2>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigateTab("my-plan")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <span>View Full My Plan Timetable</span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {coreDailyMeals.map(({ label, emoji, slotTime, meal }) => {
              const mealId = meal.id || label.toLowerCase();
              const isDone = completedMeals.includes(mealId);
              const mealTitle = meal.title || `${label} Meal`;
              const dishName = meal.orderQuery || mealTitle;
              const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(dishName)}`;

              return (
                <div
                  key={label}
                  className="widget-card"
                  style={{
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: isDone ? "#F0FDF4" : "#FFFFFF",
                    border: isDone ? "1.5px solid #86EFAC" : "1px solid var(--border-subtle)",
                    transition: "all 0.2s ease",
                    cursor: "pointer"
                  }}
                  onClick={() => onOpenRecipe && onOpenRecipe(meal, adaptedRoutine)}
                >
                  <div>
                    {/* Slot Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>{emoji}</span>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary-900)" }}>
                            {label}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                            {meal.time || slotTime}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleMealCompleted) onToggleMealCompleted(mealId);
                        }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: isDone ? "#059669" : "var(--text-muted)" }}
                        title={isDone ? "Mark uncompleted" : "Mark completed"}
                      >
                        {isDone ? <CheckCircle2 size={22} fill="#10B981" color="#FFFFFF" /> : <Circle size={22} />}
                      </button>
                    </div>

                    {/* Meal Image & Title */}
                    {meal.image && (
                      <img
                        src={meal.image}
                        alt={mealTitle}
                        style={{
                          width: "100%",
                          height: "120px",
                          borderRadius: "var(--radius-md)",
                          objectFit: "cover",
                          marginBottom: "0.75rem"
                        }}
                      />
                    )}

                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: isDone ? "#065F46" : "var(--text-primary)", marginBottom: "0.35rem", textDecoration: isDone ? "line-through" : "none" }}>
                      {mealTitle}
                    </h4>

                    {/* Quick macros */}
                    <div style={{ display: "flex", gap: "0.6rem", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                      <span>🔥 {meal.calories || 350} kcal</span>
                      <span>🍗 {meal.protein || 18}g P</span>
                      <span>⏱️ {meal.prepTime || "15 min"}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "0.6rem",
                      borderTop: "1px solid var(--border-subtle)"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onOpenRecipe && onOpenRecipe(meal, adaptedRoutine)}
                      style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
                    >
                      <Utensils size={13} />
                      <span>Recipe</span>
                    </button>

                    <a
                      href={swiggyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
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
                      <span>🛵 Order</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recommended For You Section */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--primary-600)", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.2rem" }}>
                <Sparkles size={14} />
                <span>Tailored Suggestions</span>
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                Recommended For You
              </h2>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {[
                { id: "all", label: "All Curated" },
                { id: "healthy", label: "Healthy Dishes" },
                { id: "fitness", label: "Fitness Meals" },
                { id: "local", label: `Local (${userCity})` },
                { id: "saved", label: `Saved (${savedRoutines.length})` }
              ].map((tab) => {
                const isActive = activeFilterTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilterTab(tab.id)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      border: isActive ? "1px solid #059669" : "1px solid var(--border-subtle)",
                      background: isActive ? "#059669" : "#FFFFFF",
                      color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                      cursor: "pointer",
                      transition: "all 0.18s ease"
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommended Routines Grid */}
          <div className="routines-grid">
            {recommendedRoutines.map((routineItem) => (
              <div
                key={routineItem.id}
                className="routine-card"
                onClick={() => onSelectRoutine && onSelectRoutine(routineItem.id)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ position: "relative", overflow: "hidden", height: "170px" }}>
                  <img
                    src={routineItem.image}
                    alt={routineItem.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    className="badge badge-green"
                    style={{ position: "absolute", top: "10px", left: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
                  >
                    {routineItem.category}
                  </span>
                </div>

                <div style={{ padding: "1.25rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.35rem" }}>
                    {routineItem.title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.85rem", lineHeight: 1.4 }}>
                    {routineItem.description?.slice(0, 85)}...
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    <span>🔥 {routineItem.calories} kcal</span>
                    <span>🍗 {routineItem.protein}g protein</span>
                    <span>🍽️ {routineItem.mealsCount || 6} meals</span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRoutine && onSelectRoutine(routineItem.id);
                    }}
                  >
                    <span>View Daily Schedule</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button className="btn btn-secondary btn-lg" onClick={onExploreClick}>
              <span>Explore Full Library ({ROUTINES_DATA.length} Routines)</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
