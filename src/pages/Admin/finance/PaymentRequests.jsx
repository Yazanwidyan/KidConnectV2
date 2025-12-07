import { BanknotesIcon, CheckIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
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
    <div className="w-full p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-primaryFont">Payment Requests</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <BanknotesIcon className="h-4 w-4 stroke-[2]" /> <h5>Finance</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary">Payment Requests</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          name="search"
          placeholder="Request ID, Invoice Number, Title"
          value={filters.search}
          onChange={handleFilterChange}
          className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={filters.customer}
          onChange={handleFilterChange}
          className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <div className="flex items-center rounded-lg border px-3 py-2 text-sm">
          <FiCalendar className="mr-2 text-gray-500" />
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="text-sm outline-none"
          />
        </div>
        <div className="flex items-center rounded-lg border px-3 py-2 text-sm">
          <FiCalendar className="mr-2 text-gray-500" />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="text-sm outline-none"
          />
        </div>
        <button className="rounded bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20">Filter</button>
        <button
          onClick={resetFilters}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
          <thead>
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
                <th key={col} className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-gray-400/60">
            {filteredRows.length > 0 ? (
              filteredRows.map((row, idx) => (
                <tr key={idx} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                  <td className="px-6 py-3 font-normal text-gray-700">{row.bill}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">-</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{row.date}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{row.due}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{row.amount}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-3">
                    {/* View Request */}
                    <button
                      onClick={() => console.log("View request", idx)}
                      className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                    >
                      <EyeIcon className="h-5 w-5 stroke-[2]" />
                    </button>

                    {/* Approve / Process Request */}
                    <button
                      onClick={() => console.log("Approve request", idx)}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <CheckIcon className="h-5 w-5 stroke-[2]" />
                    </button>

                    {/* Delete Request */}
                    <button
                      onClick={() => console.log("Delete request", idx)}
                      className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1"
                    >
                      <TrashIcon className="h-5 w-5 stroke-[2]" />
                    </button>
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
