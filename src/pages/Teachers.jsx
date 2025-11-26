import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialTeachers = [
  { id: 1, name: "Ahmed Khalid", email: "ahmed@example.com", class: "KG1" },
  { id: 2, name: "Fatima Omar", email: "fatima@example.com", class: "KG2" },
];

const Teachers = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", class: "" });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      setTeachers(teachers.map((t) => (t.id === editingTeacher.id ? { ...editingTeacher, ...formData } : t)));
    } else {
      setTeachers([...teachers, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: "", email: "", class: "" });
    setEditingTeacher(null);
    setModalOpen(false);
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({ name: teacher.name, email: teacher.email, class: teacher.class });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-primary text-2xl font-semibold">Teachers</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary rounded px-4 py-2 text-white hover:bg-blue-600"
        >
          Add Teacher
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Class</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{t.name}</td>
                <td className="px-6 py-3">{t.email}</td>
                <td className="px-6 py-3">{t.class}</td>
                <td className="flex gap-2 px-6 py-3">
                  <button onClick={() => handleEdit(t)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">{editingTeacher ? "Edit Teacher" : "Add Teacher"}</h3>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="rounded border px-3 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded border px-3 py-2"
                required
              />
              <input
                type="text"
                name="class"
                placeholder="Class"
                value={formData.class}
                onChange={handleInputChange}
                className="rounded border px-3 py-2"
                required
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingTeacher(null);
                    setFormData({ name: "", email: "", class: "" });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-primary rounded px-4 py-2 text-white hover:bg-blue-600">
                  {editingTeacher ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
