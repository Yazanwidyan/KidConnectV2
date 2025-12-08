// Improved GroupDetailsPage.jsx — Cleaner, Better Layout for Group Details
// Responsive, structured, and visually aligned with EmployeeList design

import { UserPlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FaArrowLeft, FaTrash, FaUserPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";

import Modal from "../../../components/Modal";
import AssignStaffModal from "./modals/AssignStaffModal";
import AssignStudentsModal from "./modals/AssignStudentsModal";

// Sample Data
const groupsData = [
  {
    id: 1,
    groupName: "Football Team",
    groupType: "Toddlers",
    groupColor: "#3A49F9",
    groupImage: null,
    status: "Active",
    students: [
      { id: 1, name: "John Doe", role: "Player" },
      { id: 2, name: "Mary Smith", role: "Player" },
    ],
    staff: [
      { id: 1, name: "Mr. Adams", role: "Coach" },
      { id: 2, name: "Ms. Brown", role: "Assistant Coach" },
    ],
  },
];

const allStudents = [
  { id: 3, name: "Ali Khan" },
  { id: 4, name: "Jane Lee" },
  { id: 5, name: "Tommy Brown" },
];

const allStaff = [
  { id: 3, name: "Ms. Clark" },
  { id: 4, name: "Mr. Davis" },
  { id: 5, name: "Ms. Kelly" },
];

const GroupDetailsPage = () => {
  const { id } = useParams();
  const group = groupsData.find((g) => g.id === parseInt(id));

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);

  if (!group) return <div className="p-6 text-center">Group not found.</div>;

  const studentOptions = allStudents.map((s) => ({ value: s.id, label: s.name }));
  const staffOptions = allStaff.map((s) => ({ value: s.id, label: s.name }));

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-primaryFont">{group.groupName}</h1>
          <Link
            to="/admin/groups"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <FaArrowLeft /> Back to Groups
          </Link>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Panel — Group Info */}
        <div className="w-full rounded-lg bg-white p-6 shadow-lg lg:w-1/3">
          {/* Image */}
          {group.groupImage ? (
            <img
              src={group.groupImage}
              alt={group.groupName}
              className="mx-auto mb-4 h-32 w-32 rounded object-cover shadow-lg"
            />
          ) : (
            <div
              className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded text-4xl font-bold text-white shadow"
              style={{ backgroundColor: group.groupColor }}
            >
              {group.groupName[0]}
            </div>
          )}

          <h2 className="mb-4 text-center text-xl font-bold text-gray-800">{group.groupName}</h2>

          <div className="space-y-4 text-gray-700">
            {/* Additional Stats */}
            <div className="flex justify-between">
              <span className="font-semibold">Total Students:</span>
              <span>{group.students.length}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Total Staff:</span>
              <span>{group.staff.length}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Created On:</span>
              <span>12 Jan 2025</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Last Updated:</span>
              <span>02 Feb 2025</span>
            </div>

            <div className="border-b border-dashed pb-2"></div>
            <div className="flex justify-between">
              <span className="font-semibold">Type:</span>
              <span>{group.groupType}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  group.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {group.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">Color:</span>
              <div className="h-6 w-6 rounded" style={{ backgroundColor: group.groupColor }}></div>
            </div>
          </div>
        </div>

        {/* Right Panel — Students + Staff */}
        <div className="flex w-full flex-col gap-6 lg:w-2/3">
          {/* Staff Section */}
          <div className="rounded-lg bg-white shadow-lg">
            <div className="mb-4 flex items-center justify-between p-6">
              <h3 className="text-lg font-semibold">Staff</h3>
              <button
                className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
                onClick={() => setShowStaffModal(true)}
              >
                <UserPlusIcon className="h-5 w-5 stroke-[2]" /> Assign Staff
              </button>
            </div>

            <div className="overflow-hidden rounded-b-lg">
              <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
                <thead className="bg-gray-50">
                  <tr>
                    {["#", "Name", "Role", "Actions"].map((col) => (
                      <th key={col} className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-gray-400/60">
                  {group.staff.map((s, idx) => (
                    <tr key={s.id} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                      <td className="px-6 py-3">{idx + 1}</td>
                      <td className="px-6 py-3">{s.name}</td>
                      <td className="px-6 py-3">{s.role}</td>
                      <td className="px-6 py-3">
                        <button className="rounded bg-red-100 p-2 text-red-600 ring-red-700 transition hover:ring-1">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Students Section */}
          <div className="rounded-lg bg-white shadow-lg">
            <div className="mb-4 flex items-center justify-between p-6">
              <h3 className="text-lg font-semibold">Students</h3>
              <button
                className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
                onClick={() => setShowStudentModal(true)}
              >
                <UserPlusIcon className="h-5 w-5 stroke-[2]" /> Assign Students
              </button>
            </div>

            <div className="overflow-hidden rounded-b-lg">
              <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
                <thead className="bg-gray-50">
                  <tr>
                    {["#", "Name", "Role", "Actions"].map((col) => (
                      <th key={col} className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-gray-400/60">
                  {group.students.map((s, idx) => (
                    <tr key={s.id} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                      <td className="px-6 py-3">{idx + 1}</td>
                      <td className="px-6 py-3">{s.name}</td>
                      <td className="px-6 py-3">{s.role}</td>
                      <td className="px-6 py-3">
                        <button className="rounded bg-red-100 p-2 text-red-600 ring-red-700 transition hover:ring-1">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Student Modal */}
      {showStudentModal && (
        <AssignStudentsModal
          onClose={() => setShowStudentModal(false)}
          // onAssign={(selected) => handleAssignStaff(selected)}
        />
      )}

      {/* Staff Modal */}
      {showStaffModal && (
        <AssignStaffModal
          onClose={() => setShowStaffModal(false)}
          // onAssign={(selected) => handleAssignStaff(selected)}
        />
      )}
    </div>
  );
};

export default GroupDetailsPage;
