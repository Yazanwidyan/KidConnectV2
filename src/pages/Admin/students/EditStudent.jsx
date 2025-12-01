import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const religions = ["Islam", "Christianity", "Other"];

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

const EditStudent = ({ studentData }) => {
  const [preview, setPreview] = useState(studentData?.studentPhoto || null);
  const [attachmentsPreview, setAttachmentsPreview] = useState(
    studentData?.attachments?.map((f) => URL.createObjectURL(f)) || []
  );

  // Convert attachments from File objects or URLs
  const initialAttachments = studentData?.attachments || [];

  // Prepare initial form values
  const initialValues = {
    studentPhoto: studentData?.studentPhoto || null,
    firstDayAtSchool: studentData?.firstDayAtSchool || "",
    firstName: studentData?.firstName || "",
    secondName: studentData?.secondName || "",
    thirdName: studentData?.thirdName || "",
    lastName: studentData?.lastName || "",
    governmentId: studentData?.governmentId || "",
    nationality: studentData?.nationality || "",
    placeOfBirth: studentData?.placeOfBirth || "",
    gender: studentData?.gender || genders[0],
    dob: studentData?.dob || "",
    bloodGroup: studentData?.bloodGroup || bloodGroups[0],
    religion: studentData?.religion || religions[0],
    address: studentData?.address || "",
    allergies: studentData?.allergies || "",
    medications: studentData?.medications || "",
    nurseryNotes: studentData?.nurseryNotes || "",
    parentNotes: studentData?.parentNotes || "",
    groupName: studentData?.groupName || "",
    attachments: initialAttachments,
    parents:
      studentData?.parents?.length > 0
        ? studentData.parents
        : [{ parentName: "", parentPhone: "", parentEmail: "", parentRelation: "" }],
    emergencyContacts:
      studentData?.emergencyContacts?.length > 0
        ? studentData.emergencyContacts
        : [{ name: "", phone: "", relation: "" }],
    authorizedPickups:
      studentData?.authorizedPickups?.length > 0
        ? studentData.authorizedPickups
        : [{ name: "", phone: "", id: "", relation: "" }],
  };

  return (
    <div className="w-full p-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Edit Student</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={StudentSchema}
        onSubmit={(values) => {
          console.log("Updated Values:", values);
          alert("Student Updated Successfully!");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Student Photo */}
            <div className="md:col-span-2">
              <label className="mb-2 font-medium text-gray-700">Student Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("studentPhoto", file);
                  if (file) setPreview(URL.createObjectURL(file));
                }}
                className="w-full rounded-lg border px-4 py-2"
              />
              {preview && (
                <img src={preview} alt="preview" className="mt-3 h-32 w-32 rounded-lg object-cover" />
              )}
              <ErrorMessage name="studentPhoto" component="div" className="text-sm text-red-500" />
            </div>

            {/* Student Info */}
            {[
              { name: "firstName", label: "First Name" },
              { name: "secondName", label: "Second Name" },
              { name: "thirdName", label: "Third Name" },
              { name: "lastName", label: "Last Name" },
              { name: "governmentId", label: "Government ID" },
              { name: "nationality", label: "Nationality" },
              { name: "placeOfBirth", label: "Place of Birth" },
              { name: "address", label: "Address" },
              { name: "allergies", label: "Allergies" },
              { name: "medications", label: "Medications" },
              { name: "nurseryNotes", label: "Nursery Notes" },
              { name: "parentNotes", label: "Parent Notes" },
              { name: "groupName", label: "Group Name" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">{field.label}</label>
                <Field name={field.name} className="rounded-lg border px-4 py-2" />
                <ErrorMessage name={field.name} component="div" className="text-sm text-red-500" />
              </div>
            ))}

            {/* First Day at School */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">First Day at School</label>
              <Field type="date" name="firstDayAtSchool" className="rounded-lg border px-4 py-2" />
              <ErrorMessage name="firstDayAtSchool" component="div" className="text-sm text-red-500" />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Date of Birth</label>
              <Field type="date" name="dob" className="rounded-lg border px-4 py-2" />
              <ErrorMessage name="dob" component="div" className="text-sm text-red-500" />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Gender</label>
              <Field as="select" name="gender" className="rounded-lg border px-4 py-2">
                {genders.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </Field>
              <ErrorMessage name="gender" component="div" className="text-sm text-red-500" />
            </div>

            {/* Blood Group */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Blood Group</label>
              <Field as="select" name="bloodGroup" className="rounded-lg border px-4 py-2">
                {bloodGroups.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </Field>
              <ErrorMessage name="bloodGroup" component="div" className="text-sm text-red-500" />
            </div>

            {/* Religion */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Religion</label>
              <Field as="select" name="religion" className="rounded-lg border px-4 py-2">
                {religions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Field>
              <ErrorMessage name="religion" component="div" className="text-sm text-red-500" />
            </div>

            {/* Attachments */}
            <div className="md:col-span-2">
              <label className="mb-2 font-medium text-gray-700">Attachments</label>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setFieldValue("attachments", files);
                  setAttachmentsPreview(files.map((f) => URL.createObjectURL(f)));
                }}
                className="w-full rounded-lg border px-4 py-2"
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
            </div>

            {/* Dynamic Sections */}
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

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
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

const DynamicSection = ({ name, title, fields }) => (
  <FieldArray name={name}>
    {({ push, remove, form }) => (
      <div className="md:col-span-2">
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        {form.values[name].map((_, index) => (
          <div key={index} className="relative mb-4 rounded-lg border bg-gray-50 p-4">
            {index > 0 && (
              <button
                type="button"
                className="absolute right-2 top-2 text-red-600"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            )}
            {fields.map((field) => (
              <div key={field} className="mb-2 flex flex-col">
                <label className="font-medium text-gray-700">{field}</label>
                <Field name={`${name}[${index}].${field}`} className="rounded-lg border px-4 py-2" />
                <ErrorMessage
                  name={`${name}[${index}].${field}`}
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={() => push(fields.reduce((acc, f) => ({ ...acc, [f]: "" }), {}))}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add {title.slice(0, -1)}
        </button>
      </div>
    )}
  </FieldArray>
);

export default EditStudent;
