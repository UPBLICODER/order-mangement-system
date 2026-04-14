import { Button, Card } from "../components/ui";
import { useDashboard } from "../hooks/useDashboard";
import { recentActivity } from "../data/activity";

import HeroCard from "../components/dashboard/HeroCard";
import StatusGrid from "../components/dashboard/StatusGrid";
import DistributionCard from "../components/dashboard/DistributionCard";
import RecentActivity from "../components/dashboard/RecentActivity";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { loading, error, stats, distribution, isEmpty } = useDashboard();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-2xl opacity-30" />
          </div>
        </div>

        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-start gap-4 relative z-10">
          <div className="max-w-full">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent break-words">
              Dashboard Overview
            </h1>

            <p className="text-sm text-gray-400 mt-1 break-words">
              Monitor orders, performance & activity
            </p>
          </div>

          <Button
            onClick={() => navigate("/create")}
            className="shrink-0 cursor-pointer"
          >
            + New Order
          </Button>
        </div>

        {/* ERROR STATE */}
        {!loading && error && (
          <Card className="mt-8 text-red-300 border-red-500/20">
            Failed to load dashboard data
          </Card>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && isEmpty && (
          <Card className="mt-8 text-center py-12 flex flex-col items-center">
            <div className="w-12 h-12 bg-white/5 rounded-full mb-3 flex items-center justify-center">
              📦
            </div>
            <p className="text-gray-400">No orders yet</p>
            <p className="text-xs text-gray-500 mt-1">
              Start by creating your first order
            </p>
            <Button
              onClick={() => navigate("/create")}
              className="mt-4 cursor-pointer"
            >
              + New Order
            </Button>
          </Card>
        )}

        {/* MAIN */}
        {!error && !isEmpty && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 relative z-10 animate-fadeIn items-start">
            {/* LEFT */}
            <div className="lg:col-span-2 flex flex-col gap-6 h-full">
              <HeroCard loading={loading} stats={stats} />
              <StatusGrid loading={loading} stats={stats} />
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <DistributionCard loading={loading} distribution={distribution} />
              <RecentActivity items={recentActivity} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
