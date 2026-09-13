import React, { useState } from "react";
import {
  MapPin,
  Sparkles,
  Utensils,
  ShoppingBag,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  Flame,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { useLocation } from "../../context/LocationContext";
import LocationFoodCard from "./LocationFoodCard";

const MEAL_TABS = [
  { id: "breakfast", label: "Breakfast", emoji: "🥣" },
  { id: "lunch", label: "Lunch", emoji: "🍛" },
  { id: "healthyMeals", label: "Healthy Meals", emoji: "🥗" },
  { id: "highProtein", label: "High Protein", emoji: "💪" },
  { id: "dinner", label: "Dinner", emoji: "🌙" }
];

export default function NearbyFoodSection({
  onOpenRecipe,
  onOpenYouTube,
  onOpenOrder,
  favoriteMeals = [],
  onToggleFavoriteMeal
}) {
  const {
    locationData,
    currentCityFoodData,
    setIsManualModalOpen,
    requestLocation,
    locationStatus
  } = useLocation();

  const [activeTab, setActiveTab] = useState("breakfast");

  const city = locationData?.city || "Bengaluru";
  const state = locationData?.state || "Karnataka";
  const dishesList = currentCityFoodData?.dishes?.[activeTab] || [];
  const popularHighlights = currentCityFoodData?.popularFoods || [];

  return (
    <section className="nearby-food-section">
      <div className="container">
        {/* Section Header */}
        <div className="nearby-food-header-row">
          <div>
            <div className="nearby-location-badge">
              <span className="pulse-pin-dot" />
              <MapPin size={14} style={{ color: "#059669" }} />
              <span>{locationData?.label || `${city}, ${state}`}</span>
            </div>

            <h2 className="section-title" style={{ marginTop: "0.4rem", marginBottom: "0.3rem" }}>
              Food Around You
            </h2>
            <p className="section-subtitle">
              Healthy food recommendations, authentic local recipes and clean meal options tailored for your area.
            </p>
          </div>

          {/* Quick Location Action Buttons */}
          <div className="nearby-header-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsManualModalOpen(true)}
              title="Change your active city or state"
            >
              <SlidersHorizontal size={14} />
              <span>Change Location</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={requestLocation}
              title="Refresh GPS location"
            >
              <RefreshCw size={14} className={locationStatus === "loading" ? "location-icon-spin" : ""} />
              <span>{locationStatus === "loading" ? "Detecting..." : "GPS"}</span>
            </button>
          </div>
        </div>

        {/* Local Highlights Ticker Bar */}
        {popularHighlights.length > 0 && (
          <div className="nearby-popular-tags-row">
            <span className="nearby-popular-label">Popular in {city}:</span>
            <div className="nearby-popular-chips-wrap">
              {popularHighlights.map((food, idx) => (
                <span key={idx} className="nearby-popular-chip">
                  ✨ {food}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="nearby-meal-tabs-wrap">
          {MEAL_TABS.map((tab) => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`nearby-tab-btn ${isCurrent ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span style={{ fontSize: "1.1rem" }}>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dishes Grid */}
        {dishesList.length > 0 ? (
          <div className="nearby-dishes-grid">
            {dishesList.map((dish) => (
              <LocationFoodCard
                key={dish.id}
                dish={dish}
                cityName={city}
                onOpenRecipe={onOpenRecipe}
                onOpenYouTube={onOpenYouTube}
                onOpenOrder={onOpenOrder}
                isFavorite={favoriteMeals.includes(dish.id)}
                onToggleFavorite={onToggleFavoriteMeal}
              />
            ))}
          </div>
        ) : (
          <div className="nearby-empty-state">
            <p style={{ color: "var(--text-muted)" }}>
              No dishes found for this slot in {city}. Showing regional favorites.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
