import React, { useState } from "react";

import { useStaff } from "../../context/StaffContext";

export default function StaffTimecards() {
  const { staff, timecards, addTimecard } = useStaff();
  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    staffId: "",
    date: "",
    checkIn: "",
    checkOut: "",
    totalHours: 0,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const calcHours = () => {
    const start = new Date(`01/01/2020 ${form.checkIn}`);
    const end = new Date(`01/01/2020 ${form.checkOut}`);
    const diff = (end - start) / 1000 / 3600;
    setForm({ ...form, totalHours: diff });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calcHours();
    addTimecard(form);
    setModal(false);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">Timecards</h2>

        <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => setModal(true)}>
          + Add Timecard
        </button>
      </div>

      <table className="min-w-full rounded bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th>Date</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Hours</th>
          </tr>
        </thead>

        <tbody>
          {timecards.map((t) => {
            const st = staff.find((x) => x.id === Number(t.staffId));
            return (
              <tr key={t.id} className="border-b">
                <td className="px-4 py-2">{st?.name}</td>
                <td>{t.date}</td>
                <td>{t.checkIn}</td>
                <td>{t.checkOut}</td>
                <td>{t.totalHours}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded bg-white p-6 shadow">
            <h3 className="mb-4 font-bold">Add Timecard</h3>

            <form className="grid gap-3" onSubmit={handleSubmit}>
              <select name="staffId" className="border p-2" onChange={handleChange}>
                <option>Select Staff</option>
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <input type="date" name="date" onChange={handleChange} className="border p-2" />
              <input type="time" name="checkIn" onChange={handleChange} className="border p-2" />
              <input type="time" name="checkOut" onChange={handleChange} className="border p-2" />

              <button className="rounded bg-blue-600 py-2 text-white">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
