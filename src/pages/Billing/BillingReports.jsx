import { useState } from "react";

import { useBilling } from "../../context/BillingContext";

export default function Reports() {
  const { invoices, payments, students } = useBilling();
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-12-31");

  const byDate = invoices.filter((i) => i.date >= from && i.date <= to);
  const revenue = byDate.reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Reports</h1>
      <div className="mb-4 flex items-center gap-2">
        <input value={from} onChange={(e) => setFrom(e.target.value)} className="rounded border px-2 py-1" />
        <input value={to} onChange={(e) => setTo(e.target.value)} className="rounded border px-2 py-1" />
        <div className="ml-auto font-semibold">Revenue: {(revenue / 100).toFixed(2)}</div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded bg-white p-4 shadow">Invoices: {byDate.length}</div>
        <div className="rounded bg-white p-4 shadow">
          Payments: {payments.filter((p) => p.date >= from && p.date <= to).length}
        </div>
      </div>
    </div>
  );
}
