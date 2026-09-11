import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import CommandPalette from "./components/CommandPalette";
import FloatingQuickBar from "./components/FloatingQuickBar";

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
  const [activePlan, setActivePlanState] = useState(() => {
    try {
      const stored = getActivePlan();
      if (!stored) return ROUTINES_DATA[0];
      if (typeof stored === "string") return getRoutineById(stored) || ROUTINES_DATA[0];
      if (stored && typeof stored === "object") {
        if (Array.isArray(stored.dailyTimeline) && stored.dailyTimeline.length > 0) return stored;
        if (stored.id) return getRoutineById(stored.id) || ROUTINES_DATA[0];
      }
      return ROUTINES_DATA[0];
    } catch (e) {
      return ROUTINES_DATA[0];
    }
  });

  // Modals & Command Palette State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
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

  // Global Keyboard Shortcuts (⌘K, /, 1, 2, 3, 4, Esc)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);

      // 1. ⌘K or Ctrl+K -> Open Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // 2. '/' shortcut to search when not typing
      if (e.key === "/" && !isInput) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      // 3. Number keys 1-4 to switch tabs when not typing
      if (!isInput && !isCommandPaletteOpen && !isPlanWizardOpen && !selectedRoutine && !selectedRecipeMeal) {
        if (e.key === "1") {
          setActiveTab("home");
          showToast("🏠 Switched to Home");
        } else if (e.key === "2") {
          setActiveTab("explore");
          showToast("🧭 Switched to Explore");
        } else if (e.key === "3") {
          setActiveTab("my-plan");
          showToast("📅 Switched to My Plan");
        } else if (e.key === "4") {
          setActiveTab("profile");
          showToast("👤 Switched to Profile");
        }
      }

      // 4. Escape closes any open modal
      if (e.key === "Escape") {
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (selectedRoutine) setSelectedRoutine(null);
        if (selectedRecipeMeal) setSelectedRecipeMeal(null);
        if (selectedYouTubeMeal) setSelectedYouTubeMeal(null);
        if (selectedOrderMeal) setSelectedOrderMeal(null);
        if (selectedShareRoutine) setSelectedShareRoutine(null);
        if (isPlanWizardOpen) setIsPlanWizardOpen(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isCommandPaletteOpen, isPlanWizardOpen, selectedRoutine, selectedRecipeMeal, selectedYouTubeMeal, selectedOrderMeal, selectedShareRoutine]);

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

  const handleFilterSelect = (filterType) => {
    if (filterType === "vegetarian") {
      setExploreCategory("vegetarian");
    } else if (filterType === "high-protein") {
      setExploreCategory("high-protein");
    }
    setActiveTab("explore");
  };

  const handlePlanGenerated = (customPlan) => {
    setActivePlan(customPlan);
    setActivePlanState(customPlan);
    setIsPlanWizardOpen(false);
    setActiveTab("my-plan");
    showToast("✨ Your custom nutrition routine is now active!");
  };

  return (
    <div className="app-wrapper">
      {/* Desktop Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
        waterGlasses={waterGlasses}
        onUpdateWater={handleUpdateWater}
        userProfile={userProfile}
        onShowToast={showToast}
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

      {/* Universal Command Palette (Ctrl+K / ⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={setActiveTab}
        onSelectRoutine={handleSelectRoutine}
        onOpenRecipe={handleOpenRecipe}
        onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
        onUpdateWater={handleUpdateWater}
        waterGlasses={waterGlasses}
        onShowToast={showToast}
        onCategorySelect={handleCategorySelect}
        onFilterSelect={handleFilterSelect}
      />

      {/* Floating Quick Utility Bar (⌘K, Hydration, Back-to-Top) */}
      <FloatingQuickBar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        waterGlasses={waterGlasses}
        onUpdateWater={handleUpdateWater}
        onShowToast={showToast}
      />

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
