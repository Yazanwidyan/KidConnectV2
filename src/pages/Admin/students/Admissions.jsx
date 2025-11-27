import React, { useState } from "react";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";

const Admissions = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [filter, setFilter] = useState("all");

  // Sample backend data
  const [students, setStudents] = useState([
    {
      id: 1,
      registerId: "REG001",
      name: "John Doe",
      parent1: "Jane Doe",
      parent2: "Jack Doe",
      age: 5,
      dob: "2018-05-12",
      status: "Review",
    },
    {
      id: 2,
      registerId: "REG002",
      name: "Alice Smith",
      parent1: "Mary Smith",
      parent2: "Robert Smith",
      age: 4,
      dob: "2019-08-20",
      status: "Waitlist",
    },
    {
      id: 3,
      registerId: "REG003",
      name: "Bob Johnson",
      parent1: "Anna Johnson",
      parent2: "Mark Johnson",
      age: 6,
      dob: "2017-11-02",
      status: "Enrolled",
    },
  ]);

  const filteredStudents = filter === "all" ? students : students.filter((s) => s.status === filter);

  const handleEdit = (id) => console.log("Edit student", id);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleCopyLink = () => {
    const link = "https://your-school.com/register";
    navigator.clipboard.writeText(link);
    alert("Registration link copied to clipboard!");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {["Review", "Waitlist", "Enrolled"].map((status) => (
          <div
            key={status}
            className={`rounded-lg p-4 shadow ${status === "Review" ? "bg-blue-100" : status === "Waitlist" ? "bg-yellow-100" : "bg-green-100"}`}
          >
            <h3
              className={`text-lg font-semibold ${status === "Review" ? "text-blue-700" : status === "Waitlist" ? "text-yellow-700" : "text-green-700"}`}
            >
              {status}
            </h3>
            <p className="mt-2 text-2xl font-bold">{students.filter((s) => s.status === status).length}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowLinkModal(true)}
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <FaCopy /> Get Link
        </button>
        <button
          onClick={() => setShowRegisterModal(true)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Register Student
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <span className="font-semibold">Filter by Status:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded border px-2 py-1"
        >
          <option value="all">All</option>
          <option value="Review">Review</option>
          <option value="Waitlist">Waitlist</option>
          <option value="Enrolled">Enrolled</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Register ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Parent 1</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Parent 2</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date of Birth</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredStudents.map((student, index) => (
              <tr key={student.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.registerId}</td>
                <td
                  className="cursor-pointer px-6 py-4 text-sm text-blue-600"
                  onClick={() => alert(`View details for ${student.name}`)}
                >
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.parent1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.parent2}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.age}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.dob}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === "Review"
                        ? "bg-blue-100 text-blue-800"
                        : student.status === "Waitlist"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="flex gap-2 px-6 py-4 text-sm text-gray-700">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Register Student Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Register New Student</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Student registered!");
                setShowRegisterModal(false);
              }}
            >
              <input
                type="text"
                placeholder="Student Name"
                className="w-full rounded border px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Parent 1 Name"
                className="w-full rounded border px-3 py-2"
                required
              />
              <input type="text" placeholder="Parent 2 Name" className="w-full rounded border px-3 py-2" />
              <input type="number" placeholder="Age" className="w-full rounded border px-3 py-2" required />
              <input
                type="date"
                placeholder="Date of Birth"
                className="w-full rounded border px-3 py-2"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Get Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Copy Registration Link</h2>
            <div className="flex items-center gap-2 rounded border px-3 py-2">
              <input
                type="text"
                value="https://your-school.com/register"
                readOnly
                className="flex-1 border-none outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
              >
                Copy
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowLinkModal(false)}
                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admissions;
