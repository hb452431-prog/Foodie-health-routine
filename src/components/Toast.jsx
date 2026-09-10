import React, { useEffect } from "react";
import { CheckCircle, Info } from "lucide-react";

export default function Toast({ message, onClear }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClear();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast-message">
        <CheckCircle size={18} style={{ color: "#10B981", flexShrink: 0 }} />
        <span>{message}</span>
      </div>
    </div>
  );
}
