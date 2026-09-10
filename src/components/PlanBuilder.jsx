import React, { useState } from "react";
import confetti from "canvas-confetti";
import { ROUTINES_DATA } from "../data/routinesData";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Flame,
  ShieldAlert,
  Heart,
  Calendar,
  Utensils,
  Award,
  Plus,
  Trash2,
  Edit3,
  Sliders,
  Clock,
  Share2
} from "lucide-react";

export default function PlanBuilder({
  onPlanGenerated,
  onClose,
  onShowToast
}) {
  const [mode, setMode] = useState("guided"); // 'guided' | 'custom'
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState(null);

  // Guided Form State
  const [answers, setAnswers] = useState({
    goal: "Healthy lifestyle",
    diet: "Vegetarian",
    activity: "Moderate",
    mealsPerDay: 5,
    budget: "Moderate",
    prepTime: "Under 20 min",
    allergies: []
  });

  // Manual Custom Plan Builder State
  const [customForm, setCustomForm] = useState({
    title: "My Custom Wellness Routine",
    category: "Personalized Custom",
    description: "Tailored daily food routine designed for balanced macronutrients and whole-food nourishment.",
    calories: 2100,
    protein: 85,
    carbs: 230,
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
        calories: 60,
        protein: 2,
        carbs: 8,
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
        emoji: "🥣",
        title: "High-Protein Oats & Greek Yogurt Bowl",
        calories: 450,
        protein: 26,
        carbs: 58,
        fat: 10,
        prepTime: "10 min",
        isVeg: true,
        dietType: "Vegetarian",
        ingredients: [
          { name: "Rolled oats", amount: "60g" },
          { name: "Greek yogurt", amount: "150g" },
          { name: "Mixed berries", amount: "50g" },
          { name: "Almonds / Walnuts", amount: "15g" }
        ],
        steps: ["Cook oats in water or milk.", "Top with chilled Greek yogurt, fresh berries, and crushed nuts."]
      },
      {
        id: "cm-3",
        slotName: "Balanced Lunch",
        time: "01:00 PM",
        emoji: "🥗",
        title: "Spiced Chickpea & Quinoa Super Bowl",
        calories: 580,
        protein: 24,
        carbs: 76,
        fat: 14,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegan",
        ingredients: [
          { name: "Cooked chickpeas", amount: "150g" },
          { name: "Cooked quinoa", amount: "100g" },
          { name: "Cucumber & tomato", amount: "1 cup" },
          { name: "Olive oil & lemon dressing", amount: "1 tbsp" }
        ],
        steps: ["Toss chickpeas, quinoa, and vegetables together.", "Drizzle with olive oil, lemon juice, salt, and cumin."]
      },
      {
        id: "cm-4",
        slotName: "Evening Snack",
        time: "05:00 PM",
        emoji: "🥑",
        title: "Roasted Makhana & Green Tea",
        calories: 180,
        protein: 6,
        carbs: 24,
        fat: 4,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegan",
        ingredients: [
          { name: "Fox nuts (Makhana)", amount: "35g" },
          { name: "Olive oil / Ghee", amount: "1 tsp" },
          { name: "Green tea", amount: "1 cup" }
        ],
        steps: ["Dry roast makhana in 1 tsp olive oil or ghee with turmeric and rock salt.", "Serve warm with green tea."]
      },
      {
        id: "cm-5",
        slotName: "Light Dinner",
        time: "08:00 PM",
        emoji: "🍲",
        title: "Paneer / Tofu Stir-Fry with Steamed Veggies",
        calories: 520,
        protein: 28,
        carbs: 35,
        fat: 22,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        ingredients: [
          { name: "Fresh Paneer or Firm Tofu", amount: "150g" },
          { name: "Broccoli, bell peppers, carrots", amount: "1.5 cups" },
          { name: "Soy sauce / Ginger garlic paste", amount: "1 tbsp" }
        ],
        steps: ["Saute cubed paneer/tofu in a pan until golden.", "Add mixed veggies, season lightly, and cook for 5-7 minutes."]
      }
    ]
  });

  const totalSteps = 5;

  const handleAllergyToggle = (item) => {
    setAnswers((prev) => {
      const exists = prev.allergies.includes(item);
      return {
        ...prev,
        allergies: exists
          ? prev.allergies.filter((a) => a !== item)
          : [...prev.allergies, item]
      };
    });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      generatePlan();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const generatePlan = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let matched = ROUTINES_DATA[0];
      if (answers.goal === "Muscle gain") {
        matched = ROUTINES_DATA.find((r) => r.id === "muscle-gain") || ROUTINES_DATA[1];
      } else if (answers.goal === "Weight management") {
        matched = ROUTINES_DATA.find((r) => r.id === "weight-management") || ROUTINES_DATA[0];
      } else if (answers.goal === "Fitness & Stamina") {
        matched = ROUTINES_DATA.find((r) => r.id === "gym-beginner") || ROUTINES_DATA[1];
      } else if (answers.diet === "Vegetarian" || answers.diet === "Vegan") {
        matched = ROUTINES_DATA.find((r) => r.id === "diabetes-friendly") || ROUTINES_DATA[0];
      }

      const customPlan = {
        ...matched,
        id: `custom-${Date.now()}`,
        customId: `custom-plan-${Date.now()}`,
        generatedAt: new Date().toLocaleDateString(),
        userAnswers: answers,
        isCustom: true,
        title: `Personalized ${answers.goal} Routine (${answers.diet})`,
        subtitle: `Custom calibrated for ${answers.activity.toLowerCase()} daily activity, ${answers.mealsPerDay} meals/day with ${answers.budget.toLowerCase()} ingredients.`
      };

      setGeneratedRoutine(customPlan);
      setIsGenerating(false);

      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }, 1200);
  };

  // Manual Custom Meal Handlers
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

    onPlanGenerated(completedCustomPlan);
    if (onShowToast) {
      onShowToast("🎉 Your custom created routine has been activated in My Plan!");
    }

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleSaveAndApply = () => {
    if (generatedRoutine) {
      onPlanGenerated(generatedRoutine);
      if (onShowToast) {
        onShowToast("🎉 Your personalized plan has been saved to My Plan!");
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "840px" }}>
        <div style={{ padding: "1.75rem" }}>
          {/* Top Mode Switcher Header */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF"
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                  {mode === "guided" ? "AI Guided Plan Wizard" : "Create Your Own Custom Plan"}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                  {mode === "guided"
                    ? "5-step personalized wellness questionnaire"
                    : "Build and calibrate your daily routine meal by meal"}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Mode Toggle Pills */}
              {!generatedRoutine && !isGenerating && (
                <div style={{ display: "flex", background: "var(--bg-card-subtle)", padding: "0.2rem", borderRadius: "var(--radius-full)", border: "1px solid var(--border-subtle)" }}>
                  <button
                    type="button"
                    onClick={() => setMode("guided")}
                    style={{
                      border: "none",
                      background: mode === "guided" ? "#FFFFFF" : "transparent",
                      color: mode === "guided" ? "var(--primary-800)" : "var(--text-muted)",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      cursor: "pointer",
                      boxShadow: mode === "guided" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                    }}
                  >
                    🪄 AI Wizard
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("custom")}
                    style={{
                      border: "none",
                      background: mode === "custom" ? "#FFFFFF" : "transparent",
                      color: mode === "custom" ? "var(--primary-800)" : "var(--text-muted)",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      cursor: "pointer",
                      boxShadow: mode === "custom" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                    }}
                  >
                    ✍️ Build Custom
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
              >
                ✕
              </button>
            </div>
          </div>

          {/* ============================================================
             MODE 1: GUIDED AI WIZARD
          ============================================================ */}
          {mode === "guided" && (
            <>
              {!generatedRoutine && !isGenerating && (
                <>
                  {/* Progress Bar */}
                  <div className="wizard-progress-bar">
                    <div className="wizard-progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      marginBottom: "1rem"
                    }}
                  >
                    <span>STEP {step} OF {totalSteps}</span>
                    <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
                  </div>
                </>
              )}

              {/* Loading Animation */}
              {isGenerating && (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      border: "4px solid #D1FAE5",
                      borderTopColor: "#10B981",
                      borderRadius: "50%",
                      margin: "0 auto 1.5rem",
                      animation: "spin 1s linear infinite"
                    }}
                  />
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.5rem" }}>
                    Analyzing Your Nutritional Blueprint...
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    Calculating macro ratios, optimal meal timings, and whole-food recipes for {answers.goal}.
                  </p>
                </div>
              )}

              {/* Step 1: Goal */}
              {!isGenerating && !generatedRoutine && step === 1 && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                    What is your primary wellness goal?
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                    We'll calibrate your calorie target and nutrient distribution accordingly.
                  </p>

                  <div className="wizard-options-grid">
                    {[
                      { title: "Healthy lifestyle", desc: "Balanced energy, gut health & longevity", icon: "🌱" },
                      { title: "Weight management", desc: "Fat loss & high satiety whole foods", icon: "🔥" },
                      { title: "Muscle gain", desc: "High protein mass & progressive strength", icon: "💪" },
                      { title: "Fitness & Stamina", desc: "Pre/post workout conditioning fuel", icon: "⚡" },
                      { title: "General wellness", desc: "Immunity, stress balance & clean digestion", icon: "🧘" }
                    ].map((item) => (
                      <div
                        key={item.title}
                        className={`wizard-option-card ${answers.goal === item.title ? "selected" : ""}`}
                        onClick={() => setAnswers({ ...answers, goal: item.title })}
                      >
                        <span className="wizard-option-icon">{item.icon}</span>
                        <div>
                          <div className="wizard-option-title">{item.title}</div>
                          <div className="wizard-option-desc">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Food Preference */}
              {!isGenerating && !generatedRoutine && step === 2 && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                    What is your dietary preference?
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                    All ingredients will strictly align with your dietary principles.
                  </p>

                  <div className="wizard-options-grid">
                    {[
                      { title: "Vegetarian", desc: "Plant-forward with dairy and legumes", icon: "🥗" },
                      { title: "Non-vegetarian", desc: "Includes lean poultry, fish and eggs", icon: "🍗" },
                      { title: "Vegan", desc: "100% plant-based, zero animal products", icon: "🥑" },
                      { title: "Eggetarian", desc: "Vegetarian plus eggs for protein", icon: "🍳" }
                    ].map((item) => (
                      <div
                        key={item.title}
                        className={`wizard-option-card ${answers.diet === item.title ? "selected" : ""}`}
                        onClick={() => setAnswers({ ...answers, diet: item.title })}
                      >
                        <span className="wizard-option-icon">{item.icon}</span>
                        <div>
                          <div className="wizard-option-title">{item.title}</div>
                          <div className="wizard-option-desc">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Activity Level */}
              {!isGenerating && !generatedRoutine && step === 3 && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                    What is your current physical activity level?
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                    Determines daily carbohydrate and recovery requirements.
                  </p>

                  <div className="wizard-options-grid">
                    {[
                      { title: "Low", desc: "Desk job, under 5,000 steps, light walking", icon: "🛋️" },
                      { title: "Moderate", desc: "3-4 workout sessions per week or active daily routine", icon: "🚶" },
                      { title: "High", desc: "5+ intense training sessions or heavy manual activity", icon: "🏃" }
                    ].map((item) => (
                      <div
                        key={item.title}
                        className={`wizard-option-card ${answers.activity === item.title ? "selected" : ""}`}
                        onClick={() => setAnswers({ ...answers, activity: item.title })}
                      >
                        <span className="wizard-option-icon">{item.icon}</span>
                        <div>
                          <div className="wizard-option-title">{item.title} Activity</div>
                          <div className="wizard-option-desc">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Meals Per Day */}
              {!isGenerating && !generatedRoutine && step === 4 && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                    How many meals do you prefer per day?
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                    We'll divide your daily timeline into smooth, digestible portions.
                  </p>

                  <div className="wizard-options-grid">
                    {[
                      { title: 3, label: "3 Meals", desc: "Classic Breakfast, Lunch, Dinner", icon: "🍽️" },
                      { title: 4, label: "4 Meals", desc: "Breakfast, Lunch, Evening Snack, Dinner", icon: "🥣" },
                      { title: 5, label: "5 Meals", desc: "Hydration, Breakfast, Lunch, Snack, Dinner", icon: "🍱" }
                    ].map((item) => (
                      <div
                        key={item.title}
                        className={`wizard-option-card ${answers.mealsPerDay === item.title ? "selected" : ""}`}
                        onClick={() => setAnswers({ ...answers, mealsPerDay: item.title })}
                      >
                        <span className="wizard-option-icon">{item.icon}</span>
                        <div>
                          <div className="wizard-option-title">{item.label}</div>
                          <div className="wizard-option-desc">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Preferences */}
              {!isGenerating && !generatedRoutine && step === 5 && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                    Lifestyle & Dietary Preferences
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                    Fine-tune prep time, budget, and dietary sensitivities.
                  </p>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                      ⏱️ Preferred Cooking Time
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {["Under 15 min", "15-30 min", "Flexible"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`btn btn-sm ${answers.prepTime === time ? "btn-primary" : "btn-secondary"}`}
                          onClick={() => setAnswers({ ...answers, prepTime: time })}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                      💰 Grocery Budget
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {["Pocket-friendly", "Moderate", "Organic / Premium"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          className={`btn btn-sm ${answers.budget === b ? "btn-primary" : "btn-secondary"}`}
                          onClick={() => setAnswers({ ...answers, budget: b })}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                      🛡️ Allergies & Sensitivities (Optional)
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {["Gluten-Free", "Dairy-Free", "Nut-Free", "Low-Sodium", "Sugar-Free"].map((item) => {
                        const isSelected = answers.allergies.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            className={`badge ${isSelected ? "badge-green" : "badge-blue"}`}
                            style={{ padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.82rem" }}
                            onClick={() => handleAllergyToggle(item)}
                          >
                            {isSelected ? "✓ " : "+ "} {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Success Screen */}
              {!isGenerating && generatedRoutine && (
                <div className="animate-fade-in">
                  <div className="generated-plan-hero">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                      <Award size={22} style={{ color: "#FBBF24" }} />
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6EE7B7" }}>
                        Routine Generated Successfully
                      </span>
                    </div>
                    <h2 style={{ fontSize: "1.7rem", fontWeight: 800, marginBottom: "0.4rem" }}>
                      {generatedRoutine.title}
                    </h2>
                    <p style={{ fontSize: "0.92rem", color: "#E2E8F0", maxWidth: "600px", marginBottom: "1.25rem" }}>
                      {generatedRoutine.subtitle}
                    </p>

                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <div style={{ background: "rgba(255,255,255,0.15)", padding: "0.5rem 0.9rem", borderRadius: "var(--radius-md)" }}>
                        🔥 <strong>{generatedRoutine.calories}</strong> kcal/day
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.15)", padding: "0.5rem 0.9rem", borderRadius: "var(--radius-md)" }}>
                        🍗 <strong>{generatedRoutine.protein}g</strong> Protein
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.15)", padding: "0.5rem 0.9rem", borderRadius: "var(--radius-md)" }}>
                        🌾 <strong>{generatedRoutine.carbs}g</strong> Carbs
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
                    <button className="btn btn-accent btn-lg" style={{ flex: 1 }} onClick={handleSaveAndApply}>
                      <Calendar size={18} />
                      <span>Set as Active My Plan</span>
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={onClose}>
                      <span>Close</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Guided Step Navigation */}
              {!isGenerating && !generatedRoutine && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "2rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid var(--border-subtle)"
                  }}
                >
                  {step > 1 ? (
                    <button className="btn btn-secondary btn-sm" onClick={handleBack}>
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button className="btn btn-primary" onClick={handleNext}>
                    <span>{step === totalSteps ? "Generate My Routine" : "Next Step"}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}

          {/* ============================================================
             MODE 2: BUILD YOUR OWN CUSTOM PLAN (MANUAL CREATOR)
          ============================================================ */}
          {mode === "custom" && (
            <form onSubmit={handleSaveCustomPlan} className="animate-fade-in">
              <div
                style={{
                  background: "#F8FAF9",
                  padding: "1.25rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)",
                  marginBottom: "1.5rem"
                }}
              >
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.85rem" }}>
                  Routine Overview & Goals
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, display: "block", marginBottom: "0.3rem" }}>
                      Routine Name / Title *
                    </label>
                    <input
                      type="text"
                      value={customForm.title}
                      onChange={(e) => setCustomForm({ ...customForm, title: e.target.value })}
                      placeholder="e.g. My High-Protein Power Routine"
                      style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.88rem" }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, display: "block", marginBottom: "0.3rem" }}>
                      Category / Focus
                    </label>
                    <select
                      value={customForm.category}
                      onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })}
                      style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.88rem" }}
                    >
                      <option value="Personalized Custom">Personalized Custom</option>
                      <option value="Health & Wellness">Health & Wellness</option>
                      <option value="Fitness & Hypertrophy">Fitness & Hypertrophy</option>
                      <option value="Weight Management">Weight Management</option>
                      <option value="Clean Vegetarian">Clean Vegetarian</option>
                      <option value="Student Fast & Budget">Student Fast & Budget</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, display: "block", marginBottom: "0.3rem" }}>
                    Description & Objectives
                  </label>
                  <textarea
                    rows={2}
                    value={customForm.description}
                    onChange={(e) => setCustomForm({ ...customForm, description: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.85rem", resize: "vertical" }}
                  />
                </div>
              </div>

              {/* Meal Slots Builder */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                    Daily Meal Slots ({customForm.meals.length})
                  </h4>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleAddMeal}
                    style={{ background: "#ECFDF5", color: "#047857", border: "1px solid #A7F3D0" }}
                  >
                    <Plus size={14} />
                    <span>Add Meal Slot</span>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {customForm.meals.map((meal, index) => (
                    <div
                      key={meal.id || index}
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-lg)",
                        padding: "1rem",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontSize: "1.2rem" }}>{meal.emoji}</span>
                          <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--primary-900)" }}>
                            Slot #{index + 1}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMeal(index)}
                          style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "0.2rem" }}
                          title="Remove this meal slot"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem", marginBottom: "0.75rem" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block" }}>
                            Slot Name
                          </label>
                          <input
                            type="text"
                            value={meal.slotName}
                            onChange={(e) => handleUpdateMeal(index, "slotName", e.target.value)}
                            placeholder="e.g. Breakfast"
                            style={{ width: "100%", padding: "0.45rem 0.65rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block" }}>
                            Time
                          </label>
                          <input
                            type="text"
                            value={meal.time}
                            onChange={(e) => handleUpdateMeal(index, "time", e.target.value)}
                            placeholder="08:30 AM"
                            style={{ width: "100%", padding: "0.45rem 0.65rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", display: "block" }}>
                            Dish Name / Recipe *
                          </label>
                          <input
                            type="text"
                            value={meal.title}
                            onChange={(e) => handleUpdateMeal(index, "title", e.target.value)}
                            placeholder="Dish title"
                            style={{ width: "100%", padding: "0.45rem 0.65rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}
                            required
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.6rem" }}>
                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Calories (kcal)</label>
                          <input
                            type="number"
                            value={meal.calories}
                            onChange={(e) => handleUpdateMeal(index, "calories", Number(e.target.value))}
                            style={{ width: "100%", padding: "0.4rem 0.6rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Protein (g)</label>
                          <input
                            type="number"
                            value={meal.protein}
                            onChange={(e) => handleUpdateMeal(index, "protein", Number(e.target.value))}
                            style={{ width: "100%", padding: "0.4rem 0.6rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Carbs (g)</label>
                          <input
                            type="number"
                            value={meal.carbs}
                            onChange={(e) => handleUpdateMeal(index, "carbs", Number(e.target.value))}
                            style={{ width: "100%", padding: "0.4rem 0.6rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Prep Time</label>
                          <input
                            type="text"
                            value={meal.prepTime}
                            onChange={(e) => handleUpdateMeal(index, "prepTime", e.target.value)}
                            placeholder="10 min"
                            style={{ width: "100%", padding: "0.4rem 0.6rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "0.82rem" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary Strip */}
              <div
                style={{
                  background: "linear-gradient(135deg, #0F382A, #14532D)",
                  color: "#FFFFFF",
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "1.5rem"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#6EE7B7", textTransform: "uppercase", fontWeight: 700 }}>Total Daily Energy</span>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800 }}>
                    🔥 {customForm.meals.reduce((sum, m) => sum + Number(m.calories || 0), 0)} kcal • 🍗 {customForm.meals.reduce((sum, m) => sum + Number(m.protein || 0), 0)}g Protein
                  </div>
                </div>

                <div style={{ fontSize: "0.82rem", color: "#E2E8F0" }}>
                  {customForm.meals.length} Scheduled Daily Meals
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>Save & Activate Custom Plan</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
