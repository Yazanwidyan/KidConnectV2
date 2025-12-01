import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const RecordPaymentModal = ({ isOpen, onClose, invoice, onSave }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState(invoice ? invoice.balanceDue : "");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");

  if (!isOpen || !invoice) return null;

  const handleSave = () => {
    if (onSave) {
      onSave(invoice.id, {
        paymentDate,
        amountPaid: parseFloat(amountPaid),
        paymentMethod,
        notes,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Record Payment</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FiX size={20} />
          </button>
        </div>

        {/* Invoice Details */}
        <div className="mb-4 space-y-1 border-b pb-2">
          <p>
            <strong>Invoice No:</strong> {invoice.invoiceNo}
          </p>
          <p>
            <strong>Bill To:</strong> {invoice.billTo}
          </p>
          <p>
            <strong>Total / Balance:</strong> {invoice.balanceDue}
          </p>
        </div>

        {/* Payment Details Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Payment Date</label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">Payment Amount</label>
            <input
              type="number"
              min="0"
              max={parseFloat(invoice.balanceDue)}
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="Cash">Cash</option>
              <option value="Visa">Visa</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add notes..."
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordPaymentModal;
