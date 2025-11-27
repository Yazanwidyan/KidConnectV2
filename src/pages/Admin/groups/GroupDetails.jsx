import React, { useState } from "react";
import { FaArrowLeft, FaEdit, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

// Sample data
const groupsData = [
  { id: 1, name: "Math Club", type: "Academic", status: "Active", description: "Advanced math activities." },
  {
    id: 2,
    name: "Football Team",
    type: "Sports",
    status: "Inactive",
    description: "Weekly football practice.",
  },
];

const allStudents = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Brown" },
];

const allStaff = [
  { id: 1, name: "Mr. Smith" },
  { id: 2, name: "Ms. Johnson" },
  { id: 3, name: "Mrs. Lee" },
];

const GroupDetails = () => {
  const { id } = useParams();
  const group = groupsData.find((g) => g.id === parseInt(id));

  const [assignedStudents, setAssignedStudents] = useState([]);
  const [assignedStaff, setAssignedStaff] = useState([]);

  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [staffModalOpen, setStaffModalOpen] = useState(false);

  if (!group) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Group not found.</p>
        <Link to="/admin/groups/group-list" className="text-blue-500 hover:underline">
          Back to Groups
        </Link>
      </div>
    );
  }

  const assignStudent = (student) => {
    if (!assignedStudents.some((s) => s.id === student.id)) {
      setAssignedStudents([...assignedStudents, student]);
    }
  };

  const assignStaff = (staff) => {
    if (!assignedStaff.some((s) => s.id === staff.id)) {
      setAssignedStaff([...assignedStaff, staff]);
    }
  };

  const removeStudent = (id) => setAssignedStudents(assignedStudents.filter((s) => s.id !== id));
  const removeStaff = (id) => setAssignedStaff(assignedStaff.filter((s) => s.id !== id));

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Link to="/admin/groups/group-list" className="flex items-center gap-2 text-blue-500 hover:underline">
          <FaArrowLeft /> Back to Groups
        </Link>
        <Link
          to={`/admin/groups/edit-group/${group.id}`}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FaEdit /> Edit Group
        </Link>
      </div>

      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-gray-800">{group.name}</h2>
        <p>
          <strong>Type:</strong> {group.type}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              group.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {group.status}
          </span>
        </p>
        <p>
          <strong>Description:</strong> {group.description}
        </p>

        {/* Assigned Students */}
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Assigned Students</h3>
          <button
            onClick={() => setStudentModalOpen(true)}
            className="mb-2 flex items-center gap-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          >
            <FaPlus /> Add Students
          </button>
          <ul className="space-y-1">
            {assignedStudents.map((student) => (
              <li key={student.id} className="flex items-center justify-between rounded border p-2">
                <span>{student.name}</span>
                <button onClick={() => removeStudent(student.id)} className="text-red-600 hover:text-red-800">
                  Remove
                </button>
              </li>
            ))}
            {assignedStudents.length === 0 && <li className="text-gray-500">No students assigned yet.</li>}
          </ul>
        </div>

        {/* Assigned Staff */}
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Assigned Staff</h3>
          <button
            onClick={() => setStaffModalOpen(true)}
            className="mb-2 flex items-center gap-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          >
            <FaPlus /> Add Staff
          </button>
          <ul className="space-y-1">
            {assignedStaff.map((staff) => (
              <li key={staff.id} className="flex items-center justify-between rounded border p-2">
                <span>{staff.name}</span>
                <button onClick={() => removeStaff(staff.id)} className="text-red-600 hover:text-red-800">
                  Remove
                </button>
              </li>
            ))}
            {assignedStaff.length === 0 && <li className="text-gray-500">No staff assigned yet.</li>}
          </ul>
        </div>
      </div>

      {/* Student Modal */}
      {studentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Assign Students</h3>
            <ul className="max-h-64 space-y-1 overflow-y-auto">
              {allStudents.map((student) => (
                <li key={student.id} className="flex items-center justify-between rounded border p-2">
                  <span>{student.name}</span>
                  <button
                    onClick={() => assignStudent(student)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setStudentModalOpen(false)}
              className="mt-4 w-full rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Staff Modal */}
      {staffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Assign Staff</h3>
            <ul className="max-h-64 space-y-1 overflow-y-auto">
              {allStaff.map((staff) => (
                <li key={staff.id} className="flex items-center justify-between rounded border p-2">
                  <span>{staff.name}</span>
                  <button onClick={() => assignStaff(staff)} className="text-green-600 hover:text-green-800">
                    Add
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setStaffModalOpen(false)}
              className="mt-4 w-full rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetails;
