import React, { useState } from "react";

import { useAdmissions } from "../../context/AdmissionsContext";
import StudentModal from "./modals/StudentModal";

export default function AdmissionsDashboard() {
  const { students } = useAdmissions();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Calculate counts
  const totalStudents = students.length;
  const prospects = students.filter((s) => s.status === "Prospect").length;
  const toured = students.filter((s) => s.status === "Toured").length;
  const applied = students.filter((s) => s.status === "Applied").length;
  const waitlist = students.filter((s) => s.status === "Waitlist").length;

  return (
    <div>
      {/* ---- Stats ---- */}
      <div className="mb-6 grid grid-cols-5 gap-4">
        {[
          { label: "Total Students", value: totalStudents },
          { label: "Prospects", value: prospects },
          { label: "Toured", value: toured },
          { label: "Applied", value: applied },
          { label: "Waitlist", value: waitlist },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-white p-4 text-center shadow">
            <p className="text-3xl font-bold text-blue-600">{item.value}</p>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      {/* ---- Student List ---- */}
      <div className="rounded-lg bg-white p-4 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Student List</h2>

          <button
            onClick={() => setAddModalOpen(true)}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Add Student
          </button>
        </div>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-2">Student Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Program(s)</th>
              <th className="p-2">Paperwork Date</th>
              <th className="p-2">Desired Start</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="cursor-pointer p-2 text-blue-600" onClick={() => setSelectedStudent(student)}>
                  {student.name}
                </td>
                <td className="p-2">{student.age}</td>
                <td className="p-2">{student.programs.join(", ")}</td>
                <td className="p-2">{student.paperworkDate}</td>
                <td className="p-2">{student.desiredStart}</td>
                <td className="p-2 font-semibold text-yellow-600">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Edit Modal ---- */}
      {selectedStudent && <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}

      {/* ---- Add Modal ---- */}
      {addModalOpen && (
        <StudentModal
          student={null} // ← Add mode
          onClose={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}
