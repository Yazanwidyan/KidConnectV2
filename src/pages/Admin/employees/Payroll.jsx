import React, { useState } from "react";

const Payroll = () => {
  const [payroll] = useState([
    {
      id: 1,
      employee: "John Doe",
      role: "Teacher",
      month: "January 2025",
      salary: 3000,
      deductions: 200,
      net: 2800,
      status: "Paid",
    },
    {
      id: 2,
      employee: "Sarah Ahmed",
      role: "Admin",
      month: "January 2025",
      salary: 2500,
      deductions: 0,
      net: 2500,
      status: "Pending",
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-3xl font-bold">Employee Payroll</h2>

      <div className="mb-4 flex gap-4">
        <select className="rounded border px-3 py-2">
          <option>January 2025</option>
          <option>December 2024</option>
          <option>November 2024</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Employee</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Month</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Salary</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Deductions</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Net Pay</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {payroll.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-3">{p.employee}</td>
                <td className="px-6 py-3">{p.role}</td>
                <td className="px-6 py-3">{p.month}</td>
                <td className="px-6 py-3">${p.salary}</td>
                <td className="px-6 py-3">${p.deductions}</td>
                <td className="px-6 py-3 font-bold">${p.net}</td>
                <td className="px-6 py-3">
                  <span
                    className={`rounded px-3 py-1 text-sm text-white ${
                      p.status === "Paid" ? "bg-green-600" : "bg-yellow-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-6 py-3">
                  {p.status === "Pending" ? (
                    <button className="rounded bg-blue-600 px-3 py-1 text-white">Pay Now</button>
                  ) : (
                    <span className="text-gray-500">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
