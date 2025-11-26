import React, { useState } from "react";

const initialStudents = [
  { id: 1, name: "Ali Ahmad", class: "KG1", status: "Present" },
  { id: 2, name: "Sara Omar", class: "KG2", status: "Absent" },
  { id: 3, name: "Yousef Ali", class: "KG1", status: "Late" },
];

const Attendance = () => {
  const [students, setStudents] = useState(initialStudents);
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const classes = ["All Classes", "KG1", "KG2", "KG3"];

  const filteredStudents =
    selectedClass === "All Classes" ? students : students.filter((s) => s.class === selectedClass);

  const updateStatus = (id, status) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const totalPresent = students.filter((s) => s.status === "Present").length;
  const totalAbsent = students.filter((s) => s.status === "Absent").length;
  const totalLate = students.filter((s) => s.status === "Late").length;

  return (
    <div className="p-6">
      <h2 className="text-primary mb-6 text-2xl font-semibold">Attendance</h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <div>
            <label className="mr-2 font-medium text-gray-700">Class:</label>
            <select
              className="rounded border px-3 py-1"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mr-2 font-medium text-gray-700">Date:</label>
            <input
              type="date"
              className="rounded border px-3 py-1"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="flex gap-4 text-gray-700">
          <p>
            Present: <span className="font-semibold">{totalPresent}</span>
          </p>
          <p>
            Absent: <span className="font-semibold">{totalAbsent}</span>
          </p>
          <p>
            Late: <span className="font-semibold">{totalLate}</span>
          </p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Class</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{student.name}</td>
                <td className="px-6 py-3">{student.class}</td>
                <td className="flex gap-2 px-6 py-3">
                  {["Present", "Absent", "Late"].map((status) => (
                    <button
                      key={status}
                      className={`rounded-full px-3 py-1 text-sm text-white ${
                        student.status === status
                          ? status === "Present"
                            ? "bg-green-500"
                            : status === "Absent"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      onClick={() => updateStatus(student.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
