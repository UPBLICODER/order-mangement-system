import { Card } from "../../ui";

const steps = [
  { key: "pending", label: "Pending" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

export default function OrderTimeline({ order }) {
  const currentIndex = steps.findIndex((s) => s.key === order.status);

  const progress =
    currentIndex <= 0 ? 0 : (currentIndex / (steps.length - 1)) * 100;

  return (
    <Card>
      <h2 className="text-sm text-gray-400 mb-6">Order Progress</h2>

      <div className="relative px-2">
        {/* ================= CIRCLES + LINE ROW ================= */}
        <div className="grid grid-cols-3 relative h-8">
          {/* BASE LINE */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2" />

          {/* ACTIVE LINE */}
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-indigo-500 transition-all duration-500 -translate-y-1/2"
            style={{ width: `${progress}%` }}
          />

          {/* CIRCLES */}
          {steps.map((step, index) => {
            const active = index <= currentIndex;

            return (
              <div
                key={step.key}
                className="flex justify-center items-center z-10"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                    active
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                      : "bg-[#1a1f2e] text-gray-500 border border-white/10"
                  }`}
                >
                  {active ? "✓" : index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= LABEL ROW ================= */}
        <div className="grid grid-cols-3 mt-2">
          {steps.map((step, index) => {
            const active = index <= currentIndex;

            return (
              <p
                key={step.key}
                className={`text-center text-xs ${
                  active ? "text-white" : "text-gray-500"
                }`}
              >
                {step.label}
              </p>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
