import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TransferModal from "./modals/TransferModal";

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
  ]);

  // ------------------ FILTER INPUT STATE ------------------
  const [filterGroupName, setFilterGroupName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  // ------------------ APPLIED FILTERS ------------------
  const [appliedFilters, setAppliedFilters] = useState({
    GroupName: "",
    FilterStatus: "",
    FilterType: "",
  });

  // ------------------ SORT STATE ------------------
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // ------------------ PAGINATION ------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ------------------ DELETE MODAL STATE ------------------
  const [showModal, setShowModal] = useState(false);
  const [deleteTargetGroup, setDeleteTargetGroup] = useState(null);

  const uniqueTypes = [...new Set(groups.map((g) => g.type))];

  // ------------------ FILTER + SORT ------------------
  const filteredGroups = useMemo(() => {
    let data = groups.filter(
      (g) =>
        g.name.toLowerCase().includes(appliedFilters.GroupName.toLowerCase()) &&
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

  // ------------------ PAGINATION ------------------
  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredGroups.length);
  const paginatedGroups = filteredGroups.slice(startIndex, endIndex);

  const applyFilters = () => {
    setAppliedFilters({
      GroupName: filterGroupName,
      FilterStatus: filterStatus,
      FilterType: filterType,
    });
    setCurrentPage(1);
  };

  // ------------------ DELETE LOGIC ------------------
  const handleDeleteClick = (group) => {
    if (group.members > 0) {
      setDeleteTargetGroup(group);
      setShowModal(true);
    } else {
      // delete directly if 0 members
      setGroups(groups.filter((g) => g.id !== group.id));
    }
  };

  return (
    <div className="w-full p-6">
      {/* HEADER */}
      <div className="mb-3 flex flex-wrap items-end justify-between">
        <h1 className="text-2xl font-bold text-black">Groups</h1>
      </div>

      {/* FILTERS */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          {/* Search */}
          <div className="relative w-1/3">
            <label className="mb-1 block text-gray-600">Search</label>
            <input
              type="text"
              placeholder="Search by group name"
              value={filterGroupName}
              onChange={(e) => setFilterGroupName(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
            />
            <MagnifyingGlassIcon className="pointer-events-none absolute right-3 top-[39px] h-4 w-4 text-gray-500" />
          </div>

          {/* Type Filter */}
          <div className="relative w-1/4">
            <label className="mb-1 block text-gray-600">Types</label>
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
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-[39px] h-4 w-4 text-gray-500" />
          </div>

          {/* Status Filter */}
          <div className="relative w-1/4">
            <label className="mb-1 block text-gray-600">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-[39px] h-4 w-4 text-gray-500" />
          </div>
        </div>

        <Link
          to="/admin/groups/create-group"
          className="flex items-center gap-2 rounded bg-primary px-5 py-2 font-semibold text-white"
        >
          <PlusIcon className="h-5 w-5" />
          Create Group
        </Link>
      </div>

      {/* GRID */}
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedGroups.map((group) => (
            <div
              key={group.id}
              className="relative cursor-pointer overflow-hidden rounded-xl p-5 text-white shadow-md"
              style={{ backgroundColor: group.color }}
              onClick={() => navigate(`/admin/groups/group-details/${group.id}`)}
            >
              {/* Title */}
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{group.name}</h2>
                  <p className="text-sm opacity-80">{group.type}</p>
                  <p className="mt-1 text-sm opacity-80">{group.members} Students</p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                  {String(group.id).padStart(2, "0")}
                </div>
              </div>

              {/* Avatars */}
              <div className="mt-4 flex items-center">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  className="h-8 w-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  className="-ml-3 h-8 w-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  className="-ml-3 h-8 w-8 rounded-full border-2 border-white"
                />

                <span className="ml-2 rounded-full bg-white/20 px-2 py-1 text-sm font-semibold">
                  {group.members}+
                </span>
              </div>

              {/* Actions */}
              <div className="absolute bottom-3 right-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Link
                  to={`/admin/groups/edit-group/${group.id}`}
                  className="rounded-lg bg-white/20 p-2 hover:bg-white/30"
                >
                  <PencilSquareIcon className="h-5 w-5 text-white" />
                </Link>

                <button
                  onClick={() => handleDeleteClick(group)}
                  className="rounded-lg bg-white/20 p-2 hover:bg-white/30"
                >
                  <TrashIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------ PAGINATION ------------------ */}
      <div className="flex flex-col items-center justify-between gap-2 px-0 py-6 sm:flex-row">
        <div>
          Showing {paginatedGroups.length === 0 ? 0 : startIndex + 1} to {endIndex} of {filteredGroups.length}{" "}
          entries
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

      {/* DELETE / TRANSFER MODAL */}
      <TransferModal
        isOpen={showModal}
        groups={groups}
        currentGroupId={deleteTargetGroup?.id}
        onCancel={() => setShowModal(false)}
        onConfirm={(transferData) => {
          console.log("Transferred:", transferData);

          // 1. Remove the group
          setGroups(groups.filter((g) => g.id !== deleteTargetGroup.id));

          setShowModal(false);
        }}
      />
    </div>
  );
};

export default GroupList;
