import React, { useState } from "react";
import { FaCopy, FaEdit, FaFileExcel, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

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
    <div className="space-y-6 p-6">
      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowLinkModal(true)}
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <FaCopy /> Get Link
        </button>
        <button
          onClick={() => navigate("/admin/students/add-student")}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Register Student
        </button>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {["Review", "Waitlist", "Enrolled", "Rejected"].map((status) => (
          <div
            key={status}
            className={`rounded-lg p-4 shadow ${
              status === "Review"
                ? "bg-blue-100"
                : status === "Waitlist"
                  ? "bg-yellow-100"
                  : status === "Rejected"
                    ? "bg-red-100"
                    : "bg-green-100"
            }`}
          >
            <h3
              className={`text-lg font-semibold ${
                status === "Review"
                  ? "text-blue-700"
                  : status === "Waitlist"
                    ? "text-yellow-700"
                    : status === "Rejected"
                      ? "text-red-700"
                      : "text-green-700"
              }`}
            >
              {status}
            </h3>
            <p className="mt-2 text-2xl font-bold">{students.filter((s) => s.status === status).length}</p>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input
          type="text"
          placeholder="Student Name"
          value={filters.studentName}
          onChange={(e) => setFilters({ ...filters, studentName: e.target.value })}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Parent Name"
          value={filters.parentName}
          onChange={(e) => setFilters({ ...filters, parentName: e.target.value })}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Parent Phone"
          value={filters.parentPhone}
          onChange={(e) => setFilters({ ...filters, parentPhone: e.target.value })}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Registration ID"
          value={filters.registerId}
          onChange={(e) => setFilters({ ...filters, registerId: e.target.value })}
          className="rounded border px-3 py-2"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="rounded border px-3 py-2"
        >
          <option value="all">All Status</option>
          <option value="Review">Review</option>
          <option value="Waitlist">Waitlist</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="number"
          placeholder="Age From"
          value={filters.ageFrom}
          onChange={(e) => setFilters({ ...filters, ageFrom: e.target.value })}
          className="rounded border px-3 py-2"
        />
        <input
          type="number"
          placeholder="Age To"
          value={filters.ageTo}
          onChange={(e) => setFilters({ ...filters, ageTo: e.target.value })}
          className="rounded border px-3 py-2"
        />
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={applyFilters} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Filter
        </button>
        <button onClick={resetFilters} className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">
          Reset
        </button>
      </div>

      {/* Export */}
      <button
        onClick={exportToExcel}
        className="mt-2 flex items-center gap-2 rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
      >
        <FaFileExcel /> Export as Excel
      </button>

      {/* Students Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filteredStudents.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Register ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Parent 1</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Parent 2</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredStudents.map((student, index) => (
              <tr key={student.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(student.id)}
                    onChange={() => handleSelect(student.id)}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.registerId}</td>
                <td
                  onClick={() => navigate(`/admin/students/student-admission-profile/${student.id}`)}
                  className="cursor-pointer px-6 py-4 text-sm text-blue-600"
                >
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.parent1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.parent2}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.age}</td>
                <td className="px-6 py-4 text-sm">
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
                <td className="flex gap-2 px-6 py-4 text-sm text-gray-700">
                  {student.status !== "Enrolled" && (
                    <>
                      {/* View Details */}
                      <button
                        onClick={() => alert(`Viewing ${student.name}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => navigate(`/admin/students/edit/${student.id}`)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        Edit
                      </button>

                      {/* Conditional Actions */}
                      {student.status === "Review" && (
                        <>
                          <button
                            onClick={() => updateStudentStatus(student.id, "Waitlist")}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            Waitlist
                          </button>
                          <button
                            onClick={() => updateStudentStatus(student.id, "Enrolled")}
                            className="text-green-600 hover:text-green-800"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStudentStatus(student.id, "Rejected")}
                            className="text-red-600 hover:text-red-800"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {student.status === "Waitlist" && (
                        <>
                          <button
                            onClick={() => updateStudentStatus(student.id, "Enrolled")}
                            className="text-green-600 hover:text-green-800"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateStudentStatus(student.id, "Rejected")}
                            className="text-red-600 hover:text-red-800"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {student.status === "Rejected" && (
                        <>
                          <button
                            onClick={() => updateStudentStatus(student.id, "Waitlist")}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            Waitlist
                          </button>
                          <button
                            onClick={() => updateStudentStatus(student.id, "Enrolled")}
                            className="text-green-600 hover:text-green-800"
                          >
                            Accept
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
