import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    parent1: "",
    parent2: "",
    age: "",
    dob: "",
    grade: "",
    contactNumber: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSubmitted(true);
    // Here you can call your API to save the student
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-green-700">Registration Successful!</h2>
          <p>Thank you for registering your child. We will contact you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Student Registration Form</h2>

        <div>
          <label className="block font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Parent 1 Name</label>
          <input
            type="text"
            name="parent1"
            value={formData.parent1}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Parent 2 Name</label>
          <input
            type="text"
            name="parent2"
            value={formData.parent2}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Grade/Class</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
