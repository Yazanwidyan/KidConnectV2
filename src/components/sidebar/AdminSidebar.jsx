import { ChevronDownIcon, ChevronUpIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ADMIN_MENU } from "../../utils/menus/AdminMenu";

const AdminSidebar = ({ collapsed }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [hovered, setHovered] = useState(false); // <-- New state
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(path);

  const isActive = (item) => {
    if (item.subMenu) {
      return item.subMenu.some(
        (sub) =>
          location.pathname.startsWith(sub.path) ||
          (sub.subMenu && sub.subMenu.some((ss) => location.pathname.startsWith(ss.path)))
      );
    }
    return location.pathname.startsWith(item.path);
  };

  const toggleSubmenu = (title) => {
    setOpenMenu((prev) => (prev === title ? null : title));
    setOpenSubMenu(null);
  };

  const toggleSubSubmenu = (title) => setOpenSubMenu((prev) => (prev === title ? null : title));

  const isCollapsed = collapsed && !hovered; // <-- Collapsed only if not hovered

  return (
    <div
      onMouseEnter={() => setHovered(true)} // <-- Expand on hover
      onMouseLeave={() => setHovered(false)} // <-- Collapse when hover ends
      className={`flex h-screen flex-col bg-primary shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Top bar */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-b-secondary/20 px-4 py-[4px]">
        <span className={`py-5 text-4xl font-light text-white ${isCollapsed ? "hidden" : "block"}`}>
          <span className="font-extrabold">Kid</span>
          Connect
          {/* <img src="/assets/1.png" alt="User Avatar" className="w-40 object-cover" /> */}
        </span>
      </div>

      {/* Scrollable menu */}
      <nav className="custom-1 mx-1 mt-4 flex-1 space-y-1 overflow-y-auto px-2">
        {ADMIN_MENU.map((item) => {
          const active = isActive(item);
          const isSubmenuOpen = openMenu === item.title;

          return (
            <div key={item.title}>
              <div
                onClick={() => {
                  if (item.subMenu) toggleSubmenu(item.title);
                  else handleNavigate(item.path);
                }}
                className={`flex cursor-pointer items-center ${isCollapsed ? "justify-center" : "justify-between"} rounded-lg px-3 py-3 transition ${
                  active || isSubmenuOpen ? "bg-secondary font-bold text-primary" : "font-semibold text-white"
                }`}
              >
                <div className="flex items-center">
                  <item.icon className={` ${isCollapsed ? "mr-0" : "mr-[5px]"} h-[21px] w-[21px] stroke-2`} />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
                {!isCollapsed && item.subMenu && (
                  <span>
                    {isSubmenuOpen ? (
                      <ChevronUpIcon className="h-3 w-3 stroke-[3]" />
                    ) : (
                      <ChevronDownIcon className="h-3 w-3 stroke-[3]" />
                    )}
                  </span>
                )}
              </div>

              {item.subMenu && isSubmenuOpen && !isCollapsed && (
                <div className="ml-2 mt-1">
                  {item.subMenu.map((sub) => {
                    const isSubSubmenuOpen = openSubMenu === sub.title;
                    const hasSubSubmenu = sub.subMenu && sub.subMenu.length > 0;

                    return (
                      <div key={sub.title}>
                        <div
                          onClick={() => {
                            if (hasSubSubmenu) toggleSubSubmenu(sub.title);
                            else handleNavigate(sub.path);
                          }}
                          className={`relative flex cursor-pointer items-center px-4 py-2 transition ${
                            location.pathname.startsWith(sub.path)
                              ? "font-semibold text-secondary"
                              : "text-white"
                          }`}
                        >
                          {location.pathname.startsWith(sub.path) && (
                            <span className="absolute left-0 h-7 w-1 rounded bg-secondary"></span>
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

                        {hasSubSubmenu && isSubSubmenuOpen && (
                          <div className="ml-6 mt-1">
                            {sub.subMenu.map((ss) => (
                              <div
                                key={ss.title}
                                onClick={() => handleNavigate(ss.path)}
                                className={`relative flex cursor-pointer items-center px-4 py-2 transition ${
                                  location.pathname === ss.path
                                    ? "font-semibold text-secondary"
                                    : "text-white"
                                }`}
                              >
                                {location.pathname === ss.path && (
                                  <span className="absolute left-0 h-1 w-1 rotate-45 ring-2 ring-secondary"></span>
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
