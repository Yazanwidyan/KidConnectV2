import React, { useState } from "react";
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
  ]);

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // ------------------ FILTER STATE ------------------
  const [filterGroupName, setFilterGroupName] = useState("");
  const [filterStaffName, setFilterStaffName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  // Filtered groups state
  const [filteredGroups, setFilteredGroups] = useState(groups);

  // ------------------ HANDLERS ------------------
  const handleRowClick = (id) => {
    navigate(`/admin/groups/group-details/${id}`);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sorted = [...filteredGroups].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredGroups(sorted);
  };

  const applyFilters = () => {
    const filtered = groups.filter((g) => {
      return (
        g.name.toLowerCase().includes(filterGroupName.toLowerCase()) &&
        g.staffName.toLowerCase().includes(filterStaffName.toLowerCase()) &&
        (filterStatus ? g.status === filterStatus : true) &&
        (filterType ? g.type === filterType : true)
      );
    });
    setFilteredGroups(filtered);
  };

  const resetFilters = () => {
    setFilterGroupName("");
    setFilterStaffName("");
    setFilterStatus("");
    setFilterType("");
    setFilteredGroups(groups);
  };

  // Get unique types for filter dropdown
  const uniqueTypes = [...new Set(groups.map((g) => g.type))];

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Groups</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/groups/create-group"
            className="rounded-md bg-[#3A49F9] px-4 py-2 font-medium text-white shadow hover:bg-[#2e3abf]"
          >
            + Create Group
          </Link>
        </div>
      </div>

      {/* ------------------ FILTERS ------------------ */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
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

        <button onClick={applyFilters} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Filter
        </button>
        <button onClick={resetFilters} className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500">
          Reset
        </button>
      </div>

      {/* ------------------ TABLE ------------------ */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-700"
                onClick={() => handleSort("name")}
              >
                Group Name
              </th>
              <th
                className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-700"
                onClick={() => handleSort("type")}
              >
                Type
              </th>
              <th
                className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-700"
                onClick={() => handleSort("members")}
              >
                Members
              </th>
              <th
                className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-700"
                onClick={() => handleSort("status")}
              >
                Status
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredGroups.map((group) => (
              <tr key={group.id}>
                <td className="px-6 py-4 font-medium text-gray-800">{group.name}</td>
                <td className="px-6 py-4 text-gray-600">{group.type}</td>
                <td className="px-6 py-4 text-gray-600">{group.members}</td>

                <td className={`px-6 py-4 ${group.status === "Active" ? "text-green-700" : "text-red-700"}`}>
                  {group.status}
                </td>
                <td className="flex justify-end gap-3 px-6 py-4 text-right">
                  <Link
                    to={`/admin/groups/group-details/${group.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    to={`/admin/groups/edit-group/${group.id}`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}

            {filteredGroups.length === 0 && (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No groups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupList;
