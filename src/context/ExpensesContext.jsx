import React, { createContext, useContext, useState } from "react";

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  // Sample initial categories
  const [categories, setCategories] = useState(["Supplies", "Maintenance", "Staff Salaries", "Utilities"]);

  // Sample initial expenses
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Art Supplies",
      amount: 150.0,
      category: "Supplies",
      date: "2025-10-10",
    },
    {
      id: 2,
      description: "Electricity Bill",
      amount: 300.0,
      category: "Utilities",
      date: "2025-10-05",
    },
  ]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, { id: Date.now(), ...expense }]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
  };

  const value = {
    expenses,
    categories,
    addExpense,
    deleteExpense,
    addCategory,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
