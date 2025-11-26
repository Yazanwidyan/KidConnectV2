import React, { useState } from "react";

const StudentFeed = ({ studentName }) => {
  // Example feed data for a single student
  const [feed, setFeed] = useState([
    { id: 1, activity: "Completed art project", time: "10 mins ago" },
    { id: 2, activity: "Had lunch", time: "1 hour ago" },
    { id: 3, activity: "Played in the playground", time: "2 hours ago" },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{studentName} Feed</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {feed.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            {item.activity} <br />
            <small style={{ color: "#666" }}>{item.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentFeed;
