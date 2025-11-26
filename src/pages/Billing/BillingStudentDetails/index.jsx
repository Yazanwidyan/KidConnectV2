import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function BillingStudentDetails() {
  const { id } = useParams();

  const tabs = [
    { name: "Current Activity", path: "current-activity" },
    { name: "Upcoming Invoices", path: "upcoming-invoices" },
    { name: "All Transactions", path: "all-transactions" },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Student ID: {id}</h1>

      {/* Tabs */}
      <div className="mb-6 flex border-b border-gray-200">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `-mb-px border-b-2 px-4 py-2 transition-all ${
                isActive
                  ? "border-blue-600 font-semibold text-blue-600"
                  : "border-transparent text-gray-600 hover:border-blue-300 hover:text-blue-600"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* Sub Page Content */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
