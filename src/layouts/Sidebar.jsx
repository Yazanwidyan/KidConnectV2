// components/Sidebar.jsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Icons from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import { SIDEBAR_MENU } from "../constants/menu";
import { ROLES } from "../constants/roles";

const Sidebar = ({ userRole }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Generate base path depending on role
  const getBasePath = () => {
    switch (userRole) {
      case ROLES.ADMIN:
        return "/admin";
      case ROLES.TEACHER:
        return "/teacher";
      case ROLES.PARENT:
        return "/parent";
      default:
        return "";
    }
  };

  const basePath = getBasePath();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#3A49F9] text-white shadow-lg">
      {/* Logo */}
      <div className="border-b border-white/10 p-4 text-center text-2xl font-bold tracking-wide">
        KidConnect
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2 py-3">
          {SIDEBAR_MENU.map((menu) => {
            if (!menu.roles.includes(userRole)) return null;
            const Icon = Icons[menu.icon] || Icons.FaHome;
            const menuPath = `${basePath}/${menu.path}`;

            if (menu.subMenu) {
              return (
                <li key={menu.title}>
                  <button
                    onClick={() => toggleMenu(menu.title)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <Icon />
                      <span>{t(menu.title)}</span>
                    </div>
                    <Icons.FaChevronDown
                      className={`transition-transform ${openMenus[menu.title] ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openMenus[menu.title] && (
                    <ul className="ml-8 mt-1 space-y-1 text-sm">
                      {menu.subMenu.map((item) => {
                        const itemPath = `${menuPath}/${item.path}`;
                        return (
                          <li key={item.title}>
                            <Link
                              to={itemPath}
                              className={`block rounded-lg px-3 py-2 hover:bg-white/10 ${
                                isActive(itemPath) ? "bg-white/20" : ""
                              }`}
                            >
                              {t(item.title)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={menu.title}>
                <Link
                  to={menuPath}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-white/10 ${
                    isActive(menuPath) ? "bg-white/20" : ""
                  }`}
                >
                  <Icon />
                  <span>{t(menu.title)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Workspace Box */}
      <div className="m-3 mt-auto rounded-lg bg-white/10 p-3 text-sm">
        <p className="text-gray-200">{t("Workspace")}</p>
        <p className="font-semibold">ABC Academy</p>
      </div>
    </aside>
  );
};

export default Sidebar;
