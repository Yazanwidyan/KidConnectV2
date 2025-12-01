import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md rounded-lg bg-white p-10 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-red-600">403</h1>

        <h2 className="mb-2 text-xl font-semibold">Unauthorized Access</h2>

        <p className="mb-6 text-gray-600">You don’t have permission to view this page.</p>

        <Link
          to="/login"
          className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
