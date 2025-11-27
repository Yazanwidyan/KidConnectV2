import React from "react";
import { Link, Outlet } from "react-router-dom";

const MessagesIndex = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Messages</h2>

      {/* Quick links */}
      <div className="mb-4 flex space-x-4">
        <Link to="/admin/communication/messages/inbox" className="text-blue-500">
          Inbox
        </Link>
        <Link to="/admin/communication/messages/sent" className="text-blue-500">
          Sent
        </Link>
        <Link to="/admin/communication/messages/compose" className="text-blue-500">
          Compose
        </Link>
      </div>

      {/* Nested routes will render here */}
      <Outlet />
    </div>
  );
};

export default MessagesIndex;
