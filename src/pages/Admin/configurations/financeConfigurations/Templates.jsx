// Templates.js

import React, { useState } from "react";

export default function Templates() {
  const [invoiceAccessibility, setInvoiceAccessibility] = useState(false);
  const [invoiceTemplate, setInvoiceTemplate] = useState("english");
  const [invoiceFooter, setInvoiceFooter] = useState("");

  const handleDownloadSample = () => {
    const sampleText = `
Invoice Template: ${invoiceTemplate.toUpperCase()}
Footer: ${invoiceFooter}
    `;
    const blob = new Blob([sampleText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice_sample.txt";
    link.click();
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="mb-4 text-xl font-semibold text-gray-800">Invoice Configurations</h1>

      <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        {/* Invoice Accessibility */}
        <div className="space-y-3">
          <span className="font-medium text-gray-700">Invoice Accessibility</span>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={invoiceAccessibility}
              onChange={() => setInvoiceAccessibility(!invoiceAccessibility)}
              className="peer sr-only"
            />

            <div className="h-6 w-11 rounded-full bg-gray-300 transition-all peer-checked:bg-teal-500 peer-focus:ring-4 peer-focus:ring-teal-300"></div>

            <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-md transition-all peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Template Options */}
        <div className="space-y-3">
          <p className="font-medium text-gray-700">Invoice Template</p>

          <div className="flex items-center gap-6">
            {[
              { label: "Arabic", value: "arabic" },
              { label: "English", value: "english" },
              { label: "Bilingual", value: "bilingual" },
            ].map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="invoiceTemplate"
                  value={option.value}
                  checked={invoiceTemplate === option.value}
                  onChange={(e) => setInvoiceTemplate(e.target.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer Textarea */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">Invoice Footer</label>
          <textarea
            value={invoiceFooter}
            onChange={(e) => setInvoiceFooter(e.target.value)}
            rows={4}
            placeholder="Enter footer text..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDownloadSample}
          className="flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
        >
          Download Invoice Sample
        </button>
      </div>
    </div>
  );
}
