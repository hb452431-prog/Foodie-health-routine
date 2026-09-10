import React, { useState } from "react";
import confetti from "canvas-confetti";
import { ROUTINES_DATA } from "../data/routinesData";
import { Sparkles, ArrowRight, ArrowLeft, Check, Flame, ShieldAlert, Heart, Calendar, Utensils, Award } from "lucide-react";

export default function PlanBuilder({
  onPlanGenerated,
  onClose,
  onShowToast
}) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState(null);

  // Form State
  const [answers, setAnswers] = useState({
    goal: "Healthy lifestyle",
    diet: "Vegetarian",
    activity: "Moderate",
    mealsPerDay: 5,
    budget: "Moderate",
    prepTime: "Under 20 min",
    allergies: []
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

    // Simulate AI / Algorithm custom routine generation
    setTimeout(() => {
      // Find closest matching routine or synthesize
      let matched = ROUTINES_DATA[0];
      if (answers.goal === "Muscle gain") {
        matched = ROUTINES_DATA.find((r) => r.id === "muscle-gain") || ROUTINES_DATA[1];
      } else if (answers.goal === "Weight management") {
        matched = ROUTINES_DATA.find((r) => r.id === "weight-management") || ROUTINES_DATA[0];
      } else if (answers.goal === "Fitness") {
        matched = ROUTINES_DATA.find((r) => r.id === "gym-beginner") || ROUTINES_DATA[1];
      } else if (answers.diet === "Vegetarian" || answers.diet === "Vegan") {
        matched = ROUTINES_DATA.find((r) => r.id === "diabetes-friendly") || ROUTINES_DATA[0];
      }

      const customPlan = {
        ...matched,
        customId: `custom-plan-${Date.now()}`,
        generatedAt: new Date().toLocaleDateString(),
        userAnswers: answers,
        isCustom: true,
        title: `Personalized ${answers.goal} Routine (${answers.diet})`,
        subtitle: `Custom calibrated for ${answers.activity.toLowerCase()} daily activity, ${answers.mealsPerDay} meals/day with ${answers.budget.toLowerCase()} ingredients.`
      };

      setGeneratedRoutine(customPlan);
      setIsGenerating(false);

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }, 1600);
  };

  const handleSaveAndApply = () => {
    if (generatedRoutine) {
      onPlanGenerated(generatedRoutine);
      onShowToast("🎉 Your personalized plan has been saved to My Plan!");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px" }}>
        <div style={{ padding: "1.75rem" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
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
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)" }}>
                  Create My Routine
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  5-step personalized wellness questionnaire
                </p>
              </div>
            </div>

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

          {!generatedRoutine && !isGenerating && (
            <>
              {/* Progress Bar */}
              <div className="wizard-progress-bar">
                <div
                  className="wizard-progress-fill"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "1rem" }}>
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

          {/* Step 1: Choose Your Goal */}
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

          {/* Step 5: Preferences & Allergies */}
          {!isGenerating && !generatedRoutine && step === 5 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                Lifestyle & Dietary Preferences
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                Fine-tune prep time, budget, and dietary sensitivities.
              </p>

              {/* Cooking Time Preference */}
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

              {/* Budget Preference */}
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

              {/* Allergies / Sensitivities */}
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

          {/* Success Screen (Plan Ready) */}
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

              {/* Medical Notice */}
              <div
                style={{
                  background: "#FEF3C7",
                  border: "1px solid #FDE68A",
                  borderRadius: "var(--radius-md)",
                  padding: "0.85rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  fontSize: "0.8rem",
                  color: "#92400E",
                  marginBottom: "1.5rem"
                }}
              >
                <ShieldAlert size={18} style={{ flexShrink: 0, color: "#D97706" }} />
                <div>
                  <strong>Important: </strong> For general educational guidance only. Consult a qualified healthcare professional or certified dietitian for personalized medical nutrition advice.
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  className="btn btn-accent btn-lg"
                  style={{ flex: 1 }}
                  onClick={handleSaveAndApply}
                >
                  <Calendar size={18} />
                  <span>Set as Active My Plan</span>
                </button>

                <button
                  className="btn btn-secondary btn-lg"
                  onClick={onClose}
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
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
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleBack}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                className="btn btn-primary"
                onClick={handleNext}
              >
                <span>{step === totalSteps ? "Generate My Routine" : "Next Step"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
