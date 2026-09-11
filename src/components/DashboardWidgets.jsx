import React, { useState, useEffect } from "react";
import {
  Droplet,
  Flame,
  Utensils,
  CheckCircle2,
  Circle,
  Plus,
  Minus,
  Heart,
  Award,
  Sparkles,
  ShieldCheck,
  Zap,
  Crown,
  Diamond,
  RotateCcw,
  Check
} from "lucide-react";
import { BADGES_DATA, STAGES_CONFIG, calculateStage } from "../data/badgesData";
import {
  getUserBadges,
  getStreakDays,
  setStreakDays,
  evaluateMilestones,
  unlockBadge
} from "../utils/storage";

export default function DashboardWidgets({
  waterGlasses = 0,
  onUpdateWater,
  completedMealsData = { meals: [] },
  totalMealsCount = 6,
  onToggleMealCompleted,
  routine,
  savedRecipesCount = 0,
  onShowToast
}) {
  const targetGlasses = 8;
  const currentGlasses = Number(waterGlasses || 0);
  const completedList = completedMealsData && Array.isArray(completedMealsData.meals) ? completedMealsData.meals : [];
  const completedCount = completedList.length;
  const safeTotalMeals = Math.max(1, totalMealsCount || routine?.dailyTimeline?.length || 6);
  const completionPercentage = Math.min(100, Math.round((completedCount / safeTotalMeals) * 100));

  // Live streak and badges state
  const [streakDays, setStreakDaysState] = useState(() => getStreakDays());
  const [unlockedBadges, setUnlockedBadges] = useState(() => getUserBadges());
  const [activeStage, setActiveStage] = useState(() => calculateStage(getStreakDays()));

  // Sync badges and stage on render / state change
  useEffect(() => {
    const currentStreak = getStreakDays();
    setStreakDaysState(currentStreak);
    setUnlockedBadges(getUserBadges());
    setActiveStage(calculateStage(currentStreak));
  }, []);

  // Evaluate milestones when meals, water, or saved recipes change
  useEffect(() => {
    const res = evaluateMilestones({
      completedMealsCount: completedCount,
      totalMealsCount: safeTotalMeals,
      waterGlasses: currentGlasses,
      savedRecipesCount: savedRecipesCount,
      isRegionalPlan: true
    });

    if (res.newlyUnlocked && res.newlyUnlocked.length > 0) {
      setUnlockedBadges(res.allBadges);
      res.newlyUnlocked.forEach((badgeId) => {
        const badgeObj = BADGES_DATA.find((b) => b.id === badgeId);
        if (badgeObj && onShowToast) {
          onShowToast(`🎉 UNLOCKED BADGE: ${badgeObj.icon} ${badgeObj.title}!`);
        }
      });
    }
  }, [completedCount, safeTotalMeals, currentGlasses, savedRecipesCount]);

  const handleAddGlass = () => {
    if (currentGlasses < 16) {
      if (onUpdateWater) onUpdateWater(currentGlasses + 1);
      if (onShowToast) onShowToast("💧 Logged 1 glass (+250ml) of water!");
    }
  };

  const handleRemoveGlass = () => {
    if (currentGlasses > 0) {
      if (onUpdateWater) onUpdateWater(currentGlasses - 1);
    }
  };

  const handleIncrementStreak = (daysToAdd) => {
    const newStreak = Math.max(1, streakDays + daysToAdd);
    setStreakDays(newStreak);
    setStreakDaysState(newStreak);
    const newStage = calculateStage(newStreak);
    setActiveStage(newStage);

    const res = evaluateMilestones({
      completedMealsCount: completedCount,
      totalMealsCount: safeTotalMeals,
      waterGlasses: currentGlasses,
      savedRecipesCount: savedRecipesCount,
      isRegionalPlan: true
    });
    setUnlockedBadges(res.allBadges);

    if (onShowToast) {
      if (daysToAdd === 7) {
        onShowToast(`🛡️ 1 Week Completed! Streak is now ${newStreak} Days (${newStage.badgeIcon} ${newStage.name})`);
      } else if (daysToAdd === 30) {
        onShowToast(`👑 1 Month Completed! Streak is now ${newStreak} Days (${newStage.badgeIcon} ${newStage.name})`);
      } else {
        onShowToast(`🔥 +${daysToAdd} Day Streak! Active Streak: ${newStreak} Days`);
      }
    }
  };

  const handleResetStreak = () => {
    setStreakDays(1);
    setStreakDaysState(1);
    const s1 = calculateStage(1);
    setActiveStage(s1);
    if (onShowToast) onShowToast("🔄 Streak reset to Day 1");
  };

  // Find next stage target
  const currentStageIndex = STAGES_CONFIG.findIndex((s) => s.stage === activeStage.stage);
  const nextStage = STAGES_CONFIG[currentStageIndex + 1];
  const progressToNext = nextStage
    ? Math.min(100, Math.round(((streakDays - activeStage.minStreak) / (nextStage.minStreak - activeStage.minStreak)) * 100))
    : 100;

  return (
    <div>
      {/* 1. Milestone Badges & Stage Progression Level Card */}
      <div
        className="widget-card"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          color: "#FFFFFF",
          border: `1.5px solid ${activeStage.color || "#38BDF8"}`,
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.25)`,
          marginBottom: "1.25rem",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: activeStage.color || "#38BDF8",
            filter: "blur(50px)",
            opacity: 0.25,
            pointerEvents: "none"
          }}
        />

        {/* Header with Stage Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <span
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  border: `1px solid ${activeStage.color || "#38BDF8"}`,
                  borderRadius: "var(--radius-full)",
                  padding: "0.2rem 0.6rem",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: activeStage.color || "#38BDF8",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <span>Stage {activeStage.stage}</span>
                <span>•</span>
                <span>{activeStage.badgeIcon} {activeStage.name}</span>
              </span>
            </div>
            <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
              Wellness Stage & Streak
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              background: "rgba(245, 158, 11, 0.18)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: "var(--radius-full)",
              padding: "0.3rem 0.75rem",
              color: "#FBBF24"
            }}
          >
            <Flame size={18} fill="#F59E0B" />
            <span style={{ fontSize: "1.1rem", fontWeight: 800 }}>{streakDays}</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>Days</span>
          </div>
        </div>

        <p style={{ fontSize: "0.8rem", color: "#94A3B8", marginBottom: "0.85rem" }}>
          {activeStage.description}
        </p>

        {/* Stage Progress Bar */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem", fontWeight: 600, color: "#CBD5E1", marginBottom: "0.35rem" }}>
            <span>Stage Progress</span>
            <span>
              {nextStage
                ? `${streakDays} / ${nextStage.minStreak} Days (Next: ${nextStage.badgeIcon} ${nextStage.name})`
                : "👑 Maximum Stage Achieved!"}
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "rgba(255, 255, 255, 0.12)",
              borderRadius: "var(--radius-full)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${progressToNext}%`,
                height: "100%",
                background: `linear-gradient(90deg, #10B981 0%, ${activeStage.color || "#38BDF8"} 100%)`,
                borderRadius: "var(--radius-full)",
                transition: "width 0.4s ease"
              }}
            />
          </div>
        </div>

        {/* Unlocked Badges Mini Showcase */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#E2E8F0", marginBottom: "0.6rem", display: "flex", justifyContent: "space-between" }}>
            <span>Milestone Badges ({unlockedBadges.length}/{BADGES_DATA.length})</span>
            <span style={{ color: "#34D399" }}>Daily • Weekly • Monthly</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
            {BADGES_DATA.map((badge) => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  style={{
                    background: isUnlocked ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.03)",
                    border: isUnlocked ? `1.5px solid ${badge.borderColor}` : "1px dashed rgba(255, 255, 255, 0.15)",
                    borderRadius: "var(--radius-lg)",
                    padding: "0.5rem 0.25rem",
                    textAlign: "center",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s ease"
                  }}
                  onClick={() => {
                    if (onShowToast) {
                      onShowToast(
                        isUnlocked
                          ? `🏅 ${badge.title}: ${badge.description}`
                          : `🔒 Locked: ${badge.title} (${badge.criteria})`
                      );
                    }
                  }}
                  title={`${badge.title} - ${badge.criteria}`}
                >
                  <div style={{ fontSize: "1.4rem", filter: isUnlocked ? "none" : "grayscale(100%) opacity(35%)", marginBottom: "0.15rem" }}>
                    {badge.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: isUnlocked ? "#FFFFFF" : "#64748B",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      padding: "0 2px"
                    }}
                  >
                    {badge.title.split(" ")[0]}
                  </div>
                  {isUnlocked && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#10B981",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "8px"
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Streak Simulator Buttons */}
        <div style={{ paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Simulate Streak:</span>
          <div style={{ display: "flex", gap: "0.35rem" }}>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => handleIncrementStreak(1)}
              style={{ padding: "0.2rem 0.5rem", fontSize: "0.7rem", background: "rgba(255, 255, 255, 0.15)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" }}
              title="Add 1 Day to your streak"
            >
              +1 Day
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => handleIncrementStreak(7)}
              style={{ padding: "0.2rem 0.5rem", fontSize: "0.7rem", background: "rgba(16, 185, 129, 0.25)", color: "#6EE7B7", border: "1px solid rgba(16, 185, 129, 0.4)" }}
              title="Complete 1 full week (7 days) and unlock Silver Practitioner"
            >
              +1 Week
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => handleIncrementStreak(30)}
              style={{ padding: "0.2rem 0.5rem", fontSize: "0.7rem", background: "rgba(168, 85, 247, 0.25)", color: "#D8B4FE", border: "1px solid rgba(168, 85, 247, 0.4)" }}
              title="Complete 1 full month (30 days) and unlock Platinum Champion"
            >
              +1 Month
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={handleResetStreak}
              style={{ padding: "0.2rem 0.4rem", fontSize: "0.7rem", background: "rgba(239, 68, 68, 0.2)", color: "#FCA5A5", border: "1px solid rgba(239, 68, 68, 0.3)" }}
              title="Reset streak to 1 day"
            >
              <RotateCcw size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Water Intake Tracker Box */}
      <div className="water-tracker-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#0284C7",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Droplet size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#0369A1" }}>
                Daily Hydration Tracker
              </h4>
              <p style={{ fontSize: "0.78rem", color: "#0284C7" }}>
                Target: {targetGlasses} glasses (2,000 ml)
              </p>
            </div>
          </div>

          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0369A1" }}>
            {currentGlasses * 250} <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>ml</span>
          </div>
        </div>

        {/* Glasses Visual Grid */}
        <div className="water-glasses-row">
          {Array.from({ length: targetGlasses }).map((_, idx) => {
            const isFilled = idx < currentGlasses;
            return (
              <div
                key={idx}
                className={`water-glass-item ${isFilled ? "filled" : ""}`}
                onClick={() => onUpdateWater && onUpdateWater(idx + 1 === currentGlasses ? idx : idx + 1)}
                title={`Glass ${idx + 1} (250 ml)`}
              >
                <Droplet size={16} fill={isFilled ? "#FFFFFF" : "none"} />
              </div>
            );
          })}
        </div>

        {/* Quick +250ml Buttons */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button
            className="btn btn-sm"
            style={{ background: "#0284C7", color: "#FFFFFF", padding: "0.4rem 0.8rem" }}
            onClick={handleAddGlass}
          >
            <Plus size={14} />
            <span>+250 ml Glass</span>
          </button>

          {currentGlasses > 0 && (
            <button
              className="btn btn-secondary btn-sm"
              style={{ padding: "0.4rem 0.6rem" }}
              onClick={handleRemoveGlass}
              title="Remove one glass"
            >
              <Minus size={14} />
            </button>
          )}

          <span style={{ fontSize: "0.78rem", color: "#0369A1", fontWeight: 600, marginLeft: "auto" }}>
            {currentGlasses >= targetGlasses ? "🎉 Target Met!" : `${targetGlasses - currentGlasses} glasses left`}
          </span>
        </div>
      </div>

      {/* 3. Routine Progress Overview Card */}
      <div className="widget-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--primary-900)" }}>
            Today's Routine Progress
          </h4>
          <span className="badge badge-green">
            {completedCount}/{safeTotalMeals} Meals Done
          </span>
        </div>

        <div className="progress-bar-container">
          <div className="progress-header">
            <span style={{ color: "var(--text-secondary)" }}>Completion</span>
            <span style={{ color: "var(--primary-700)" }}>{completionPercentage}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill-green"
              style={{ width: `${completionPercentage}%`, transition: "width 0.3s ease" }}
            />
          </div>
        </div>

        {/* Quick Nutrition Breakdown */}
        {routine && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
              background: "var(--bg-card-subtle)",
              padding: "0.85rem",
              borderRadius: "var(--radius-lg)",
              marginTop: "1rem"
            }}
          >
            <div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Target Calories</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-900)" }}>
                {routine.calories || 2000} kcal
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Target Protein</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary-600)" }}>
                {routine.protein || 80}g / day
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Quick Saved Recipes Summary */}
      <div className="widget-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", color: "#EF4444" }}>
            <Heart size={18} fill="#EF4444" />
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{savedRecipesCount} Saved Recipes</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>In your personal recipe book</div>
          </div>
        </div>
      </div>
    </div>
  );
}
