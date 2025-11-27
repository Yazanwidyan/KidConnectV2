import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const GroupList = () => {
  // Sample data
  const groups = [
    { id: 1, name: "Math Club", type: "Academic", status: "Active" },
    { id: 2, name: "Football Team", type: "Sports", status: "Inactive" },
    { id: 3, name: "Art Society", type: "Arts", status: "Active" },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      console.log("Deleted group", id);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Group List</h2>
        <Link
          to="/admin/groups/create-group"
          className="rounded-md bg-[#3A49F9] px-4 py-2 font-semibold text-white shadow-md transition hover:bg-[#2e3abf]"
        >
          Add Group
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {groups.map((group, index) => (
              <tr key={group.id} className="transition hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{group.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{group.type}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      group.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {group.status}
                  </span>
                </td>
                <td className="flex gap-2 whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  <Link
                    to={`/admin/groups/edit-group/${group.id}`}
                    className="text-blue-600 transition hover:text-blue-800"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(group.id)}
                    className="text-red-600 transition hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {groups.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No groups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupList;
