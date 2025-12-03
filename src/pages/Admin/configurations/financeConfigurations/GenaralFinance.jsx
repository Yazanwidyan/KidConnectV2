import React, { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import AddCategoryModal from "./modals/AddCategoryModal";

const productCategoriesData = [
  { id: 1, active: true, code: "-", nameEn: "Tuition", nameAr: "محاضرة" },
  { id: 2, active: true, code: "-", nameEn: "Supplies", nameAr: "لوازم" },
  { id: 3, active: true, code: "-", nameEn: "Apparel", nameAr: "ثياب" },
  { id: 4, active: true, code: "-", nameEn: "Other", nameAr: "أخرى" },
  { id: 5, active: true, code: "-", nameEn: "Tuition", nameAr: "رسوم" },
];

const GeneralFinance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState(productCategoriesData);

  const toggleActive = (id) => {
    setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, active: !cat.active } : cat)));
  };
  const handleAddCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="mb-4 text-xl font-semibold text-gray-800">Product Configurations</h1>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Product Category</h2>
          <button
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus /> Add Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Category Code</th>
                <th className="px-4 py-3">Category Name in English</th>
                <th className="px-4 py-3">Category Name in Arabic</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={cat.active}
                      onChange={() => toggleActive(cat.id)}
                      className="h-5 w-5 text-teal-600"
                    />
                  </td>
                  <td className="px-4 py-3">{cat.code}</td>
                  <td className="px-4 py-3">{cat.nameEn}</td>
                  <td className="px-4 py-3">{cat.nameAr}</td>
                  <td className="flex gap-2 px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div>5 Total Records</div>
          <div className="flex gap-2">
            <button className="rounded border px-3 py-1">{"<"}</button>
            <button className="rounded border bg-teal-600 px-3 py-1 text-white">1</button>
            <button className="rounded border px-3 py-1">{">"}</button>
          </div>
        </div>
      </div>
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default GeneralFinance;
