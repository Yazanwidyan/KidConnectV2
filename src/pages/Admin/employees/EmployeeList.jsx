import { EyeIcon, PencilSquareIcon, UserCircleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();

  // Employee data
  const employees = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Teacher",
      phone: "+9629721975",
      status: "Active",
      title: "Math Teacher",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Administrator",
      phone: "+9629732187",
      status: "Active",
      title: "Office Admin",
    },
    {
      id: 3,
      name: "Carla Brown",
      role: "Staff",
      phone: "+9624232212",
      status: "Inactive",
      title: "Support Staff",
    },
    // Add more employees as needed
  ];

  // Filter options
  const rolesList = ["Teacher", "Administrator", "Staff"];
  const statuses = ["Active", "Inactive"];

  // Filter states
  const initialFilters = { name: "", role: "", phone: "", title: "", status: "" };
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  // Table states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Handle filter input changes
  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const applyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };
  const resetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setCurrentPage(1);
  };

  // Filtered & sorted employees
  const filteredEmployees = useMemo(() => {
    let data = employees.filter((emp) => {
      const nameMatch = emp.name.toLowerCase().includes(appliedFilters.name.toLowerCase());
      const roleMatch = appliedFilters.role
        ? emp.role.toLowerCase() === appliedFilters.role.toLowerCase()
        : true;
      const phoneMatch = emp.phone.toLowerCase().includes(appliedFilters.phone.toLowerCase());
      const titleMatch = emp.title.toLowerCase().includes(appliedFilters.title.toLowerCase());
      const statusMatch = appliedFilters.status ? emp.status === appliedFilters.status : true;
      return nameMatch && roleMatch && phoneMatch && titleMatch && statusMatch;
    });

    if (sortField) {
      data.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [employees, appliedFilters, sortField, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredEmployees.length);
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Sorting handler
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-primaryFont mb-1 text-3xl font-bold">Employees List</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center gap-1 font-semibold text-black">
                  <UserCircleIcon className="h-4 w-4 stroke-[2]" /> <h5>Employees</h5>
                </div>
              </li>
              <span>/</span>
              <li aria-current="page">
                <span className="font-semibold text-primary">Employees List</span>
              </li>
            </ol>
          </nav>
        </div>
        <Link
          to="/admin/employees/add-employee"
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <UserPlusIcon className="h-5 w-5" /> Add Employee
        </Link>
      </div>

      {/* Filters Section */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        >
          <option value="">All Roles</option>
          {rolesList.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={filters.phone}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={filters.title}
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
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
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

      {/* Employee Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Role", "Title", "Phone", "Status", "Actions"].map((col) => (
                <th
                  key={col}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700"
                  onClick={() => col !== "Actions" && handleSort(col.toLowerCase())}
                >
                  {col} {sortField === col.toLowerCase() ? (sortOrder === "asc" ? " 🔼" : " 🔽") : ""}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <tr key={emp.id} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                  <td
                    className="cursor-pointer px-6 py-3 font-normal text-gray-700"
                    onClick={() => navigate(`/admin/employees/employee-profile/${emp.id}`)}
                  >
                    {emp.name}
                  </td>
                  <td className="px-6 py-3 font-normal text-gray-700">{emp.role}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{emp.title}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{emp.phone}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${emp.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-3">
                    <Link
                      to={`/admin/employees/employee-profile/${emp.id}`}
                      className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                    >
                      <EyeIcon className="h-5 w-5 stroke-[2]" />
                    </Link>
                    <Link
                      to={`/admin/employees/edit-employee/${emp.id}`}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <PencilSquareIcon className="h-5 w-5 stroke-[2]" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-3 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 p-6 sm:flex-row">
          <div className="text-sm text-gray-700">
            Showing {paginatedEmployees.length === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
            {filteredEmployees.length} entries
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

export default EmployeeList;
