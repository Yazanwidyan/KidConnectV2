import React from "react";

// Sample data
const documentsData = [
  {
    name: "Enrollment Form",
    type: "PDF",
    added: "2025-10-20",
    sharedWith: "Parent - Adam Smith",
  },
  {
    name: "Medical Record",
    type: "Image",
    added: "2025-10-22",
    sharedWith: "Parent - Emma Johnson",
  },
];

const Documents = () => {
  return (
    <div className="p-6 font-sans">
      <h2 className="mb-4 text-2xl font-semibold">Documents</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-2 text-left">Document Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Added</th>
              <th className="px-4 py-2 text-left">Shared With</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentsData.map((doc, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-2">{doc.name}</td>
                <td className="px-4 py-2">{doc.type}</td>
                <td className="px-4 py-2">{doc.added}</td>
                <td className="px-4 py-2">{doc.sharedWith}</td>
                <td className="space-x-2 px-4 py-2">
                  <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">View</button>
                  <button className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
