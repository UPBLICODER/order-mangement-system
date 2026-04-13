import { Card } from "../ui";

export default function RecentActivity({ items }) {
  return (
    <Card>
      <h2 className="text-sm text-gray-400 mb-5">Recent Activity</h2>

      <div className="relative border-l border-white/10 pl-4 space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative hover:bg-white/5 p-2 rounded-lg transition"
          >
            <div
              className={`absolute -left-[9px] w-2 h-2 mt-2 rounded-full ${item.color}`}
            />

            <p className="text-sm text-gray-300">
              <span className="text-white font-medium">{item.order}</span>{" "}
              {item.message}
            </p>

            <span className="text-xs text-gray-500">{item.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}