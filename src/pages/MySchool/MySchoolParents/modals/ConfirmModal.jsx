import React from "react";

const ConfirmModal = ({ title, message, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-gray-600">{message}</p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded border px-4 py-2">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded bg-red-500 px-4 py-2 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
