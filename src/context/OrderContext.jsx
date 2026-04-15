import { createContext, useContext, useEffect, useState } from "react";
import { orders as seedOrders } from "../data/orders";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // INIT FROM LOCALSTORAGE OR SEED DATA
  useEffect(() => {
    const stored = localStorage.getItem("orders");

    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      setOrders(seedOrders);
      localStorage.setItem("orders", JSON.stringify(seedOrders));
    }
  }, []);

  // SAVE ON CHANGE
  useEffect(() => {
    if (orders.length) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  // GET (FIXED - ADDED BACK)
  const getOrder = (id) => {
    return orders.find((o) => o.id === id);
  };

  // CREATE
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  // UPDATE
  const updateOrder = (id, updatedData) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, ...updatedData, updatedAt: new Date().toISOString() }
          : o,
      ),
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
};

export const useOrders = () => useContext(OrderContext);
