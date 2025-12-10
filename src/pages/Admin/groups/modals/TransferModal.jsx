import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const TransferModal = ({ isOpen, groups, currentGroupId, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  const otherGroups = groups.filter((g) => g.id !== currentGroupId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Box */}
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Transfer Before Deleting</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="mb-4 text-gray-600">
          This group contains students or staff. Please transfer them to another group before deleting.
        </p>

        {/* Students Transfer */}
        <div className="mb-4">
          <label className="mb-1 block font-medium text-gray-700">Transfer Students To</label>
          <select
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none"
            id="studentTransfer"
          >
            <option value="">Select group</option>
            {otherGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Staff Transfer */}
        <div className="mb-4">
          <label className="mb-1 block font-medium text-gray-700">Transfer Staff To</label>
          <select
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none"
            id="staffTransfer"
          >
            <option value="">Select group</option>
            {otherGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg border border-gray-300 px-5 py-2 font-medium">
            Cancel
          </button>

          <button
            onClick={() => {
              const studentTransfer = document.getElementById("studentTransfer").value;
              const staffTransfer = document.getElementById("staffTransfer").value;
              onConfirm({ studentTransfer, staffTransfer });
            }}
            className="rounded-lg bg-primary px-5 py-2 font-medium text-white"
          >
            Transfer & Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
