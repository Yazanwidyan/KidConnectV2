import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [code, setCode] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameEn || !nameAr) return;

    onAddCategory({
      id: Date.now(), // simple unique id
      code: code || "-",
      nameEn,
      nameAr,
      active,
    });

    // Reset form
    setNameEn("");
    setNameAr("");
    setCode("");
    setActive(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <FiX size={20} />
        </button>

        <h2 className="mb-4 text-xl font-semibold">Add Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-gray-700">Category Name (English) *</label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter English Name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-gray-700">Category Name (Arabic) *</label>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter Arabic Name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-gray-700">Category Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Optional"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={active}
              onChange={() => setActive(!active)}
              className="h-5 w-5 text-teal-600"
            />
            <span className="text-gray-700">Active</span>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
