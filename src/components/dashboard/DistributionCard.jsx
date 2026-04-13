import { Card } from "../ui";
import Skeleton from "../ui/Skeleton";
import { statusConfig } from "../../constants/orderStatusConfig";

export default function DistributionCard({ loading, distribution }) {
  const colorMap = Object.fromEntries(statusConfig.map((s) => [s.key, s]));

  if (loading) return <Skeleton className="h-[260px]" />;

  return (
    <Card>
      <h2 className="text-sm text-gray-400 mb-5">Order Distribution</h2>

      {/* CIRCLE VISUAL */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl" />

          {/* Ring */}
          <div className="w-full h-full rounded-full border-[6px] border-indigo-500/20 flex items-center justify-center">
            <span className="text-lg font-semibold">
              {distribution.reduce((a, b) => a + b.value, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* BARS */}
      <div className="space-y-4">
        {distribution.map((item) => (
          <div key={item.key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{item.label}</span>
              <span className="text-gray-300">{item.percentage}%</span>
            </div>

            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`${colorMap[item.key]?.bar} h-full transition-all duration-700`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
