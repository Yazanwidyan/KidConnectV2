import React, { useState } from "react";

import { useExpenses } from "../../context/ExpensesContext";

export default function Categories() {
  const { categories, addCategory } = useExpenses();
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    addCategory(newCategory.trim());
    setNewCategory("");
  };

  return (
    <div className="max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Expense Categories</h2>

      <ul className="mb-6 space-y-2">
        {categories.map((cat) => (
          <li key={cat} className="rounded border border-gray-300 px-3 py-2">
            {cat}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <button
          onClick={handleAddCategory}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
