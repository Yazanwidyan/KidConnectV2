import { useParams } from "react-router-dom";

import { useStaff } from "../../context/StaffContext";

export default function StaffDetails() {
  const { id } = useParams();
  const { staff } = useStaff();

  const s = staff.find((x) => x.id == id);

  if (!s) return <p>Staff not found</p>;

  return (
    <div className="rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-xl font-bold">{s.name}</h1>

      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Email:</strong> {s.email}
        </p>
        <p>
          <strong>Phone:</strong> {s.phone}
        </p>
        <p>
          <strong>Role:</strong> {s.role}
        </p>
        <p>
          <strong>Status:</strong> {s.status}
        </p>
        <p>
          <strong>Department:</strong> {s.department}
        </p>
        <p>
          <strong>Hourly Rate:</strong> ${s.hourlyRate}
        </p>
      </div>
    </div>
  );
}
