import React, { useState } from "react";

const Leaves = () => {
  const [requests] = useState([
    {
      id: 101,
      employee: "John Doe",
      role: "Teacher",
      startDate: "2025-01-08",
      endDate: "2025-01-10",
      type: "Sick Leave",
      status: "Pending",
    },
    {
      id: 102,
      employee: "Sarah Ahmed",
      role: "Admin",
      startDate: "2025-01-12",
      endDate: "2025-01-12",
      type: "Casual Leave",
      status: "Approved",
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-3xl font-bold">Employee Leave Requests</h2>

      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Employee</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Start</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">End</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="px-6 py-3">{req.employee}</td>
                <td className="px-6 py-3">{req.role}</td>
                <td className="px-6 py-3">{req.startDate}</td>
                <td className="px-6 py-3">{req.endDate}</td>
                <td className="px-6 py-3">{req.type}</td>
                <td className="px-6 py-3">
                  <span
                    className={`rounded px-3 py-1 text-sm text-white ${
                      req.status === "Approved"
                        ? "bg-green-600"
                        : req.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  {req.status === "Pending" && (
                    <div className="flex gap-2">
                      <button className="rounded bg-green-600 px-3 py-1 text-white">Approve</button>
                      <button className="rounded bg-red-600 px-3 py-1 text-white">Reject</button>
                    </div>
                  )}

                  {req.status !== "Pending" && <span className="text-gray-500">No Actions</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaves;
