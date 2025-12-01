import React, { useState } from "react";

const Attendance = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const initialEmployees = [
    {
      id: 1,
      name: "Abrar Moham...",
      role: "Secretary Students",
      status: "OnLeave",
      checkIn: "",
      checkOut: "",
    },
    {
      id: 2,
      name: "AHMED NOOH",
      role: "Nursery Admin",
      status: "Unmarked",
      checkIn: "",
      checkOut: "",
    },
    {
      id: 3,
      name: "Emily Rosa",
      role: "Secretary",
      status: "Present",
      checkIn: "",
      checkOut: "",
    },
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Unmarked");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const tabs = ["Unmarked", "Present", "OnLeave"];

  // Normalizes status strings for reliable comparison
  const normalizeStatus = (s) => (s || "").toString().toLowerCase().replace(/\s+/g, "");

  // Counts and filtered arrays use normalized comparison
  const countForTab = (tab) =>
    employees.filter((e) => normalizeStatus(e.status) === normalizeStatus(tab)).length;

  const filteredEmployees = employees.filter(
    (emp) => normalizeStatus(emp.status) === normalizeStatus(selectedTab)
  );

  const openAttendanceModal = () => setIsAttendanceModalOpen(true);
  const closeAttendanceModal = () => setIsAttendanceModalOpen(false);

  const openEmployeeModal = (emp) => {
    setSelectedEmployee(emp);
    setCheckIn(emp.checkIn || "");
    setCheckOut(emp.checkOut || "");
  };

  const saveEmployeeAttendance = () => {
    if (!selectedEmployee) return;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? {
              ...emp,
              checkIn,
              checkOut,
              // If you entered times, mark Present; otherwise keep existing status
              status: checkIn || checkOut ? "Present" : emp.status,
            }
          : emp
      )
    );

    setSelectedEmployee(null);
    setCheckIn("");
    setCheckOut("");
  };

  // Mark an employee as OnLeave
  const markEmployeeOnLeave = (empId) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === empId ? { ...emp, status: "OnLeave" } : emp)));
  };

  return (
    <div className="w-full p-6">
      {/* Top Stats Row */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center rounded-xl bg-blue-600 p-4 text-white shadow">
          <p className="text-3xl font-bold">{employees.length}</p>
          <p>Total number of employees</p>
        </div>

        <div className="flex flex-col items-center rounded-xl bg-green-600 p-4 text-white shadow">
          <p className="text-3xl font-bold">{countForTab("Present")}</p>
          <p>Checked in Employee</p>
        </div>

        <div className="flex flex-col items-center rounded-xl bg-orange-500 p-4 text-white shadow">
          <p className="text-3xl font-bold">{countForTab("OnLeave")}</p>
          <p>On Leave</p>
        </div>
      </div>

      {/* Filters Row */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Attendance</h2>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <input type="month" className="rounded-xl border px-4 py-2" />
        <input placeholder="Enter Employee Name" className="rounded-xl border px-4 py-2" />
        <select className="rounded-xl border px-4 py-2">
          <option>Select Status</option>
        </select>
        <button className="rounded-xl bg-blue-500 px-4 py-2 text-white">Filter</button>
        <button className="rounded-xl bg-gray-200 px-4 py-2">Reset</button>
      </div>

      <div className="mb-4 flex justify-between">
        <button onClick={openAttendanceModal} className="rounded-xl bg-green-500 px-5 py-2 text-white shadow">
          Mark Attendance
        </button>
        <button
          className="rounded-xl bg-orange-500 px-5 py-2 text-white shadow"
          onClick={() => {
            /* optional global leave action - left empty */
          }}
        >
          Submit Leave
        </button>
      </div>

      {/* Calendar Table */}
      <div className="mt-6 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Employees</th>
              {days.map((d) => (
                <th key={d} className="border p-1 text-center">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="whitespace-nowrap p-2">{emp.name}</td>
                {days.map((d) => (
                  <td key={d} className="h-10 border bg-yellow-50"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Attendance Modal */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-bold">Attendance</h2>
              <button onClick={closeAttendanceModal}>✕</button>
            </div>

            <input
              type="date"
              className="mb-4 w-full rounded-xl border px-4 py-2"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            {/* Tabs */}
            <div className="mb-4 flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 font-medium ${
                    normalizeStatus(selectedTab) === normalizeStatus(tab)
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {tab} ({countForTab(tab)})
                </button>
              ))}
            </div>

            {/* Employees List */}
            <div className="max-h-64 overflow-auto rounded-xl border p-3">
              {filteredEmployees.length === 0 && (
                <div className="p-4 text-sm text-gray-500">No employees in this category.</div>
              )}

              {filteredEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between rounded p-2 hover:bg-gray-100">
                  <div onClick={() => openEmployeeModal(emp)} className="flex-1 cursor-pointer">
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-sm text-gray-500">{emp.role}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {emp.checkIn && emp.checkOut && (
                      <span className="text-sm text-gray-500">
                        {emp.checkIn} - {emp.checkOut}
                      </span>
                    )}

                    {/* Quick action to mark as on leave */}
                    <button
                      onClick={() => markEmployeeOnLeave(emp.id)}
                      className="rounded bg-orange-100 px-3 py-1 text-sm text-orange-700"
                      title="Mark as On Leave"
                    >
                      Mark Leave
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-xl bg-gray-200 px-4 py-2" onClick={closeAttendanceModal}>
                Close
              </button>
              <button className="rounded-xl bg-green-500 px-4 py-2 text-white">Save All</button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Check Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-bold">Attendance Details</h2>
              <button onClick={() => setSelectedEmployee(null)}>✕</button>
            </div>

            <p className="mb-4 font-medium">{selectedEmployee.name}</p>

            <label>Check-In Time</label>
            <input
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="mb-3 w-full rounded-xl border px-4 py-2"
            />

            <div className="mb-3 flex items-center gap-2">
              <input type="checkbox" id="late" />
              <label htmlFor="late">Late</label>
            </div>

            <label>Check-Out Time</label>
            <input
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border px-4 py-2"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-xl bg-gray-200 px-4 py-2" onClick={() => setSelectedEmployee(null)}>
                Cancel
              </button>
              <button
                className="rounded-xl bg-green-500 px-4 py-2 text-white"
                onClick={saveEmployeeAttendance}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
