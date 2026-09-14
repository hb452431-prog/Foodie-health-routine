import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Edit3,
  Clock,
  RefreshCw,
  Info,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Utensils
} from "lucide-react";
import { generateAIFoodPlan, generateOfflineFallbackPlan } from "../services/geminiPlanService";
import { useLocation } from "../context/LocationContext";
import FoodDetailsModal from "./FoodDetailsModal";
import { findOrResolveFood } from "../services/foodService";

export default function PlanBuilder({
  onPlanGenerated,
  onClose,
  onShowToast
}) {
  const { currentCity = "", currentArea = "" } = useLocation();

  const [mode, setMode] = useState("gemini-ai"); // 'gemini-ai' | 'custom'
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const [generatedRoutine, setGeneratedRoutine] = useState(null);
  const [activeTabSection, setActiveTabSection] = useState("routine"); // 'routine' | 'shopping' | 'tips'
  const [checkedShoppingItems, setCheckedShoppingItems] = useState({});
  const [selectedFoodDetail, setSelectedFoodDetail] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Comprehensive AI Food Plan Form State
  const [formData, setFormData] = useState({
    age: 26,
    goal: "Healthy Eating",
    diet: "Vegetarian",
    activity: "Moderate",
    mealsPerDay: 5,
    foodPreferences: ["South Indian", "High Protein"],
    dislikedFoods: "",
    allergies: [],
    budget: "Medium",
    cookingTime: "Normal",
    location: currentCity ? `${currentArea ? currentArea + ", " : ""}${currentCity}` : "",
    healthNotes: ""
  });

  // Manual Custom Plan Builder State (Preserved)
  const [customForm, setCustomForm] = useState({
    title: "My Custom Wellness Routine",
    category: "Personalized Custom",
    description: "Tailored daily food routine designed for balanced macronutrients and whole-food nourishment.",
    calories: 2000,
    protein: 85,
    carbs: 220,
    fat: 55,
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    meals: [
      {
        id: "cm-1",
        slotName: "Morning Elixir",
        time: "07:00 AM",
        emoji: "🌅",
        title: "Warm Lemon Chia Detox Water",
        calories: 50,
        protein: 2,
        carbs: 6,
        fat: 1,
        prepTime: "3 min",
        isVeg: true,
        dietType: "Vegan",
        ingredients: [
          { name: "Chia seeds", amount: "1 tbsp" },
          { name: "Warm water", amount: "300 ml" },
          { name: "Lemon juice", amount: "1 tbsp" }
        ],
        steps: ["Stir chia seeds into warm water.", "Add fresh lemon juice and let sit for 5 minutes before drinking."]
      },
      {
        id: "cm-2",
        slotName: "Power Breakfast",
        time: "08:30 AM",
        emoji: "🍳",
        title: "High-Protein Oats & Greek Yogurt Bowl",
        calories: 440,
        protein: 24,
        carbs: 55,
        fat: 10,
        prepTime: "10 min",
        isVeg: true,
        dietType: "Vegetarian",
        ingredients: [
          { name: "Rolled oats", amount: "60g" },
          { name: "Greek yogurt", amount: "150g" },
          { name: "Mixed berries", amount: "50g" }
        ],
        steps: ["Combine oats and yogurt.", "Top with berries and crushed almonds."]
      },
      {
        id: "cm-3",
        slotName: "Energizing Lunch",
        time: "01:30 PM",
        emoji: "🍱",
        title: "Brown Rice & Lentil Sambar with Paneer",
        calories: 580,
        protein: 28,
        carbs: 75,
        fat: 15,
        prepTime: "20 min",
        isVeg: true,
        dietType: "Vegetarian",
        ingredients: [
          { name: "Brown rice", amount: "1 cup" },
          { name: "Toor dal sambar", amount: "1.5 cups" },
          { name: "Pan-seared paneer", amount: "100g" }
        ],
        steps: ["Plate steaming brown rice with hot vegetable sambar.", "Serve with fresh lightly spiced paneer cubes."]
      },
      {
        id: "cm-4",
        slotName: "Light Dinner",
        time: "08:00 PM",
        emoji: "🌙",
        title: "Grilled Tofu / Paneer with Veggie Broth Soup",
        calories: 460,
        protein: 26,
        carbs: 35,
        fat: 16,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        ingredients: [
          { name: "Firm Tofu or Paneer", amount: "140g" },
          { name: "Mixed vegetable clear broth", amount: "1.5 cups" }
        ],
        steps: ["Pan-grill seasoned tofu or paneer until golden.", "Serve alongside a warm nourishing vegetable soup."]
      }
    ]
  });

  const totalSteps = 4;

  const handlePreferenceToggle = (pref) => {
    setFormData((prev) => {
      const exists = prev.foodPreferences.includes(pref);
      return {
        ...prev,
        foodPreferences: exists
          ? prev.foodPreferences.filter((p) => p !== pref)
          : [...prev.foodPreferences, pref]
      };
    });
  };

  const handleAllergyToggle = (allergy) => {
    setFormData((prev) => {
      const exists = prev.allergies.includes(allergy);
      return {
        ...prev,
        allergies: exists
          ? prev.allergies.filter((a) => a !== allergy)
          : [...prev.allergies, allergy]
      };
    });
  };

  const handleGenerateAIPlan = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const plan = await generateAIFoodPlan(formData);
      setGeneratedRoutine(plan);
      setIsGenerating(false);

      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (_e) {}

      if (onShowToast) {
        onShowToast("✨ Gemini AI personalized food routine generated!");
      }
    } catch (err) {
      console.error("Gemini AI plan generation error:", err);
      setGenerationError(err.message || "Failed to generate AI food routine. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleApplyFallback = () => {
    const fallback = generateOfflineFallbackPlan(formData);
    setGeneratedRoutine(fallback);
    setGenerationError(null);
    if (onShowToast) {
      onShowToast("💡 Loaded safe balanced nutritional routine.");
    }
  };

  const handleSaveAndApply = () => {
    if (generatedRoutine) {
      if (onPlanGenerated) {
        onPlanGenerated(generatedRoutine);
      }
      if (onClose) {
        onClose();
      }
      if (onShowToast) {
        onShowToast("🎉 Your Gemini AI routine is now active in My Plan!");
      }
    }
  };

  // Manual Custom Plan Handlers
  const handleUpdateMeal = (index, field, value) => {
    const updatedMeals = [...customForm.meals];
    updatedMeals[index] = { ...updatedMeals[index], [field]: value };
    setCustomForm({ ...customForm, meals: updatedMeals });
  };

  const handleAddMeal = () => {
    const newMeal = {
      id: `cm-${Date.now()}`,
      slotName: `Meal ${customForm.meals.length + 1}`,
      time: "04:00 PM",
      emoji: "🥗",
      title: "Healthy Whole Food Snack",
      calories: 250,
      protein: 12,
      carbs: 30,
      fat: 6,
      prepTime: "10 min",
      isVeg: true,
      dietType: "Vegetarian",
      ingredients: [{ name: "Mixed healthy snack", amount: "1 portion" }],
      steps: ["Prepare with whole fresh ingredients and enjoy."]
    };
    setCustomForm({ ...customForm, meals: [...customForm.meals, newMeal] });
  };

  const handleRemoveMeal = (index) => {
    if (customForm.meals.length <= 1) {
      if (onShowToast) onShowToast("⚠️ Your routine needs at least 1 meal.");
      return;
    }
    const updatedMeals = customForm.meals.filter((_, i) => i !== index);
    setCustomForm({ ...customForm, meals: updatedMeals });
  };

  const handleSaveCustomPlan = (e) => {
    e.preventDefault();
    if (!customForm.title.trim()) {
      if (onShowToast) onShowToast("⚠️ Please enter a routine title.");
      return;
    }

    const totalCals = customForm.meals.reduce((sum, m) => sum + Number(m.calories || 0), 0);
    const totalProt = customForm.meals.reduce((sum, m) => sum + Number(m.protein || 0), 0);
    const totalCarbs = customForm.meals.reduce((sum, m) => sum + Number(m.carbs || 0), 0);
    const totalFat = customForm.meals.reduce((sum, m) => sum + Number(m.fat || 0), 0);

    const completedCustomPlan = {
      id: `custom-user-${Date.now()}`,
      title: customForm.title.trim(),
      category: customForm.category,
      description: customForm.description,
      subtitle: `${customForm.meals.length} custom meals daily • ${totalCals || customForm.calories} kcal • ${totalProt || customForm.protein}g protein`,
      calories: totalCals || customForm.calories,
      protein: totalProt || customForm.protein,
      carbs: totalCarbs || customForm.carbs,
      fat: totalFat || customForm.fat,
      isVegetarian: customForm.isVegetarian,
      image: customForm.image,
      mealsCount: customForm.meals.length,
      difficulty: "Custom",
      prepTimeAvg: "15 min",
      isCustom: true,
      dailyTimeline: customForm.meals
    };

    if (onPlanGenerated) {
      onPlanGenerated(completedCustomPlan);
    }
    if (onClose) {
      onClose();
    }
    if (onShowToast) {
      onShowToast("🎉 Your custom created routine is now active in My Plan!");
    }

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (_e) {}
  };

  const toggleShoppingCheck = (idx) => {
    setCheckedShoppingItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "880px" }}>
        <div style={{ padding: "1.75rem" }}>
          {/* Top Switcher & Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
              gap: "0.75rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: mode === "gemini-ai" ? "linear-gradient(135deg, #10B981, #059669)" : "linear-gradient(135deg, #3B82F6, #1D4ED8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)"
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                    {mode === "gemini-ai" ? "Gemini AI Nutrition Planner" : "Create Manual Custom Plan"}
                  </h3>
                  {mode === "gemini-ai" && (
                    <span className="badge badge-green" style={{ fontSize: "0.68rem", padding: "0.15rem 0.5rem" }}>
                      ✨ AI Powered
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                  {mode === "gemini-ai"
                    ? "Clinical-grade personalized daily timetable, macros & shopping list"
                    : "Build and calibrate your daily routine meal by meal"}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Mode Toggle Switcher */}
              {!generatedRoutine && !isGenerating && (
                <div
                  style={{
                    display: "flex",
                    background: "var(--bg-card-subtle)",
                    padding: "0.2rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMode("gemini-ai");
                      setGenerationError(null);
                    }}
                    style={{
                      border: "none",
                      background: mode === "gemini-ai" ? "#FFFFFF" : "transparent",
                      color: mode === "gemini-ai" ? "var(--primary-800)" : "var(--text-muted)",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      cursor: "pointer",
                      boxShadow: mode === "gemini-ai" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                      transition: "all 0.15s ease"
                    }}
                  >
                    ✨ Gemini AI
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("custom");
                      setGenerationError(null);
                    }}
                    style={{
                      border: "none",
                      background: mode === "custom" ? "#FFFFFF" : "transparent",
                      color: mode === "custom" ? "var(--primary-800)" : "var(--text-muted)",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      cursor: "pointer",
                      boxShadow: mode === "custom" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                      transition: "all 0.15s ease"
                    }}
                  >
                    🛠️ Manual Custom
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                style={{
                  background: "var(--bg-card-subtle)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-secondary)"
                }}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>

          {/* ============================================================
             MODE 1: GEMINI AI NUTRITION PLANNER
          ============================================================ */}
          {mode === "gemini-ai" && (
            <>
              {/* ----------------- STATE 1: LOADING ----------------- */}
              {isGenerating && (
                <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      margin: "0 auto 1.5rem",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.25))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animation: "pulse 2s infinite"
                    }}
                  >
                    <Sparkles size={34} style={{ color: "var(--primary-600)" }} />
                  </div>
                  <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.5rem" }}>
                    Creating your personalized food routine with Gemini AI...
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", maxWidth: "460px", margin: "0 auto 1.75rem" }}>
                    Calibrating daily calories, macronutrient targets, delicious recipes, and grocery checklist based on your profile.
                  </p>

                  {/* Shimmer skeleton indicators */}
                  <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left" }}>
                    <div className="glass-card" style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <CheckCircle2 size={18} style={{ color: "#10B981" }} />
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-main)" }}>
                        Calculating target calories & protein for {formData.goal} ({formData.age} yrs)...
                      </span>
                    </div>
                    <div className="glass-card" style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }} />
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--primary-700)" }}>
                        Structuring {formData.mealsPerDay}-meal timetable from Morning Elixir to Dinner...
                      </span>
                    </div>
                    <div className="glass-card" style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", opacity: 0.7 }}>
                      <Clock size={16} style={{ color: "var(--text-muted)" }} />
                      <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        Assembling categorized grocery checklist and preparation tips...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- STATE 2: ERROR ----------------- */}
              {!isGenerating && generationError && (
                <div style={{ padding: "1.5rem 0", textAlign: "center" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      margin: "0 auto 1rem",
                      borderRadius: "50%",
                      background: "#FEE2E2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <AlertCircle size={28} style={{ color: "#DC2626" }} />
                  </div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#991B1B", marginBottom: "0.4rem" }}>
                    Unable to generate your food routine right now.
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "440px", margin: "0 auto 1.5rem" }}>
                    {generationError}
                  </p>

                  <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleGenerateAIPlan}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      <RefreshCw size={15} />
                      Try Again
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleApplyFallback}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      <Sparkles size={15} />
                      Load Safe Suggested Plan
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setMode("custom")}
                    >
                      Create Manual Plan
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- STATE 3: FORM WIZARD ----------------- */}
              {!isGenerating && !generationError && !generatedRoutine && (
                <>
                  {/* Step Progress Header */}
                  <div className="wizard-progress-bar" style={{ marginBottom: "0.5rem" }}>
                    <div className="wizard-progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      marginBottom: "1.25rem"
                    }}
                  >
                    <span>STEP {step} OF {totalSteps}</span>
                    <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
                  </div>

                  {/* STEP 1: Basic Profile & Goals */}
                  {step === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          1. Your Age
                        </label>
                        <input
                          type="number"
                          min="12"
                          max="100"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="search-input"
                          style={{ width: "100%", maxWidth: "180px", padding: "0.6rem 0.9rem" }}
                          placeholder="e.g. 26"
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          2. Primary Goal
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem" }}>
                          {[
                            { id: "Weight Loss", label: "⚖️ Weight Loss" },
                            { id: "Weight Gain", label: "🏋️ Weight Gain" },
                            { id: "Maintain Weight", label: "🔄 Maintain Weight" },
                            { id: "Fitness/Muscle", label: "💪 Muscle & Fitness" },
                            { id: "Healthy Eating", label: "🥗 Healthy Eating" }
                          ].map((g) => (
                            <button
                              key={g.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, goal: g.id })}
                              className={`glass-card ${formData.goal === g.id ? "active-filter-card" : ""}`}
                              style={{
                                padding: "0.75rem 0.5rem",
                                border: formData.goal === g.id ? "2px solid var(--primary-600)" : "1px solid var(--border-subtle)",
                                background: formData.goal === g.id ? "var(--primary-50)" : "var(--bg-card)",
                                borderRadius: "var(--radius-md)",
                                fontWeight: 700,
                                fontSize: "0.82rem",
                                cursor: "pointer",
                                textAlign: "center",
                                color: formData.goal === g.id ? "var(--primary-900)" : "var(--text-main)"
                              }}
                            >
                              {g.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          3. Dietary Lifestyle
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem" }}>
                          {[
                            { id: "Vegetarian", label: "🥬 Vegetarian" },
                            { id: "Non-Vegetarian", label: "🍗 Non-Vegetarian" },
                            { id: "Vegan", label: "🌱 Vegan" },
                            { id: "Eggetarian", label: "🥚 Eggetarian" }
                          ].map((d) => (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, diet: d.id })}
                              className={`glass-card ${formData.diet === d.id ? "active-filter-card" : ""}`}
                              style={{
                                padding: "0.75rem 0.5rem",
                                border: formData.diet === d.id ? "2px solid var(--primary-600)" : "1px solid var(--border-subtle)",
                                background: formData.diet === d.id ? "var(--primary-50)" : "var(--bg-card)",
                                borderRadius: "var(--radius-md)",
                                fontWeight: 700,
                                fontSize: "0.82rem",
                                cursor: "pointer",
                                textAlign: "center",
                                color: formData.diet === d.id ? "var(--primary-900)" : "var(--text-main)"
                              }}
                            >
                              {d.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Activity & Meal Routine Structure */}
                  {step === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          1. Daily Physical Activity Level
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.5rem" }}>
                          {[
                            { id: "Low", label: "🚶 Low", desc: "Desk job / light walking" },
                            { id: "Moderate", label: "🏃 Moderate", desc: "3-4 workouts per week" },
                            { id: "High", label: "⚡ High", desc: "Daily training or active job" }
                          ].map((act) => (
                            <button
                              key={act.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, activity: act.id })}
                              className={`glass-card ${formData.activity === act.id ? "active-filter-card" : ""}`}
                              style={{
                                padding: "0.75rem",
                                border: formData.activity === act.id ? "2px solid var(--primary-600)" : "1px solid var(--border-subtle)",
                                background: formData.activity === act.id ? "var(--primary-50)" : "var(--bg-card)",
                                borderRadius: "var(--radius-md)",
                                cursor: "pointer",
                                textAlign: "left"
                              }}
                            >
                              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: formData.activity === act.id ? "var(--primary-900)" : "var(--text-main)" }}>
                                {act.label}
                              </div>
                              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                                {act.desc}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          2. Target Meals Per Day
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                          {[
                            { num: 3, label: "3 Meals", sub: "B / L / D" },
                            { num: 4, label: "4 Meals", sub: "+ Morning" },
                            { num: 5, label: "5 Meals", sub: "Standard" },
                            { num: 6, label: "6 Meals", sub: "Athlete" }
                          ].map((m) => (
                            <button
                              key={m.num}
                              type="button"
                              onClick={() => setFormData({ ...formData, mealsPerDay: m.num })}
                              className={`glass-card ${formData.mealsPerDay === m.num ? "active-filter-card" : ""}`}
                              style={{
                                padding: "0.6rem 0.4rem",
                                border: formData.mealsPerDay === m.num ? "2px solid var(--primary-600)" : "1px solid var(--border-subtle)",
                                background: formData.mealsPerDay === m.num ? "var(--primary-50)" : "var(--bg-card)",
                                borderRadius: "var(--radius-md)",
                                cursor: "pointer",
                                textAlign: "center"
                              }}
                            >
                              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: formData.mealsPerDay === m.num ? "var(--primary-900)" : "var(--text-main)" }}>
                                {m.label}
                              </div>
                              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                                {m.sub}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          3. Cooking Time & Budget
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                          <div>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>Prep Time</span>
                            <select
                              value={formData.cookingTime}
                              onChange={(e) => setFormData({ ...formData, cookingTime: e.target.value })}
                              className="search-input"
                              style={{ width: "100%", padding: "0.55rem 0.75rem" }}
                            >
                              <option value="Quick">⚡ Quick (Under 20 min)</option>
                              <option value="Normal">⏱️ Normal (20 - 40 min)</option>
                              <option value="Flexible">🍳 Flexible (40+ min)</option>
                            </select>
                          </div>
                          <div>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>Ingredient Budget</span>
                            <select
                              value={formData.budget}
                              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                              className="search-input"
                              style={{ width: "100%", padding: "0.55rem 0.75rem" }}
                            >
                              <option value="Low">🪙 Budget-Friendly</option>
                              <option value="Medium">🥗 Medium / Standard</option>
                              <option value="Flexible">✨ Flexible / Gourmet</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Cuisines, Preferences & Dislikes */}
                  {step === 3 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          1. Preferred Cuisines & Styles (Select all that apply)
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                          {[
                            "South Indian",
                            "North Indian",
                            "Mediterranean",
                            "Asian / Stir-Fry",
                            "Continental",
                            "High Protein",
                            "Low Carb",
                            "Gut Health",
                            "Millets & Whole Grains"
                          ].map((pref) => {
                            const selected = formData.foodPreferences.includes(pref);
                            return (
                              <button
                                key={pref}
                                type="button"
                                onClick={() => handlePreferenceToggle(pref)}
                                style={{
                                  padding: "0.4rem 0.75rem",
                                  borderRadius: "var(--radius-full)",
                                  border: selected ? "1px solid var(--primary-600)" : "1px solid var(--border-subtle)",
                                  background: selected ? "var(--primary-600)" : "var(--bg-card)",
                                  color: selected ? "#FFFFFF" : "var(--text-main)",
                                  fontSize: "0.78rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  transition: "all 0.15s ease"
                                }}
                              >
                                {selected ? "✓ " : "+ "}{pref}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          2. Foods You Dislike (Strictly Avoid)
                        </label>
                        <input
                          type="text"
                          value={formData.dislikedFoods}
                          onChange={(e) => setFormData({ ...formData, dislikedFoods: e.target.value })}
                          className="search-input"
                          style={{ width: "100%", padding: "0.6rem 0.9rem" }}
                          placeholder="e.g. Bitter gourd, Mushrooms, Eggplant, Seafood"
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          3. Your Location / City (Optional Hint for Local Ingredients)
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="search-input"
                            style={{ width: "100%", padding: "0.6rem 0.9rem 0.6rem 2.2rem" }}
                            placeholder="e.g. Bengaluru, Karnataka (optional)"
                          />
                          <MapPin size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Allergies & Health Notes */}
                  {step === 4 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#991B1B", marginBottom: "0.4rem" }}>
                          1. Allergies & Food Intolerances (Zero-Tolerance)
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                          {[
                            "Dairy / Lactose",
                            "Gluten",
                            "Peanuts",
                            "Tree Nuts",
                            "Soy",
                            "Eggs",
                            "Seafood / Shellfish"
                          ].map((allergy) => {
                            const selected = formData.allergies.includes(allergy);
                            return (
                              <button
                                key={allergy}
                                type="button"
                                onClick={() => handleAllergyToggle(allergy)}
                                style={{
                                  padding: "0.4rem 0.75rem",
                                  borderRadius: "var(--radius-full)",
                                  border: selected ? "1px solid #DC2626" : "1px solid var(--border-subtle)",
                                  background: selected ? "#FEE2E2" : "var(--bg-card)",
                                  color: selected ? "#991B1B" : "var(--text-main)",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  cursor: "pointer"
                                }}
                              >
                                {selected ? "🚫 " : "+ "}{allergy}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
                          2. Health Conditions & Special Protocols (Optional)
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.5rem" }}>
                          {[
                            "Type 2 Diabetes",
                            "PCOS / PCOD",
                            "Hypertension / High BP",
                            "Hypothyroidism",
                            "High Cholesterol",
                            "Fatty Liver",
                            "GERD / Acidity",
                            "Uric Acid / Gout",
                            "IBS / Gut Health"
                          ].map((cond) => {
                            const isIncluded = formData.healthNotes.includes(cond);
                            return (
                              <button
                                key={cond}
                                type="button"
                                onClick={() => {
                                  if (isIncluded) {
                                    setFormData({
                                      ...formData,
                                      healthNotes: formData.healthNotes.replace(cond, "").replace(/,\s*,/g, ",").trim()
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      healthNotes: formData.healthNotes ? `${formData.healthNotes}, ${cond}` : cond
                                    });
                                  }
                                }}
                                style={{
                                  padding: "0.3rem 0.65rem",
                                  borderRadius: "var(--radius-full)",
                                  border: isIncluded ? "1.5px solid #10B981" : "1px solid var(--border-subtle)",
                                  background: isIncluded ? "#ECFDF5" : "#FFFFFF",
                                  color: isIncluded ? "#065F46" : "var(--text-secondary)",
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  cursor: "pointer"
                                }}
                              >
                                {isIncluded ? "✓ " : "+ "}{cond}
                              </button>
                            );
                          })}
                        </div>
                        <textarea
                          rows={3}
                          value={formData.healthNotes}
                          onChange={(e) => setFormData({ ...formData, healthNotes: e.target.value })}
                          className="search-input"
                          style={{ width: "100%", padding: "0.6rem 0.9rem", resize: "vertical" }}
                          placeholder="e.g. Mild spices, Type 2 Diabetes, low sodium, focusing on natural whole foods..."
                        />
                      </div>

                      {/* Educational Medical Disclaimer Notice */}
                      <div
                        style={{
                          background: "#EFF6FF",
                          border: "1px solid #BFDBFE",
                          borderRadius: "var(--radius-md)",
                          padding: "0.75rem",
                          display: "flex",
                          gap: "0.6rem",
                          alignItems: "flex-start"
                        }}
                      >
                        <Info size={16} style={{ color: "#2563EB", flexShrink: 0, marginTop: "0.15rem" }} />
                        <span style={{ fontSize: "0.75rem", color: "#1E40AF", lineHeight: 1.4 }}>
                          <strong>Medical Notice:</strong> This food plan is generated for general wellness and nutritional education. If you have medical conditions like diabetes or kidney conditions, always consult a qualified healthcare professional.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Wizard Step Navigation Footer */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1.5rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--border-subtle)"
                    }}
                  >
                    {step > 1 ? (
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setStep(step - 1)}
                        style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < totalSteps ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setStep(step + 1)}
                        style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                      >
                        Next
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleGenerateAIPlan}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "linear-gradient(135deg, #10B981, #059669)",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                        }}
                      >
                        <Sparkles size={16} />
                        Generate AI Food Routine
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* ----------------- STATE 4: GENERATED AI PLAN VIEW ----------------- */}
              {!isGenerating && !generationError && generatedRoutine && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Top Routine Banner */}
                  <div
                    className="glass-card"
                    style={{
                      padding: "1.25rem",
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 95, 70, 0.04))",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                      borderRadius: "var(--radius-lg)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div>
                        <span className="badge badge-green" style={{ marginBottom: "0.4rem" }}>
                          ✨ Your AI Personalized Food Routine
                        </span>
                        <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                          {generatedRoutine.title}
                        </h4>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.25rem", marginBottom: "0.75rem" }}>
                          {generatedRoutine.subtitle}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => setGeneratedRoutine(null)}
                          style={{ fontSize: "0.78rem", padding: "0.35rem 0.65rem" }}
                        >
                          <Edit3 size={14} style={{ marginRight: "0.3rem" }} />
                          Modify Inputs
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleGenerateAIPlan}
                          style={{ fontSize: "0.78rem", padding: "0.35rem 0.65rem" }}
                        >
                          <RefreshCw size={14} style={{ marginRight: "0.3rem" }} />
                          Regenerate
                        </button>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "var(--text-main)", lineHeight: 1.5, margin: 0 }}>
                      {generatedRoutine.description}
                    </p>

                    {/* Caloric & Macronutrient Target Pills */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                        gap: "0.5rem",
                        marginTop: "1rem"
                      }}
                    >
                      <div style={{ background: "#FFFFFF", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>CALORIES</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#EA580C" }}>{generatedRoutine.calories} kcal</div>
                      </div>
                      <div style={{ background: "#FFFFFF", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>PROTEIN</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#2563EB" }}>{generatedRoutine.protein}g</div>
                      </div>
                      <div style={{ background: "#FFFFFF", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>CARBS</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16A34A" }}>{generatedRoutine.carbs}g</div>
                      </div>
                      <div style={{ background: "#FFFFFF", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>FATS</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#D97706" }}>{generatedRoutine.fat}g</div>
                      </div>
                    </div>
                  </div>

                  {/* Tab Navigation in Result: Routine Timeline / Shopping List / Tips */}
                  <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>
                    {[
                      { id: "routine", label: "🗓️ Daily Timetable", count: generatedRoutine.dailyTimeline?.length },
                      { id: "shopping", label: "🛒 Shopping List", count: generatedRoutine.shoppingList?.length },
                      { id: "tips", label: "💡 Nutritionist Tips", count: generatedRoutine.tips?.length }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabSection(tab.id)}
                        style={{
                          border: "none",
                          background: activeTabSection === tab.id ? "var(--primary-100)" : "transparent",
                          color: activeTabSection === tab.id ? "var(--primary-800)" : "var(--text-secondary)",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "var(--radius-md)",
                          cursor: "pointer"
                        }}
                      >
                        {tab.label} {tab.count ? `(${tab.count})` : ""}
                      </button>
                    ))}
                  </div>

                  {/* SECTION A: ROUTINE TIMELINE */}
                  {activeTabSection === "routine" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      {generatedRoutine.dailyTimeline?.map((meal, idx) => {
                        const foodRecord = findOrResolveFood(meal.foodId || meal.title);
                        const displayImage = meal.image || foodRecord?.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

                        return (
                          <div
                            key={meal.id || idx}
                            className="glass-card"
                            style={{
                              padding: "1.1rem 1.25rem",
                              borderRadius: "var(--radius-lg)",
                              border: "1px solid var(--border-subtle)",
                              background: "#FFFFFF",
                              boxShadow: "var(--shadow-xs)"
                            }}
                          >
                            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                              {/* Meal Image Thumbnail */}
                              {displayImage && (
                                <div style={{ position: "relative", flexShrink: 0 }}>
                                  <img
                                    src={displayImage}
                                    alt={meal.title}
                                    loading="lazy"
                                    style={{
                                      width: "76px",
                                      height: "76px",
                                      borderRadius: "var(--radius-md)",
                                      objectFit: "cover",
                                      border: "1px solid var(--border-subtle)",
                                      boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                                    }}
                                  />
                                  {foodRecord?.imageGenerated && (
                                    <span
                                      style={{
                                        position: "absolute",
                                        bottom: "3px",
                                        left: "3px",
                                        background: "rgba(0,0,0,0.75)",
                                        color: "#86EFAC",
                                        fontSize: "0.55rem",
                                        fontWeight: 800,
                                        padding: "1px 3px",
                                        borderRadius: "3px"
                                      }}
                                    >
                                      AI
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Title & Slot Info */}
                              <div style={{ flex: 1, minWidth: "180px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.4rem" }}>
                                  <div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary-700)", textTransform: "uppercase" }}>
                                      {meal.emoji || "🥗"} {meal.time} • {meal.slotName}
                                    </div>
                                    <h5 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--primary-900)", margin: "0.1rem 0 0.25rem" }}>
                                      {meal.title}
                                    </h5>
                                    {foodRecord?.stateOrRegion && (
                                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginRight: "0.5rem" }}>
                                        📍 {foodRecord.stateOrRegion}, {foodRecord.country || "India"}
                                      </span>
                                    )}
                                  </div>

                                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                                    <span style={{ fontSize: "0.72rem", fontWeight: 700, background: "#FFF7ED", color: "#C2410C", padding: "0.2rem 0.45rem", borderRadius: "var(--radius-sm)" }}>
                                      🔥 {meal.calories} kcal
                                    </span>
                                    <span style={{ fontSize: "0.72rem", fontWeight: 700, background: "#EFF6FF", color: "#1D4ED8", padding: "0.2rem 0.45rem", borderRadius: "var(--radius-sm)" }}>
                                      🥩 {meal.protein}g P
                                    </span>
                                    <span style={{ fontSize: "0.72rem", fontWeight: 700, background: "#F0FDF4", color: "#15803D", padding: "0.2rem 0.45rem", borderRadius: "var(--radius-sm)" }}>
                                      ⏱️ {meal.prepTime}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Ingredients List */}
                            {meal.ingredients && meal.ingredients.length > 0 && (
                              <div style={{ marginTop: "0.75rem", background: "var(--bg-card-subtle)", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)" }}>
                                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                                  🥕 Key Ingredients:
                                </span>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                  {meal.ingredients.map((ing, iIdx) => (
                                    <span
                                      key={iIdx}
                                      style={{
                                        fontSize: "0.73rem",
                                        background: "#FFFFFF",
                                        border: "1px solid var(--border-subtle)",
                                        padding: "0.15rem 0.45rem",
                                        borderRadius: "var(--radius-sm)",
                                        color: "var(--text-main)"
                                      }}
                                    >
                                      {typeof ing === "string" ? ing : `${ing.name} ${ing.amount ? `(${ing.amount})` : ""}`}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Preparation Directions */}
                            {meal.steps && meal.steps.length > 0 && (
                              <div style={{ marginTop: "0.6rem" }}>
                                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                                  👨‍🍳 Preparation Steps:
                                </span>
                                <ol style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.8rem", color: "var(--text-main)", lineHeight: 1.4 }}>
                                  {meal.steps.map((st, sIdx) => (
                                    <li key={sIdx} style={{ marginBottom: "0.2rem" }}>{st}</li>
                                  ))}
                                </ol>
                              </div>
                            )}

                            {/* Actions: View Dish Details button */}
                            <div style={{ marginTop: "0.85rem", paddingTop: "0.6rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => setSelectedFoodDetail(foodRecord || { dishName: meal.title, category: meal.slotName, calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat, description: meal.description, imageUrl: displayImage })}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.4rem",
                                  fontSize: "0.78rem",
                                  padding: "0.35rem 0.75rem",
                                  color: "var(--primary-800)",
                                  background: "var(--primary-50)",
                                  border: "1px solid var(--primary-200)"
                                }}
                              >
                                <Utensils size={13} />
                                <span>View Dish Details</span>
                              </button>

                              {foodRecord?.youtubeUrl && (
                                <a
                                  href={foodRecord.youtubeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#DC2626",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.3rem"
                                  }}
                                >
                                  ▶ Watch Recipe Video
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* SECTION B: SHOPPING LIST */}
                  {activeTabSection === "shopping" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      {generatedRoutine.shoppingList && generatedRoutine.shoppingList.length > 0 ? (
                        generatedRoutine.shoppingList.map((cat, cIdx) => (
                          <div key={cIdx} className="glass-card" style={{ padding: "1rem", borderRadius: "var(--radius-md)" }}>
                            <h5 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary-800)", marginBottom: "0.6rem" }}>
                              🛒 {cat.category}
                            </h5>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.4rem" }}>
                              {cat.items?.map((item, iIdx) => {
                                const checkKey = `${cIdx}-${iIdx}`;
                                const isChecked = !!checkedShoppingItems[checkKey];
                                return (
                                  <div
                                    key={iIdx}
                                    onClick={() => toggleShoppingCheck(checkKey)}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "0.5rem",
                                      fontSize: "0.82rem",
                                      cursor: "pointer",
                                      textDecoration: isChecked ? "line-through" : "none",
                                      color: isChecked ? "var(--text-muted)" : "var(--text-main)"
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {}}
                                      style={{ cursor: "pointer" }}
                                    />
                                    <span>{item}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                          Standard weekly staples: Whole grains, fresh seasonal greens, proteins, and antioxidant tea.
                        </p>
                      )}
                    </div>
                  )}

                  {/* SECTION C: NUTRITIONIST TIPS */}
                  {activeTabSection === "tips" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {generatedRoutine.tips?.map((tip, tIdx) => (
                        <div
                          key={tIdx}
                          className="glass-card"
                          style={{
                            padding: "0.9rem 1rem",
                            display: "flex",
                            gap: "0.75rem",
                            alignItems: "flex-start",
                            borderRadius: "var(--radius-md)"
                          }}
                        >
                          <div
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              background: "var(--primary-100)",
                              color: "var(--primary-800)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              fontSize: "0.75rem",
                              flexShrink: 0
                            }}
                          >
                            {tIdx + 1}
                          </div>
                          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-main)", lineHeight: 1.5 }}>
                            {tip}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Medical Disclaimer Banner */}
                  <div
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: "var(--radius-md)",
                      padding: "0.75rem",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.4
                    }}
                  >
                    <strong>Clinical Disclaimer:</strong> {generatedRoutine.medicalDisclaimer}
                  </div>

                  {/* Bottom Action Footer */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.75rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid var(--border-subtle)",
                      flexWrap: "wrap",
                      gap: "0.75rem"
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setGeneratedRoutine(null)}
                    >
                      ← Back to Form
                    </button>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveAndApply}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "linear-gradient(135deg, #10B981, #059669)",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                        }}
                      >
                        <Check size={16} />
                        Save & Apply to My Plan
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ============================================================
             MODE 2: MANUAL CUSTOM PLAN BUILDER (PRESERVED)
          ============================================================ */}
          {mode === "custom" && (
            <form onSubmit={handleSaveCustomPlan} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                  Routine Title
                </label>
                <input
                  type="text"
                  value={customForm.title}
                  onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
                  className="search-input"
                  style={{ width: "100%", padding: "0.6rem 0.85rem" }}
                  placeholder="e.g. My High-Energy Daily Routine"
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                  Description / Routine Goal
                </label>
                <input
                  type="text"
                  value={customForm.description}
                  onChange={(e) => setCustomForm({ ...customForm, description: e.target.value })}
                  className="search-input"
                  style={{ width: "100%", padding: "0.6rem 0.85rem" }}
                  placeholder="e.g. Focused on whole-food carbs and lean plant proteins"
                />
              </div>

              {/* Meals List */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)" }}>
                    Daily Meals ({customForm.meals.length})
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleAddMeal}
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem" }}
                  >
                    <Plus size={14} style={{ marginRight: "0.2rem" }} />
                    Add Meal Slot
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "320px", overflowY: "auto", paddingRight: "0.3rem" }}>
                  {customForm.meals.map((meal, index) => (
                    <div
                      key={meal.id || index}
                      className="glass-card"
                      style={{ padding: "0.85rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                          <input
                            type="text"
                            value={meal.emoji}
                            onChange={(e) => handleUpdateMeal(index, "emoji", e.target.value)}
                            style={{ width: "36px", textAlign: "center", fontSize: "1rem", padding: "0.2rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}
                          />
                          <input
                            type="text"
                            value={meal.slotName}
                            onChange={(e) => handleUpdateMeal(index, "slotName", e.target.value)}
                            placeholder="Meal Name"
                            style={{ fontWeight: 700, fontSize: "0.85rem", padding: "0.25rem 0.5rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}
                          />
                          <input
                            type="text"
                            value={meal.time}
                            onChange={(e) => handleUpdateMeal(index, "time", e.target.value)}
                            placeholder="Time"
                            style={{ width: "90px", fontSize: "0.78rem", padding: "0.25rem 0.4rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveMeal(index)}
                          style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", padding: "0.2rem" }}
                          title="Remove meal"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 70px", gap: "0.4rem", marginBottom: "0.4rem" }}>
                        <input
                          type="text"
                          value={meal.title}
                          onChange={(e) => handleUpdateMeal(index, "title", e.target.value)}
                          placeholder="Dish Title (e.g. Scrambled Eggs on Toast)"
                          style={{ fontSize: "0.82rem", padding: "0.35rem 0.5rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}
                          required
                        />
                        <input
                          type="number"
                          value={meal.calories}
                          onChange={(e) => handleUpdateMeal(index, "calories", Number(e.target.value))}
                          placeholder="Calories"
                          style={{ fontSize: "0.82rem", padding: "0.35rem 0.5rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}
                        />
                        <input
                          type="number"
                          value={meal.protein}
                          onChange={(e) => handleUpdateMeal(index, "protein", Number(e.target.value))}
                          placeholder="Prot (g)"
                          style={{ fontSize: "0.82rem", padding: "0.35rem 0.5rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Submit */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                <button type="button" className="btn btn-outline" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Check size={16} />
                  Save & Apply Custom Routine
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Central Food Knowledge Base Food Details Modal */}
      {selectedFoodDetail && (
        <FoodDetailsModal
          food={selectedFoodDetail}
          onClose={() => setSelectedFoodDetail(null)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
}
