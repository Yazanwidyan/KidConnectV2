import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialAnnouncements = [
  {
    id: 1,
    title: "School Closed",
    audience: "All",
    date: "2025-11-20",
    content: "School will be closed next Monday.",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    audience: "Parents",
    date: "2025-11-22",
    content: "Meeting scheduled at 5 PM in the main hall.",
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    audience: "All",
    date: "",
    content: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAnnouncement) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingAnnouncement.id ? { ...editingAnnouncement, ...formData } : a
        )
      );
    } else {
      setAnnouncements([...announcements, { id: Date.now(), ...formData }]);
    }
    setFormData({ title: "", audience: "All", date: "", content: "" });
    setEditingAnnouncement(null);
    setModalOpen(false);
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      audience: announcement.audience,
      date: announcement.date,
      content: announcement.content,
    });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary">Announcements</h2>
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          + New Announcement
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <select className="rounded border px-3 py-2">
          <option>Most Recent</option>
        </select>
        <select className="rounded border px-3 py-2">
          <option>Audience</option>
        </select>
      </div>

      {/* Announcements Table */}
      {announcements.length === 0 ? (
        <div className="flex h-[50vh] flex-col items-center justify-center text-center">
          <p className="text-gray-500">No announcements yet. Add a new announcement!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Audience</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Content</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{a.title}</td>
                  <td className="px-6 py-3">{a.audience}</td>
                  <td className="px-6 py-3">{a.date}</td>
                  <td className="px-6 py-3">{a.content}</td>
                  <td className="flex gap-3 px-6 py-3">
                    <button onClick={() => handleEdit(a)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:text-red-800">
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
              {editingAnnouncement ? "Edit Announcement" : "New Announcement"}
            </h3>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="rounded border px-3 py-2"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <select
                name="audience"
                className="rounded border px-3 py-2"
                value={formData.audience}
                onChange={handleInputChange}
              >
                <option>All</option>
                <option>Parents</option>
                <option>Staff</option>
              </select>
              <input
                type="date"
                name="date"
                className="rounded border px-3 py-2"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                className="rounded border px-3 py-2"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingAnnouncement(null);
                    setFormData({ title: "", audience: "All", date: "", content: "" });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="rounded bg-primary px-4 py-2 text-white hover:bg-blue-600">
                  {editingAnnouncement ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
