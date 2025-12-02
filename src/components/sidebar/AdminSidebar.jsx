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
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Top bar */}
      <div className="flex flex-shrink-0 items-center justify-between border-b-2 border-r-2 px-5 py-[20.9px]">
        <span className={`text-lg font-bold ${collapsed ? "hidden" : "block"}`}>Kid-Connect</span>
      </div>

      {/* Scrollable menu */}
      <nav className="mx-3 mt-2 flex-1 space-y-1 overflow-y-auto">
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
                className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition ${active || isSubmenuOpen ? "bg-primary font-bold text-white" : "font-semibold"} `}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2 h-[21px] w-[21px] stroke-[2]" />
                  {!collapsed && <span>{item.title}</span>}
                </div>
                {!collapsed && item.subMenu && (
                  <span>
                    {isSubmenuOpen ? (
                      <ChevronUpIcon className="h-3 w-3 stroke-[3]" />
                    ) : (
                      <ChevronDownIcon className="h-3 w-3 stroke-[3]" />
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
                      className="relative flex cursor-pointer items-center px-4 py-2 text-gray-600 transition"
                    >
                      {/* Vertical line on active */}
                      {location.pathname === sub.path && (
                        <span className="absolute left-0 h-7 w-1 rounded bg-primary"></span>
                      )}

                      <span
                        className={` ${
                          location.pathname === sub.path ? "font-semibold text-primary" : "text-gray-600"
                        }`}
                      >
                        {sub.title}
                      </span>
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
