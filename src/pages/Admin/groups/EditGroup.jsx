// pages/admin/groups/EditGroup.jsx

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaImage } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

/* -------------------------
  Mock staff & group types
------------------------- */
const mockStaff = [
  { id: 1, name: "Mr. Ahmed" },
  { id: 2, name: "Ms. Lina" },
  { id: 3, name: "Mr. Omar" },
  { id: 4, name: "Ms. Sara" },
];
const GROUP_TYPES = ["Infants", "Toddlers", "Early Preschool", "Pre-K", "KG-1", "KG-2", "Other"];

/* -------------------------
  Validation
------------------------- */
const GroupSchema = Yup.object().shape({
  groupName: Yup.string().required("Group Name is required"),
  groupType: Yup.string().required("Group Type is required"),
  groupColor: Yup.string().required("Group Color is required"),
  maxStudents: Yup.number().min(1).nullable(),
  minAge: Yup.number().min(0).nullable(),
  maxAge: Yup.number().min(Yup.ref("minAge"), "Max age must be >= min age").nullable(),
});

/* -------------------------
  Section Component
------------------------- */
const Section = ({ title, open, toggle, children, hint }) => (
  <div className="mb-4 rounded-lg border bg-white shadow">
    <button
      type="button"
      onClick={toggle}
      className="flex w-full items-center justify-between px-4 py-3 text-left"
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {hint && <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{hint}</span>}
      </div>
      {open ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    {open && <div className="px-4 pb-4">{children}</div>}
  </div>
);

/* -------------------------
  Main Component
------------------------- */
const EditGroup = () => {
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState(null);
  const [sectionsOpen, setSectionsOpen] = useState({
    basic: true,
    limits: false,
    staff: false,
  });

  const toggleSection = (key) => setSectionsOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // Simulate fetching group data from API
  const [initialValues, setInitialValues] = useState({
    groupName: "",
    groupType: GROUP_TYPES[0],
    groupColor: "#3A49F9",
    maxStudents: "",
    minAge: "",
    maxAge: "",
    leader: "",
    assistants: [],
    image: null,
  });

  useEffect(() => {
    const fetchGroup = async () => {
      // Replace with real API call
      const groupData = {
        groupName: "Math Club",
        groupType: "KG-1",
        groupColor: "#25A0DD",
        maxStudents: 20,
        minAge: 4,
        maxAge: 6,
        leader: "1",
        assistants: ["2", "3"],
        image: null, // or URL of existing image
      };
      setInitialValues(groupData);
      if (groupData.image) setPreviewImage(groupData.image);
    };
    fetchGroup();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: GroupSchema,
    onSubmit: (values) => {
      console.log("Updated group:", values);
      alert("Group updated!");
    },
  });

  const { values, handleChange, setFieldValue, handleSubmit, errors, touched } = formik;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Group</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BASIC */}
        <Section
          title="Basic Information"
          open={sectionsOpen.basic}
          toggle={() => toggleSection("basic")}
          hint="Required"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block">Group Name</label>
              <input
                name="groupName"
                value={values.groupName}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
              {touched.groupName && errors.groupName && (
                <div className="text-sm text-red-500">{errors.groupName}</div>
              )}
            </div>

            <div>
              <label className="mb-1 block">Group Type</label>
              <select
                name="groupType"
                value={values.groupType}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              >
                {GROUP_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block">Group Color</label>
              <input
                type="color"
                name="groupColor"
                value={values.groupColor}
                onChange={handleChange}
                className="h-10 w-20 rounded border"
              />
            </div>

            <div>
              <label className="mb-1 block">Group Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.currentTarget.files[0];
                  setFieldValue("image", f);
                  if (f) setPreviewImage(URL.createObjectURL(f));
                }}
                className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
              {previewImage ? (
                <img
                  src={previewImage}
                  className="mt-3 h-28 w-28 rounded object-cover shadow"
                  alt="Preview"
                />
              ) : (
                <div className="mt-3 flex items-center gap-2 text-gray-500">
                  <FaImage /> No image selected
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* LIMITS */}
        <Section
          title="Limits"
          open={sectionsOpen.limits}
          toggle={() => toggleSection("limits")}
          hint="Optional"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block">Max Students</label>
              <input
                name="maxStudents"
                type="number"
                value={values.maxStudents}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-1 block">Min Age</label>
              <input
                name="minAge"
                type="number"
                value={values.minAge}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-1 block">Max Age</label>
              <input
                name="maxAge"
                type="number"
                value={values.maxAge}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </div>
          </div>
        </Section>

        {/* STAFF */}
        <Section
          title="Staff Assignment"
          open={sectionsOpen.staff}
          toggle={() => toggleSection("staff")}
          hint="Optional"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block">Group Leader</label>
              <select
                name="leader"
                value={values.leader}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              >
                <option value="">— Select —</option>
                {mockStaff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block">Assistants</label>
              <div className="space-y-1">
                {mockStaff.map((s) => (
                  <label key={s.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={values.assistants.includes(String(s.id))}
                      onChange={(e) => {
                        if (e.target.checked)
                          setFieldValue("assistants", [...values.assistants, String(s.id)]);
                        else
                          setFieldValue(
                            "assistants",
                            values.assistants.filter((id) => id !== String(s.id))
                          );
                      }}
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button type="submit" className="rounded bg-green-600 px-5 py-2 text-white">
            Update Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGroup;
