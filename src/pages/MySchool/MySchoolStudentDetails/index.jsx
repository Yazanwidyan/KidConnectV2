import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function MySchoolStudentDetails() {
  const tabs = [
    { name: "Feed", path: "/student/feed" },
    { name: "Learning", path: "/student/learning" },
    { name: "Profile", path: "/student/profile" },
    { name: "Attachments", path: "/student/attachments" },
    { name: "Daily Reports", path: "/student/daily-reports" },
    { name: "Forms & Requests", path: "/student/forms-and-requests" },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">StudentDetails</h1>

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
