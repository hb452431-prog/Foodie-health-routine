import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import FloatingQuickBar from "./components/FloatingQuickBar";
import ViewLoadingSkeleton from "./components/ViewLoadingSkeleton";

// Auth Layer
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginModal from "./components/auth/LoginModal";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Location Layer
import { LocationProvider } from "./context/LocationContext";
import LocationPermissionModal from "./components/location/LocationPermissionModal";
import ManualLocationModal from "./components/location/ManualLocationModal";

// Eager View (Critical First Contentful Paint)
import HomeView from "./views/HomeView";

// Lazy-Loaded Views (Code-Split for 4G & Mobile Speed)
const ExploreView = lazy(() => import("./views/ExploreView"));
const MyPlanView = lazy(() => import("./views/MyPlanView"));
const ProfileView = lazy(() => import("./views/ProfileView"));

// Lazy-Loaded On-Demand Modals & Palette
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const RoutineDetailModal = lazy(() => import("./components/RoutineDetailModal"));
const RecipeModal = lazy(() => import("./components/RecipeModal"));
const YouTubeModal = lazy(() => import("./components/YouTubeModal"));
const OrderModal = lazy(() => import("./components/OrderModal"));
const PlanBuilder = lazy(() => import("./components/PlanBuilder"));
const ShareModal = lazy(() => import("./components/ShareModal"));


// Data & Storage
import { ROUTINES_DATA, getRoutineById } from "./data/routinesData";
import { getAdaptedRoutineForLocation } from "./data/regionalCuisinesData";
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

// Route helper for direct URLs (/explore, /plan, /profile, /login, /signup, etc.)
const getTabFromPath = (path) => {
  try {
    const clean = (path || window.location.pathname || "").toLowerCase().replace(/^\/+|\/+$/g, "");
    if (!clean || clean === "home") return "home";
    if (["explore", "routines", "recipe", "recipes", "health", "fitness"].includes(clean)) return "explore";
    if (["plan", "my-plan", "myplan"].includes(clean)) return "my-plan";
    if (["profile", "settings"].includes(clean)) return "profile";
    if (["login", "signin", "signup"].includes(clean)) return "home";
    return "home";
  } catch (e) {
    return "home";
  }
};

function AppContent() {
  const { isAuthenticated, requireAuth, openAuthModal } = useAuth();

  // Navigation State with SPA direct URL support
  const [activeTab, setActiveTab] = useState(() => getTabFromPath(window.location.pathname));
  const [exploreQuery, setExploreQuery] = useState("");
  const [exploreCategory, setExploreCategory] = useState(() => {
    try {
      const clean = (window.location.pathname || "").toLowerCase().replace(/^\/+|\/+$/g, "");
      if (clean === "health") return "healthy";
      if (clean === "fitness") return "high-protein";
      return "all";
    } catch (e) {
      return "all";
    }
  });

  // Helper to change tabs and push state cleanly
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    try {
      const targetPath = newTab === "home" ? "/" : `/${newTab}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab: newTab }, "", targetPath);
      }
    } catch (e) {
      // Safe fallback if history API is restricted
    }
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath(window.location.pathname);
      setActiveTab(tab);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle direct /login or /signup URL paths
  useEffect(() => {
    const clean = (window.location.pathname || "").toLowerCase().replace(/^\/+|\/+$/g, "");
    if (["login", "signin", "signup"].includes(clean)) {
      openAuthModal(
        clean === "signup"
          ? "Create your account to unlock personalized food routines, recipes and recommendations."
          : "Login to continue your healthy food journey."
      );
    }
  }, [openAuthModal]);

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
          handleTabChange("home");
          showToast("🏠 Switched to Home");
        } else if (e.key === "2") {
          requireAuth(() => {
            handleTabChange("explore");
            showToast("🧭 Switched to Explore");
          }, "Sign in to explore all food routines.");
        } else if (e.key === "3") {
          requireAuth(() => {
            handleTabChange("my-plan");
            showToast("📅 Switched to My Plan");
          }, "Sign in to view your live daily plan.");
        } else if (e.key === "4") {
          requireAuth(() => {
            handleTabChange("profile");
            showToast("👤 Switched to Profile");
          }, "Sign in to view your health profile.");
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
  }, [isCommandPaletteOpen, isPlanWizardOpen, selectedRoutine, selectedRecipeMeal, selectedYouTubeMeal, selectedOrderMeal, selectedShareRoutine, requireAuth]);

  // Handlers for Routines & Favorites (Protected)
  const handleToggleSaveRoutine = (routineId) => {
    requireAuth(() => {
      const res = toggleSaveRoutine(routineId);
      setSavedRoutines([...res.updated]);
      showToast(res.isSaved ? "⭐ Routine saved to your library!" : "Routine removed from saved list.");
    }, "Sign in to save routines to your personal collection.");
  };

  const handleToggleFavoriteMeal = (mealId) => {
    requireAuth(() => {
      const res = toggleFavoriteMeal(mealId);
      setFavoriteMeals([...res.updated]);
      showToast(res.isFavorite ? "❤️ Meal added to favorite recipes!" : "Meal removed from favorites.");
    }, "Sign in to save recipes to your favorites.");
  };

  const handleToggleMealCompleted = (mealId) => {
    requireAuth(() => {
      const res = toggleCompletedMeal(mealId);
      setCompletedMealsData({ ...res });
    }, "Sign in to track and complete your daily meals.");
  };

  const handleUpdateWater = (glasses) => {
    const res = setWaterGlasses(glasses);
    setWaterGlassesState(res.glasses);
  };

  const handleProfileUpdate = (profile) => {
    setUserProfile(profile);
    saveUserProfile(profile);
    if (activePlan) {
      const updatedPlan = getAdaptedRoutineForLocation(
        activePlan,
        profile.country || "India",
        profile.state || "Karnataka",
        "regional"
      );
      if (updatedPlan) {
        setActivePlan(updatedPlan);
        setActivePlanState(updatedPlan);
      }
    }
  };

  const handleSelectRoutine = (routineId) => {
    requireAuth(() => {
      const rawRoutine = getRoutineById(routineId) || ROUTINES_DATA.find((r) => r.id === routineId);
      if (rawRoutine) {
        const adapted = getAdaptedRoutineForLocation(
          rawRoutine,
          userProfile?.country || "India",
          userProfile?.state || "Karnataka",
          "regional"
        ) || rawRoutine;
        setSelectedRoutine(adapted);
      }
    }, "Sign in to view complete daily routine timeline and recipes.");
  };

  const handleOpenRecipe = (meal, routine) => {
    requireAuth(() => {
      setSelectedRecipeMeal(meal);
      setSelectedRecipeRoutine(routine || selectedRoutine || activePlan);
    }, "Sign in to access detailed ingredients and preparation steps.");
  };

  const handleOpenYouTube = (meal) => {
    setSelectedYouTubeMeal(meal);
  };

  const handleOpenOrder = (meal) => {
    requireAuth(() => {
      setSelectedOrderMeal(meal);
    }, "Sign in to order healthy dishes from nearby restaurants.");
  };

  const handleOpenShare = (routine) => {
    setSelectedShareRoutine(routine || selectedRoutine || activePlan);
  };

  // Search & Exploration Triggers
  const handleHeroSearchSubmit = (query) => {
    setExploreQuery(query);
    setExploreCategory("all");
    handleTabChange("explore");
  };

  const handleCategorySelect = (categoryId) => {
    setExploreCategory(categoryId);
    setExploreQuery("");
    handleTabChange("explore");
  };

  const handleFilterSelect = (filterType) => {
    if (filterType === "vegetarian") {
      setExploreCategory("vegetarian");
    } else if (filterType === "high-protein") {
      setExploreCategory("high-protein");
    }
    handleTabChange("explore");
  };

  const handlePlanGenerated = (customPlan) => {
    setActivePlan(customPlan);
    setActivePlanState(customPlan);
    setIsPlanWizardOpen(false);
    handleTabChange("my-plan");
    showToast(`🎉 "${customPlan.title || "Personalized Routine"}" is now active in My Plan!`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyPlan = (newPlan) => {
    setActivePlan(newPlan);
    setActivePlanState(newPlan);
    handleTabChange("my-plan");
    showToast(`✨ Active routine updated to "${newPlan.title || "Custom Plan"}"!`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-wrapper">
      {/* Desktop Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
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
            userProfile={userProfile}
            activePlan={activePlan}
            onSearchSubmit={handleHeroSearchSubmit}
            onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
            onExploreClick={() => handleTabChange("explore")}
            onNavigateTab={handleTabChange}
            onSelectCategory={handleCategorySelect}
            onSelectRoutine={handleSelectRoutine}
            onOpenRecipe={handleOpenRecipe}
            onOpenYouTube={handleOpenYouTube}
            onOpenOrder={handleOpenOrder}
            onOpenShare={handleOpenShare}
            savedRoutines={savedRoutines}
            onToggleSaveRoutine={handleToggleSaveRoutine}
            favoriteMeals={favoriteMeals}
            onToggleFavoriteMeal={handleToggleFavoriteMeal}
            completedMealsData={completedMealsData}
            onToggleMealCompleted={handleToggleMealCompleted}
          />
        )}

        {activeTab === "explore" && (
          <Suspense fallback={<ViewLoadingSkeleton message="Loading Food Routines..." />}>
            <ExploreView
              userProfile={userProfile}
              initialQuery={exploreQuery}
              initialCategory={exploreCategory}
              onSelectRoutine={handleSelectRoutine}
              onOpenShare={handleOpenShare}
              onApplyPlan={handleApplyPlan}
              savedRoutines={savedRoutines}
              onToggleSaveRoutine={handleToggleSaveRoutine}
              onShowToast={showToast}
            />
          </Suspense>
        )}

        {activeTab === "my-plan" && (
          <ProtectedRoute
            title="My Plan & Daily Timetable"
            subtitle="Sign in to view your live daily meal schedule, check off meals, and track macros."
          >
            <Suspense fallback={<ViewLoadingSkeleton message="Loading Your Plan..." />}>
              <MyPlanView
                activePlan={activePlan}
                userProfile={userProfile}
                onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
                onOpenRecipe={handleOpenRecipe}
                onOpenYouTube={handleOpenYouTube}
                onOpenOrder={handleOpenOrder}
                onShareRoutine={handleOpenShare}
                onApplyPlan={handleApplyPlan}
                waterGlasses={waterGlasses}
                onUpdateWater={handleUpdateWater}
                completedMealsData={completedMealsData}
                onToggleMealCompleted={handleToggleMealCompleted}
                favoriteMeals={favoriteMeals}
                onToggleFavoriteMeal={handleToggleFavoriteMeal}
                onShowToast={showToast}
                onSelectRoutine={handleSelectRoutine}
                savedRoutines={savedRoutines}
              />
            </Suspense>
          </ProtectedRoute>
        )}

        {activeTab === "profile" && (
          <ProtectedRoute
            title="Profile & Preferences"
            subtitle="Sign in to manage your health goals, milestones, streaks, and dietary preferences."
          >
            <Suspense fallback={<ViewLoadingSkeleton message="Loading Profile..." />}>
              <ProfileView
                userProfile={userProfile}
                onProfileUpdate={handleProfileUpdate}
                savedRoutines={savedRoutines}
                favoriteMeals={favoriteMeals}
                onShowToast={showToast}
                onSelectRoutine={handleSelectRoutine}
                onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
                onApplyPlan={handleApplyPlan}
                onNavigateTab={handleTabChange}
              />
            </Suspense>
          </ProtectedRoute>
        )}
      </main>

      {/* Universal Command Palette (Ctrl+K / ⌘K) */}
      <Suspense fallback={null}>
        {isCommandPaletteOpen && (
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onNavigateTab={handleTabChange}
            onSelectRoutine={handleSelectRoutine}
            onOpenRecipe={handleOpenRecipe}
            onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
            onUpdateWater={handleUpdateWater}
            waterGlasses={waterGlasses}
            onShowToast={showToast}
            onCategorySelect={handleCategorySelect}
            onFilterSelect={handleFilterSelect}
          />
        )}
      </Suspense>

      {/* Floating Quick Utility Bar (⌘K, Hydration, Back-to-Top) */}
      <FloatingQuickBar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        waterGlasses={waterGlasses}
        onUpdateWater={handleUpdateWater}
        onShowToast={showToast}
      />

      {/* Location Permission Modal */}
      <LocationPermissionModal />

      {/* Manual Location Modal (Country / State / City selector) */}
      <ManualLocationModal />

      {/* Login / Sign Up Modal */}
      <LoginModal onShowToast={showToast} />

      {/* Routine Detail Modal */}
      <Suspense fallback={null}>
        {selectedRoutine && (
          <RoutineDetailModal
            routine={selectedRoutine}
            userProfile={userProfile}
            onClose={() => setSelectedRoutine(null)}
            onOpenRecipe={handleOpenRecipe}
            onOpenYouTube={handleOpenYouTube}
            onOpenOrder={handleOpenOrder}
            onOpenShare={handleOpenShare}
            favoriteMeals={favoriteMeals}
            onToggleFavoriteMeal={handleToggleFavoriteMeal}
            isSavedRoutine={savedRoutines.includes(selectedRoutine.id)}
            onToggleSaveRoutine={handleToggleSaveRoutine}
            onApplyPlan={handleApplyPlan}
            onShowToast={showToast}
          />
        )}
      </Suspense>

      {/* Recipe Detail Modal */}
      <Suspense fallback={null}>
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
      </Suspense>

      {/* YouTube Video Modal */}
      <Suspense fallback={null}>
        {selectedYouTubeMeal && (
          <YouTubeModal
            meal={selectedYouTubeMeal}
            onClose={() => setSelectedYouTubeMeal(null)}
          />
        )}
      </Suspense>

      {/* Swiggy / Zomato Order Modal */}
      <Suspense fallback={null}>
        {selectedOrderMeal && (
          <OrderModal
            meal={selectedOrderMeal}
            onClose={() => setSelectedOrderMeal(null)}
          />
        )}
      </Suspense>

      {/* Share Routine Modal */}
      <Suspense fallback={null}>
        {selectedShareRoutine && (
          <ShareModal
            isOpen={!!selectedShareRoutine}
            routine={selectedShareRoutine}
            onClose={() => setSelectedShareRoutine(null)}
            onShowToast={showToast}
          />
        )}
      </Suspense>

      {/* Plan Builder 5-Step Wizard / Custom Creator */}
      <Suspense fallback={null}>
        {isPlanWizardOpen && (
          <PlanBuilder
            onPlanGenerated={handlePlanGenerated}
            onClose={() => setIsPlanWizardOpen(false)}
            onShowToast={showToast}
          />
        )}
      </Suspense>

      {/* Toast Notification Manager */}
      <Toast message={toastMessage} onClear={() => setToastMessage("")} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenPlanWizard={() => setIsPlanWizardOpen(true)}
      />

      {/* Footer */}
      <Footer onNavigateTab={handleTabChange} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <AppContent />
      </LocationProvider>
    </AuthProvider>
  );
}
