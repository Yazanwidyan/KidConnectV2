import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  EyeIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FaCopy, FaFileExcel } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const statusConfig = {
  Review: {
    bg: "bg-blue-500",
    text: "text-blue-700",
    Icon: EyeIcon,
  },
  Waitlist: {
    bg: "bg-yellow-500",
    text: "text-yellow-700",
    Icon: ClockIcon,
  },
  Enrolled: {
    bg: "bg-green-500",
    text: "text-green-700",
    Icon: CheckCircleIcon,
  },
  Rejected: {
    bg: "bg-red-500",
    text: "text-red-700",
    Icon: XCircleIcon,
  },
};

const Admissions = () => {
  const navigate = useNavigate();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filters, setFilters] = useState({
    studentName: "",
    parentName: "",
    parentPhone: "",
    status: "all",
    registerId: "",
    ageFrom: "",
    ageTo: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [students, setStudents] = useState([
    {
      id: 1,
      registerId: "REG001",
      name: "John Doe",
      parent1: "Jane Doe",
      parentPhone1: "1234567890",
      parent2: "Jack Doe",
      parentPhone2: "0987654321",
      age: 5,
      dob: "2018-05-12",
      status: "Review",
    },
    {
      id: 2,
      registerId: "REG002",
      name: "Alice Smith",
      parent1: "Mary Smith",
      parentPhone1: "1112223333",
      parent2: "Robert Smith",
      parentPhone2: "4445556666",
      age: 4,
      dob: "2019-08-20",
      status: "Waitlist",
    },
    {
      id: 3,
      registerId: "REG003",
      name: "Bob Johnson",
      parent1: "Anna Johnson",
      parentPhone1: "7778889999",
      parent2: "Mark Johnson",
      parentPhone2: "0001112222",
      age: 6,
      dob: "2017-11-02",
      status: "Enrolled",
    },
    {
      id: 4,
      registerId: "REG004",
      name: "Emily Davis",
      parent1: "Sarah Davis",
      parentPhone1: "1234567890",
      parent2: "James Davis",
      parentPhone2: "0987654321",
      age: 7,
      dob: "2016-08-15",
      status: "Rejected",
    },
  ]);

  const [filteredStudents, setFilteredStudents] = useState(students);

  const handleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredStudents.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredStudents.length);
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setFilteredStudents((prev) => prev.filter((s) => s.id !== id));
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    }
  };

  const updateStudentStatus = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, status: newStatus } : student))
    );
    setFilteredStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, status: newStatus } : student))
    );
  };

  const handleCopyLink = () => {
    const link = "https://your-school.com/register";
    navigator.clipboard.writeText(link);
    alert("Registration link copied to clipboard!");
  };

  const exportToExcel = () => {
    const exportData = students.filter((s) => selectedIds.includes(s.id)).map(({ id, ...rest }) => rest);
    if (exportData.length === 0) {
      alert("No students selected!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  const applyFilters = () => {
    const { studentName, parentName, parentPhone, status, registerId, ageFrom, ageTo } = filters;

    const filtered = students.filter((s) => {
      return (
        (studentName === "" || s.name.toLowerCase().includes(studentName.toLowerCase())) &&
        (parentName === "" ||
          s.parent1.toLowerCase().includes(parentName.toLowerCase()) ||
          s.parent2.toLowerCase().includes(parentName.toLowerCase())) &&
        (parentPhone === "" ||
          s.parentPhone1.includes(parentPhone) ||
          s.parentPhone2.includes(parentPhone)) &&
        (status === "all" || s.status === status) &&
        (registerId === "" || s.registerId.toLowerCase().includes(registerId.toLowerCase())) &&
        (ageFrom === "" || s.age >= parseInt(ageFrom)) &&
        (ageTo === "" || s.age <= parseInt(ageTo))
      );
    });

    setFilteredStudents(filtered);
  };

  const resetFilters = () => {
    setFilters({
      studentName: "",
      parentName: "",
      parentPhone: "",
      status: "all",
      registerId: "",
      ageFrom: "",
      ageTo: "",
    });
    setFilteredStudents(students);
  };

  return (
    <div className="w-full p-6">
      <div className="mb-3 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-black">Admissions</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-1/4">
            <label htmlFor="status" className="mb-1 block text-gray-600">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
            >
              <option value="all">All Status</option>
              <option value="Review">Review</option>
              <option value="Waitlist">Waitlist</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-11 h-4 w-4 -translate-y-1/2 stroke-2 text-gray-500" />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowLinkModal(true)}
            className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
          >
            <ClipboardDocumentIcon className="h-5 w-5 stroke-[2]" /> Get Link
          </button>
          <Link
            to="/admin/students/add-student"
            className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
          >
            <UserPlusIcon className="h-5 w-5 stroke-[2]" /> Register Student
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-4">
        {["Review", "Waitlist", "Enrolled", "Rejected"].map((status) => {
          const { bg, text, Icon } = statusConfig[status];
          const count = students.filter((s) => s.status === status).length;

          return (
            <div
              key={status}
              className={`relative flex flex-col overflow-hidden rounded-lg p-6 shadow-lg ${bg}`}
            >
              {/* Faint background icon */}
              <Icon className="pointer-events-none absolute -right-10 -top-3 text-9xl text-white opacity-10" />

              {/* Count */}
              <h3 className="relative z-10 mb-1 text-4xl font-extrabold text-white">{count}</h3>

              {/* Status label */}
              <p className="relative z-10 text-lg text-white">{status}</p>
            </div>
          );
        })}
      </div>

      {/* Export */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <input
          type="text"
          name="search"
          placeholder="Student Name or ID or phone number"
          value={filters.search}
          className="w-1/3 rounded-lg border border-gray-300 px-3 py-2 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <ArrowDownTrayIcon className="h-5 w-5 stroke-[2]" /> Export as Excel
        </button>
      </div>

      {/* Students Table */}
      <div className="rounded-lg bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
            <thead>
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredStudents.length}
                    onChange={handleSelectAll}
                  />
                </th>
                {["#", "Register ID", "Student Name", "Parent 1", "Parent 2", "Age", "Status"].map((col) => (
                  <th
                    key={col}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700"
                    onClick={
                      col === "Actions" || col === "#"
                        ? undefined
                        : () =>
                            handleSort(
                              col
                                .toLowerCase()
                                .replace(/\s+/g, "") // remove spaces
                                .replace("#", "index") // special case for #
                            )
                    }
                  >
                    {col} {/* sorting arrows */}
                    {sortField === col.toLowerCase().replace(/\s+/g, "").replace("#", "index")
                      ? sortOrder === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : ""}
                  </th>
                ))}
                <th className="px-6 py-3 text-start text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-gray-400/60">
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="odd:bg-gray-100 even:bg-white">
                  <td className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(student.id)}
                      onChange={() => handleSelect(student.id)}
                    />
                  </td>
                  <td className="px-6 py-3 font-normal text-gray-600">{index + 1}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">{student.registerId}</td>
                  <td
                    onClick={() => navigate(`/admin/admissions/student-admission-profile/${student.id}`)}
                    className="cursor-pointer px-6 py-3 font-normal text-gray-600"
                  >
                    {student.name}
                  </td>
                  <td className="px-6 py-3 font-normal text-gray-600">{student.parent1}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">{student.parent2}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">{student.age}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "Review"
                          ? "bg-blue-100 text-blue-800"
                          : student.status === "Waitlist"
                            ? "bg-yellow-100 text-yellow-800"
                            : student.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-3">
                    {student.status !== "Enrolled" && (
                      <>
                        {/* View Details */}
                        <Link
                          // to={`/admin/students/student-profile/${s.id}`}
                          className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                        >
                          <EyeIcon className="h-5 w-5 stroke-[2]" />
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/admin/students/edit/${student.id}`}
                          className="rounded bg-yellow-100 p-[5px] text-yellow-500 ring-yellow-700 transition duration-300 hover:ring-1"
                        >
                          <PencilSquareIcon className="h-5 w-5 stroke-[2]" />
                        </Link>

                        {/* Conditional Actions */}
                        {student.status === "Review" && (
                          <>
                            <button
                              onClick={() => updateStudentStatus(student.id, "Waitlist")}
                              className="rounded bg-purple-100 p-[5px] text-purple-500 ring-purple-700 transition duration-300 hover:ring-1"
                            >
                              <ShieldCheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => updateStudentStatus(student.id, "Enrolled")}
                              className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => updateStudentStatus(student.id, "Rejected")}
                              className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1"
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}

                        {student.status === "Waitlist" && (
                          <>
                            <button
                              onClick={() => updateStudentStatus(student.id, "Enrolled")}
                              className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => updateStudentStatus(student.id, "Rejected")}
                              className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1"
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}

                        {student.status === "Rejected" && (
                          <>
                            <button
                              onClick={() => updateStudentStatus(student.id, "Waitlist")}
                              className="rounded bg-purple-100 p-[5px] text-purple-500 ring-purple-700 transition duration-300 hover:ring-1"
                            >
                              <ShieldCheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => updateStudentStatus(student.id, "Enrolled")}
                              className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="mt-4 flex flex-col items-center justify-between gap-3 p-6 sm:flex-row">
            <div className="text-sm text-gray-700">
              Showing {paginatedStudents.length === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
              {filteredStudents.length} entries
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                Rows per page:
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
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
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Copy Registration Link</h2>
            <div className="flex items-center gap-2 rounded border px-3 py-2">
              <input
                type="text"
                value="https://your-school.com/register"
                readOnly
                className="flex-1 border-none outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowLinkModal(false)}
                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admissions;
