import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Product Configurations</h1>
        <button
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus /> Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
          <thead>
            <tr>
              {["#", "Active", "Category Code", "Category Name (EN)", "Category Name (AR)", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-gray-400/60">
            {categories.map((cat, index) => (
              <tr key={cat.id} className="transition odd:bg-gray-100 even:bg-white hover:bg-gray-50">
                <td className="px-6 py-3 font-normal text-gray-700">{index + 1}</td>
                <td className="px-6 py-3 font-normal text-gray-700">
                  <input
                    type="checkbox"
                    checked={cat.active}
                    onChange={() => toggleActive(cat.id)}
                    className="h-5 w-5 text-teal-600"
                  />
                </td>
                <td className="px-6 py-3 font-normal text-gray-700">{cat.code}</td>
                <td className="px-6 py-3 font-normal text-gray-700">{cat.nameEn}</td>
                <td className="px-6 py-3 font-normal text-gray-700">{cat.nameAr}</td>
                <td className="flex gap-2 px-6 py-3">
                  <button className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1">
                    <PencilSquareIcon className="h-5 w-5 stroke-[2]" />
                  </button>
                  <button className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1">
                    <TrashIcon className="h-5 w-5 stroke-[2]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between px-6 py-3">
          <div>{categories.length} Total Records</div>
          <div className="flex gap-2">
            <button className="rounded border px-3 py-1">{"<"}</button>
            <button className="rounded border bg-primary px-3 py-1 text-white">1</button>
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
