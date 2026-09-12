import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import RoutineCard from "../components/RoutineCard";
import NutritionCalculator from "../components/NutritionCalculator";
import NearbyFoodSection from "../components/location/NearbyFoodSection";
import LoggedInHomeDashboard from "../components/dashboard/LoggedInHomeDashboard";
import { ROUTINES_DATA } from "../data/routinesData";
import { getAdaptedRoutinesList } from "../data/regionalCuisinesData";
import { useLocation } from "../context/LocationContext";
import { useAuth } from "../context/AuthContext";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Flame, Zap, Award, MapPin } from "lucide-react";

export default function HomeView({
  userProfile,
  activePlan,
  onSearchSubmit,
  onOpenPlanWizard,
  onExploreClick,
  onNavigateTab,
  onSelectCategory,
  onSelectRoutine,
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
  onOpenShare,
  savedRoutines,
  onToggleSaveRoutine,
  favoriteMeals = [],
  onToggleFavoriteMeal,
  completedMealsData,
  onToggleMealCompleted
}) {
  const { isAuthenticated, requireAuth } = useAuth();
  const { locationData } = useLocation();
  const userCountry = locationData?.country || userProfile?.country || "India";
  const userState = locationData?.state || userProfile?.state || "Karnataka";
  
  const adaptedRoutines = getAdaptedRoutinesList(ROUTINES_DATA, userCountry, userState);
  const featuredRoutines = adaptedRoutines.slice(0, 6);

  // Protected action triggers for landing page
  const handleProtectedSearch = (query) => {
    requireAuth(() => {
      onSearchSubmit(query);
    }, `Sign in to find custom food routines matching "${query}".`);
  };

  const handleProtectedExplore = () => {
    requireAuth(() => {
      onExploreClick();
    }, "Sign in to explore all personalized food and health routines.");
  };

  const handleProtectedPlanWizard = () => {
    requireAuth(() => {
      onOpenPlanWizard();
    }, "Sign in to generate your AI-tailored personalized nutrition blueprint.");
  };

  const handleProtectedSelectRoutine = (routineId) => {
    requireAuth(() => {
      onSelectRoutine(routineId);
    }, "Sign in to view full meal timeline and personalized recipes.");
  };

  const handleProtectedSelectCategory = (categoryId) => {
    requireAuth(() => {
      onSelectCategory(categoryId);
    }, "Sign in to browse food routines by health category.");
  };

  const handleProtectedSaveRoutine = (routineId) => {
    requireAuth(() => {
      onToggleSaveRoutine(routineId);
    }, "Sign in to save routines to your personal library.");
  };

  const handleProtectedFavoriteMeal = (mealId) => {
    requireAuth(() => {
      onToggleFavoriteMeal(mealId);
    }, "Sign in to save meals to your favorite recipes.");
  };

  const handleProtectedOpenRecipe = (meal, routine) => {
    requireAuth(() => {
      onOpenRecipe(meal, routine);
    }, "Sign in to access detailed step-by-step recipes and nutrition.");
  };

  const handleProtectedOpenOrder = (meal) => {
    requireAuth(() => {
      onOpenOrder(meal);
    }, "Sign in to order healthy food from nearby restaurants.");
  };

  // 1. Logged-In User Experience: Personalized Dashboard
  if (isAuthenticated) {
    return (
      <div>
        <LoggedInHomeDashboard
          userProfile={userProfile}
          activePlan={activePlan}
          onSearchSubmit={onSearchSubmit}
          onOpenPlanWizard={onOpenPlanWizard}
          onExploreClick={onExploreClick}
          onNavigateTab={onNavigateTab}
          onSelectRoutine={onSelectRoutine}
          onOpenRecipe={onOpenRecipe}
          onOpenYouTube={onOpenYouTube}
          onOpenOrder={onOpenOrder}
          onOpenShare={onOpenShare}
          savedRoutines={savedRoutines}
          favoriteMeals={favoriteMeals}
          completedMealsData={completedMealsData}
          onToggleMealCompleted={onToggleMealCompleted}
        />

        {/* Location-Based Food Around You Section */}
        <NearbyFoodSection
          onOpenRecipe={onOpenRecipe}
          onOpenYouTube={onOpenYouTube}
          onOpenOrder={onOpenOrder}
          favoriteMeals={favoriteMeals}
          onToggleFavoriteMeal={onToggleFavoriteMeal}
        />

        {/* Interactive Health & Nutrition Calculator */}
        <section style={{ padding: "1rem 0 3.5rem" }}>
          <div className="container">
            <NutritionCalculator
              onOpenPlanWizard={onOpenPlanWizard}
              onSelectRoutine={onSelectRoutine}
            />
          </div>
        </section>
      </div>
    );
  }

  // 2. Logged-Out Public Landing Page Experience
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        onSearchSubmit={handleProtectedSearch}
        onOpenPlanWizard={handleProtectedPlanWizard}
        onExploreClick={handleProtectedExplore}
        onSelectRoutine={handleProtectedSelectRoutine}
      />

      {/* Location-Based Food Around You Section */}
      <NearbyFoodSection
        onOpenRecipe={handleProtectedOpenRecipe}
        onOpenYouTube={onOpenYouTube}
        onOpenOrder={handleProtectedOpenOrder}
        favoriteMeals={favoriteMeals}
        onToggleFavoriteMeal={handleProtectedFavoriteMeal}
      />

      {/* Quick Category Section */}
      <CategorySection onSelectCategory={handleProtectedSelectCategory} />

      {/* Featured Routines Grid */}
      <section style={{ padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
              ✨ Daily Nutrition Blueprints
            </div>
            <h2 className="section-title">Featured Food Routines</h2>
            <p className="section-subtitle">
              Scientifically engineered daily schedules for glucose management, athletic hypertrophy, fat loss, and busy schedules.
            </p>
          </div>

          <div className="routines-grid">
            {featuredRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onSelectRoutine={handleProtectedSelectRoutine}
                isSaved={savedRoutines.includes(routine.id)}
                onToggleSave={handleProtectedSaveRoutine}
                onOpenShare={onOpenShare}
              />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button
              className="btn btn-secondary btn-lg"
              onClick={handleProtectedExplore}
            >
              <span>Explore All {ROUTINES_DATA.length} Food Routines</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Health & Nutrition Calculator */}
      <section style={{ padding: "1rem 0 3.5rem" }}>
        <div className="container">
          <NutritionCalculator
            onOpenPlanWizard={handleProtectedPlanWizard}
            onSelectRoutine={handleProtectedSelectRoutine}
          />
        </div>
      </section>

      {/* Nutrition Philosophy Banner */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(135deg, #0F382A 0%, #14532D 100%)", color: "#FFFFFF" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2.5rem",
              alignItems: "center"
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#6EE7B7",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  marginBottom: "1rem"
                }}
              >
                <Award size={15} />
                <span>The Foodie-Health-Routine Method</span>
              </div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "1rem", lineHeight: 1.2 }}>
                Eat Real Food. <br />
                Feel Real Energy.
              </h2>
              <p style={{ color: "#E2E8F0", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                We believe health shouldn't feel like punishment. Our routines focus on delicious whole ingredients, balanced macronutrient ratios, and realistic prep times that fit your busy life.
              </p>

              <button
                className="btn btn-accent btn-lg"
                onClick={handleProtectedPlanWizard}
              >
                <Sparkles size={18} />
                <span>Get Your Personalized Plan</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🥗</div>
                <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>Zero Starvation</h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>High-volume, fiber-rich meals to keep you full and energized all day.</p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>⏱️</div>
                <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>Fast Preparation</h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>Under 20-minute recipes using accessible grocery items.</p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>📊</div>
                <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>Macro Precision</h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>Exact grams of protein, carbs, fats, and fiber calculated for every slot.</p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🛵</div>
                <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>Order or Cook</h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>Cook in minutes or find comparable healthy meals on Swiggy & Zomato.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
