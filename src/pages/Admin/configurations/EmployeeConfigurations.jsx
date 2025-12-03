import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
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
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-primaryFont mb-1 text-2xl font-bold">Employee Document Settings</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center gap-1 font-semibold text-black">
                  <ClipboardDocumentListIcon className="h-4 w-4 stroke-[2]" /> <h5>Configurations</h5>
                </div>
              </li>
              <span>/</span>
              <li aria-current="page">
                <span className="font-semibold text-primary">Employee Document Settings</span>
              </li>
            </ol>
          </nav>
        </div>

        <button
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
          onClick={() => {
            setEditDocument(null);
            setModalOpen(true);
          }}
        >
          <FiPlus /> Add Document
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
          <thead>
            <tr>
              {[
                "#",
                "Enabled",
                "Name (EN)",
                "Name (AR)",
                "Mandatory",
                "Has Expiry",
                "Notify Before (days)",
                "Actions",
              ].map((col) => (
                <th key={col} className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-dashed divide-gray-400/60">
            {documents.map((doc, index) => (
              <tr key={doc.id} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                <td className="px-6 py-3 font-normal text-gray-700">{index + 1}</td>
                <td className="px-6 py-3">
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
                <td className="px-6 py-3 font-normal text-gray-700">{doc.nameEn}</td>
                <td className="px-6 py-3 font-normal text-gray-700">{doc.nameAr}</td>
                <td className="px-6 py-3 font-normal text-gray-700">{doc.mandatory ? "Yes" : "No"}</td>
                <td className="px-6 py-3 font-normal text-gray-700">{doc.hasExpiry ? "Yes" : "No"}</td>
                <td className="px-6 py-3 font-normal text-gray-700">{doc.notifyBefore}</td>
                <td className="flex gap-2 px-6 py-3">
                  <button
                    onClick={() => {
                      setEditDocument(doc);
                      setModalOpen(true);
                    }}
                    className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between px-6 py-3">
          <div>{documents.length} Total Records</div>
          <div className="flex gap-2">
            <button className="rounded border px-3 py-1">{"<"}</button>
            <button className="rounded border bg-teal-600 px-3 py-1 text-white">1</button>
            <button className="rounded border px-3 py-1">{">"}</button>
          </div>
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
