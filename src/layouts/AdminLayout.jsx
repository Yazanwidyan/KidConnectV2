import { Bars3CenterLeftIcon, BellIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import LanguageSwitcher from "../components/LanguageSwitcher";
import AdminSidebar from "../components/sidebar/AdminSidebar";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
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
                  <Bars3CenterLeftIcon className="w-[21px h-[21px] stroke-[2]" />
                </button>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-3">
                {/* Language Selector */}

                <LanguageSwitcher />

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
