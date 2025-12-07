import { ChevronDownIcon, ChevronUpIcon, UserPlusIcon } from "@heroicons/react/24/outline";
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

// ----------------- Validation Schema -----------------
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

// ----------------- Input / Select Helper -----------------
const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20";

const renderInput = (name, label, type = "text", values, errors, touched, handleChange, handleBlur) => (
  <div className="flex flex-col">
    <label className="mb-2 font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      className={inputClass}
    />
    {touched[name] && errors[name] && <div className="mt-1 text-sm text-red-500">{errors[name]}</div>}
  </div>
);

const renderSelect = (name, label, options, values, errors, touched, handleChange, handleBlur) => (
  <div className="flex flex-col">
    <label className="mb-2 font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      className={inputClass}
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

// ----------------- Accordion Card -----------------
const AccordionCard = ({ title, open, toggle, children, hint }) => (
  <div className="rounded-lg bg-white shadow-lg">
    <button
      type="button"
      onClick={toggle}
      className="flex w-full items-center justify-between px-6 py-4 text-left"
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {hint && <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{hint}</span>}
      </div>
      {open ? (
        <ChevronUpIcon className="h-5 w-5 stroke-[2]" />
      ) : (
        <ChevronDownIcon className="h-5 w-5 stroke-[2]" />
      )}
    </button>
    {open && <div className="px-6 pb-4">{children}</div>}
  </div>
);

// ----------------- Main Component -----------------
const CreateEmployee = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [docPreviews, setDocPreviews] = useState({});
  const [sectionsOpen, setSectionsOpen] = useState({
    personal: true,
    employment: false,
    contract: false,
    medical: false,
    emergency: false,
    rolesGroups: false,
    documents: false,
  });

  const toggleSection = (key) => setSectionsOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-primaryFont">Add New Employee</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <UserPlusIcon className="h-4 w-4 stroke-[2]" /> <h5>Employees</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary">Add New Employee</span>
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
          <Form className="grid grid-cols-1 gap-4">
            {/* ----------------- Personal Info ----------------- */}
            <AccordionCard
              title="Personal Information"
              open={sectionsOpen.personal}
              toggle={() => toggleSection("personal")}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {renderInput(
                  "firstName",
                  "First Name",
                  "text",
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
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur
                )}
                {renderInput("email", "Email", "email", values, errors, touched, handleChange, handleBlur)}
                {renderInput("phone", "Phone", "text", values, errors, touched, handleChange, handleBlur)}
                {renderInput(
                  "governmentId",
                  "Government ID",
                  "text",
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
                {renderInput("address", "Address", "text", values, errors, touched, handleChange, handleBlur)}
                {renderInput("notes", "Notes", "text", values, errors, touched, handleChange, handleBlur)}
              </div>
            </AccordionCard>

            {/* ----------------- Employment Info ----------------- */}
            <AccordionCard
              title="Employment Information"
              open={sectionsOpen.employment}
              toggle={() => toggleSection("employment")}
            >
              {renderInput(
                "employeeTitle",
                "Employee Title",
                "text",
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
            </AccordionCard>

            {/* ----------------- Contract Details ----------------- */}
            <AccordionCard
              title="Contract Details"
              open={sectionsOpen.contract}
              toggle={() => toggleSection("contract")}
            >
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
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
            </AccordionCard>

            {/* ----------------- Medical Info ----------------- */}
            <AccordionCard
              title="Medical Information"
              open={sectionsOpen.medical}
              toggle={() => toggleSection("medical")}
            >
              {renderInput(
                "allergies",
                "Allergies",
                "text",
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
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
            </AccordionCard>

            {/* ----------------- Emergency Contact ----------------- */}
            <AccordionCard
              title="Emergency Contact"
              open={sectionsOpen.emergency}
              toggle={() => toggleSection("emergency")}
            >
              {renderInput(
                "emergencyContactName",
                "Name",
                "text",
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
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              )}
            </AccordionCard>

            {/* ----------------- Roles & Groups ----------------- */}
            <AccordionCard
              title="Roles & Groups"
              open={sectionsOpen.rolesGroups}
              toggle={() => toggleSection("rolesGroups")}
            >
              <FieldArray name="roles">
                {(arrayHelpers) => (
                  <div className="mb-4">
                    <label className="mb-2 font-medium text-gray-700">Roles</label>
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
                  </div>
                )}
              </FieldArray>

              <FieldArray name="groups">
                {(arrayHelpers) => (
                  <div className="mb-4">
                    <label className="mb-2 font-medium text-gray-700">Groups</label>
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
                  </div>
                )}
              </FieldArray>
            </AccordionCard>

            {/* ----------------- Documents ----------------- */}
            <AccordionCard
              title="Documents"
              open={sectionsOpen.documents}
              toggle={() => toggleSection("documents")}
            >
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
                          onChange={(e) => setFieldValue(`documents.${index}.file`, e.currentTarget.files[0])}
                          className="rounded-md border border-gray-300 px-3 py-2"
                        />
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
                      onClick={() => arrayHelpers.push({ type: documentTypes[0], file: null })}
                      className="mt-2 rounded-md bg-blue-500 px-3 py-1 text-white"
                    >
                      Add Document
                    </button>
                  </div>
                )}
              </FieldArray>
            </AccordionCard>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 py-3 text-white transition hover:bg-green-700"
              >
                Create Employee
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEmployee;
