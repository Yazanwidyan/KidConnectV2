import { ChevronDownIcon, ChevronUpIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import ProfilePicModal from "../../../components/ProfilePicModal";

const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const religions = ["Islam", "Christianity", "Other"];

// Validation Schema (same as AddStudent)
const StudentSchema = Yup.object().shape({
  studentPhoto: Yup.mixed().required("Student Photo is required"),
  firstDayAtSchool: Yup.date().required("First day at school is required"),
  firstName: Yup.string().required("First Name is required"),
  secondName: Yup.string().required("Second Name is required"),
  thirdName: Yup.string().required("Third Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  governmentId: Yup.string().required("Government ID is required"),
  nationality: Yup.string().required("Nationality is required"),
  placeOfBirth: Yup.string().required("Place of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required"),
  bloodGroup: Yup.string().required("Blood Group is required"),
  religion: Yup.string().required("Religion is required"),
  address: Yup.string().required("Address is required"),
  allergies: Yup.string(),
  medications: Yup.string(),
  nurseryNotes: Yup.string(),
  parentNotes: Yup.string(),
  groupName: Yup.string().required("Group Name is required"),
  parents: Yup.array().of(
    Yup.object().shape({
      parentName: Yup.string().required("Parent Name is required"),
      parentPhone: Yup.string().required("Parent Phone is required"),
      parentEmail: Yup.string().email("Invalid Email").required("Parent Email is required"),
      parentRelation: Yup.string().required("Relation is required"),
    })
  ),
  emergencyContacts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      relation: Yup.string().required("Relation is required"),
    })
  ),
  authorizedPickups: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      id: Yup.string().required("ID is required"),
      relation: Yup.string().required("Relation is required"),
    })
  ),
});

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20";

const EditStudent = ({ existingStudent, onSubmitEdit }) => {
  // existingStudent is the student data object to edit
  const [preview, setPreview] = useState(null);
  const [attachmentsPreview, setAttachmentsPreview] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState({
    personal: true,
    additional: false,
    attachments: false,
    dynamic: false,
  });

  // Initialize previews when existingStudent loads
  useEffect(() => {
    if (existingStudent) {
      if (existingStudent.studentPhoto) {
        setPreview(existingStudent.studentPhoto); // URL or base64
      }
      if (existingStudent.attachments && existingStudent.attachments.length > 0) {
        setAttachmentsPreview(existingStudent.attachments);
      }
    }
  }, [existingStudent]);

  const toggleSection = (key) => setSectionsOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // Set initial form values from existingStudent or defaults
  const initialValues = existingStudent
    ? {
        studentPhoto: existingStudent.studentPhoto || null,
        firstDayAtSchool: existingStudent.firstDayAtSchool || "",
        firstName: existingStudent.firstName || "",
        secondName: existingStudent.secondName || "",
        thirdName: existingStudent.thirdName || "",
        lastName: existingStudent.lastName || "",
        governmentId: existingStudent.governmentId || "",
        nationality: existingStudent.nationality || "",
        placeOfBirth: existingStudent.placeOfBirth || "",
        gender: existingStudent.gender || genders[0],
        dob: existingStudent.dob || "",
        bloodGroup: existingStudent.bloodGroup || bloodGroups[0],
        religion: existingStudent.religion || religions[0],
        address: existingStudent.address || "",
        allergies: existingStudent.allergies || "",
        medications: existingStudent.medications || "",
        nurseryNotes: existingStudent.nurseryNotes || "",
        parentNotes: existingStudent.parentNotes || "",
        groupName: existingStudent.groupName || "",
        attachments: existingStudent.attachments || [],
        parents: existingStudent.parents?.length
          ? existingStudent.parents
          : [{ parentName: "", parentPhone: "", parentEmail: "", parentRelation: "" }],
        emergencyContacts: existingStudent.emergencyContacts?.length
          ? existingStudent.emergencyContacts
          : [{ name: "", phone: "", relation: "" }],
        authorizedPickups: existingStudent.authorizedPickups?.length
          ? existingStudent.authorizedPickups
          : [{ name: "", phone: "", id: "", relation: "" }],
      }
    : {
        studentPhoto: null,
        firstDayAtSchool: "",
        firstName: "",
        secondName: "",
        thirdName: "",
        lastName: "",
        governmentId: "",
        nationality: "",
        placeOfBirth: "",
        gender: genders[0],
        dob: "",
        bloodGroup: bloodGroups[0],
        religion: religions[0],
        address: "",
        allergies: "",
        medications: "",
        nurseryNotes: "",
        parentNotes: "",
        groupName: "",
        attachments: [],
        parents: [{ parentName: "", parentPhone: "", parentEmail: "", parentRelation: "" }],
        emergencyContacts: [{ name: "", phone: "", relation: "" }],
        authorizedPickups: [{ name: "", phone: "", id: "", relation: "" }],
      };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header / Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Edit Student</h1>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li className="inline-flex items-center">
              <div className="flex items-center text-sm font-semibold text-black">
                <UserGroupIcon className="h-4 w-4 stroke-2" /> <h5>Students</h5>
              </div>
            </li>
            <span className="text-xs text-gray-500">/</span>
            <li aria-current="page">
              <span className="text-sm font-semibold text-primary">Edit Student</span>
            </li>
          </ol>
        </nav>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={StudentSchema}
        enableReinitialize
        onSubmit={(values) => {
          // Handle edit submission - call parent onSubmitEdit or do API call here
          console.log("Edited Student:", values);
          if (onSubmitEdit) {
            onSubmitEdit(values);
          } else {
            alert("Student Updated Successfully!");
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* Personal Information */}
            <AccordionCard
              title="Personal Information"
              open={sectionsOpen.personal}
              toggle={() => toggleSection("personal")}
              hint="Required"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center md:col-span-1">
                  <label className="mb-2 font-medium text-gray-700">Student Photo</label>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-100 text-gray-400 hover:border-gray-400 hover:bg-gray-200"
                  >
                    {preview ? (
                      <img src={preview} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-center text-sm">Upload / Crop</span>
                    )}
                  </button>
                  <ProfilePicModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    setFieldValue={setFieldValue}
                    setPreview2={setPreview}
                    name="studentPhoto"
                  />
                  <ErrorMessage name="studentPhoto" component="div" className="mt-2 text-sm text-red-500" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
                  {["firstName", "secondName", "thirdName", "lastName"].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="mb-2 font-medium text-gray-700">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <Field name={field} className={inputClass} />
                      <ErrorMessage name={field} component="div" className="text-sm text-red-500" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-3">
                  {["governmentId", "nationality", "placeOfBirth", "address"].map((field) => (
                    <div key={field} className="flex flex-col">
                      <label className="mb-2 font-medium text-gray-700">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <Field name={field} className={inputClass} />
                      <ErrorMessage name={field} component="div" className="text-sm text-red-500" />
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">First Day at School</label>
                    <Field type="date" name="firstDayAtSchool" className={inputClass} />
                    <ErrorMessage name="firstDayAtSchool" component="div" className="text-sm text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">Date of Birth</label>
                    <Field type="date" name="dob" className={inputClass} />
                    <ErrorMessage name="dob" component="div" className="text-sm text-red-500" />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">Gender</label>
                    <Field as="select" name="gender" className={inputClass}>
                      {genders.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-sm text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">Blood Group</label>
                    <Field as="select" name="bloodGroup" className={inputClass}>
                      {bloodGroups.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="bloodGroup" component="div" className="text-sm text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">Religion</label>
                    <Field as="select" name="religion" className={inputClass}>
                      {religions.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="religion" component="div" className="text-sm text-red-500" />
                  </div>
                </div>
              </div>
            </AccordionCard>

            {/* Additional Information */}
            <AccordionCard
              title="Additional Information"
              open={sectionsOpen.additional}
              toggle={() => toggleSection("additional")}
              hint="Required"
            >
              {["allergies", "medications", "nurseryNotes", "parentNotes", "groupName"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">{field.replace(/([A-Z])/g, " $1")}</label>
                  <Field name={field} className={inputClass} />
                  <ErrorMessage name={field} component="div" className="text-sm text-red-500" />
                </div>
              ))}
            </AccordionCard>

            {/* Attachments */}
            <AccordionCard
              title="Attachments"
              open={sectionsOpen.attachments}
              toggle={() => toggleSection("attachments")}
              hint="Required"
            >
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setFieldValue("attachments", files);
                  setAttachmentsPreview(files.map((f) => URL.createObjectURL(f)));
                }}
                className={inputClass}
              />
              {attachmentsPreview.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {attachmentsPreview.map((file, i) => (
                    <span key={i} className="rounded border bg-gray-100 px-2 py-1 text-sm">
                      File {i + 1}
                    </span>
                  ))}
                </div>
              )}
            </AccordionCard>

            {/* Dynamic Sections */}
            <AccordionCard
              title="Dynamic Sections"
              open={sectionsOpen.dynamic}
              toggle={() => toggleSection("dynamic")}
              hint="Required"
            >
              <DynamicSection
                name="parents"
                title="Parents"
                fields={["parentName", "parentPhone", "parentEmail", "parentRelation"]}
              />
              <DynamicSection
                name="emergencyContacts"
                title="Emergency Contacts"
                fields={["name", "phone", "relation"]}
              />
              <DynamicSection
                name="authorizedPickups"
                title="Authorized Pickups"
                fields={["name", "phone", "id", "relation"]}
              />
            </AccordionCard>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3 font-semibold text-white hover:bg-primary/80"
              >
                Update Student
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Reuse AccordionCard and DynamicSection from your code:
const AccordionCard = ({ title, open, toggle, children, hint }) => (
  <div className="mb-4 rounded-lg bg-white shadow-lg">
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
        <ChevronUpIcon className="h-5 w-5 stroke-2" />
      ) : (
        <ChevronDownIcon className="h-5 w-5 stroke-2" />
      )}
    </button>
    {open && <div className="px-6 pb-4">{children}</div>}
  </div>
);

const DynamicSection = ({ name, title, fields }) => (
  <FieldArray name={name}>
    {({ push, remove, form }) => (
      <div className="md:col-span-3">
        <h3 className="mb-2 text-xl font-semibold text-gray-700">{title}</h3>
        {form.values[name].map((_, index) => (
          <div key={index} className="relative mb-4 rounded-lg border bg-gray-50 p-4 shadow-sm">
            {index > 0 && (
              <button
                type="button"
                className="absolute right-2 top-2 text-red-600"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="font-medium text-gray-700">{field}</label>
                  <Field name={`${name}[${index}].${field}`} className={inputClass} />
                  <ErrorMessage
                    name={`${name}[${index}].${field}`}
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => push(fields.reduce((acc, f) => ({ ...acc, [f]: "" }), {}))}
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <UserPlusIcon className="h-5 w-5 stroke-2" />
          Add {title.slice(0, -1)}
        </button>
      </div>
    )}
  </FieldArray>
);

export default EditStudent;
