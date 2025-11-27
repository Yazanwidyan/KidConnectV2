import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const groupTypes = ["Academic", "Sports", "Arts", "Other"];

// Validation schema
const GroupSchema = Yup.object().shape({
  groupName: Yup.string().required("Group Name is required"),
  groupType: Yup.string().required("Group Type is required"),
  groupColor: Yup.string().required("Group Color is required"),
  groupImage: Yup.mixed().required("Group Image is required"),
});

const EditGroup = () => {
  const { id } = useParams(); // get group id from route
  const [initialValues, setInitialValues] = useState({
    groupName: "",
    groupType: groupTypes[0],
    groupColor: "#3A49F9",
    groupImage: null,
  });
  const [preview, setPreview] = useState(null);

  // Simulate fetching group data from API
  useEffect(() => {
    // Example: fetch group by id
    const fetchGroup = async () => {
      // Replace with API call
      const groupData = {
        groupName: "Math Club",
        groupType: "Academic",
        groupColor: "#25A0DD",
        groupImage: null, // Replace with existing image URL if available
      };
      setInitialValues(groupData);
      if (groupData.groupImage) setPreview(groupData.groupImage);
    };
    fetchGroup();
  }, [id]);

  return (
    <div className="w-full p-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Edit Group</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={GroupSchema}
        onSubmit={(values) => {
          console.log("Updated group data:", values);
          alert("Group Updated!");
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* Group Name */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Group Name</label>
              <Field
                name="groupName"
                placeholder="Enter group name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              />
              <ErrorMessage name="groupName" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* Group Type */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Group Type</label>
              <Field
                as="select"
                name="groupType"
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
              >
                {groupTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="groupType" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* Group Color */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Group Color</label>
              <Field
                name="groupColor"
                type="color"
                className="h-10 w-20 cursor-pointer rounded-md border border-gray-300 p-1 transition"
              />
              <ErrorMessage name="groupColor" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            {/* Group Image */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Group Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue("groupImage", event.currentTarget.files[0]);
                  if (event.currentTarget.files[0]) {
                    setPreview(URL.createObjectURL(event.currentTarget.files[0]));
                  }
                }}
                className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-gray-600 transition"
              />
              <ErrorMessage name="groupImage" component="div" className="mt-1 text-sm text-red-500" />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 h-32 w-32 rounded-md object-cover shadow-sm"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-md bg-[#3A49F9] py-3 font-semibold text-white shadow-md transition hover:bg-[#2e3abf]"
              >
                Update Group
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditGroup;
