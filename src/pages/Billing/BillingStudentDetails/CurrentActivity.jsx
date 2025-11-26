import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useBilling } from "../../../context/BillingContext";

const CurrentActivity = () => {
  const { id: studentId } = useParams();
  const { students, invoices, payments, createInvoice, markInvoicePaid, getStudentBalance } = useBilling();

  // Find the student by id
  const student = students.find((s) => s.id === studentId);

  // Filter invoices and payments for this student
  const studentInvoices = invoices?.filter((i) => i.studentId === studentId) || [];
  const studentPayments = payments?.filter((p) => p.studentId === studentId) || [];

  // State for the add charge form
  const [chargeForm, setChargeForm] = useState({ desc: "", amount: "" });

  // Handler to add a new invoice charge
  const addCharge = () => {
    if (!chargeForm.desc.trim() || !chargeForm.amount.trim()) {
      alert("Please fill in both description and amount.");
      return;
    }
    const amountNumber = parseFloat(chargeForm.amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    createInvoice({
      studentId,
      date: new Date().toISOString().slice(0, 10), // format YYYY-MM-DD
      description: chargeForm.desc.trim(),
      amount: Math.round(amountNumber * 100), // store in cents
    });

    setChargeForm({ desc: "", amount: "" });
  };

  // Handler to mark an invoice as paid
  const pay = (invoice) => {
    markInvoicePaid(invoice.id, {
      studentId,
      date: new Date().toISOString().slice(0, 10),
      amount: invoice.amount,
      method: "Manual",
    });
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">
        {student ? student.name : `Student ID: ${studentId}`} - Billing Activity
      </h1>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded bg-green-100 p-4">
          Balance: ${(getStudentBalance(studentId) / 100).toFixed(2)}
        </div>
        <div className="rounded bg-blue-100 p-4">Invoices: {studentInvoices.length}</div>
        <div className="rounded bg-yellow-100 p-4">Payments: {studentPayments.length}</div>
      </div>

      {/* Add Charge Form */}
      <div className="mb-4 rounded bg-white p-4 shadow">
        <h3 className="mb-2 font-semibold">Add Charge</h3>
        <input
          type="text"
          value={chargeForm.desc}
          onChange={(e) => setChargeForm((f) => ({ ...f, desc: e.target.value }))}
          placeholder="Description"
          className="mb-2 w-full rounded border px-3 py-2"
        />
        <input
          type="number"
          value={chargeForm.amount}
          onChange={(e) => setChargeForm((f) => ({ ...f, amount: e.target.value }))}
          placeholder="Amount"
          className="mb-2 w-full rounded border px-3 py-2"
          min="0"
          step="0.01"
        />
        <div className="flex justify-end">
          <button
            onClick={addCharge}
            className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <h3 className="mb-2 font-semibold">Invoices</h3>
      <div className="mb-4 overflow-x-auto rounded bg-white p-4 shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border-b px-2 py-1 text-left">Date</th>
              <th className="border-b px-2 py-1 text-left">Description</th>
              <th className="border-b px-2 py-1 text-right">Amount</th>
              <th className="border-b px-2 py-1 text-left">Status</th>
              <th className="border-b px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {studentInvoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-2 py-4 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            ) : (
              studentInvoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-1">{inv.date}</td>
                  <td className="px-2 py-1">{inv.description}</td>
                  <td className="px-2 py-1 text-right">${(inv.amount / 100).toFixed(2)}</td>
                  <td className="px-2 py-1">{inv.status}</td>
                  <td className="px-2 py-1">
                    {inv.status !== "Paid" && (
                      <button
                        onClick={() => pay(inv)}
                        className="rounded bg-green-500 px-2 py-1 text-white transition hover:bg-green-600"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Payments Table */}
      <h3 className="mb-2 font-semibold">Payments</h3>
      <div className="overflow-x-auto rounded bg-white p-4 shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border-b px-2 py-1 text-left">Date</th>
              <th className="border-b px-2 py-1 text-right">Amount</th>
              <th className="border-b px-2 py-1 text-left">Method</th>
            </tr>
          </thead>
          <tbody>
            {studentPayments.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-2 py-4 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            ) : (
              studentPayments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-1">{p.date}</td>
                  <td className="px-2 py-1 text-right">${(p.amount / 100).toFixed(2)}</td>
                  <td className="px-2 py-1">{p.method}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentActivity;
