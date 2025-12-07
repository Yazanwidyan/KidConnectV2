import React, { useState } from "react";

export default function AdminChat() {
  const [activeTab, setActiveTab] = useState("Parents");
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  const parents = [
    {
      id: 1,
      name: "Alex Demo",
      msg: "Reminder: music program tomorrow",
      unread: false,
      avatar: "/avatar1.png",
    },
    {
      id: 2,
      name: "Noah Demo",
      msg: "Reminder: music program tomorrow",
      unread: false,
      avatar: "/avatar2.png",
    },
    {
      id: 3,
      name: "Jayden Demo",
      msg: "Reminder: music program tomorrow",
      unread: true,
      avatar: "/avatar3.png",
    },
    {
      id: 4,
      name: "Maria Demo",
      msg: "Reminder: music program tomorrow",
      unread: false,
      avatar: "/avatar4.png",
    },
  ];

  const staff = [
    { id: 1, name: "Mr. Lee", msg: "Weekly schedule updated", unread: false, avatar: "/avatar5.png" },
    { id: 2, name: "Ms. Carter", msg: "Field trip approval needed", unread: true, avatar: "/avatar6.png" },
  ];

  const list = activeTab === "Parents" ? parents : staff;

  const [chatHistory, setChatHistory] = useState({});

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;
    setChatHistory((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), { from: "Admin", text: message }],
    }));
    setMessage("");
  };

  return (
    <div className="flex min-h-[calc(100vh-130px)] gap-4 overflow-hidden p-6">
      {/* LEFT PANEL — COMPACT LIST */}
      <div className="flex w-[32%] flex-col rounded-lg border-r bg-white px-5 py-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Messages</h1>

        {/* Tabs */}
        <div className="mb-4 flex gap-6 border-b pb-1">
          {["Parents", "Staff"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-semibold ${
                activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="mb-4 flex gap-3">
          <select className="w-28 rounded-lg border px-2 py-1 text-xs text-gray-600">
            <option>Recent</option>
            <option>Oldest</option>
          </select>

          <select className="w-24 rounded-lg border px-2 py-1 text-xs text-gray-600">
            <option>Room</option>
          </select>

          <select className="w-24 rounded-lg border px-2 py-1 text-xs text-gray-600">
            <option>Student</option>
          </select>
        </div>

        {/* MESSAGE LIST (Compact) */}
        <div className="flex flex-col overflow-y-auto rounded-xl">
          {list.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveChat(item)}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-gray-50 ${
                activeChat?.id === item.id ? "bg-blue-50" : ""
              }`}
            >
              <input type="checkbox" className="h-3 w-3" />

              {item.unread && <div className="h-2 w-2 rounded-full bg-green-500"></div>}

              <img src={item.avatar} className="h-8 w-8 rounded-full object-cover" alt="avatar" />

              <div className="w-full">
                <p className="font-semibold leading-tight">{item.name}</p>
                <p className="truncate text-xs leading-tight text-gray-500">{item.msg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — CHAT WINDOW */}
      <div className="flex flex-1 flex-col rounded-lg bg-white p-6 shadow-lg">
        {!activeChat && (
          <div className="flex h-full items-center justify-center text-base text-gray-400">
            Select a message to view conversation
          </div>
        )}

        {activeChat && (
          <>
            {/* Header */}
            <div className="mb-4 border-b pb-2">
              <h2 className="text-lg font-semibold">{activeChat.name}</h2>
              <p className="text-xs text-gray-500">{activeChat.msg}</p>
            </div>

            {/* Chat history */}
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-2">
              {(chatHistory[activeChat.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-xs rounded-xl px-3 py-2 text-xs shadow-sm ${
                    msg.from === "Admin" ? "self-end bg-blue-200" : "self-start bg-gray-200"
                  }`}
                >
                  <p className="font-semibold">{msg.from}</p>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Input Row */}
            <div className="mt-3 flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type..."
                className="flex-1 rounded-lg border px-3 py-2 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/80"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
