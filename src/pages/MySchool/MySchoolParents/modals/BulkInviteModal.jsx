import React, { useState } from "react";

const BulkInviteModal = ({ onClose }) => {
  const [emails, setEmails] = useState("");

  const handleInvite = () => {
    const emailList = emails.split(",").map((e) => e.trim());
    console.log("Inviting:", emailList);
    alert(`Invited ${emailList.length} parents!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Bulk Invite Parents</h3>
        <p className="mb-3 text-sm text-gray-600">
          Enter emails separated by commas to invite multiple parents at once.
        </p>
        <textarea
          className="w-full rounded border px-3 py-2"
          rows={5}
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="parent1@email.com, parent2@email.com"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border px-4 py-2">
            Cancel
          </button>
          <button onClick={handleInvite} className="rounded bg-primary px-4 py-2 text-white">
            Send Invites
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkInviteModal;
