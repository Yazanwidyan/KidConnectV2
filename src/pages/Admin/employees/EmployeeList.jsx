import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const employees = [
    { id: 1, name: "Alice Johnson", role: "Teacher", department: "Math", status: "Active" },
    { id: 2, name: "Bob Smith", role: "Administrator", department: "Office", status: "Active" },
    { id: 3, name: "Carla Brown", role: "Staff", department: "Library", status: "Inactive" },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      console.log("Deleted employee", id);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Employee List</h2>
        <Link
          to="/admin/employees/add-employee"
          className="rounded-md bg-[#3A49F9] px-4 py-2 font-semibold text-white shadow-md transition hover:bg-[#2e3abf]"
        >
          Add Employee
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Department</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {employees.map((emp, index) => (
              <tr key={emp.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{emp.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{emp.role}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{emp.department}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${emp.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="flex gap-2 px-6 py-4 text-sm">
                  <Link
                    to={`/admin/employees/edit-employee/${emp.id}`}
                    className="text-blue-600 transition hover:text-blue-800"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-600 transition hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
