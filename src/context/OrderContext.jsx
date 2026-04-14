import { createContext, useContext, useState } from "react";
import { orders as initialOrders } from "../data/orders";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders);

  // GET
  const getOrder = (id) => {
    return orders.find((o) => o.id === id);
  };

  // ADD
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  // UPDATE
  const updateOrder = (id, updatedData) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updatedData } : o)),
    );
  };

  // DELETE
  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{ orders, getOrder, addOrder, updateOrder, deleteOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
