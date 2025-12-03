import { EyeIcon, PencilSquareIcon, UserPlusIcon } from "@heroicons/react/24/outline";
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
    // ... add more students
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
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-primaryFont mb-1 text-3xl font-bold">Students List</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center gap-1 font-semibold text-black">
                  <UserPlusIcon className="h-4 w-4" /> <h5>Students</h5>
                </div>
              </li>
              <span>/</span>
              <li aria-current="page">
                <span className="font-semibold text-primary">Students List</span>
              </li>
            </ol>
          </nav>
        </div>
        <Link
          to="/admin/students/add-student"
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <UserPlusIcon className="h-5 w-5 stroke-[2]" />
          Add Student
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          name="search"
          placeholder="Student Name or ID"
          value={filters.search}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          name="parentName"
          placeholder="Parent Name"
          value={filters.parentName}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          name="parentPhone"
          placeholder="Parent Phone"
          value={filters.parentPhone}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          name="groupName"
          value={filters.groupName}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        >
          <option value="">All Groups</option>
          {groupNames.map((g) => (
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
          className="rounded border px-3 py-2"
        />
        <input
          type="number"
          name="ageTo"
          placeholder="Age To"
          value={filters.ageTo}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <button
          onClick={applyFilters}
          className="rounded bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20"
        >
          Filter
        </button>
        <button
          onClick={resetFilters}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
      <div className="rounded-lg bg-white shadow-lg">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
            <thead>
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedStudents.length === filteredStudents.length && filteredStudents.length > 0
                    }
                    onChange={handleSelectAll}
                  />
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
            <tbody className="divide-y divide-dashed divide-gray-400/60">
              {paginatedStudents.map((s) => (
                <tr key={s.id} className="odd:bg-slate-100 even:bg-white">
                  <td className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(s.id)}
                      onChange={() => handleCheckboxChange(s.id)}
                    />
                  </td>
                  <td
                    className="cursor-pointer px-6 py-3 font-normal text-gray-600"
                    onClick={() => navigate(`/admin/students/student-profile/${s.id}`)}
                  >
                    {s.firstName} {s.lastName}
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
                      <EyeIcon className="h-5 w-5 stroke-[2]" />
                    </Link>
                    <Link
                      to={`/admin/students/edit-student/${s.id}`}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <PencilSquareIcon className="h-5 w-5 stroke-[2]" />
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
    </div>
  );
};

export default StudentsList;
