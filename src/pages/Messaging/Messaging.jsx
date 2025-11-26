import React, { useState } from "react";
import { FaEnvelope, FaTrash } from "react-icons/fa";

const initialParentMessages = [
  {
    id: 1,
    student: "Ali Ahmad",
    parent: "Sara Ahmad",
    room: "5A",
    status: "Active",
    message: "Homework reminder",
  },
  {
    id: 2,
    student: "Lina Omar",
    parent: "Omar Khaled",
    room: "4B",
    status: "Active",
    message: "Meeting invitation",
  },
];

const initialStaffMessages = [
  { id: 1, staff: "Mr. Ali", department: "Math", message: "Weekly meeting notes" },
  { id: 2, staff: "Ms. Lina", department: "English", message: "Update on lesson plan" },
];

const Messages = () => {
  const [activeTab, setActiveTab] = useState("parents");
  const [parentMessages, setParentMessages] = useState(initialParentMessages);
  const [staffMessages, setStaffMessages] = useState(initialStaffMessages);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipient: "",
    room: "",
    student: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (activeTab === "parents") {
      setParentMessages([...parentMessages, { id: Date.now(), ...formData, status: "Active" }]);
    } else {
      setStaffMessages([
        ...staffMessages,
        { id: Date.now(), staff: formData.recipient, department: formData.room, message: formData.message },
      ]);
    }
    setFormData({ recipient: "", room: "", student: "", message: "" });
    setModalOpen(false);
  };

  const handleDelete = (id, type) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      if (type === "parents") {
        setParentMessages(parentMessages.filter((m) => m.id !== id));
      } else {
        setStaffMessages(staffMessages.filter((m) => m.id !== id));
      }
    }
  };

  const renderParentMessages = () =>
    parentMessages.length === 0 ? (
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="mb-4 h-16 w-16 rounded-full bg-gray-200"></div>
        <h3 className="mb-2 text-xl font-semibold text-gray-700">Get started with parent messages</h3>
        <p className="max-w-md text-gray-500">
          Communicate with parents with message threads for each child, delete messages sent accidentally, and
          quickly find student threads by filtering above.
        </p>
        <button className="mt-4 text-primary underline" onClick={() => setModalOpen(true)}>
          Send your first message
        </button>
      </div>
    ) : (
      <div className="mt-6 overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Parent</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parentMessages.map((msg) => (
              <tr key={msg.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{msg.student}</td>
                <td className="px-6 py-3">{msg.parent}</td>
                <td className="px-6 py-3">{msg.room}</td>
                <td className="px-6 py-3">{msg.status}</td>
                <td className="px-6 py-3">{msg.message}</td>
                <td className="flex gap-3 px-6 py-3">
                  <button
                    onClick={() => handleDelete(msg.id, "parents")}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  const renderStaffMessages = () =>
    staffMessages.length === 0 ? (
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="mb-4 h-16 w-16 rounded-full bg-gray-200"></div>
        <h3 className="mb-2 text-xl font-semibold text-gray-700">Get started with staff messages</h3>
        <p className="max-w-md text-gray-500">
          Communicate with staff, delete messages sent accidentally, and quickly find messages by filtering
          above.
        </p>
        <button className="mt-4 text-primary underline" onClick={() => setModalOpen(true)}>
          Send your first message
        </button>
      </div>
    ) : (
      <div className="mt-6 overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3">Staff</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMessages.map((msg) => (
              <tr key={msg.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{msg.staff}</td>
                <td className="px-6 py-3">{msg.department}</td>
                <td className="px-6 py-3">{msg.message}</td>
                <td className="flex gap-3 px-6 py-3">
                  <button
                    onClick={() => handleDelete(msg.id, "staff")}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <button className="rounded-lg bg-primary px-4 py-2 text-white" onClick={() => setModalOpen(true)}>
          + New Message
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-6 border-b">
        <button
          className={`pb-2 font-medium ${activeTab === "parents" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
          onClick={() => setActiveTab("parents")}
        >
          Parents
        </button>
        <button
          className={`pb-2 font-medium ${activeTab === "staff" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
          onClick={() => setActiveTab("staff")}
        >
          Staff
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <select className="rounded border px-3 py-2">
          <option>Most Recent</option>
        </select>
        <select className="rounded border px-3 py-2">
          <option>Recipient</option>
        </select>
        <select className="rounded border px-3 py-2">
          <option>Room</option>
        </select>
        <select className="rounded border px-3 py-2">
          <option>Student</option>
        </select>
        <select className="rounded border px-3 py-2">
          <option>Student status</option>
        </select>
      </div>

      {/* Messages List */}
      {activeTab === "parents" ? renderParentMessages() : renderStaffMessages()}

      {/* New Message Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">New Message</h3>
            <form className="flex flex-col gap-3" onSubmit={handleSendMessage}>
              <input
                type="text"
                name="recipient"
                placeholder={activeTab === "parents" ? "Parent Name" : "Staff Name"}
                className="rounded border px-3 py-2"
                value={formData.recipient}
                onChange={handleInputChange}
                required
              />
              {activeTab === "parents" && (
                <>
                  <input
                    type="text"
                    name="room"
                    placeholder="Room"
                    className="rounded border px-3 py-2"
                    value={formData.room}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="student"
                    placeholder="Student Name"
                    className="rounded border px-3 py-2"
                    value={formData.student}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              <textarea
                name="message"
                placeholder="Type your message..."
                className="rounded border px-3 py-2"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded border px-4 py-2 hover:bg-gray-100"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="rounded bg-primary px-4 py-2 text-white hover:bg-blue-600">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
