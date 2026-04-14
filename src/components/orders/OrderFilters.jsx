import { Input, Badge } from "../ui";
import { cn } from "../../utils/cn";
import { ChevronDown, ChevronUp,Search } from "lucide-react";
import { useState } from "react";

export default function OrderFilters({
  search,
  setSearch,
  filters,
  setFilters,
}) {
  const [openDropdowns, setOpenDropdowns] = useState({});

  //  handle filter change
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //  toggle dropdown
  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  //  clear all
  const clearFilters = () => {
    setSearch("");
    setFilters({
      status: "all",
      priority: "all",
      date: "all",
    });
    setOpenDropdowns({});
  };

  const hasActive =
    search ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.date !== "all";

  return (
    <div className="space-y-4">
      {/*  SEARCH */}
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID, customer name..."
          className="pl-10 pr-10"
        />

        {/* icon */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white-500 text-sm">
          <Search size={16}/>
        </span>

        {/* clear */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* 🎯 FILTER ROW */}
      <div className="flex flex-wrap items-center gap-3">
        {/* STATUS */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => updateFilter("status", e.target.value)}
            onFocus={() => toggleDropdown("status")}
            onBlur={() =>
              setTimeout(
                () => setOpenDropdowns((prev) => ({ ...prev, status: false })),
                150,
              )
            }
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 pr-8 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200 cursor-pointer appearance-none"
          >
            <option value="all" className="bg-[#0b0f1a] text-white">
              All Status
            </option>
            <option value="pending" className="bg-[#0b0f1a] text-yellow-400">
              Pending
            </option>
            <option value="in_progress" className="bg-[#0b0f1a] text-blue-400">
              In Progress
            </option>
            <option value="completed" className="bg-[#0b0f1a] text-green-400">
              Completed
            </option>
            <option value="cancelled" className="bg-[#0b0f1a] text-red-400">
              Cancelled
            </option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            {openDropdowns.status ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
        </div>

        {/* PRIORITY */}
        <div className="relative">
          <select
            value={filters.priority}
            onChange={(e) => updateFilter("priority", e.target.value)}
            onFocus={() => toggleDropdown("priority")}
            onBlur={() =>
              setTimeout(
                () =>
                  setOpenDropdowns((prev) => ({ ...prev, priority: false })),
                150,
              )
            }
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 pr-8 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200 cursor-pointer appearance-none"
          >
            <option value="all" className="bg-[#0b0f1a] text-white">
              All Priority
            </option>
            <option value="high" className="bg-[#0b0f1a] text-red-400">
              High
            </option>
            <option value="medium" className="bg-[#0b0f1a] text-yellow-400">
              Medium
            </option>
            <option value="low" className="bg-[#0b0f1a] text-green-400">
              Low
            </option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            {openDropdowns.priority ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
        </div>

        {/* DATE */}
        <div className="relative">
          <select
            value={filters.date}
            onChange={(e) => updateFilter("date", e.target.value)}
            onFocus={() => toggleDropdown("date")}
            onBlur={() =>
              setTimeout(
                () => setOpenDropdowns((prev) => ({ ...prev, date: false })),
                150,
              )
            }
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 pr-8 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all duration-200 cursor-pointer appearance-none"
          >
            <option value="all" className="bg-[#0b0f1a] text-white">
              All Time
            </option>
            <option value="7d" className="bg-[#0b0f1a] text-white">
              Last 7 days
            </option>
            <option value="30d" className="bg-[#0b0f1a] text-white">
              Last 30 days
            </option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            {openDropdowns.date ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>
        </div>

        {/* CLEAR */}
        {hasActive && (
          <button
            onClick={clearFilters}
            className="text-xs text-gray-400 hover:text-white transition"
          >
            Clear all
          </button>
        )}
      </div>

      {/* 🧠 ACTIVE FILTER CHIPS (PRO UX) */}
      {/* {hasActive && (
        <div className="flex flex-wrap gap-2">
          {search && <Badge value="search" className="text-xs" />}

          {filters.status !== "all" && (
            <Badge value={filters.status} className="text-xs" />
          )}

          {filters.priority !== "all" && (
            <Badge value={filters.priority} className="text-xs" />
          )}

          {filters.date !== "all" && (
            <Badge value={filters.date} className="text-xs" />
          )}
        </div>
      )} */}
      {hasActive && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <button onClick={() => setSearch("")}>
              <Badge value="Search" className="cursor-pointer" />
            </button>
          )}

          {filters.status !== "all" && (
            <button onClick={() => updateFilter("status", "all")}>
              <Badge value={filters.status} />
            </button>
          )}

          {filters.priority !== "all" && (
            <button onClick={() => updateFilter("priority", "all")}>
              <Badge value={filters.priority} />
            </button>
          )}

          {filters.date !== "all" && (
            <button onClick={() => updateFilter("date", "all")}>
              <Badge value={filters.date} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
