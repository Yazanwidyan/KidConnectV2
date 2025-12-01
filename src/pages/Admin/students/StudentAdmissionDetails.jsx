import React, { useState } from "react";

const studentsData = [
  {
    id: 1,
    status: "Review", // <-- admission status
    active: true,
    studentPhoto: "/images/student1.jpg",
    firstDayAtSchool: "2023-09-01",
    firstName: "John",
    secondName: "Michael",
    thirdName: "",
    lastName: "Doe",
    governmentId: "G123456",
    nationality: "American",
    placeOfBirth: "New York",
    gender: "Male",
    dob: "2012-04-15",
    bloodGroup: "O+",
    religion: "Christianity",
    address: "123 Baker Street, New York, NY 10001",
    allergies: "Peanuts",
    medications: "Inhaler",
    nurseryNotes: "Shy at first",
    parentNotes: "Prefers morning classes",
    groupName: "KG-1",
    attachments: [
      { name: "Birth Certificate", file: "/docs/birth.pdf" },
      { name: "Admission Form", file: "/docs/admission.pdf" },
    ],
    parents: [
      {
        parentName: "Jane Doe",
        parentPhone: "+1555666777",
        parentEmail: "jane.doe@example.com",
        parentRelation: "Mother",
        linkedCode: "45723",
        active: true,
      },
      {
        parentName: "Mark Doe",
        parentPhone: "+1999888777",
        parentEmail: "mark.doe@example.com",
        parentRelation: "Father",
        invitationCode: "INV67890",
        active: false,
      },
    ],
    emergencyContacts: [
      {
        name: "Linda Jackson",
        phone: "+1777555444",
        relation: "Aunt",
      },
    ],
    authorizedPickups: [
      {
        name: "Sam Wilson",
        phone: "+1444333222",
        id: "ID123",
        relation: "Uncle",
      },
    ],
  },
];

const StudentAdmissionDetails = () => {
  const [students, setStudents] = useState(studentsData);

  const student = students[0]; // For simplicity, showing first student. In real app, select by ID.

  const updateStatus = (newStatus) => {
    const updatedStudents = students.map((s) => (s.id === student.id ? { ...s, status: newStatus } : s));
    setStudents(updatedStudents);
    alert(`Status updated to ${newStatus}`);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img src={student.studentPhoto} alt={student.firstName} className="h-24 w-24 rounded-full border" />
        <div>
          <h1 className="text-2xl font-bold">{`${student.firstName} ${student.secondName} ${student.thirdName} ${student.lastName}`}</h1>
          <p>
            Status: <strong>{student.status}</strong>
          </p>
          <p>Active: {student.active ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {/* Conditional Actions */}
        {student.status === "Review" && (
          <>
            <button
              onClick={() => updateStatus("Waitlist")}
              className="rounded bg-purple-600 px-3 py-1 text-white"
            >
              Waitlist
            </button>
            <button
              onClick={() => updateStatus("Enrolled")}
              className="rounded bg-green-600 px-3 py-1 text-white"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus("Rejected")}
              className="rounded bg-red-600 px-3 py-1 text-white"
            >
              Reject
            </button>
          </>
        )}
        {student.status === "Waitlist" && (
          <>
            <button
              onClick={() => updateStatus("Enrolled")}
              className="rounded bg-green-600 px-3 py-1 text-white"
            >
              Accept
            </button>
            <button
              onClick={() => updateStatus("Rejected")}
              className="rounded bg-red-600 px-3 py-1 text-white"
            >
              Reject
            </button>
          </>
        )}
        {student.status === "Rejected" && (
          <>
            <button
              onClick={() => updateStatus("Waitlist")}
              className="rounded bg-purple-600 px-3 py-1 text-white"
            >
              Waitlist
            </button>
            <button
              onClick={() => updateStatus("Enrolled")}
              className="rounded bg-green-600 px-3 py-1 text-white"
            >
              Accept
            </button>
          </>
        )}
        {student.status === "Enrolled" && (
          <span className="font-semibold text-green-700">No actions available</span>
        )}
      </div>

      {/* Personal Info */}
      <div className="space-y-2 rounded border p-4">
        <h2 className="text-lg font-semibold">Personal Info</h2>
        <p>
          <strong>DOB:</strong> {student.dob}
        </p>
        <p>
          <strong>Gender:</strong> {student.gender}
        </p>
        <p>
          <strong>Blood Group:</strong> {student.bloodGroup}
        </p>
        <p>
          <strong>Nationality:</strong> {student.nationality}
        </p>
        <p>
          <strong>Place of Birth:</strong> {student.placeOfBirth}
        </p>
        <p>
          <strong>Address:</strong> {student.address}
        </p>
        <p>
          <strong>Allergies:</strong> {student.allergies}
        </p>
        <p>
          <strong>Medications:</strong> {student.medications}
        </p>
        <p>
          <strong>Nursery Notes:</strong> {student.nurseryNotes}
        </p>
        <p>
          <strong>Parent Notes:</strong> {student.parentNotes}
        </p>
        <p>
          <strong>Group:</strong> {student.groupName}
        </p>
      </div>

      {/* Parents */}
      <div className="space-y-2 rounded border p-4">
        <h2 className="text-lg font-semibold">Parents</h2>
        {student.parents.map((p, index) => (
          <div key={index} className="border-b pb-2 last:border-b-0">
            <p>
              <strong>Name:</strong> {p.parentName}
            </p>
            <p>
              <strong>Relation:</strong> {p.parentRelation}
            </p>
            <p>
              <strong>Phone:</strong> {p.parentPhone}
            </p>
            <p>
              <strong>Email:</strong> {p.parentEmail}
            </p>
            {p.linkedCode && (
              <p>
                <strong>Linked Code:</strong> {p.linkedCode}
              </p>
            )}
            {p.invitationCode && (
              <p>
                <strong>Invitation Code:</strong> {p.invitationCode}
              </p>
            )}
            <p>
              <strong>Active:</strong> {p.active ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-2 rounded border p-4">
        <h2 className="text-lg font-semibold">Emergency Contacts</h2>
        {student.emergencyContacts.map((c, idx) => (
          <p key={idx}>
            {c.name} ({c.relation}) - {c.phone}
          </p>
        ))}
      </div>

      {/* Authorized Pickups */}
      <div className="space-y-2 rounded border p-4">
        <h2 className="text-lg font-semibold">Authorized Pickups</h2>
        {student.authorizedPickups.map((a, idx) => (
          <p key={idx}>
            {a.name} ({a.relation}) - {a.phone}
          </p>
        ))}
      </div>

      {/* Attachments */}
      <div className="space-y-2 rounded border p-4">
        <h2 className="text-lg font-semibold">Attachments</h2>
        {student.attachments.map((file, idx) => (
          <p key={idx}>
            <a href={file.file} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {file.name}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
};

export default StudentAdmissionDetails;
