import {
  CheckCircleIcon,
  EyeIcon,
  PlusIcon,
  UserCircleIcon,
  UserPlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";

const Leaves = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      employee: "Maysa Hassan Salim",
      type: "Sick Leave",
      startDate: "2024-01-02",
      endDate: "2024-01-02",
      status: "Pending",
      comment: "Feeling unwell",
      attachments: ["medical_note.pdf"],
    },
    {
      id: 2,
      employee: "Maysa Salim",
      type: "Annual Leave",
      startDate: "2023-08-25",
      endDate: "2023-08-30",
      status: "Pending",
      comment: "Family trip",
      attachments: [],
    },
    {
      id: 3,
      employee: "Maysa Hassan Salim",
      type: "Sick Leave",
      startDate: "2023-08-23",
      endDate: "2023-08-23",
      status: "Approved",
      comment: "Medical appointment",
      attachments: ["doctor_note.jpg"],
    },
  ]);

  // Filter states
  const [filters, setFilters] = useState({
    employee: "",
    type: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  // Modals
  const [approveRejectModal, setApproveRejectModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);
  const [addModal, setAddModal] = useState(false);

  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState(null);

  // Pagination & sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // New leave fields
  const [newLeave, setNewLeave] = useState({
    employee: "",
    type: "",
    startDate: "",
    endDate: "",
    comment: "",
    attachment: null,
  });

  // Filtering logic
  const filteredRequests = useMemo(() => {
    let data = requests.filter((r) => {
      return (
        (filters.employee === "" || r.employee.toLowerCase().includes(filters.employee.toLowerCase())) &&
        (filters.type === "" || r.type.toLowerCase().includes(filters.type.toLowerCase())) &&
        (filters.status === "" || r.status === filters.status) &&
        (filters.startDate === "" || r.startDate >= filters.startDate) &&
        (filters.endDate === "" || r.endDate <= filters.endDate)
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
  }, [requests, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredRequests.length);
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  // Handlers
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const resetFilters = () => setFilters({ employee: "", type: "", status: "", startDate: "", endDate: "" });

  const openApproveReject = (req, action) => {
    setApproveRejectModal({ ...req, action });
    setComment("");
    setAttachment(null);
  };

  const saveApproveReject = () => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === approveRejectModal.id
          ? {
              ...req,
              status: approveRejectModal.action === "approve" ? "Approved" : "Rejected",
              managerComment: comment,
              managerAttachment: attachment ? [attachment.name] : [],
            }
          : req
      )
    );
    setApproveRejectModal(null);
  };

  const saveNewLeave = () => {
    const newEntry = {
      id: requests.length + 1,
      employee: newLeave.employee,
      type: newLeave.type,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      status: "Pending",
      comment: newLeave.comment,
      attachments: newLeave.attachment ? [newLeave.attachment.name] : [],
    };
    setRequests([...requests, newEntry]);
    setNewLeave({ employee: "", type: "", startDate: "", endDate: "", comment: "", attachment: null });
    setAddModal(false);
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-primaryFont mb-1 text-3xl font-bold">Employee Leave Requests</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center gap-1 font-semibold text-black">
                  <UserCircleIcon className="h-4 w-4 stroke-[2]" /> <h5>Employees</h5>
                </div>
              </li>
              <span>/</span>
              <li aria-current="page">
                <span className="font-semibold text-primary">Employee Leave Requests</span>
              </li>
            </ol>
          </nav>
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <PlusIcon className="h-5 w-5" /> Add Leave
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          name="employee"
          placeholder="Employee"
          value={filters.employee}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          name="type"
          placeholder="Leave Type"
          value={filters.type}
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
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <button
          onClick={resetFilters}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Employee", "Type", "Start Date", "End Date", "Status", "Actions"].map((col) => (
                <th
                  key={col}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700"
                  onClick={() => col !== "Actions" && handleSort(col.toLowerCase().replace(" ", ""))}
                >
                  {col}{" "}
                  {sortField === col.toLowerCase().replace(" ", "")
                    ? sortOrder === "asc"
                      ? " 🔼"
                      : " 🔽"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req, idx) => (
                <tr key={req.id} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                  <td className="px-6 py-3">{req.employee}</td>
                  <td className="px-6 py-3">{req.type}</td>
                  <td className="px-6 py-3">{req.startDate}</td>
                  <td className="px-6 py-3">{req.endDate}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : req.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-3">
                    <button
                      onClick={() => setViewModal(req)}
                      className="rounded bg-blue-100 p-[5px] text-blue-500 hover:ring-1 hover:ring-blue-700"
                    >
                      <EyeIcon className="h-5 w-5 stroke-[2]" />
                    </button>
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() => openApproveReject(req, "approve")}
                          className="rounded bg-green-100 p-[5px] text-green-500 hover:ring-1 hover:ring-green-700"
                        >
                          <CheckCircleIcon className="h-5 w-5 stroke-[2]" />
                        </button>
                        <button
                          onClick={() => openApproveReject(req, "reject")}
                          className="rounded bg-red-100 p-[5px] text-red-500 hover:ring-1 hover:ring-red-700"
                        >
                          <XCircleIcon className="h-5 w-5 stroke-[2]" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-3 text-center text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 p-6 sm:flex-row">
          <div className="text-sm text-gray-700">
            Showing {paginatedRequests.length === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
            {filteredRequests.length} entries
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

      {/* Add Leave Modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Add Leave</h2>
            {["employee", "type", "startDate", "endDate"].map((field) => (
              <input
                key={field}
                type={field.includes("Date") ? "date" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newLeave[field]}
                onChange={(e) => setNewLeave({ ...newLeave, [field]: e.target.value })}
                className="mb-2 w-full rounded border px-3 py-2"
              />
            ))}
            <textarea
              placeholder="Comment"
              value={newLeave.comment}
              onChange={(e) => setNewLeave({ ...newLeave, comment: e.target.value })}
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              type="file"
              onChange={(e) => setNewLeave({ ...newLeave, attachment: e.target.files[0] })}
              className="mb-4 w-full"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setAddModal(false)} className="rounded bg-gray-200 px-4 py-2">
                Cancel
              </button>
              <button onClick={saveNewLeave} className="rounded bg-primary px-4 py-2 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve/Reject Modal */}
      {approveRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {approveRejectModal.action === "approve" ? "Approve" : "Reject"} Leave
            </h2>
            <textarea
              placeholder="Add comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-3 w-full rounded border px-3 py-2"
            />
            <input type="file" onChange={(e) => setAttachment(e.target.files[0])} className="mb-4" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setApproveRejectModal(null)} className="rounded bg-gray-200 px-4 py-2">
                Cancel
              </button>
              <button onClick={saveApproveReject} className="rounded bg-green-500 px-4 py-2 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Leave Details</h2>
            {["employee", "type", "startDate", "endDate"].map((f) => (
              <p key={f} className="mb-2">
                <strong>{f.charAt(0).toUpperCase() + f.slice(1)}:</strong> {viewModal[f]}
              </p>
            ))}
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`rounded px-3 py-1 text-sm text-white ${viewModal.status === "Approved" ? "bg-green-600" : viewModal.status === "Rejected" ? "bg-red-600" : "bg-yellow-600"}`}
              >
                {viewModal.status}
              </span>
            </p>
            {viewModal.comment && (
              <p className="mb-2">
                <strong>Comment:</strong> {viewModal.comment}
              </p>
            )}
            {viewModal.attachments.length > 0 && (
              <div className="mb-2">
                <strong>Attachments:</strong>
                <ul className="ml-5 list-disc">
                  {viewModal.attachments.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end">
              <button onClick={() => setViewModal(null)} className="rounded bg-gray-200 px-4 py-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
