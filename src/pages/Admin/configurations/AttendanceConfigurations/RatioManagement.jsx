import React, { useState } from "react";

export default function RatioManagement() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="min-h-screen space-y-6 bg-secondary p-6">
      <h1 className="text-2xl font-bold text-gray-800">Ratio Management Settings</h1>

      {/* Ratio Management Card */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Ratio Management</h2>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <span className="font-medium text-gray-700">Enable Ratio Management</span>

          {/* Checkbox Toggle */}
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="peer sr-only"
            />

            {/* Background Track */}
            <div className="peer h-6 w-12 rounded-full bg-gray-300 transition-all peer-checked:bg-teal-500"></div>

            {/* Circle Knob */}
            <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-md transition-all peer-checked:translate-x-6"></div>
          </label>
        </div>
      </div>

      {/* Employee Schedule Card */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Employee Schedule</h2>

        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          {/* Start Time */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Employee Start Time</label>
            <input
              type="time"
              className="w-40 rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              defaultValue="06:00"
            />
          </div>

          {/* End Time */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Employee End Time</label>
            <input
              type="time"
              className="w-40 rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              defaultValue="14:00"
            />
          </div>
        </div>
      </div>

      {/* Student Schedule Card */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Student Schedule</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-3">Sl. No</th>
                <th className="border p-3">Group Type</th>
                <th className="border p-3">Start Time</th>
                <th className="border p-3">End Time</th>
                <th className="border p-3">Teacher Ratio</th>
              </tr>
            </thead>
            <tbody>
              {["Babies", "Toddlers", "Pre-KG"].map((group, index) => (
                <tr key={index} className="border transition-colors hover:bg-gray-50">
                  <td className="border p-3">{index + 1}</td>
                  <td className="cursor-pointer border p-3 text-teal-600 underline hover:text-teal-800">
                    {group}
                  </td>
                  <td className="border p-3">
                    <input type="time" className="w-full rounded-lg border px-2 py-1" />
                  </td>
                  <td className="border p-3">
                    <input type="time" className="w-full rounded-lg border px-2 py-1" />
                  </td>
                  <td className="border p-3">
                    <input placeholder="Students / Teachers" className="w-full rounded-lg border px-2 py-1" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
