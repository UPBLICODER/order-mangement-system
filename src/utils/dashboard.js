export function getDashboardStats(orders) {
  const stats = {
    total: orders.length,
    pending: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  };

  orders.forEach((order) => {
    if (stats[order.status] !== undefined) {
      stats[order.status]++;
    }
  });

  return stats;
}