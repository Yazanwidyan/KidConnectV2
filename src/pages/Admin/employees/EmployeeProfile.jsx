import React from "react";

const EmployeeProfile = () => {
  // LOCAL EMPLOYEE DATA — NO PROPS USED
  const employee = {
    photo: null,
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
    employeeId: "EMP-001",
    nativeName: "ジョン",
    invitationCode: "VB5293n",
    linkedCode: "212124",
    nationality: "Filipino",
    email: "john@example.com",
    phone: "+63 987 654 3210",
    governmentId: "1234-5678-9000",
    dateOfBirth: "1990-05-20",
    passportNumber: "PA1234567",
    maritalStatus: "Single",
    gender: "Male",
    address: "123 Makati, Philippines",
    notes: "Strong performer",
    employeeTitle: "Software Developer",
    department: "Engineering",
    role: "Employee",
    roles: ["Developer", "Front-end"],
    groups: ["Team Alpha", "Sprint Group"],
    status: "Active",

    contractType: "Full-Time",
    monthlySalary: "180000",
    currency: "JPY",
    residentStartDate: "2024-01-01",
    probationEndDate: "2024-04-01",
    contractEndDate: "2025-01-01",
    lastDayOfWork: "",
    contractNotes: "Renew expected",

    allergies: "None",
    medications: "None",

    emergencyContactName: "Jane Doe",
    emergencyContactRelation: "Sister",
    emergencyContactPhone: "+63 912 345 6789",

    documents: [
      { type: "ID Picture", file: null },
      { type: "Passport", file: null },
    ],
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-6">
        <img
          src={employee.photo ? URL.createObjectURL(employee.photo) : "/placeholder.png"}
          alt="Employee"
          className="h-32 w-32 rounded-lg object-cover shadow"
        />

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {employee.firstName} {employee.middleName} {employee.lastName}
          </h2>

          <p className="text-gray-600">{employee.employeeTitle}</p>
          {employee.linkedCode ? (
            <p className="text-gray-600">Code {employee.linkedCode}</p>
          ) : (
            <p className="text-gray-600">Code {employee.invitationCode}</p>
          )}

          <p className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {employee.status}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Personal Info */}
        <ProfileSection title="Personal Information">
          <InfoRow label="Employee ID" value={employee.employeeId} />
          <InfoRow label="Native Name" value={employee.nativeName} />
          <InfoRow label="Nationality" value={employee.nationality} />
          <InfoRow label="Email" value={employee.email} />
          <InfoRow label="Phone" value={employee.phone} />
          <InfoRow label="Government ID" value={employee.governmentId} />
          <InfoRow label="Date of Birth" value={employee.dateOfBirth} />
          <InfoRow label="Passport Number" value={employee.passportNumber} />
          <InfoRow label="Marital Status" value={employee.maritalStatus} />
          <InfoRow label="Gender" value={employee.gender} />
          <InfoRow label="Address" value={employee.address} />
          <InfoRow label="Notes" value={employee.notes} />
        </ProfileSection>

        {/* Employment */}
        <ProfileSection title="Employment Information">
          <InfoRow label="Title" value={employee.employeeTitle} />
          <InfoRow label="Role" value={employee.role} />
          <InfoRow label="Department" value={employee.department} />

          <div className="mt-3">
            <h4 className="font-semibold">Additional Roles:</h4>
            <ListPills list={employee.roles} />
          </div>

          <div className="mt-3">
            <h4 className="font-semibold">Groups:</h4>
            <ListPills list={employee.groups} />
          </div>
        </ProfileSection>

        {/* Contract */}
        <ProfileSection title="Contract Information">
          <InfoRow label="Contract Type" value={employee.contractType} />
          <InfoRow label="Monthly Salary" value={`${employee.monthlySalary} ${employee.currency}`} />
          <InfoRow label="Resident Start Date" value={employee.residentStartDate} />
          <InfoRow label="Probation End Date" value={employee.probationEndDate} />
          <InfoRow label="Contract End Date" value={employee.contractEndDate} />
          <InfoRow label="Last Day of Work" value={employee.lastDayOfWork} />
          <InfoRow label="Contract Notes" value={employee.contractNotes} />
        </ProfileSection>

        {/* Medical */}
        <ProfileSection title="Medical Information">
          <InfoRow label="Allergies" value={employee.allergies} />
          <InfoRow label="Medications" value={employee.medications} />
        </ProfileSection>

        {/* Emergency Contact */}
        <ProfileSection title="Emergency Contact">
          <InfoRow label="Name" value={employee.emergencyContactName} />
          <InfoRow label="Relation" value={employee.emergencyContactRelation} />
          <InfoRow label="Phone" value={employee.emergencyContactPhone} />
        </ProfileSection>

        {/* Documents */}
        <ProfileSection title="Documents" fullwidth>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {employee.documents.map((doc, i) => (
              <div key={i} className="rounded-md border p-3 shadow-sm">
                <h4 className="font-medium text-gray-800">{doc.type}</h4>
                {doc.file ? (
                  <img
                    src={URL.createObjectURL(doc.file)}
                    alt={doc.type}
                    className="mt-2 h-28 w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="mt-2 flex h-28 items-center justify-center rounded-md bg-gray-100 text-gray-400">
                    No File
                  </div>
                )}
              </div>
            ))}
          </div>
        </ProfileSection>
      </div>
    </div>
  );
};

export default EmployeeProfile;

/* 🔹 Reusable Components */

const ProfileSection = ({ title, children, fullwidth }) => (
  <div className={`rounded-lg border bg-white p-5 shadow-sm ${fullwidth ? "md:col-span-2" : ""}`}>
    <h3 className="mb-4 text-xl font-semibold text-gray-700">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800">{value || "-"}</span>
  </div>
);

const ListPills = ({ list }) => (
  <div className="mt-1 flex flex-wrap gap-2">
    {list?.length ? (
      list.map((item, i) => (
        <span key={i} className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
          {item}
        </span>
      ))
    ) : (
      <span className="text-sm text-gray-500">None</span>
    )}
  </div>
);
