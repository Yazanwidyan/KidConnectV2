import React, { useState } from "react";

import { useAdmissions } from "../../context/AdmissionsContext";
import AddProgramModal from "./modals/AddProgramModal";

const AdmissionsPrograms = () => {
  const { programs } = useAdmissions();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admissions Programs</h1>

        <button
          onClick={() => setShowModal(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Program
        </button>
      </div>

      {/* Programs Table */}
      {programs.length === 0 ? (
        <p className="text-gray-500">No programs available.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Max Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Min Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Max Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {program.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {program.description || "—"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {program.maxCapacity || "—"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {program.minAge || "—"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {program.maxAge || "—"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {program.startDate || "—"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {program.endDate || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && <AddProgramModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdmissionsPrograms;
