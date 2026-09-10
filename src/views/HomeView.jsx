import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import RoutineCard from "../components/RoutineCard";
import { ROUTINES_DATA } from "../data/routinesData";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Flame, Zap, Award } from "lucide-react";

export default function HomeView({
  onSearchSubmit,
  onOpenPlanWizard,
  onExploreClick,
  onSelectCategory,
  onSelectRoutine,
  onOpenShare,
  savedRoutines,
  onToggleSaveRoutine
}) {
  const featuredRoutines = ROUTINES_DATA.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        onSearchSubmit={onSearchSubmit}
        onOpenPlanWizard={onOpenPlanWizard}
        onExploreClick={onExploreClick}
        onSelectRoutine={onSelectRoutine}
      />

      {/* Quick Category Section */}
      <CategorySection onSelectCategory={onSelectCategory} />

      {/* Featured Routines Grid */}
      <section style={{ padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div className="badge badge-green" style={{ marginBottom: "0.5rem" }}>
              ✨ Daily Nutrition Blueprints
            </div>
            <h2 className="section-title">Featured Food Routines</h2>
            <p className="section-subtitle">
              Scientifically engineered daily schedules for glucose management, athletic hypertrophy, fat loss, and busy schedules.
            </p>
          </div>

          <div className="routines-grid">
            {featuredRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onSelectRoutine={onSelectRoutine}
                isSaved={savedRoutines.includes(routine.id)}
                onToggleSave={onToggleSaveRoutine}
                onOpenShare={onOpenShare}
              />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button
              className="btn btn-secondary btn-lg"
              onClick={onExploreClick}
            >
              <span>Explore All {ROUTINES_DATA.length} Food Routines</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Nutrition Philosophy Banner */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(135deg, #0F382A 0%, #14532D 100%)", color: "#FFFFFF" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2.5rem",
              alignItems: "center"
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#6EE7B7",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  marginBottom: "1rem"
                }}
              >
                <Award size={15} />
                <span>The Foodie-Routine-ADDA Method</span>
              </div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "1rem", lineHeight: 1.2 }}>
                Eat Real Food. <br />
                Feel Real Energy.
              </h2>
              <p style={{ color: "#E2E8F0", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                We believe health shouldn't feel like punishment. Our routines focus on delicious whole ingredients, balanced macronutrient ratios, and realistic prep times that fit your busy life.
              </p>

              <button
                className="btn btn-accent btn-lg"
                onClick={onOpenPlanWizard}
              >
                <Sparkles size={18} />
                <span>Get Your Personalized Plan</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🥗</div>
                <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>Zero Starvation</h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>High-volume, fiber-rich meals to keep you full and energized all day.</p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>⏱️</div>
                <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>Fast Preparation</h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>Under 20-minute recipes using accessible grocery items.</p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>📊</div>
                <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>Macro Precision</h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>Exact grams of protein, carbs, fats, and fiber calculated for every slot.</p>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.08)", padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🛵</div>
                <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>Order or Cook</h4>
                <p style={{ color: "#CBD5E1", fontSize: "0.8rem" }}>Cook in minutes or find comparable healthy meals on Swiggy & Zomato.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
