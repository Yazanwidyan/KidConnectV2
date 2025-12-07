import { UserPlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";

const StudentsAttendance = () => {
  const [attendance, setAttendance] = useState([
    { id: 1, name: "John Doe", class: "5th Grade", status: "Present" },
    { id: 2, name: "Mary Smith", class: "4th Grade", status: "Absent" },
    { id: 3, name: "Ali Khan", class: "6th Grade", status: "Late" },
  ]);

  const handleStatusChange = (id, value) => {
    setAttendance((prev) =>
      prev.map((student) => (student.id === id ? { ...student, status: value } : student))
    );
  };

  const handleSave = () => {
    console.log("Attendance saved:", attendance);
    alert("Attendance saved successfully!");
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-primaryFont">Students List</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <UserPlusIcon className="h-4 w-4 stroke-[2]" /> <h5>Students</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary">Students List</span>
              </li>
            </ol>
          </nav>
        </div>
        <button
          to="/admin/students/add-student"
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <UserPlusIcon className="h-5 w-5 stroke-[2]" />
          Save Attendance
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Class</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {attendance.map((student, index) => (
              <tr key={student.id} className="transition hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{student.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{student.class}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === "Present"
                        ? "bg-green-100 text-green-800"
                        : student.status === "Absent"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="flex gap-2 whitespace-nowrap px-6 py-4 text-sm">
                  <select
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>
              </tr>
            ))}

            {attendance.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsAttendance;
