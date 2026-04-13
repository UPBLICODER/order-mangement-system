import React from "react";
import { cn } from "../../utils/cn";

export default function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-xs text-gray-400">{label}</label>}

      <input
        className={cn(
          "w-full px-3 py-2 rounded-xl",
          "bg-white/5 border border-white/10",
          "text-sm text-white placeholder-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/40",
          "transition-all duration-200",
          error && "border-red-500/50 focus:ring-red-500/40",
          className,
        )}
        {...props}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}