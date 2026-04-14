import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import CreateOrder from "./pages/CreateOrder";
import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <OrderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/create" element={<CreateOrder />} />

          <Route
            path="/orders/:id/edit"
            element={<CreateOrder mode="edit" />}
          />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;