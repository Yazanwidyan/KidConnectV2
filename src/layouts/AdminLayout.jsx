import { useState } from "react";
import { FaChevronDown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/sidebar/AdminSidebar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-auto">
          {/* Header */}
          <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
            {/* Left side */}
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>

            {/* Right side: Account */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 rounded px-3 py-2 transition hover:bg-gray-100"
              >
                <FaUserCircle className="text-2xl text-gray-600" />
                <div className="text-left">
                  <p className="text-sm font-semibold">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <FaChevronDown className="text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg">
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
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">{children ? children : <Outlet />}</main>

          {/* Footer */}
          <footer className="bg-white px-6 py-4 text-center text-gray-600 shadow-inner">
            © {new Date().getFullYear()} My Nursery Management System. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
