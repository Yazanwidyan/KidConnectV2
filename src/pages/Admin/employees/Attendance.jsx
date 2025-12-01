import React, { useState } from "react";

const Attendance = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const initialEmployees = [
    { id: 1, name: "John Doe", role: "Teacher", status: "Unmarked", checkIn: "", checkOut: "" },
    { id: 2, name: "Sarah Ahmed", role: "Admin", status: "Unmarked", checkIn: "", checkOut: "" },
    { id: 3, name: "Emily Rosa", role: "Secretary", status: "Unmarked", checkIn: "", checkOut: "" },
  ];

  const [employees, setEmployees] = useState(initialEmployees);

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Unmarked");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const tabs = ["Unmarked", "Present", "On Leave"];

  const openAttendanceModal = () => setIsAttendanceModalOpen(true);
  const closeAttendanceModal = () => setIsAttendanceModalOpen(false);

  const openEmployeeModal = (emp) => {
    setSelectedEmployee(emp);
    setCheckIn(emp.checkIn || "");
    setCheckOut(emp.checkOut || "");
  };

  const saveEmployeeAttendance = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? { ...emp, checkIn, checkOut, status: checkIn || checkOut ? "Present" : emp.status }
          : emp
      )
    );
    setSelectedEmployee(null);
    setCheckIn("");
    setCheckOut("");
  };

  const filteredEmployees = employees.filter((emp) => emp.status === selectedTab);

  return (
    <div className="w-full p-6">
      <button
        onClick={openAttendanceModal}
        className="mb-6 rounded-xl bg-green-500 px-5 py-2 text-white shadow"
      >
        Mark Attendance
      </button>

      {/* Mark Attendance Modal */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-bold">Mark Attendance</h2>
              <button onClick={closeAttendanceModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {/* Date Picker */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-xl border px-4 py-2"
              />
            </div>

            {/* Tabs */}
            <div className="mb-4 flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 font-medium ${
                    selectedTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                  }`}
                >
                  {tab} ({employees.filter((emp) => emp.status === tab).length})
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-h-64 overflow-auto rounded-xl border p-2">
              {filteredEmployees.length === 0 && (
                <p className="py-4 text-center text-gray-500">No employees in this tab</p>
              )}
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  onClick={() => openEmployeeModal(emp)}
                  className="flex cursor-pointer justify-between rounded-lg p-3 hover:bg-gray-100"
                >
                  <span>
                    {emp.name} ({emp.role})
                  </span>
                  {emp.checkIn && emp.checkOut && (
                    <span className="text-sm text-gray-500">
                      {emp.checkIn} - {emp.checkOut}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeAttendanceModal}
                className="rounded-xl bg-gray-200 px-4 py-2 font-semibold text-gray-800 shadow"
              >
                Close
              </button>
              <button className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-white shadow">
                Save All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Check-In/Check-Out Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-bold">Manual Attendance</h2>
              <button onClick={() => setSelectedEmployee(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <p className="mb-2 font-medium">
              {selectedEmployee.name} ({selectedEmployee.role})
            </p>

            <label className="mb-1 block text-sm font-medium">Check-In Time</label>
            <input
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="mb-3 w-full rounded-xl border px-4 py-2"
            />

            <label className="mb-1 block text-sm font-medium">Check-Out Time</label>
            <input
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border px-4 py-2"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="rounded-xl bg-gray-200 px-4 py-2 font-semibold text-gray-800 shadow"
              >
                Cancel
              </button>
              <button
                onClick={saveEmployeeAttendance}
                className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-white shadow"
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
