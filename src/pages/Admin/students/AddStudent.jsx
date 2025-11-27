import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const religions = ["Christianity", "Islam", "Hinduism", "Other"];

// Validation Schema
const StudentSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required"),
  bloodGroup: Yup.string().required("Blood Group is required"),
  religion: Yup.string().required("Religion is required"),
  parentName: Yup.string().required("Parent Name is required"),
  parentPhone: Yup.string().required("Parent Phone is required"),
  parentEmail: Yup.string().email("Invalid email").required("Parent Email is required"),
  admissionFee: Yup.number().required("Admission Fee is required"),
  monthlyFee: Yup.number().required("Monthly Fee is required"),
  studentPhoto: Yup.mixed().required("Student Photo is required"),
});

const AddStudent = () => {
  const [preview, setPreview] = useState(null);

  return (
    <div className="w-full p-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Add New Student</h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          gender: genders[0],
          dob: "",
          bloodGroup: bloodGroups[0],
          religion: religions[0],
          parentName: "",
          parentPhone: "",
          parentEmail: "",
          admissionFee: "",
          monthlyFee: "",
          studentPhoto: null,
        }}
        validationSchema={StudentSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Student Added!");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* ---------------- Student Info ---------------- */}
            <h3 className="mt-6 text-xl font-semibold text-gray-700 md:col-span-2">Student Info</h3>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">First Name</label>
              <Field
                name="firstName"
                placeholder="Enter first name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Last Name</label>
              <Field
                name="lastName"
                placeholder="Enter last name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Gender</label>
              <Field
                as="select"
                name="gender"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              >
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="gender" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Date of Birth</label>
              <Field
                name="dob"
                type="date"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="dob" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Blood Group</label>
              <Field
                as="select"
                name="bloodGroup"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              >
                {bloodGroups.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="bloodGroup" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Religion</label>
              <Field
                as="select"
                name="religion"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              >
                {religions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="religion" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* ---------------- Parent Info ---------------- */}
            <h3 className="mt-6 text-xl font-semibold text-gray-700 md:col-span-2">Parent Info</h3>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Parent Name</label>
              <Field
                name="parentName"
                placeholder="Enter parent name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="parentName" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Parent Phone</label>
              <Field
                name="parentPhone"
                placeholder="Enter parent phone"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="parentPhone" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="mb-2 font-medium text-gray-700">Parent Email</label>
              <Field
                name="parentEmail"
                type="email"
                placeholder="Enter parent email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="parentEmail" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* ---------------- Payment Info ---------------- */}
            <h3 className="mt-6 text-xl font-semibold text-gray-700 md:col-span-2">Payment Info</h3>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Admission Fee</label>
              <Field
                name="admissionFee"
                type="number"
                placeholder="Enter admission fee"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="admissionFee" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Monthly Fee</label>
              <Field
                name="monthlyFee"
                type="number"
                placeholder="Enter monthly fee"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="monthlyFee" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* ---------------- Student Photo ---------------- */}
            <h3 className="mt-6 text-xl font-semibold text-gray-700 md:col-span-2">Student Photo</h3>

            <div className="flex flex-col md:col-span-2">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue("studentPhoto", event.currentTarget.files[0]);
                  if (event.currentTarget.files[0])
                    setPreview(URL.createObjectURL(event.currentTarget.files[0]));
                }}
                className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-gray-600 transition"
              />
              <ErrorMessage name="studentPhoto" component="div" className="mt-1 text-sm text-red-500" />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 h-32 w-32 rounded-md object-cover shadow-sm"
                />
              )}
            </div>

            {/* ---------------- Submit Button ---------------- */}
            <div className="mt-6 md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-md bg-[#3A49F9] py-3 font-semibold text-white shadow-md transition hover:bg-[#2e3abf]"
              >
                Add Student
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStudent;
