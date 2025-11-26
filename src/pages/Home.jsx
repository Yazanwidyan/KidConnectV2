import React, { useState } from "react";
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

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jan");

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-semibold text-primary">Dashboard</h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <div>
          <label className="mr-2 font-medium text-gray-700">Month:</label>
          <select
            className="rounded border px-3 py-1"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <p className="text-gray-500">Total Students</p>
          <h3 className="text-3xl font-bold text-secondary">120</h3>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <p className="text-gray-500">Active Teachers</p>
          <h3 className="text-3xl font-bold text-secondary">15</h3>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <p className="text-gray-500">Messages Sent</p>
          <h3 className="text-3xl font-bold text-secondary">340</h3>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <p className="text-gray-500">Pending Invoices</p>
          <h3 className="text-3xl font-bold text-yellow-500">$250</h3>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <p className="text-gray-500">Overdue Invoices</p>
          <h3 className="text-3xl font-bold text-red-500">$120</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Students Growth */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
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

        {/* Revenue & Invoices Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
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

export default Home;
