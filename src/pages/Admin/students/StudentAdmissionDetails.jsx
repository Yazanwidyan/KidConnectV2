import React, { useState } from "react";

const studentsData = [
  {
    id: 1,
    status: "Review",
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
    emergencyContacts: [{ name: "Linda Jackson", phone: "+1777555444", relation: "Aunt" }],
    authorizedPickups: [{ name: "Sam Wilson", phone: "+1444333222", id: "ID123", relation: "Uncle" }],
  },
];

const Card = ({ title, children }) => (
  <div className="rounded-lg bg-white p-6 shadow-lg">
    <h2 className="mb-4 text-xl font-bold text-gray-800">{title}</h2>
    <div className="space-y-2 text-gray-700">{children}</div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2 last:border-none">
    <span className="font-semibold text-gray-600">{label}</span>
    <span>{value}</span>
  </div>
);

const StudentAdmissionDetails = () => {
  const [students, setStudents] = useState(studentsData);
  const student = students[0];

  const updateStatus = (newStatus) => {
    const updated = students.map((s) => (s.id === student.id ? { ...s, status: newStatus } : s));
    setStudents(updated);
    alert(`Status updated to ${newStatus}`);
  };

  return (
    <div className="mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-6 rounded-lg bg-white p-6 shadow-lg">
        <img
          src={student.studentPhoto}
          alt={student.firstName}
          className="h-28 w-28 rounded-full border shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {student.firstName} {student.secondName} {student.thirdName} {student.lastName}
          </h1>
          <p className="text-gray-700">
            Status: <strong>{student.status}</strong>
          </p>
          <p className="text-gray-700">Active: {student.active ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Status Actions */}
      <div className="flex flex-wrap gap-3">
        {student.status === "Review" && (
          <>
            <button
              onClick={() => updateStatus("Waitlist")}
              className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
            >
              Waitlist
            </button>
            <button
              onClick={() => updateStatus("Enrolled")}
              className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus("Rejected")}
              className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
            >
              Reject
            </button>
          </>
        )}
        {student.status === "Waitlist" && (
          <>
            <button
              onClick={() => updateStatus("Enrolled")}
              className="rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg"
            >
              Accept
            </button>
            <button
              onClick={() => updateStatus("Rejected")}
              className="rounded-lg bg-red-600 px-4 py-2 text-white shadow-lg"
            >
              Reject
            </button>
          </>
        )}
        {student.status === "Rejected" && (
          <>
            <button
              onClick={() => updateStatus("Waitlist")}
              className="rounded-lg bg-purple-600 px-4 py-2 text-white shadow-lg"
            >
              Waitlist
            </button>
            <button
              onClick={() => updateStatus("Enrolled")}
              className="rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg"
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
      <Card title="Personal Information">
        <Row label="DOB" value={student.dob} />
        <Row label="Gender" value={student.gender} />
        <Row label="Blood Group" value={student.bloodGroup} />
        <Row label="Nationality" value={student.nationality} />
        <Row label="Place of Birth" value={student.placeOfBirth} />
        <Row label="Address" value={student.address} />
        <Row label="Allergies" value={student.allergies} />
        <Row label="Medications" value={student.medications} />
        <Row label="Nursery Notes" value={student.nurseryNotes} />
        <Row label="Parent Notes" value={student.parentNotes} />
        <Row label="Group" value={student.groupName} />
      </Card>

      {/* Parents */}
      <Card title="Parents">
        {student.parents.map((p, i) => (
          <div key={i} className="rounded-lg bg-gray-50 p-3 shadow-lg">
            <Row label="Name" value={p.parentName} />
            <Row label="Relation" value={p.parentRelation} />
            <Row label="Phone" value={p.parentPhone} />
            <Row label="Email" value={p.parentEmail} />
            {p.linkedCode && <Row label="Linked Code" value={p.linkedCode} />}
            {p.invitationCode && <Row label="Invitation Code" value={p.invitationCode} />}
            <Row label="Active" value={p.active ? "Yes" : "No"} />
          </div>
        ))}
      </Card>

      {/* Emergency Contacts */}
      <Card title="Emergency Contacts">
        {student.emergencyContacts.map((c, i) => (
          <Row key={i} label={`${c.name} (${c.relation})`} value={c.phone} />
        ))}
      </Card>

      {/* Authorized Pickups */}
      <Card title="Authorized Pickups">
        {student.authorizedPickups.map((a, i) => (
          <Row key={i} label={`${a.name} (${a.relation})`} value={a.phone} />
        ))}
      </Card>

      {/* Attachments */}
      <Card title="Attachments">
        {student.attachments.map((f, i) => (
          <a key={i} href={f.file} target="_blank" rel="noreferrer" className="block text-blue-600 underline">
            {f.name}
          </a>
        ))}
      </Card>
    </div>
  );
};

export default StudentAdmissionDetails;
