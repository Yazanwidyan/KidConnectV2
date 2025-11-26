import React from "react";

const student = {
  // 🧍 Personal Info
  name: "Adam Smith",
  birthday: "2020-05-10",
  age: 5,
  gender: "Male",
  race: "White",
  ethnicity: "Non-Hispanic",
  allergies: "Peanuts",
  notes: "Very active and friendly.",
  medications: "None",
  doctor: "Dr. Emily Johnson",

  // 🏫 Rooms
  homeroom: "Preschool A",
  others: ["Art Room", "Playground"],

  // 🏫 School Details
  status: "Active",
  schedule: "Full-time",
  mealType: "Vegetarian",
  studentId: "STU-1001",

  // 🗓️ Enrollment Details
  firstContactDate: "2025-07-10",
  touredDate: "2025-07-15",
  paperworkDate: "2025-08-01",
  desiredStartDate: "2025-08-15",
  enrollmentDate: "2025-09-01",

  // 🏠 Address
  address: "123 Sunshine Street, Amman, Jordan",

  // 🖼️ Photo
  photo: "",
};

const StudentProfile = () => {
  if (!student) return <div>No student selected</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-10 flex flex-col items-center text-center">
        <img
          src={student.photo || "https://via.placeholder.com/150"}
          alt={student.name}
          className="mb-4 h-32 w-32 rounded-full object-cover shadow-md"
        />
        <h2 className="text-3xl font-semibold text-gray-800">{student.name}</h2>
        <p className="text-gray-500">Student Profile</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* PERSONAL INFO */}
        <Section title="Personal Info">
          <Info label="Name" value={student.name} />
          <Info label="Birthday" value={student.birthday} />
          <Info label="Age" value={student.age} />
          <Info label="Gender" value={student.gender} />
          <Info label="Race" value={student.race} />
          <Info label="Ethnicity" value={student.ethnicity} />
          <Info label="Allergies" value={student.allergies} />
          <Info label="Notes" value={student.notes} />
          <Info label="Medications" value={student.medications} />
          <Info label="Doctor" value={student.doctor} />
        </Section>

        {/* ROOMS */}
        <Section title="Rooms">
          <Info label="Homeroom" value={student.homeroom} />
          <Info label="Others" value={student.others?.join(", ") || "N/A"} />
        </Section>

        {/* SCHOOL DETAILS */}
        <Section title="School Details">
          <Info label="Status" value={student.status} />
          <Info label="Schedule" value={student.schedule} />
          <Info label="Meal Type" value={student.mealType} />
          <Info label="Student ID" value={student.studentId} />
        </Section>

        {/* ENROLLMENT DETAILS */}
        <Section title="Enrollment Details">
          <Info label="First Contact Date" value={student.firstContactDate} />
          <Info label="Toured Date" value={student.touredDate} />
          <Info label="Paperwork Date" value={student.paperworkDate} />
          <Info label="Desired Start Date" value={student.desiredStartDate} />
          <Info label="Enrollment Date" value={student.enrollmentDate} />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <Info label="Address" value={student.address} />
        </Section>
      </div>
    </div>
  );
};

// 📘 Reusable Section Component
const Section = ({ title, children }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition hover:shadow-lg">
    <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-blue-600">{title}</h3>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  </div>
);

// 📗 Reusable Info Row Component
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || "—"}</p>
  </div>
);

export default StudentProfile;
