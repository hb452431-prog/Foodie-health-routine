const KEYS = {
  ACTIVE_PLAN: "fhr_active_plan",
  SAVED_ROUTINES: "fhr_saved_routines",
  FAVORITE_MEALS: "fhr_favorite_meals",
  COMPLETED_MEALS: "fhr_completed_meals",
  WATER_INTAKE: "fhr_water_intake",
  USER_PROFILE: "fhr_user_profile",
  SHOPPING_LIST_CHECKED: "fhr_shopping_checked"
};

// Default user profile
export const DEFAULT_USER_PROFILE = {
  name: "Harsha",
  email: "harsha.wellness@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
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

export const getUserProfile = () => getStoredItem(KEYS.USER_PROFILE, DEFAULT_USER_PROFILE);
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
