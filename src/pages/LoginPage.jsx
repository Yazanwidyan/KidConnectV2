import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES.ADMIN); // For testing
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    // Login using AuthContext (simulate API result)
    login(role);

    // Redirect based on role
    if (role === ROLES.ADMIN) navigate("/admin/dashboard");
    if (role === ROLES.TEACHER) navigate("/teacher/dashboard");
    if (role === ROLES.PARENT) navigate("/parent/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>

        {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Temporary role selector (remove later when API ready) */}
          <div>
            <label className="mb-1 block text-sm font-medium">Select Role (for testing)</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border px-4 py-2"
            >
              <option value={ROLES.ADMIN}>Admin</option>
              <option value={ROLES.TEACHER}>Teacher</option>
              <option value={ROLES.PARENT}>Parent</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
