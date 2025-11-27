import { useState } from "react";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { ADMIN_MENU } from "../../utils/menus/AdminMenu";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // only one open at a time
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isActive = (item) => {
    if (item.subMenu) {
      return item.subMenu.some((sub) => location.pathname === sub.path);
    }
    return location.pathname === item.path;
  };

  const toggleSubmenu = (title) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  return (
    <div
      className={`flex h-screen flex-col bg-white shadow-lg transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top bar */}
      <div className="flex flex-shrink-0 items-center justify-between border-b px-4 py-3">
        <span className={`text-lg font-bold ${collapsed ? "hidden" : "block"}`}>Admin Panel</span>
        <button onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Scrollable menu */}
      <nav className="mt-4 flex-1 overflow-y-auto">
        {ADMIN_MENU.map((item) => {
          const active = isActive(item);
          const isSubmenuOpen = openMenu === item.title; // only one open

          return (
            <div key={item.title}>
              {/* Parent menu */}
              <div
                onClick={() => {
                  if (item.subMenu) {
                    toggleSubmenu(item.title);
                  } else {
                    handleNavigate(item.path);
                  }
                }}
                className={`flex cursor-pointer items-center justify-between px-4 py-2 transition hover:bg-gray-200 ${
                  active ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3" />
                  {!collapsed && <span>{item.title}</span>}
                </div>
                {!collapsed && item.subMenu && (
                  <span>{isSubmenuOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                )}
              </div>

              {/* Submenu items */}
              {item.subMenu && isSubmenuOpen && !collapsed && (
                <div className="ml-8 mt-1">
                  {item.subMenu.map((sub) => (
                    <div
                      key={sub.title}
                      onClick={() => handleNavigate(sub.path)}
                      className={`block cursor-pointer px-2 py-1 text-gray-600 transition hover:text-gray-900 ${
                        location.pathname === sub.path ? "font-semibold text-gray-900" : ""
                      }`}
                    >
                      {sub.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
