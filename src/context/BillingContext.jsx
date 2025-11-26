import React, { createContext, useContext, useMemo, useState } from "react";

// Helper: Generate random ID string (simple)
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial data for demo
const initialPlans = [
  { id: "plan_1", plan: "Full-time", freq: "Weekly", charges: "Full-time charges", amount: 140 },
  { id: "plan_2", plan: "Part-time", freq: "Weekly", charges: "Part-time charges", amount: 80 },
];

const initialStudents = [
  { id: "s_1", name: "Adam Smith", planId: "plan_1", room: "Room A" },
  { id: "s_2", name: "Emma Johnson", planId: "plan_2", room: "Room B" },
];

const initialInvoices = [
  {
    id: "inv_1",
    studentId: "s_1",
    date: "2025-11-25",
    description: "Tuition fee",
    amount: 14000,
    status: "Pending",
  },
  {
    id: "inv_2",
    studentId: "s_2",
    date: "2025-11-25",
    description: "Tuition fee",
    amount: 8000,
    status: "Paid",
  },
];
const initialPayments = [];
const initialSubsidies = [
  // Example subsidy:
  { id: "sub_1", studentId: "s_2", amount: 20, status: "Active" },
];

const BillingContext = createContext(null);

export function useBilling() {
  return useContext(BillingContext);
}

export function BillingProvider({ children }) {
  const [plans, setPlans] = useState(initialPlans);
  const [students, setStudents] = useState(initialStudents);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [payments, setPayments] = useState(initialPayments);
  const [subsidies, setSubsidies] = useState(initialSubsidies);
  const [settings, setSettings] = useState({ billingCycle: "Weekly", invoicePrefix: "INV-" });

  // Derived values for invoice summary
  const totals = useMemo(() => {
    const totalInvoices = invoices.length;
    const paid = invoices.filter((i) => i.status === "Paid").length;
    const pending = invoices.filter((i) => i.status === "Pending").length;
    const overdue = invoices.filter((i) => i.status === "Overdue").length;
    return { totalInvoices, paid, pending, overdue };
  }, [invoices]);

  // Actions

  function createPlan(plan) {
    setPlans((p) => [...p, { ...plan, id: "plan_" + generateId() }]);
  }

  function updatePlan(id, patch) {
    setPlans((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  function createStudent(student) {
    setStudents((s) => [...s, { ...student, id: "s_" + generateId() }]);
  }

  function updateStudent(id, patch) {
    setStudents((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  function createInvoice({ studentId, date, description, amount }) {
    const invoice = {
      id: "inv_" + generateId(),
      studentId,
      date,
      description,
      amount,
      status: "Pending",
    };
    setInvoices((i) => [invoice, ...i]);
    return invoice;
  }

  function markInvoicePaid(invoiceId, paymentData) {
    setInvoices((i) => i.map((inv) => (inv.id === invoiceId ? { ...inv, status: "Paid" } : inv)));
    const payment = {
      id: "pay_" + generateId(),
      invoiceId,
      studentId: paymentData.studentId,
      date: paymentData.date,
      amount: paymentData.amount,
      method: paymentData.method,
    };
    setPayments((p) => [payment, ...p]);
  }

  function addSubsidy(sub) {
    setSubsidies((s) => [...s, { ...sub, id: "sub_" + generateId() }]);
  }

  function getStudentBalance(studentId) {
    const studentInvoices = invoices.filter((i) => i.studentId === studentId);
    const charged = studentInvoices.reduce((acc, inv) => acc + inv.amount, 0);
    const studentPayments = payments.filter((p) => p.studentId === studentId);
    const paid = studentPayments.reduce((acc, pay) => acc + pay.amount, 0);
    return charged - paid; // Returns balance amount (number)
  }

  // Auto-generate invoices for all students for a given date
  function autoGenerateInvoicesForDate(date) {
    // To batch update invoices (optional: you can optimize by creating array and set once)
    students.forEach((s) => {
      const plan = plans.find((p) => p.id === s.planId);
      if (!plan) return; // no plan assigned

      // Find active subsidy if any
      const sub = subsidies.find((x) => x.studentId === s.id && x.status === "Active");
      const subAmount = sub ? sub.amount : 0;

      const amount = Math.max(0, plan.amount - subAmount);
      createInvoice({
        studentId: s.id,
        date,
        description: `${plan.plan} tuition`,
        amount,
      });
    });
  }

  return (
    <BillingContext.Provider
      value={{
        plans,
        students,
        invoices,
        payments,
        subsidies,
        settings,
        totals,
        createPlan,
        updatePlan,
        createStudent,
        updateStudent,
        createInvoice,
        markInvoicePaid,
        addSubsidy,
        getStudentBalance,
        autoGenerateInvoicesForDate,
        setSettings,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
}
