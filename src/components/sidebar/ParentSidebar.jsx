import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import { SIDEBAR_MENU } from "../../utils/sidebarMenu";

const ParentSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Filter only parent menu items
  const menuItems = SIDEBAR_MENU.filter((menu) => menu.roles.includes("PARENT"));

  return (
    <div className={`h-screen bg-white shadow-lg transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className={`text-lg font-bold ${collapsed ? "hidden" : "block"}`}>Parent Panel</span>
        <button onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <div key={item.title}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 transition hover:bg-gray-200 ${isActive ? "bg-gray-200 font-semibold" : ""}`}
              >
                <item.icon className="mr-3" />
                {!collapsed && <span>{item.title}</span>}
              </Link>

              {item.subMenu && !collapsed && (
                <div className="ml-8 mt-1">
                  {item.subMenu.map((sub) => {
                    const isSubActive = location.pathname.includes(sub.path);
                    return (
                      <Link
                        key={sub.title}
                        to={`${item.path}/${sub.path}`}
                        className={`block px-2 py-1 text-gray-600 transition hover:text-gray-900 ${
                          isSubActive ? "font-semibold text-gray-900" : ""
                        }`}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default ParentSidebar;
