import React, { useState } from "react";
import { User, Mail, Target, Salad, Activity, Flame, Heart, Sparkles, Check, Edit2, Camera, UserCheck } from "lucide-react";
import { saveUserProfile } from "../utils/storage";
import { AVATAR_COLLECTION } from "../data/avatarsData";
import AvatarPickerModal from "./AvatarPickerModal";

export default function ProfileCard({
  profile,
  onProfileUpdate,
  savedRoutinesCount,
  favoriteMealsCount,
  onShowToast,
  onSelectRoutine,
  savedRoutinesList,
  onOpenPlanWizard
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleAvatarSelect = (newAvatarUrl) => {
    const updated = { ...profile, ...formData, avatar: newAvatarUrl };
    setFormData(updated);
    onProfileUpdate(updated);
    saveUserProfile(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onProfileUpdate(formData);
    saveUserProfile(formData);
    setIsEditing(false);
    onShowToast("Profile preferences updated!");
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto" }}>
      {/* Profile Banner Card */}
      <div className="widget-card" style={{ padding: "2rem", marginBottom: "1.75rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Interactive Avatar Container */}
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => setIsAvatarModalOpen(true)}
              title="Click to change your professional avatar"
              className="avatar-interactive-wrapper"
            >
              <img
                src={profile.avatar || AVATAR_COLLECTION[0].url}
                alt={profile.name}
                style={{
                  width: "84px",
                  height: "84px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #10B981",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.25)",
                  display: "block"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#0F382A",
                  color: "#34D399",
                  border: "2px solid #FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                }}
              >
                <Camera size={14} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)" }}>
                  {profile.name}
                </h2>
                <span className="badge badge-green">Active Member</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Mail size={14} />
                <span>{profile.email}</span>
              </p>
              <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
                <span className="badge badge-amber">🎯 {profile.goal}</span>
                <span className="badge badge-blue">🥗 {profile.dietPreference}</span>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    color: "#047857",
                    borderRadius: "var(--radius-full)",
                    padding: "0.2rem 0.65rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  <UserCheck size={12} />
                  <span>Change Avatar</span>
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 size={14} />
              <span>{isEditing ? "Cancel" : "Edit Preferences"}</span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSave} style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary-900)" }}>
              Update Wellness & Diet Preferences
            </h4>

            {/* Quick Avatar Row */}
            <div style={{ marginBottom: "1.25rem", padding: "1rem", background: "var(--bg-card-subtle)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", margin: 0 }}>
                  Choose Your Animated Avatar
                </label>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsAvatarModalOpen(true)}
                  style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                >
                  Browse All ({AVATAR_COLLECTION.length})
                </button>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "0.3rem" }}>
                {AVATAR_COLLECTION.slice(0, 8).map((av) => {
                  const isCur = (formData.avatar || profile.avatar) === av.url;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: av.url })}
                      style={{
                        position: "relative",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        flexShrink: 0
                      }}
                      title={`${av.name} (${av.gender === "boy" ? "Boy" : "Girl"}) - ${av.tag}`}
                    >
                      <img
                        src={av.url}
                        alt={av.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: isCur ? "3px solid #10B981" : "2px solid #E2E8F0",
                          boxShadow: isCur ? "0 0 0 2px rgba(16, 185, 129, 0.4)" : "none",
                          transition: "all 0.2s ease"
                        }}
                      />
                      {isCur && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: "#10B981",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>
                  Primary Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}
                >
                  <option value="Healthy Lifestyle & Metabolic Energy">Healthy Lifestyle & Metabolic Energy</option>
                  <option value="Weight Management & Fat Loss">Weight Management & Fat Loss</option>
                  <option value="Muscle Gain & Hypertrophy">Muscle Gain & Hypertrophy</option>
                  <option value="Cardio Vitality & Blood Sugar">Cardio Vitality & Blood Sugar</option>
                  <option value="Student Budget & Focus">Student Budget & Focus</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>
                  Diet Preference
                </label>
                <select
                  value={formData.dietPreference}
                  onChange={(e) => setFormData({ ...formData, dietPreference: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Eggetarian">Eggetarian</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-sm">
              <Check size={14} />
              <span>Save Preferences</span>
            </button>
          </form>
        )}
      </div>

      {/* Avatar Selection Modal */}
      <AvatarPickerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={profile.avatar}
        onSelectAvatar={handleAvatarSelect}
        onShowToast={onShowToast}
      />

      {/* Stats Summary Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
        <div className="widget-card" style={{ textAlign: "center", padding: "1.25rem" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem" }}>
            <Flame size={20} />
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)" }}>{profile.streakDays || 7} Days</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Active Habit Streak</div>
        </div>

        <div className="widget-card" style={{ textAlign: "center", padding: "1.25rem" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#ECFDF5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem" }}>
            <Sparkles size={20} />
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)" }}>{savedRoutinesCount}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Saved Routines</div>
        </div>

        <div className="widget-card" style={{ textAlign: "center", padding: "1.25rem" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#FEE2E2", color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem" }}>
            <Heart size={20} />
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)" }}>{favoriteMealsCount}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Favorite Recipes</div>
        </div>
      </div>

      {/* Saved Routines Collection */}
      <div className="widget-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)" }}>
            My Saved Routines
          </h3>
          <button
            className="btn btn-accent btn-sm"
            onClick={onOpenPlanWizard}
          >
            <Sparkles size={14} />
            <span>Create New Plan</span>
          </button>
        </div>

        {savedRoutinesList && savedRoutinesList.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {savedRoutinesList.map((routine) => (
              <div
                key={routine.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.85rem 1rem",
                  background: "var(--bg-card-subtle)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-subtle)",
                  gap: "1rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <img
                    src={routine.image}
                    alt={routine.title}
                    style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", objectFit: "cover" }}
                  />
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {routine.title}
                    </h4>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {routine.category} • {routine.calories} kcal • {routine.mealsCount} meals
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onSelectRoutine(routine.id)}
                >
                  View Routine
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
            <p>No routines saved yet. Explore routines and click the heart icon to save them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
