import React, { useState } from "react";

export default function RatioManagement() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="space-y-8 p-6">
      {/* Ratio Management Toggle */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Ratio Management</h2>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <span className="font-medium text-gray-700">Enable Ratio Management</span>
          {/* Ratio Management Toggle */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Ratio Management</h2>

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
                <div className="peer h-6 w-11 rounded-full bg-gray-300 transition-all peer-checked:bg-teal-500"></div>

                {/* Circle Knob */}
                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Schedule */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Employee Schedule</h2>

        <div className="space-y-6">
          {/* Start Time */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Employee Start Time</label>
            <input
              type="time"
              className="w-40 rounded-lg border px-3 py-2 text-gray-700 shadow-sm focus:ring-teal-500"
              defaultValue="06:00"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Employee End Time</label>
            <input
              type="time"
              className="w-40 rounded-lg border px-3 py-2 text-gray-700 shadow-sm focus:ring-teal-500"
              defaultValue="14:00"
            />
          </div>
        </div>
      </div>

      {/* Student Schedule */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Student Schedule</h2>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-3 text-left">Sl. No</th>
              <th className="border p-3 text-left">Group Type</th>
              <th className="border p-3 text-left">Start Time</th>
              <th className="border p-3 text-left">End Time</th>
              <th className="border p-3 text-left">Teacher Ratio</th>
            </tr>
          </thead>

          <tbody>
            {["Babies", "Toddlers", "Pre-KG"].map((group, index) => (
              <tr key={index} className="border">
                <td classname="border p-3">{index + 1}</td>
                <td className="cursor-pointer border p-3 text-teal-600 underline">{group}</td>
                <td className="border p-3">
                  <input type="time" className="rounded-lg border px-2 py-1" />
                </td>
                <td className="border p-3">
                  <input type="time" className="rounded-lg border px-2 py-1" />
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
  );
}
