import { Card } from "../../ui";

export default function CustomerDetails({ order }) {
  return (
    <Card>
      <h2 className="text-sm text-gray-400 mb-4">Customer Details</h2>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-gray-500">Name</p>
          <p className="text-white">{order.customerName}</p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="text-gray-300">{order.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <p className="text-gray-300">{order.phone}</p>
        </div>

        <div>
          <p className="text-gray-500">City</p>
          <p className="text-gray-300">{order.city}</p>
        </div>

        {/* ASSIGNED */}
        <div className="pt-3 border-t border-white/5">
          <p className="text-gray-500 text-xs mb-2">Assigned To</p>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">
              {order.assignedTo ? order.assignedTo[0] : "?"}
            </div>

            <p className="text-white">{order.assignedTo || "Unassigned"}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
