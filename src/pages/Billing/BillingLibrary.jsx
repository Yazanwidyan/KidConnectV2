import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { useBilling } from "../../context/BillingContext";

export default function Library() {
  const { plans, createPlan, updatePlan } = useBilling();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", frequency: "Weekly", amount: "" });

  const filtered = plans.filter((p) => p.name?.toLowerCase().includes(search?.toLowerCase()));

  function handleEdit(plan) {
    setEditing(plan);
    setForm({ name: plan.name, frequency: plan.frequency, amount: (plan.amount / 100).toFixed(2) });
    setModalOpen(true);
  }

  function save() {
    const payload = {
      name: form.name,
      frequency: form.frequency,
      amount: Math.round(parseFloat(form.amount) * 100),
    };
    if (editing) {
      updatePlan(editing.id, payload);
    } else {
      createPlan(payload);
    }
    setModalOpen(false);
    setEditing(null);
    setForm({ name: "", frequency: "Weekly", amount: "" });
  }

  return (
    <div className="w-full p-6">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="mb-0 text-2xl font-semibold">Billing Library</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plan templates..."
              className="w-64 rounded-lg border py-2 pl-10 pr-3 text-sm"
            />
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setForm({ name: "", frequency: "Weekly", amount: "" });
              setModalOpen(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Create a new plan template
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="px-4 py-3">Billing plan</th>
              <th className="px-4 py-3">Billing frequency</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-blue-600">{row.name}</td>
                <td className="px-4 py-3">{row.frequency}</td>
                <td className="px-4 py-3">{(row.amount / 100).toFixed(2)}</td>
                <td className="space-x-2 px-4 py-3">
                  <button
                    onClick={() => handleEdit(row)}
                    className="rounded bg-blue-500 px-3 py-1 text-white"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              {editing ? "Edit Plan Template" : "New Plan Template"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                name="name"
                placeholder="Billing Plan"
                className="rounded border px-3 py-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <select
                name="frequency"
                className="rounded border px-3 py-2"
                value={form.frequency}
                onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                required
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="rounded border px-3 py-2"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
                min="0"
                step="0.01"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
