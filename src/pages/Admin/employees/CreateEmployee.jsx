import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const roles = ["Teacher", "Administrator", "Staff"];
const departments = ["Math", "Science", "English", "Sports", "Arts"];
const statuses = ["Active", "Inactive"];

// Validation Schema
const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  role: Yup.string().required("Role is required"),
  department: Yup.string().required("Department is required"),
  joinDate: Yup.date().required("Join Date is required"),
  salary: Yup.number().required("Salary is required"),
  status: Yup.string().required("Status is required"),
  photo: Yup.mixed().required("Photo is required"),
});

const CreateEmployee = () => {
  const [preview, setPreview] = useState(null);

  return (
    <div className="w-full p-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Add New Employee</h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: roles[0],
          department: departments[0],
          joinDate: "",
          salary: "",
          status: statuses[0],
          photo: null,
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Employee Created!");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* Employee Info */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">First Name</label>
              <Field
                name="firstName"
                placeholder="Enter first name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Last Name</label>
              <Field
                name="lastName"
                placeholder="Enter last name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Phone</label>
              <Field
                name="phone"
                placeholder="Enter phone"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Role</label>
              <Field
                as="select"
                name="role"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="role" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Department</label>
              <Field
                as="select"
                name="department"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="department" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Join Date</label>
              <Field
                name="joinDate"
                type="date"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="joinDate" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Salary</label>
              <Field
                name="salary"
                type="number"
                placeholder="Enter salary"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="salary" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Status</label>
              <Field
                as="select"
                name="status"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="status" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-2 font-medium text-gray-700">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFieldValue("photo", e.currentTarget.files[0]);
                  if (e.currentTarget.files[0]) setPreview(URL.createObjectURL(e.currentTarget.files[0]));
                }}
                className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-gray-600"
              />
              <ErrorMessage name="photo" component="div" className="mt-1 text-sm text-red-500" />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 h-32 w-32 rounded-md object-cover shadow-sm"
                />
              )}
            </div>

            <div className="mt-6 md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-md bg-[#3A49F9] py-3 font-semibold text-white shadow-md transition hover:bg-[#2e3abf]"
              >
                Add Employee
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEmployee;
