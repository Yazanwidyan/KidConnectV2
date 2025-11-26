import React, { useState } from "react";

import { useAdmissions } from "../../../context/AdmissionsContext";

export default function StudentModal({ student, onClose }) {
  const { addStudent, updateStudent } = useAdmissions();

  // Detect if editing or adding
  const isEdit = !!student;

  const [form, setForm] = useState({
    name: student?.name || "",
    age: student?.age || "",
    programs: student?.programs?.join(", ") || "",
    desiredStart: student?.desiredStart || "",
    status: student?.status || "Prospect",
  });

  function handleSave() {
    const formattedStudent = {
      ...form,
      programs: form.programs
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    if (isEdit) {
      updateStudent(student.id, formattedStudent);
    } else {
      addStudent({
        id: crypto.randomUUID(),
        ...formattedStudent,
      });
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">{isEdit ? "Edit Student" : "Add Student"}</h2>

        {/* Form */}
        <div className="space-y-3">
          <input
            className="w-full rounded border p-2"
            placeholder="Student Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full rounded border p-2"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <input
            className="w-full rounded border p-2"
            placeholder="Programs (comma separated)"
            value={form.programs}
            onChange={(e) => setForm({ ...form, programs: e.target.value })}
          />

          <input
            type="date"
            className="w-full rounded border p-2"
            value={form.desiredStart}
            onChange={(e) => setForm({ ...form, desiredStart: e.target.value })}
          />

          <select
            className="w-full rounded border p-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            {["Prospect", "Toured", "Applied", "Waitlist"].map((st) => (
              <option key={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300">
            Cancel
          </button>

          <button onClick={handleSave} className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
            {isEdit ? "Save Changes" : "Add Student"}
          </button>
        </div>
      </div>
    </div>
  );
}
