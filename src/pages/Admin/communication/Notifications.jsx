import { CheckBadgeIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/outline";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function Notifications() {
  const [filter, setFilter] = useState("All");

  const notifications = [
    {
      id: 1,
      type: "info",
      title: "New Parent Signup",
      message: "A new parent registered in Classroom A.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "warning",
      title: "Missing Attendance",
      message: "Ms. Lee hasn't submitted attendance today.",
      time: "20 min ago",
      unread: true,
    },
    {
      id: 3,
      type: "success",
      title: "Payment Approved",
      message: "Invoice #1248 has been confirmed.",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      type: "info",
      title: "Weekly Report Ready",
      message: "Student activity report is now available.",
      time: "Yesterday",
      unread: false,
    },
  ];

  const filteredList = filter === "All" ? notifications : notifications.filter((n) => n.type === filter);

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-primaryFont">Notifications Center</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <UsersIcon className="h-4 w-4 stroke-[2]" /> <h5>Communications</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary">Notifications Center</span>
              </li>
            </ol>
          </nav>
        </div>
        <button
          onClick={() => setFilter("All")}
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <CheckBadgeIcon className="h-5 w-5 stroke-[2]" /> Mark All as Read
        </button>
      </div>

      {/* FILTERS */}
      <div className="mb-6 flex gap-3">
        {["All", "info", "warning", "success"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1 text-sm transition ${
              filter === f ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
            } `}
          >
            {f === "All" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {filteredList.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md ${n.unread ? "border-blue-300 bg-blue-50" : "border-gray-200"} `}
          >
            {/* STATUS DOT */}
            {n.unread && <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>}

            {/* ICON */}
            <div className="mt-1">{renderIcon(n.type)}</div>

            {/* CONTENT */}
            <div className="flex-1">
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-gray-600">{n.message}</p>
              <p className="mt-1 text-xs text-gray-400">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
