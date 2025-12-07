// InvoiceAndPaymentRequests.js

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import AddDiscountModal from "./modals/AddDiscountModal";
import AddPaymentTermModal from "./modals/AddPaymentTermModal";
import AddReminderModal from "./modals/AddReminderModal";

const initialReminders = [
  { id: 1, active: true, name: "Monthly Invoice", schedule: "Monthly", type: "Email" },
];

const initialPaymentTerms = [{ id: 1, active: true, name: "Net 30", dueDays: 30, type: "Standard" }];

const initialDiscounts = [
  { id: 1, active: true, name: "Seasonal Discount", percentage: 10, type: "Seasonal" },
];

const InvoiceAndPaymentRequests = () => {
  // State
  const [reminders, setReminders] = useState(initialReminders);
  const [paymentTerms, setPaymentTerms] = useState(initialPaymentTerms);
  const [discounts, setDiscounts] = useState(initialDiscounts);

  // Modal state
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isPaymentTermModalOpen, setIsPaymentTermModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  // Toggle Active
  const toggleActive = (id, type) => {
    if (type === "reminder") {
      setReminders((prev) => prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
    } else if (type === "paymentTerm") {
      setPaymentTerms((prev) =>
        prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
      );
    } else {
      setDiscounts((prev) => prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
    }
  };

  // Delete item
  const handleDelete = (id, type) => {
    if (type === "reminder") {
      setReminders((prev) => prev.filter((item) => item.id !== id));
    } else if (type === "paymentTerm") {
      setPaymentTerms((prev) => prev.filter((item) => item.id !== id));
    } else {
      setDiscounts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Add item
  const handleAddItem = (newItem, type) => {
    if (type === "reminder") setReminders((prev) => [...prev, newItem]);
    if (type === "paymentTerm") setPaymentTerms((prev) => [...prev, newItem]);
    if (type === "discount") setDiscounts((prev) => [...prev, newItem]);
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="mb-4 text-xl font-semibold text-gray-800">Invoice & Payment Configurations</h1>

      {/* Invoice Reminders Table */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Invoice Reminders</h2>
          <button
            className="flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
            onClick={() => setIsReminderModalOpen(true)}
          >
            <FiPlus /> Add Reminder
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Reminder Name</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr key={reminder.id} className="border-b">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={reminder.active}
                      onChange={() => toggleActive(reminder.id, "reminder")}
                      className="h-5 w-5 text-teal-600"
                    />
                  </td>
                  <td className="px-4 py-3">{reminder.name}</td>
                  <td className="px-4 py-3">{reminder.schedule}</td>
                  <td className="px-4 py-3">{reminder.type}</td>
                  <td className="flex gap-2 px-6 py-3">
                    <button className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1">
                      <PencilSquareIcon className="h-5 w-5 stroke-[2]" />
                    </button>
                    <button className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1">
                      <TrashIcon className="h-5 w-5 stroke-[2]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Terms Table */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Payment Terms</h2>
          <button
            className="flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
            onClick={() => setIsPaymentTermModalOpen(true)}
          >
            <FiPlus /> Add Payment Term
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Term Name</th>
                <th className="px-4 py-3">Due Days</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentTerms.map((term) => (
                <tr key={term.id} className="border-b">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={term.active}
                      onChange={() => toggleActive(term.id, "paymentTerm")}
                      className="h-5 w-5 text-teal-600"
                    />
                  </td>
                  <td className="px-4 py-3">{term.name}</td>
                  <td className="px-4 py-3">{term.dueDays}</td>
                  <td className="px-4 py-3">{term.type}</td>
                  <td className="flex gap-2 px-6 py-3">
                    <button className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1">
                      <PencilSquareIcon className="h-5 w-5 stroke-[2]" />
                    </button>
                    <button className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1">
                      <TrashIcon className="h-5 w-5 stroke-[2]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Discounts</h2>
          <button
            className="flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
            onClick={() => setIsDiscountModalOpen(true)}
          >
            <FiPlus /> Add Discount
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Discount Name</th>
                <th className="px-4 py-3">Percentage</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount.id} className="border-b">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={discount.active}
                      onChange={() => toggleActive(discount.id, "discount")}
                      className="h-5 w-5 text-teal-600"
                    />
                  </td>
                  <td className="px-4 py-3">{discount.name}</td>
                  <td className="px-4 py-3">{discount.percentage}%</td>
                  <td className="px-4 py-3">{discount.type}</td>
                  <td className="flex gap-2 px-6 py-3">
                    <button className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1">
                      <PencilSquareIcon className="h-5 w-5 stroke-[2]" />
                    </button>
                    <button className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1">
                      <TrashIcon className="h-5 w-5 stroke-[2]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onAddReminder={(item) => handleAddItem(item, "reminder")}
      />
      <AddPaymentTermModal
        isOpen={isPaymentTermModalOpen}
        onClose={() => setIsPaymentTermModalOpen(false)}
        onAddPaymentTerm={(item) => handleAddItem(item, "paymentTerm")}
      />
      <AddDiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        onAddDiscount={(item) => handleAddItem(item, "discount")}
      />
    </div>
  );
};

export default InvoiceAndPaymentRequests;
