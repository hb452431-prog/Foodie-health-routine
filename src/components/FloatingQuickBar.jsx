import React, { useState, useEffect } from "react";
import { Search, ArrowUp, Droplet, Sparkles, Plus } from "lucide-react";

export default function FloatingQuickBar({
  onOpenCommandPalette,
  waterGlasses = 0,
  onUpdateWater,
  onShowToast
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isWaterBouncing, setIsWaterBouncing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 280);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickAddWater = (e) => {
    e.stopPropagation();
    setIsWaterBouncing(true);
    setTimeout(() => setIsWaterBouncing(false), 600);
    if (onUpdateWater) {
      const nextVal = Math.min(16, Number(waterGlasses || 0) + 1);
      onUpdateWater(nextVal);
    }
    if (onShowToast) {
      onShowToast("💧 +250ml Water logged! Keep hydrated.");
    }
  };

  return (
    <div className="floating-quick-bar" aria-label="Quick Actions Floating Bar">
      {/* Quick Water Button */}
      <button
        className={`floating-bar-btn water-btn ${isWaterBouncing ? "bounce-anim" : ""}`}
        onClick={handleQuickAddWater}
        title={`Quick Log Water: ${waterGlasses}/8 Glasses (${waterGlasses * 250} ml). Click to add 250ml.`}
      >
        <Droplet size={17} fill="#0284C7" color="#0284C7" />
        <span className="floating-btn-label">{waterGlasses}/8</span>
        <Plus size={11} className="floating-plus-badge" />
      </button>

      {/* Universal Search Command Center Button */}
      <button
        className="floating-bar-btn search-btn"
        onClick={onOpenCommandPalette}
        title="Open Universal Search & Quick Navigator (Ctrl+K / ⌘K)"
      >
        <Search size={17} />
        <span className="floating-btn-label">⌘K</span>
      </button>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="floating-bar-btn top-btn"
          onClick={scrollToTop}
          title="Scroll back to top"
          aria-label="Back to top"
        >
          <ArrowUp size={17} />
        </button>
      )}
    </div>
  );
}
