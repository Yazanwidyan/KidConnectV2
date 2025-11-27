import { Route, Routes } from "react-router-dom";

import TeacherLayout from "../layouts/TeacherLayout";
import { ROLES } from "../utils/roles";
import ProtectedRoute from "./ProtectedRoute";

// import TakeAttendance from "../pages/teacher/attendance/TakeAttendance";
// import TeacherDashboard from "../pages/teacher/dashboard/TeacherDashboard";

// صفحات المعلم

const TeacherRoutes = () => {
  return (
    <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
      <TeacherLayout>
        <Routes>
          {/* <Route path="dashboard" element={<TeacherDashboard />} /> */}
          {/* <Route path="attendance" element={<TakeAttendance />} /> */}
          {/* باقي الصفحات */}
        </Routes>
      </TeacherLayout>
    </ProtectedRoute>
  );
};

export default TeacherRoutes;
