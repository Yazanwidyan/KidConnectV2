import { Bars3CenterLeftIcon, BellIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/sidebar/AdminSidebar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = ({ children }) => {
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
          <header className="flex items-center justify-between bg-white py-[15px] pl-9 pr-16 shadow-lg">
            {/* Left: Menu button and search */}
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle */}
              <button
                onClick={toggleSidebar}
                className="rounded-full bg-primary/20 p-2 text-primary transition"
              >
                <Bars3CenterLeftIcon className="w-[21px h-[21px] stroke-[2]" />
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <button className="rounded-full bg-gray-200 px-3 py-2 font-semibold text-gray-700 shadow-lg transition hover:bg-gray-100 hover:shadow-lg">
                AR
              </button>

              {/* Dark Mode Toggle */}
              <button className="rounded-full bg-gray-200 p-2 text-gray-600 shadow-lg transition hover:bg-gray-100 hover:shadow-lg">
                <MoonIcon className="w-[21px h-[21px] stroke-[2]" />
              </button>

              {/* Notifications */}
              <button className="relative rounded-full bg-gray-200 p-2 text-gray-600 shadow-lg transition hover:bg-gray-100 hover:shadow-lg">
                <BellIcon className="w-[21px h-[21px] stroke-[2]" />
                <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  5
                </span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="container flex-1 overflow-auto p-6">{children ? children : <Outlet />}</main>

          {/* Footer */}
          <footer className="bg-white px-6 py-4 text-center font-bold text-gray-600 shadow-inner">
            © {new Date().getFullYear()} Kid-Connect. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
