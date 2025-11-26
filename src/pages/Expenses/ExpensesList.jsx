import React, { useState } from "react";

import { useExpenses } from "../../context/ExpensesContext";

export default function ExpensesList() {
  const { expenses, deleteExpense } = useExpenses();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredExpenses = expenses.filter(
    (e) =>
      e.description.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "" || e.category === categoryFilter)
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search description"
          className="rounded border px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded border px-3 py-2"
          onChange={(e) => setCategoryFilter(e.target.value)}
          value={categoryFilter}
        >
          <option value="">All Categories</option>
          {/* Could pull categories from context */}
          <option>Supplies</option>
          <option>Maintenance</option>
          <option>Staff Salaries</option>
          <option>Utilities</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No expenses found.
              </td>
            </tr>
          ) : (
            filteredExpenses.map((e) => (
              <tr key={e.id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{e.date}</td>
                <td className="border border-gray-300 px-4 py-2">{e.description}</td>
                <td className="border border-gray-300 px-4 py-2">{e.category}</td>
                <td className="border border-gray-300 px-4 py-2">${e.amount.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => deleteExpense(e.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
