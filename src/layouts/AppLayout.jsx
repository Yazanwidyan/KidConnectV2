import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content area (with left margin for sidebar space) */}
      <div className="ml-64 flex min-h-screen flex-1 flex-col">
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
