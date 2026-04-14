import { useParams, useNavigate } from "react-router-dom";
import { orders } from "../data/orders";
import { Button } from "../components/ui";
import Skeleton from "../components/ui/Skeleton";

import OrderSummary from "../components/orders/detail/OrderSummary";
import OrderTimeline from "../components/orders/detail/OrderTimeline";
import CustomerDetails from "../components/orders/detail/CustomerDetails";
import NotesSection from "../components/orders/detail/NotesSection";
import OrderItems from "../components/orders/detail/OrderItems";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f1a] text-gray-400">
        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4">
          ⚠️
        </div>

        <p className="text-lg text-white">Order not found</p>
        <p className="text-sm text-gray-500 mt-1">
          The order you are looking for does not exist
        </p>

        <Button onClick={() => navigate("/orders")} className="mt-5 cursor-pointer">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[140%] h-[140%] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400">Order Details</p>
            <h1 className="text-2xl font-semibold">{order.id}</h1>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/orders")} className="cursor-pointer">
              Back
            </Button>
            <Button className="cursor-pointer">Edit Order</Button>
          </div>
        </div>

        {/* SUMMARY */}
        <OrderSummary order={order} />

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <OrderTimeline order={order} />
            <OrderItems items={order.items || []} />
            <NotesSection initialNotes={order.notes || []} />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <CustomerDetails order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}
