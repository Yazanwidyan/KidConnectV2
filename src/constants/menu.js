import {
  FaBookOpen,
  FaChartLine,
  FaClipboardList,
  FaHome,
  FaLayerGroup,
  FaMoneyBillWave,
  FaUserPlus,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

import { ROLES } from "./roles";

export const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    icon: "FaHome",
    path: "dashboard",
    roles: [ROLES.ADMIN],
  },
  {
    title: "Groups",
    icon: "FaLayerGroup", // Better icon for groups
    path: "groups",
    subMenu: [
      { title: "Create Group", path: "create-group" },
      { title: "Group List", path: "group-list" },
    ],
    roles: [ROLES.ADMIN],
  },
  {
    title: "Students",
    icon: "FaUserPlus",
    path: "students",
    subMenu: [
      { title: "Add Student", path: "add-student" },
      { title: "Students List", path: "students-list" },
      { title: "Attendance", path: "attendance" },
      { title: "Admissions", path: "admissions" },
    ],
    roles: [ROLES.ADMIN, ROLES.TEACHER],
  },
  {
    title: "Employees",
    icon: "FaUserTie", // Better icon for employees/staff
    path: "employees",
    subMenu: [
      { title: "Add Employee", path: "add-employee" },
      { title: "Employee List", path: "employee-list" },
    ],
    roles: [ROLES.ADMIN],
  },
  {
    title: "Communication",
    icon: "FaComments",
    path: "communication",
    subMenu: [
      { title: "Announcements", path: "announcements" },
      { title: "Messages", path: "messages" },
      { title: "Notifications", path: "notifications" },
    ],
    roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT],
  },
  {
    title: "Finance",
    icon: "FaMoneyBillWave",
    path: "finance",
    subMenu: [
      { title: "Invoices", path: "invoices" },
      { title: "Products & Services", path: "products-services" },
      { title: "Payment Requests", path: "payment-requests" },
      { title: "Payments", path: "payments" },
    ],
    roles: [ROLES.ADMIN],
  },
  {
    title: "Reports",
    icon: "FaChartLine",
    path: "reports",
    roles: [ROLES.ADMIN],
  },
  {
    title: "Configurations",
    icon: "FaClipboardList",
    path: "configurations",
    subMenu: [
      { title: "General Configurations", path: "general-configurations" },
      { title: "Student Configurations", path: "student-configurations" },
      { title: "Employee Configurations", path: "employee-configurations" },
      { title: "Finance Configurations", path: "finance-configurations" },
      { title: "Attendance Configurations", path: "attendance-configurations" },
      { title: "Roles & permissions", path: "roles-permissions" },
    ],
    roles: [ROLES.ADMIN],
  },
];
