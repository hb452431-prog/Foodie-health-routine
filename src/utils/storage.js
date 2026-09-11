const KEYS = {
  ACTIVE_PLAN: "fhr_active_plan",
  SAVED_ROUTINES: "fhr_saved_routines",
  FAVORITE_MEALS: "fhr_favorite_meals",
  COMPLETED_MEALS: "fhr_completed_meals",
  WATER_INTAKE: "fhr_water_intake",
  USER_PROFILE: "fhr_user_profile",
  SHOPPING_LIST_CHECKED: "fhr_shopping_checked",
  UNLOCKED_BADGES: "fhr_unlocked_badges",
  STREAK_DAYS: "fhr_streak_days",
  COMPLETED_DAYS_HISTORY: "fhr_completed_days_history"
};

import { DEFAULT_AVATAR } from "../data/avatarsData";
import { calculateStage } from "../data/badgesData";

// Default user profile
export const DEFAULT_USER_PROFILE = {
  name: "Harsha",
  email: "harsha.wellness@example.com",
  country: "India",
  state: "Karnataka",
  avatar: DEFAULT_AVATAR,
  goal: "Healthy Lifestyle & Metabolic Energy",
  dietPreference: "Vegetarian",
  activityLevel: "Moderate",
  targetCalories: 2000,
  targetWaterGlasses: 8,
  streakDays: 7,
  joinDate: "September 2026"
};

export const getStoredItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn("Error reading localStorage key:", key, e);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Error setting localStorage key:", key, e);
  }
};

export const getUserProfile = () => {
  const profile = getStoredItem(KEYS.USER_PROFILE, DEFAULT_USER_PROFILE);
  const streak = getStreakDays();
  return {
    ...DEFAULT_USER_PROFILE,
    ...profile,
    country: profile.country || DEFAULT_USER_PROFILE.country,
    state: profile.state || DEFAULT_USER_PROFILE.state,
    streakDays: streak
  };
};

export const saveUserProfile = (profile) => setStoredItem(KEYS.USER_PROFILE, profile);

export const getSavedRoutines = () => getStoredItem(KEYS.SAVED_ROUTINES, ["diabetes-friendly", "gym-beginner"]);
export const toggleSaveRoutine = (routineId) => {
  const current = getSavedRoutines();
  const exists = current.includes(routineId);
  const updated = exists ? current.filter((id) => id !== routineId) : [...current, routineId];
  setStoredItem(KEYS.SAVED_ROUTINES, updated);
  return { updated, isSaved: !exists };
};

export const getFavoriteMeals = () => getStoredItem(KEYS.FAVORITE_MEALS, ["df-m2", "gb-m4"]);
export const toggleFavoriteMeal = (mealId) => {
  const current = getFavoriteMeals();
  const exists = current.includes(mealId);
  const updated = exists ? current.filter((id) => id !== mealId) : [...current, mealId];
  setStoredItem(KEYS.FAVORITE_MEALS, updated);
  return { updated, isFavorite: !exists };
};

export const getCompletedMeals = () => {
  const today = new Date().toISOString().slice(0, 10);
  const data = getStoredItem(KEYS.COMPLETED_MEALS, { date: today, meals: ["df-m1"] });
  if (data.date !== today) {
    return { date: today, meals: [] };
  }
  return data;
};

export const toggleCompletedMeal = (mealId) => {
  const current = getCompletedMeals();
  const exists = current.meals.includes(mealId);
  const updatedMeals = exists
    ? current.meals.filter((id) => id !== mealId)
    : [...current.meals, mealId];
  const updatedData = { date: current.date, meals: updatedMeals };
  setStoredItem(KEYS.COMPLETED_MEALS, updatedData);
  return updatedData;
};

export const getWaterIntake = () => {
  const today = new Date().toISOString().slice(0, 10);
  const data = getStoredItem(KEYS.WATER_INTAKE, { date: today, glasses: 4 });
  if (data.date !== today) {
    return { date: today, glasses: 0 };
  }
  return data;
};

export const setWaterGlasses = (count) => {
  const today = new Date().toISOString().slice(0, 10);
  const clamped = Math.max(0, Math.min(16, count));
  const data = { date: today, glasses: clamped };
  setStoredItem(KEYS.WATER_INTAKE, data);
  return data;
};

export const getActivePlan = () => getStoredItem(KEYS.ACTIVE_PLAN, null);
export const setActivePlan = (plan) => setStoredItem(KEYS.ACTIVE_PLAN, plan);

export const getShoppingChecked = () => getStoredItem(KEYS.SHOPPING_LIST_CHECKED, []);
export const toggleShoppingChecked = (itemKey) => {
  const current = getShoppingChecked();
  const exists = current.includes(itemKey);
  const updated = exists ? current.filter((k) => k !== itemKey) : [...current, itemKey];
  setStoredItem(KEYS.SHOPPING_LIST_CHECKED, updated);
  return updated;
};

// =========================================================================
// BADGES & STREAKS STORAGE & EVALUATION SYSTEM
// =========================================================================

export const getStreakDays = () => {
  return Number(getStoredItem(KEYS.STREAK_DAYS, 7));
};

export const setStreakDays = (days) => {
  setStoredItem(KEYS.STREAK_DAYS, Number(days));
  const profile = getUserProfile();
  saveUserProfile({ ...profile, streakDays: Number(days) });
};

export const getUserBadges = () => {
  return getStoredItem(KEYS.UNLOCKED_BADGES, ["daily-starter", "weekly-warrior", "regional-foodie"]);
};

export const unlockBadge = (badgeId) => {
  const current = getUserBadges();
  if (!current.includes(badgeId)) {
    const updated = [...current, badgeId];
    setStoredItem(KEYS.UNLOCKED_BADGES, updated);
    return { isNew: true, updated };
  }
  return { isNew: false, updated: current };
};

export const evaluateMilestones = ({
  completedMealsCount = 0,
  totalMealsCount = 6,
  waterGlasses = 0,
  savedRecipesCount = 0,
  isRegionalPlan = true
}) => {
  const newlyUnlocked = [];
  const currentStreak = getStreakDays();

  // 1. Daily routine completion
  if (completedMealsCount >= totalMealsCount && totalMealsCount > 0) {
    const res = unlockBadge("daily-starter");
    if (res.isNew) newlyUnlocked.push("daily-starter");
  }

  // 2. Weekly routine completion (7+ days streak)
  if (currentStreak >= 7) {
    const res = unlockBadge("weekly-warrior");
    if (res.isNew) newlyUnlocked.push("weekly-warrior");
  }

  // 3. 14 Days consistency
  if (currentStreak >= 14) {
    const res = unlockBadge("fortnight-legend");
    if (res.isNew) newlyUnlocked.push("fortnight-legend");
  }

  // 4. 30 Days Month completion
  if (currentStreak >= 30) {
    const res = unlockBadge("monthly-grandmaster");
    if (res.isNew) newlyUnlocked.push("monthly-grandmaster");
  }

  // 5. 60 Days (2 Months) completion
  if (currentStreak >= 60) {
    const res = unlockBadge("sixty-day-titan");
    if (res.isNew) newlyUnlocked.push("sixty-day-titan");
  }

  // 6. Regional cuisine badge
  if (isRegionalPlan) {
    const res = unlockBadge("regional-foodie");
    if (res.isNew) newlyUnlocked.push("regional-foodie");
  }

  // 7. Hydration goal
  if (waterGlasses >= 8) {
    const res = unlockBadge("hydration-hero");
    if (res.isNew) newlyUnlocked.push("hydration-hero");
  }

  // 8. Recipe curator
  if (savedRecipesCount >= 3) {
    const res = unlockBadge("recipe-curator");
    if (res.isNew) newlyUnlocked.push("recipe-curator");
  }

  const allBadges = getUserBadges();
  const currentStage = calculateStage(currentStreak);

  return {
    newlyUnlocked,
    allBadges,
    streakDays: currentStreak,
    stage: currentStage
  };
};
