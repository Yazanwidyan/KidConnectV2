import { Switch } from "@headlessui/react";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";

const tabs = [
  "School Info",
  "Working Hours",
  "Admissions",
  "Groups",
  "Financial",
  "Communication",
  "Security",
  "System Defaults",
  "Backup",
  "Integrations",
];

const GeneralConfigurations = () => {
  const [activeTab, setActiveTab] = useState("School Info");

  const handleSave = () => {
    alert("Settings Saved!");
  };

  const Section = ({ title, children }) => (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );

  return (
    <div className="w-full p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">General Configurations</h1>

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
            SCHOOL INFO
        ———————————————————————— */}
        {activeTab === "School Info" && (
          <>
            <Section title="School Details">
              <input type="text" placeholder="School Name" className="input" />
              <input type="text" placeholder="School Email" className="input" />
              <input type="text" placeholder="Phone Number" className="input" />
              <input type="text" placeholder="Address" className="input" />
              <input type="text" placeholder="Website URL" className="input" />
              <input type="text" placeholder="Academic Year" className="input" />
              <div>
                <label className="text-sm font-semibold text-gray-600">Upload Logo</label>
                <input type="file" className="mt-1 w-full" />
              </div>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            WORKING HOURS
        ———————————————————————— */}
        {activeTab === "Working Hours" && (
          <>
            <Section title="School Working Hours">
              <input type="time" className="input" placeholder="Opening Time" />
              <input type="time" className="input" placeholder="Closing Time" />
              <input type="text" className="input" placeholder="School Days (e.g. Sun–Thu)" />
              <textarea className="input" placeholder="Holiday Dates"></textarea>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            ADMISSIONS
        ———————————————————————— */}
        {activeTab === "Admissions" && (
          <>
            <Section title="General Admission Settings">
              <input type="number" className="input" placeholder="Application Fee" />
              <input type="number" className="input" placeholder="Minimum Age" />
              <input type="number" className="input" placeholder="Maximum Age" />
              <textarea className="input" placeholder="Required Documents (comma-separated)" />

              <div className="flex items-center justify-between">
                <span className="font-medium">Enable Parent Registration Link</span>
                <Switch checked={true} className="switch" />
              </div>
              <textarea className="input" placeholder="Registration Success Message"></textarea>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            GROUPS
        ———————————————————————— */}
        {activeTab === "Groups" && (
          <>
            <Section title="Group Defaults">
              <input type="number" className="input" placeholder="Default Group Capacity" />
              <input type="number" className="input" placeholder="Default Group Age" />
              <input type="text" className="input" placeholder="Default Teacher (if any)" />

              <div className="flex items-center justify-between">
                <span className="font-medium">Auto-Assign After Approval</span>
                <Switch checked={false} className="switch" />
              </div>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            FINANCIAL
        ———————————————————————— */}
        {activeTab === "Financial" && (
          <>
            <Section title="School Financial Setup">
              <input type="text" className="input" placeholder="Currency (USD, AED...)" />
              <input type="number" className="input" placeholder="VAT / Tax %" />
              <input type="number" className="input" placeholder="Registration Fee" />
              <input type="number" className="input" placeholder="Monthly Tuition Fee" />
              <input type="number" className="input" placeholder="Transport Fee" />
              <textarea className="input" placeholder="Discount Rules (Sibling, Early Payment...)"></textarea>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            COMMUNICATION
        ———————————————————————— */}
        {activeTab === "Communication" && (
          <>
            <Section title="Email & SMS Templates">
              <textarea className="input" placeholder="Approval Email Template"></textarea>
              <textarea className="input" placeholder="Rejection Email Template"></textarea>
              <textarea className="input" placeholder="Waitlist Email Template"></textarea>
              <textarea className="input" placeholder="Payment Reminder Template"></textarea>

              <div className="flex items-center justify-between">
                <span>Enable Auto Emails</span>
                <Switch checked={true} className="switch" />
              </div>

              <div className="flex items-center justify-between">
                <span>Enable SMS Notifications</span>
                <Switch checked={false} className="switch" />
              </div>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            SECURITY
        ———————————————————————— */}
        {activeTab === "Security" && (
          <>
            <Section title="Roles & Permissions">
              <input type="text" className="input" placeholder="Admin Role Settings" />
              <input type="text" className="input" placeholder="Teacher Permissions" />
              <input type="text" className="input" placeholder="Accountant Permissions" />
              <div className="flex items-center justify-between">
                <span>Enable Two-Factor Authentication</span>
                <Switch checked={false} className="switch" />
              </div>
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            SYSTEM DEFAULTS
        ———————————————————————— */}
        {activeTab === "System Defaults" && (
          <>
            <Section title="System Defaults">
              <input type="text" className="input" placeholder="Default Language" />
              <input type="text" className="input" placeholder="Timezone" />
              <input type="text" className="input" placeholder="Date Format" />
              <input type="text" className="input" placeholder="Student ID Prefix" />
              <input type="number" className="input" placeholder="Parent Invitation Code Length" />
            </Section>

            <button onClick={handleSave} className="btn-save">
              <FaSave /> Save
            </button>
          </>
        )}

        {/* ————————————————————————
            BACKUP
        ———————————————————————— */}
        {activeTab === "Backup" && (
          <>
            <Section title="Backup & Data Management">
              <button className="rounded bg-blue-600 px-4 py-2 text-white">Download Full Backup</button>
              <button className="rounded bg-gray-600 px-4 py-2 text-white">Export All Students</button>
              <button className="rounded bg-red-600 px-4 py-2 text-white">Archive Inactive Students</button>
            </Section>
          </>
        )}

        {/* ————————————————————————
            INTEGRATIONS
        ———————————————————————— */}
        {activeTab === "Integrations" && (
          <>
            <Section title="External Integrations">
              <input type="text" className="input" placeholder="Payment Gateway (Stripe Key)" />
              <input type="text" className="input" placeholder="SMS Provider API Key" />
              <input type="text" className="input" placeholder="Google Calendar Integration" />
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

export default GeneralConfigurations;

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
