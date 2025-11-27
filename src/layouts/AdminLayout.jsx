import { FaSignOutAlt } from "react-icons/fa";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/sidebar/AdminSidebar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Layout wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-auto">
          {/* Header / Navbar */}
          <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="flex items-center rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">{children ? children : <Outlet />}</main>

          {/* Footer */}
          <footer className="bg-white px-6 py-4 text-center text-gray-600 shadow-inner">
            © {new Date().getFullYear()} My Nursery Management System. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
