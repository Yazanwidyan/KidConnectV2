// pages/admin/groups/CreateGroup.jsx

import { ChevronDownIcon, ChevronUpIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaImage } from "react-icons/fa";
import * as Yup from "yup";

/* -------------------------
  Mock staff
------------------------- */
const mockStaff = [
  { id: 1, name: "Mr. Ahmed" },
  { id: 2, name: "Ms. Lina" },
  { id: 3, name: "Mr. Omar" },
  { id: 4, name: "Ms. Sara" },
];

const GROUP_TYPES = ["Infants", "Toddlers", "Early Preschool", "Pre-K", "KG-1", "KG-2", "Other"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* -------------------------
  Validation
------------------------- */
const GroupSchema = Yup.object().shape({
  groupName: Yup.string().required("Group name is required"),
  groupType: Yup.string().required("Group type is required"),
  groupColor: Yup.string().required("Group color is required"),
  maxStudents: Yup.number().min(1).nullable(),
  minAge: Yup.number().min(0).nullable(),
  maxAge: Yup.number().min(Yup.ref("minAge"), "Max age must be >= min age").nullable(),
  startTime: Yup.string().when("days", {
    is: (days) => Array.isArray(days) && days.length > 0,
    then: Yup.string().required("Start time required if days selected"),
  }),
  endTime: Yup.string().when("days", {
    is: (days) => Array.isArray(days) && days.length > 0,
    then: Yup.string().required("End time required if days selected"),
  }),
});

/* -------------------------
  AccordionCard Component
------------------------- */
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
        <ChevronUpIcon className="h-5 w-5 stroke-[2]" />
      ) : (
        <ChevronDownIcon className="h-5 w-5 stroke-[2]" />
      )}
    </button>
    {open && <div className="px-6 pb-4">{children}</div>}
  </div>
);

/* -------------------------
  Main Component
------------------------- */
const CreateGroup = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const [sectionsOpen, setSectionsOpen] = useState({
    basic: true,
    limits: false,
    staff: false,
    media: false,
  });

  const toggleSection = (key) => setSectionsOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const formik = useFormik({
    initialValues: {
      groupName: "",
      groupType: GROUP_TYPES[0],
      groupColor: "#3A49F9",
      maxStudents: "",
      minAge: "",
      maxAge: "",
      leader: "",
      assistants: [],
      image: null,
    },
    validationSchema: GroupSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
      };

      console.log("Create Group payload:", payload);
      alert("Group created (see console)");
    },
  });

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = formik;

  return (
    <div className="w-full p-6">
      <div className="mb-6" aria-label="Breadcrumb">
        <h1 className="text-2xl font-bold text-primaryFont">Create New Group</h1>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li className="inline-flex items-center">
              <div className="flex items-center text-sm font-semibold text-black">
                <UserGroupIcon className="h-4 w-4 stroke-[2]" /> <h5>Groups</h5>
              </div>
            </li>
            <span className="text-xs text-gray-500">/</span>
            <li aria-current="page">
              <span className="text-sm font-semibold text-primary">Create New Group</span>
            </li>
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BASIC */}
        <AccordionCard
          title="Basic Information"
          open={sectionsOpen.basic}
          toggle={() => toggleSection("basic")}
          hint="Required"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div>
                <label className="mb-1 block">Group Name</label>
                <input
                  name="groupName"
                  value={values.groupName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
                />
                {touched.groupName && errors.groupName && (
                  <div className="text-sm text-red-500">{errors.groupName}</div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-base">Group Type</label>
                <select
                  name="groupType"
                  value={values.groupType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
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
                  className="h-14 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-medium text-gray-700">Group Image</label>

              {/* Upload Box */}
              <label
                className={`flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 ${previewImage ? "py-8" : "py-16"} text-center transition hover:border-primary hover:bg-primary/5`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.currentTarget.files[0];
                    setFieldValue("image", f);
                    if (f) setPreviewImage(URL.createObjectURL(f));
                  }}
                  className="hidden"
                />

                {!previewImage ? (
                  <div className="flex flex-col items-center text-gray-500">
                    <FaImage className="mb-2 text-4xl opacity-60" />
                    <p className="text-sm">Click to upload image</p>
                    <p className="text-xs opacity-70">(JPG, PNG, SVG…)</p>
                  </div>
                ) : (
                  <img
                    src={previewImage}
                    className="h-40 w-40 rounded-lg object-cover shadow-md transition duration-300"
                  />
                )}
              </label>
            </div>
          </div>
        </AccordionCard>

        {/* LIMITS */}
        <AccordionCard
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
                className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-1 block">Min Age</label>
              <input
                name="minAge"
                type="number"
                value={values.minAge}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-1 block">Max Age</label>
              <input
                name="maxAge"
                type="number"
                value={values.maxAge}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </div>
          </div>
        </AccordionCard>

        {/* STAFF */}
        <AccordionCard
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
                className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
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
        </AccordionCard>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button type="submit" className="rounded border border-primary bg-primary px-5 py-2 text-white">
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
