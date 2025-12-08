import {
  BanknotesIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-black">Invoices</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <BanknotesIcon className="h-4 w-4 stroke-[2]" /> <h5>Finance</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary">Invoices</span>
              </li>
            </ol>
          </nav>
        </div>
        <Link
          to="/admin/finance/add-invoice"
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <DocumentIcon className="h-5 w-5" /> Add Invoice
        </Link>
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          name="invoice"
          placeholder="Invoice No, Bill to or Student"
          value={filters.invoice}
          onChange={handleFilterChange}
          className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
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
                <th key={col} className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-gray-400/60">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv, index) => (
                <tr key={inv.id} className="transition odd:bg-gray-100 even:bg-white hover:bg-gray-50">
                  <td className="px-6 py-3 font-normal text-gray-700">{index + 1}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{inv.invoiceNo}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{inv.billTo}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{inv.student}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{inv.invoiceDate}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{inv.dueDate}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{inv.amount}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{inv.balanceDue}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">
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
                  <td className="flex justify-end gap-2 px-6 py-3">
                    {/* View Invoice */}
                    <button
                      onClick={() => setViewInvoice(inv)}
                      className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                    >
                      <EyeIcon className="h-5 w-5 stroke-[2]" />
                    </button>

                    {/* Record Payment */}
                    <button
                      onClick={() => setRecordPaymentInvoice(inv)}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <CurrencyDollarIcon className="h-5 w-5 stroke-[2]" />
                    </button>

                    {/* Delete Invoice */}
                    <button
                      onClick={() => console.log("Delete invoice", inv.id)}
                      className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1"
                    >
                      <TrashIcon className="h-5 w-5 stroke-[2]" />
                    </button>
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
