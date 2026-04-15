import { Card } from "../ui";
import Skeleton from "../ui/Skeleton";
import { useOrders } from "../../context/OrderContext";
import { generateActivity } from "../../utils/generateActivity";
import { formatDate } from "../../utils/formatDate";
import { Bell } from "lucide-react";
import { useMemo } from "react";

export default function ActivityPanel({ loading }) {
  const { orders } = useOrders();

  const activity = useMemo(() => generateActivity(orders), [orders]);

  const getDotColor = (type) => {
    switch (type) {
      case "created":
        return "bg-blue-400";
      case "updated":
        return "bg-yellow-400";
      case "success":
        return "bg-green-400";
      case "danger":
        return "bg-red-400";
      default:
        return "bg-indigo-400";
    }
  };

  // ✅ SKELETON (same pattern as DistributionCard)
  if (loading) {
    return (
      <Card>
        <Skeleton className="h-[420px]" />
      </Card>
    );
  }

  if (!activity.length) {
    return (
      <Card className="text-center py-10">
        <p className="text-gray-500 text-sm">No activity yet</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-full bg-indigo-500/10">
          <Bell size={16} className="text-indigo-400" />
        </div>
        <h2 className="text-sm text-gray-400">Recent Activity</h2>
      </div>

      {/* SCROLL AREA */}
      <div className="max-h-[420px] overflow-y-auto pr-2">
        <div className="relative">
          {activity.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[24px_1fr] gap-4 relative"
            >
              {/* TIMELINE */}
              <div className="relative flex justify-center">
                {index !== activity.length - 1 && (
                  <div className="absolute top-6 bottom-[-24px] w-[2px] bg-white/10" />
                )}

                <div
                  className={`w-3 h-3 mt-3 rounded-full ${getDotColor(
                    item.type,
                  )}`}
                />
              </div>

              {/* CONTENT */}
              <div className="hover:bg-white/5 p-2 rounded-lg transition">
                <p className="text-sm text-gray-300 leading-snug">
                  <span className="text-white font-medium">
                    #{item.orderId}
                  </span>{" "}
                  {item.message}
                </p>

                <span className="text-xs text-gray-500">
                  {formatDate(item.time)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
