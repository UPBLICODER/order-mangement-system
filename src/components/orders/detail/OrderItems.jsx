import { Card } from "../../ui";
import { formatCurrency } from "../../../utils/formatCurrency";

export default function OrderItems({ items }) {
  const total = items.reduce((acc, i) => acc + i.qty * i.price, 0);

  if (!items.length) {
    return (
      <Card className="text-center py-10">
        <p className="text-gray-400 text-sm">No items found</p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-sm text-gray-400 mb-4">Order Items</h2>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between border-b border-white/5 pb-3"
          >
            <div>
              <p className="text-white text-sm">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.qty}</p>
            </div>

            <div className="text-right">
              <p className="text-white text-sm">
                {formatCurrency(item.qty * item.price)}
              </p>
              <p className="text-xs text-gray-500">
                {formatCurrency(item.price)} each
              </p>
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-3 border-t border-white/10">
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-white font-semibold">{formatCurrency(total)}</p>
        </div>
      </div>
    </Card>
  );
}
