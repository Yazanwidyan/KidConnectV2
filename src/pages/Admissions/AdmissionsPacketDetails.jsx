import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAdmissions } from "../../context/AdmissionsContext";
import { usePaperwork } from "../../context/PaperworkContext";

export default function AdmissionsPacketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { packets } = useAdmissions();
  const { forms } = usePaperwork();

  const [tab, setTab] = useState("submissions");

  const packet = packets.find((p) => p.id === id);

  if (!packet) {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-xl font-semibold">Packet Not Found</h1>
        <button
          onClick={() => navigate(-1)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ---- SELECTED FORMS ----
  const selectedForms = forms.filter((f) => packet.formIds?.includes(f.id));

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* ---- Packet Header ---- */}
      <h1 className="mb-4 text-3xl font-bold">{packet.name}</h1>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <strong>Total Students:</strong> {packet.students}
        </div>
        <div>
          <strong>Due Date:</strong> {packet.due || "—"}
        </div>
        <div>
          <strong>Fee:</strong> {packet.fee === 0 ? "None" : `$${packet.fee}`}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            className={`rounded-full px-3 py-1 text-xs shadow ${
              packet.status === "Active"
                ? "bg-blue-100 text-blue-600"
                : packet.status === "Draft"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-300 text-gray-500"
            }`}
          >
            {packet.status}
          </span>
        </div>
      </div>

      {/* ---- Tabs ---- */}
      <div className="mb-6 border-b">
        <nav className="flex gap-6">
          {["submissions", "form", "settings"].map((t) => (
            <button
              key={t}
              className={`pb-2 text-sm capitalize ${
                tab === t
                  ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      {/* ---- Tab Content ---- */}
      <div>
        {tab === "submissions" && (
          <div>
            <h2 className="mb-3 text-xl font-semibold">Submissions</h2>
            <p className="text-gray-600">Student submissions will appear here.</p>
          </div>
        )}

        {tab === "form" && (
          <div>
            <h2 className="mb-3 text-xl font-semibold">Selected Forms</h2>

            {/* If no selected forms */}
            {selectedForms.length === 0 && <p className="text-gray-600">No forms assigned to this packet.</p>}

            <div className="mt-3 space-y-3">
              {selectedForms.map((form) => (
                <div key={form.id} className="rounded border bg-gray-50 p-3 shadow-sm">
                  <h4 className="font-semibold">{form.name}</h4>

                  {/* Optional: show fields */}
                  {form.fields ? (
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                      {form.fields.map((field) => (
                        <li key={field.id}>{field.label}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No fields available.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <h2 className="mb-3 text-xl font-semibold">Packet Settings</h2>
            <p className="text-gray-600">Settings appear here.</p>
          </div>
        )}
      </div>

      {/* ---- Back Button ---- */}
      <button onClick={() => navigate(-1)} className="mt-10 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">
        Back
      </button>
    </div>
  );
}
