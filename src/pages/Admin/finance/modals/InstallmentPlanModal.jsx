import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const InstallmentPlanModal = ({ isOpen, onClose, onSave }) => {
  const [numInstallments, setNumInstallments] = useState(1);
  const [interval, setInterval] = useState(1);
  const [intervalUnit, setIntervalUnit] = useState("months");
  const [startDate, setStartDate] = useState("");
  const [amount, setAmount] = useState("");
  const [installments, setInstallments] = useState([]);

  if (!isOpen) return null;

  const calculateInstallments = () => {
    if (!startDate || !numInstallments || !interval || !amount) return;

    const result = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < numInstallments; i++) {
      result.push({
        dueDate: currentDate.toISOString().split("T")[0],
        amount: parseFloat(amount),
      });

      // Increment date
      const newDate = new Date(currentDate);
      if (intervalUnit === "days") newDate.setDate(currentDate.getDate() + parseInt(interval));
      if (intervalUnit === "months") newDate.setMonth(currentDate.getMonth() + parseInt(interval));
      if (intervalUnit === "years") newDate.setFullYear(currentDate.getFullYear() + parseInt(interval));

      currentDate = newDate;
    }

    setInstallments(result);
  };

  const handleSave = () => {
    onSave(installments); // send calculated plan to parent
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-2xl bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Installment Plan</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FiX size={20} />
          </button>
        </div>

        {/* Input Form */}
        <div className="mt-4 space-y-4">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div>
              <label className="block text-gray-700">Number of Installments</label>
              <input
                type="number"
                min="1"
                value={numInstallments}
                onChange={(e) => setNumInstallments(e.target.value)}
                className="w-full border px-2 py-1"
              />
            </div>

            <div>
              <label className="block text-gray-700">Interval</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  className="w-20 border px-2 py-1"
                />
                <select
                  value={intervalUnit}
                  onChange={(e) => setIntervalUnit(e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border px-2 py-1"
              />
            </div>

            <div>
              <label className="block text-gray-700">Amount per Installment</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border px-2 py-1"
              />
            </div>

            <div className="mt-5 md:mt-0">
              <button
                type="button"
                onClick={calculateInstallments}
                className="bg-teal-600 px-4 py-2 text-white"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Display Calculated Table */}
          {installments.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">#</th>
                    <th className="border px-2 py-1">Due Date</th>
                    <th className="border px-2 py-1">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {installments.map((inst, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">{index + 1}</td>
                      <td className="border px-2 py-1">{inst.dueDate}</td>
                      <td className="border px-2 py-1">{inst.amount.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Save / Cancel Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="border px-4 py-2 text-gray-600">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-teal-600 px-4 py-2 text-white"
              disabled={installments.length === 0}
            >
              Save Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentPlanModal;
