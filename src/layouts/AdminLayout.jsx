import {
  Bars3CenterLeftIcon,
  BellIcon,
  ChevronDownIcon,
  MoonIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import LanguageSwitcher from "../components/LanguageSwitcher";
import AdminSidebar from "../components/sidebar/AdminSidebar";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const [menuOpen, setMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  return (
    <div className="flex h-screen flex-col bg-secondary" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar toggleSidebar={toggleSidebar} collapsed={collapsed} />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-auto">
          {/* Header */}
          <div className="bg-white shadow-lg">
            <header className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-[15px]">
              {/* Left: Menu button and search */}
              <div className="flex items-center space-x-4">
                {/* Sidebar Toggle */}
                <button
                  onClick={toggleSidebar}
                  className="rounded-full bg-primary/20 p-2 text-primary transition"
                >
                  <Squares2X2Icon className="w-[21px h-[21px] stroke-2" />
                </button>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-3">
                {/* Language Selector */}

                <LanguageSwitcher />

                {/* Dark Mode Toggle */}
                <button className="rounded-full bg-gray-200 p-2 text-gray-600 shadow-lg transition hover:bg-gray-100 hover:shadow-lg">
                  <MoonIcon className="w-[21px h-[21px] stroke-2" />
                </button>

                {/* Notifications */}
                <button className="relative rounded-full bg-gray-200 p-2 text-gray-600 shadow-lg transition hover:bg-gray-100 hover:shadow-lg">
                  <BellIcon className="w-[21px h-[21px] stroke-2" />
                  <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    5
                  </span>
                </button>
                {/* User Section */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex items-center gap-3 rounded-full px-3 py-1 transition hover:bg-gray-100"
                  >
                    {/* Avatar */}
                    <img
                      src="/assets/wa.png"
                      alt="User Avatar"
                      className="h-10 w-10 rounded-xl border object-cover"
                    />

                    {/* User name & role (hidden when collapsed) */}
                    {!collapsed && (
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800">John Doe</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                      </div>
                    )}

                    {/* Settings icon */}
                    {!collapsed && (
                      <ChevronDownIcon
                        className={`h-4 w-4 stroke-2 text-gray-700 transition-transform ${
                          menuOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpen && !collapsed && (
                    <div
                      className={`absolute ${
                        i18n.language === "ar" ? "left-0" : "right-0"
                      } mt-2 w-40 rounded-lg border bg-white py-2 shadow-lg`}
                    >
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Profile
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                        Settings
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-auto px-6 py-0">
            <div className="container mx-auto max-w-7xl">{children ? children : <Outlet />}</div>
          </main>

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
