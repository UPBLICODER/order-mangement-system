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

      <div className="relative">
        <div className="absolute top-4 left-0 w-full h-[2px] bg-white/10" />

        <div
          className="absolute top-4 left-0 h-[2px] bg-indigo-500 transition-all"
          style={{ width: `${progress}%` }}
        />

        <div className="grid grid-cols-3">
          {steps.map((step, index) => {
            const active = index <= currentIndex;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs z-10 transition ${
                    active
                      ? "bg-indigo-500 text-white"
                      : "bg-[#1a1f2e] text-gray-500 border border-white/10"
                  }`}
                >
                  {active ? "✓" : index + 1}
                </div>

                <p
                  className={`text-xs mt-2 ${
                    active ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
