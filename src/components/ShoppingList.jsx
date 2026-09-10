import React, { useState } from "react";
import { ShoppingCart, Check, Copy, Sparkles, CheckSquare, Square } from "lucide-react";
import { getShoppingChecked, toggleShoppingChecked } from "../utils/storage";

export default function ShoppingList({ routine, onShowToast }) {
  const [checkedItems, setCheckedItems] = useState(() => getShoppingChecked());

  if (!routine || !routine.dailyTimeline) return null;

  // Extract all ingredients from routine meals
  const allIngredients = routine.dailyTimeline.flatMap((meal) => meal.ingredients || []);

  const handleToggle = (name) => {
    const updated = toggleShoppingChecked(name);
    setCheckedItems([...updated]);
  };

  const handleCopyList = () => {
    const text = allIngredients.map((i) => `• ${i.name} (${i.amount})`).join("\n");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Foodie-Routine-ADDA Shopping List (${routine.title}):\n\n` + text);
      onShowToast("📋 Shopping list copied to clipboard!");
    } else {
      onShowToast("Shopping list ready!");
    }
  };

  return (
    <div className="widget-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ShoppingCart size={20} style={{ color: "var(--primary-600)" }} />
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--primary-900)" }}>
            Smart Grocery Shopping List
          </h3>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={handleCopyList}
          title="Copy shopping list"
        >
          <Copy size={14} />
          <span>Copy</span>
        </button>
      </div>

      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
        Auto-aggregated ingredients from your active daily routine ({allIngredients.length} items):
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.45rem", maxHeight: "320px", overflowY: "auto", paddingRight: "0.25rem" }}>
        {allIngredients.map((item, idx) => {
          const isChecked = checkedItems.includes(item.name);
          return (
            <div
              key={idx}
              onClick={() => handleToggle(item.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.55rem 0.75rem",
                background: isChecked ? "#F1F5F9" : "var(--bg-card-subtle)",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontSize: "0.85rem",
                textDecoration: isChecked ? "line-through" : "none",
                color: isChecked ? "var(--text-light)" : "var(--text-primary)"
              }}
            >
              {isChecked ? (
                <CheckSquare size={16} style={{ color: "var(--primary-500)", flexShrink: 0 }} />
              ) : (
                <Square size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              )}
              <span style={{ fontWeight: 600 }}>{item.name}</span>
              <span style={{ color: "var(--text-muted)", marginLeft: "auto", fontSize: "0.78rem" }}>
                {item.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
