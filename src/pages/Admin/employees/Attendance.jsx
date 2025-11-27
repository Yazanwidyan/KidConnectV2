import React, { useState } from "react";

const Attendance = () => {
  const [records] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Teacher",
      date: "2025-01-05",
      status: "Present",
      checkIn: "08:01 AM",
      checkOut: "04:15 PM",
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      role: "Admin",
      date: "2025-01-05",
      status: "Absent",
      checkIn: "-",
      checkOut: "-",
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-3xl font-bold">Employee Attendance</h2>

      <div className="mb-4 flex gap-4">
        <input type="date" className="rounded border px-3 py-2" />
        <select className="rounded border px-3 py-2">
          <option value="">All Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Check In</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Check Out</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {records.map((rec) => (
              <tr key={rec.id}>
                <td className="px-6 py-3">{rec.name}</td>
                <td className="px-6 py-3">{rec.role}</td>
                <td className="px-6 py-3">{rec.date}</td>
                <td className="px-6 py-3">
                  <span
                    className={`rounded px-3 py-1 text-sm text-white ${
                      rec.status === "Present"
                        ? "bg-green-600"
                        : rec.status === "Late"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    }`}
                  >
                    {rec.status}
                  </span>
                </td>
                <td className="px-6 py-3">{rec.checkIn}</td>
                <td className="px-6 py-3">{rec.checkOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
