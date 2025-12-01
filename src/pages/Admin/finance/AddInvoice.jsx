import { Field, FieldArray, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { FiCalendar, FiTrash2 } from "react-icons/fi";

import AssignGroupModal from "./modals/AssignGroupModal";
import AssignStudentModal from "./modals/AssignStudentModal";
import InstallmentPlanModal from "./modals/InstallmentPlanModal";
import ItemsModal from "./modals/ItemsModal";

const AddInvoice = () => {
  const formikRef = useRef(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isInstallmentModalOpen, setIsInstallmentModalOpen] = useState(false);
  const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
  ];

  const groups = [
    { id: 1, name: "Group A" },
    { id: 2, name: "Group B" },
    { id: 3, name: "Group C" },
  ];

  const handleAssignStudents = (studentIds) => {
    const newStudents = studentIds
      .filter((id) => !recipients.some((r) => r.id === id && r.type === "student"))
      .map((id) => ({ id, type: "student" }));
    setRecipients((prev) => [...prev, ...newStudents]);
  };

  const handleAssignGroups = (groupIds) => {
    const newGroups = groupIds
      .filter((id) => !recipients.some((r) => r.id === id && r.type === "group"))
      .map((id) => ({ id, type: "group" }));
    setRecipients((prev) => [...prev, ...newGroups]);
  };

  const handleSaveInstallments = (plan) => {
    setInstallmentPlan(plan);
  };

  const removeRecipient = (index) => {
    setRecipients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddItemToForm = (item) => {
    const formik = formikRef.current;
    if (!formik) return;
    const currentItems = Array.isArray(formik.values.items) ? formik.values.items : [];
    formik.setFieldValue("items", [...currentItems, ...item]);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold text-gray-800">Create Invoice</h1>

      <Formik
        innerRef={formikRef}
        initialValues={{
          invoiceDate: "",
          paymentTerms: "",
          dueDate: "",
          billingPeriod: "",
          notes: "",
          items: [],
        }}
        onSubmit={(values) => {
          console.log("Invoice Submitted:", { ...values, recipients, installmentPlan });
        }}
      >
        {({ values }) => (
          <Form className="space-y-6">
            {/* Invoice Info */}
            <div className="border p-4">
              <h2 className="mb-2 font-semibold text-gray-700">Invoice Info</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div>
                  <label className="block text-gray-700">Invoice Date *</label>
                  <div className="relative mt-1">
                    <Field type="date" name="invoiceDate" className="w-full border px-2 py-1" />
                    <FiCalendar className="absolute right-2 top-2 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Payment Terms *</label>
                  <Field as="select" name="paymentTerms" className="mt-1 w-full border px-2 py-1">
                    <option value="">Select</option>
                    <option value="Within 7 Days">Within 7 Days</option>
                    <option value="Within 15 Days">Within 15 Days</option>
                    <option value="Within 30 Days">Within 30 Days</option>
                  </Field>
                </div>
                <div>
                  <label className="block text-gray-700">Due Date *</label>
                  <div className="relative mt-1">
                    <Field type="date" name="dueDate" className="w-full border px-2 py-1" />
                    <FiCalendar className="absolute right-2 top-2 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Billing Period *</label>
                  <Field
                    type="text"
                    name="billingPeriod"
                    placeholder="08/01/2024 - 08/01/2024"
                    className="mt-1 w-full border px-2 py-1"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="block text-gray-700">Internal Notes</label>
                <Field as="textarea" name="notes" rows={3} className="mt-1 w-full border px-2 py-1" />
              </div>
            </div>

            {/* Recipients */}
            <div className="border p-4">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-semibold text-gray-700">Recipients *</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsStudentModalOpen(true)}
                    className="border px-2 py-1 text-gray-700"
                  >
                    Add Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsGroupModalOpen(true)}
                    className="border px-2 py-1 text-gray-700"
                  >
                    Add Group
                  </button>
                </div>
              </div>

              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-2 py-1 text-left">#</th>
                    <th className="border px-2 py-1 text-left">Type</th>
                    <th className="border px-2 py-1 text-left">Student</th>
                    <th className="border px-2 py-1 text-left">Group</th>
                    <th className="border px-2 py-1 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recipients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-2 text-center text-gray-500">
                        No recipients
                      </td>
                    </tr>
                  ) : (
                    recipients.map((r, index) => (
                      <tr key={`${r.type}-${r.id}`}>
                        <td className="border px-2 py-1">{index + 1}</td>
                        <td className="border px-2 py-1">{r.type}</td>
                        <td className="border px-2 py-1">
                          {r.type === "student" ? students.find((s) => s.id === r.id)?.name || "-" : "-"}
                        </td>
                        <td className="border px-2 py-1">
                          {r.type === "group" ? groups.find((g) => g.id === r.id)?.name || "-" : "-"}
                        </td>
                        <td className="border px-2 py-1">
                          <button
                            type="button"
                            onClick={() => removeRecipient(index)}
                            className="text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Items */}
            <div className="border p-4">
              <div className="mb-2 flex justify-between">
                <h2 className="font-semibold text-gray-700">Items</h2>
                <button
                  type="button"
                  onClick={() => setIsItemsModalOpen(true)}
                  className="border px-2 py-1 text-gray-700"
                >
                  Add Items
                </button>
              </div>

              <FieldArray name="items">
                {({ remove }) => (
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border px-2 py-1 text-left">#</th>
                        <th className="border px-2 py-1 text-left">Item</th>
                        <th className="border px-2 py-1 text-left">Qty</th>
                        <th className="border px-2 py-1 text-left">Total</th>
                        <th className="border px-2 py-1 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.items.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-2 text-center text-gray-500">
                            No items
                          </td>
                        </tr>
                      ) : (
                        values.items.map((item, index) => (
                          <tr key={index}>
                            <td className="border px-2 py-1">{index + 1}</td>
                            <td className="border px-2 py-1">{item.name}</td>
                            <td className="border px-2 py-1">{item.quantity}</td>
                            <td className="border px-2 py-1">{(item.quantity * item.price).toFixed(3)}</td>
                            <td className="border px-2 py-1">
                              <button type="button" onClick={() => remove(index)} className="text-red-600">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </FieldArray>
            </div>

            {/* Summary & Actions */}
            <div className="flex flex-col gap-4 border p-4 md:flex-row md:justify-between">
              <div>
                <h2 className="mb-1 font-semibold text-gray-700">Total Amount (BHD)</h2>
                <div>
                  {values.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(3)}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-gray-700">Additional Notes</label>
                <Field as="textarea" name="summaryNotes" rows={3} className="mt-1 w-full border px-2 py-1" />
              </div>
            </div>
            {/* Installment Plan Section */}
            {installmentPlan.length > 0 && (
              <div className="mt-4 border p-4">
                <h2 className="mb-2 font-semibold text-gray-700">Installment Plan Summary</h2>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1">#</th>
                      <th className="border px-2 py-1">Due Date</th>
                      <th className="border px-2 py-1">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {installmentPlan.map((inst, index) => (
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

            <div className="flex justify-end gap-2">
              <button type="button" className="border px-3 py-1 text-gray-700">
                Cancel
              </button>
              <button type="submit" className="bg-teal-600 px-3 py-1 text-white">
                Save Invoice
              </button>
              <button
                type="button"
                onClick={() => setIsInstallmentModalOpen(true)}
                className="bg-teal-600 px-3 py-1 text-white"
              >
                Setup Installment Plan
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Modals */}
      <AssignStudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onAssign={handleAssignStudents}
      />
      <AssignGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onAssign={handleAssignGroups}
      />
      <InstallmentPlanModal
        isOpen={isInstallmentModalOpen}
        onClose={() => setIsInstallmentModalOpen(false)}
        onSave={handleSaveInstallments}
      />
      <ItemsModal
        isOpen={isItemsModalOpen}
        onClose={() => setIsItemsModalOpen(false)}
        onAddItem={(item) => {
          handleAddItemToForm(item);
          setIsItemsModalOpen(false);
        }}
      />
    </div>
  );
};

export default AddInvoice;
