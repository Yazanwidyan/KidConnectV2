import React, { useEffect, useState } from "react";

const EmployeeDocumentModal = ({ isOpen, onClose, onAdd, onUpdate, editData }) => {
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [mandatory, setMandatory] = useState(false);
  const [hasExpiry, setHasExpiry] = useState(false);
  const [notifyBefore, setNotifyBefore] = useState(30);

  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setNameEn(editData.nameEn);
      setNameAr(editData.nameAr);
      setMandatory(editData.mandatory);
      setHasExpiry(editData.hasExpiry);
      setNotifyBefore(editData.notifyBefore);
    } else {
      setNameEn("");
      setNameAr("");
      setMandatory(false);
      setHasExpiry(false);
      setNotifyBefore(30);
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!nameEn.trim() || !nameAr.trim()) {
      setError("Both English and Arabic names are required.");
      return;
    }

    const data = {
      id: editData?.id,
      enabled: true,
      nameEn,
      nameAr,
      mandatory,
      hasExpiry,
      notifyBefore,
    };

    if (editData) {
      onUpdate(data);
    } else {
      onAdd(data);
    }

    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {editData ? "Edit Document" : "Add Document"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Attachment Name (English)</label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Attachment Name (Arabic)</label>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={mandatory}
              onChange={() => setMandatory(!mandatory)}
              className="h-5 w-5 text-teal-600"
            />
            Mandatory
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasExpiry}
              onChange={() => setHasExpiry(!hasExpiry)}
              className="h-5 w-5 text-teal-600"
            />
            Has Expiry
          </label>

          <div>
            <label className="block font-medium text-gray-700">Notify Before (days)</label>
            <input
              type="number"
              min="1"
              value={notifyBefore}
              onChange={(e) => setNotifyBefore(Number(e.target.value))}
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

export default EmployeeDocumentModal;
