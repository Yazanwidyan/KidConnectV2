import {
  CheckIcon,
  ChevronDownIcon,
  EyeIcon,
  IdentificationIcon,
  PencilSquareIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { saveAs } from "file-saver";
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const StudentsList = () => {
  const navigate = useNavigate();

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
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const students = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      student_image: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
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
      student_image: "https://avatar.iran.liara.run/public/boy?username=Ash",
      age: 5,
      groupName: "KG-2",
      groupType: "Infants",
      status: "Inactive",
      parent1: "Anna Smith",
      parentPhone1: "9876543210",
    },
    // New 5 students
    {
      id: 3,
      firstName: "Liam",
      lastName: "Johnson",
      student_image: "https://randomuser.me/api/portraits/lego/1.jpg",
      age: 4,
      groupName: "KG-1",
      groupType: "Toddlers",
      status: "Active",
      parent1: "Olivia Johnson",
      parentPhone1: "5551234567",
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Williams",
      student_image: "https://randomuser.me/api/portraits/women/44.jpg",
      age: 6,
      groupName: "KG-3",
      groupType: "Early Preschool",
      status: "Active",
      parent1: "James Williams",
      parentPhone1: "5559876543",
      parent2: "Sophia Williams",
    },
    {
      id: 5,
      firstName: "Noah",
      lastName: "Brown",
      student_image: "https://randomuser.me/api/portraits/men/32.jpg",
      age: 5,
      groupName: "KG-2",
      groupType: "Infants",
      status: "Inactive",
      parent1: "Mia Brown",
      parentPhone1: "5558765432",
    },
    {
      id: 6,
      firstName: "Ava",
      lastName: "Jones",
      student_image: "https://randomuser.me/api/portraits/women/68.jpg",
      age: 7,
      groupName: "KG-3",
      groupType: "Pre-K",
      status: "Active",
      parent1: "William Jones",
      parentPhone1: "5553456789",
    },
    {
      id: 7,
      firstName: "Oliver",
      lastName: "Davis",
      student_image: "https://randomuser.me/api/portraits/men/45.jpg",
      age: 6,
      groupName: "KG-1",
      groupType: "Toddlers",
      status: "Active",
      parent1: "Isabella Davis",
      parentPhone1: "5552345678",
      parent2: "Charlotte Davis",
    },
  ];

  const groupNames = ["KG-1", "KG-2", "KG-3"];
  const groupTypes = ["Infants", "Toddlers", "Early Preschool", "Pre-K", "KG-1", "KG-2"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => setAppliedFilters({ ...filters });
  const resetFilters = () => {
    setFilters({
      search: "",
      status: "",
      parentName: "",
      parentPhone: "",
      groupName: "",
      groupType: "",
      ageFrom: "",
      ageTo: "",
    });
    setAppliedFilters({
      search: "",
      status: "",
      parentName: "",
      parentPhone: "",
      groupName: "",
      groupType: "",
      ageFrom: "",
      ageTo: "",
    });
    setCurrentPage(1);
  };

  const filteredStudents = useMemo(() => {
    let data = students.filter((s) => {
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

    if (sortField) {
      data.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [students, appliedFilters, sortField, sortOrder]);

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

  const handleCheckboxChange = (id) => {
    setSelectedStudents((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedStudents(filteredStudents.map((s) => s.id));
    else setSelectedStudents([]);
  };

  const handleExport = () => {
    if (!selectedStudents.length) return alert("Select at least one student.");
    const dataToExport = filteredStudents
      .filter((s) => selectedStudents.includes(s.id))
      .map((s) => ({
        ID: s.id,
        Name: `${s.firstName} ${s.lastName}`,
        Parent1: s.parent1,
        "Parent1 Phone": s.parentPhone1,
        Parent2: s.parent2 || "-",
        Age: s.age,
        Group: s.groupName,
        Status: s.status,
      }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "students.xlsx");
  };

  return (
    <div className="w-full p-6">
      <div className="mb-3 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-black">Students</h1>
        </div>
      </div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-1/4">
            <label htmlFor="groupName" className="mb-1 block text-gray-600">
              Groups
            </label>
            <select
              id="groupName"
              name="groupName"
              value={filters.groupName}
              onChange={handleFilterChange}
              className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
            >
              <option value="">All Groups</option>
              {groupNames.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-11 h-4 w-4 -translate-y-1/2 stroke-2 text-gray-500" />
          </div>
          <div className="relative w-1/4">
            <label htmlFor="status" className="mb-1 block text-gray-600">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-11 h-4 w-4 -translate-y-1/2 stroke-2 text-gray-500" />
          </div>
        </div>

        <Link
          to="/admin/students/add-student"
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <UserPlusIcon className="h-5 w-5 stroke-2" />
          Add Student
        </Link>
      </div>
      {/* Status Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="flex flex-col items-start justify-center rounded-xl border-l-4 border-green-400 bg-white p-4 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">105</h3>
          <p className="text-sm text-gray-600">Active</p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-xl border-l-4 border-red-400 bg-white p-4 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">8</h3>
          <p className="text-sm text-gray-600">Inactive</p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-xl border-l-4 border-purple-400 bg-white p-4 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">3</h3>
          <p className="text-sm text-gray-600">On Hold</p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-xl border-l-4 border-orange-400 bg-white p-4 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">13</h3>
          <p className="text-sm text-gray-600">Withdrawn</p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-xl border-l-4 border-blue-400 bg-white p-4 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">17</h3>
          <p className="text-sm text-gray-600">Signed Up</p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-xl border-l-4 border-cyan-400 bg-white p-4 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">17</h3>
          <p className="text-sm text-gray-600">Transferred</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <input
          type="text"
          name="search"
          placeholder="Student Name or ID or phone number"
          value={filters.search}
          onChange={handleFilterChange}
          className="w-1/3 rounded-lg border border-gray-300 px-3 py-2 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <button
          onClick={handleExport}
          className="hover:bg-primary-dark whitespace-nowrap rounded bg-primary px-5 py-2 font-semibold text-white transition"
        >
          Export Selected
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full" style={{ borderCollapse: "separate", borderSpacing: "0 6px" }}>
          <thead>
            <tr className="bg-white shadow-lg">
              <th className="px-6 py-3 text-left">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedStudents.length === filteredStudents.length && filteredStudents.length > 0
                    }
                    onChange={handleSelectAll}
                    className="peer sr-only"
                  />
                  <div className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white transition-colors peer-checked:border-primary peer-checked:bg-primary">
                    <CheckIcon className="hidden h-4 w-4 text-white peer-checked:block" />
                  </div>
                </label>
              </th>
              {["Student", "Parent 1", "Parent 2", "Age", "Group", "Status"].map((col) => (
                <th
                  key={col}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700"
                  onClick={() => handleSort(col.toLowerCase().replace(" ", ""))}
                >
                  {col}{" "}
                  {sortField === col.toLowerCase().replace(" ", "")
                    ? sortOrder === "asc"
                      ? " 🔼"
                      : " 🔽"
                    : ""}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((s) => (
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
                    src={s.student_image}
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
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${s.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
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
            ))}
            {paginatedStudents.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-3 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
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
  );
};

export default StudentsList;
