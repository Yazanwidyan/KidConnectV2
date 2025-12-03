// Templates.js

import React, { useState } from "react";

const Templates = () => {
  const [invoiceAccessibility, setInvoiceAccessibility] = useState(false);
  const [invoiceTemplate, setInvoiceTemplate] = useState("english");
  const [invoiceFooter, setInvoiceFooter] = useState("");

  const handleDownloadSample = () => {
    // For demo purposes, open a sample template in a new tab
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
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-xl font-semibold text-gray-800">Invoice Configurations</h1>

      {/* Invoice Accessibility */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={invoiceAccessibility}
          onChange={() => setInvoiceAccessibility(!invoiceAccessibility)}
          className="h-5 w-5 text-teal-600"
          id="invoiceAccessibility"
        />
        <label htmlFor="invoiceAccessibility" className="font-medium text-gray-700">
          Invoice Accessibility
        </label>
      </div>

      {/* Invoice Template */}
      <div>
        <p className="mb-2 font-medium text-gray-700">Invoice Template</p>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="invoiceTemplate"
              value="arabic"
              checked={invoiceTemplate === "arabic"}
              onChange={(e) => setInvoiceTemplate(e.target.value)}
              className="h-4 w-4 text-teal-600"
            />
            Arabic
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="invoiceTemplate"
              value="english"
              checked={invoiceTemplate === "english"}
              onChange={(e) => setInvoiceTemplate(e.target.value)}
              className="h-4 w-4 text-teal-600"
            />
            English
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="invoiceTemplate"
              value="bilingual"
              checked={invoiceTemplate === "bilingual"}
              onChange={(e) => setInvoiceTemplate(e.target.value)}
              className="h-4 w-4 text-teal-600"
            />
            Bilingual
          </label>
        </div>
      </div>

      {/* Invoice Footer */}
      <div>
        <label className="mb-1 block font-medium text-gray-700">Invoice Footer</label>
        <textarea
          value={invoiceFooter}
          onChange={(e) => setInvoiceFooter(e.target.value)}
          rows={4}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter footer text for invoices..."
        />
      </div>

      {/* Download Sample Button */}
      <div>
        <button
          onClick={handleDownloadSample}
          className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
        >
          Download Invoice Sample
        </button>
      </div>
    </div>
  );
};

export default Templates;
