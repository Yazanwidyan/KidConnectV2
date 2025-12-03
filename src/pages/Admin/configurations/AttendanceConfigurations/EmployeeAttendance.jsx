// EmployeeAttendance.js

import React, { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import LeaveTypeModal from "./modals/LeaveTypeModal";

const initialLeaves = [
  {
    id: 1,
    enabled: true,
    leaveCode: "AL",
    nameEn: "Annual Leave",
    nameAr: "إجازة سنوية",
  },
  {
    id: 2,
    enabled: false,
    leaveCode: "SL",
    nameEn: "Sick Leave",
    nameAr: "إجازة مرضية",
  },
];

const EmployeeAttendance = () => {
  // Attendance Options
  const [kioskMode, setKioskMode] = useState(false);
  const [requireSignature, setRequireSignature] = useState(false);
  const [checkInWithCode, setCheckInWithCode] = useState(false);
  const [submitLeaveMobile, setSubmitLeaveMobile] = useState(false);

  // Leave Configurations
  const [leaves, setLeaves] = useState(initialLeaves);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleAddLeave = (item) => {
    setLeaves((prev) => [...prev, { id: Date.now(), ...item }]);
  };

  const handleUpdateLeave = (updated) => {
    setLeaves((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  };

  const handleDelete = (id) => {
    setLeaves((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="w-full space-y-8 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-xl font-semibold text-gray-800">Employee Attendance Settings</h1>

      {/* Attendance Options */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-800">Attendance Options</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={kioskMode}
            onChange={() => setKioskMode(!kioskMode)}
            className="h-5 w-5 text-teal-600"
          />
          Kiosk Mode for Employees
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={requireSignature}
            onChange={() => setRequireSignature(!requireSignature)}
            className="h-5 w-5 text-teal-600"
          />
          Require Signature from Employees
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkInWithCode}
            onChange={() => setCheckInWithCode(!checkInWithCode)}
            className="h-5 w-5 text-teal-600"
          />
          Allow Employees to Check-in with a Code
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={submitLeaveMobile}
            onChange={() => setSubmitLeaveMobile(!submitLeaveMobile)}
            className="h-5 w-5 text-teal-600"
          />
          Allow Employees to Submit Leaves from Mobile
        </label>
      </div>

      {/* Leave Type Configuration */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Leave Types</h2>

          <button
            onClick={() => {
              setEditItem(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            <FiPlus /> Add Leave Type
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-3">Enabled</th>
                <th className="px-4 py-3">Leave Code</th>
                <th className="px-4 py-3">Type (English)</th>
                <th className="px-4 py-3">Type (Arabic)</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() =>
                        setLeaves((prev) =>
                          prev.map((l) => (l.id === item.id ? { ...l, enabled: !l.enabled } : l))
                        )
                      }
                      className="h-5 w-5 text-teal-600"
                    />
                  </td>

                  <td className="px-4 py-3">{item.leaveCode}</td>
                  <td className="px-4 py-3">{item.nameEn}</td>
                  <td className="px-4 py-3">{item.nameAr}</td>

                  <td className="flex items-center gap-3 px-4 py-3">
                    <button
                      onClick={() => {
                        setEditItem(item);
                        setModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit />
                    </button>

                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <LeaveTypeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddLeave}
        onUpdate={handleUpdateLeave}
        editData={editItem}
      />
    </div>
  );
};

export default EmployeeAttendance;
