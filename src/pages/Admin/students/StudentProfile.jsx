// FULL UPDATED STUDENT PROFILE WITH CARD LAYOUT

import { UserGroupIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FaArrowLeft, FaEdit, FaUserAltSlash, FaUserSlash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

// --- Sample student data ---
const studentsData = [
  {
    id: 1,
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

const StudentProfile = () => {
  const { id } = useParams();
  const [students, setStudents] = useState(studentsData);
  const studentIndex = students.findIndex((s) => s.id === parseInt(id));
  const student = students[studentIndex];

  if (!student) return <div className="p-6">Student not found</div>;

  const handleUnlinkParent = (index) => {
    const updated = [...students];
    updated[studentIndex].parents[index].linkedCode = null;
    updated[studentIndex].parents[index].active = true;
    setStudents(updated);
    alert("Parent unlinked!");
  };

  const handleDeactivateStudent = () => {
    const updated = [...students];
    updated[studentIndex].active = !updated[studentIndex].active;
    setStudents(updated);
    alert(updated[studentIndex].active ? "Student activated" : "Student deactivated");
  };

  const handleDeactivateParent = (index) => {
    const updated = [...students];
    updated[studentIndex].parents[index].active = false;
    setStudents(updated);
    alert("Parent deactivated");
  };

  return (
    <div className="w-full space-y-6 p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-primaryFont">
            {" "}
            {student.firstName} {student.secondName} {student.thirdName} {student.lastName}
          </h1>
          <Link
            to="/admin/students"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <FaArrowLeft /> Back to Students
          </Link>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            to={`/admin/students/edit-student/${student.id}`}
            className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
          >
            <FaEdit /> Edit
          </Link>

          <button
            onClick={handleDeactivateStudent}
            className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
          >
            <FaUserAltSlash /> {student.active ? "Deactivate" : "Inactive"}
          </button>
        </div>
      </div>

      {/* Student Main Card */}
      <div className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-lg sm:flex-row">
        {student.studentPhoto && (
          <img
            src={student.studentPhoto}
            alt="Student"
            className="h-32 w-32 rounded-xl object-cover shadow"
          />
        )}

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {student.firstName} {student.secondName} {student.thirdName} {student.lastName}
          </h2>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              student.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {student.active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Cards */}
      <Card title="Personal Information">
        <Info label="First Day at School" value={student.firstDayAtSchool} />
        <Info label="Government ID" value={student.governmentId} />
        <Info label="Nationality" value={student.nationality} />
        <Info label="Place of Birth" value={student.placeOfBirth} />
        <Info label="Gender" value={student.gender} />
        <Info label="Date of Birth" value={student.dob} />
        <Info label="Blood Group" value={student.bloodGroup} />
        <Info label="Religion" value={student.religion} />
        <Info label="Address" value={student.address} />
        <Info label="Allergies" value={student.allergies} />
        <Info label="Medications" value={student.medications} />
        <Info label="Nursery Notes" value={student.nurseryNotes} />
        <Info label="Parent Notes" value={student.parentNotes} />
        <Info label="Group Name" value={student.groupName} />
      </Card>

      <Card title="Attachments">
        <ul className="list-disc pl-6 text-blue-600">
          {student.attachments?.map((doc, i) => (
            <li key={i}>
              <a href={doc.file} target="_blank" className="hover:underline">
                {doc.name}
              </a>
            </li>
          ))}
        </ul>
      </Card>

      {student.parents?.map((p, idx) => (
        <Card key={idx} title={`Parent / Guardian ${idx + 1}`}>
          <Info label="Name" value={p.parentName} />
          <Info label="Relation" value={p.parentRelation} />
          <Info label="Phone" value={p.parentPhone} />
          <Info label="Email" value={p.parentEmail} />

          {p.linkedCode ? (
            <Info label="Linked Code" value={p.linkedCode} />
          ) : (
            <Info label="Invitation Code" value={p.invitationCode} />
          )}

          {p.linkedCode && (
            <button
              onClick={() => handleUnlinkParent(idx)}
              className="mt-3 flex items-center gap-2 rounded-xl bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
            >
              <FaUserSlash /> Unlink Parent
            </button>
          )}

          <button
            onClick={() => handleDeactivateParent(idx)}
            className="mt-3 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:bg-gray-400"
            disabled={!p.active}
          >
            <FaUserSlash /> {p.active ? "Deactivate" : "Inactive"}
          </button>
        </Card>
      ))}

      {student.emergencyContacts?.map((ec, idx) => (
        <Card key={idx} title={`Emergency Contact ${idx + 1}`}>
          <Info label="Name" value={ec.name} />
          <Info label="Phone" value={ec.phone} />
          <Info label="Relation" value={ec.relation} />
        </Card>
      ))}

      {student.authorizedPickups?.map((ap, idx) => (
        <Card key={idx} title={`Authorized Pickup ${idx + 1}`}>
          <Info label="Name" value={ap.name} />
          <Info label="Phone" value={ap.phone} />
          <Info label="ID" value={ap.id} />
          <Info label="Relation" value={ap.relation} />
        </Card>
      ))}
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="space-y-4 rounded-lg bg-white p-6 shadow">
    <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value || "-"}</p>
  </div>
);

export default StudentProfile;
