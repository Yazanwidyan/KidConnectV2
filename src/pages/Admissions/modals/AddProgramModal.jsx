import React, { useState } from "react";

import { useAdmissions } from "../../../context/AdmissionsContext";

const AddProgramModal = ({ onClose }) => {
  const { addProgram } = useAdmissions(); // Use addProgram here, NOT updateProgram

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxCapacity: "",
    minAge: "",
    maxAge: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name) return alert("Program name is required.");

    const newProgram = {
      ...formData,
      // Generate id based on timestamp or UUID for uniqueness
      id: `prog${Date.now()}`,
      maxCapacity: Number(formData.maxCapacity) || undefined,
      minAge: Number(formData.minAge) || undefined,
      maxAge: Number(formData.maxAge) || undefined,
    };

    addProgram(newProgram); // Correct usage here
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Add New Program</h2>

        {/* FORM */}
        <div className="space-y-4">
          {/* Program Name */}
          <input
            type="text"
            name="name"
            placeholder="Program Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Program Description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded border px-3 py-2"
          ></textarea>

          {/* Max Capacity */}
          <input
            type="number"
            name="maxCapacity"
            placeholder="Max Capacity"
            value={formData.maxCapacity}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />

          {/* Min / Max Age */}
          <div className="flex gap-3">
            <input
              type="number"
              name="minAge"
              placeholder="Min Age"
              value={formData.minAge}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
            <input
              type="number"
              name="maxAge"
              placeholder="Max Age"
              value={formData.maxAge}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {/* Start / End Date */}
          <div className="flex gap-3">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProgramModal;
