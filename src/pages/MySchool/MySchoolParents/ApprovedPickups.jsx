import React, { useState } from "react";

const demoPickups = [
  {
    id: "1",
    studentName: "Jimmy Little",
    studentAvatar: "JL",
    classRoom: "Two Year Olds",
    pickupName: "Aunt Mary",
    relation: "Aunt",
    phone: "777-900",
    approved: true,
  },
  {
    id: "2",
    studentName: "Sally Seahorse",
    studentAvatar: "SS",
    classRoom: "Two Year Olds",
    pickupName: "Uncle Sam",
    relation: "Uncle",
    phone: "777-222",
    approved: true,
  },
];

const ApprovedPickups = () => {
  const [pickups, setPickups] = useState(demoPickups);

  const deletePickup = (id) => {
    setPickups((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Approved Pickups</h2>

        <button className="rounded-lg bg-primary px-4 py-2 text-white">+ Add Approved Pickup</button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 border-b pb-3 font-semibold text-gray-600">
        <div>STUDENT</div>
        <div>PICKUP PERSON</div>
        <div>RELATION</div>
        <div>PHONE</div>
        <div className="text-center">STATUS</div>
        <div className="text-center">ACTIONS</div>
      </div>

      {/* Rows */}
      <div className="mt-4 flex flex-col gap-4">
        {pickups.map((p) => (
          <div key={p.id} className="grid grid-cols-6 items-center rounded-lg bg-white p-4 shadow">
            {/* Student */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                {p.studentAvatar}
              </div>
              <div>
                <div className="font-medium">{p.studentName}</div>
                <div className="text-xs text-gray-500">{p.classRoom}</div>
              </div>
            </div>

            {/* Pickup Person */}
            <div className="font-medium">{p.pickupName}</div>

            {/* Relation */}
            <div>{p.relation}</div>

            {/* Phone */}
            <div>{p.phone}</div>

            {/* Status */}
            <div className="text-center">
              {p.approved ? (
                <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">Approved</span>
              ) : (
                <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-700">Pending</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 text-sm">
              <button className="text-blue-500 underline">Edit</button>
              <button className="text-red-500 underline" onClick={() => deletePickup(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {pickups.length === 0 && (
          <div className="rounded-lg bg-gray-50 p-6 text-center text-gray-400">
            No approved pickups added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedPickups;
