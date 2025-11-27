import "./index.scss";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/Layout";
import GeneralConfigurations from "./pages/Admin/configurations/GeneralConfigurations";
import AdminDashboard from "./pages/Admin/Dashboard";
import CreateEmployee from "./pages/Admin/employees/CreateEmployee";
import EmployeeList from "./pages/Admin/employees/EmployeeList";
import AddInvoice from "./pages/Admin/finance/AddInvoice";
import Invoices from "./pages/Admin/finance/Invoices";
import PaymentRequests from "./pages/Admin/finance/PaymentRequests";
import Payments from "./pages/Admin/finance/Payments";
import ProductsServices from "./pages/Admin/finance/ProductsServices";
import CreateGroup from "./pages/Admin/groups/CreateGroup";
import EditGroup from "./pages/Admin/groups/EditGroup";
import GroupList from "./pages/Admin/groups/GroupList";
import Reports from "./pages/Admin/reports/Reports";
import StudentActivityReport from "./pages/Admin/reports/StudentActivityReport";
import AddStudent from "./pages/Admin/students/AddStudent";
import Admissions from "./pages/Admin/students/Admissions";
import EditStudent from "./pages/Admin/students/EditStudent";
import StudentsAttendance from "./pages/Admin/students/StudentsAttendance";
import StudentsList from "./pages/Admin/students/StudentsList";
import NotFound from "./pages/NotFound";

export default function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("Admin"); // get from auth/login

  // Handle ?lang=ar/en
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let lang = searchParams.get("lang");

    if (!lang) {
      lang = i18n.language || "ar";
      searchParams.set("lang", lang);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }

    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [location.search, i18n, navigate, location.pathname]);

  return (
    <Routes>
      {/* -------------------- ADMIN -------------------- */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute userRole={userRole} allowedRoles={["Admin"]}>
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />

                <Route path="/groups/create-group" element={<CreateGroup />} />
                <Route path="/groups/edit-group/:id" element={<EditGroup />} />
                <Route path="/groups/group-list" element={<GroupList />} />

                <Route path="/students/add-student" element={<AddStudent />} />
                <Route path="/students/edit-student/:id" element={<EditStudent />} />
                <Route path="/students/students-list" element={<StudentsList />} />
                <Route path="/students/attendance" element={<StudentsAttendance />} />
                <Route path="/students/admissions" element={<Admissions />} />

                <Route path="/employees/add-employee" element={<CreateEmployee />} />
                <Route path="/employees/employee-list" element={<EmployeeList />} />

                <Route path="/finance/invoices" element={<Invoices />} />
                <Route path="/finance/add-invoice" element={<AddInvoice />} />
                <Route path="/finance/products-services" element={<ProductsServices />} />
                <Route path="/finance/payment-requests" element={<PaymentRequests />} />
                <Route path="/finance/payments" element={<Payments />} />

                {/* REPORTS */}
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/student-activity-report" element={<StudentActivityReport />} />

                <Route path="/configurations/general-configurations" element={<GeneralConfigurations />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* -------------------- TEACHER -------------------- */}
      {/* <Route
        path="/teacher/*"
        element={
          <ProtectedRoute userRole={userRole} allowedRoles={["Teacher"]}>
            <TeacherLayout>
              <Routes>
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TeacherLayout>
          </ProtectedRoute>
        }
      /> */}

      {/* -------------------- PARENT -------------------- */}
      {/* <Route
        path="/parent/*"
        element={
          <ProtectedRoute userRole={userRole} allowedRoles={["Parent"]}>
            <ParentLayout>
              <Routes>
                <Route path="dashboard" element={<ParentDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ParentLayout>
          </ProtectedRoute>
        }
      /> */}

      {/* -------------------- CATCH ALL -------------------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
