import React, { useMemo, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import RecordPaymentModal from "./modals/RecordPaymentModal";
import ViewInvoiceModal from "./modals/ViewInvoiceModal";

const Invoices = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [viewInvoice, setViewInvoice] = useState(null);
  const [recordPaymentInvoice, setRecordPaymentInvoice] = useState(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    invoice: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const invoices = [
    {
      id: 1,
      invoiceNo: "INV-10021",
      billTo: "MARYAM SALEH",
      student: "RAHAF EBRAHIM",
      invoiceDate: "2024-01-07",
      dueDate: "2024-01-14",
      amount: "16.500 BHD",
      balanceDue: "16.500 BHD",
      status: "Open",
    },
    {
      id: 2,
      invoiceNo: "INV-10020",
      billTo: "FATIMA BADER",
      student: "NAYLA LORI",
      invoiceDate: "2024-01-04",
      dueDate: "2024-01-26",
      amount: "25.000 BHD",
      balanceDue: "25.000 BHD",
      status: "Open",
    },
    {
      id: 3,
      invoiceNo: "INV-10019",
      billTo: "AHMED EBRAHIM",
      student: "SAMA AHMED",
      invoiceDate: "2024-01-04",
      dueDate: "2024-01-26",
      amount: "20.000 BHD",
      balanceDue: "25.000 BHD",
      status: "Overdue",
    },
  ];

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const resetFilters = () => setFilters({ invoice: "", status: "", startDate: "", endDate: "" });

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const invoiceMatch =
        filters.invoice === "" ||
        inv.invoiceNo.toLowerCase().includes(filters.invoice.toLowerCase()) ||
        inv.billTo.toLowerCase().includes(filters.invoice.toLowerCase()) ||
        inv.student.toLowerCase().includes(filters.invoice.toLowerCase());

      const statusMatch = filters.status === "" || inv.status === filters.status;
      const startDateMatch = filters.startDate === "" || inv.invoiceDate >= filters.startDate;
      const endDateMatch = filters.endDate === "" || inv.dueDate <= filters.endDate;

      return invoiceMatch && statusMatch && startDateMatch && endDateMatch;
    });
  }, [invoices, filters]);

  const handleSavePayment = (invoiceId, amountPaid) => {
    console.log(`Payment recorded for Invoice ${invoiceId}: ${amountPaid}`);
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-primaryFont text-3xl font-bold">Invoices</h1>
        <button
          onClick={() => navigate("/admin/finance/add-invoice")}
          className="flex items-center gap-2 rounded border border-teal-600 bg-teal-600 px-5 py-2 font-semibold text-white hover:bg-teal-700"
        >
          <FiPlus className="h-4 w-4" /> Add Invoice
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          name="invoice"
          placeholder="Invoice No, Bill to or Student"
          value={filters.invoice}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <button
          onClick={resetFilters}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "#",
                "Invoice No",
                "Bill To",
                "Student",
                "Invoice Date",
                "Due Date",
                "Amount",
                "Balance Due",
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
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv, index) => (
                <tr key={inv.id} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3 font-medium text-teal-700">{inv.invoiceNo}</td>
                  <td className="px-6 py-3">{inv.billTo}</td>
                  <td className="px-6 py-3">{inv.student}</td>
                  <td className="px-6 py-3">{inv.invoiceDate}</td>
                  <td className="px-6 py-3">{inv.dueDate}</td>
                  <td className="px-6 py-3">{inv.amount}</td>
                  <td className="px-6 py-3">{inv.balanceDue}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        inv.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : inv.status === "Open"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="relative px-6 py-3">
                    <button
                      onClick={() => setActiveMenu(activeMenu === inv.id ? null : inv.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FaEllipsisV />
                    </button>
                    {activeMenu === inv.id && (
                      <div className="absolute right-0 z-20 mt-2 w-40 rounded border bg-white shadow-lg">
                        <button
                          onClick={() => {
                            setViewInvoice(inv);
                            setActiveMenu(null);
                          }}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setRecordPaymentInvoice(inv);
                            setActiveMenu(null);
                          }}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Record Payment
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
                <td colSpan={10} className="px-6 py-3 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ViewInvoiceModal isOpen={!!viewInvoice} onClose={() => setViewInvoice(null)} invoice={viewInvoice} />
      <RecordPaymentModal
        isOpen={!!recordPaymentInvoice}
        onClose={() => setRecordPaymentInvoice(null)}
        invoice={recordPaymentInvoice}
        onSave={handleSavePayment}
      />
    </div>
  );
};

export default Invoices;
