import { ChevronDownIcon, EyeIcon, PencilSquareIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const GroupList = () => {
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

  // ------------------ FILTER INPUT STATE ------------------
  const [filterGroupName, setFilterGroupName] = useState("");
  const [filterStaffName, setFilterStaffName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  // ------------------ APPLIED FILTERS ------------------
  const [appliedFilters, setAppliedFilters] = useState({
    GroupName: "",
    StaffName: "",
    FilterStatus: "",
    FilterType: "",
  });

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
        g.name.toLowerCase().includes(appliedFilters.GroupName.toLowerCase()) &&
        g.staffName.toLowerCase().includes(appliedFilters.StaffName.toLowerCase()) &&
        (appliedFilters.FilterStatus ? g.status === appliedFilters.FilterStatus : true) &&
        (appliedFilters.FilterType ? g.type === appliedFilters.FilterType : true)
    );

    if (sortField) {
      data.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [groups, appliedFilters, sortField, sortOrder]);

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

  const applyFilters = () => {
    setAppliedFilters({
      GroupName: filterGroupName,
      StaffName: filterStaffName,
      FilterStatus: filterStatus,
      FilterType: filterType,
    });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilterGroupName("");
    setFilterStaffName("");
    setFilterStatus("");
    setFilterType("");
    setAppliedFilters({
      GroupName: "",
      StaffName: "",
      FilterStatus: "",
      FilterType: "",
    });
    setCurrentPage(1);
  };

  const uniqueTypes = [...new Set(groups.map((g) => g.type))];

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-primaryFont">Groups List</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <UserGroupIcon className="h-4 w-4 stroke-[2]" /> <h5>Groups</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary">Groups List</span>
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
          className="w-40 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <input
          type="text"
          placeholder="Staff Name"
          value={filterStaffName}
          onChange={(e) => setFilterStaffName(e.target.value)}
          className="w-40 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <div className="relative w-32">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 stroke-[2] text-gray-500" />
        </div>
        <div className="relative w-32">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          >
            <option value="">All Types</option>
            {uniqueTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 stroke-[2] text-gray-500" />
        </div>

        <button
          onClick={applyFilters}
          className="ml-auto rounded bg-green-100 px-4 py-2 text-green-500 ring-green-700 transition duration-300 hover:ring-1"
        >
          Filter
        </button>
        <button
          onClick={resetFilters}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 ring-gray-700 transition duration-300 hover:ring-1"
        >
          Reset
        </button>
      </div>

      {/* ------------------ CARD GRID ------------------ */}
      <div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedGroups.map((group) => (
            <div
              key={group.id}
              className="relative overflow-hidden rounded-xl p-5 text-white shadow-md"
              style={{ backgroundColor: group.color }}
            >
              {/* Title */}
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{group.name}</h2>
                  <p className="text-sm opacity-80">{group.type}</p>
                  <p className="mt-1 text-sm opacity-80">{group.members} Students</p>
                </div>

                {/* Big Number Circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                  {String(group.id).padStart(2, "0")}
                </div>
              </div>

              {/* Avatar list (dummy images) */}
              <div className="mt-4 flex items-center">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  alt="avatar"
                  className="-ml-0 h-8 w-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  alt="avatar"
                  className="-ml-3 h-8 w-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  alt="avatar"
                  className="-ml-3 h-8 w-8 rounded-full border-2 border-white"
                />

                <span className="ml-2 rounded-full bg-white/20 px-2 py-1 text-sm font-semibold">
                  {group.members}+
                </span>
              </div>

              {/* Actions */}
              <div className="absolute bottom-3 right-3 flex gap-2">
                <Link
                  to={`/admin/groups/group-list/group-details/${group.id}`}
                  className="rounded-lg bg-white/20 p-2 hover:bg-white/30"
                >
                  <EyeIcon className="h-5 w-5 text-white" />
                </Link>

                <Link
                  to={`/admin/groups/edit-group/${group.id}`}
                  className="rounded-lg bg-white/20 p-2 hover:bg-white/30"
                >
                  <PencilSquareIcon className="h-5 w-5 text-white" />
                </Link>
              </div>
            </div>
          ))}

          {paginatedGroups.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No groups found.</p>
          )}
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
