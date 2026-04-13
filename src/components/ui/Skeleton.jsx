export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white/5 ${className}`}
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
