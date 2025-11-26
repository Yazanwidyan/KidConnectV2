import React from "react";

import { useExpenses } from "../../context/ExpensesContext";

export default function ExpensesDashboard() {
  const { expenses, categories } = useExpenses();

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Calculate total per category
  const expensesByCategory = categories.map((cat) => ({
    category: cat,
    total: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  }));

  // Show 5 most recent expenses
  const recentExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div>
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded bg-blue-100 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">${totalExpenses.toFixed(2)}</p>
          <p className="text-gray-600">Total Expenses</p>
        </div>
        <div className="rounded bg-green-100 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{categories.length}</p>
          <p className="text-gray-600">Categories</p>
        </div>
        <div className="rounded bg-yellow-100 p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600">{expenses.length}</p>
          <p className="text-gray-600">Transactions</p>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-semibold">Expenses by Category</h2>
      <ul className="mb-6 space-y-2">
        {expensesByCategory.map(({ category, total }) => (
          <li key={category} className="flex justify-between rounded bg-gray-100 p-3">
            <span>{category}</span>
            <span>${total.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 text-lg font-semibold">Recent Expenses</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {recentExpenses.map((e) => (
            <tr key={e.id} className="border-b border-gray-300 hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{e.date}</td>
              <td className="border border-gray-300 px-4 py-2">{e.description}</td>
              <td className="border border-gray-300 px-4 py-2">{e.category}</td>
              <td className="border border-gray-300 px-4 py-2">${e.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
