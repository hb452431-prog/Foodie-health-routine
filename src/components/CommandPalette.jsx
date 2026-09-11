import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  Sparkles,
  Home,
  Compass,
  Calendar,
  User,
  Droplet,
  Calculator,
  Utensils,
  ChevronRight,
  X,
  Flame,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Heart
} from "lucide-react";
import { ROUTINES_DATA } from "../data/routinesData";
import { CATEGORIES_DATA } from "../data/categoriesData";

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectRoutine,
  onOpenRecipe,
  onOpenPlanWizard,
  onUpdateWater,
  waterGlasses = 0,
  onShowToast,
  onCategorySelect,
  onFilterSelect
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Auto focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setActiveFilter("all");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Index all unique meals across routines for instant recipe search
  const allMeals = useMemo(() => {
    const list = [];
    const seenTitles = new Set();
    ROUTINES_DATA.forEach((routine) => {
      routine.dailyTimeline?.forEach((meal) => {
        if (!seenTitles.has(meal.title)) {
          seenTitles.add(meal.title);
          list.push({
            ...meal,
            parentRoutine: routine
          });
        }
      });
    });
    return list;
  }, []);

  // Quick Action items
  const quickActions = useMemo(() => [
    {
      id: "act-water",
      type: "action",
      category: "Quick Actions",
      title: "Log Water Intake (+250 ml Glass)",
      subtitle: `Currently at ${waterGlasses}/8 glasses (${waterGlasses * 250} ml)`,
      icon: Droplet,
      iconColor: "#0284C7",
      iconBg: "#E0F2FE",
      badge: "+250 ml",
      action: () => {
        if (onUpdateWater) onUpdateWater(Math.min(16, Number(waterGlasses) + 1));
        if (onShowToast) onShowToast("💧 Logged 1 glass (+250ml) of water!");
        onClose();
      }
    },
    {
      id: "act-plan-wizard",
      type: "action",
      category: "Quick Actions",
      title: "Generate Custom AI Food Routine",
      subtitle: "5-step personalized routine generator for your health goal",
      icon: Sparkles,
      iconColor: "#10B981",
      iconBg: "#DCFCE7",
      badge: "AI Wizard",
      action: () => {
        onClose();
        if (onOpenPlanWizard) onOpenPlanWizard();
      }
    },
    {
      id: "act-nav-my-plan",
      type: "action",
      category: "Quick Actions",
      title: "View Today's Routine Schedule",
      subtitle: "Check today's meal timetable, recipes & hydration status",
      icon: Calendar,
      iconColor: "#059669",
      iconBg: "#ECFDF5",
      badge: "Today",
      action: () => {
        onClose();
        if (onNavigateTab) onNavigateTab("my-plan");
      }
    },
    {
      id: "act-nav-calculator",
      type: "action",
      category: "Quick Actions",
      title: "Nutrition & Macro Calculator",
      subtitle: "Calculate BMI, BMR, TDEE & macro protein/carb splits",
      icon: Calculator,
      iconColor: "#EA580C",
      iconBg: "#FFEDD5",
      badge: "Tool",
      action: () => {
        onClose();
        if (onNavigateTab) onNavigateTab("home");
        setTimeout(() => {
          const el = document.getElementById("nutrition-calculator-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    },
    {
      id: "act-filter-veg",
      type: "action",
      category: "Quick Actions",
      title: "Explore 100% Vegetarian Routines",
      subtitle: "Filter pure plant-rich and dairy vegetarian schedules",
      icon: Utensils,
      iconColor: "#16A34A",
      iconBg: "#DCFCE7",
      badge: "Veg Only",
      action: () => {
        onClose();
        if (onFilterSelect) onFilterSelect("vegetarian");
        if (onNavigateTab) onNavigateTab("explore");
      }
    },
    {
      id: "act-filter-protein",
      type: "action",
      category: "Quick Actions",
      title: "Explore High Protein Plans (>120g/day)",
      subtitle: "Plans engineered for muscle hypertrophy & lean mass",
      icon: Flame,
      iconColor: "#D97706",
      iconBg: "#FEF3C7",
      badge: "High Protein",
      action: () => {
        onClose();
        if (onFilterSelect) onFilterSelect("high-protein");
        if (onNavigateTab) onNavigateTab("explore");
      }
    }
  ], [waterGlasses, onUpdateWater, onShowToast, onClose, onOpenPlanWizard, onNavigateTab, onFilterSelect]);

  // Main navigation items
  const navItems = useMemo(() => [
    {
      id: "nav-home",
      type: "nav",
      category: "Pages",
      title: "Home",
      subtitle: "Overview, categories, featured routines & macro calculator",
      icon: Home,
      iconColor: "#059669",
      iconBg: "#ECFDF5",
      action: () => {
        onClose();
        if (onNavigateTab) onNavigateTab("home");
      }
    },
    {
      id: "nav-explore",
      type: "nav",
      category: "Pages",
      title: "Explore All Routines",
      subtitle: `Browse all ${ROUTINES_DATA.length} scientifically designed diet schedules`,
      icon: Compass,
      iconColor: "#0284C7",
      iconBg: "#E0F2FE",
      action: () => {
        onClose();
        if (onNavigateTab) onNavigateTab("explore");
      }
    },
    {
      id: "nav-my-plan",
      type: "nav",
      category: "Pages",
      title: "My Active Plan & Timetable",
      subtitle: "Track daily meal completions, weekly schedule & hydration",
      icon: Calendar,
      iconColor: "#10B981",
      iconBg: "#DCFCE7",
      action: () => {
        onClose();
        if (onNavigateTab) onNavigateTab("my-plan");
      }
    },
    {
      id: "nav-profile",
      type: "nav",
      category: "Pages",
      title: "My Health Profile & Saved Routines",
      subtitle: "Manage daily calorie goals, avatar, bookmarks & favorites",
      icon: User,
      iconColor: "#7C3AED",
      iconBg: "#F5F3FF",
      action: () => {
        onClose();
        if (onNavigateTab) onNavigateTab("profile");
      }
    }
  ], [onClose, onNavigateTab]);

  // Filtered Results Calculation
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Matched Nav & Actions
    let matchedActions = quickActions;
    let matchedNav = navItems;

    if (q) {
      matchedActions = quickActions.filter(
        (a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q)
      );
      matchedNav = navItems.filter(
        (n) => n.title.toLowerCase().includes(q) || n.subtitle.toLowerCase().includes(q)
      );
    }

    // 2. Matched Routines
    let matchedRoutines = ROUTINES_DATA.filter((r) => {
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }).map((r) => ({
      id: `routine-${r.id}`,
      type: "routine",
      category: "Food Routines",
      title: r.title,
      subtitle: `${r.category} • ${r.calories} kcal • ${r.protein}g protein • ${r.mealsCount} meals/day`,
      image: r.image,
      badge: r.badge || r.category,
      badgeColor: "#059669",
      routineObj: r,
      action: () => {
        onClose();
        if (onSelectRoutine) onSelectRoutine(r.id);
      }
    }));

    // 3. Matched Meals / Recipes
    let matchedMeals = [];
    if (q.length >= 2) {
      matchedMeals = allMeals.filter((m) => {
        return (
          m.title.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q) ||
          m.ingredients?.some((ing) => ing.name.toLowerCase().includes(q))
        );
      }).slice(0, 8).map((m) => ({
        id: `meal-${m.id}`,
        type: "meal",
        category: "Recipes & Dishes",
        title: m.title,
        subtitle: `${m.slotName || "Meal"} • ${m.calories} kcal • ${m.protein}g protein • In "${m.parentRoutine?.title}"`,
        emoji: m.emoji || "🥗",
        image: m.image,
        badge: m.prepTime || "15 min",
        mealObj: m,
        action: () => {
          onClose();
          if (onOpenRecipe) onOpenRecipe(m, m.parentRoutine);
        }
      }));
    }

    // 4. Matched Categories
    let matchedCategories = CATEGORIES_DATA.filter((c) => {
      if (!q) return false;
      return c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    }).map((c) => ({
      id: `cat-${c.id}`,
      type: "category",
      category: "Routine Categories",
      title: `${c.emoji} ${c.name}`,
      subtitle: `${c.description} (${c.count} routines)`,
      badge: `${c.count} plans`,
      action: () => {
        onClose();
        if (onCategorySelect) onCategorySelect(c.id);
        if (onNavigateTab) onNavigateTab("explore");
      }
    }));

    // Grouping according to active tab filter
    const combined = [];

    if (activeFilter === "all" || activeFilter === "actions") {
      combined.push(...matchedActions);
    }
    if (activeFilter === "all" || activeFilter === "routines") {
      combined.push(...matchedRoutines);
    }
    if (activeFilter === "all" || activeFilter === "meals") {
      combined.push(...matchedMeals);
    }
    if (activeFilter === "all" || activeFilter === "categories") {
      combined.push(...matchedCategories);
    }
    if (activeFilter === "all" || activeFilter === "nav") {
      combined.push(...matchedNav);
    }

    return combined;
  }, [query, activeFilter, quickActions, navItems, allMeals, onSelectRoutine, onOpenRecipe, onCategorySelect, onNavigateTab, onClose]);

  // Keyboard navigation inside list
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          filteredResults[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeFilter]);

  if (!isOpen) return null;

  return (
    <div
      className="command-palette-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Search and Command Center"
    >
      <div
        className="command-palette-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="command-palette-input-wrapper">
          <Search size={20} className="command-palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="command-palette-input"
            placeholder="Search routines, recipes, ingredients, or quick actions... (e.g., 'diabetes', 'oats', 'water')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="command-palette-clear-btn"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="command-palette-kbd">ESC</kbd>
        </div>

        {/* Filter Chips Bar */}
        <div className="command-palette-filters">
          {[
            { id: "all", label: "All Results" },
            { id: "routines", label: "🥗 Routines" },
            { id: "meals", label: "🍲 Dishes & Recipes" },
            { id: "actions", label: "⚡ Quick Actions" },
            { id: "categories", label: "🏷️ Categories" }
          ].map((f) => (
            <button
              key={f.id}
              className={`command-filter-chip ${activeFilter === f.id ? "active" : ""}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="command-palette-list" ref={listRef}>
          {filteredResults.length === 0 ? (
            <div className="command-palette-empty">
              <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</span>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--primary-900)", marginBottom: "0.3rem" }}>
                No results found for "{query}"
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Try searching for routines like "Diabetes", "Keto", "High Protein", or dishes like "Oats", "Salad", "Khichdi".
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.id}
                  className={`command-palette-item ${isSelected ? "selected" : ""}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  {/* Item Icon / Thumbnail */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="command-item-img"
                    />
                  ) : IconComponent ? (
                    <div
                      className="command-item-icon"
                      style={{ background: item.iconBg || "#F0FDF4", color: item.iconColor || "#059669" }}
                    >
                      <IconComponent size={18} />
                    </div>
                  ) : item.emoji ? (
                    <div className="command-item-emoji">{item.emoji}</div>
                  ) : (
                    <div className="command-item-icon">
                      <Sparkles size={16} />
                    </div>
                  )}

                  {/* Details */}
                  <div className="command-item-details">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span className="command-item-title">{item.title}</span>
                      {item.badge && (
                        <span className="command-item-badge">{item.badge}</span>
                      )}
                    </div>
                    <span className="command-item-subtitle">{item.subtitle}</span>
                  </div>

                  {/* Return Key / Select Hint */}
                  <div className="command-item-hint">
                    {isSelected && (
                      <span style={{ fontSize: "0.75rem", color: "var(--primary-600)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.2rem" }}>
                        Select <kbd style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem", background: "rgba(0,0,0,0.06)", borderRadius: "4px" }}>↵</kbd>
                      </span>
                    )}
                    <ChevronRight size={16} className="command-item-arrow" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="command-palette-footer">
          <div className="command-shortcuts-guide">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Open</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            ⚡ <strong>Foodie-Routine-ADDA</strong> Universal Navigator
          </div>
        </div>
      </div>
    </div>
  );
}
