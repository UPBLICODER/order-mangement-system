import { Card, Badge } from "../ui";
import Skeleton from "../ui/Skeleton";
import { useOrders } from "../../context/OrderContext";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatCurrency";
import { Eye, Edit, Calendar, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderTable({ search, filters }) {
  const navigate = useNavigate();
  const loading = false; // simulate (later from hook)

  const { orders } = useOrders();
  
  //  FILTER
  const filtered = orders.filter((order) => {
    const matchSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filters.status === "all" || order.status === filters.status;

    const matchPriority =
      filters.priority === "all" || order.priority === filters.priority;
    
    const matchDate =
      filters.date === "all" ||
      (() => {
        const created = new Date(order.createdAt);
        const now = new Date();
        const diff = (now - created) / (1000 * 60 * 60 * 24);

        if (filters.date === "7d") return diff <= 7;
        if (filters.date === "30d") return diff <= 30;

        return true;
      })();

    return matchSearch && matchStatus && matchPriority && matchDate;
  });

  // LOADING STATE
  if (loading) {
    return (
      <Card className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </Card>
    );
  }

  //  EMPTY
  if (filtered.length === 0) {
    return (
      <Card className="text-center py-12 flex flex-col items-center">
        <div className="w-8 h-8 bg-white/5 rounded-full mb-3 flex items-center justify-center">
          <Search size={14}/>
        </div>
        <p className="text-gray-400">No orders found</p>
        <p className="text-xs text-gray-500 mt-1">
          Try adjusting your search or filters
        </p>
      </Card>
    );
  }

  return (
    <>
      {/*  DESKTOP TABLE */}
      <div className="hidden md:block">
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-500 uppercase border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Assigned</th>
                <th className="py-3 px-4 w-20"></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/5 hover:bg-white/5 transition group cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/orders/${order.id}`);
                  }}
                >
                  <td className="py-4 px-4 font-medium text-white">
                    {order.id}
                  </td>

                  <td className="px-4">
                    <div>
                      <p className="text-white">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.city}</p>
                    </div>
                  </td>

                  <td className="px-4">
                    <Badge value={order.status} />
                  </td>

                  {/* IMPROVED PRIORITY */}
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order.priority === "high"
                            ? "bg-red-400"
                            : order.priority === "medium"
                              ? "bg-yellow-400"
                              : "bg-green-400"
                        }`}
                      />
                      <span className="text-xs text-gray-300 capitalize">
                        {order.priority}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 text-gray-300">
                    {formatCurrency(order.amount)}
                  </td>

                  <td className="px-4 text-gray-400">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="px-4 text-gray-400">
                    {order.assignedTo || "—"}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4">
                    <div className="opacity-0 group-hover:opacity-100 transition flex justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/orders/${order.id}`);
                        }}
                        className="text-gray-400 hover:text-white transition text-sm p-1 rounded hover:bg-white/5 cursor-pointer"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/orders/${order.id}/edit`);
                        }}
                        className="text-gray-400 hover:text-white transition text-sm p-1 rounded hover:bg-white/5 cursor-pointer"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/*  MOBILE CARDS */}
      <div className="grid gap-4 md:hidden">
        {filtered.map((order) => (
          <Card key={order.id} className="space-y-4">
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400">Order</p>
                <p className="text-white font-semibold">{order.id}</p>
              </div>

              {/* priority */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    order.priority === "high"
                      ? "bg-red-400"
                      : order.priority === "medium"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                  }`}
                />
                <span className="text-xs text-gray-300 capitalize">
                  {order.priority}
                </span>
              </div>
            </div>

            {/* CUSTOMER */}
            <div>
              <p className="text-white">{order.customerName}</p>
              <p className="text-xs text-gray-500">{order.city}</p>
            </div>

            {/* STATUS + AMOUNT */}
            <div className="flex justify-between items-center">
              <Badge value={order.status} />
              <p className="text-white font-medium">
                {formatCurrency(order.amount)}
              </p>
            </div>

            {/* META */}
            <div className="space-y-1 text-xs text-gray-400 border-t border-white/5 pt-3">
              <p className="flex items-center gap-2">
                <Calendar size={14} />
                {formatDate(order.createdAt)}
              </p>

              <p className="flex items-center gap-2">
                <User size={14} />
                Assigned to:{" "}
                <span className="text-gray-300">
                  {order.assignedTo || "Unassigned"}
                </span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/orders/${order.id}`);
                }}
                className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Eye size={14} />
                View
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/orders/${order.id}/edit`);
                }}
                className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Edit size={14} />
                Edit
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
