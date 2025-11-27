import React from "react";
import { Outlet } from "react-router-dom";

const NotificationsIndex = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Notifications</h2>
      <Outlet />
    </div>
  );
};

export default NotificationsIndex;
