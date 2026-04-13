import { Card, Button } from "../ui";
import Skeleton from "../ui/Skeleton";
import { useNavigate } from "react-router-dom";
import { statusConfig } from "../../constants/orderStatusConfig";

export default function HeroCard({ loading, stats }) {
  const navigate = useNavigate();
  const colorMap = Object.fromEntries(statusConfig.map((s) => [s.key, s]));

  if (loading) return <Skeleton className="h-[220px] w-full" />;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl translate-x-6 -translate-y-6 pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 w-full">
        {/* LEFT */}
        <div>
          <p className="text-xs text-gray-400">Total Orders</p>
          <h2 className="text-4xl font-bold mt-1">{stats.total}</h2>

          <div className="flex gap-2 mt-4 flex-wrap">
            {["completed", "pending", "in_progress"].map((key) => (
              <span
                key={key}
                className={`px-3 py-1 rounded-full text-xs border border-white/10 backdrop-blur-md ${colorMap[key].bg} ${colorMap[key].textColor}`}
              >
                {stats[key]} {colorMap[key].label}
              </span>
            ))}
          </div>

          <Button onClick={() => navigate("/orders")} className="mt-4">
            View Orders →
          </Button>
        </div>

        {/* RIGHT */}
        <div className="lg:text-right text-left flex flex-col items-start lg:items-end gap-2">
          <p className="text-xs text-gray-400">Weekly Growth</p>

          <div className="flex items-center gap-2">
            <span className="text-green-400 text-lg font-semibold">+12.4%</span>
            <span className="text-xs text-gray-500">vs last week</span>
          </div>

          {/* Bigger bar */}
          <div className="w-48 h-2.5 bg-white/5 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-[68%] transition-all duration-700" />
          </div>

          {/* EXTRA METRIC (boost UI) */}
          <p className="text-xs text-gray-500 mt-1">
            32 orders completed this week
          </p>
        </div>
      </div>
    </Card>
  );
}
