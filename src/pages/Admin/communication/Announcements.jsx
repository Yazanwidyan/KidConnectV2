import { UsersIcon } from "@heroicons/react/24/outline";
import { MegaphoneIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function Announcements() {
  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    type: "info",
  });

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "School Closed Due to Weather",
      message: "All classes are cancelled tomorrow due to severe weather conditions.",
      type: "urgent",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      message: "Conferences will be held next Thursday. Please book your time slots.",
      type: "event",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Weekly Newsletter Available",
      message: "Check out this week's updates and classroom news.",
      type: "info",
      time: "2 days ago",
    },
  ]);

  const typeStyles = {
    urgent: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
    event: "bg-green-100 text-green-700 border-green-300",
  };

  const addAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.message.trim()) return;

    setAnnouncements((prev) => [
      {
        id: prev.length + 1,
        ...newAnnouncement,
        time: "Just now",
      },
      ...prev,
    ]);

    setShowModal(false);
    setNewAnnouncement({ title: "", message: "", type: "info" });
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-end justify-between">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-black"> Announcements</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <UsersIcon className="h-4 w-4 stroke-2" /> <h5>Communications</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary"> Announcements</span>
              </li>
            </ol>
          </nav>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <PlusCircleIcon className="h-5 w-5 stroke-2" /> New Announcement
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {announcements.map((a) => (
          <div key={a.id} className="rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{a.title}</h2>
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${typeStyles[a.type]}`}>
                {a.type === "urgent" ? "Urgent" : a.type.charAt(0).toUpperCase() + a.type.slice(1)}
              </span>
            </div>

            <p className="text-sm text-gray-700">{a.message}</p>

            <p className="mt-3 text-xs text-gray-400">{a.time}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[450px] rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create Announcement</h2>
              <button onClick={() => setShowModal(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Title */}
            <input
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              placeholder="Announcement title"
              className="mb-3 w-full rounded-md border px-3 py-2 text-sm"
            />

            {/* Message */}
            <textarea
              value={newAnnouncement.message}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
              rows={4}
              placeholder="Write your announcement..."
              className="mb-3 w-full rounded-md border px-3 py-2 text-sm"
            ></textarea>

            {/* Type */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600">Type</label>
              <select
                value={newAnnouncement.type}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="info">Info</option>
                <option value="urgent">Urgent</option>
                <option value="event">Event</option>
              </select>
            </div>

            <button
              onClick={addAnnouncement}
              className="w-full rounded-md bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
            >
              Post Announcement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
