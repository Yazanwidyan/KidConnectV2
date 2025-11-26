import React from "react";
import { useParams } from "react-router-dom";

import { useBilling } from "../../../context/BillingContext";

const AllTransactions = () => {
  const { id: studentId } = useParams();
  const { students, invoices, payments } = useBilling();

  const student = students.find((s) => s.id === studentId);

  // Combine invoices and payments into a single transactions array
  // Normalize data for display
  const transactions = [
    ...invoices
      .filter((inv) => inv.studentId === studentId)
      .map((inv) => ({
        id: inv.id,
        date: inv.date,
        description: inv.description,
        amount: (inv.amount / 100).toFixed(2),
        status: inv.status,
        type: "Invoice",
      })),
    ...payments
      .filter((pmt) => pmt.studentId === studentId)
      .map((pmt) => ({
        id: pmt.id,
        date: pmt.date,
        description: "Payment",
        amount: (pmt.amount / 100).toFixed(2),
        status: "Completed",
        type: "Payment",
      })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)); // sort by date descending

  return (
    <div className="p-6 font-sans">
      <h2 className="mb-4 text-2xl font-semibold">
        {student ? `${student.name}'s` : "Student's"} All Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found for this student.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{tx.date}</td>
                  <td className="px-4 py-2">{tx.description}</td>
                  <td className="px-4 py-2">{tx.amount}</td>
                  <td className="px-4 py-2">{tx.status}</td>
                  <td className="px-4 py-2">{tx.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
