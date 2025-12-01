import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const AssignStudentModal = ({ isOpen, onClose, onAssign }) => {
  // Hooks must be called unconditionally
  const [nameFilter, setNameFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  // Sample students data
  const students = [
    { id: 1, name: "John Doe", email: "john@example.com", group: "Group A" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", group: "Group B" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", group: "Group A" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", group: "Group C" },
  ];

  const groups = [...new Set(students.map((s) => s.group))];

  // Filter students based on inputs
  const filteredStudents = students.filter((s) => {
    const matchesName = s.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesGroup = groupFilter ? s.group === groupFilter : true;
    return matchesName && matchesGroup;
  });

  if (!isOpen) return null; // Now safe

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Assign Students</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FiX size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Filter by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">All Groups</option>
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ selectedStudents: [] }}
          onSubmit={(values) => {
            // Convert string IDs to numbers
            const ids = values.selectedStudents.map((id) => Number(id));
            onAssign(ids);
            onClose();
          }}
        >
          {({ values, setFieldValue }) => {
            // Select All handler
            const toggleSelectAll = (e) => {
              if (e.target.checked) {
                const visibleIds = filteredStudents.map((s) => s.id.toString());
                setFieldValue("selectedStudents", visibleIds);
              } else {
                setFieldValue("selectedStudents", []);
              }
            };

            const allSelected =
              filteredStudents.length > 0 &&
              filteredStudents.every((s) => values.selectedStudents.includes(s.id.toString()));

            return (
              <Form className="mt-4 space-y-4">
                <div className="max-h-64 overflow-y-auto rounded-lg border p-2">
                  {/* Select All */}
                  {filteredStudents.length > 0 && (
                    <label className="flex items-center justify-between rounded-md border-b px-3 py-2 font-semibold">
                      <span>Select All</span>
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded border-gray-300 text-teal-600"
                      />
                    </label>
                  )}

                  {filteredStudents.length === 0 ? (
                    <div className="py-4 text-center text-gray-500">No students found</div>
                  ) : (
                    filteredStudents.map((student) => (
                      <label
                        key={student.id}
                        className="flex cursor-pointer items-center justify-between rounded-md border-b px-3 py-2 hover:bg-gray-50"
                      >
                        <span>
                          {student.name} ({student.group})
                        </span>
                        <Field
                          type="checkbox"
                          name="selectedStudents"
                          value={student.id.toString()}
                          className="h-4 w-4 rounded border-gray-300 text-teal-600"
                        />
                      </label>
                    ))
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
                  >
                    ASSIGN
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AssignStudentModal;
