import { Route, Routes } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
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
import EmployeeAttendance from "../pages/admin/employees/Attendance";
import CreateEmployee from "../pages/admin/employees/CreateEmployee";
import EditEmployee from "../pages/admin/employees/EditEmployee";
import EmployeeList from "../pages/admin/employees/EmployeeList";
import EmployeeProfile from "../pages/admin/employees/EmployeeProfile";
import EmployeeLeaves from "../pages/admin/employees/Leaves";
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
import Admissions from "../pages/admin/students/Admissions";
import EditStudent from "../pages/admin/students/EditStudent";
import StudentAdmissionDetails from "../pages/admin/students/StudentAdmissionDetails";
import StudentProfile from "../pages/admin/students/StudentProfile";
import StudentsAttendance from "../pages/admin/students/StudentsAttendance";
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
          <Route path="groups">
            <Route path="create-group" element={<CreateGroup />} />
            <Route path="edit-group/:id" element={<EditGroup />} />
            <Route path="group-list" element={<GroupList />} />
            <Route path="group-list/group-details/:id" element={<GroupDetails />} />
          </Route>

          {/* ---------- STUDENTS ---------- */}
          <Route path="students">
            <Route path="add-student" element={<AddStudent />} />
            <Route path="student-profile/:id" element={<StudentProfile />} />
            <Route path="edit-student/:id" element={<EditStudent />} />
            <Route path="students-list" element={<StudentsList />} />
            <Route path="attendance" element={<StudentsAttendance />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="student-admission-profile/:id" element={<StudentAdmissionDetails />} />
          </Route>

          {/* ---------- EMPLOYEES ---------- */}
          <Route path="employees">
            <Route path="add-employee" element={<CreateEmployee />} />
            <Route path="employee-profile/:id" element={<EmployeeProfile />} />
            <Route path="edit-employee/:id" element={<EditEmployee />} />
            <Route path="employee-list" element={<EmployeeList />} />
            <Route path="employee-leaves" element={<EmployeeLeaves />} />
            <Route path="employee-attendance" element={<EmployeeAttendance />} />
          </Route>

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
