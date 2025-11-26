import React from "react";

export default function Learning() {
  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Learning</h1>

      {/* Description */}
      <p className="mb-6 text-gray-600">
        Track curriculum progress, milestones, learning domains, and student development.
      </p>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-2 font-semibold text-gray-700">Milestones</h2>
          <p className="text-sm text-gray-500">Developmental and academic milestones.</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-2 font-semibold text-gray-700">Curriculum</h2>
          <p className="text-sm text-gray-500">Weekly and monthly topics, plans, and activities.</p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-2 font-semibold text-gray-700">Assessment</h2>
          <p className="text-sm text-gray-500">Observations, goals, and performance indicators.</p>
        </div>
      </div>
    </div>
  );
}
