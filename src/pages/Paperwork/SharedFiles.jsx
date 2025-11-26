import React from "react";

import { usePaperwork } from "../../context/PaperworkContext";

export default function SharedFiles() {
  const { sharedFiles } = usePaperwork();

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Shared Files</h2>
      <p className="mb-6 text-gray-600">
        Access and manage shared documents for students, staff, and the school.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {sharedFiles.map((file) => (
          <div key={file.id} className="rounded-lg bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold text-gray-700">{file.category}</h3>
            <p className="text-sm text-gray-500">{file.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
