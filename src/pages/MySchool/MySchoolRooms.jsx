import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialRooms = [
  { id: 1, name: "Room A", capacity: 25, teacher: "Mr. Ali" },
  { id: 2, name: "Room B", capacity: 30, teacher: "Ms. Lina" },
  { id: 3, name: "Room C", capacity: 20, teacher: "Mr. Omar" },
];

const MySchoolRooms = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    teacher: "",
  });

  const filteredRooms = rooms.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRoom) {
      setRooms(rooms.map((r) => (r.id === editingRoom.id ? { ...editingRoom, ...formData } : r)));
    } else {
      setRooms([...rooms, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: "", capacity: "", teacher: "" });
    setEditingRoom(null);
    setModalOpen(false);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      capacity: room.capacity,
      teacher: room.teacher,
    });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* Header & Search */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold text-primary">Classrooms</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by room name..."
            className="rounded border px-3 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="rounded bg-primary px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => setModalOpen(true)}
          >
            Add Room
          </button>
        </div>
      </div>

      {/* Rooms Table */}
      {rooms.length === 0 ? (
        <div className="flex h-[50vh] flex-col items-center justify-center text-center">
          <p className="text-gray-500">No rooms available. Add a new room!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3">Room Name</th>
                <th className="px-6 py-3">Capacity</th>
                <th className="px-6 py-3">Teacher</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{room.name}</td>
                  <td className="px-6 py-3">{room.capacity}</td>
                  <td className="px-6 py-3">{room.teacher}</td>
                  <td className="flex gap-3 px-6 py-3">
                    <button onClick={() => handleEdit(room)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(room.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              {editingRoom ? "Edit Room" : "Add Room"}
            </h3>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Room Name"
                className="rounded border px-3 py-2"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                className="rounded border px-3 py-2"
                value={formData.capacity}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="teacher"
                placeholder="Teacher Name"
                className="rounded border px-3 py-2"
                value={formData.teacher}
                onChange={handleInputChange}
                required
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingRoom(null);
                    setFormData({ name: "", capacity: "", teacher: "" });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="rounded bg-primary px-4 py-2 text-white hover:bg-blue-600">
                  {editingRoom ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySchoolRooms;
