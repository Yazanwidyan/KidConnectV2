import React from "react";
import { FiX } from "react-icons/fi";

const ViewInvoiceModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Invoice Details</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-2">
          <p>
            <strong>Invoice No:</strong> {invoice.invoiceNo}
          </p>
          <p>
            <strong>Bill To:</strong> {invoice.billTo}
          </p>
          <p>
            <strong>Student:</strong> {invoice.student}
          </p>
          <p>
            <strong>Invoice Date:</strong> {invoice.invoiceDate}
          </p>
          <p>
            <strong>Due Date:</strong> {invoice.dueDate}
          </p>
          <p>
            <strong>Amount:</strong> {invoice.amount}
          </p>
          <p>
            <strong>Balance Due:</strong> {invoice.balanceDue}
          </p>
          <p>
            <strong>Status:</strong> {invoice.status}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-100">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;
