import { cn } from "../../utils/cn";

export default function Card({ children, className = "",...props }) {
  return (
    <div
     {...props}
      className={cn(
        "relative rounded-2xl border border-white/5",
        "bg-white/[0.03] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        "p-5 transition-all duration-300",
        "hover:border-white/10 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-indigo-500/10",
        className,
      )}
    >
      {children}
    </div>
  );
}