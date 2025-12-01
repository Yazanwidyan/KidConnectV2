import {
  FaChartLine,
  FaClipboardList,
  FaHome,
  FaLayerGroup,
  FaMoneyBillWave,
  FaUserPlus,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

export const ADMIN_MENU = [
  {
    title: "Dashboard",
    icon: FaHome,
    path: "/admin/dashboard",
  },
  {
    title: "Groups",
    icon: FaLayerGroup,
    path: "/admin/groups",
    subMenu: [
      { title: "Create Group", path: "/admin/groups/create-group" },
      { title: "Group List", path: "/admin/groups/group-list" },
    ],
  },
  {
    title: "Students",
    icon: FaUserPlus,
    path: "/admin/students",
    subMenu: [
      { title: "Add Student", path: "/admin/students/add-student" },
      { title: "Students List", path: "/admin/students/students-list" },
      { title: "Attendance", path: "/admin/students/attendance" },
      { title: "Admissions", path: "/admin/students/admissions" },
    ],
  },
  {
    title: "Communication",
    icon: FaUsers,
    path: "/admin/communication",
    subMenu: [
      {
        title: "Messages",
        path: "/admin/communication/messages",
      },
      { title: "Notifications", path: "/admin/communication/notifications" },
      {
        title: "Announcements",
        path: "/admin/communication/announcements",
      },
    ],
  },
  {
    title: "Employees",
    icon: FaUserTie,
    path: "/admin/employees",
    subMenu: [
      { title: "Add Employee", path: "/admin/employees/add-employee" },
      { title: "Employee List", path: "/admin/employees/employee-list" },
      { title: "Attendance", path: "/admin/employees/employee-attendance" },
      { title: "Leaves", path: "/admin/employees/employee-leaves" },
    ],
  },

  {
    title: "Finance",
    icon: FaMoneyBillWave,
    path: "/admin/finance",
    subMenu: [
      { title: "Invoices", path: "/admin/finance/invoices" },
      { title: "Products & Services", path: "/admin/finance/products-services" },
      { title: "Payment Requests", path: "/admin/finance/payment-requests" },
      { title: "Payments", path: "/admin/finance/payments" },
    ],
  },
  {
    title: "Reports",
    icon: FaChartLine,
    path: "/admin/reports",
  },
  {
    title: "Configurations",
    icon: FaClipboardList,
    path: "/admin/configurations",
    subMenu: [
      { title: "General Configurations", path: "/admin/configurations/general-configurations" },
      { title: "Student Configurations", path: "/admin/configurations/student-configurations" },
      { title: "Employee Configurations", path: "/admin/configurations/employee-configurations" },
      { title: "Finance Configurations", path: "/admin/configurations/finance-configurations" },
      { title: "Attendance Configurations", path: "/admin/configurations/attendance-configurations" },
      { title: "Roles & Permissions", path: "/admin/configurations/roles-permissions" },
    ],
  },
];
