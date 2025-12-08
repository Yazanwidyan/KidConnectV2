import { BanknotesIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      billTo: "MARYAM SALEH",
      invoiceNo: "INV-10021",
      date: "08/01/2024",
      amount: 16.5,
      status: "Open",
    },
    { id: 2, billTo: "FATIMA BADER", invoiceNo: "INV-10020", date: "10/01/2024", amount: 25, status: "Paid" },
    {
      id: 3,
      billTo: "AHMED EBRAHIM",
      invoiceNo: "INV-10019",
      date: "05/01/2024",
      amount: 20,
      status: "Overdue",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredPayments = payments.filter(
    (p) =>
      (p.billTo.toLowerCase().includes(search.toLowerCase()) ||
        p.invoiceNo.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus === "" || p.status === filterStatus)
  );

  const statusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-700";
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-black">Payments</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <BanknotesIcon className="h-4 w-4 stroke-[2]" /> <h5>Finance</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary">Payments</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-4 rounded bg-white p-4 shadow md:grid-cols-4">
        <input
          type="text"
          placeholder="Bill To or Invoice No"
          className="rounded border px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded border px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <div className="flex items-center rounded border px-3 py-2">
          <FiCalendar className="mr-2 text-gray-500" />
          <input type="date" className="w-full outline-none" />
        </div>
        <div className="flex items-center rounded border px-3 py-2">
          <FiCalendar className="mr-2 text-gray-500" />
          <input type="date" className="w-full outline-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Bill To</th>
              <th className="px-6 py-3">Invoice No</th>
              <th className="px-6 py-3">Payment Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{p.billTo}</td>
                <td className="px-6 py-3">{p.invoiceNo}</td>
                <td className="px-6 py-3">{p.date}</td>
                <td className="px-6 py-3">{p.amount} BHD</td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => alert(`View Payment for ${p.invoiceNo}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
