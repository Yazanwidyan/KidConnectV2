import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";

const StudentsAttendance = () => {
  const scrollRef = useRef(null);

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Standard 01",
      color: "#E668C1",
      students: [
        { id: 1, name: "Ava", class: "01", status: "Present" },
        { id: 2, name: "Liam", class: "01", status: "Absent" },
      ],
    },
    {
      id: 2,
      name: "Standard 02",
      color: "#0C3C97",
      students: [
        { id: 1, name: "Noah", class: "02", status: "Late" },
        { id: 2, name: "Emma", class: "02", status: "Present" },
      ],
    },
    {
      id: 3,
      name: "Standard 03",
      color: "#E7A44D",
      students: [
        { id: 1, name: "Olivia", class: "03", status: "Present" },
        { id: 2, name: "Ethan", class: "03", status: "Present" },
      ],
    },
    {
      id: 4,
      name: "Standard 04",
      color: "#E34B43",
      students: [
        { id: 1, name: "Mia", class: "04", status: "Absent" },
        { id: 2, name: "Lucas", class: "04", status: "Late" },
      ],
    },
    {
      id: 5,
      name: "Standard 04",
      color: "#fcba03",
      students: [
        { id: 1, name: "Mia", class: "04", status: "Absent" },
        { id: 2, name: "Lucas", class: "04", status: "Late" },
      ],
    },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleStatusChange = (groupId, studentId, newStatus) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              students: group.students.map((student) =>
                student.id === studentId ? { ...student, status: newStatus } : student
              ),
            }
          : group
      )
    );
  };

  return (
    <div className="w-full p-6">
      <h1 className="mb-5 text-2xl font-bold">Students Attendance</h1>

      {/* GROUP SELECTOR */}
      <div className="relative">
        {/* SCROLLABLE CONTENT */}
        <div
          ref={scrollRef}
          className="hide-scrollbar mr-16 flex items-center gap-6 overflow-x-auto scroll-smooth p-6"
        >
          {groups.map((g) => (
            <div
              key={g.id}
              onClick={() => setSelectedGroup(g.id)}
              className="relative cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <div
                className="flex w-52 items-center justify-between rounded-xl px-5 py-4 text-white shadow-md"
                style={{
                  backgroundColor: g.color,
                  boxShadow:
                    selectedGroup === g.id ? `0 0 20px 6px ${g.color}AA` : `0 0 10px 2px ${g.color}66`,
                }}
              >
                <div>
                  <h2 className="text-lg font-semibold">{g.name}</h2>
                  <p className="text-xs opacity-90">{g.students.length} Students</p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <span className="text-sm font-bold text-white">■</span>
                </div>
              </div>

              {selectedGroup === g.id && (
                <div
                  className="absolute -bottom-2 left-6 h-4 w-4 rotate-45"
                  style={{ backgroundColor: g.color }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* ARROWS */}
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-3">
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
            className="rounded-full bg-white p-2 text-primary shadow transition hover:bg-white/90"
          >
            <ArrowRightIcon className="h-5 w-5 stroke-[2]" />
          </button>

          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
            className="rounded-full bg-white p-2 text-primary shadow transition hover:bg-white/90"
          >
            <ArrowLeftIcon className="h-5 w-5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      {selectedGroup && (
        <div className="mt-6 rounded-xl bg-white p-4 shadow">
          <h3 className="mb-4 text-xl font-bold">
            Students in {groups.find((g) => g.id === selectedGroup).name}
          </h3>

          <table className="w-full rounded border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Class</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Change</th>
              </tr>
            </thead>

            <tbody>
              {groups
                .find((g) => g.id === selectedGroup)
                .students.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.class}</td>
                    <td className="p-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          student.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : student.status === "Absent"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <select
                        value={student.status}
                        onChange={(e) => handleStatusChange(selectedGroup, student.id, e.target.value)}
                        className="rounded border px-2 py-1"
                      >
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Late</option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentsAttendance;
