import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { useOrders } from "../context/OrderContext";
import OrderForm from "../components/orders/form/OrderForm";

export default function CreateOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder } = useOrders();

  const isEdit = Boolean(id);
  const existingOrder = isEdit ? getOrder(id) : null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[140%] h-[140%] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-3xl opacity-30" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              {isEdit ? "Edit Order" : "Create Order"}
            </h1>
            <p className="text-sm text-gray-400">
              {isEdit ? "Update order details" : "Add a new order"}
            </p>
          </div>

          <Button variant="ghost" onClick={() => navigate("/orders")}>
            Back
          </Button>
        </div>

        {/* FORM */}
        <OrderForm defaultValues={existingOrder} isEdit={isEdit} />
      </div>
    </div>
  );
}
