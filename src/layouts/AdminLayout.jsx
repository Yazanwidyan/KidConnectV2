import {
  Bars3CenterLeftIcon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/sidebar/AdminSidebar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar toggleSidebar={toggleSidebar} collapsed={collapsed} />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-auto">
          {/* Header */}
          <header className="flex items-center justify-between bg-white px-6 py-3 shadow-lg">
            {/* Left: Menu button and search */}
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle */}
              <button
                onClick={toggleSidebar}
                className="rounded-full bg-gray-200 p-2 transition hover:bg-gray-300"
              >
                <Bars3CenterLeftIcon className="h-6 w-6" />
              </button>

              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <button className="rounded-full border border-gray-300 bg-gray-200 px-3 py-2 font-semibold text-gray-700 shadow-lg transition hover:bg-gray-100 hover:shadow-lg">
                AR
              </button>

              {/* Dark Mode Toggle */}
              <button className="rounded-full border border-gray-300 bg-gray-200 p-2 text-gray-600 shadow-lg transition hover:bg-gray-100 hover:shadow-lg">
                <MoonIcon className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button className="relative rounded-full border border-gray-300 bg-gray-200 p-2 text-gray-600 shadow-lg transition hover:bg-gray-100 hover:shadow-lg">
                <BellIcon className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  5
                </span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center space-x-2 rounded-full border border-gray-300 bg-gray-200 px-3 py-2 shadow-lg transition hover:bg-gray-100 hover:shadow-lg"
                >
                  <UserCircleIcon className="h-7 w-7 text-gray-600" />
                  <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border bg-white shadow-lg">
                    <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                      Profile
                    </button>
                    <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                      Settings
                    </button>
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">{children ? children : <Outlet />}</main>

          {/* Footer */}
          <footer className="bg-white px-6 py-4 text-center text-gray-600 shadow-inner">
            © {new Date().getFullYear()} Kid-Connect. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
