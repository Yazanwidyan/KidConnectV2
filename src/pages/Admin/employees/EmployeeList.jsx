import React, { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();

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
  ];

  // Initial Filter Values
  const initialFilters = {
    name: "",
    role: "",
    phone: "",
    title: "",
    status: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const rolesList = ["Teacher", "Administrator", "Staff"];
  const statuses = ["Active", "Inactive"];

  // Change filter values
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // APPLY FILTER BUTTON
  const applyFilters = () => {
    const result = employees.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        emp.role.toLowerCase().includes(filters.role.toLowerCase()) &&
        emp.phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
        emp.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (filters.status ? emp.status === filters.status : true)
      );
    });

    setFilteredEmployees(result);
  };

  // RESET BUTTON
  const resetFilters = () => {
    setFilters(initialFilters);
    setFilteredEmployees(employees);
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Employee List</h2>

        <Link
          to="/admin/employees/add-employee"
          className="rounded-md bg-[#3A49F9] px-4 py-2 font-semibold text-white shadow-md transition hover:bg-[#2e3abf]"
        >
          Add Employee
        </Link>
      </div>

      {/* ---------------- FILTER SECTION ---------------- */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Filters</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <input
            type="text"
            name="name"
            placeholder="Filter by Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="rounded-md border px-3 py-2"
          />

          <select
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            className="rounded-md border px-3 py-2"
          >
            <option value="">Filter by Role</option>
            {rolesList.map((r) => (
              <option key={r} value={r.toLowerCase()}>
                {r}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Filter by Phone"
            value={filters.phone}
            onChange={handleFilterChange}
            className="rounded-md border px-3 py-2"
          />

          <input
            type="text"
            name="title"
            placeholder="Filter by Employee Title"
            value={filters.title}
            onChange={handleFilterChange}
            className="rounded-md border px-3 py-2"
          />

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="rounded-md border px-3 py-2"
          >
            <option value="">Filter by Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <button
            onClick={applyFilters}
            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Filter
          </button>

          <button
            onClick={resetFilters}
            className="rounded-md bg-gray-400 px-4 py-2 font-semibold text-white hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ---------------- EMPLOYEE TABLE ---------------- */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredEmployees.map((emp, index) => (
              <tr key={emp.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>

                <td
                  onClick={() => navigate(`/admin/employees/employee-profile/${emp.id}`)}
                  className="cursor-pointer px-6 py-4 text-sm text-gray-700 hover:underline"
                >
                  {emp.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">{emp.role}</td>

                <td className="px-6 py-4 text-sm text-gray-700">{emp.title}</td>

                <td className="px-6 py-4 text-sm text-gray-700">{emp.phone}</td>

                <td className="px-6 py-4 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      emp.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="flex gap-2 px-6 py-4 text-sm">
                  <Link
                    to={`/admin/employees/employee-profile/${emp.id}`}
                    className="text-green-600 transition hover:text-green-800"
                  >
                    <FaEye />
                  </Link>

                  <Link
                    to={`/admin/employees/edit-employee/${emp.id}`}
                    className="text-blue-600 transition hover:text-blue-800"
                  >
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
