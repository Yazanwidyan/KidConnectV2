import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

import BulkCheckInModal from "./modals/StudentsBulkCheckInModal";
import BulkCheckOutModal from "./modals/StudentsBulkCheckOutModal";
import BulkMarkAbsentModal from "./modals/StudentsBulkMarkAbsentModal";

const groupNames = ["KG-1", "KG-2", "KG-3"];

const StudentsAttendance = () => {
  const [filters, setFilters] = useState({
    date: "2024-11-15",
    groupName: "",
  });

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ava",
      group: "KG-1",
      checkIn: "12:17 PM",
      checkOut: "--",
      status: "Present",
      markedAbsent: "--",
    },
    {
      id: 2,
      name: "Liam",
      group: "KG-1",
      checkIn: "--",
      checkOut: "--",
      status: "Absent",
      markedAbsent: "9:05 AM",
    },
  ]);

  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [absentOpen, setAbsentOpen] = useState(false);
  // ---------- PLACEHOLDER MODAL HANDLERS ----------
  const openBulkCheckInModal = () => setCheckInOpen(true);
  const openBulkCheckOutModal = () => setCheckOutOpen(true);
  const openBulkMarkAbsentModal = () => setAbsentOpen(true);

  const handleCheckIn = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checkIn: "Now", status: "Present", markedAbsent: "--" } : s))
    );
  };

  const handleCheckOut = (id) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, checkOut: "Now", status: "Left" } : s)));
  };

  return (
    <>
      <div className="w-full p-6">
        <h1 className="mb-5 text-2xl font-bold">Students Attendance</h1>

        {/* ---------------- TOP FILTERS ---------------- */}
        <div className="mb-6 flex items-center gap-4">
          {/* DATE */}
          <div className="relative w-1/4">
            <label className="mb-1 block text-gray-600">Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
            />
          </div>

          {/* GROUP */}
          <div className="relative w-1/4">
            <label className="mb-1 block text-gray-600">Groups</label>
            <select
              id="groupName"
              name="groupName"
              value={filters.groupName}
              onChange={(e) => setFilters({ ...filters, groupName: e.target.value })}
              className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
            >
              <option value="">All Groups</option>
              {groupNames.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-[48px] h-4 w-4 -translate-y-1/2 stroke-2 text-gray-500" />
          </div>
        </div>

        {/* ---------------- STATS CARDS ---------------- */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          <div className="rounded-xl border-l-4 border-green-500 bg-white p-5 shadow">
            <p className="text-3xl font-bold">94</p>
            <p className="text-gray-600">All Students</p>
          </div>

          <div className="rounded-xl border-l-4 border-pink-500 bg-white p-5 shadow">
            <p className="text-3xl font-bold">92</p>
            <p className="text-gray-600">Pending</p>
          </div>

          <div className="rounded-xl border-l-4 border-purple-500 bg-white p-5 shadow">
            <p className="text-3xl font-bold">1</p>
            <p className="text-gray-600">Check In</p>
          </div>

          <div className="rounded-xl border-l-4 border-yellow-500 bg-white p-5 shadow">
            <p className="text-3xl font-bold">1</p>
            <p className="text-gray-600">Check Out</p>
          </div>

          <div className="rounded-xl border-l-4 border-orange-500 bg-white p-5 shadow">
            <p className="text-3xl font-bold">0</p>
            <p className="text-gray-600">Absent</p>
          </div>
        </div>

        {/* ---------------- ACTION BUTTONS ---------------- */}
        <div className="mb-6 grid grid-cols-3 gap-4 md:grid-cols-5">
          <button
            onClick={openBulkCheckInModal}
            className="rounded-lg bg-green-50 px-4 py-3 text-center text-green-700 shadow hover:bg-green-100"
          >
            Check In
          </button>

          <button
            onClick={openBulkCheckOutModal}
            className="rounded-lg bg-purple-50 px-4 py-3 text-center text-purple-700 shadow hover:bg-purple-100"
          >
            Check Out
          </button>

          <button
            onClick={openBulkMarkAbsentModal}
            className="rounded-lg bg-red-50 px-4 py-3 text-center text-red-700 shadow hover:bg-red-100"
          >
            Mark Absent
          </button>
        </div>

        {/* ---------------- SEARCH ---------------- */}
        <div className="relative mb-2 w-1/3">
          <input
            type="text"
            placeholder="Search by student Name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
          <MagnifyingGlassIcon className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-500" />
        </div>

        {/* ---------------- STUDENTS TABLE ---------------- */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Group</th>
                <th className="p-3 text-left">Check In</th>
                <th className="p-3 text-left">Check Out</th>
                <th className="p-3 text-left">Marked Absent</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.group}</td>
                  <td className="p-3">{s.checkIn}</td>
                  <td className="p-3">{s.checkOut}</td>
                  <td className="p-3">{s.markedAbsent}</td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        s.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : s.status === "Absent"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {s.status === "Present" ? (
                      <button
                        onClick={() => handleCheckOut(s.id)}
                        className="text-purple-600 hover:underline"
                      >
                        Check Out
                      </button>
                    ) : (
                      <button onClick={() => handleCheckIn(s.id)} className="text-green-600 hover:underline">
                        Check In
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <BulkCheckInModal
        isOpen={checkInOpen}
        onClose={() => setCheckInOpen(false)}
        onSubmit={() => {
          console.log("Bulk Check In done");
          setCheckInOpen(false);
        }}
      />

      <BulkCheckOutModal
        isOpen={checkOutOpen}
        onClose={() => setCheckOutOpen(false)}
        onSubmit={() => {
          console.log("Bulk Check Out done");
          setCheckOutOpen(false);
        }}
      />

      <BulkMarkAbsentModal
        isOpen={absentOpen}
        onClose={() => setAbsentOpen(false)}
        onSubmit={() => {
          console.log("Bulk Mark Absent done");
          setAbsentOpen(false);
        }}
      />
    </>
  );
};

export default StudentsAttendance;
