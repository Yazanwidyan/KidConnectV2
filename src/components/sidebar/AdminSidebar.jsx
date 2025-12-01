import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ADMIN_MENU } from "../../utils/menus/AdminMenu";

const AdminSidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState(null); // only one open at a time
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="flex flex-shrink-0 items-center justify-between border-b px-4 py-[20.9px]">
        <span className={`text-lg font-bold ${collapsed ? "hidden" : "block"}`}>Kid-Connect</span>
      </div>

      {/* Scrollable menu */}
      <nav className="mx-2 mt-2 flex-1 space-y-2 overflow-y-auto">
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
                className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition hover:bg-primary hover:text-white ${
                  active ? "bg-primary font-semibold text-white" : ""
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {!collapsed && <span>{item.title}</span>}
                </div>
                {!collapsed && item.subMenu && (
                  <span>
                    {isSubmenuOpen ? (
                      <ChevronUpIcon className="h-3 w-3" />
                    ) : (
                      <ChevronDownIcon className="h-3 w-3" />
                    )}
                  </span>
                )}
              </div>

              {/* Submenu items */}
              {item.subMenu && isSubmenuOpen && !collapsed && (
                <div className="ml-8 mt-1">
                  {item.subMenu.map((sub) => (
                    <div
                      key={sub.title}
                      onClick={() => handleNavigate(sub.path)}
                      className={`block cursor-pointer px-4 py-2 text-gray-600 transition ${
                        location.pathname === sub.path
                          ? "border-l-4 border-l-primary font-semibold text-gray-900"
                          : ""
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
