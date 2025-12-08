import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

export default function RolesPermissions() {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["manage_users", "manage_classes"] },
    { id: 2, name: "Teacher", permissions: ["manage_students"] },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);

  const allPermissions = [
    { id: "manage_users", label: "Manage Users" },
    { id: "manage_students", label: "Manage Students" },
    { id: "manage_classes", label: "Manage Classes" },
    { id: "view_reports", label: "View Reports" },
  ];

  const togglePermission = (id) => {
    if (rolePermissions.includes(id)) {
      setRolePermissions(rolePermissions.filter((p) => p !== id));
    } else {
      setRolePermissions([...rolePermissions, id]);
    }
  };

  const openAddModal = () => {
    setEditingRole(null);
    setRoleName("");
    setRolePermissions([]);
    setModalOpen(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRolePermissions(role.permissions);
    setModalOpen(true);
  };

  const saveRole = () => {
    if (!roleName.trim()) return alert("Role name is required!");

    if (editingRole) {
      // Update existing role
      setRoles(
        roles.map((r) =>
          r.id === editingRole.id ? { ...r, name: roleName, permissions: rolePermissions } : r
        )
      );
    } else {
      // Add new role
      setRoles([
        ...roles,
        {
          id: Date.now(),
          name: roleName,
          permissions: rolePermissions,
        },
      ]);
    }

    setModalOpen(false);
  };

  const deleteRole = (id) => {
    if (window.confirm("Delete this role?")) {
      setRoles(roles.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Roles & Permissions</h1>
        <button
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
          onClick={openAddModal}
        >
          <FiPlus /> Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border-b p-4 font-medium text-gray-600">Role Name</th>
              <th className="border-b p-4 font-medium text-gray-600">Permissions</th>
              <th className="border-b p-4 text-right font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b">
                <td className="p-4">{role.name}</td>

                <td className="p-4 text-sm text-gray-700">
                  {role.permissions.length === 0 ? (
                    <span className="italic text-gray-400">No permissions</span>
                  ) : (
                    role.permissions.map((p) => (
                      <span
                        key={p}
                        className="mb-1 mr-2 inline-block rounded bg-teal-100 px-2 py-1 text-xs text-teal-700"
                      >
                        {allPermissions.find((perm) => perm.id === p)?.label}
                      </span>
                    ))
                  )}
                </td>
                <td className="flex gap-2 px-6 py-3">
                  <button
                    onClick={() => openEditModal(role)}
                    className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                  >
                    <PencilSquareIcon className="h-5 w-5 stroke-2" />
                  </button>
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1"
                  >
                    <TrashIcon className="h-5 w-5 stroke-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">{editingRole ? "Edit Role" : "Add Role"}</h2>

            {/* Role Name */}
            <div className="mb-4">
              <label className="mb-1 block text-sm text-gray-700">Role Name</label>
              <input
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:ring-teal-500"
              />
            </div>

            {/* Permissions */}
            <div>
              <label className="mb-2 block text-sm text-gray-700">Permissions</label>

              <div className="grid grid-cols-2 gap-2">
                {allPermissions.map((perm) => (
                  <label key={perm.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rolePermissions.includes(perm.id)}
                      onChange={() => togglePermission(perm.id)}
                      className="h-4 w-4"
                    />
                    <span className="text-gray-700">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={saveRole}
                className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
              >
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
