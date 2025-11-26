import React, { useState } from "react";

import { useAdmissions } from "../../../context/AdmissionsContext";
import { usePaperwork } from "../../../context/PaperworkContext";

export default function NewPacketModal({ onClose }) {
  const { addPacket } = useAdmissions();
  const { forms } = usePaperwork();

  const [form, setForm] = useState({
    name: "",
    due: "",
    fee: 0,
    status: "Active",
    formIds: [], // ← store selected form IDs
  });

  function toggleFormSelection(id) {
    setForm((prev) => {
      const exists = prev.formIds.includes(id);
      return {
        ...prev,
        formIds: exists ? prev.formIds.filter((f) => f !== id) : [...prev.formIds, id],
      };
    });
  }

  function handleCreate() {
    addPacket({
      ...form,
      students: 0,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[450px] rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Create New Packet</h2>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            className="w-full rounded border p-2"
            placeholder="Packet Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="date"
            className="w-full rounded border p-2"
            value={form.due}
            onChange={(e) => setForm({ ...form, due: e.target.value })}
          />

          <input
            type="number"
            className="w-full rounded border p-2"
            value={form.fee}
            onChange={(e) => setForm({ ...form, fee: parseFloat(e.target.value) })}
          />

          <select
            className="w-full rounded border p-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>Draft</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Forms Selection */}
        <div className="mt-5">
          <h3 className="text-md mb-2 font-medium">Select Forms:</h3>

          <div className="max-h-40 space-y-2 overflow-y-auto rounded border p-2">
            {forms.length === 0 ? (
              <p className="text-sm text-gray-500">No forms available.</p>
            ) : (
              forms.map((f) => (
                <label key={f.id} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.formIds.includes(f.id)}
                    onChange={() => toggleFormSelection(f.id)}
                  />
                  <span>{f.name}</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300">
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
