import { Card, Badge } from "../../ui";
import { formatCurrency } from "../../../utils/formatCurrency";

export default function OrderSummary({ order }) {
  const progressMap = {
    pending: 25,
    in_progress: 60,
    completed: 100,
    cancelled: 100,
  };

  return (
    <Card className="space-y-5">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* CUSTOMER */}
        <div>
          <p className="text-xs text-gray-400">Customer</p>
          <h2 className="text-lg font-semibold">{order.customerName}</h2>
          <p className="text-xs text-gray-500">{order.email}</p>
        </div>

        {/* STATUS */}
        <div>
          <p className="text-xs text-gray-400 mb-1">Status</p>
          <Badge value={order.status} />
        </div>

        {/* AMOUNT */}
        <div className="md:text-right">
          <p className="text-xs text-gray-400">Total Amount</p>
          <p className="text-xl font-semibold">
            {formatCurrency(order.amount)}
          </p>
        </div>
      </div>

      {/* PROGRESS */}
      <div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-700"
            style={{ width: `${progressMap[order.status]}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
