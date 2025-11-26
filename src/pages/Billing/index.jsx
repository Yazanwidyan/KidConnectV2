import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function BillingLayout() {
  const tabs = [
    { name: "Dashboard", path: "/billing/dashboard" },
    { name: "Students", path: "/billing/students" },
    { name: "Subsidies", path: "/billing/subsidies" },
    { name: "Library", path: "/billing/library" },
    { name: "Reports", path: "/billing/reports" },
    { name: "Settings", path: "/billing/settings" },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Billing</h1>
      <div className="mb-6 flex border-b border-gray-200">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `-mb-px border-b-2 px-4 py-2 transition-all ${isActive ? "border-blue-600 font-semibold text-blue-600" : "border-transparent text-gray-600 hover:border-blue-300 hover:text-blue-600"}`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
