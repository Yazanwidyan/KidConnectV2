import React from "react";
import { FaArrowLeft, FaDownload, FaEdit, FaPrint } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const studentsData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    class: "5th Grade",
    section: "A",
    rollNumber: "23",
    gender: "Male",
    status: "Active",

    dateOfBirth: "2012-04-15",
    nationality: "American",
    religion: "Christian",
    bloodGroup: "O+",

    email: "john.doe@example.com",
    phone: "+123456789",

    address: {
      street: "12 Baker Street",
      city: "New York",
      state: "NY",
      postal: "10001",
    },

    parent1: {
      name: "Jane Doe",
      relation: "Mother",
      phone: "+1555666777",
      occupation: "Doctor",
      email: "jane.doe@example.com",
    },

    parent2: {
      name: "Mark Doe",
      relation: "Father",
      phone: "+1999888777",
      occupation: "Engineer",
      email: "mark.doe@example.com",
    },

    emergencyContact: {
      name: "Linda Jackson",
      phone: "+1777555444",
      relation: "Aunt",
    },

    medical: {
      allergies: "Peanuts",
      conditions: "Asthma",
      doctor: "Dr. Samuel",
      doctorPhone: "+1444333222",
    },

    documents: [
      { name: "Birth Certificate", file: "/docs/birth.pdf" },
      { name: "Previous Report Card", file: "/docs/report.pdf" },
      { name: "Admission Form", file: "/docs/admission.pdf" },
    ],
  },
];

const StudentProfile = () => {
  const { id } = useParams();
  const student = studentsData.find((s) => s.id === parseInt(id));

  if (!student) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Student not found.</p>
        <Link to="/admin/students/students-list" className="text-blue-500 hover:underline">
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/admin/students/students-list"
          className="flex items-center gap-2 text-blue-500 hover:underline"
        >
          <FaArrowLeft /> Back to Students
        </Link>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
            <FaPrint /> Print
          </button>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <FaDownload /> Download PDF
          </button>
          <Link
            to={`/admin/students/edit-student/${student.id}`}
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <FaEdit /> Edit
          </Link>
        </div>
      </div>

      {/* Student Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          {student.firstName} {student.lastName}
        </h2>

        {/* PERSONAL INFO */}
        <Section title="Personal Information">
          <Info label="Full Name" value={`${student.firstName} ${student.lastName}`} />
          <Info label="Gender" value={student.gender} />
          <Info label="Date of Birth" value={student.dateOfBirth} />
          <Info label="Nationality" value={student.nationality} />
          <Info label="Religion" value={student.religion} />
          <Info label="Blood Group" value={student.bloodGroup} />
          <Info
            label="Status"
            value={
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  student.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {student.status}
              </span>
            }
          />
        </Section>

        {/* ACADEMIC INFO */}
        <Section title="Academic Information">
          <Info label="Class" value={student.class} />
          <Info label="Section" value={student.section} />
          <Info label="Roll Number" value={student.rollNumber} />
        </Section>

        {/* CONTACT */}
        <Section title="Contact Information">
          <Info label="Email" value={student.email} />
          <Info label="Phone" value={student.phone} />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <Info label="Street" value={student.address.street} />
          <Info label="City" value={student.address.city} />
          <Info label="State" value={student.address.state} />
          <Info label="Postal Code" value={student.address.postal} />
        </Section>

        {/* PARENT 1 */}
        <Section title="Parent / Guardian 1">
          <Info label="Name" value={student.parent1.name} />
          <Info label="Relation" value={student.parent1.relation} />
          <Info label="Phone" value={student.parent1.phone} />
          <Info label="Email" value={student.parent1.email} />
          <Info label="Occupation" value={student.parent1.occupation} />
        </Section>

        {/* PARENT 2 */}
        <Section title="Parent / Guardian 2">
          <Info label="Name" value={student.parent2.name} />
          <Info label="Relation" value={student.parent2.relation} />
          <Info label="Phone" value={student.parent2.phone} />
          <Info label="Email" value={student.parent2.email} />
          <Info label="Occupation" value={student.parent2.occupation} />
        </Section>

        {/* EMERGENCY */}
        <Section title="Emergency Contact">
          <Info label="Name" value={student.emergencyContact.name} />
          <Info label="Phone" value={student.emergencyContact.phone} />
          <Info label="Relation" value={student.emergencyContact.relation} />
        </Section>

        {/* MEDICAL */}
        <Section title="Medical Information">
          <Info label="Allergies" value={student.medical.allergies} />
          <Info label="Medical Conditions" value={student.medical.conditions} />
          <Info label="Doctor" value={student.medical.doctor} />
          <Info label="Doctor Phone" value={student.medical.doctorPhone} />
        </Section>

        {/* DOCUMENTS */}
        <Section title="Documents">
          <ul className="list-disc pl-6 text-blue-600">
            {student.documents.map((doc, index) => (
              <li key={index}>
                <a href={doc.file} target="_blank" className="hover:underline">
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-4">
          <button className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
            Assign to Group
          </button>
          <button className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700">
            Assign Staff
          </button>
        </div>
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
    <span className="text-gray-800">{value}</span>
  </div>
);

export default StudentProfile;
