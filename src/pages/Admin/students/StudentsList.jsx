import { saveAs } from "file-saver";
import React, { useState } from "react";
import { FaEdit, FaEye, FaFileExport } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const StudentsList = () => {
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    parentName: "",
    parentPhone: "",
    groupName: "",
    groupType: "",
    ageFrom: "",
    ageTo: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  // Sample student data
  const students = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      age: 6,
      groupName: "KG-1",
      groupType: "Toddlers",
      status: "Active",
      parent1: "Jane Doe",
      parentPhone1: "1234567890",
      parent2: "Jack Doe",
    },
    {
      id: 2,
      firstName: "Mary",
      lastName: "Smith",
      age: 5,
      groupName: "KG-2",
      groupType: "Infants",
      status: "Inactive",
      parent1: "Anna Smith",
      parentPhone1: "9876543210",
    },
  ];

  const groupNames = ["KG-1", "KG-2", "KG-3"];
  const groupTypes = ["Infants", "Toddlers", "Early Preschool", "Pre-K", "KG-1", "KG-2"];

  // ------------------- FILTER HANDLERS -------------------
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleResetFilters = () => {
    const reset = {
      search: "",
      status: "",
      parentName: "",
      parentPhone: "",
      groupName: "",
      groupType: "",
      ageFrom: "",
      ageTo: "",
    };
    setFilters(reset);
    setAppliedFilters(reset);
  };

  const filteredStudents = students.filter((s) => {
    const searchMatch =
      s.firstName.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      s.lastName.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      s.id.toString().includes(appliedFilters.search);

    const statusMatch = appliedFilters.status ? s.status === appliedFilters.status : true;
    const parentNameMatch = appliedFilters.parentName
      ? s.parent1.toLowerCase().includes(appliedFilters.parentName.toLowerCase()) ||
        (s.parent2 && s.parent2.toLowerCase().includes(appliedFilters.parentName.toLowerCase()))
      : true;
    const parentPhoneMatch = appliedFilters.parentPhone
      ? s.parentPhone1.includes(appliedFilters.parentPhone)
      : true;
    const groupNameMatch = appliedFilters.groupName ? s.groupName === appliedFilters.groupName : true;
    const groupTypeMatch = appliedFilters.groupType ? s.groupType === appliedFilters.groupType : true;
    const ageFromMatch = appliedFilters.ageFrom ? s.age >= parseInt(appliedFilters.ageFrom) : true;
    const ageToMatch = appliedFilters.ageTo ? s.age <= parseInt(appliedFilters.ageTo) : true;

    return (
      searchMatch &&
      statusMatch &&
      parentNameMatch &&
      parentPhoneMatch &&
      groupNameMatch &&
      groupTypeMatch &&
      ageFromMatch &&
      ageToMatch
    );
  });

  // ------------------- CHECKBOX HANDLERS -------------------
  const handleCheckboxChange = (id) => {
    setSelectedStudents((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  // ------------------- EXPORT TO EXCEL -------------------
  const handleExport = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student to export.");
      return;
    }

    const dataToExport = filteredStudents
      .filter((s) => selectedStudents.includes(s.id))
      .map((s) => ({
        ID: s.id,
        Name: `${s.firstName} ${s.lastName}`,
        "Parent 1": s.parent1,
        "Parent 1 Phone": s.parentPhone1,
        "Parent 2": s.parent2 || "-",
        Age: s.age,
        Group: s.groupName,
        "Group Type": s.groupType,
        Status: s.status,
      }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "students.xlsx");
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Students List</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/students/add-student"
            className="rounded-md bg-[#3A49F9] px-4 py-2 font-semibold text-white shadow-lg transition hover:bg-[#2e3abf]"
          >
            Add Student
          </Link>
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <input
            type="text"
            name="search"
            placeholder="Student Name or ID"
            value={filters.search}
            onChange={handleFilterChange}
            className="rounded-lg border px-4 py-2"
          />
          <input
            type="text"
            name="parentName"
            placeholder="Parent Name"
            value={filters.parentName}
            onChange={handleFilterChange}
            className="rounded-lg border px-4 py-2"
          />
          <input
            type="text"
            name="parentPhone"
            placeholder="Parent Phone"
            value={filters.parentPhone}
            onChange={handleFilterChange}
            className="rounded-lg border px-4 py-2"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="rounded-lg border px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            name="groupName"
            value={filters.groupName}
            onChange={handleFilterChange}
            className="rounded-lg border px-4 py-2"
          >
            <option value="">All Groups</option>
            {groupNames.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            name="groupType"
            value={filters.groupType}
            onChange={handleFilterChange}
            className="rounded-lg border px-4 py-2"
          >
            <option value="">All Group Types</option>
            {groupTypes.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="ageFrom"
            placeholder="Age From"
            value={filters.ageFrom}
            onChange={handleFilterChange}
            className="rounded-lg border px-4 py-2"
          />
          <input
            type="number"
            name="ageTo"
            placeholder="Age To"
            value={filters.ageTo}
            onChange={handleFilterChange}
            className="rounded-lg border px-4 py-2"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleApplyFilters}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Filter
          </button>
          <button
            onClick={handleResetFilters}
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <button
          onClick={handleExport}
          className="mb-2 flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          <FaFileExport /> Export Selected
        </button>
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Parent 1</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Parent 2</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Group</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="transition hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleCheckboxChange(student.id)}
                  />
                </td>
                <td
                  className="cursor-pointer px-6 py-3 text-sm text-gray-700"
                  onClick={() => navigate(`/admin/students/student-profile/${student.id}`)}
                >
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">{student.parent1}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{student.parent2 ? student.parent2 : "—"}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{student.age}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{student.groupName}</td>
                <td className="px-6 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="flex gap-2 px-6 py-3">
                  <button
                    onClick={() => navigate(`/admin/students/student-profile/${student.id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => navigate(`/admin/students/edit-student/${student.id}`)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
