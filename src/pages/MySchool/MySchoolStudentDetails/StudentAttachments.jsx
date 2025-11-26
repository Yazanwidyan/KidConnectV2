import React, { useState } from "react";

const initialAttachments = [
  { id: 1, name: "Art Project.pdf", type: "PDF", uploadedAt: "2025-10-28" },
  { id: 2, name: "Medical Form.jpg", type: "Image", uploadedAt: "2025-10-27" },
  { id: 3, name: "Permission Slip.docx", type: "Document", uploadedAt: "2025-10-26" },
];

const StudentAttachments = () => {
  const [attachments, setAttachments] = useState(initialAttachments);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newAttachment = {
      id: attachments.length + 1,
      name: file.name,
      type: file.type.split("/")[1].toUpperCase(),
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setAttachments([newAttachment, ...attachments]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Student Attachments</h2>
      <input type="file" onChange={handleUpload} style={{ marginBottom: "20px" }} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {attachments.map((att) => (
          <li
            key={att.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <strong>{att.name}</strong> ({att.type}) - <small>{att.uploadedAt}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentAttachments;
