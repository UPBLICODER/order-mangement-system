import { Card } from "../ui";
import Skeleton from "../ui/Skeleton";
import { statusConfig } from "../../constants/orderStatusConfig";
import { useNavigate } from "react-router-dom";

export default function StatusGrid({ loading, stats }) {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[90px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statusConfig.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.key}
            onClick={() => navigate(`/orders?status=${item.key}`)}
            className="cursor-pointer flex justify-between items-center group hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div>
              <p className="text-xs text-gray-400">{item.label}</p>
              <h3 className={`text-xl font-semibold ${item.textColor}`}>
                {stats[item.key]}
              </h3>
            </div>

            <div
              className={`p-3 rounded-xl ${item.bg} group-hover:scale-110 transition`}
            >
              <Icon size={18} className={item.textColor} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
