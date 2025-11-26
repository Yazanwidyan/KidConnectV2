import React, { useState } from "react";

import { useExpenses } from "../../context/ExpensesContext";

export default function AddExpense() {
  const { categories, addExpense } = useExpenses();

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: categories[0] || "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.description || !form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    if (isNaN(parseFloat(form.amount))) {
      alert("Amount must be a number");
      return;
    }

    addExpense({
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
    });

    setForm({
      description: "",
      amount: "",
      category: categories[0] || "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Add New Expense</h2>

      <label className="mb-2 block font-medium">Description</label>
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        className="mb-4 w-full rounded border px-3 py-2"
        placeholder="Expense description"
      />

      <label className="mb-2 block font-medium">Amount ($)</label>
      <input
        type="number"
        name="amount"
        step="0.01"
        value={form.amount}
        onChange={handleChange}
        className="mb-4 w-full rounded border px-3 py-2"
        placeholder="0.00"
      />

      <label className="mb-2 block font-medium">Category</label>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="mb-4 w-full rounded border px-3 py-2"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label className="mb-2 block font-medium">Date</label>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="mb-6 w-full rounded border px-3 py-2"
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Add Expense
      </button>
    </form>
  );
}
