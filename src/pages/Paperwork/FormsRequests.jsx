import React, { useState } from "react";

import { usePaperwork } from "../../context/PaperworkContext";

export default function FormsRequests() {
  const { forms, addForm, updateForm, deleteForm } = usePaperwork();

  const [search, setSearch] = useState("");
  const [showReviewOnly, setShowReviewOnly] = useState(false);
  const [formStatusFilter, setFormStatusFilter] = useState("");

  // For add/edit form
  const [editingForm, setEditingForm] = useState(null);
  const [formData, setFormData] = useState({ form: "", type: "", reviews: 0, due: "", status: "Unshared" });

  // Filter and search forms
  const filteredForms = forms.filter((f) => {
    if (showReviewOnly && f.reviews === 0) return false;
    if (formStatusFilter && formStatusFilter !== "All" && f.status !== formStatusFilter) return false;
    if (!f.form.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleEdit = (form) => {
    setEditingForm(form.id);
    setFormData(form);
  };

  const handleCancelEdit = () => {
    setEditingForm(null);
    setFormData({ form: "", type: "", reviews: 0, due: "", status: "Unshared" });
  };

  const handleSave = () => {
    if (!formData.form.trim() || !formData.type.trim()) {
      alert("Please fill the form name and type");
      return;
    }
    if (editingForm) {
      updateForm(editingForm, formData);
    } else {
      addForm(formData);
    }
    handleCancelEdit();
  };

  return (
    <div className="w-full p-6">
      <h2 className="mb-2 text-2xl font-semibold">Forms & requests</h2>

      <div className="mb-4 mt-6 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          className="w-60 rounded-lg border px-3 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-40 rounded-lg border px-3 py-2 text-sm"
          value={formStatusFilter}
          onChange={(e) => setFormStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Unshared">Unshared</option>
          <option value="Shared">Shared</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={showReviewOnly} onChange={() => setShowReviewOnly((v) => !v)} />{" "}
          Show only forms that need review
        </label>
      </div>

      {/* Form Add/Edit */}
      <div className="mb-4 rounded border bg-gray-50 p-4 shadow">
        <h3 className="mb-3 text-lg font-semibold">{editingForm ? "Edit Form" : "Add New Form"}</h3>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Form Name"
            className="rounded border px-3 py-2"
            value={formData.form}
            onChange={(e) => setFormData({ ...formData, form: e.target.value })}
          />
          <input
            type="text"
            placeholder="Type (e.g. Form, Document request)"
            className="rounded border px-3 py-2"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <input
            type="number"
            placeholder="Reviews Needed"
            className="w-32 rounded border px-3 py-2"
            value={formData.reviews}
            min={0}
            onChange={(e) => setFormData({ ...formData, reviews: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Due (e.g. Nov 24, 2025)"
            className="rounded border px-3 py-2"
            value={formData.due}
            onChange={(e) => setFormData({ ...formData, due: e.target.value })}
          />
          <select
            className="rounded border px-3 py-2"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Unshared">Unshared</option>
            <option value="Shared">Shared</option>
          </select>
          <div className="flex gap-2">
            <button
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
            {editingForm && (
              <button className="rounded border px-4 py-2 hover:bg-gray-200" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="px-4 py-3">Form</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Reviews needed</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No forms found.
                </td>
              </tr>
            )}
            {filteredForms?.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-50"
                title="Click to edit"
                onClick={() => handleEdit(row)}
              >
                <td className="cursor-pointer px-4 py-3 text-blue-600">{row.form}</td>
                <td className="px-4 py-3">{row.type}</td>
                <td className="px-4 py-3">{row.reviews}</td>
                <td className="px-4 py-3">{row.due}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs shadow ${
                      row.status === "Shared" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td
                  className="cursor-pointer px-4 py-3 text-red-600 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Delete this form?")) deleteForm(row.id);
                  }}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
