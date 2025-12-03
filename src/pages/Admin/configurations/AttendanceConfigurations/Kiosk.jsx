// Kiosk.js

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
    <div className="w-full space-y-6 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-xl font-semibold text-gray-800">Kiosk Settings</h1>

      {/* QR Code Refresh */}
      <div className="flex items-center gap-2">
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
      <div>
        <label className="mb-1 block font-medium text-gray-700">QR Code Refresh Rate (seconds)</label>
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
      <div className="flex items-center gap-2">
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
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleViewQrCode}
          className="w-full rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 sm:flex-1"
        >
          View QR Code
        </button>
        <button
          onClick={handleSave}
          className="w-full rounded-lg border border-teal-600 px-4 py-2 text-teal-600 hover:bg-teal-50 sm:flex-1"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Kiosk;
