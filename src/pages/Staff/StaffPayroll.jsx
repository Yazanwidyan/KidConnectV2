import React, { useState } from "react";

import { useStaff } from "../../context/StaffContext";

export default function StaffPayroll() {
  const { staff, payroll, generatePayroll } = useStaff();

  const [month, setMonth] = useState("");

  const handleRun = (staffId) => {
    generatePayroll(staffId, month);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Payroll</h2>

      <input type="month" className="mb-4 border p-2" onChange={(e) => setMonth(e.target.value)} />

      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="px-4 py-2">{s.name}</td>

              <td>
                <button className="rounded bg-green-500 px-3 py-1 text-white" onClick={() => handleRun(s.id)}>
                  Run Payroll
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payroll History */}
      <h3 className="mt-6 font-bold">Payroll Records</h3>

      <ul className="mt-3">
        {payroll.map((p) => (
          <li key={p.id} className="mb-2 rounded border bg-gray-50 p-3">
            Staff ID: {p.staffId} — Month: {p.month} — Total: ${p.totalPay}
          </li>
        ))}
      </ul>
    </div>
  );
}
