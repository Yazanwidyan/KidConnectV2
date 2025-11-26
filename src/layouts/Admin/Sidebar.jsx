import React, { useState } from "react";
import { FaBook, FaChevronDown, FaHome, FaUserPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openGroups, setOpenGroups] = useState(true);
  const [openStudents, setOpenStudents] = useState(true);
  const [openEmployees, setOpenEmployees] = useState(true);
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#3A49F9] text-white shadow-lg">
      {/* Logo */}
      <div className="border-b border-white/10 p-4 text-center text-2xl font-bold tracking-wide">
        KidConnect
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2 py-3">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-white/10 ${
                location.pathname === "/dashboard" ? "bg-white/20" : ""
              }`}
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Groups */}
          <li>
            <button
              onClick={() => setOpenGroups(!openGroups)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <FaBook />
                <span>Groups</span>
              </div>
              <FaChevronDown className={`transition-transform ${openGroups ? "rotate-180" : ""}`} />
            </button>
            {openGroups && (
              <ul className="ml-8 mt-1 space-y-1 text-sm">
                {["Create Group", "Group List"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/groups/${item.toLowerCase().replace(/\s/g, "-")}`}
                      className={`block rounded-lg px-3 py-2 hover:bg-white/10 ${
                        location.pathname === `/groups/${item.toLowerCase().replace(/\s/g, "-")}`
                          ? "bg-white/20"
                          : ""
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Students */}
          <li>
            <button
              onClick={() => setOpenStudents(!openStudents)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <FaUserPlus />
                <span>Students</span>
              </div>
              <FaChevronDown className={`transition-transform ${openStudents ? "rotate-180" : ""}`} />
            </button>
            {openStudents && (
              <ul className="ml-8 mt-1 space-y-1 text-sm">
                {["Create Student", "Student List", "Attendance", "Admissions"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/students/${item.toLowerCase().replace(/\s/g, "-")}`}
                      className={`block rounded-lg px-3 py-2 hover:bg-white/10 ${
                        location.pathname === `/students/${item.toLowerCase().replace(/\s/g, "-")}`
                          ? "bg-white/20"
                          : ""
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Employees */}
          <li>
            <button
              onClick={() => setOpenEmployees(!openEmployees)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <FaBook />
                <span>Employees</span>
              </div>
              <FaChevronDown className={`transition-transform ${openEmployees ? "rotate-180" : ""}`} />
            </button>
            {openEmployees && (
              <ul className="ml-8 mt-1 space-y-1 text-sm">
                {["Add Employee", "Employee List"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/employees/${item.toLowerCase().replace(/\s/g, "-")}`}
                      className={`block rounded-lg px-3 py-2 hover:bg-white/10 ${
                        location.pathname === `/employees/${item.toLowerCase().replace(/\s/g, "-")}`
                          ? "bg-white/20"
                          : ""
                      }`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Workspace Box */}
      <div className="m-3 mt-auto rounded-lg bg-white/10 p-3 text-sm">
        <p className="text-gray-200">Workspace</p>
        <p className="font-semibold">ABC Academy</p>
      </div>
    </aside>
  );
};

export default Sidebar;
