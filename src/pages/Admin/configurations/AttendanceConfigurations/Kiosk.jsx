// Kiosk.js

import { UserPlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Kiosk = () => {
  const [qrRefresh, setQrRefresh] = useState(false);
  const [refreshRate, setRefreshRate] = useState(30); // in seconds
  const [allowDownload, setAllowDownload] = useState(false);

  const handleViewQrCode = () => {
    alert("QR Code Preview (replace with actual QR code component)");
  };

  const handleSave = () => {
    const settings = {
      qrRefresh,
      refreshRate,
      allowDownload,
    };
    console.log("Kiosk settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen space-y-6 bg-secondary p-6">
      <h1 className="text-2xl font-bold text-gray-800">Kiosk Settings</h1>
      <div className="mb-6 space-y-6 rounded-lg bg-white p-6 shadow-lg">
        {/* QR Code Refresh */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={qrRefresh}
            onChange={() => setQrRefresh(!qrRefresh)}
            className="h-5 w-5 text-teal-600"
            id="qrRefresh"
          />
          <label htmlFor="qrRefresh" className="font-medium text-gray-700">
            QR Code Refresh
          </label>
        </div>

        {/* QR Code Refresh Rate */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">QR Code Refresh Rate (seconds)</label>
          <input
            type="number"
            value={refreshRate}
            onChange={(e) => setRefreshRate(Number(e.target.value))}
            disabled={!qrRefresh}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              !qrRefresh ? "cursor-not-allowed bg-gray-100" : ""
            }`}
            min={1}
          />
        </div>

        {/* Allow QR Code Download */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allowDownload}
            onChange={() => setAllowDownload(!allowDownload)}
            className="h-5 w-5 text-teal-600"
            id="allowDownload"
          />
          <label htmlFor="allowDownload" className="font-medium text-gray-700">
            Allow QR Code Download
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={handleViewQrCode}
            className="flex flex-1 items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
          >
            View QR Code
          </button>
          <button
            onClick={handleSave}
            className="flex flex-1 items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kiosk;
