import { Card } from "../ui";

export default function ChartCard({ stats }) {
  const total = stats.total;

  const data = [
    { label: "Completed", value: stats.completed, color: "bg-green-400" },
    { label: "Pending", value: stats.pending, color: "bg-yellow-400" },
    { label: "In Progress", value: stats.in_progress, color: "bg-blue-400" },
    { label: "Cancelled", value: stats.cancelled, color: "bg-red-400" },
  ];

  return (
    <Card className="p-5 border border-white/5">
      <h2 className="text-sm text-gray-400 mb-4">Order Breakdown</h2>

      <div className="space-y-3">
        {data.map((item) => {
          const percent = (item.value / total) * 100;

          return (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{item.label}</span>
                <span>{item.value}</span>
              </div>

              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
