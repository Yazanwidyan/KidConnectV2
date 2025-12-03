import { ChevronDownIcon, ChevronUpIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ADMIN_MENU } from "../../utils/menus/AdminMenu";

const AdminSidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isActive = (item) => {
    if (item.subMenu) {
      return item.subMenu.some(
        (sub) =>
          location.pathname === sub.path ||
          (sub.subMenu && sub.subMenu.some((ss) => location.pathname === ss.path))
      );
    }
    return location.pathname === item.path;
  };

  const toggleSubmenu = (title) => {
    setOpenMenu((prev) => (prev === title ? null : title));
    setOpenSubMenu(null);
  };

  const toggleSubSubmenu = (title) => {
    setOpenSubMenu((prev) => (prev === title ? null : title));
  };

  return (
    <div
      className={`flex h-screen flex-col bg-white shadow-lg transition-all duration-300 ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Top bar */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-r border-b-primary/20 px-4 py-[20.9px]">
        <span className={`text-lg font-bold ${collapsed ? "hidden" : "block"}`}>
          <img src="/assets/1.png" alt="User Avatar" className="w-44 object-cover" />
        </span>
      </div>

      {/* User Section */}
      <div className="relative border-b border-b-primary/20 px-4 py-4">
        <button className="flex w-full items-center gap-3" onClick={() => setMenuOpen((prev) => !prev)}>
          <img src="/assets/wa.png" alt="User Avatar" className="h-11 w-11 rounded-xl border object-cover" />

          {!collapsed && (
            <div className="flex-1 text-left">
              <p className="text-lg font-semibold text-primary">John Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          )}

          {!collapsed && (
            <Cog8ToothIcon
              className={`h-5 w-5 stroke-[2] transition-transform ${menuOpen ? "rotate-180" : "rotate-0"}`}
            />
          )}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && !collapsed && (
          <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border bg-white py-2 shadow-lg">
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">Profile</button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">Settings</button>
            <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Scrollable menu */}
      <nav className="custom-1 mx-1 mt-4 flex-1 space-y-1 overflow-y-auto px-2">
        {ADMIN_MENU.map((item) => {
          const active = isActive(item);
          const isSubmenuOpen = openMenu === item.title;

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
                className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition ${
                  active || isSubmenuOpen ? "bg-primary font-bold text-white" : "font-semibold"
                } `}
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
                <div className="ml-2 mt-1">
                  {item.subMenu.map((sub) => {
                    const isSubSubmenuOpen = openSubMenu === sub.title;
                    const hasSubSubmenu = sub.subMenu && sub.subMenu.length > 0;

                    return (
                      <div key={sub.title}>
                        {/* Submenu item */}
                        <div
                          onClick={() => {
                            if (hasSubSubmenu) toggleSubSubmenu(sub.title);
                            else handleNavigate(sub.path);
                          }}
                          className={`relative flex cursor-pointer items-center px-4 py-2 transition ${
                            location.pathname === sub.path ? "font-semibold text-primary" : "text-gray-600"
                          }`}
                        >
                          {location.pathname === sub.path && (
                            <span className="absolute left-0 h-7 w-1 rounded bg-primary"></span>
                          )}
                          <span>{sub.title}</span>
                          {hasSubSubmenu && (
                            <span className="ml-auto">
                              {isSubSubmenuOpen ? (
                                <ChevronUpIcon className="h-3 w-3 stroke-[3]" />
                              ) : (
                                <ChevronDownIcon className="h-3 w-3 stroke-[3]" />
                              )}
                            </span>
                          )}
                        </div>

                        {/* Sub-submenu items */}
                        {hasSubSubmenu && isSubSubmenuOpen && (
                          <div className="ml-6 mt-1">
                            {sub.subMenu.map((ss) => (
                              <div
                                key={ss.title}
                                onClick={() => handleNavigate(ss.path)}
                                className={`relative flex cursor-pointer items-center px-4 py-2 transition ${
                                  location.pathname === ss.path
                                    ? "font-semibold text-primary"
                                    : "text-gray-600"
                                }`}
                              >
                                {location.pathname === ss.path && (
                                  <span className="absolute left-0 h-1 w-1 rotate-45 ring-2 ring-primary"></span>
                                )}
                                <span>{ss.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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

export default AdminSidebar;
