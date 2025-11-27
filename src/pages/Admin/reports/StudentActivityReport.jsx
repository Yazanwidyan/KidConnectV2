import React, { useState } from "react";
import { FiCalendar, FiPrinter } from "react-icons/fi";

export default function StudentActivityReport() {
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState("");

  const students = [
    "RAHAF EBRAHIM",
    "ABDULLA MOHAMMED",
    "RAYANA NABEEL",
    "BADER MOHAMMED",
    "SAMA AHMED",
    "HUSSAIN SALEH",
    "KHULOOD ABDULLA",
  ];

  return (
    <div className="space-y-6 p-6">
      <h2 className="mb-4 text-2xl font-semibold">Student Activity report</h2>

      {/* FILTERS BOX */}
      <div className="space-y-6 rounded-lg bg-white p-6 shadow">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Group Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Group Name</label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="rounded-lg border px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Select</option>
            </select>
          </div>

          {/* Student Status */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Student Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Select</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Date Range</label>
            <div className="relative">
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="04/08/2024 - 04/08/2024"
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
              />
              <FiCalendar className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 pt-3">
          <button className="rounded-lg bg-teal-600 px-6 py-2 text-sm text-white">FILTER</button>
          <button className="rounded-lg border px-6 py-2 text-sm">RESET</button>
        </div>
      </div>

      {/* PRINT + EXPORT */}
      <div className="flex justify-end gap-3">
        <button className="flex items-center gap-2 rounded-lg border px-5 py-2 text-sm">
          <FiPrinter /> PRINT
        </button>
        <button className="rounded-lg bg-teal-600 px-5 py-2 text-sm text-white">EXPORT</button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Images</th>
              <th className="p-3 text-left">Videos</th>
              <th className="p-3 text-left">Observations</th>
              <th className="p-3 text-left">Announcements</th>
              <th className="p-3 text-left">Injury Reports</th>
              <th className="p-3 text-left">Events</th>
            </tr>
          </thead>

          <tbody>
            {students.map((name, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{name}</td>
                <td className="p-3">-</td>
                <td className="p-3">-</td>
                <td className="p-3">-</td>
                <td className="p-3">-</td>
                <td className="p-3">-</td>
                <td className="p-3">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
