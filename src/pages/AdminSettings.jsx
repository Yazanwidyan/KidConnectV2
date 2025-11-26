import React, { useState } from "react";

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@kidconnect.com",
    password: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved profile:", profile);
    // later connect to backend/Firebase
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-primary mb-6 text-2xl font-semibold sm:text-3xl">Admin Settings</h2>

      <div className="space-y-4 rounded-lg bg-white p-4 shadow-md sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label className="w-32 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="flex-1 rounded border px-3 py-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label className="w-32 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="flex-1 rounded border px-3 py-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label className="w-32 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="flex-1 rounded border px-3 py-2"
            placeholder="Enter new password"
          />
        </div>

        <button onClick={handleSave} className="bg-primary rounded px-6 py-2 text-white hover:bg-blue-600">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
