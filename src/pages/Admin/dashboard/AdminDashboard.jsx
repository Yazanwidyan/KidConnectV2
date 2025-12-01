import React, { useState } from "react";
import {
  FaExclamationTriangle,
  FaFileInvoiceDollar,
  FaUserFriends,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample data
const studentData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 135 },
  { month: "Mar", students: 140 },
  { month: "Apr", students: 150 },
  { month: "May", students: 160 },
  { month: "Jun", students: 155 },
];

const revenueData = [
  { month: "Jan", revenue: 1200, pending: 200, overdue: 50 },
  { month: "Feb", revenue: 1500, pending: 250, overdue: 75 },
  { month: "Mar", revenue: 1700, pending: 300, overdue: 100 },
  { month: "Apr", revenue: 1600, pending: 180, overdue: 80 },
  { month: "May", revenue: 1800, pending: 220, overdue: 90 },
  { month: "Jun", revenue: 2000, pending: 250, overdue: 120 },
];

// New dashboard data
const dailyAttendance = [
  { day: "Mon", attendance: 115 },
  { day: "Tue", attendance: 120 },
  { day: "Wed", attendance: 118 },
  { day: "Thu", attendance: 122 },
  { day: "Fri", attendance: 117 },
];

const averageTimeSpent = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 4 },
  { day: "Wed", hours: 3.8 },
  { day: "Thu", hours: 4.2 },
  { day: "Fri", hours: 3.9 },
];

const AdminDashboard = () => {
  return (
    <div className="p-6">
      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-5">
        {/* Total Students */}
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-[#0F626A] p-6 shadow-lg">
          <FaUsers className="pointer-events-none absolute -right-10 top-4 text-9xl text-white opacity-10" />
          <div className="z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-inner">
            <FaUsers className="text-2xl text-[#0F626A]" />
          </div>
          <h3 className="relative z-10 mb-1 text-4xl font-extrabold text-white">160</h3>
          <p className="relative z-10 text-lg text-white">Total Students</p>
        </div>

        {/* Total Parents */}
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-[#1E90A0] p-6 shadow-lg">
          <FaUserFriends className="pointer-events-none absolute -right-10 top-4 text-9xl text-white opacity-10" />
          <div className="z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-inner">
            <FaUserFriends className="text-2xl text-[#1E90A0]" />
          </div>
          <h3 className="relative z-10 mb-1 text-4xl font-extrabold text-white">145</h3>
          <p className="relative z-10 text-lg text-white">عدد الطلاب</p>
        </div>

        {/* Total Employees */}
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-[#0F9D58] p-6 shadow-lg">
          <FaUserTie className="pointer-events-none absolute -right-10 top-4 text-9xl text-white opacity-10" />
          <div className="z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-inner">
            <FaUserTie className="text-2xl text-[#0F9D58]" />
          </div>
          <h3 className="relative z-10 mb-1 text-4xl font-extrabold text-white">25</h3>
          <p className="relative z-10 text-lg text-white">Total Employees</p>
        </div>

        {/* Pending Invoices */}
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-[#F4B400] p-6 shadow-lg">
          <FaFileInvoiceDollar className="pointer-events-none absolute -right-10 top-4 text-9xl text-white opacity-10" />
          <div className="z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-inner">
            <FaFileInvoiceDollar className="text-2xl text-[#F4B400]" />
          </div>
          <h3 className="relative z-10 mb-1 text-4xl font-extrabold text-white">$250</h3>
          <p className="relative z-10 text-lg text-white">Pending Invoices</p>
        </div>

        {/* Overdue Invoices */}
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-[#D32F2F] p-6 shadow-lg">
          <FaExclamationTriangle className="pointer-events-none absolute -right-10 top-4 text-9xl text-white opacity-10" />
          <div className="z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-inner">
            <FaExclamationTriangle className="text-2xl text-[#D32F2F]" />
          </div>
          <h3 className="relative z-10 mb-1 text-4xl font-extrabold text-white">$120</h3>
          <p className="relative z-10 text-lg text-white">Overdue Invoices</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Students Daily Attendance */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Daily Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#25A0DD" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Average Time Spent */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Average Time Spent per Student (hrs)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={averageTimeSpent}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#FACC15" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Students Growth */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Students Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={studentData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#25A0DD" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue & Invoices */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Revenue & Invoices</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#25A0DD" barSize={30} />
              <Bar dataKey="pending" fill="#FACC15" barSize={30} />
              <Bar dataKey="overdue" fill="#EF4444" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
