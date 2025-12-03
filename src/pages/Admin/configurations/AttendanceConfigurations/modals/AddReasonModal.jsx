// AddReasonModal.js

import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const AddReasonModal = ({ isOpen, onClose, onSubmit, editData }) => {
  const [code, setCode] = useState("");
  const [reasonEn, setReasonEn] = useState("");
  const [reasonAr, setReasonAr] = useState("");
  const [error, setError] = useState("");

  // Populate fields when editing
  useEffect(() => {
    if (editData) {
      setCode(editData.code);
      setReasonEn(editData.reasonEn);
      setReasonAr(editData.reasonAr);
    } else {
      setCode("");
      setReasonEn("");
      setReasonAr("");
    }
  }, [editData]);

  const handleSave = () => {
    if (!code.trim() || !reasonEn.trim() || !reasonAr.trim()) {
      setError("All fields are required.");
      return;
    }

    onSubmit({
      id: editData ? editData.id : Date.now(),
      code,
      reasonEn,
      reasonAr,
    });

    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{editData ? "Edit Reason" : "Add Reason"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Code */}
          <div>
            <label className="mb-1 block font-medium text-gray-700">Reason Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-teal-600"
              placeholder="Enter reason code"
            />
          </div>

          {/* English */}
          <div>
            <label className="mb-1 block font-medium text-gray-700">Reason (English)</label>
            <input
              type="text"
              value={reasonEn}
              onChange={(e) => setReasonEn(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-teal-600"
              placeholder="Enter reason in English"
            />
          </div>

          {/* Arabic */}
          <div>
            <label className="mb-1 block font-medium text-gray-700">Reason (Arabic)</label>
            <input
              type="text"
              value={reasonAr}
              onChange={(e) => setReasonAr(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-teal-600"
              placeholder="Enter reason in Arabic"
              dir="rtl"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            {editData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReasonModal;
