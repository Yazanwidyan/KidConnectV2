import React from "react";
import { useParams } from "react-router-dom";

import { useBilling } from "../../../context/BillingContext";

const UpcomingInvoices = () => {
  const { id: studentId } = useParams();
  const { students, invoices } = useBilling();

  const student = students.find((s) => s.id === studentId);

  // Filter invoices with status 'Pending' or 'Overdue' (upcoming)
  const upcomingInvoices = invoices
    .filter((inv) => inv.studentId === studentId && (inv.status === "Pending" || inv.status === "Overdue"))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // sort ascending by date

  return (
    <div className="p-6 font-sans">
      <h2 className="mb-4 text-2xl font-semibold">
        {student ? `${student.name}'s` : "Student's"} Upcoming Invoices
      </h2>

      {upcomingInvoices.length === 0 ? (
        <p className="text-gray-500">No upcoming invoices.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingInvoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{inv.date}</td>
                  <td className="px-4 py-2">{(inv.amount / 100).toFixed(2)}</td>
                  <td className="px-4 py-2">{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpcomingInvoices;
