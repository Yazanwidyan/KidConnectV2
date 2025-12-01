import React, { useState } from "react";
import { FaCheck, FaEye, FaPlus, FaTimes } from "react-icons/fa";

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

  const [approveRejectModal, setApproveRejectModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);
  const [addModal, setAddModal] = useState(false); // New Add Leave Modal
  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState(null);

  // Filter states
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // New leave fields
  const [newEmployee, setNewEmployee] = useState("");
  const [newType, setNewType] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newAttachment, setNewAttachment] = useState(null);

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

  const handleFilter = () => {
    return requests.filter((req) => {
      return (
        (filterEmployee === "" || req.employee.toLowerCase().includes(filterEmployee.toLowerCase())) &&
        (filterType === "" || req.type.toLowerCase().includes(filterType.toLowerCase())) &&
        (filterStatus === "" || req.status === filterStatus) &&
        (filterStartDate === "" || req.startDate >= filterStartDate) &&
        (filterEndDate === "" || req.endDate <= filterEndDate)
      );
    });
  };

  const handleReset = () => {
    setFilterEmployee("");
    setFilterType("");
    setFilterStatus("");
    setFilterStartDate("");
    setFilterEndDate("");
  };

  const filteredRequests = handleFilter();

  const saveNewLeave = () => {
    const newLeave = {
      id: requests.length + 1,
      employee: newEmployee,
      type: newType,
      startDate: newStartDate,
      endDate: newEndDate,
      status: "Pending",
      comment: newComment,
      attachments: newAttachment ? [newAttachment.name] : [],
    };
    setRequests([...requests, newLeave]);
    // Reset fields
    setNewEmployee("");
    setNewType("");
    setNewStartDate("");
    setNewEndDate("");
    setNewComment("");
    setNewAttachment(null);
    setAddModal(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Employee Leave Requests</h2>
        <button
          onClick={() => setAddModal(true)}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FaPlus /> Add Leave
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex flex-wrap gap-2 rounded border bg-white p-4 shadow">
        <input
          type="text"
          placeholder="Employee Name"
          value={filterEmployee}
          onChange={(e) => setFilterEmployee(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Leave Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <input
          type="date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          className="rounded border px-3 py-2"
        />
        <button onClick={handleReset} className="rounded bg-gray-200 px-4 py-2">
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border bg-white shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Sl. No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Employee Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Leave Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Start Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">End Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredRequests.map((req, index) => (
              <tr key={req.id}>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{req.employee}</td>
                <td className="px-6 py-3">{req.type}</td>
                <td className="px-6 py-3">{req.startDate}</td>
                <td className="px-6 py-3">{req.endDate}</td>
                <td className="px-6 py-3">
                  <span
                    className={`rounded px-3 py-1 text-sm text-white ${
                      req.status === "Approved"
                        ? "bg-green-600"
                        : req.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="flex gap-2 px-6 py-3">
                  <button onClick={() => setViewModal(req)} className="text-gray-500 hover:text-gray-900">
                    <FaEye />
                  </button>
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => openApproveReject(req, "approve")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => openApproveReject(req, "reject")}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Leave Modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Add Leave</h2>
            <input
              type="text"
              placeholder="Employee Name"
              value={newEmployee}
              onChange={(e) => setNewEmployee(e.target.value)}
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              type="text"
              placeholder="Leave Type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              type="date"
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              type="date"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <textarea
              placeholder="Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2 w-full rounded border px-3 py-2"
            />
            <input
              type="file"
              onChange={(e) => setNewAttachment(e.target.files[0])}
              className="mb-4 w-full"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setAddModal(false)} className="rounded bg-gray-200 px-4 py-2">
                Cancel
              </button>
              <button onClick={saveNewLeave} className="rounded bg-blue-600 px-4 py-2 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve/Reject and View Modals remain unchanged */}
      {approveRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {approveRejectModal.action === "approve" ? "Approve" : "Reject"} Leave
            </h2>
            <p className="mb-2">
              Employee: <span className="font-medium">{approveRejectModal.employee}</span>
            </p>
            <p className="mb-2">
              Leave Type: <span className="font-medium">{approveRejectModal.type}</span>
            </p>
            <textarea
              placeholder="Add comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-3 w-full rounded border px-3 py-2"
            ></textarea>
            <input type="file" onChange={(e) => setAttachment(e.target.files[0])} className="mb-4" />
            <div className="flex justify-end gap-2">
              <button className="rounded bg-gray-200 px-4 py-2" onClick={() => setApproveRejectModal(null)}>
                Cancel
              </button>
              <button className="rounded bg-green-500 px-4 py-2 text-white" onClick={saveApproveReject}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Leave Details</h2>
            <p className="mb-2">
              <strong>Employee:</strong> {viewModal.employee}
            </p>
            <p className="mb-2">
              <strong>Leave Type:</strong> {viewModal.type}
            </p>
            <p className="mb-2">
              <strong>Start Date:</strong> {viewModal.startDate}
            </p>
            <p className="mb-2">
              <strong>End Date:</strong> {viewModal.endDate}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`rounded px-3 py-1 text-sm text-white ${
                  viewModal.status === "Approved"
                    ? "bg-green-600"
                    : viewModal.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                }`}
              >
                {viewModal.status}
              </span>
            </p>
            {viewModal.comment && (
              <p className="mb-2">
                <strong>Employee Comment:</strong> {viewModal.comment}
              </p>
            )}
            {viewModal.attachments.length > 0 && (
              <div className="mb-2">
                <strong>Attachments:</strong>
                <ul className="ml-5 list-disc">
                  {viewModal.attachments.map((file, idx) => (
                    <li key={idx}>{file}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end">
              <button className="rounded bg-gray-200 px-4 py-2" onClick={() => setViewModal(null)}>
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
