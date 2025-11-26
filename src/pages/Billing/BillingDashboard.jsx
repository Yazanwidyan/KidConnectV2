import React, { useState } from "react";

import { useBilling } from "../../context/BillingContext";

function Dashboard() {
  const { totals, invoices, students } = useBilling();
  const [selectedRoom, setSelectedRoom] = useState("All Rooms");

  // Extract unique rooms from students + add "All Rooms" option
  const rooms = ["All Rooms", ...Array.from(new Set(students.map((s) => s.room)))];

  // Filter invoices by selected room
  const filtered =
    selectedRoom === "All Rooms"
      ? invoices
      : invoices.filter((i) => {
          const st = students.find((s) => s.id === i.studentId);
          return st?.room === selectedRoom;
        });

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-6 text-3xl font-bold">Billing Dashboard</h1>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded bg-blue-500 p-4 text-white shadow">
          <p className="text-lg font-semibold">Total Invoices</p>
          <p className="mt-2 text-2xl">{totals.totalInvoices}</p>
        </div>
        <div className="rounded bg-green-500 p-4 text-white shadow">
          <p className="text-lg font-semibold">Paid</p>
          <p className="mt-2 text-2xl">{totals.paid}</p>
        </div>
        <div className="rounded bg-yellow-500 p-4 text-white shadow">
          <p className="text-lg font-semibold">Pending</p>
          <p className="mt-2 text-2xl">{totals.pending}</p>
        </div>
        <div className="rounded bg-red-500 p-4 text-white shadow">
          <p className="text-lg font-semibold">Overdue</p>
          <p className="mt-2 text-2xl">{totals.overdue}</p>
        </div>
      </div>

      {/* Room Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="rounded border border-gray-300 px-2 py-1"
        >
          {rooms.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-2 text-left">Child Name</th>
              <th className="px-4 py-2 text-left">Room</th>
              <th className="px-4 py-2 text-left">Invoice Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => {
              const st = students.find((s) => s.id === inv.studentId);
              return (
                <tr key={inv.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{st?.name || "Unknown"}</td>
                  <td className="px-4 py-2">{st?.room || "N/A"}</td>
                  <td className="px-4 py-2">{inv.date}</td>
                  <td className="px-4 py-2">${(inv.amount / 100).toFixed(2)}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      inv.status === "Paid"
                        ? "text-green-600"
                        : inv.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {inv.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
