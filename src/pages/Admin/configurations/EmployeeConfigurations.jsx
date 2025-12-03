import React, { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import EmployeeDocumentModal from "./modals/EmployeeDocumentModal";

const initialDocuments = [
  {
    id: 1,
    enabled: true,
    nameEn: "Passport",
    nameAr: "جواز السفر",
    mandatory: true,
    hasExpiry: true,
    notifyBefore: 30,
  },
  {
    id: 2,
    enabled: true,
    nameEn: "Government ID",
    nameAr: "الهوية الحكومية",
    mandatory: true,
    hasExpiry: true,
    notifyBefore: 45,
  },
  {
    id: 3,
    enabled: false,
    nameEn: "Residency",
    nameAr: "الإقامة",
    mandatory: false,
    hasExpiry: true,
    notifyBefore: 60,
  },
  {
    id: 4,
    enabled: false,
    nameEn: "Driver License",
    nameAr: "رخصة القيادة",
    mandatory: false,
    hasExpiry: true,
    notifyBefore: 15,
  },
];

const EmployeeConfigurations = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDocument, setEditDocument] = useState(null);

  const handleAddDocument = (newDoc) => {
    setDocuments((prev) => [...prev, { id: Date.now(), ...newDoc }]);
  };

  const handleUpdate = (updated) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === updated.id ? updated : doc)));
  };

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="w-full space-y-8 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-xl font-semibold text-gray-800">Employee Document Settings</h1>

      {/* Table */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Employee Documents</h2>

          <button
            onClick={() => {
              setEditDocument(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            <FiPlus /> Add Document
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-3">Enabled</th>
                <th className="px-4 py-3">Name (English)</th>
                <th className="px-4 py-3">Name (Arabic)</th>
                <th className="px-4 py-3">Mandatory</th>
                <th className="px-4 py-3">Has Expiry</th>
                <th className="px-4 py-3">Notify Before (days)</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={doc.enabled}
                      onChange={() =>
                        setDocuments((prev) =>
                          prev.map((d) => (d.id === doc.id ? { ...d, enabled: !d.enabled } : d))
                        )
                      }
                      className="h-5 w-5 text-teal-600"
                    />
                  </td>

                  <td className="px-4 py-3">{doc.nameEn}</td>
                  <td className="px-4 py-3">{doc.nameAr}</td>

                  <td className="px-4 py-3">{doc.mandatory ? "Yes" : "No"}</td>

                  <td className="px-4 py-3">{doc.hasExpiry ? "Yes" : "No"}</td>

                  <td className="px-4 py-3">{doc.notifyBefore}</td>

                  <td className="flex items-center gap-3 px-4 py-3">
                    <button
                      onClick={() => {
                        setEditDocument(doc);
                        setModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit />
                    </button>

                    <button onClick={() => handleDelete(doc.id)} className="text-red-600 hover:text-red-800">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <EmployeeDocumentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddDocument}
        onUpdate={handleUpdate}
        editData={editDocument}
      />
    </div>
  );
};

export default EmployeeConfigurations;
