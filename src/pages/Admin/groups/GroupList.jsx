import {
  EyeDropperIcon,
  EyeIcon,
  PencilSquareIcon,
  UserGroupIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const GroupList = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Football Team",
      type: "Toddlers",
      staffName: "John Doe",
      color: "#3A49F9",
      members: 32,
      status: "Active",
    },
    {
      id: 2,
      name: "Science Club",
      type: "KG-1",
      staffName: "Jane Smith",
      color: "#10B981",
      members: 18,
      status: "Inactive",
    },
    {
      id: 3,
      name: "Art Students",
      type: "Infants",
      staffName: "Alice Johnson",
      color: "#F59E0B",
      members: 14,
      status: "Active",
    },
    {
      id: 4,
      name: "Math Club",
      type: "Toddlers",
      staffName: "Bob Lee",
      color: "#8B5CF6",
      members: 20,
      status: "Active",
    },
    {
      id: 5,
      name: "Drama Club",
      type: "KG-1",
      staffName: "Sarah Kim",
      color: "#F97316",
      members: 15,
      status: "Inactive",
    },
    {
      id: 6,
      name: "Music Group",
      type: "Infants",
      staffName: "Tom Hanks",
      color: "#10B981",
      members: 12,
      status: "Active",
    },
    {
      id: 7,
      name: "Chess Club",
      type: "Toddlers",
      staffName: "Alice Brown",
      color: "#EAB308",
      members: 22,
      status: "Active",
    },
    {
      id: 8,
      name: "Dance Club",
      type: "KG-1",
      staffName: "David Smith",
      color: "#3B82F6",
      members: 18,
      status: "Inactive",
    },
    {
      id: 9,
      name: "Robotics",
      type: "Infants",
      staffName: "Eve Johnson",
      color: "#10B981",
      members: 10,
      status: "Active",
    },
    {
      id: 10,
      name: "Photography",
      type: "Toddlers",
      staffName: "Frank Lee",
      color: "#F97316",
      members: 12,
      status: "Active",
    },
  ]);

  // ------------------ FILTER STATE ------------------
  const [filterGroupName, setFilterGroupName] = useState("");
  const [filterStaffName, setFilterStaffName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  // ------------------ SORT STATE ------------------
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // ------------------ PAGINATION STATE ------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ------------------ FILTERED AND SORTED GROUPS ------------------
  const filteredGroups = useMemo(() => {
    let data = groups.filter(
      (g) =>
        g.name.toLowerCase().includes(filterGroupName.toLowerCase()) &&
        g.staffName.toLowerCase().includes(filterStaffName.toLowerCase()) &&
        (filterStatus ? g.status === filterStatus : true) &&
        (filterType ? g.type === filterType : true)
    );

    if (sortField) {
      data.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [groups, filterGroupName, filterStaffName, filterStatus, filterType, sortField, sortOrder]);

  // ------------------ PAGINATION LOGIC ------------------
  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredGroups.length);
  const paginatedGroups = filteredGroups.slice(startIndex, endIndex);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const resetFilters = () => {
    setFilterGroupName("");
    setFilterStaffName("");
    setFilterStatus("");
    setFilterType("");
    setCurrentPage(1);
  };

  const uniqueTypes = [...new Set(groups.map((g) => g.type))];

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-primaryFont mb-1 text-3xl font-bold">Groups List</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center gap-1 font-semibold text-black">
                  <UserGroupIcon className="h-4 w-4" /> <h5>Groups</h5>
                </div>
              </li>
              <span>/</span>
              <li aria-current="page">
                <span className="font-semibold text-primary">Groups List</span>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/groups/create-group"
            className="rounded border border-primary bg-primary px-5 py-2 text-white"
          >
            + Create Group
          </Link>
        </div>
      </div>
      {/* ------------------ FILTERS ------------------ */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          placeholder="Group Name"
          value={filterGroupName}
          onChange={(e) => setFilterGroupName(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Staff Name"
          value={filterStaffName}
          onChange={(e) => setFilterStaffName(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">All Types</option>
          {uniqueTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button
          onClick={resetFilters}
          className="rounded border-gray-200 bg-gray-200 px-4 py-2 text-gray-600 ring-gray-600 transition hover:bg-gray-300 hover:ring-1"
        >
          Reset
        </button>
      </div>

      <div className="rounded-lg bg-white shadow-lg">
        {/* ------------------ TABLE ------------------ */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
            <thead>
              <tr>
                {["name", "type", "members", "status"].map((field) => (
                  <th
                    key={field}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700"
                    onClick={() => handleSort(field)}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {sortField === field ? (sortOrder === "asc" ? " 🔼" : " 🔽") : ""}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-gray-400/60">
              {paginatedGroups.map((group) => (
                <tr key={group.id} className="odd:bg-slate-100 even:bg-white">
                  <td className="px-6 py-3 font-normal text-gray-600">{group.name}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">{group.type}</td>
                  <td className="px-6 py-3 font-normal text-gray-600">{group.members}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        group.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {group.status}
                    </span>
                  </td>

                  <td className="flex justify-end gap-2 px-6 py-3 text-right">
                    <Link
                      to={`/admin/groups/group-details/${group.id}`}
                      className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                    >
                      <EyeIcon className="h-5 w-5 stroke-[2]" />
                    </Link>

                    <Link
                      to={`/admin/groups/edit-group/${group.id}`}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <PencilSquareIcon className="h-5 w-5 stroke-[2]" />
                    </Link>
                  </td>
                </tr>
              ))}

              {paginatedGroups.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-500">
                    No groups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ------------------ PAGINATION ------------------ */}
        <div className="mt-4 flex flex-col items-center justify-between gap-2 p-6 sm:flex-row">
          <div>
            Showing {paginatedGroups.length === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
            {filteredGroups.length} entries
          </div>
          <div className="flex items-center gap-2">
            <div>
              Rows per page:{" "}
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded border px-2 py-1"
              >
                {[3, 5, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
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

export default GroupList;
