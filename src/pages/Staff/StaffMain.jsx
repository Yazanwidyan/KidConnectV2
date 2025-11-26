import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStaff } from "../../context/StaffContext";

export default function StaffMain() {
  const navigate = useNavigate();
  const { staff, addStaff } = useStaff();
  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "Active",
    department: "",
    hourlyRate: 0,
    defaultCheckIn: "",
    defaultCheckOut: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addStaff(form);
    setModal(false);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">All Staff</h2>
        <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => setModal(true)}>
          + Add Staff
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full rounded bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr
              key={s.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/staff/${s.id}`)}
            >
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">{s.email}</td>
              <td className="border px-4 py-2">{s.role}</td>
              <td className="border px-4 py-2">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="relative w-96 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-bold">Add Staff</h2>

            <button onClick={() => setModal(false)} className="absolute right-3 top-3 text-gray-600">
              ✕
            </button>

            <form className="grid gap-3" onSubmit={handleSubmit}>
              <input name="name" onChange={handleChange} placeholder="Name" className="rounded border p-2" />
              <input
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="rounded border p-2"
              />
              <input
                name="phone"
                onChange={handleChange}
                placeholder="Phone"
                className="rounded border p-2"
              />
              <input name="role" onChange={handleChange} placeholder="Role" className="rounded border p-2" />
              <input
                name="department"
                onChange={handleChange}
                placeholder="Department"
                className="rounded border p-2"
              />
              <input
                name="hourlyRate"
                onChange={handleChange}
                placeholder="Hourly Rate"
                className="rounded border p-2"
              />
              <button className="rounded bg-blue-600 py-2 text-white">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
