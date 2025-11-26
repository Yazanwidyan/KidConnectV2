import React, { useState } from "react";

import { usePaperwork } from "../../context/PaperworkContext";

export default function Signups() {
  const { signups, addSignup, updateSignup, deleteSignup } = usePaperwork();

  const [search, setSearch] = useState("");
  const [filteredSignups, setFilteredSignups] = useState(signups);
  const [editingSignup, setEditingSignup] = useState(null);

  const [signupData, setSignupData] = useState({
    name: "",
    dates: "",
    people: "0/0",
    status: "Open",
    creator: "",
  });

  React.useEffect(() => {
    // Filter signups on search
    setFilteredSignups(signups.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())));
  }, [search, signups]);

  const handleEdit = (signup) => {
    setEditingSignup(signup.id);
    setSignupData(signup);
  };

  const handleCancelEdit = () => {
    setEditingSignup(null);
    setSignupData({ name: "", dates: "", people: "0/0", status: "Open", creator: "" });
  };

  const handleSave = () => {
    if (!signupData.name.trim() || !signupData.creator.trim()) {
      alert("Please fill the name and creator fields");
      return;
    }
    if (editingSignup) {
      updateSignup(editingSignup, signupData);
    } else {
      addSignup(signupData);
    }
    handleCancelEdit();
  };

  return (
    <div className="p-6 font-sans">
      {/* Title Row */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sign-ups</h2>

        <button
          onClick={() => {
            setEditingSignup(null);
            setSignupData({ name: "", dates: "", people: "0/0", status: "Open", creator: "" });
          }}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Create new
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 w-full max-w-md rounded border px-3 py-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add/Edit Form */}
      <div className="mb-6 rounded border bg-gray-50 p-4 shadow">
        <h3 className="mb-3 text-lg font-semibold">{editingSignup ? "Edit Signup" : "Add New Signup"}</h3>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Name"
            className="rounded border px-3 py-2"
            value={signupData.name}
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Dates (e.g. Mon, Jan 26)"
            className="rounded border px-3 py-2"
            value={signupData.dates}
            onChange={(e) => setSignupData({ ...signupData, dates: e.target.value })}
          />
          <input
            type="text"
            placeholder="# of people (e.g. 0/10)"
            className="rounded border px-3 py-2"
            value={signupData.people}
            onChange={(e) => setSignupData({ ...signupData, people: e.target.value })}
          />
          <select
            className="rounded border px-3 py-2"
            value={signupData.status}
            onChange={(e) => setSignupData({ ...signupData, status: e.target.value })}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <input
            type="text"
            placeholder="Created by"
            className="rounded border px-3 py-2"
            value={signupData.creator}
            onChange={(e) => setSignupData({ ...signupData, creator: e.target.value })}
          />

          <div className="flex gap-2">
            <button
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
            {editingSignup && (
              <button className="rounded border px-4 py-2 hover:bg-gray-200" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Dates</th>
              <th className="px-6 py-3"># of people</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created by</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSignups.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No sign-ups found.
                </td>
              </tr>
            )}

            {filteredSignups.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td
                  className="cursor-pointer px-6 py-3 text-blue-600 hover:underline"
                  onClick={() => handleEdit(item)}
                >
                  {item.name}
                </td>

                <td className="px-6 py-3 text-sm text-gray-600">{item.dates}</td>

                <td className="px-6 py-3">{item.people}</td>

                <td className="px-6 py-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-3 text-sm text-gray-700">{item.creator}</td>

                <td className="flex gap-4 px-6 py-3 text-red-600">
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this signup?")) deleteSignup(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
