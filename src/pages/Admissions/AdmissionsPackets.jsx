import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useAdmissions } from "../../context/AdmissionsContext";
import { usePaperwork } from "../../context/PaperworkContext";
import NewPacketModal from "./modals/NewPacketModal";

export default function AdmissionsPackets() {
  const navigate = useNavigate();

  const { packets } = useAdmissions();
  const { forms } = usePaperwork();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilters, setStatusFilters] = useState(["Active", "Draft", "Closed"]);
  const [showModal, setShowModal] = useState(false);

  // Filter packets by search term and status
  const filteredPackets = packets.filter(
    (packet) =>
      packet.name.toLowerCase().includes(searchTerm.toLowerCase()) && statusFilters.includes(packet.status)
  );

  // Toggle a status filter
  function toggleFilter(status) {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => s !== status));
    } else {
      setStatusFilters([...statusFilters, status]);
    }
  }

  return (
    <div className="w-full p-6">
      <h1 className="mb-6 text-2xl font-semibold">Admissions Packets</h1>
      <button
        onClick={() => setShowModal(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        + New Packet
      </button>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="relative w-60">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search packets"
            className="w-full rounded-lg border py-2 pl-10 pr-3 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          {["Draft", "Active", "Closed"].map((status) => (
            <span
              key={status}
              onClick={() => toggleFilter(status)}
              className={`cursor-pointer rounded px-2 py-1 ${
                statusFilters.includes(status) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {status} ✕
            </span>
          ))}
        </div>
      </div>

      <p className="mb-2 text-sm text-gray-500">
        Order by: <span className="font-medium">Recent</span>
      </p>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="px-4 py-3">Packet</th>
              <th className="px-4 py-3">Total Students</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Fee</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPackets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                  No packets found.
                </td>
              </tr>
            ) : (
              filteredPackets.map((packet) => (
                <tr key={packet.id} className="border-b hover:bg-gray-50">
                  <td
                    onClick={() => navigate(`/admissions/packets/${packet.id}`)}
                    className="cursor-pointer px-4 py-3 text-blue-600 hover:underline"
                  >
                    {packet.name}
                  </td>{" "}
                  <td className="px-4 py-3">{packet.students}</td>
                  <td className="px-4 py-3">{packet.due === "-" ? "—" : packet.due}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">
                    {packet.fee === 0 ? "None" : `$${packet.fee}`}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs shadow ${
                        packet.status === "Active"
                          ? "bg-blue-100 text-blue-600"
                          : packet.status === "Draft"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      {packet.status}
                    </span>
                  </td>
                  <td className="cursor-pointer px-4 py-3 text-blue-600">Actions ▾</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && <NewPacketModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
