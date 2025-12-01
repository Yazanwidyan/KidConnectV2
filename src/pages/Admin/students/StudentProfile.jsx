import React, { useState } from "react";
import { FaArrowLeft, FaEdit, FaUserAltSlash, FaUserSlash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

// Sample student data for demonstration
const studentsData = [
  {
    id: 1,
    active: true, // <-- student active status
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

  if (!student) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Student not found.</p>
        <Link to="/admin/students" className="text-blue-500 hover:underline">
          Back to Students
        </Link>
      </div>
    );
  }

  // Add the unlink handler:
  const handleUnlinkParent = (index) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].parents[index].linkedCode = null; // remove the linked code
    updatedStudents[studentIndex].parents[index].active = true; // optionally reactivate parent
    setStudents(updatedStudents);
    alert(`Parent ${updatedStudents[studentIndex].parents[index].parentName} unlinked!`);
  };

  const handleDeactivateStudent = () => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].active = !updatedStudents[studentIndex].active;
    setStudents(updatedStudents);
    alert(`Student ${updatedStudents[studentIndex].active ? "activated" : "deactivated"}!`);
  };

  const handleDeactivateParent = (index) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].parents[index].active = false;
    setStudents(updatedStudents);
    alert(`Parent ${updatedStudents[studentIndex].parents[index].parentName} deactivated!`);
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link to="/admin/students" className="flex items-center gap-2 text-blue-500 hover:underline">
          <FaArrowLeft /> Back to Students
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/students/edit-student/${student.id}`}
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <FaEdit /> Edit
          </Link>
          <button
            onClick={handleDeactivateStudent}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-white ${
              student.active ? "bg-red-600 hover:bg-red-700" : "cursor-not-allowed bg-gray-500"
            }`}
          >
            <FaUserAltSlash /> {student.active ? "Deactivate Student" : "Inactive"}
          </button>
        </div>
      </div>

      {/* Student Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <div className="mb-6 flex items-center gap-6">
          {student.studentPhoto && (
            <img
              src={student.studentPhoto}
              alt="Student"
              className="h-32 w-32 rounded-lg border object-cover"
            />
          )}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {student.firstName} {student.secondName} {student.thirdName} {student.lastName}
            </h2>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                student.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {student.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* PERSONAL INFO */}
        <Section title="Personal Information">
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
        </Section>

        {/* ATTACHMENTS */}
        <Section title="Attachments">
          <ul className="list-disc pl-6 text-blue-600">
            {student.attachments?.map((doc, i) => (
              <li key={i}>
                <a href={doc.file} target="_blank" className="hover:underline">
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {/* PARENTS */}
        {student.parents?.map((p, idx) => (
          <Section key={idx} title={`Parent / Guardian ${idx + 1}`}>
            <Info label="Name" value={p.parentName} />
            <Info label="Relation" value={p.parentRelation} />
            <Info label="Phone" value={p.parentPhone} />
            <Info label="Email" value={p.parentEmail} />
            {p.linkedCode ? (
              <Info label="linked Code" value={p.linkedCode} />
            ) : (
              <Info label="Invitation Code" value={p.invitationCode} />
            )}

            {p.linkedCode && (
              <>
                <Info label="Linked Code" value={p.linkedCode} />
                <div className="mt-2">
                  <button
                    onClick={() => handleUnlinkParent(idx)}
                    className="flex items-center gap-2 rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                  >
                    <FaUserSlash /> Unlink Parent
                  </button>
                </div>
              </>
            )}
            <div className="mt-2">
              <button
                onClick={() => handleDeactivateParent(idx)}
                className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                disabled={!p.active}
              >
                <FaUserSlash /> {p.active ? "Deactivate Parent" : "Inactive"}
              </button>
            </div>
          </Section>
        ))}

        {/* EMERGENCY CONTACTS */}
        {student.emergencyContacts?.map((ec, idx) => (
          <Section key={idx} title={`Emergency Contact ${idx + 1}`}>
            <Info label="Name" value={ec.name} />
            <Info label="Phone" value={ec.phone} />
            <Info label="Relation" value={ec.relation} />
          </Section>
        ))}

        {/* AUTHORIZED PICKUPS */}
        {student.authorizedPickups?.map((ap, idx) => (
          <Section key={idx} title={`Authorized Pickup ${idx + 1}`}>
            <Info label="Name" value={ap.name} />
            <Info label="Phone" value={ap.phone} />
            <Info label="ID" value={ap.id} />
            <Info label="Relation" value={ap.relation} />
          </Section>
        ))}
      </div>
    </div>
  );
};

/* --- Reusable Components --- */
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="mb-3 text-xl font-semibold text-gray-700">{title}</h3>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <span className="font-semibold text-gray-600">{label}: </span>
    <span className="text-gray-800">{value || "-"}</span>
  </div>
);

export default StudentProfile;
