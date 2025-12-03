import {
  BanknotesIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const ADMIN_MENU = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    path: "/admin/dashboard",
  },
  {
    title: "Groups",
    icon: UserGroupIcon,
    path: "/admin/groups",
    subMenu: [
      { title: "Create Group", path: "/admin/groups/create-group" },
      { title: "Groups List", path: "/admin/groups/group-list" },
    ],
  },
  {
    title: "Students",
    icon: UserPlusIcon,
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
    icon: UsersIcon,
    path: "/admin/communication",
    subMenu: [
      { title: "Messages", path: "/admin/communication/messages" },
      { title: "Notifications", path: "/admin/communication/notifications" },
      { title: "Announcements", path: "/admin/communication/announcements" },
    ],
  },
  {
    title: "Employees",
    icon: UserCircleIcon,
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
    icon: BanknotesIcon,
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
    icon: ChartBarIcon,
    path: "/admin/reports",
  },
  {
    title: "Configurations",
    icon: ClipboardDocumentListIcon,
    path: "/admin/configurations",
    subMenu: [
      { title: "General Configurations", path: "/admin/configurations/general-configurations" },
      { title: "Student Configurations", path: "/admin/configurations/student-configurations" },
      {
        title: "Attendance Configurations",
        path: "/admin/configurations/attendance-configurations",
        subMenu: [
          {
            title: "kiosk",
            path: "/admin/configurations/attendance-configurations/kiosk",
          },
          {
            title: "Ratio Management",
            path: "/admin/configurations/attendance-configurations/ratio-management",
          },
          {
            title: "Student Attendance",
            path: "/admin/configurations/attendance-configurations/student-attendance",
          },
          {
            title: "Employee Attendance",
            path: "/admin/configurations/attendance-configurations/employee-attendance",
          },
        ],
      },

      { title: "Employee Configurations", path: "/admin/configurations/employee-configurations" },
      {
        title: "Finance Configurations",
        path: "/admin/configurations/finance-configurations",
        subMenu: [
          {
            title: "General Finance",
            path: "/admin/configurations/finance-configurations/general-finance",
          },
          {
            title: "Invoice and payment requests",
            path: "/admin/configurations/finance-configurations/invoice-and-payment-requests",
          },
          {
            title: "Templates",
            path: "/admin/configurations/finance-configurations/templates",
          },
        ],
      },
      { title: "Roles & Permissions", path: "/admin/configurations/roles-permissions" },
    ],
  },
];
