import "./index.scss";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import RegistrationForm from "./pages/admin/students/RegistrationForm";
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";
import AdminRoutes from "./routes/AdminRoutes";
import ParentRoutes from "./routes/ParentRoutes";

// import TeacherRoutes from "./routes/TeacherRoutes";

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let lang = searchParams.get("lang");

    if (!lang) {
      lang = i18n.language || "ar";
      searchParams.set("lang", lang);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }

    if (lang !== i18n.language) i18n.changeLanguage(lang);
  }, [location.search, i18n, navigate, location.pathname]);

  return (
    <Routes>
      {/* صفحة تسجيل الدخول */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register/:schoolId" element={<RegistrationForm />} />

      {/* مسارات الادمن */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* مسارات المعلم */}
      {/* <Route path="/teacher/*" element={<TeacherRoutes />} /> */}

      {/* مسارات ولي الامر */}
      <Route path="/parent/*" element={<ParentRoutes />} />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
