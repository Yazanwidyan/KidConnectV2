// EmployeeAttendance.js

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import LeaveTypeModal from "./modals/LeaveTypeModal";

const initialLeaves = [
  { id: 1, enabled: true, leaveCode: "AL", nameEn: "Annual Leave", nameAr: "إجازة سنوية" },
  { id: 2, enabled: false, leaveCode: "SL", nameEn: "Sick Leave", nameAr: "إجازة مرضية" },
];

const EmployeeAttendance = () => {
  const [kioskMode, setKioskMode] = useState(false);
  const [requireSignature, setRequireSignature] = useState(false);
  const [checkInWithCode, setCheckInWithCode] = useState(false);
  const [submitLeaveMobile, setSubmitLeaveMobile] = useState(false);

  const [leaves, setLeaves] = useState(initialLeaves);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleAddLeave = (item) => setLeaves((prev) => [...prev, { id: Date.now(), ...item }]);
  const handleUpdateLeave = (updated) =>
    setLeaves((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  const handleDelete = (id) => setLeaves((prev) => prev.filter((l) => l.id !== id));

  return (
    <div className="min-h-screen space-y-6 bg-secondary p-6">
      <h1 className="text-2xl font-bold text-gray-800">Employee Attendance Settings</h1>

      {/* Attendance Mode Card */}
      <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">Attendance Options</h2>

        {[
          { label: "Kiosk Mode for Employees", value: kioskMode, setter: setKioskMode },
          { label: "Require Signature from Employees", value: requireSignature, setter: setRequireSignature },
          {
            label: "Allow Employees to Check-in with a Code",
            value: checkInWithCode,
            setter: setCheckInWithCode,
          },
          {
            label: "Allow Employees to Submit Leaves from Mobile",
            value: submitLeaveMobile,
            setter: setSubmitLeaveMobile,
          },
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

      {/* Leave Types Card */}
      <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Leave Types</h2>
          <button
            onClick={() => {
              setEditItem(null);
              setModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
          >
            <FiPlus /> Add Leave Type
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3">Enabled</th>
                <th className="px-4 py-3">Leave Code</th>
                <th className="px-4 py-3">Type (English)</th>
                <th className="px-4 py-3">Type (Arabic)</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((item) => (
                <tr key={item.id} className="border-b transition-colors hover:bg-gray-50">
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

                  <td className="flex gap-3 px-4 py-2">
                    <button
                      onClick={() => {
                        setEditItem(item);
                        setModalOpen(true);
                      }}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <PencilSquareIcon className="h-5 w-5 stroke-2" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
