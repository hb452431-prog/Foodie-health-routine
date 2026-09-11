import React from "react";
import ProfileCard from "../components/ProfileCard";
import { ROUTINES_DATA } from "../data/routinesData";

export default function ProfileView({
  userProfile,
  onProfileUpdate,
  savedRoutines,
  favoriteMeals,
  onShowToast,
  onSelectRoutine,
  onOpenPlanWizard,
  onApplyPlan
}) {
  const savedRoutinesList = ROUTINES_DATA.filter((r) => savedRoutines.includes(r.id));

  return (
    <div style={{ padding: "2rem 0 4rem" }}>
      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary-900)", marginBottom: "0.4rem" }}>
            Account & Preferences
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Manage your daily nutritional targets, dietary preferences, and saved meal plans.
          </p>
        </div>

        <ProfileCard
          profile={userProfile}
          onProfileUpdate={onProfileUpdate}
          savedRoutinesCount={savedRoutines.length}
          favoriteMealsCount={favoriteMeals.length}
          onShowToast={onShowToast}
          onSelectRoutine={onSelectRoutine}
          savedRoutinesList={savedRoutinesList}
          onOpenPlanWizard={onOpenPlanWizard}
          onApplyPlan={onApplyPlan}
        />
      </div>
    </div>
  );
}
