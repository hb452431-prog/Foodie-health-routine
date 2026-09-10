import React from "react";
import { CATEGORIES_DATA } from "../data/categoriesData";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CategorySection({ onSelectCategory }) {
  return (
    <section style={{ padding: "3rem 0 3.5rem" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Discover Categories</span>
          </div>
          <h2 className="section-title">Routines Designed Around You</h2>
          <p className="section-subtitle">
            Choose from health-focused, fitness-driven, or lifestyle meal systems
            curated for your daily vitality.
          </p>
        </div>

        <div className="categories-grid">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelectCategory(cat.id)}
            >
              <div>
                <div
                  className="category-icon-wrapper"
                  style={{
                    background: cat.bgLight,
                    color: cat.color,
                  }}
                >
                  <span style={{ fontSize: "1.6rem" }}>{cat.emoji}</span>
                </div>
                <h3 className="category-title">{cat.name}</h3>
                <p className="category-desc">{cat.description}</p>
              </div>

              <div className="category-footer">
                <span>{cat.count} curated routines</span>
                <ArrowRight size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
