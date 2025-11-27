import React from "react";
import { FaArrowLeft, FaEdit, FaEnvelope, FaPhoneAlt, FaUserTie } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

// Sample employee data (replace with API call)
const employeesData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Williams",
    role: "Mathematics Teacher",
    department: "Academics",
    status: "Active",
    dateOfBirth: "1985-09-15",
    gender: "Male",

    // Contact
    phone: "+123456789",
    email: "john.williams@example.com",

    // Employment
    employeeId: "EMP-2024-001",
    joiningDate: "2020-08-15",
    contractType: "Full-Time",
    salary: 3200,

    // Emergency
    emergencyContact: {
      name: "Linda Williams",
      relation: "Wife",
      phone: "+123987654",
    },

    // Documents
    documents: [
      { name: "National ID", file: "#" },
      { name: "Contract", file: "#" },
      { name: "Resume", file: "#" },
    ],
  },
];

const EmployeeProfile = () => {
  const { id } = useParams();
  const employee = employeesData.find((emp) => emp.id === parseInt(id));

  if (!employee) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Employee not found.</p>
        <Link to="/admin/employees/employees-list" className="text-blue-500 hover:underline">
          Back to Employees
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/admin/employees/employees-list"
          className="flex items-center gap-2 text-blue-500 hover:underline"
        >
          <FaArrowLeft /> Back to Employees
        </Link>

        <Link
          to={`/admin/employees/edit/${employee.id}`}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FaEdit /> Edit Employee
        </Link>
      </div>

      {/* Top Card */}
      <div className="mb-6 flex flex-col items-start gap-6 rounded-lg border bg-white p-6 shadow md:flex-row md:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-4xl text-gray-600">
          <FaUserTie />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {employee.firstName} {employee.lastName}
          </h2>
          <p className="text-gray-600">{employee.role}</p>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              employee.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {employee.status}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Info */}
        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">Personal Information</h3>

          <div className="space-y-2">
            <p>
              <strong>Gender:</strong> {employee.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {employee.dateOfBirth}
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> {employee.phone}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope /> {employee.email}
            </p>
          </div>
        </div>

        {/* Employment Info */}
        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">Employment Details</h3>

          <div className="space-y-2">
            <p>
              <strong>Employee ID:</strong> {employee.employeeId}
            </p>
            <p>
              <strong>Department:</strong> {employee.department}
            </p>
            <p>
              <strong>Contract Type:</strong> {employee.contractType}
            </p>
            <p>
              <strong>Joining Date:</strong> {employee.joiningDate}
            </p>
            <p>
              <strong>Salary:</strong> ${employee.salary}
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">Emergency Contact</h3>
          <p>
            <strong>Name:</strong> {employee.emergencyContact.name}
          </p>
          <p>
            <strong>Relation:</strong> {employee.emergencyContact.relation}
          </p>
          <p>
            <strong>Phone:</strong> {employee.emergencyContact.phone}
          </p>
        </div>

        {/* Documents */}
        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">Documents</h3>

          <ul className="list-disc pl-5">
            {employee.documents.map((doc, index) => (
              <li key={index}>
                <a href={doc.file} className="text-blue-600 hover:underline">
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">Send Message</button>
        <button className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
          Assign to Group
        </button>
        <button className="rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700">
          View Attendance
        </button>
        <button className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          View Payroll
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfile;
