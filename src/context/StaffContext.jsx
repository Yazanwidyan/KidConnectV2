import { createContext, useContext, useState } from "react";

const StaffContext = createContext();
export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      role: "Teacher",
      status: "Active",
      department: "Preschool",
      hourlyRate: 20,
      defaultCheckIn: "08:00",
      defaultCheckOut: "16:00",
    },
  ]);

  const [timecards, setTimecards] = useState([]);
  const [payroll, setPayroll] = useState([]);

  // ---------------- STAFF CRUD ----------------
  const addStaff = (data) => setStaff([...staff, { id: Date.now(), ...data }]);

  const updateStaff = (id, update) => setStaff(staff.map((s) => (s.id === id ? { ...s, ...update } : s)));

  const deleteStaff = (id) => setStaff(staff.filter((s) => s.id !== id));

  // ---------------- TIME CARDS ----------------
  const addTimecard = (data) => setTimecards([...timecards, { id: Date.now(), ...data }]);

  // ---------------- PAYROLL GENERATION ----------------
  const generatePayroll = (staffId, month) => {
    const staffMember = staff.find((s) => s.id === staffId);

    const logs = timecards.filter((t) => t.staffId === staffId && t.date.startsWith(month));

    let totalHours = logs.reduce((sum, t) => sum + t.totalHours, 0);

    const total = totalHours * staffMember.hourlyRate;

    const record = {
      id: Date.now(),
      staffId,
      month,
      hours: totalHours,
      rate: staffMember.hourlyRate,
      totalPay: total,
    };

    setPayroll([...payroll, record]);
  };

  return (
    <StaffContext.Provider
      value={{
        staff,
        timecards,
        payroll,
        addStaff,
        updateStaff,
        deleteStaff,
        addTimecard,
        generatePayroll,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};
