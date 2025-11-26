import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialClasses = [
  { id: 1, name: "KG1", teacher: "Ahmed Khalid" },
  { id: 2, name: "KG2", teacher: "Fatima Omar" },
];

const Classes = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({ name: "", teacher: "" });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClass) {
      setClasses(classes.map((c) => (c.id === editingClass.id ? { ...editingClass, ...formData } : c)));
    } else {
      setClasses([...classes, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: "", teacher: "" });
    setEditingClass(null);
    setModalOpen(false);
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({ name: cls.name, teacher: cls.teacher });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-primary text-2xl font-semibold">Classes</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary rounded px-4 py-2 text-white hover:bg-blue-600"
        >
          Add Class
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3">Class Name</th>
              <th className="px-6 py-3">Assigned Teacher</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{cls.name}</td>
                <td className="px-6 py-3">{cls.teacher}</td>
                <td className="flex gap-2 px-6 py-3">
                  <button onClick={() => handleEdit(cls)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(cls.id)} className="text-red-600 hover:text-red-800">
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
            <h3 className="mb-4 text-xl font-semibold">{editingClass ? "Edit Class" : "Add Class"}</h3>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Class Name"
                value={formData.name}
                onChange={handleInputChange}
                className="rounded border px-3 py-2"
                required
              />
              <input
                type="text"
                name="teacher"
                placeholder="Assigned Teacher"
                value={formData.teacher}
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
                    setEditingClass(null);
                    setFormData({ name: "", teacher: "" });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-primary rounded px-4 py-2 text-white hover:bg-blue-600">
                  {editingClass ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
