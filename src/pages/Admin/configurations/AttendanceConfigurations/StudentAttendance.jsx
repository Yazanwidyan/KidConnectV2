// StudentAttendance.js

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
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
      setReasons((prev) => prev.map((r) => (r.id === newReason.id ? newReason : r)));
    } else {
      setReasons((prev) => [...prev, newReason]);
    }
  };

  const handleDeleteReason = (id) => {
    setReasons((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen space-y-6 bg-secondary p-6">
      <h1 className="text-2xl font-bold text-gray-800">Student Attendance Settings</h1>

      {/* Attendance Mode Card */}
      <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">Attendance Mode</h2>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
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

      {/* Auto Checkout Card */}
      <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
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
            className={`w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 ${
              !autoCheckout && "cursor-not-allowed bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* Parent Options Card */}
      <div className="space-y-3 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">Parent Options</h2>

        {[
          { label: "Kiosk Mode for Parents", value: kioskMode, setter: setKioskMode },
          { label: "Require Signature from Parents", value: requireSignature, setter: setRequireSignature },
          {
            label: "Allow Parents to Mark Student Absent",
            value: allowParentsAbsent,
            setter: setAllowParentsAbsent,
          },
          { label: "Capture Absence Reason", value: captureReason, setter: setCaptureReason },
        ].map((opt, i) => (
          <label key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={opt.value}
              onChange={() => opt.setter(!opt.value)}
              className="h-5 w-5 text-teal-600"
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* Reasons Table */}
      {captureReason && (
        <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Absent Reasons</h2>
            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
            >
              <FiPlus /> Add Reason
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2">Code</th>
                  <th className="px-4 py-2">English</th>
                  <th className="px-4 py-2">Arabic</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {reasons.map((r) => (
                  <tr key={r.id} className="border-b transition-colors hover:bg-gray-50">
                    <td className="px-4 py-2">{r.code}</td>
                    <td className="px-4 py-2">{r.reasonEn}</td>
                    <td className="px-4 py-2">{r.reasonAr}</td>
                    <td className="flex gap-3 px-4 py-2">
                      <button
                        onClick={() => openEditModal(r)}
                        className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                      >
                        <PencilSquareIcon className="h-5 w-5 stroke-2" />
                      </button>
                      <button
                        onClick={() => handleDeleteReason(r.id)}
                        className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1"
                      >
                        <TrashIcon className="h-5 w-5 stroke-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
