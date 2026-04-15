export const generateActivity = (orders) => {
  const activity = [];

  orders.forEach((order) => {
    // CREATED
    activity.push({
      id: `${order.id}-created`,
      type: "created",
      orderId: order.id,
      message: `Order created`,
      time: order.createdAt,
    });

    // UPDATED
    if (order.updatedAt) {
      activity.push({
        id: `${order.id}-updated`,
        type: "updated",
        orderId: order.id,
        message: `Order updated`,
        time: order.updatedAt,
      });
    }

    // STATUS BASED INSIGHT (real SaaS behavior)
    if (order.status === "completed") {
      activity.push({
        id: `${order.id}-completed`,
        type: "success",
        orderId: order.id,
        message: `Order marked completed `,
        time: order.updatedAt || order.createdAt,
      });
    }

    if (order.status === "cancelled") {
      activity.push({
        id: `${order.id}-cancelled`,
        type: "danger",
        orderId: order.id,
        message: `Order marked cancelled`,
        time: order.updatedAt || order.createdAt,
      });
    }
  });

  // sort latest first
  return activity.sort((a, b) => new Date(b.time) - new Date(a.time));
};
