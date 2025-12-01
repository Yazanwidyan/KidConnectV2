import { Field, Form, Formik } from "formik";
import React from "react";
import { FiX } from "react-icons/fi";

const AssignGroupModal = ({ isOpen, onClose, onAssign }) => {
  if (!isOpen) return null;

  // Sample groups data
  const groups = [
    { id: 1, name: "Group A" },
    { id: 2, name: "Group B" },
    { id: 3, name: "Group C" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Assign Groups</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ selectedGroups: [] }}
          onSubmit={(values) => {
            onAssign(values.selectedGroups);
            onClose();
          }}
        >
          {() => (
            <Form className="mt-4 space-y-4">
              <div className="max-h-64 overflow-y-auto rounded-lg border p-2">
                {groups.map((group) => (
                  <label
                    key={group.id}
                    className="flex cursor-pointer items-center justify-between rounded-md border-b px-3 py-2 hover:bg-gray-50"
                  >
                    <span>{group.name}</span>
                    <Field
                      type="checkbox"
                      name="selectedGroups"
                      value={group.id.toString()}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600"
                    />
                  </label>
                ))}
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AssignGroupModal;
