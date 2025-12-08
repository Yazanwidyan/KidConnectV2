import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AssignStaffModal = ({ onClose, onAssign }) => {
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    phone: "",
    title: "",
    status: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const rolesList = ["Teacher", "Administrator", "Staff"];
  const statuses = ["Active", "Inactive"];

  // Handle filter input changes
  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const applyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };
  const resetFilters = () => {
    setFilters({ name: "", role: "", phone: "", title: "", status: "" });
    setAppliedFilters({ name: "", role: "", phone: "", title: "", status: "" });
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

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredEmployees.length);
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-white">
        <h3 className="p-6 text-xl">Assign Staff</h3>
        <div className="space-y-4">
          {/* Filters Section */}
          <div className="mb-6 flex flex-wrap items-center gap-2 bg-gray-100 p-6 shadow-lg">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filters.name}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={filters.phone}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
            />
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
            >
              <option value="">All Roles</option>
              {rolesList.map((r) => (
                <option key={r} value={r}>
                  {r}
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
          <div className="overflow-x-auto bg-white">
            <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
              <thead className="bg-gray-50">
                <tr>
                  {/* Checkbox header */}
                  <th className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={
                        paginatedEmployees.length > 0 &&
                        paginatedEmployees.every((e) => selectedRows.includes(e.id))
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newSelected = [
                            ...new Set([...selectedRows, ...paginatedEmployees.map((emp) => emp.id)]),
                          ];
                          setSelectedRows(newSelected);
                        } else {
                          const remaining = selectedRows.filter(
                            (id) => !paginatedEmployees.map((emp) => emp.id).includes(id)
                          );
                          setSelectedRows(remaining);
                        }
                      }}
                    />
                  </th>
                  {["Name", "Phone", "Role", "Status"].map((col) => (
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

              <tbody className="divide-y divide-dashed divide-gray-400/60">
                {paginatedEmployees.length > 0 ? (
                  paginatedEmployees.map((emp) => (
                    <tr key={emp.id} className="transition odd:bg-gray-100 even:bg-white hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(emp.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRows([...selectedRows, emp.id]);
                            } else {
                              setSelectedRows(selectedRows.filter((rowId) => rowId !== emp.id));
                            }
                          }}
                        />
                      </td>
                      <td
                        className="cursor-pointer px-6 py-3 font-normal text-gray-700"
                        onClick={() => navigate(`/admin/employees/employee-profile/${emp.id}`)}
                      >
                        {emp.name}
                      </td>
                      <td className="px-6 py-3 font-normal text-gray-700">{emp.phone}</td>
                      <td className="px-6 py-3 font-normal text-gray-700">{emp.role}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            emp.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {emp.status}
                        </span>
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

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 p-6 py-3">
            <button
              className="flex items-center gap-2 rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
              disabled={selectedRows.length === 0}
              onClick={() => {
                const selectedStaff = employees.filter((e) => selectedRows.includes(e.id));
                // onAssign(selectedStaff);
                onClose();
              }}
            >
              SELECT
            </button>
            <button
              className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              onClick={onClose}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignStaffModal;
