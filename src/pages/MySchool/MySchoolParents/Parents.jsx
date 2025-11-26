import React, { useState } from "react";

import AddParentModal from "./modals/AddParentModal";
import BulkInviteModal from "./modals/BulkInviteModal";
import ConfirmModal from "./modals/ConfirmModal";
import EditParentModal from "./modals/EditParentModal";

const demoParents = [
  {
    id: "1",
    studentName: "Jimmy Little",
    studentAvatar: "JL",
    classRoom: "Two Year Olds",
    parentName: "",
    email: "",
    phone: "",
    signedUp: false,
    billPayEnabled: false,
    autoPayEnabled: false,
    checkInCode: "",
  },
  {
    id: "2",
    studentName: "Sally Seahorse",
    studentAvatar: "SS",
    classRoom: "Two Year Olds",
    parentName: "",
    email: "",
    phone: "",
    signedUp: false,
    billPayEnabled: false,
    autoPayEnabled: false,
    checkInCode: "",
  },
];

const Parents = () => {
  const [parents, setParents] = useState(demoParents);
  const [modal, setModal] = useState({ add: false, edit: false, bulk: false, confirm: false });
  const [selectedParent, setSelectedParent] = useState(null);

  // Single Parent Actions
  const handleAddParent = (parent) => {
    setParents(parents.map((p) => (p.id === selectedParent.id ? { ...p, ...parent } : p)));
    setModal({ ...modal, add: false });
    setSelectedParent(null);
  };

  const handleEditParent = (updatedParent) => {
    setParents(parents.map((p) => (p.id === updatedParent.id ? updatedParent : p)));
    setModal({ ...modal, edit: false });
    setSelectedParent(null);
  };

  const handleDeleteParent = (parentId) => {
    setParents(parents.map((p) => (p.id === parentId ? { ...p, parentName: "", email: "", phone: "" } : p)));
    setModal({ ...modal, confirm: false });
    setSelectedParent(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Parent List</h2>
        <button
          onClick={() => setModal({ ...modal, bulk: true })}
          className="rounded-lg bg-primary px-4 py-2 text-white"
        >
          + Bulk add parents
        </button>
      </div>

      {/* Table Header */}
      <div className="mt-8 grid grid-cols-6 border-b pb-3 font-semibold text-gray-600">
        <div>STUDENT</div>
        <div>PARENTS</div>
        <div className="text-center">SIGNED UP</div>
        <div className="text-center">BILL PAY</div>
        <div className="text-center">AUTOPAY</div>
        <div className="text-center">CHECK-IN CODE</div>
      </div>

      {/* Table Rows */}
      <div className="mt-4 flex flex-col gap-4">
        {parents.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
            {/* Student */}
            <div className="flex w-1/6 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm">
                {p.studentAvatar}
              </div>
              <div>
                <p className="font-medium">{p.studentName}</p>
                <p className="text-xs text-gray-500">{p.classRoom}</p>
              </div>
            </div>

            {/* Parent Column */}
            <div className="w-1/6">
              {p.parentName ? (
                <div className="flex items-center gap-2">
                  <span>{p.parentName}</span>
                  <button
                    className="text-xs text-blue-500 underline"
                    onClick={() => {
                      setSelectedParent(p);
                      setModal({ ...modal, edit: true });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs text-red-500 underline"
                    onClick={() => {
                      setSelectedParent(p);
                      setModal({ ...modal, confirm: true });
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className="rounded-lg border px-3 py-1 text-xs"
                  onClick={() => {
                    setSelectedParent(p);
                    setModal({ ...modal, add: true });
                  }}
                >
                  Add parent
                </button>
              )}
            </div>

            {/* Other Columns */}
            <div className="w-1/6 text-center">{p.signedUp ? "✅" : "—"}</div>
            <div className="w-1/6 text-center">{p.billPayEnabled ? "✅" : "—"}</div>
            <div className="w-1/6 text-center">{p.autoPayEnabled ? "✅" : "—"}</div>
            <div className="w-1/6 text-center">{p.checkInCode || "—"}</div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {modal.add && selectedParent && (
        <AddParentModal onClose={() => setModal({ ...modal, add: false })} onAdd={handleAddParent} />
      )}
      {modal.edit && selectedParent && (
        <EditParentModal
          parent={selectedParent}
          onClose={() => setModal({ ...modal, edit: false })}
          onEdit={handleEditParent}
        />
      )}
      {modal.bulk && <BulkInviteModal onClose={() => setModal({ ...modal, bulk: false })} />}
      {modal.confirm && selectedParent && (
        <ConfirmModal
          title="Delete Parent?"
          message={`Are you sure you want to remove ${selectedParent.parentName}?`}
          onConfirm={() => handleDeleteParent(selectedParent.id)}
          onClose={() => setModal({ ...modal, confirm: false })}
        />
      )}
    </div>
  );
};

export default Parents;
