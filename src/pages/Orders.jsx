import { useState } from "react";
import { Button, Card } from "../components/ui";
import { useNavigate } from "react-router-dom";

import OrderFilters from "../components/orders/OrderFilters";
import OrderTable from "../components/orders/OrderTable";

export default function Orders() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    date: "all",
  });

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[140%] h-[140%] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
        {/* HERO HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Orders Management
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Search, filter and manage all orders in one place
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Dashboard
            </Button>

            <Button
              onClick={() => navigate("/create")}
              className="cursor-pointer"
            >
              + New Order
            </Button>
          </div>
        </div>

        {/* FLOATING FILTERS */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-lg shadow-indigo-500/5">
          <OrderFilters
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white/[0.02] md:border md:border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden">
          {/* top bar */}
          <div className="flex justify-between items-center px-5 py-3 ">
            <p className="text-sm text-gray-400">Showing orders</p>

            <p className="text-xs text-gray-500">Updated just now</p>
          </div>

          <div className="p-0">
            <OrderTable search={search} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
}
