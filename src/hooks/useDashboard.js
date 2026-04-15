import { useMemo, useState, useEffect } from "react";
import { useOrders } from "../context/OrderContext";
import { getDashboardStats } from "../utils/dashboard";
import { statusConfig } from "../constants/orderStatusConfig";

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [error] = useState(false);

  const { orders } = useOrders();
  const stats = useMemo(() => getDashboardStats(orders), [orders]);

  const distribution = useMemo(() => {
    const total = stats.total;

    return statusConfig.map((item) => ({
      ...item,
      value: stats[item.key],
      percentage: total ? Math.round((stats[item.key] / total) * 100) : 0,
    }));
  }, [stats]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return {
    loading,
    error,
    orders,
    stats,
    distribution,
    isEmpty: orders.length === 0,
  };
}
