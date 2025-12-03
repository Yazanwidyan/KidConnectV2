// LeaveTypeModal.jsx

import React, { useEffect, useState } from "react";

const LeaveTypeModal = ({ isOpen, onClose, onAdd, onUpdate, editData }) => {
  const [leaveCode, setLeaveCode] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setLeaveCode(editData.leaveCode);
      setNameEn(editData.nameEn);
      setNameAr(editData.nameAr);
    } else {
      setLeaveCode("");
      setNameEn("");
      setNameAr("");
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!leaveCode.trim() || !nameEn.trim() || !nameAr.trim()) {
      setError("All fields are required.");
      return;
    }

    const data = {
      id: editData?.id,
      enabled: editData?.enabled ?? true,
      leaveCode,
      nameEn,
      nameAr,
    };

    editData ? onUpdate(data) : onAdd(data);

    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {editData ? "Edit Leave Type" : "Add Leave Type"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Leave Code</label>
            <input
              type="text"
              value={leaveCode}
              onChange={(e) => setLeaveCode(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Leave Type (English)</label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Leave Type (Arabic)</label>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

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

export default LeaveTypeModal;
