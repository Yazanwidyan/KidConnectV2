import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";

const tabs = [
  "Profile Fields",
  "Enrollment Rules",
  "Attendance",
  "Behavior",
  "Health",
  "Media & Privacy",
  "Transportation",
  "Promotion",
  "Parent Requirements",
];

const StudentConfigurations = () => {
  const [activeTab, setActiveTab] = useState("Profile Fields");

  const Section = ({ title, children }) => (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div className="w-full p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Student Configurations</h1>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* ————————————————————————
            PROFILE FIELDS
        ———————————————————————— */}
        {activeTab === "Profile Fields" && (
          <>
            <Section title="Basic Student Fields">
              <input className="input" placeholder="Student ID Prefix" />
              <input className="input" placeholder="Default Nationality" />
              <input className="input" placeholder="Default Grade" />
              <textarea className="input" placeholder="Custom Student Fields (JSON or List)"></textarea>

              <div className="flex items-center justify-between">
                <span>Enable Required Photo Upload</span>
                <Switch checked={true} className="switch" />
              </div>
            </Section>
            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            ENROLLMENT RULES
        ———————————————————————— */}
        {activeTab === "Enrollment Rules" && (
          <>
            <Section title="Enrollment Restrictions">
              <input className="input" placeholder="Minimum Age" type="number" />
              <input className="input" placeholder="Maximum Age" type="number" />
              <textarea className="input" placeholder="Required Documents"></textarea>

              <div className="flex items-center justify-between">
                <span>Automatically Assign Group on Enrollment</span>
                <Switch checked={false} className="switch" />
              </div>
            </Section>
            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            ATTENDANCE
        ———————————————————————— */}
        {activeTab === "Attendance" && (
          <>
            <Section title="Attendance Rules">
              <input className="input" placeholder="Late Mark Time (HH:MM)" type="time" />
              <input className="input" placeholder="Absent After (HH:MM)" type="time" />
              <input className="input" placeholder="Max Allowed Absences" type="number" />

              <div className="flex items-center justify-between">
                <span>Enable Parent Attendance Alerts</span>
                <Switch checked={true} className="switch" />
              </div>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            BEHAVIOR
        ———————————————————————— */}
        {activeTab === "Behavior" && (
          <>
            <Section title="Behavior & Discipline Rules">
              <textarea className="input" placeholder="Default Behavior Categories (comma separated)" />
              <textarea className="input" placeholder="Default Penalties (JSON/List)" />
              <div className="flex items-center justify-between">
                <span>Enable Points System</span>
                <Switch checked={true} className="switch" />
              </div>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            HEALTH
        ———————————————————————— */}
        {activeTab === "Health" && (
          <>
            <Section title="Health & Medical Requirements">
              <textarea className="input" placeholder="Immunization Requirements"></textarea>
              <textarea className="input" placeholder="Chronic Conditions List"></textarea>
              <input className="input" placeholder="Emergency Contact Count Required" type="number" />

              <div className="flex items-center justify-between">
                <span>Require Medical Report</span>
                <Switch checked={false} className="switch" />
              </div>
            </Section>
            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            MEDIA & PRIVACY
        ———————————————————————— */}
        {activeTab === "Media & Privacy" && (
          <>
            <Section title="Photo/Video Permissions">
              <div className="flex items-center justify-between">
                <span>Allow Student Photos</span>
                <Switch checked={true} className="switch" />
              </div>
              <div className="flex items-center justify-between">
                <span>Allow Student Videos</span>
                <Switch checked={false} className="switch" />
              </div>

              <textarea className="input" placeholder="Default Privacy Notes"></textarea>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            TRANSPORTATION
        ———————————————————————— */}
        {activeTab === "Transportation" && (
          <>
            <Section title="Transportation Settings">
              <input className="input" placeholder="Max Bus Capacity" type="number" />
              <input className="input" placeholder="Bus Shift Options (comma separated)" />
              <input className="input" placeholder="Default Bus Fee" type="number" />

              <div className="flex items-center justify-between">
                <span>Require Pickup Guardian ID</span>
                <Switch checked={true} className="switch" />
              </div>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            PROMOTION
        ———————————————————————— */}
        {activeTab === "Promotion" && (
          <>
            <Section title="Promotion Rules">
              <input className="input" placeholder="Passing Grade %" type="number" />
              <input className="input" placeholder="Max Repeat Years" type="number" />
              <textarea className="input" placeholder="Custom Promotion Rules"></textarea>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            PARENT REQUIREMENTS
        ———————————————————————— */}
        {activeTab === "Parent Requirements" && (
          <>
            <Section title="Parent/Guardian Requirements">
              <input className="input" placeholder="Minimum Parents Required" type="number" />
              <textarea className="input" placeholder="Mandatory Parent Fields (comma separated)" />
              <div className="flex items-center justify-between">
                <span>Require ID Upload</span>
                <Switch checked={true} className="switch" />
              </div>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentConfigurations;

/* ————————————————————————
   TAILWIND UTILITY CLASSES
———————————————————————— */
const styles = `
.input {
  @apply w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500;
}
.btn-save {
  @apply flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white shadow hover:bg-blue-700;
}
.switch {
  @apply h-6 w-12 rounded-full bg-blue-600 transition;
}
`;
