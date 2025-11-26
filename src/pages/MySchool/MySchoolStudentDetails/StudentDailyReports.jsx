import React, { useState } from "react";

const initialReports = [
  { id: 1, date: "2025-10-28", summary: "Had a great day in class, participated in art activities." },
  { id: 2, date: "2025-10-27", summary: "Was a bit tired, rested during nap time, enjoyed story time." },
  { id: 3, date: "2025-10-26", summary: "Played well with classmates, completed puzzle activity." },
];

const StudentDailyReports = ({ studentName }) => {
  const [reports, setReports] = useState(initialReports);

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h2>{studentName} - Daily Reports</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {reports.map((report) => (
          <li
            key={report.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <strong>{report.date}</strong>
            <p style={{ margin: "5px 0" }}>{report.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDailyReports;
