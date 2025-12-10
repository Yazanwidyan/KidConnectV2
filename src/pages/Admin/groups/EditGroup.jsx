// pages/admin/groups/EditGroup.jsx

import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";

import AssignStaffModal from "./modals/AssignStaffModal";

const GROUP_TYPES = ["Infants", "Toddlers", "Early Preschool", "Pre-K", "KG-1", "KG-2", "Other"];

const GroupSchema = Yup.object().shape({
  groupName: Yup.string().required("Group name is required"),
  groupType: Yup.string().required("Group type is required"),
  groupColor: Yup.string().required("Group color is required"),
  maxStudents: Yup.number().min(1).nullable(),
  minAge: Yup.number().min(0).nullable(),
  maxAge: Yup.number().min(Yup.ref("minAge"), "Max age must be >= min age").nullable(),
});

const AccordionCard = ({ title, open, toggle, children, hint }) => (
  <div className="mb-4 rounded-lg bg-white shadow-lg">
    <button
      type="button"
      onClick={toggle}
      className="flex w-full items-center justify-between px-6 py-4 text-left"
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {hint && <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">{hint}</span>}
      </div>
      {open ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
    </button>
    {open && <div className="px-6 pb-4">{children}</div>}
  </div>
);

export default function EditGroup() {
  const { id } = useParams();
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sectionsOpen, setSectionsOpen] = useState({
    basic: true,
    limits: false,
    staff: false,
    media: false,
  });

  const toggleSection = (key) => {
    setSectionsOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ❗ ALWAYS CALL HOOKS AT TOP LEVEL
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
    },
    validationSchema: GroupSchema,
    onSubmit: (values) => {
      console.log("Updated Group:", values);
      alert("Group updated (see console)");
    },
  });

  // Load group data once
  useEffect(() => {
    async function fetchGroup() {
      // Simulate API
      const data = {
        groupName: "Rainbow Kids",
        groupType: "KG-1",
        groupColor: "#FF5733",
        maxStudents: 20,
        minAge: 4,
        maxAge: 6,
      };

      // ❗ USE formik.setValues – NOT conditionally wrapping the hook
      formik.setValues(data);
      setLoading(false);
    }

    fetchGroup();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-lg font-semibold">Loading group data...</div>;
  }

  const { values, handleChange, handleSubmit, errors, touched } = formik;

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center gap-2">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-black">Edit Group</h1>
          <Link
            to="/admin/groups"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeftIcon className="h-5 w-5 stroke-2" /> Back to Groups
          </Link>
        </div>
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
            <div>
              <label className="mb-1 block">Group Name</label>
              <input
                name="groupName"
                value={values.groupName}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-3"
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
                className="w-full rounded-lg border px-3 py-3"
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
                className="h-14 w-full rounded-lg border"
              />
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
                className="w-full rounded-lg border px-3 py-3"
              />
            </div>

            <div>
              <label className="mb-1 block">Min Age</label>
              <input
                name="minAge"
                type="number"
                value={values.minAge}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-3"
              />
            </div>

            <div>
              <label className="mb-1 block">Max Age</label>
              <input
                name="maxAge"
                type="number"
                value={values.maxAge}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-3"
              />
            </div>
          </div>
        </AccordionCard>

        {/* STAFF */}
        <AccordionCard
          title="Staff Assignment"
          open={sectionsOpen.staff}
          toggle={() => toggleSection("staff")}
        >
          <div className="mb-4 flex items-center justify-between p-6">
            <button
              type="button"
              className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-white"
              onClick={() => setShowStaffModal(true)}
            >
              <UserPlusIcon className="h-5 w-5" /> Assign Staff
            </button>
          </div>
        </AccordionCard>

        <div className="flex justify-end">
          <button type="submit" className="rounded bg-primary px-5 py-2 text-white">
            Save Changes
          </button>
        </div>
      </form>

      {showStaffModal && <AssignStaffModal onClose={() => setShowStaffModal(false)} />}
    </div>
  );
}
