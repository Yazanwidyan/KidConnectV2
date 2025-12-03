import { UserPlusIcon } from "@heroicons/react/24/outline";
import { FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const rolesList = ["Teacher", "Administrator", "Staff"];
const groupsList = ["Math", "Science", "English", "Sports", "Arts"];
const statuses = ["Active", "Inactive"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const contractTypes = ["Full-time", "Part-time", "Temporary", "Internship"];
const currencies = ["USD", "EUR", "GBP", "Local"];
const departments = ["HR", "Finance", "Operations", "IT", "Administration"];
const documentTypes = [
  "Residency",
  "Government ID",
  "Passport",
  "Driver License",
  "Contract",
  "Background Check",
  "Educational Degree",
  "Reference",
];

// Validation schema
const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
  nativeName: Yup.string(),
  employeeId: Yup.string().required("Employee ID is required"),
  nationality: Yup.string().required("Nationality is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  governmentId: Yup.string(),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  passportNumber: Yup.string(),
  maritalStatus: Yup.string().required("Marital Status is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string(),
  notes: Yup.string(),
  employeeTitle: Yup.string().required("Employee Title is required"),
  role: Yup.string().required("Role is required"),
  department: Yup.string().required("Department is required"),
  contractType: Yup.string().required("Contract Type is required"),
  monthlySalary: Yup.number().required("Monthly Salary is required"),
  currency: Yup.string().required("Currency is required"),
  residentStartDate: Yup.date(),
  probationEndDate: Yup.date(),
  contractEndDate: Yup.date(),
  lastDayOfWork: Yup.date(),
  contractNotes: Yup.string(),
  allergies: Yup.string(),
  medications: Yup.string(),
  emergencyContactName: Yup.string(),
  emergencyContactRelation: Yup.string(),
  emergencyContactPhone: Yup.string(),
  status: Yup.string().required("Status is required"),
  photo: Yup.mixed().required("Photo is required"),
  roles: Yup.array().min(1, "At least one role is required"),
  groups: Yup.array().min(1, "At least one group is required"),
  documents: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Document type is required"),
      file: Yup.mixed().required("Document file is required"),
    })
  ),
});

const CreateEmployee = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [docPreviews, setDocPreviews] = useState({});

  const renderInput = (
    name,
    label,
    type = "text",
    placeholder = "",
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  ) => (
    <div className="flex flex-col">
      <label className="mb-2 font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
      />
      {touched[name] && errors[name] && <div className="mt-1 text-sm text-red-500">{errors[name]}</div>}
    </div>
  );

  const renderSelect = (name, label, options, values, errors, touched, handleChange, handleBlur) => (
    <div className="flex flex-col">
      <label className="mb-2 font-medium text-gray-700">{label}</label>
      <select
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {touched[name] && errors[name] && <div className="mt-1 text-sm text-red-500">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-primaryFont mb-1 text-2xl font-bold">Add New Employee</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center gap-1 font-semibold text-black">
                  <UserPlusIcon className="h-4 w-4 stroke-[2]" /> <h5>Employees</h5>
                </div>
              </li>
              <span>/</span>
              <li aria-current="page">
                <span className="font-semibold text-primary">Add New Employee</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          middleName: "",
          lastName: "",
          nativeName: "",
          employeeId: "",
          nationality: "",
          email: "",
          phone: "",
          governmentId: "",
          dateOfBirth: "",
          passportNumber: "",
          maritalStatus: maritalStatuses[0],
          gender: genders[0],
          address: "",
          notes: "",
          employeeTitle: "",
          role: rolesList[0],
          department: departments[0],
          contractType: contractTypes[0],
          monthlySalary: "",
          currency: currencies[0],
          residentStartDate: "",
          probationEndDate: "",
          contractEndDate: "",
          lastDayOfWork: "",
          contractNotes: "",
          allergies: "",
          medications: "",
          emergencyContactName: "",
          emergencyContactRelation: "",
          emergencyContactPhone: "",
          status: statuses[0],
          photo: null,
          roles: [],
          groups: [],
          documents: [],
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Employee Created!");
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <div className="mb-4 rounded-lg bg-white px-6 py-4 shadow-lg">
            <Form className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              {/* Personal Info */}
              <h3 className="text-xl font-semibold text-gray-700 md:col-span-2">Personal Information</h3>
              {renderInput(
                "firstName",
                "First Name",
                "text",
                "Enter first name",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "middleName",
                "Middle Name",
                "text",
                "Enter middle name",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "lastName",
                "Last Name",
                "text",
                "Enter last name",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "nativeName",
                "Native Name",
                "text",
                "Enter native name",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "employeeId",
                "Employee ID",
                "text",
                "Enter employee ID",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "nationality",
                "Nationality",
                "text",
                "Enter nationality",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "email",
                "Email",
                "email",
                "Enter email",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "phone",
                "Phone",
                "text",
                "Enter phone",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "governmentId",
                "Government ID",
                "text",
                "Enter government ID",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "dateOfBirth",
                "Date of Birth",
                "date",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "passportNumber",
                "Passport Number",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderSelect(
                "maritalStatus",
                "Marital Status",
                maritalStatuses,
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderSelect("gender", "Gender", genders, values, errors, touched, handleChange, handleBlur)}
              {renderInput(
                "address",
                "Address",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput("notes", "Notes", "text", "", values, errors, touched, handleChange, handleBlur)}

              {/* Employment Info */}
              <h3 className="text-xl font-semibold text-gray-700 md:col-span-2">Employment Information</h3>
              {renderInput(
                "employeeTitle",
                "Employee Title",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderSelect("role", "Role", rolesList, values, errors, touched, handleChange, handleBlur)}
              {renderSelect(
                "department",
                "Department",
                departments,
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderSelect("status", "Status", statuses, values, errors, touched, handleChange, handleBlur)}

              {/* Contract Details */}
              <h3 className="text-xl font-semibold text-gray-700 md:col-span-2">Contract Details</h3>
              {renderSelect(
                "contractType",
                "Contract Type",
                contractTypes,
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "monthlySalary",
                "Monthly Salary",
                "number",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderSelect(
                "currency",
                "Currency",
                currencies,
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "residentStartDate",
                "Resident Start Date",
                "date",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "probationEndDate",
                "Probation End Date",
                "date",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "contractEndDate",
                "Contract End Date",
                "date",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "lastDayOfWork",
                "Last Day of Work",
                "date",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "contractNotes",
                "Contract Notes",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}

              {/* Medical Info */}
              <h3 className="text-xl font-semibold text-gray-700 md:col-span-2">Medical Information</h3>
              {renderInput(
                "allergies",
                "Allergies",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "medications",
                "Medications",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}

              {/* Emergency Contact */}
              <h3 className="text-xl font-semibold text-gray-700 md:col-span-2">Emergency Contact</h3>
              {renderInput(
                "emergencyContactName",
                "Name",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "emergencyContactRelation",
                "Relation",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
              {renderInput(
                "emergencyContactPhone",
                "Phone",
                "text",
                "",
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}

              {/* Photo Upload */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-2 font-medium text-gray-700">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setFieldValue("photo", e.currentTarget.files[0]);
                    if (e.currentTarget.files[0])
                      setPhotoPreview(URL.createObjectURL(e.currentTarget.files[0]));
                  }}
                  className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-gray-600"
                />
                {touched.photo && errors.photo && (
                  <div className="mt-1 text-sm text-red-500">{errors.photo}</div>
                )}
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="mt-3 h-32 w-32 rounded-md object-cover shadow-lg"
                  />
                )}
              </div>

              {/* Roles */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-2 font-medium text-gray-700">Roles</label>
                <FieldArray name="roles">
                  {(arrayHelpers) => (
                    <div>
                      {values.roles.map((role, index) => (
                        <div key={index} className="mb-2 flex items-center gap-2">
                          <select
                            name={`roles.${index}`}
                            value={role}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-2"
                          >
                            {rolesList.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push(rolesList[0])}
                        className="mt-2 rounded-md bg-blue-500 px-3 py-1 text-white"
                      >
                        Add Role
                      </button>
                      {touched.roles && errors.roles && (
                        <div className="mt-1 text-red-500">{errors.roles}</div>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Groups */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-2 font-medium text-gray-700">Groups</label>
                <FieldArray name="groups">
                  {(arrayHelpers) => (
                    <div>
                      {values.groups.map((group, index) => (
                        <div key={index} className="mb-2 flex items-center gap-2">
                          <select
                            name={`groups.${index}`}
                            value={group}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-2"
                          >
                            {groupsList.map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push(groupsList[0])}
                        className="mt-2 rounded-md bg-blue-500 px-3 py-1 text-white"
                      >
                        Add Group
                      </button>
                      {touched.groups && errors.groups && (
                        <div className="mt-1 text-red-500">{errors.groups}</div>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Documents */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-2 font-medium text-gray-700">Documents</label>
                <FieldArray name="documents">
                  {(arrayHelpers) => (
                    <div>
                      {values.documents.map((doc, index) => (
                        <div key={index} className="mb-2 flex items-center gap-2">
                          <select
                            name={`documents.${index}.type`}
                            value={doc.type}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-2"
                          >
                            {documentTypes.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          <input
                            type="file"
                            name={`documents.${index}.file`}
                            onChange={(e) => {
                              setFieldValue(`documents.${index}.file`, e.currentTarget.files[0]);
                              if (e.currentTarget.files[0]) {
                                setDocPreviews((prev) => ({
                                  ...prev,
                                  [index]: URL.createObjectURL(e.currentTarget.files[0]),
                                }));
                              }
                            }}
                            className="rounded-md border border-gray-300 px-3 py-2"
                          />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                          {docPreviews[index] && (
                            <img
                              src={docPreviews[index]}
                              alt="doc preview"
                              className="h-16 w-16 rounded-md object-cover"
                            />
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push({ type: documentTypes[0], file: null })}
                        className="mt-2 rounded-md bg-blue-500 px-3 py-1 text-white"
                      >
                        Add Document
                      </button>
                      {touched.documents && errors.documents && (
                        <div className="mt-1 text-red-500">{errors.documents}</div>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Submit */}
              <div className="mt-4 md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-600 py-3 text-white transition hover:bg-green-700"
                >
                  Create Employee
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CreateEmployee;
