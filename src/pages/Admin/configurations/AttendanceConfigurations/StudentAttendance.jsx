// StudentAttendance.js

import React, { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

import AddReasonModal from "./modals/AddReasonModal";

const StudentAttendance = () => {
  const [attendanceMode, setAttendanceMode] = useState("present-absent");
  const [autoCheckout, setAutoCheckout] = useState(false);
  const [autoCheckoutInterval, setAutoCheckoutInterval] = useState(1);

  const [kioskMode, setKioskMode] = useState(false);
  const [requireSignature, setRequireSignature] = useState(false);
  const [allowParentsAbsent, setAllowParentsAbsent] = useState(false);
  const [captureReason, setCaptureReason] = useState(false);

  const [reasons, setReasons] = useState([
    { id: 1, code: "S01", reasonEn: "Sick", reasonAr: "مريض" },
    { id: 2, code: "F01", reasonEn: "Family Emergency", reasonAr: "طارئ عائلي" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (reason) => {
    setEditData(reason);
    setIsModalOpen(true);
  };

  const handleSaveReason = (newReason) => {
    if (editData) {
      // update existing
      setReasons((prev) => prev.map((r) => (r.id === newReason.id ? newReason : r)));
    } else {
      // add new
      setReasons((prev) => [...prev, newReason]);
    }
  };

  const handleDeleteReason = (id) => {
    setReasons((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="w-full space-y-8 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-xl font-semibold text-gray-800">Student Attendance Settings</h1>

      {/* Attendance Mode */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-800">Attendance Mode</h2>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="present-absent"
              checked={attendanceMode === "present-absent"}
              onChange={() => setAttendanceMode("present-absent")}
              className="h-5 w-5 text-teal-600"
            />
            Present / Absent Mode
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="checkin-checkout"
              checked={attendanceMode === "checkin-checkout"}
              onChange={() => setAttendanceMode("checkin-checkout")}
              className="h-5 w-5 text-teal-600"
            />
            Check-In / Check-Out Mode
          </label>
        </div>
      </div>

      {/* Auto Checkout */}
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoCheckout}
            onChange={() => setAutoCheckout(!autoCheckout)}
            className="h-5 w-5 text-teal-600"
          />
          Auto Checkout
        </label>

        <div>
          <label className="mb-1 block font-medium text-gray-700">Auto Checkout Interval (hours)</label>
          <input
            type="number"
            min="1"
            disabled={!autoCheckout}
            value={autoCheckoutInterval}
            onChange={(e) => setAutoCheckoutInterval(Number(e.target.value))}
            className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-teal-600 ${
              !autoCheckout && "cursor-not-allowed bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* Parent Options */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-800">Parent Options</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={kioskMode}
            onChange={() => setKioskMode(!kioskMode)}
            className="h-5 w-5 text-teal-600"
          />
          Kiosk Mode for Parents
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={requireSignature}
            onChange={() => setRequireSignature(!requireSignature)}
            className="h-5 w-5 text-teal-600"
          />
          Require Signature from Parents
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allowParentsAbsent}
            onChange={() => setAllowParentsAbsent(!allowParentsAbsent)}
            className="h-5 w-5 text-teal-600"
          />
          Allow Parents to Mark Student Absent
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={captureReason}
            onChange={() => setCaptureReason(!captureReason)}
            className="h-5 w-5 text-teal-600"
          />
          Capture Absence Reason
        </label>
      </div>

      {/* Reasons Table */}
      {captureReason && (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Absent Reasons</h2>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
            >
              <FiPlus /> Add Reason
            </button>
          </div>

          <table className="w-full border text-left">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">English</th>
                <th className="px-4 py-2">Arabic</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody>
              {reasons.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="px-4 py-2">{r.code}</td>
                  <td className="px-4 py-2">{r.reasonEn}</td>
                  <td className="px-4 py-2">{r.reasonAr}</td>

                  <td className="flex gap-3 px-4 py-2">
                    <button onClick={() => openEditModal(r)} className="text-blue-600 hover:text-blue-800">
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() => handleDeleteReason(r.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reason Modal */}
      <AddReasonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveReason}
        editData={editData}
      />
    </div>
  );
};

export default StudentAttendance;
