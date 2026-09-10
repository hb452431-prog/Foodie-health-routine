import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

// Modals
import RoutineDetailModal from "./components/RoutineDetailModal";
import RecipeModal from "./components/RecipeModal";
import YouTubeModal from "./components/YouTubeModal";
import OrderModal from "./components/OrderModal";
import PlanBuilder from "./components/PlanBuilder";
import ShareModal from "./components/ShareModal";

// Views
import HomeView from "./views/HomeView";
import ExploreView from "./views/ExploreView";
import MyPlanView from "./views/MyPlanView";
import ProfileView from "./views/ProfileView";

// Data & Storage
import { ROUTINES_DATA, getRoutineById } from "./data/routinesData";
import {
  getUserProfile,
  saveUserProfile,
  getSavedRoutines,
  toggleSaveRoutine,
  getFavoriteMeals,
  toggleFavoriteMeal,
  getCompletedMeals,
  toggleCompletedMeal,
  getWaterIntake,
  setWaterGlasses,
  getActivePlan,
  setActivePlan
} from "./utils/storage";

import "./App.css";

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState("home");
  const [exploreQuery, setExploreQuery] = useState("");
  const [exploreCategory, setExploreCategory] = useState("all");

  // Local Storage Synchronized States
  const [userProfile, setUserProfile] = useState(() => getUserProfile());
  const [savedRoutines, setSavedRoutines] = useState(() => getSavedRoutines());
  const [favoriteMeals, setFavoriteMeals] = useState(() => getFavoriteMeals());
  const [completedMealsData, setCompletedMealsData] = useState(() => getCompletedMeals());
  const [waterGlasses, setWaterGlassesState] = useState(() => getWaterIntake().glasses);
  const [activePlan, setActivePlanState] = useState(() => getActivePlan() || ROUTINES_DATA[0]);

  // Modals State
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedRecipeMeal, setSelectedRecipeMeal] = useState(null);
  const [selectedRecipeRoutine, setSelectedRecipeRoutine] = useState(null);
  const [selectedYouTubeMeal, setSelectedYouTubeMeal] = useState(null);
  const [selectedOrderMeal, setSelectedOrderMeal] = useState(null);
  const [selectedShareRoutine, setSelectedShareRoutine] = useState(null);
  const [isPlanWizardOpen, setIsPlanWizardOpen] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Sync scroll to top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Handlers for Routines & Favorites
  const handleToggleSaveRoutine = (routineId) => {
    const res = toggleSaveRoutine(routineId);
    setSavedRoutines([...res.updated]);
    showToast(res.isSaved ? "⭐ Routine saved to your library!" : "Routine removed from saved list.");
  };

  const handleToggleFavoriteMeal = (mealId) => {
    const res = toggleFavoriteMeal(mealId);
    setFavoriteMeals([...res.updated]);
    showToast(res.isFavorite ? "❤️ Meal added to favorite recipes!" : "Meal removed from favorites.");
  };

  const handleToggleMealCompleted = (mealId) => {
    const res = toggleCompletedMeal(mealId);
    setCompletedMealsData({ ...res });
  };

  const handleUpdateWater = (glasses) => {
    const res = setWaterGlasses(glasses);
    setWaterGlassesState(res.glasses);
  };

  const handleProfileUpdate = (profile) => {
    setUserProfile(profile);
    saveUserProfile(profile);
  };

  const handleSelectRoutine = (routineId) => {
    const routine = getRoutineById(routineId) || ROUTINES_DATA.find((r) => r.id === routineId);
    if (routine) {
      setSelectedRoutine(routine);
    }
  };

  const handleOpenRecipe = (meal, routine) => {
    setSelectedRecipeMeal(meal);
    setSelectedRecipeRoutine(routine || selectedRoutine || activePlan);
  };

  const handleOpenYouTube = (meal) => {
    setSelectedYouTubeMeal(meal);
  };

  const handleOpenOrder = (meal) => {
    setSelectedOrderMeal(meal);
  };

  const handleOpenShare = (routine) => {
    setSelectedShareRoutine(routine || selectedRoutine || activePlan);
  };

  // Search & Exploration Triggers
  const handleHeroSearchSubmit = (query) => {
    setExploreQuery(query);
    setExploreCategory("all");
    setActiveTab("explore");
  };

  const handleCategorySelect = (categoryId) => {
    setExploreCategory(categoryId);
    setExploreQuery("");
    setActiveTab("explore");
  };

  const handlePlanGenerated = (customPlan) => {
    setActivePlan(customPlan);
    setActivePlanState(customPlan);
    setIsPlanWizardOpen(false);
    setActiveTab("my-plan");
  };

  return (
    <div className="app-wrapper">
      {/* Desktop Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => {
          setActiveTab("explore");
        }}
        onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="main-content">
        {activeTab === "home" && (
          <HomeView
            onSearchSubmit={handleHeroSearchSubmit}
            onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
            onExploreClick={() => setActiveTab("explore")}
            onSelectCategory={handleCategorySelect}
            onSelectRoutine={handleSelectRoutine}
            onOpenShare={handleOpenShare}
            savedRoutines={savedRoutines}
            onToggleSaveRoutine={handleToggleSaveRoutine}
          />
        )}

        {activeTab === "explore" && (
          <ExploreView
            initialQuery={exploreQuery}
            initialCategory={exploreCategory}
            onSelectRoutine={handleSelectRoutine}
            onOpenShare={handleOpenShare}
            savedRoutines={savedRoutines}
            onToggleSaveRoutine={handleToggleSaveRoutine}
          />
        )}

        {activeTab === "my-plan" && (
          <MyPlanView
            activePlan={activePlan}
            onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
            onOpenRecipe={handleOpenRecipe}
            onOpenYouTube={handleOpenYouTube}
            onOpenOrder={handleOpenOrder}
            onShareRoutine={handleOpenShare}
            waterGlasses={waterGlasses}
            onUpdateWater={handleUpdateWater}
            completedMealsData={completedMealsData}
            onToggleMealCompleted={handleToggleMealCompleted}
            favoriteMeals={favoriteMeals}
            onToggleFavoriteMeal={handleToggleFavoriteMeal}
            onShowToast={showToast}
            onExploreClick={() => setActiveTab("explore")}
            onSelectRoutine={handleSelectRoutine}
          />
        )}

        {activeTab === "profile" && (
          <ProfileView
            userProfile={userProfile}
            onProfileUpdate={handleProfileUpdate}
            savedRoutines={savedRoutines}
            favoriteMeals={favoriteMeals}
            onShowToast={showToast}
            onSelectRoutine={handleSelectRoutine}
            onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
          />
        )}
      </main>

      {/* Routine Detail Modal */}
      {selectedRoutine && (
        <RoutineDetailModal
          routine={selectedRoutine}
          onClose={() => setSelectedRoutine(null)}
          onOpenRecipe={handleOpenRecipe}
          onOpenYouTube={handleOpenYouTube}
          onOpenOrder={handleOpenOrder}
          onOpenShare={handleOpenShare}
          favoriteMeals={favoriteMeals}
          onToggleFavoriteMeal={handleToggleFavoriteMeal}
          isSavedRoutine={savedRoutines.includes(selectedRoutine.id)}
          onToggleSaveRoutine={handleToggleSaveRoutine}
          onShowToast={showToast}
        />
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipeMeal && (
        <RecipeModal
          meal={selectedRecipeMeal}
          routine={selectedRecipeRoutine}
          onClose={() => setSelectedRecipeMeal(null)}
          isFavorite={favoriteMeals.includes(selectedRecipeMeal.id)}
          onToggleFavorite={() => handleToggleFavoriteMeal(selectedRecipeMeal.id)}
          onShowToast={showToast}
        />
      )}

      {/* YouTube Video Modal */}
      {selectedYouTubeMeal && (
        <YouTubeModal
          meal={selectedYouTubeMeal}
          onClose={() => setSelectedYouTubeMeal(null)}
        />
      )}

      {/* Swiggy / Zomato Order Modal */}
      {selectedOrderMeal && (
        <OrderModal
          meal={selectedOrderMeal}
          onClose={() => setSelectedOrderMeal(null)}
        />
      )}

      {/* Share Routine Modal */}
      {selectedShareRoutine && (
        <ShareModal
          isOpen={!!selectedShareRoutine}
          routine={selectedShareRoutine}
          onClose={() => setSelectedShareRoutine(null)}
          onShowToast={showToast}
        />
      )}

      {/* Plan Builder 5-Step Wizard / Custom Creator */}
      {isPlanWizardOpen && (
        <PlanBuilder
          onPlanGenerated={handlePlanGenerated}
          onClose={() => setIsPlanWizardOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification Manager */}
      <Toast message={toastMessage} onClear={() => setToastMessage("")} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
      />

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />
    </div>
  );
}
