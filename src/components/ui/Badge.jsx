import React from "react";
import { cn } from "../../utils/cn";

export default function Badge({ value, className }) {
  const styles = {
    success: "bg-green-500/10 text-green-400 border border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",

    high: "bg-red-500/10 text-red-400 border border-red-500/20",
    medium: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    low: "bg-green-500/10 text-green-400 border border-green-500/20",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 text-xs rounded-full font-medium backdrop-blur-md",
        "inline-flex items-center gap-1",
        styles[value] || styles.info,
        className,
      )}
    >
      {value}
    </span>
  );
}