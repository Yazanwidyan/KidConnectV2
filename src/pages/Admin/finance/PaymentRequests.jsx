import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

export default function PaymentRequests() {
  const [search, setSearch] = useState("");

  const rows = [
    { bill: "MAYSA", date: "08/01/2024", due: "09/01/2024", amount: "8.000 BHD", status: "Open" },
    { bill: "SALMA", date: "08/01/2024", due: "09/01/2024", amount: "8.000 BHD", status: "Open" },
    { bill: "Sara", date: "08/01/2024", due: "09/01/2024", amount: "8.000 BHD", status: "Open" },
    { bill: "MARYAM SALEH", date: "04/01/2024", due: "11/01/2024", amount: "8.000 BHD", status: "Open" },
    { bill: "AZZA SALIM", date: "04/01/2024", due: "07/01/2024", amount: "8.000 BHD", status: "Paid" },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-600";
      case "Paid":
        return "bg-green-100 text-green-600";
      case "Overdue":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Filters Section */}
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-white p-6 shadow md:grid-cols-4">
        <input
          type="text"
          placeholder="Request ID, External Invoice Number, Title"
          className="w-full rounded-lg border p-3 text-sm"
        />
        <input type="text" placeholder="Customer Name" className="w-full rounded-lg border p-3 text-sm" />
        <select className="w-full rounded-lg border p-3 text-sm">
          <option>Status</option>
          <option>Open</option>
          <option>Paid</option>
          <option>Overdue</option>
        </select>
        <div className="flex w-full items-center rounded-lg border p-3 text-sm">
          <FiCalendar className="mr-2 text-gray-500" />
          <input type="date" className="w-full outline-none" />
        </div>
        <div className="flex w-full items-center rounded-lg border p-3 text-sm">
          <FiCalendar className="mr-2 text-gray-500" />
          <input type="date" className="w-full outline-none" />
        </div>
        <button className="rounded-lg bg-teal-500 px-6 py-2 text-sm text-white">FILTER</button>
        <button className="rounded-lg border px-6 py-2 text-sm">RESET</button>
      </div>

      {/* Table */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-gray-500">0 Item Selected</span>
          <button className="rounded-lg bg-teal-500 px-6 py-2 text-sm text-white">SUBMIT</button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-600">
              <th className="p-3">Bill To</th>
              <th className="p-3">External Invoice Number</th>
              <th className="p-3">Request Date</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Options</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b text-sm">
                <td className="p-3">{r.bill}</td>
                <td className="p-3">-</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">{r.due}</td>
                <td className="p-3">{r.amount}</td>
                <td className="p-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(r.status)}`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-3">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
