import React, { useState } from "react";
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
  const invoices = [
    {
      id: 1,
      invoiceNo: "INV-10021",
      billTo: "MARYAM SALEH",
      student: "RAHAF EBRAHIM",
      invoiceDate: "07/01/2024",
      dueDate: "14/01/2024",
      amount: "16.500 BHD",
      balanceDue: "16.500 BHD",
      status: "Open",
    },
    {
      id: 2,
      invoiceNo: "INV-10020",
      billTo: "FATIMA BADER",
      student: "NAYLA LORI",
      invoiceDate: "04/01/2024",
      dueDate: "26/01/2024",
      amount: "25.000 BHD",
      balanceDue: "25.000 BHD",
      status: "Open",
    },
    {
      id: 3,
      invoiceNo: "INV-10019",
      billTo: "AHMED EBRAHIM",
      student: "SAMA AHMED",
      invoiceDate: "04/01/2024",
      dueDate: "26/01/2024",
      amount: "20.000 BHD",
      balanceDue: "25.000 BHD",
      status: "Overdue",
    },
  ];

  const handleSavePayment = (invoiceId, amountPaid) => {
    console.log(`Payment recorded for Invoice ${invoiceId}: ${amountPaid}`);
    // update invoice balance logic here
  };

  return (
    <div className="space-y-6 p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Invoices</h1>
        <button
          onClick={() => navigate("/admin/finance/add-invoice")}
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white shadow-lg transition hover:bg-teal-700"
        >
          <FiPlus /> ADD INVOICE
        </button>
      </div>

      {/* Filter Box */}
      <div className="space-y-4 rounded-lg border bg-white p-5 shadow-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Invoice No, Bill to or student"
            className="w-full rounded-lg border px-3 py-2"
          />

          <input type="date" className="w-full rounded-lg border px-3 py-2" />

          <input type="date" className="w-full rounded-lg border px-3 py-2" />

          <select className="w-full rounded-lg border px-3 py-2">
            <option value="">Select</option>
            <option value="Open">Open</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">FILTER</button>

          <button className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">RESET</button>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">0 Items Selected</span>

        <select className="rounded-lg border px-3 py-2">
          <option value="">Select</option>
          <option value="Mark Paid">Mark as Paid</option>
          <option value="Delete">Delete</option>
        </select>

        <button className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">SUBMIT</button>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-lg">
        <table className="w-full min-w-[900px]">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-3 text-left">Invoice No.</th>
              <th className="px-6 py-3 text-left">Bill To</th>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Invoice Date</th>
              <th className="px-6 py-3 text-left">Due date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Balance Due</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Options</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-3 font-medium text-teal-700">{item.invoiceNo}</td>
                <td className="px-6 py-3">{item.billTo}</td>
                <td className="px-6 py-3">{item.student}</td>
                <td className="px-6 py-3">{item.invoiceDate}</td>
                <td className="px-6 py-3">{item.dueDate}</td>
                <td className="px-6 py-3">{item.amount}</td>
                <td className="px-6 py-3">{item.balanceDue}</td>
                <td className="px-6 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      item.status === "Open"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="relative px-6 py-3">
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                    className="text-gray-600 hover:text-black"
                  >
                    <FaEllipsisV />
                  </button>

                  {activeMenu === item.id && (
                    <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                      <button
                        onClick={() => {
                          setViewInvoice(item);
                          setActiveMenu(null);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setRecordPaymentInvoice(item);
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
            ))}
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
