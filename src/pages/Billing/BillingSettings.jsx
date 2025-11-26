import { useState } from "react";

import { useBilling } from "../../context/BillingContext";

export default function Settings() {
  const { settings, setSettings } = useBilling();
  const [local, setLocal] = useState(settings);

  function save() {
    setSettings(local);
    alert("Settings saved");
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Billing Settings</h1>
      <div className="mb-4">
        <label className="block font-medium">Billing Cycle</label>
        <select
          value={local.billingCycle}
          onChange={(e) => setLocal((l) => ({ ...l, billingCycle: e.target.value }))}
          className="mt-2 rounded border p-2"
        >
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Invoice Prefix</label>
        <input
          value={local.invoicePrefix}
          onChange={(e) => setLocal((l) => ({ ...l, invoicePrefix: e.target.value }))}
          className="mt-2 rounded border p-2"
        />
      </div>
      <button onClick={save} className="rounded bg-blue-600 px-4 py-2 text-white">
        Save Settings
      </button>
    </div>
  );
}
