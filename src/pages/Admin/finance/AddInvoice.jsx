import { ChevronDownIcon, ChevronUpIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

import AssignGroupModal from "./modals/AssignGroupModal";
import AssignStudentModal from "./modals/AssignStudentModal";
import InstallmentPlanModal from "./modals/InstallmentPlanModal";
import ItemsModal from "./modals/ItemsModal";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20";

const AddInvoice = () => {
  const formikRef = useRef(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isInstallmentModalOpen, setIsInstallmentModalOpen] = useState(false);
  const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const [sectionsOpen, setSectionsOpen] = useState({
    invoiceInfo: true,
    recipients: true,
    items: true,
    installmentPlan: true,
  });
  const toggleSection = (key) => setSectionsOpen((prev) => ({ ...prev, [key]: !prev[key] }));

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

  const handleSaveInstallments = (plan) => setInstallmentPlan(plan);

  const removeRecipient = (index) => setRecipients((prev) => prev.filter((_, i) => i !== index));

  const handleAddItemToForm = (item) => {
    const formik = formikRef.current;
    if (!formik) return;
    const currentItems = Array.isArray(formik.values.items) ? formik.values.items : [];
    formik.setFieldValue("items", [...currentItems, ...item]);
  };

  // ------------------- AccordionCard -------------------
  const AccordionCard = ({ title, open, toggle, children, hint }) => (
    <div className="mb-4 rounded-lg bg-white shadow-lg">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {hint && <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{hint}</span>}
        </div>
        {open ? (
          <ChevronUpIcon className="h-5 w-5 stroke-[2]" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 stroke-[2]" />
        )}
      </button>
      {open && <div className="px-6 pb-4">{children}</div>}
    </div>
  );

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-primaryFont">Create Invoice</h1>
          <Link
            to="/admin/finance/invoices"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <FaArrowLeft /> Back to Invoices
          </Link>
        </div>
      </div>

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
          <Form>
            {/* ------------------- Invoice Info ------------------- */}
            <AccordionCard
              title="Invoice Info"
              open={sectionsOpen.invoiceInfo}
              toggle={() => toggleSection("invoiceInfo")}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">Invoice Date *</label>
                  <Field type="date" name="invoiceDate" className={inputClass} />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">Payment Terms *</label>
                  <Field as="select" name="paymentTerms" className={inputClass}>
                    <option value="">Select</option>
                    <option value="Within 7 Days">Within 7 Days</option>
                    <option value="Within 15 Days">Within 15 Days</option>
                    <option value="Within 30 Days">Within 30 Days</option>
                  </Field>
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">Due Date *</label>
                  <Field type="date" name="dueDate" className={inputClass} />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">Billing Period *</label>
                  <Field type="text" name="billingPeriod" className={inputClass} />
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Internal Notes</label>
                <Field as="textarea" name="notes" rows={3} className={inputClass} />
              </div>
            </AccordionCard>

            {/* ------------------- Recipients ------------------- */}
            <AccordionCard
              title="Recipients"
              open={sectionsOpen.recipients}
              toggle={() => toggleSection("recipients")}
            >
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
            </AccordionCard>

            {/* ------------------- Items ------------------- */}
            <AccordionCard title="Items" open={sectionsOpen.items} toggle={() => toggleSection("items")}>
              <div className="mb-2 flex justify-end">
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
            </AccordionCard>

            {/* ------------------- Installment Plan ------------------- */}
            {installmentPlan.length > 0 && (
              <AccordionCard
                title="Installment Plan Summary"
                open={sectionsOpen.installmentPlan}
                toggle={() => toggleSection("installmentPlan")}
              >
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
              </AccordionCard>
            )}

            {/* Submit */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsInstallmentModalOpen(true)}
                className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
              >
                Setup Installment Plan
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
              >
                Save Invoice
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* ------------------- Modals ------------------- */}
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
