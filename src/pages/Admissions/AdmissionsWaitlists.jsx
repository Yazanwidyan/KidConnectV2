import React, { useState } from "react";

import { useAdmissions } from "../../context/AdmissionsContext";
import StudentModal from "./modals/StudentModal";

const AdmissionsWaitlists = () => {
  const rooms = ["Preschool", "Kindergarten", "Grade 1"];
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { waitlists, students, enrollFromWaitlist, deleteWaitlist, addToWaitlist } = useAdmissions();

  const filteredWaitlists = waitlists
    .filter((wl) => wl.room === selectedRoom)
    .sort((a, b) => a.position - b.position);

  function handleAddStudent(form) {
    // Add student to waitlist with generated id
    addToWaitlist({
      id: Date.now(),
      room: selectedRoom,
      studentId: form.id,
      position: filteredWaitlists.length + 1,
      paperworkDate: form.paperworkDate || "",
      desiredStart: form.desiredStart || "",
      sibling: form.sibling || "No",
    });

    setAddModalOpen(false);
  }

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar Rooms */}
      <div className="w-56 border-r border-gray-300 p-4">
        <h3 className="mb-4 text-lg font-semibold">Rooms</h3>
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li
              key={room}
              className={`cursor-pointer rounded px-3 py-2 ${
                selectedRoom === room ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              {room}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Section */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{selectedRoom} Waitlist</h2>

          <button
            onClick={() => setAddModalOpen(true)}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Add Student to Waitlist
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Student Name</th>
                <th className="px-4 py-2 text-left">Paperwork Date</th>
                <th className="px-4 py-2 text-left">Desired Start</th>
                <th className="px-4 py-2 text-left">Sibling Attending</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWaitlists.map((wl) => {
                const student = students.find((s) => s.id === wl.studentId);
                return (
                  <tr key={wl.id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{wl.position}</td>
                    <td className="px-4 py-2">{student?.name || "Unknown"}</td>
                    <td className="px-4 py-2">{wl.paperworkDate}</td>
                    <td className="px-4 py-2">{wl.desiredStart}</td>
                    <td className="px-4 py-2">{wl.sibling}</td>
                    <td className="space-x-2 px-4 py-2">
                      <button
                        onClick={() => enrollFromWaitlist(wl.id)}
                        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                      >
                        Enroll
                      </button>
                      <button
                        onClick={() => deleteWaitlist(wl.id)}
                        className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {addModalOpen && (
        <StudentModal
          student={null}
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddStudent} // optional, depending how your modal works
        />
      )}
    </div>
  );
};

export default AdmissionsWaitlists;
