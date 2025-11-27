import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const StudentsList = () => {
  const navigate = useNavigate();

  // Sample student data
  const students = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      class: "5th Grade",
      gender: "Male",
      status: "Active",
      parent: "Jane Doe",
    },
    {
      id: 2,
      firstName: "Mary",
      lastName: "Smith",
      class: "4th Grade",
      gender: "Female",
      status: "Inactive",
      parent: "Paul Smith",
    },
    {
      id: 3,
      firstName: "Ali",
      lastName: "Khan",
      class: "6th Grade",
      gender: "Male",
      status: "Active",
      parent: "Sara Khan",
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      console.log("Deleted student", id);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Students List</h2>
        <Link
          to="/admin/students/add-student"
          className="rounded-md bg-[#3A49F9] px-4 py-2 font-semibold text-white shadow-md transition hover:bg-[#2e3abf]"
        >
          Add Student
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Class</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Parent</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {students.map((student, index) => (
              <tr key={student.id} className="transition hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td
                  onClick={() => navigate(`/admin/students/student-profile/${student.id}`)}
                  className="whitespace-nowrap px-6 py-4 text-sm text-gray-700"
                >
                  {student.firstName} {student.lastName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{student.class}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{student.gender}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{student.parent}</td>
                <td className="flex gap-2 whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  <Link
                    to={`/admin/students/edit-student/${student.id}`}
                    className="text-blue-600 transition hover:text-blue-800"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 transition hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
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

export default StudentsList;
