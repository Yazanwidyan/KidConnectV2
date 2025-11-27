import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";

const roles = ["Teacher", "Administrator", "Staff"];
const departments = ["Math", "Science", "English", "Sports", "Arts"];
const statuses = ["Active", "Inactive"];

// Fake employee data (replace with API later)
const employeesData = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+123456789",
    role: "Teacher",
    department: "Math",
    joinDate: "2021-09-10",
    salary: 3500,
    status: "Active",
    photo: "https://via.placeholder.com/150",
  },
];

// Validation Schema (no required photo)
const EmployeeEditSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  role: Yup.string().required("Role is required"),
  department: Yup.string().required("Department is required"),
  joinDate: Yup.date().required("Join Date is required"),
  salary: Yup.number().required("Salary is required"),
  status: Yup.string().required("Status is required"),
});

const EditEmployee = () => {
  const { id } = useParams();

  // Get employee by ID
  const employee = employeesData.find((e) => e.id === parseInt(id));
  const [preview, setPreview] = useState(employee?.photo || null);

  if (!employee) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Employee not found.</p>
        <Link to="/admin/employees/employee-list" className="text-blue-500 underline">
          Back to Employees
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center gap-4">
        <Link
          to="/admin/employees/employee-list"
          className="flex items-center gap-2 text-blue-500 hover:underline"
        >
          <FaArrowLeft /> Back
        </Link>
        <h2 className="text-3xl font-bold text-gray-800">Edit Employee</h2>
      </div>

      <Formik
        initialValues={{
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          role: employee.role,
          department: employee.department,
          joinDate: employee.joinDate,
          salary: employee.salary,
          status: employee.status,
          photo: null, // editable
        }}
        validationSchema={EmployeeEditSchema}
        onSubmit={(values) => {
          console.log("Updated Employee:", values);
          alert("Employee Updated!");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">First Name</label>
              <Field
                name="firstName"
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-600 focus:ring"
              />
              <ErrorMessage name="firstName" component="div" className="text-sm text-red-500" />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Last Name</label>
              <Field
                name="lastName"
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-600 focus:ring"
              />
              <ErrorMessage name="lastName" component="div" className="text-sm text-red-500" />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-600 focus:ring"
              />
              <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Phone</label>
              <Field
                name="phone"
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-600 focus:ring"
              />
              <ErrorMessage name="phone" component="div" className="text-sm text-red-500" />
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Role</label>
              <Field as="select" name="role" className="rounded-md border border-gray-300 px-4 py-2">
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Field>
            </div>

            {/* Department */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Department</label>
              <Field as="select" name="department" className="rounded-md border border-gray-300 px-4 py-2">
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Field>
            </div>

            {/* Join Date */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Join Date</label>
              <Field type="date" name="joinDate" className="rounded-md border border-gray-300 px-4 py-2" />
            </div>

            {/* Salary */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Salary</label>
              <Field type="number" name="salary" className="rounded-md border border-gray-300 px-4 py-2" />
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Status</label>
              <Field as="select" name="status" className="rounded-md border border-gray-300 px-4 py-2">
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Field>
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-2 font-medium text-gray-700">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("photo", file);
                  if (file) setPreview(URL.createObjectURL(file));
                }}
                className="rounded-md border border-gray-300 px-3 py-2"
              />

              {preview && (
                <img src={preview} alt="Preview" className="mt-3 h-32 w-32 rounded-md object-cover shadow" />
              )}
            </div>

            {/* Submit */}
            <div className="mt-4 md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white shadow hover:bg-blue-700"
              >
                Update Employee
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditEmployee;
