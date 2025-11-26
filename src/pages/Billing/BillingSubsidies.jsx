import React, { useState } from "react";

import { useBilling } from "../../context/BillingContext";

export default function Subsidies() {
  const { subsidies, addSubsidy, students } = useBilling();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ studentId: "", type: "", amount: "", start: "", end: "" });

  function save() {
    if (!form.studentId || !form.type || !form.amount) {
      alert("Please fill in required fields");
      return;
    }

    addSubsidy({
      studentId: form.studentId,
      type: form.type,
      amount: Math.round(parseFloat(form.amount) * 100), // store in cents
      start: form.start,
      end: form.end,
      status: "Active",
    });
    setModalOpen(false);
    setForm({ studentId: "", type: "", amount: "", start: "", end: "" });
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Subsidies</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="ml-auto rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Subsidy
        </button>
      </div>

      <table className="min-w-full border">
        <thead className="bg-yellow-100">
          <tr>
            <th className="px-4 py-2 text-left">Child</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {subsidies.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="px-4 py-2">{students.find((x) => x.id === s.studentId)?.name || "Unknown"}</td>
              <td className="px-4 py-2">{s.type}</td>
              <td className="px-4 py-2">${(s.amount / 100).toFixed(2)}</td>
              <td className="px-4 py-2">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">Add Subsidy</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
              className="flex flex-col gap-4"
            >
              <label className="flex flex-col">
                Student:
                <select
                  name="studentId"
                  value={form.studentId}
                  onChange={onChange}
                  required
                  className="rounded border px-3 py-2"
                >
                  <option value="">Select a student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                Type:
                <input
                  name="type"
                  type="text"
                  value={form.type}
                  onChange={onChange}
                  placeholder="Subsidy type (e.g., Government, Discount)"
                  required
                  className="rounded border px-3 py-2"
                />
              </label>

              <label className="flex flex-col">
                Amount ($):
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.amount}
                  onChange={onChange}
                  placeholder="Amount in dollars"
                  required
                  className="rounded border px-3 py-2"
                />
              </label>

              <label className="flex flex-col">
                Start Date:
                <input
                  name="start"
                  type="date"
                  value={form.start}
                  onChange={onChange}
                  className="rounded border px-3 py-2"
                />
              </label>

              <label className="flex flex-col">
                End Date:
                <input
                  name="end"
                  type="date"
                  value={form.end}
                  onChange={onChange}
                  className="rounded border px-3 py-2"
                />
              </label>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
