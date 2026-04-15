import { useState } from "react";
import { Card } from "../ui";
import Skeleton from "../ui/Skeleton";

// Tailwind v3 Hex Mappings
const colorMap = {
  "bg-yellow-500": "#f59e0b", // Pending
  "bg-blue-500": "#3b82f6", // In Progress
  "bg-green-500": "#10b981", // Completed
  "bg-red-500": "#ef4444", // Cancelled
};

export default function DistributionCard({ loading, distribution }) {
  const [hovered, setHovered] = useState(null);

  if (loading) return <Skeleton className="h-[260px]" />;

  const total = distribution.reduce((a, b) => a + b.value, 0);

  // Calculate segments for the Conic Gradient
  let cumulativeValue = 0;
  const segments = distribution.map((item) => {
    const isHighlighted = hovered === item.key;
    const barHexColor = colorMap[item.bar] || "#6366f1";

    // When hovering: highlighted gets 100% opacity, others get 20% opacity (33)
    const segmentColor = hovered
      ? isHighlighted
        ? barHexColor
        : `${barHexColor}33`
      : barHexColor;

    const segment = {
      color: segmentColor,
      start: cumulativeValue,
      end: cumulativeValue + item.percentage,
    };

    cumulativeValue += item.percentage;
    return segment;
  });

  const gradientString = segments
    .map((s) => `${s.color} ${s.start}% ${s.end}%`)
    .join(", ");

  const active = distribution.find((d) => d.key === hovered);

  return (
    <Card>
      <h2 className="text-sm text-gray-400 mb-5 font-medium">
        Order Distribution
      </h2>

      {/* DONUT SECTION */}
      <div className="flex justify-center mb-8">
        <div className="relative w-40 h-40">
          <div
            className="w-full h-full rounded-full transition-all duration-300 ease-in-out"
            style={{
              background: `conic-gradient(${gradientString})`,
              transform: hovered ? "scale(1.02)" : "scale(1)",
            }}
          />
          {/* Inner Circle (The Hole) */}
          <div className="absolute inset-8 bg-[#0b0f1a] rounded-full flex items-center justify-center shadow-inner">
            <div className="text-center">
              <p className="text-2xl font-bold text-white transition-all">
                {active ? active.value : total}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                {active ? active.label : "Total Orders"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BAR SECTION */}
      <div className="space-y-4">
        {distribution.map((item) => (
          <div
            key={item.key}
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
            className="group cursor-pointer"
          >
            <div className="flex justify-between text-xs mb-1.5">
              <span
                className={`transition-colors ${hovered === item.key ? "text-white" : "text-gray-400"}`}
              >
                {item.label}
              </span>
              <span className="text-gray-300 font-mono">
                {item.percentage}%
              </span>
            </div>

            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`${item.bar} h-full transition-all duration-500 ease-out ${
                  hovered && hovered !== item.key ? "opacity-20" : "opacity-100"
                }`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
