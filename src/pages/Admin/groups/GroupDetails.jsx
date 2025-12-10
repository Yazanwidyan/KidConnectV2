import {
  CheckIcon,
  EyeIcon,
  IdentificationIcon,
  PencilSquareIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

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
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        parent1: "Jane Doe",
        parent2: "",
        age: 6,
        groupName: "Toddlers",
        status: "Active",
      },
      {
        id: 2,
        firstName: "Mary",
        lastName: "Smith",
        parent1: "Robert Smith",
        parent2: "Lisa Smith",
        age: 7,
        groupName: "Toddlers",
        status: "Active",
      },
    ],
    staff: [
      {
        id: 1,
        name: "Mr. Adams",
        role: "Coach",
        title: "Head Coach",
        phone: "123-456-7890",
        status: "Active",
        employee_image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 2,
        name: "Ms. Brown",
        role: "Assistant Coach",
        title: "Assistant",
        phone: "987-654-3210",
        status: "Active",
      },
    ],
  },
];

const GroupDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- State for Staff Table ---
  const [staffSortField, setStaffSortField] = useState("name");
  const [staffSortOrder, setStaffSortOrder] = useState("asc");
  const [staffCurrentPage, setStaffCurrentPage] = useState(1);
  const [staffRowsPerPage, setStaffRowsPerPage] = useState(5);

  // --- State for Students Table ---
  const [studentSortField, setStudentSortField] = useState("firstName");
  const [studentSortOrder, setStudentSortOrder] = useState("asc");
  const [studentCurrentPage, setStudentCurrentPage] = useState(1);
  const [studentRowsPerPage, setStudentRowsPerPage] = useState(5);

  const [selectedStudents, setSelectedStudents] = useState([]);
  // Modal controls
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);

  const group = groupsData.find((g) => g.id === parseInt(id));
  if (!group) return <div className="p-6 text-center">Group not found.</div>;

  // --- Sorting helper ---
  const sortData = (data, field, order) => {
    return [...data].sort((a, b) => {
      const aField = (a[field] || "").toString().toLowerCase();
      const bField = (b[field] || "").toString().toLowerCase();
      if (aField < bField) return order === "asc" ? -1 : 1;
      if (aField > bField) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  // --- Staff data sorted and paginated ---
  const sortedStaff = sortData(group.staff, staffSortField, staffSortOrder);

  const staffTotalPages = Math.ceil(sortedStaff.length / staffRowsPerPage);
  const staffStartIndex = (staffCurrentPage - 1) * staffRowsPerPage;
  const staffEndIndex = Math.min(staffStartIndex + staffRowsPerPage, sortedStaff.length);
  const paginatedEmployees = sortedStaff.slice(staffStartIndex, staffEndIndex);

  // --- Students data sorted and paginated ---
  const sortedStudents = sortData(group.students, studentSortField, studentSortOrder);

  const studentTotalPages = Math.ceil(sortedStudents.length / studentRowsPerPage);
  const studentStartIndex = (studentCurrentPage - 1) * studentRowsPerPage;
  const studentEndIndex = Math.min(studentStartIndex + studentRowsPerPage, sortedStudents.length);
  const paginatedStudents = sortedStudents.slice(studentStartIndex, studentEndIndex);

  // --- Sorting handlers ---
  const handleStaffSort = (field) => {
    if (staffSortField === field) {
      setStaffSortOrder(staffSortOrder === "asc" ? "desc" : "asc");
    } else {
      setStaffSortField(field);
      setStaffSortOrder("asc");
    }
    setStaffCurrentPage(1);
  };

  const handleStudentSort = (field) => {
    if (studentSortField === field) {
      setStudentSortOrder(studentSortOrder === "asc" ? "desc" : "asc");
    } else {
      setStudentSortField(field);
      setStudentSortOrder("asc");
    }
    setStudentCurrentPage(1);
  };

  // --- Student checkbox handlers ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(sortedStudents.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-black">{group.groupName}</h1>
          <Link
            to="/admin/groups"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <FaArrowLeft /> Back to Groups
          </Link>
        </div>
      </div>

      {/* Group Info */}
      <div className="mb-8 flex w-full items-center gap-6 rounded-lg bg-white p-6 shadow-lg">
        {/* Left: Circle Avatar and Name */}
        <div className="flex flex-col items-center space-y-4 border-r border-gray-200 pr-8">
          <div
            className="flex h-28 w-28 items-center justify-center rounded-full text-6xl font-extrabold text-white shadow-lg"
            style={{ backgroundColor: group.groupColor }}
          >
            {group.groupName[0]}
          </div>
          <h2 className="text-center text-2xl font-semibold tracking-wide text-gray-900">
            {group.groupName}
          </h2>
        </div>

        {/* Right: Stats */}
        <div className="flex flex-1 justify-around text-gray-700">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-wide text-gray-500">Total Students</span>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-lg font-semibold text-blue-700 shadow-sm">
              {group.students.length}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-wide text-gray-500">Total Staff</span>
            <span className="rounded-full bg-purple-50 px-4 py-2 text-lg font-semibold text-purple-700 shadow-sm">
              {group.staff.length}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-wide text-gray-500">Type</span>
            <span className="text-lg font-semibold text-gray-900">{group.groupType}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-wide text-gray-500">Status</span>
            <span
              className={`inline-block rounded-full px-5 py-2 text-sm font-semibold ${
                group.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              } shadow-sm`}
            >
              {group.status}
            </span>
          </div>
        </div>
      </div>

      {/* Staff Section */}
      <div className="mb-10 overflow-x-auto">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-black">Staff list</h4>
          <button
            className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
            onClick={() => setShowStaffModal(true)}
          >
            <UserPlusIcon className="h-5 w-5 stroke-2" /> Assign Staff
          </button>
        </div>
        <table className="min-w-full" style={{ borderCollapse: "separate", borderSpacing: "0 6px" }}>
          <thead>
            <tr className="bg-white shadow-lg">
              {["Name", "Role", "Title", "Phone", "Status", "Actions"].map((col) => (
                <th
                  key={col}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700"
                  onClick={() => col !== "Actions" && handleStaffSort(col.toLowerCase())}
                >
                  {col}{" "}
                  {staffSortField === col.toLowerCase() ? (staffSortOrder === "asc" ? " 🔼" : " 🔽") : ""}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="bg-white shadow-sm">
                  <td
                    className="flex cursor-pointer items-center gap-3 px-6 py-3 text-gray-700 hover:text-primary"
                    onClick={() => navigate(`/admin/employees/employee-profile/${emp.id}`)}
                  >
                    <img
                      src={emp.employee_image || "/assets/default-profile.jpg"}
                      className="h-10 w-10 rounded-full border border-gray-300 object-cover"
                    />
                    <div className="flex flex-col truncate">
                      <span className="truncate font-medium">{emp.name}</span>
                      <span className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <IdentificationIcon className="h-4 w-4" />
                        ID: {emp.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-normal text-gray-700">{emp.role}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{emp.title}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{emp.phone}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        emp.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-3">
                    <Link
                      to={`/admin/employees/employee-profile/${emp.id}`}
                      className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                    >
                      <EyeIcon className="h-5 w-5 stroke-2" />
                    </Link>
                    <Link
                      to={`/admin/employees/edit-employee/${emp.id}`}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <PencilSquareIcon className="h-5 w-5 stroke-2" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-3 text-center text-gray-500">
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 px-0 py-6 sm:flex-row">
          <div className="text-sm text-gray-700">
            Showing {paginatedEmployees.length === 0 ? 0 : staffStartIndex + 1} to {staffEndIndex} of{" "}
            {sortedStaff.length} entries
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              Rows per page:
              <select
                value={staffRowsPerPage}
                onChange={(e) => {
                  setStaffRowsPerPage(Number(e.target.value));
                  setStaffCurrentPage(1);
                }}
                className="rounded border px-2 py-1"
              >
                {[5, 10, 15].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={staffCurrentPage === 1}
              onClick={() => setStaffCurrentPage((p) => p - 1)}
              className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {staffCurrentPage} of {staffTotalPages || 1}
            </span>
            <button
              disabled={staffCurrentPage === staffTotalPages || staffTotalPages === 0}
              onClick={() => setStaffCurrentPage((p) => p + 1)}
              className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="overflow-x-auto">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-black">Students list</h4>
          <button
            className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
            onClick={() => setShowStudentModal(true)}
          >
            <UserPlusIcon className="h-5 w-5 stroke-2" /> Assign Students
          </button>
        </div>
        <table className="min-w-full" style={{ borderCollapse: "separate", borderSpacing: "0 6px" }}>
          <thead>
            <tr className="bg-white shadow-lg">
              <th className="px-6 py-3 text-left">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === sortedStudents.length && sortedStudents.length > 0}
                    onChange={handleSelectAll}
                    className="peer sr-only"
                  />
                  <div className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white transition-colors peer-checked:border-primary peer-checked:bg-primary">
                    <CheckIcon className="hidden h-4 w-4 text-white peer-checked:block" />
                  </div>
                </label>
              </th>
              {["firstName", "parent1", "parent2", "age", "groupName", "status"].map((col) => {
                // Capitalize and remove camelCase for display
                const displayName = col.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
                return (
                  <th
                    key={col}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700"
                    onClick={() => handleStudentSort(col)}
                  >
                    {displayName}{" "}
                    {studentSortField === col ? (studentSortOrder === "asc" ? " 🔼" : " 🔽") : ""}
                  </th>
                );
              })}
              <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((s) => (
                <tr key={s.id} className="bg-white shadow-sm">
                  <td className="px-6 py-3">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(s.id)}
                        onChange={() => handleCheckboxChange(s.id)}
                        className="peer sr-only"
                      />
                      <div className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white transition-colors peer-checked:border-primary peer-checked:bg-primary">
                        <CheckIcon className="hidden h-4 w-4 text-white peer-checked:block" />
                      </div>
                    </label>
                  </td>
                  <td
                    className="flex cursor-pointer items-center gap-3 px-6 py-3 text-gray-700 hover:text-primary"
                    onClick={() => navigate(`/admin/students/student-profile/${s.id}`)}
                  >
                    <img
                      src={s.student_image || "/assets/kid-profile.png"}
                      alt={`${s.firstName} ${s.lastName}`}
                      className="h-10 w-10 rounded-full border border-gray-300 object-cover"
                    />
                    <div className="flex flex-col truncate">
                      <span className="truncate font-medium">
                        {s.firstName} {s.lastName}
                      </span>
                      <span className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <IdentificationIcon className="h-4 w-4" />
                        ID: {s.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-normal text-gray-600">{s.parent1}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">{s.parent2 || "—"}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">{s.age}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">{s.groupName}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        s.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-3">
                    <Link
                      to={`/admin/students/student-profile/${s.id}`}
                      className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                    >
                      <EyeIcon className="h-5 w-5 stroke-2" />
                    </Link>
                    <Link
                      to={`/admin/students/edit-student/${s.id}`}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <PencilSquareIcon className="h-5 w-5 stroke-2" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-3 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 px-0 py-6 sm:flex-row">
          <div className="text-sm text-gray-700">
            Showing {paginatedStudents.length === 0 ? 0 : studentStartIndex + 1} to {studentEndIndex} of{" "}
            {sortedStudents.length} entries
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              Rows per page:
              <select
                value={studentRowsPerPage}
                onChange={(e) => {
                  setStudentRowsPerPage(Number(e.target.value));
                  setStudentCurrentPage(1);
                }}
                className="rounded border px-2 py-1"
              >
                {[5, 10, 15].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={studentCurrentPage === 1}
              onClick={() => setStudentCurrentPage((p) => p - 1)}
              className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {studentCurrentPage} of {studentTotalPages || 1}
            </span>
            <button
              disabled={studentCurrentPage === studentTotalPages || studentTotalPages === 0}
              onClick={() => setStudentCurrentPage((p) => p + 1)}
              className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Student Modal */}
      {showStudentModal && <AssignStudentsModal onClose={() => setShowStudentModal(false)} />}

      {/* Staff Modal */}
      {showStaffModal && <AssignStaffModal onClose={() => setShowStaffModal(false)} />}
    </div>
  );
};

export default GroupDetailsPage;
