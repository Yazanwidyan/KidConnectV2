import { Route, Routes } from "react-router-dom";

import ParentLayout from "../layouts/ParentLayout";
import { ROLES } from "../utils/roles";
import ProtectedRoute from "./ProtectedRoute";

// import Billing from "../pages/parent/billing/Billing";
// import ChildProfile from "../pages/parent/child-profile/ChildProfile";
// import ParentDashboard from "../pages/parent/dashboard/ParentDashboard";
// import Messages from "../pages/parent/messages/Messages";

const ParentRoutes = () => {
  return (
    <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
      <ParentLayout>
        <Routes>
          {/* <Route path="dashboard" element={<ParentDashboard />} /> */}
          {/* <Route path="child-profile" element={<ChildProfile />} /> */}
          {/* <Route path="billing" element={<Billing />} /> */}
          {/* <Route path="messages" element={<Messages />} /> */}
        </Routes>
      </ParentLayout>
    </ProtectedRoute>
  );
};

export default ParentRoutes;
