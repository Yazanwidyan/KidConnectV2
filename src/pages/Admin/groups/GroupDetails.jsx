// pages/admin/groups/GroupDetailsPage.jsx

import React, { useState } from "react";
import { FaArrowLeft, FaTrash, FaUserPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";

import Modal from "../../../components/Modal";

// Sample data
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
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Link
          to="/admin/groups/group-list"
          className="flex items-center gap-2 font-semibold text-blue-600 hover:underline"
        >
          <FaArrowLeft /> Back to Groups
        </Link>
      </div>

      {/* Group Info Card */}
      <div className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow md:flex-row">
        {/* Image */}
        {group.groupImage ? (
          <img
            src={group.groupImage}
            alt={group.groupName}
            className="h-32 w-32 rounded object-cover shadow-lg"
          />
        ) : (
          <div
            className="flex h-32 w-32 items-center justify-center rounded text-3xl font-bold text-white shadow"
            style={{ backgroundColor: group.groupColor }}
          >
            {group.groupName[0]}
          </div>
        )}

        {/* Details */}
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{group.groupName}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <span className="font-medium">Type:</span> {group.groupType}
            <span className="font-medium">Status:</span>
            <span
              className={`rounded-full px-2 py-1 ${
                group.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {group.status}
            </span>
            <span className="font-medium">Color:</span>
            <div className="h-6 w-6 rounded" style={{ backgroundColor: group.groupColor }}></div>
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Students</h3>
          <button
            className="flex items-center gap-2 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
            onClick={() => setShowStudentModal(true)}
          >
            <FaUserPlus /> Add Students
          </button>
        </div>
        <table className="w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {group.students.map((s, idx) => (
              <tr key={s.id} className="transition hover:bg-gray-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.role}</td>
                <td className="px-4 py-2">
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Staff Section */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Staff</h3>
          <button
            className="flex items-center gap-2 rounded bg-purple-600 px-3 py-1 text-white hover:bg-purple-700"
            onClick={() => setShowStaffModal(true)}
          >
            <FaUserPlus /> Add Staff
          </button>
        </div>
        <table className="w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {group.staff.map((s, idx) => (
              <tr key={s.id} className="transition hover:bg-gray-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.role}</td>
                <td className="px-4 py-2">
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Modal */}
      {showStudentModal && (
        <Modal title="Assign Students" onClose={() => setShowStudentModal(false)}>
          <Select
            options={studentOptions}
            isMulti
            placeholder="Select students..."
            onChange={(selected) => setSelectedStudents(selected)}
            className="mb-4"
          />
          <button
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => {
              alert(`Assigned ${selectedStudents.map((s) => s.label).join(", ")}`);
              setShowStudentModal(false);
            }}
          >
            Assign Selected
          </button>
        </Modal>
      )}

      {/* Staff Modal */}
      {showStaffModal && (
        <Modal title="Assign Staff" onClose={() => setShowStaffModal(false)}>
          <Select
            options={staffOptions}
            isMulti
            placeholder="Select staff..."
            onChange={(selected) => setSelectedStaff(selected)}
            className="mb-4"
          />
          <button
            className="w-full rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            onClick={() => {
              alert(`Assigned ${selectedStaff.map((s) => s.label).join(", ")}`);
              setShowStaffModal(false);
            }}
          >
            Assign Selected
          </button>
        </Modal>
      )}
    </div>
  );
};

export default GroupDetailsPage;
