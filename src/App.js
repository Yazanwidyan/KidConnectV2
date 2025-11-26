import "./index.scss";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/Admin/Layout";
import AdminDashboard from "./pages/Admin/Dashboard";
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
