import React from "react";
import { cn } from "../../utils/cn";

export default function Button({
  variant = "primary",
  children,
  className,
  type = "button",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-indigo-500/30",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
    ghost: "bg-transparent text-gray-300 hover:bg-white/5",
    danger:
      "bg-red-500/90 text-white hover:bg-red-500 shadow-lg shadow-red-500/20",
  };

  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
