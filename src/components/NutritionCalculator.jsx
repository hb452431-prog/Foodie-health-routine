import React, { useState } from "react";
import { Calculator, Flame, Droplet, Sparkles, ArrowRight, Activity, Scale, Dumbbell } from "lucide-react";

export default function NutritionCalculator({ onOpenPlanWizard, onSelectRoutine }) {
  const [weightKg, setWeightKg] = useState(68);
  const [goal, setGoal] = useState("fat-loss"); // 'fat-loss' | 'muscle-gain' | 'maintenance' | 'diabetes'
  const [activity, setActivity] = useState("moderate"); // 'sedentary' | 'light' | 'moderate' | 'heavy'
  const [dietType, setDietType] = useState("vegetarian");

  // Dynamic Macro Calculation
  const calculateTargets = () => {
    let baseCalories = weightKg * 22; // rough BMR estimate
    
    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      heavy: 1.725
    };
    let tdee = Math.round(baseCalories * (activityMultipliers[activity] || 1.4));

    // Goal adjustment
    let targetCalories = tdee;
    if (goal === "fat-loss") targetCalories = Math.round(tdee - 400);
    else if (goal === "muscle-gain") targetCalories = Math.round(tdee + 350);
    else if (goal === "diabetes") targetCalories = Math.round(tdee - 200);

    // Macro splits
    let proteinGrams = Math.round(weightKg * (goal === "muscle-gain" ? 2.0 : 1.6));
    let fatGrams = Math.round((targetCalories * 0.25) / 9);
    let carbGrams = Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4);

    // Water intake in glasses (250ml each)
    let waterGlasses = Math.max(6, Math.min(14, Math.round((weightKg * 35) / 250)));

    return {
      calories: Math.max(1200, targetCalories),
      protein: Math.max(50, proteinGrams),
      carbs: Math.max(80, carbGrams),
      fat: Math.max(30, fatGrams),
      waterGlasses
    };
  };

  const results = calculateTargets();

  return (
    <div className="calculator-widget-container">
      <div className="calculator-header">
        <div className="calculator-badge">
          <Calculator size={16} />
          <span>Interactive Health Lab</span>
        </div>
        <h3 className="calculator-title">Instant Daily Macro & Hydration Estimator</h3>
        <p className="calculator-subtitle">
          Adjust your parameters to instantly preview your scientifically recommended calorie, macronutrient, and hydration targets.
        </p>
      </div>

      <div className="calculator-grid">
        {/* Controls Column */}
        <div className="calculator-controls">
          {/* Weight Slider */}
          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="calc-weight-slider">
                <Scale size={15} />
                <span>Body Weight</span>
              </label>
              <span className="calc-value-display">{weightKg} kg ({Math.round(weightKg * 2.204)} lbs)</span>
            </div>
            <input
              id="calc-weight-slider"
              type="range"
              min="40"
              max="140"
              step="1"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="calc-range-slider"
              aria-label="Adjust Body Weight in Kilograms"
            />
            <div className="calc-range-ticks">
              <span>40 kg</span>
              <span>90 kg</span>
              <span>140 kg</span>
            </div>
          </div>

          {/* Goal Selector */}
          <div className="calc-input-group">
            <label className="calc-group-title">Primary Health Goal</label>
            <div className="calc-chips-grid">
              {[
                { id: "fat-loss", label: "🔥 Fat Loss", desc: "Calorie deficit + high satiety" },
                { id: "muscle-gain", label: "💪 Muscle Gain", desc: "Protein surplus + hypertrophy" },
                { id: "maintenance", label: "⚡ Vitality & Energy", desc: "Iso-caloric metabolic balance" },
                { id: "diabetes", label: "🩺 Glucose Control", desc: "Low-GI + steady insulin" }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`calc-chip-btn ${goal === g.id ? "active" : ""}`}
                  onClick={() => setGoal(g.id)}
                >
                  <span className="calc-chip-label">{g.label}</span>
                  <span className="calc-chip-desc">{g.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Level */}
          <div className="calc-input-group">
            <label className="calc-group-title">Daily Activity Level</label>
            <div className="calc-chips-row">
              {[
                { id: "sedentary", label: "Desk Job (Low)" },
                { id: "light", label: "Light (1-2 days/wk)" },
                { id: "moderate", label: "Moderate (3-5 days/wk)" },
                { id: "heavy", label: "Intense (6+ days/wk)" }
              ].map((act) => (
                <button
                  key={act.id}
                  type="button"
                  className={`calc-pill-btn ${activity === act.id ? "active" : ""}`}
                  onClick={() => setActivity(act.id)}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Results Card Column */}
        <div className="calculator-results-card">
          <div className="results-card-glow"></div>
          
          <div className="results-header">
            <span className="results-tag">Your Daily Target</span>
            <div className="results-calories-main">
              <span className="results-cal-num">{results.calories.toLocaleString()}</span>
              <span className="results-cal-unit">kcal / day</span>
            </div>
          </div>

          {/* Macronutrient Bars */}
          <div className="results-macros-grid">
            <div className="macro-card-item protein">
              <span className="macro-card-title">Protein</span>
              <span className="macro-card-val">{results.protein}g</span>
              <span className="macro-card-pct">{Math.round((results.protein * 4 / results.calories) * 100)}% calories</span>
              <div className="macro-card-bar">
                <div
                  className="macro-bar-fill protein-fill"
                  style={{ width: `${Math.min(100, Math.round((results.protein * 4 / results.calories) * 100))}%` }}
                ></div>
              </div>
            </div>

            <div className="macro-card-item carbs">
              <span className="macro-card-title">Carbs</span>
              <span className="macro-card-val">{results.carbs}g</span>
              <span className="macro-card-pct">{Math.round((results.carbs * 4 / results.calories) * 100)}% calories</span>
              <div className="macro-card-bar">
                <div
                  className="macro-bar-fill carbs-fill"
                  style={{ width: `${Math.min(100, Math.round((results.carbs * 4 / results.calories) * 100))}%` }}
                ></div>
              </div>
            </div>

            <div className="macro-card-item fats">
              <span className="macro-card-title">Fats</span>
              <span className="macro-card-val">{results.fat}g</span>
              <span className="macro-card-pct">{Math.round((results.fat * 9 / results.calories) * 100)}% calories</span>
              <div className="macro-card-bar">
                <div
                  className="macro-bar-fill fats-fill"
                  style={{ width: `${Math.min(100, Math.round((results.fat * 9 / results.calories) * 100))}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Water Intake Recommendation */}
          <div className="results-water-box">
            <div className="results-water-icon">
              <Droplet size={18} />
            </div>
            <div>
              <div className="results-water-title">Hydration Target</div>
              <div className="results-water-subtitle">
                <strong>{results.waterGlasses} glasses</strong> ({results.waterGlasses * 250} ml) pure water daily
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            className="btn btn-accent btn-lg"
            style={{ width: "100%", marginTop: "1rem" }}
            onClick={onOpenPlanWizard}
          >
            <Sparkles size={18} />
            <span>Generate Routine with this Target</span>
          </button>
        </div>
      </div>
    </div>
  );
}
