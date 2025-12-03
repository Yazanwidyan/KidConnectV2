import React, { useMemo, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

export default function PaymentRequests() {
  const [filters, setFilters] = useState({
    search: "",
    customer: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [activeMenu, setActiveMenu] = useState(null);

  const rows = [
    { bill: "MAYSA", date: "08/01/2024", due: "09/01/2024", amount: "8.000 BHD", status: "Open" },
    { bill: "SALMA", date: "08/01/2024", due: "09/01/2024", amount: "8.000 BHD", status: "Open" },
    { bill: "Sara", date: "08/01/2024", due: "09/01/2024", amount: "8.000 BHD", status: "Open" },
    { bill: "MARYAM SALEH", date: "04/01/2024", due: "11/01/2024", amount: "8.000 BHD", status: "Open" },
    { bill: "AZZA SALIM", date: "04/01/2024", due: "07/01/2024", amount: "8.000 BHD", status: "Paid" },
  ];

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const resetFilters = () => setFilters({ search: "", customer: "", status: "", startDate: "", endDate: "" });

  const statusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      const searchMatch =
        filters.search === "" || r.bill.toLowerCase().includes(filters.search.toLowerCase());
      const customerMatch =
        filters.customer === "" || r.bill.toLowerCase().includes(filters.customer.toLowerCase());
      const statusMatch = filters.status === "" || r.status === filters.status;
      const startDateMatch = filters.startDate === "" || r.date >= filters.startDate;
      const endDateMatch = filters.endDate === "" || r.due <= filters.endDate;
      return searchMatch && customerMatch && statusMatch && startDateMatch && endDateMatch;
    });
  }, [rows, filters]);

  return (
    <div className="w-full space-y-6 p-6">
      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-white p-6 shadow md:grid-cols-4">
        <input
          type="text"
          name="search"
          placeholder="Request ID, Invoice Number, Title"
          value={filters.search}
          onChange={handleFilterChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={filters.customer}
          onChange={handleFilterChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <div className="flex w-full items-center rounded-lg border px-3 py-2 text-sm">
          <FiCalendar className="mr-2 text-gray-500" />
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="flex w-full items-center rounded-lg border px-3 py-2 text-sm">
          <FiCalendar className="mr-2 text-gray-500" />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full text-sm outline-none"
          />
        </div>
        <button
          onClick={() => {}}
          className="rounded-lg bg-teal-500 px-6 py-2 text-sm text-white hover:bg-teal-600"
        >
          Filter
        </button>
        <button onClick={resetFilters} className="rounded-lg border px-6 py-2 text-sm hover:bg-gray-100">
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Bill To",
                "External Invoice No",
                "Request Date",
                "Due Date",
                "Amount",
                "Status",
                "Actions",
              ].map((col) => (
                <th key={col} className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRows.length > 0 ? (
              filteredRows.map((row, idx) => (
                <tr key={idx} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                  <td className="px-6 py-3">{row.bill}</td>
                  <td className="px-6 py-3">-</td>
                  <td className="px-6 py-3">{row.date}</td>
                  <td className="px-6 py-3">{row.due}</td>
                  <td className="px-6 py-3">{row.amount}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="relative px-6 py-3">
                    <button
                      onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FaEllipsisV />
                    </button>
                    {activeMenu === idx && (
                      <div className="absolute right-0 z-20 mt-2 w-36 rounded border bg-white shadow-lg">
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">View</button>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                          Approve
                        </button>
                        <button className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-3 text-center text-gray-500">
                  No payment requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
