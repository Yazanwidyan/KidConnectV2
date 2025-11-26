import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const AddParentModal = ({ onClose, onAdd }) => {
  const initialValues = {
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    classRoom: "",
  };

  const validationSchema = Yup.object({
    studentName: Yup.string().required("Student is required"),
    parentName: Yup.string().required("Parent name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    classRoom: Yup.string().required("Classroom is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    onAdd({
      id: Date.now().toString(),
      studentAvatar: values.studentName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      signedUp: false,
      billPayEnabled: false,
      autoPayEnabled: false,
      checkInCode: "",
      ...values,
    });
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Add Parent</h3>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-3">
              <div>
                <Field
                  name="studentName"
                  placeholder="Student Name"
                  className="w-full rounded border px-3 py-2"
                />
                <ErrorMessage name="studentName" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <Field
                  name="parentName"
                  placeholder="Parent Name"
                  className="w-full rounded border px-3 py-2"
                />
                <ErrorMessage name="parentName" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <Field name="email" placeholder="Email" className="w-full rounded border px-3 py-2" />
                <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <Field name="phone" placeholder="Phone" className="w-full rounded border px-3 py-2" />
                <ErrorMessage name="phone" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <Field name="classRoom" placeholder="Classroom" className="w-full rounded border px-3 py-2" />
                <ErrorMessage name="classRoom" component="div" className="text-xs text-red-500" />
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={onClose} className="rounded border px-4 py-2">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded bg-primary px-4 py-2 text-white"
                >
                  Add
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddParentModal;
