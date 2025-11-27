import { Field, Form, Formik } from "formik";
import React from "react";
import { FiCalendar } from "react-icons/fi";

const AddInvoice = () => {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-semibold text-gray-800">Create Invoice</h1>

      <Formik
        initialValues={{
          invoiceDate: "",
          paymentTerms: "",
          dueDate: "",
          billingPeriod: "",
          notes: "",
        }}
        onSubmit={(values) => {
          console.log("Invoice Submitted:", values);
        }}
      >
        {({ values }) => (
          <Form className="space-y-8">
            {/* ======================= */}
            {/*      INVOICE INFO       */}
            {/* ======================= */}
            <div className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-gray-700">Invoice Info</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {/* Invoice Date */}
                <div>
                  <label className="font-medium text-gray-700">Invoice Date *</label>
                  <div className="relative mt-1">
                    <Field
                      type="date"
                      name="invoiceDate"
                      className="w-full rounded-lg border px-3 py-2 pr-10"
                    />
                    <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                  </div>
                </div>

                {/* Payment Terms */}
                <div>
                  <label className="font-medium text-gray-700">Payment Terms *</label>
                  <Field as="select" name="paymentTerms" className="mt-1 w-full rounded-lg border px-3 py-2">
                    <option value="">Select</option>
                    <option value="Within 7 Days">Within 7 Days</option>
                    <option value="Within 15 Days">Within 15 Days</option>
                    <option value="Within 30 Days">Within 30 Days</option>
                  </Field>
                </div>

                {/* Due Date */}
                <div>
                  <label className="font-medium text-gray-700">Due date *</label>
                  <div className="relative mt-1">
                    <Field type="date" name="dueDate" className="w-full rounded-lg border px-3 py-2 pr-10" />
                    <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                  </div>
                </div>

                {/* Billing Period */}
                <div>
                  <label className="font-medium text-gray-700">Billing Period *</label>
                  <div className="relative mt-1">
                    <Field
                      type="text"
                      name="billingPeriod"
                      placeholder="08/01/2024 - 08/01/2024"
                      className="w-full rounded-lg border px-3 py-2 pr-10"
                    />
                    <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="font-medium text-gray-700">Internal Notes</label>
                <Field
                  as="textarea"
                  name="notes"
                  placeholder="Add Note"
                  rows={4}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </div>
            </div>

            {/* ======================= */}
            {/*      RECIPIENTS         */}
            {/* ======================= */}
            <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-700">Recipients *</h2>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
                  >
                    Add Student
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
                  >
                    Add Group
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
                  >
                    Add External
                  </button>
                </div>
              </div>

              {/* RECIPIENTS TABLE */}
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                  <thead className="bg-teal-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Sl. No</th>
                      <th className="px-4 py-3 text-left">Bill To</th>
                      <th className="px-4 py-3 text-left">Student Name</th>
                      <th className="px-4 py-3 text-left">Group</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No data to display
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <select className="rounded-lg border px-2 py-1">
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <span className="text-gray-600">0 Total Records</span>
                </div>

                <div className="flex gap-2">
                  <button className="rounded-lg border px-3 py-1">{`<<`}</button>
                  <button className="rounded-lg border px-3 py-1">{`<`}</button>
                  <button className="rounded-lg border bg-teal-600 px-3 py-1 text-white">1</button>
                  <button className="rounded-lg border px-3 py-1">{`>`}</button>
                  <button className="rounded-lg border px-3 py-1">{`>>`}</button>
                </div>
              </div>
            </div>

            {/* ======================= */}
            {/*      ACTION BUTTONS     */}
            {/* ======================= */}
            <div className="flex justify-end gap-4">
              <button type="button" className="rounded-lg border px-6 py-2 text-gray-600 hover:bg-gray-100">
                CANCEL
              </button>

              <button type="submit" className="rounded-lg bg-teal-600 px-6 py-2 text-white hover:bg-teal-700">
                SAVE INVOICE
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddInvoice;
