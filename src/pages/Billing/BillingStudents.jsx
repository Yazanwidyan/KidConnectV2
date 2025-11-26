import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBilling } from "../../context/BillingContext";

function Students() {
  const { students, plans, updateStudent, createStudent, getStudentBalance } = useBilling();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    room: "",
    payer: "",
    method: "",
    autopay: false,
    planId: "",
  });

  function openEdit(student) {
    setForm({
      id: student.id || null,
      name: student.name || "",
      room: student.room || "",
      payer: student.payer || "",
      method: student.method || "",
      autopay: !!student.autopay,
      planId: student.planId || "",
    });
    setModalOpen(true);
  }

  function save() {
    if (form.id) updateStudent(form.id, form);
    else createStudent(form);
    setModalOpen(false);
    setForm({ id: null, name: "", room: "", payer: "", method: "", autopay: false, planId: "" });
  }

  return (
    <div className="p-6 font-sans">
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-2xl font-semibold">Billing Students</h2>
        <button
          onClick={() => {
            setForm({ id: null, name: "", room: "", payer: "", method: "", autopay: false, planId: "" });
            setModalOpen(true);
          }}
          className="ml-auto rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create Student
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Account Balance</th>
              <th className="px-4 py-2 text-left">Payer & Method</th>
              <th className="px-4 py-2 text-left">Autopay</th>
              <th className="px-4 py-2 text-left">Billing Plan</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td
                  onClick={() => navigate(`/billing/student/${student.id}/current-activity`)}
                  className="cursor-pointer px-4 py-2 text-blue-600"
                >
                  {student.name}
                </td>
                <td className="px-4 py-2">{(getStudentBalance(student.id) / 100).toFixed(2)}</td>
                <td className="px-4 py-2">
                  {student.payer ? (
                    <>
                      {student.payer} ({student.method})
                      <button
                        onClick={() => openEdit(student)}
                        className="ml-2 rounded bg-blue-500 px-2 py-1 text-white"
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => openEdit(student)}
                      className="mt-1 rounded bg-blue-500 px-3 py-1 text-white"
                    >
                      Add Payer
                    </button>
                  )}
                </td>
                <td className="px-4 py-2">{student.autopay ? "Enabled" : "Disabled"}</td>
                <td className="px-4 py-2">
                  {student.planId ? (
                    plans.find((p) => p.id === student.planId)?.name
                  ) : (
                    <button
                      onClick={() => openEdit(student)}
                      className="rounded bg-green-500 px-3 py-1 text-white"
                    >
                      Add Plan
                    </button>
                  )}
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
              {form.id ? "Edit Student" : "Create Student"}
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
                placeholder="Student Name"
                className="rounded border px-3 py-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="text"
                name="room"
                placeholder="Room"
                className="rounded border px-3 py-2"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
              />
              <input
                type="text"
                name="payer"
                placeholder="Payer Name"
                className="rounded border px-3 py-2"
                value={form.payer}
                onChange={(e) => setForm({ ...form, payer: e.target.value })}
              />
              <input
                type="text"
                name="method"
                placeholder="Payment Method"
                className="rounded border px-3 py-2"
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.autopay}
                  onChange={(e) => setForm({ ...form, autopay: e.target.checked })}
                />
                <span>Enable Autopay</span>
              </label>
              <select
                name="planId"
                className="rounded border px-3 py-2"
                value={form.planId}
                onChange={(e) => setForm({ ...form, planId: e.target.value })}
              >
                <option value="">Select Billing Plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  {form.id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
