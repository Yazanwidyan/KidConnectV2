import React from "react";
import { Link, Outlet } from "react-router-dom";

const AnnouncementsIndex = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Announcements</h2>

      <div className="mb-4 flex space-x-4">
        <Link to="all" className="text-blue-500">
          All Announcements
        </Link>
        <Link to="add" className="text-blue-500">
          Add Announcement
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default AnnouncementsIndex;
