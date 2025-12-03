// modals/AddDiscountModal.js

import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const AddDiscountModal = ({ isOpen, onClose, onAddDiscount }) => {
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [type, setType] = useState("Seasonal");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || percentage <= 0 || percentage > 100) return;

    onAddDiscount({
      id: Date.now(),
      name,
      percentage,
      type,
      active,
    });

    setName("");
    setPercentage(0);
    setType("Seasonal");
    setActive(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <FiX size={20} />
        </button>

        <h2 className="mb-4 text-xl font-semibold">Add Discount</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-gray-700">Discount Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Discount Name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-gray-700">Percentage (%) *</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              min={1}
              max={100}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-gray-700">Type *</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>Seasonal</option>
              <option>Promotional</option>
              <option>Special</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={active}
              onChange={() => setActive(!active)}
              className="h-5 w-5 text-teal-600"
            />
            <span className="text-gray-700">Active</span>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
              Add Discount
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiscountModal;
