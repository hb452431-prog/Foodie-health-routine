import React, { useState } from "react";
import {
  Mail,
  Flame,
  Heart,
  Sparkles,
  Check,
  Edit2,
  Camera,
  UserCheck,
  MapPin,
  ArrowRight,
  Award,
  LogOut,
  Bookmark
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { saveUserProfile, setActivePlan, getUserBadges, getStreakDays } from "../utils/storage";
import { AVATAR_COLLECTION } from "../data/avatarsData";
import { REGIONAL_COUNTRIES, getRegionalRoutineForLocation } from "../data/regionalCuisinesData";
import { BADGES_DATA, calculateStage } from "../data/badgesData";
import AvatarPickerModal from "./AvatarPickerModal";

export default function ProfileCard({
  profile,
  onProfileUpdate,
  savedRoutinesCount,
  favoriteMealsCount,
  onShowToast,
  onSelectRoutine,
  savedRoutinesList,
  onOpenPlanWizard,
  onApplyPlan,
  onNavigateTab
}) {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ...profile,
    country: profile.country || "India",
    state: profile.state || "Karnataka"
  });

  const handleLogout = () => {
    logout();
    if (onNavigateTab) onNavigateTab("home");
    if (onShowToast) {
      onShowToast("👋 You have been logged out successfully.");
    }
  };

  const selectedCountryObj = REGIONAL_COUNTRIES.find(
    (c) => c.name.toLowerCase() === (formData.country || "").toLowerCase()
  ) || REGIONAL_COUNTRIES[0];

  const regionalRoutine = getRegionalRoutineForLocation(
    profile.country || "India",
    profile.state || "Karnataka"
  );

  const currentStreak = typeof profile.streakDays === "number" ? profile.streakDays : getStreakDays();
  const currentStage = calculateStage(currentStreak);
  const unlockedBadgesList = getUserBadges();

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    const countryObj = REGIONAL_COUNTRIES.find((c) => c.name === newCountry) || REGIONAL_COUNTRIES[0];
    const defaultState = countryObj.states[0]?.name || "";
    setFormData({
      ...formData,
      country: newCountry,
      state: defaultState
    });
  };

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
    if (onShowToast) {
      onShowToast(`✅ Location set to ${formData.state}, ${formData.country}! Food routines customized.`);
    }
  };

  const handleApplyRegionalPlan = () => {
    if (regionalRoutine) {
      setActivePlan(regionalRoutine);
      if (onApplyPlan) {
        onApplyPlan(regionalRoutine);
      }
      if (onShowToast) {
        onShowToast(`🎉 Applied ${regionalRoutine.title} to My Plan!`);
      }
    }
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
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
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
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
                  {profile.name}
                </h2>
                <span className="badge badge-green">Active Member</span>
                <span
                  className="badge"
                  style={{
                    background: "rgba(2, 132, 199, 0.12)",
                    color: "#0284C7",
                    border: "1px solid rgba(2, 132, 199, 0.25)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}
                >
                  <MapPin size={11} />
                  <span>{profile.state || "Karnataka"}, {profile.country || "India"}</span>
                </span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
                    color: "#92400E",
                    border: "1px solid #F59E0B",
                    borderRadius: "var(--radius-full)",
                    padding: "0.2rem 0.65rem",
                    fontSize: "0.74rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}
                >
                  <span>{currentStage.badgeIcon}</span>
                  <span>{currentStage.name}</span>
                </span>
              </div>

              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.25rem" }}>
                <Mail size={14} />
                <span>{profile.email}</span>
              </p>

              <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.45rem", flexWrap: "wrap", alignItems: "center" }}>
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

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEditing(!isEditing)}
              title="Edit Profile & Preferences"
            >
              <Edit2 size={14} />
              <span>{isEditing ? "Close Editor" : "Edit Preferences"}</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                if (onNavigateTab) onNavigateTab("my-plan");
                else {
                  const el = document.getElementById("saved-routines-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              title="View Saved Foods & Routines"
            >
              <Bookmark size={14} color="#059669" />
              <span>Saved Foods ({savedRoutinesCount})</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={handleLogout}
              style={{
                color: "#DC2626",
                background: "#FEF2F2",
                border: "1px solid #FECACA"
              }}
              title="Sign out of your account"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSave} style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary-900)" }}>
              Update Profile, Country & Regional Cuisine Preferences
            </h4>

            {/* Quick Avatar Row */}
            <div style={{ marginBottom: "1.25rem", padding: "1rem", background: "var(--bg-card-subtle)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary-900)", margin: 0 }}>
                  Choose Your Profile Avatar
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
                      title={`${av.name} - ${av.tag}`}
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

            {/* Inputs Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}
                  required
                />
              </div>

              {/* Country Selection */}
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={handleCountryChange}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}
                >
                  {REGIONAL_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Selection */}
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>
                  State / Province / Region
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}
                >
                  {selectedCountryObj.states.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>
                  Primary Health Goal
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
                  Dietary Preference
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

            {/* Regional Cuisine Preview Info Box */}
            <div
              style={{
                background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
                border: "1px solid #86EFAC",
                borderRadius: "var(--radius-lg)",
                padding: "0.85rem 1rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>📍</span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#14532D" }}>
                  Matched Regional Cuisine for {formData.state}, {formData.country}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#15803D" }}>
                  Your daily meal timelines, recipe ingredients, and ordering links will automatically adapt to traditional {formData.state} dishes!
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-sm">
              <Check size={14} />
              <span>Save & Update Profile</span>
            </button>
          </form>
        )}
      </div>

      {/* Regional Cuisine Recommendation Card */}
      {regionalRoutine && (
        <div
          className="widget-card"
          style={{
            background: "linear-gradient(135deg, #0F382A 0%, #14532D 100%)",
            color: "#FFFFFF",
            marginBottom: "1.75rem",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span className="badge" style={{ background: "rgba(16, 185, 129, 0.25)", color: "#86EFAC", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
                  📍 {profile.state || "Karnataka"}, {profile.country || "India"} Heritage Food Routine
                </span>
                <span className="badge" style={{ background: "rgba(255, 255, 255, 0.15)", color: "#FFFFFF" }}>
                  {regionalRoutine.calories} kcal • 6 Meals
                </span>
              </div>

              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.4rem" }}>
                {regionalRoutine.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#E2E8F0", marginBottom: "1rem" }}>
                {regionalRoutine.subtitle}
              </p>

              {/* Sample Dish Badges */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                {regionalRoutine.dailyTimeline?.map((m) => (
                  <span
                    key={m.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "var(--radius-full)",
                      padding: "0.25rem 0.65rem",
                      fontSize: "0.75rem",
                      color: "#FFFFFF"
                    }}
                  >
                    {m.emoji} {m.title.split("with")[0].split("(")[0]}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button
                  className="btn btn-accent btn-sm"
                  onClick={handleApplyRegionalPlan}
                  style={{ boxShadow: "0 4px 14px rgba(245, 158, 11, 0.4)" }}
                >
                  <Sparkles size={15} />
                  <span>Apply {profile.state || "Karnataka"} Plan to My Routine</span>
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onSelectRoutine && onSelectRoutine(regionalRoutine.id)}
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.25)"
                  }}
                >
                  <span>View All 6 Recipes</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {regionalRoutine.image && (
              <img
                src={regionalRoutine.image}
                alt={regionalRoutine.title}
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "var(--radius-xl)",
                  objectFit: "cover",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)"
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Stats Summary Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
        <div className="widget-card" style={{ textAlign: "center", padding: "1.25rem" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem" }}>
            <Flame size={20} fill="#F59E0B" />
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)" }}>{currentStreak} Days</div>
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
            <Heart size={20} fill="#EF4444" />
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)" }}>{favoriteMealsCount}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Favorite Recipes</div>
        </div>

        <div className="widget-card" style={{ textAlign: "center", padding: "1.25rem" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#FAF5FF", color: "#9333EA", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.5rem" }}>
            <Award size={20} />
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-900)" }}>{unlockedBadgesList.length}/{BADGES_DATA.length}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Badges Unlocked</div>
        </div>
      </div>

      {/* Milestones, Stages & Trophy Showcase Section */}
      <div className="widget-card" style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
              Milestone Badges & Stage Progression
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
              Earn badges after completing each daily routine, each full week (7-day streak), and each full month (30-day streak)!
            </p>
          </div>

          <span
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              color: "#38BDF8",
              border: "1.5px solid #38BDF8",
              padding: "0.35rem 0.85rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.82rem",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}
          >
            <span>{currentStage.badgeIcon}</span>
            <span>Stage {currentStage.stage}: {currentStage.name}</span>
          </span>
        </div>

        {/* 8 Badges Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.85rem" }}>
          {BADGES_DATA.map((badge) => {
            const isUnlocked = unlockedBadgesList.includes(badge.id);
            return (
              <div
                key={badge.id}
                style={{
                  background: isUnlocked ? badge.gradient : "var(--bg-card-subtle)",
                  border: isUnlocked ? `2px solid ${badge.borderColor}` : "1px dashed var(--border-subtle)",
                  borderRadius: "var(--radius-xl)",
                  padding: "1rem",
                  transition: "all 0.22s ease",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.8rem", filter: isUnlocked ? "none" : "grayscale(100%) opacity(40%)" }}>
                    {badge.icon}
                  </span>
                  {isUnlocked ? (
                    <span
                      style={{
                        background: "#10B981",
                        color: "#FFFFFF",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        padding: "0.15rem 0.45rem",
                        borderRadius: "var(--radius-full)"
                      }}
                    >
                      UNLOCKED
                    </span>
                  ) : (
                    <span
                      style={{
                        background: "#E2E8F0",
                        color: "#64748B",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.45rem",
                        borderRadius: "var(--radius-full)"
                      }}
                    >
                      LOCKED
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: "0.92rem", fontWeight: 800, color: isUnlocked ? "var(--primary-900)" : "var(--text-secondary)", margin: "0 0 0.2rem" }}>
                  {badge.title}
                </h4>
                <div style={{ fontSize: "0.72rem", color: isUnlocked ? "var(--primary-700)" : "var(--text-muted)", fontWeight: 600, marginBottom: "0.4rem" }}>
                  {badge.category}
                </div>
                <p style={{ fontSize: "0.75rem", color: isUnlocked ? "var(--text-primary)" : "var(--text-muted)", margin: 0, lineHeight: 1.3 }}>
                  {badge.criteria}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Routines Collection */}
      <div className="widget-card" id="saved-routines-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary-900)", margin: 0 }}>
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
                  gap: "1rem",
                  flexWrap: "wrap"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <img
                    src={routine.image}
                    alt={routine.title}
                    style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", objectFit: "cover" }}
                  />
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.2rem" }}>
                      {routine.title}
                    </h4>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {routine.category} • {routine.calories} kcal • {routine.mealsCount || 6} meals
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

      {/* Avatar Selection Modal */}
      <AvatarPickerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={profile.avatar}
        onSelectAvatar={handleAvatarSelect}
        onShowToast={onShowToast}
      />
    </div>
  );
}
