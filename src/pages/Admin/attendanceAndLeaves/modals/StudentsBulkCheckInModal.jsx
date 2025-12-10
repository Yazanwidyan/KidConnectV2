import React, { useState } from "react";

const BulkCheckInModal = ({ isOpen, onClose, onSubmit }) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Record Check In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Select Time */}
        <div className="mb-4">
          <label className="mb-1 block text-gray-700">Select Time</label>
          <div className="flex items-center justify-between gap-3">
            {/* Hour */}
            <input
              type="number"
              min="1"
              max="12"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="flex h-16 w-full items-center justify-center rounded-lg bg-gray-100 text-center text-3xl font-semibold shadow-inner outline-none"
              placeholder="HH"
            />

            <span className="text-3xl font-bold">:</span>

            {/* Minute */}
            <input
              type="number"
              min="0"
              max="59"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="flex h-16 w-full items-center justify-center rounded-lg bg-gray-100 text-center text-3xl font-semibold shadow-inner outline-none"
              placeholder="MM"
            />

            {/* AM/PM */}
            <select
              value={ampm}
              onChange={(e) => setAmpm(e.target.value)}
              className="flex h-16 w-20 items-center justify-center rounded-lg bg-gray-100 text-center text-xl font-semibold shadow-inner outline-none"
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </div>

        {/* Group */}
        <div className="mb-4">
          <label className="mb-1 block text-gray-700">Group</label>
          <select className="w-full rounded-lg border px-3 py-2">
            <option>Select a group</option>
            <option>group A</option>
            <option>group B</option>
            <option>group C</option>
          </select>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="mb-1 block text-gray-700">Notes</label>
          <textarea
            className="w-full rounded-lg border px-3 py-2"
            rows={3}
            placeholder="Input Notes"
          ></textarea>
        </div>

        {/* Notify Teacher */}
        <div className="mb-4">
          <label className="mb-1 block text-gray-700">Notify Teacher</label>
          <input type="text" className="w-full rounded-lg border px-3 py-2" />
        </div>

        {/* Checkboxes */}
        <div className="mb-6 flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-gray-700">Late Check-in</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-gray-700">Send Notification to parent</span>
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={() => onSubmit({ hour, minute, ampm })}
          className="w-full rounded-lg bg-[#1F8DB3] py-3 font-semibold text-white hover:bg-[#18789a]"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default BulkCheckInModal;
