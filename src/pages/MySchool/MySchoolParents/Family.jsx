import React, { useState } from "react";

const demoFamilies = [
  {
    id: "fam1",
    familyName: "Little Family",
    parents: [
      { id: "p1", name: "John Little", email: "john@gmail.com", phone: "777-123" },
      { id: "p2", name: "Sarah Little", email: "sarah@gmail.com", phone: "777-456" },
    ],
    students: [
      { id: "s1", name: "Jimmy Little", classRoom: "Two Year Olds", avatar: "JL" },
      { id: "s2", name: "Jenny Little", classRoom: "Three Year Olds", avatar: "JL" },
    ],
  },
  {
    id: "fam2",
    familyName: "Seahorse Family",
    parents: [{ id: "p3", name: "Mark Seahorse", email: "mark@gmail.com", phone: "555-987" }],
    students: [{ id: "s3", name: "Sally Seahorse", classRoom: "Two Year Olds", avatar: "SS" }],
  },
];

const Family = () => {
  const [families, setFamilies] = useState(demoFamilies);

  const addParent = (familyId, parent) => {
    setFamilies((prev) =>
      prev.map((f) => (f.id === familyId ? { ...f, parents: [...f.parents, parent] } : f))
    );
  };

  const addStudent = (familyId, student) => {
    setFamilies((prev) =>
      prev.map((f) => (f.id === familyId ? { ...f, students: [...f.students, student] } : f))
    );
  };

  const deleteParent = (familyId, parentId) => {
    setFamilies((prev) =>
      prev.map((f) => (f.id === familyId ? { ...f, parents: f.parents.filter((p) => p.id !== parentId) } : f))
    );
  };

  const deleteStudent = (familyId, studentId) => {
    setFamilies((prev) =>
      prev.map((f) =>
        f.id === familyId ? { ...f, students: f.students.filter((s) => s.id !== studentId) } : f
      )
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Families</h2>
        <button className="rounded-lg bg-primary px-4 py-2 text-white">+ Add New Family</button>
      </div>

      <div className="flex flex-col gap-8">
        {families.map((family) => (
          <div key={family.id} className="rounded-xl bg-white p-6 shadow">
            {/* Family Header */}
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold">{family.familyName}</h3>
              <button className="text-sm text-red-500 underline">Delete Family</button>
            </div>

            {/* Parents Section */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-lg font-semibold">Parents</h4>
                <button className="text-sm text-blue-500 underline">+ Add Parent</button>
              </div>

              <div className="flex flex-col gap-3">
                {family.parents.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-xs text-gray-500">{p.email}</span>
                      <span className="text-xs text-gray-500">{p.phone}</span>
                    </div>

                    <div className="flex gap-3">
                      <button className="text-sm text-blue-500 underline">Edit</button>
                      <button
                        className="text-sm text-red-500 underline"
                        onClick={() => deleteParent(family.id, p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Students Section */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-lg font-semibold">Students</h4>
                <button className="text-sm text-blue-500 underline">+ Add Student</button>
              </div>

              <div className="flex flex-col gap-3">
                {family.students.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                    {/* Avatar + Info */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm">
                        {s.avatar}
                      </div>
                      <div>
                        <span className="font-medium">{s.name}</span>
                        <div className="text-xs text-gray-500">{s.classRoom}</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="text-sm text-blue-500 underline">Edit</button>
                      <button
                        className="text-sm text-red-500 underline"
                        onClick={() => deleteStudent(family.id, s.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Family;
