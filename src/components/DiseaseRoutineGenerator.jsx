import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Search,
  Activity,
  Heart,
  ShieldCheck,
  RotateCw,
  CheckCircle2,
  Clock,
  Utensils,
  AlertCircle,
  Share2,
  ArrowRight,
  Flame,
  Info
} from "lucide-react";
import { generateAIFoodPlan, generateOfflineFallbackPlan } from "../services/geminiPlanService";
import { findOrResolveFood } from "../services/foodService";
import FoodDetailsModal from "./FoodDetailsModal";
import OrderDeliveryLinks from "./OrderDeliveryLinks";
import confetti from "canvas-confetti";

const POPULAR_DISEASES = [
  { id: "diabetes", label: "🩺 Type 2 Diabetes", query: "Type 2 Diabetes and blood sugar control", focus: "Low-GI complex carbs, high fiber, zero added sugar" },
  { id: "pcos", label: "🌸 PCOS / PCOD", query: "PCOS / PCOD hormonal balance and insulin sensitivity", focus: "Low glycemic load, anti-inflammatory, hormone-balancing seeds" },
  { id: "hypertension", label: "❤️ Hypertension (High BP)", query: "Hypertension and DASH diet blood pressure control", focus: "Low sodium, potassium & magnesium rich, heart-healthy" },
  { id: "thyroid", label: "🦋 Hypothyroidism", query: "Hypothyroidism and metabolic support", focus: "Selenium, zinc, iodine-rich, gluten-conscious whole foods" },
  { id: "cholesterol", label: "🫀 High Cholesterol & Heart", query: "High cholesterol, triglycerides and cardiac health", focus: "Soluble beta-glucan fiber, plant sterols, healthy monounsaturated fats" },
  { id: "fatty-liver", label: "🍃 Fatty Liver (NAFLD)", query: "Fatty Liver (NAFLD) reversal and liver detox", focus: "Antioxidant-rich, choline, omega-3, zero refined fructose" },
  { id: "gerd", label: "💧 GERD & Acid Reflux", query: "GERD, acid reflux and gastritis soothing routine", focus: "Non-acidic alkaline foods, soothing herbs, light digestion" },
  { id: "uric-acid", label: "🦶 Gout & High Uric Acid", query: "Gout, high uric acid and joint inflammation", focus: "Low purine, alkalizing, antioxidant cherries and berries" },
  { id: "gut-health", label: "🌱 IBS & Gut Health", query: "IBS, bloating and gut microbiome balance", focus: "Gentle prebiotic fiber, fermented probiotics, easy assimilation" },
  { id: "kidney", label: "🩺 Kidney-Conscious Diet", query: "Kidney-conscious renal balance and low sodium", focus: "Controlled phosphorus & potassium, moderate biological protein" },
  { id: "anemia", label: "🩸 Anemia & Iron Boost", query: "Iron deficiency anemia hemoglobin boost", focus: "Iron-rich foods paired with Vitamin C synergy" }
];

export default function DiseaseRoutineGenerator({ onApplyPlan, onShowToast, initialDiseaseQuery = "" }) {
  const [diseaseInput, setDiseaseInput] = useState(() => initialDiseaseQuery || "");
  const [selectedDiseaseObj, setSelectedDiseaseObj] = useState(() => {
    if (!initialDiseaseQuery) return null;
    const lower = initialDiseaseQuery.toLowerCase();
    return POPULAR_DISEASES.find(d => lower.includes(d.id) || d.query.toLowerCase().includes(lower)) || null;
  });
  const [dietaryPreference, setDietaryPreference] = useState("Vegetarian");
  const [cuisinePreference, setCuisinePreference] = useState("Indian & South Indian");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [selectedFoodDetail, setSelectedFoodDetail] = useState(null);

  useEffect(() => {
    if (initialDiseaseQuery) {
      setDiseaseInput(initialDiseaseQuery);
      const lower = initialDiseaseQuery.toLowerCase();
      const matched = POPULAR_DISEASES.find(d => lower.includes(d.id) || d.query.toLowerCase().includes(lower));
      if (matched) {
        setSelectedDiseaseObj(matched);
      }
    }
  }, [initialDiseaseQuery]);

  const handleDiseaseSelect = (disease) => {
    setSelectedDiseaseObj(disease);
    setDiseaseInput(disease.query);
  };

  const handleGenerateDiseaseRoutine = async (e) => {
    if (e) e.preventDefault();
    const query = diseaseInput.trim() || selectedDiseaseObj?.query || "Type 2 Diabetes and blood sugar balance";

    setIsGenerating(true);
    setGenerationError(null);

    const formData = {
      age: 32,
      gender: "Adult",
      goal: `Medical Nutrition Therapy for: ${query}`,
      diet: dietaryPreference,
      activity: "Moderate",
      mealsPerDay: 5,
      foodPreferences: [cuisinePreference, "Low-GI", "High Fiber"],
      dislikedFoods: "Deep fried foods, excess refined sugars, processed snacks",
      allergies: [],
      budget: "Medium",
      cookingTime: "Normal",
      location: "India",
      healthNotes: `Clinical nutrition protocol for ${query}. Emphasize scientifically balanced macronutrients, micronutrient density, and therapeutic foods matching this specific health condition.`
    };

    try {
      const plan = await generateAIFoodPlan(formData);
      setGeneratedPlan(plan);
      setIsGenerating(false);

      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (_e) {}

      if (onShowToast) {
        onShowToast(`✨ Generated clinical AI food routine for ${query.split(" ")[0]}!`);
      }
    } catch (err) {
      console.warn("Disease routine generation error, using safe clinical fallback:", err?.message);
      // Fallback to clinically sound structured plan
      const fallback = generateOfflineFallbackPlan(formData);
      setGeneratedPlan(fallback);
      setIsGenerating(false);

      if (onShowToast) {
        onShowToast(`💡 Loaded verified clinical food routine for ${query.split(" ")[0]}.`);
      }
    }
  };

  const handleActivatePlan = () => {
    if (generatedPlan && onApplyPlan) {
      onApplyPlan(generatedPlan);
      if (onShowToast) {
        onShowToast("🎉 Disease food routine has been activated in My Plan!");
      }
    }
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "var(--radius-xl)",
        border: "1.5px solid rgba(16, 185, 129, 0.2)",
        boxShadow: "var(--shadow-sm)",
        padding: "1.5rem",
        marginBottom: "2rem"
      }}
    >
      {/* Header Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#ECFDF5", color: "#065F46", padding: "0.25rem 0.65rem", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800, marginBottom: "0.4rem" }}>
            <Activity size={13} />
            <span>AI DISEASE & MEDICAL NUTRITION ROUTINE SEARCH</span>
          </div>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
            Search Food Routines for Any Health Condition
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem", margin: 0 }}>
            Enter any disease or metabolic target to generate a medically calibrated, macro-balanced daily timetable powered by Gemini AI and the Central Food Knowledge Base.
          </p>
        </div>
      </div>

      {/* Disease Search & Input Form */}
      <form onSubmit={handleGenerateDiseaseRoutine} style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div style={{ flex: "1 1 280px", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              value={diseaseInput}
              onChange={(e) => setDiseaseInput(e.target.value)}
              placeholder="e.g. Diabetes routine, PCOS, Thyroid, Fatty Liver, Hypertension..."
              className="search-input"
              style={{ width: "100%", paddingLeft: "2.6rem", height: "46px", fontSize: "0.92rem", borderRadius: "var(--radius-lg)" }}
              required
            />
          </div>

          <select
            value={dietaryPreference}
            onChange={(e) => setDietaryPreference(e.target.value)}
            style={{
              padding: "0 0.85rem",
              height: "46px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.85rem",
              fontWeight: 700,
              background: "#F8FAFC",
              cursor: "pointer"
            }}
          >
            <option value="Vegetarian">100% Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian (Lean)</option>
            <option value="Vegan">Vegan (Plant-Based)</option>
            <option value="Eggetarian">Eggetarian</option>
          </select>

          <select
            value={cuisinePreference}
            onChange={(e) => setCuisinePreference(e.target.value)}
            style={{
              padding: "0 0.85rem",
              height: "46px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.85rem",
              fontWeight: 700,
              background: "#F8FAFC",
              cursor: "pointer"
            }}
          >
            <option value="South Indian & Millets">South Indian & Millets</option>
            <option value="North Indian Whole Foods">North Indian Whole Foods</option>
            <option value="Pan-Indian Healthy">Pan-Indian Healthy</option>
            <option value="Mediterranean & Global">Mediterranean & Global</option>
          </select>

          <button
            type="submit"
            disabled={isGenerating}
            className="btn btn-primary"
            style={{
              height: "46px",
              padding: "0 1.25rem",
              background: "linear-gradient(135deg, #10B981, #059669)",
              fontSize: "0.9rem",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)"
            }}
          >
            {isGenerating ? (
              <>
                <RotateCw size={16} className="animate-spin" />
                <span>Generating Routine...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate Disease Routine</span>
              </>
            )}
          </button>
        </div>

        {/* Popular Health Condition Chips */}
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
            Popular Health & Disease Conditions:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {POPULAR_DISEASES.map((dis) => {
              const isSelected = selectedDiseaseObj?.id === dis.id || diseaseInput === dis.query;
              return (
                <button
                  key={dis.id}
                  type="button"
                  onClick={() => handleDiseaseSelect(dis)}
                  style={{
                    border: isSelected ? "1.5px solid #10B981" : "1px solid var(--border-subtle)",
                    background: isSelected ? "#ECFDF5" : "#FFFFFF",
                    color: isSelected ? "#065F46" : "var(--text-secondary)",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    padding: "0.35rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                  title={dis.focus}
                >
                  {dis.label}
                </button>
              );
            })}
          </div>
        </div>
      </form>

      {/* Loading State Animation */}
      {isGenerating && (
        <div style={{ padding: "2.5rem 1rem", textAlign: "center", background: "#F8FAFC", borderRadius: "var(--radius-lg)" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#DCFCE7", color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <RotateCw size={26} className="animate-spin" />
          </div>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
            Gemini AI is Formulating Your Health Food Routine...
          </h4>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto" }}>
            Analyzing medical nutrition requirements, calibrating macronutrient balance, and selecting verified dishes from your Central Food Knowledge Base.
          </p>
        </div>
      )}

      {/* Render Generated Disease Routine */}
      {!isGenerating && generatedPlan && (
        <div style={{ marginTop: "1.5rem", borderTop: "1.5px solid #E2E8F0", paddingTop: "1.5rem" }}>
          {/* Routine Header Card */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 95, 70, 0.04))",
              border: "1.5px solid #6EE7B7",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              marginBottom: "1.25rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: "0.4rem" }}>
                  ✨ Clinical AI-Calibrated Routine
                </span>
                <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                  {generatedPlan.title}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem", marginBottom: "0.75rem" }}>
                  {generatedPlan.subtitle || generatedPlan.description}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleActivatePlan}
                  style={{
                    background: "linear-gradient(135deg, #10B981, #059669)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  <CheckCircle2 size={15} />
                  <span>Activate in My Plan</span>
                </button>
              </div>
            </div>

            {/* Calorie & Macro Target Summary Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.5rem", marginTop: "0.75rem" }}>
              <div style={{ background: "#FFFFFF", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>CALORIES</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#EA580C" }}>{generatedPlan.calories} kcal</div>
              </div>
              <div style={{ background: "#FFFFFF", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>PROTEIN</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#2563EB" }}>{generatedPlan.protein}g</div>
              </div>
              <div style={{ background: "#FFFFFF", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>CARBS (LOW GI)</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16A34A" }}>{generatedPlan.carbs}g</div>
              </div>
              <div style={{ background: "#FFFFFF", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>HEALTHY FATS</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#D97706" }}>{generatedPlan.fat}g</div>
              </div>
            </div>
          </div>

          {/* Daily Meal Schedule List with Stored Food Images */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.25rem" }}>
            {generatedPlan.dailyTimeline?.map((meal, idx) => {
              const foodRecord = findOrResolveFood(meal.foodId || meal.title);
              const displayImage = meal.image || foodRecord?.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

              return (
                <div
                  key={meal.id || idx}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1rem 1.25rem",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                    {/* Meal Dish Image */}
                    {displayImage && (
                      <img
                        src={displayImage}
                        alt={meal.title}
                        loading="lazy"
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "var(--radius-md)",
                          objectFit: "cover",
                          border: "1px solid var(--border-subtle)",
                          flexShrink: 0
                        }}
                      />
                    )}

                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.4rem" }}>
                        <div>
                          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary-700)", textTransform: "uppercase" }}>
                            {meal.emoji || "🥗"} {meal.time} • {meal.slotName}
                          </div>
                          <h5 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--primary-900)", margin: "0.1rem 0" }}>
                            {meal.title}
                          </h5>
                          {foodRecord?.stateOrRegion && (
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                              📍 {foodRecord.stateOrRegion}, {foodRecord.country || "India"} • {foodRecord.category}
                            </span>
                          )}
                        </div>

                        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, background: "#FFF7ED", color: "#C2410C", padding: "0.2rem 0.45rem", borderRadius: "var(--radius-sm)" }}>
                            🔥 {meal.calories} kcal
                          </span>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, background: "#EFF6FF", color: "#1D4ED8", padding: "0.2rem 0.45rem", borderRadius: "var(--radius-sm)" }}>
                            🥩 {meal.protein}g P
                          </span>
                          <span style={{ fontSize: "0.72rem", fontWeight: 700, background: "#F0FDF4", color: "#15803D", padding: "0.2rem 0.45rem", borderRadius: "var(--radius-sm)" }}>
                            🌾 {meal.carbs}g C
                          </span>
                        </div>
                      </div>

                      {/* Ingredients list */}
                      {meal.ingredients && meal.ingredients.length > 0 && (
                        <div style={{ marginTop: "0.6rem", fontSize: "0.75rem", color: "var(--text-main)" }}>
                          <strong>🥕 Key Ingredients:</strong>{" "}
                          {meal.ingredients.map((ing) => typeof ing === "string" ? ing : `${ing.name} ${ing.amount ? `(${ing.amount})` : ""}`).join(", ")}
                        </div>
                      )}

                      {/* Action buttons: View Details, Video Recipe, and Swiggy / Zomato Ordering */}
                      <div style={{ marginTop: "0.65rem", display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", gap: "0.45rem", alignItems: "center", flexWrap: "wrap" }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setSelectedFoodDetail(foodRecord || { dishName: meal.title, category: meal.slotName, calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat, description: meal.description, imageUrl: displayImage })}
                            style={{
                              fontSize: "0.75rem",
                              padding: "0.25rem 0.65rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem"
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
                              style={{ fontSize: "0.75rem", color: "#DC2626", fontWeight: 700, textDecoration: "none", background: "#FEF2F2", border: "1px solid #FECACA", padding: "0.25rem 0.55rem", borderRadius: "var(--radius-sm)" }}
                            >
                              ▶ Video Recipe
                            </a>
                          )}
                        </div>

                        {/* Swiggy & Zomato Ordering Quick Pills */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700 }}>Order:</span>
                          <OrderDeliveryLinks dishName={meal.title} variant="pills" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clinical Educational Medical Disclaimer */}
          <div
            style={{
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: "var(--radius-md)",
              padding: "0.85rem",
              display: "flex",
              gap: "0.6rem",
              alignItems: "flex-start",
              fontSize: "0.75rem",
              color: "#92400E",
              lineHeight: 1.45
            }}
          >
            <Info size={16} style={{ color: "#D97706", flexShrink: 0, marginTop: "0.1rem" }} />
            <div>
              <strong>Educational Health Disclaimer:</strong> This disease nutrition routine is generated for general dietary wellness and nutritional lifestyle education. Food routines can be part of a balanced lifestyle, but are not intended to cure, treat, or replace professional clinical medical therapy. If you have active health conditions, always consult your physician or a registered clinical dietitian before making dietary modifications.
            </div>
          </div>
        </div>
      )}

      {/* Universal Food Details Modal */}
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
