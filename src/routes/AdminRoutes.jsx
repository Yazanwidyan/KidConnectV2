import { Route, Routes } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Admissions from "../pages/admin/admissions/Admissions";
import StudentAdmissionDetails from "../pages/admin/admissions/StudentAdmissionDetails";
import EmployeesAttendance from "../pages/admin/attendanceAndLeaves/EmployeesAttendance";
import EmployeesLeaves from "../pages/admin/attendanceAndLeaves/EmployeesLeaves";
import StudentsAttendance from "../pages/admin/attendanceAndLeaves/StudentsAttendance";
import StudentsLeaves from "../pages/admin/attendanceAndLeaves/StudentsLeaves";
import Announcements from "../pages/admin/communication/Announcements";
import Messages from "../pages/admin/communication/Messages";
import Notifications from "../pages/admin/communication/Notifications";
import EmployeeConfigAttendance from "../pages/admin/configurations/AttendanceConfigurations/EmployeeAttendance";
import Kiosk from "../pages/admin/configurations/AttendanceConfigurations/Kiosk";
import RatioManagement from "../pages/admin/configurations/AttendanceConfigurations/RatioManagement";
import StudentAttendance from "../pages/admin/configurations/AttendanceConfigurations/StudentAttendance";
import EmployeeConfigurations from "../pages/admin/configurations/EmployeeConfigurations";
import GenaralFinance from "../pages/admin/configurations/financeConfigurations/GenaralFinance";
import InvoiceAndPaymentRequests from "../pages/admin/configurations/financeConfigurations/InvoiceAndPaymentRequests";
import Templates from "../pages/admin/configurations/financeConfigurations/Templates";
import GeneralConfigurations from "../pages/admin/configurations/GeneralConfigurations";
import RolesPermissions from "../pages/admin/configurations/RolesPermissions";
import StudentConfigurations from "../pages/admin/configurations/StudentConfigurations";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import CreateEmployee from "../pages/admin/employees/CreateEmployee";
import EditEmployee from "../pages/admin/employees/EditEmployee";
import EmployeeList from "../pages/admin/employees/EmployeeList";
import EmployeeProfile from "../pages/admin/employees/EmployeeProfile";
import AddInvoice from "../pages/admin/finance/AddInvoice";
import Invoices from "../pages/admin/finance/Invoices";
import PaymentRequests from "../pages/admin/finance/PaymentRequests";
import Payments from "../pages/admin/finance/Payments";
import ProductsServices from "../pages/admin/finance/ProductsServices";
import CreateGroup from "../pages/admin/groups/CreateGroup";
import EditGroup from "../pages/admin/groups/EditGroup";
import GroupDetails from "../pages/admin/groups/GroupDetails";
import GroupList from "../pages/admin/groups/GroupList";
import Reports from "../pages/admin/reports/Reports";
import StudentActivityReport from "../pages/admin/reports/StudentActivityReport";
import AddStudent from "../pages/admin/students/AddStudent";
import EditStudent from "../pages/admin/students/EditStudent";
import StudentProfile from "../pages/admin/students/StudentProfile";
import StudentsList from "../pages/admin/students/StudentsList";
import NotFound from "../pages/NotFound";
import { ROLES } from "../utils/roles";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <AdminLayout>
        <Routes>
          {/* ---------- DASHBOARD ---------- */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* ---------- GROUPS ---------- */}
          <Route path="groups" element={<GroupList />} />
          <Route path="groups/create-group" element={<CreateGroup />} />
          <Route path="groups/edit-group/:id" element={<EditGroup />} />
          <Route path="groups/group-details/:id" element={<GroupDetails />} />

          {/* ---------- STUDENTS ---------- */}
          <Route path="students" element={<StudentsList />} />
          <Route path="students/add-student" element={<AddStudent />} />
          <Route path="students/student-profile/:id" element={<StudentProfile />} />
          <Route path="students/edit-student/:id" element={<EditStudent />} />

          {/* ---------- ATTENDANCE ---------- */}
          <Route path="students-attendance" element={<StudentsAttendance />} />
          <Route path="employees-attendance" element={<EmployeesAttendance />} />
          <Route path="students-leaves" element={<StudentsLeaves />} />
          <Route path="employees-leaves" element={<EmployeesLeaves />} />

          {/* ---------- ADMISSIONS ---------- */}
          <Route path="admissions" element={<Admissions />} />
          <Route path="admissions/student-admission-profile/:id" element={<StudentAdmissionDetails />} />

          {/* ---------- EMPLOYEES ---------- */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/add-employee" element={<CreateEmployee />} />
          <Route path="employees/employee-profile/:id" element={<EmployeeProfile />} />
          <Route path="employees/edit-employee/:id" element={<EditEmployee />} />

          {/* ---------- FINANCE ---------- */}
          <Route path="finance">
            <Route path="invoices" element={<Invoices />} />
            <Route path="add-invoice" element={<AddInvoice />} />
            <Route path="products-services" element={<ProductsServices />} />
            <Route path="payment-requests" element={<PaymentRequests />} />
            <Route path="payments" element={<Payments />} />
          </Route>

          {/* ---------- REPORTS ---------- */}
          <Route path="reports">
            <Route index element={<Reports />} />
            <Route path="student-activity-report" element={<StudentActivityReport />} />
          </Route>

          {/* ---------- CONFIGURATIONS ---------- */}
          <Route path="configurations">
            <Route path="general-configurations" element={<GeneralConfigurations />} />
            <Route path="student-configurations" element={<StudentConfigurations />} />
            <Route path="attendance-configurations/kiosk" element={<Kiosk />} />
            <Route path="attendance-configurations/ratio-management" element={<RatioManagement />} />
            <Route path="attendance-configurations/student-attendance" element={<StudentAttendance />} />
            <Route
              path="attendance-configurations/employee-attendance"
              element={<EmployeeConfigAttendance />}
            />

            <Route path="employee-configurations" element={<EmployeeConfigurations />} />
            <Route path="finance-configurations/general-finance" element={<GenaralFinance />} />
            <Route
              path="finance-configurations/invoice-and-payment-requests"
              element={<InvoiceAndPaymentRequests />}
            />
            <Route path="finance-configurations/templates" element={<Templates />} />
            <Route path="roles-permissions" element={<RolesPermissions />} />
          </Route>

          {/* ---------- COMMUNICATION ---------- */}
          <Route path="communication">
            {/* Messages */}
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="announcements" element={<Announcements />} />
          </Route>

          {/* ---------- WILDCARD ---------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
