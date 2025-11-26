import React, { createContext, useContext, useState } from "react";

const AdmissionsContext = createContext();

export function AdmissionsProvider({ children }) {
  // ------------------ STUDENTS ------------------
  const [students, setStudents] = useState([
    {
      id: "s1",
      name: "Alex Smith",
      age: "3y 11m",
      programs: ["Toddlers"],
      paperworkDate: "2021-04-04",
      desiredStart: "2021-06-01",
      status: "Waitlist",
      room: "Preschool",
    },
    {
      id: "s2",
      name: "Emma Johnson",
      age: "4y 6m",
      programs: ["Preschool"],
      paperworkDate: "2025-10-22",
      desiredStart: "2026-02-01",
      status: "Applied",
      room: "Preschool",
    },
  ]);

  // ------------------ PACKETS ------------------
  const [packets, setPackets] = useState([
    {
      id: "p1",
      name: "Registration for Infant rooms 2025 - 2026",
      students: 0,
      due: "2025-10-03",
      fee: 15,
      status: "Active",
    },
  ]);

  // ------------------ PROGRAMS ------------------
  const [programs, setPrograms] = useState([
    { id: "prog1", name: "Toddlers" },
    { id: "prog2", name: "Preschool" },
    { id: "prog3", name: "Kindergarten" },
  ]);

  // ------------------ WAITLIST ------------------
  const [waitlists, setWaitlists] = useState([
    {
      id: "w1",
      studentId: "s1",
      room: "Preschool",
      position: 1,
      paperworkDate: "2025-10-20",
      desiredStart: "2026-01-05",
      sibling: "Mia Smith",
    },
    {
      id: "w2",
      studentId: "s2",
      room: "Preschool",
      position: 2,
      paperworkDate: "2025-10-22",
      desiredStart: "2026-02-01",
      sibling: "No",
    },
  ]);

  // -------------------------------------------------------
  // STUDENTS ACTIONS
  // -------------------------------------------------------

  function addStudent(student) {
    setStudents((prev) => [...prev, { id: `s${prev.length + 1}`, ...student }]);
  }

  function updateStudent(id, updates) {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }

  // -------------------------------------------------------
  // PACKET ACTIONS
  // -------------------------------------------------------

  function addPacket(packet) {
    setPackets((prev) => [...prev, { id: `p${prev.length + 1}`, ...packet }]);
  }

  function updatePacket(id, updates) {
    setPackets((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }

  // -------------------------------------------------------
  // PROGRAM ACTIONS  (NEW)
  // -------------------------------------------------------

  function addProgram(program) {
    setPrograms((prev) => [...prev, { id: `prog${prev.length + 1}`, ...program }]);
  }

  function updateProgram(id, updates) {
    setPrograms((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }

  // -------------------------------------------------------
  // WAITLIST ACTIONS
  // -------------------------------------------------------

  function enrollFromWaitlist(waitlistId) {
    const entry = waitlists.find((w) => w.id === waitlistId);
    if (!entry) return;

    const student = students.find((s) => s.id === entry.studentId);
    if (!student) return;

    // 1. Update student's status
    setStudents((prev) => prev.map((s) => (s.id === student.id ? { ...s, status: "Applied" } : s)));

    // 2. Remove and reorder waitlist
    setWaitlists((prev) => {
      const remaining = prev.filter((w) => w.id !== waitlistId);
      const sameRoom = remaining.filter((w) => w.room === entry.room);

      const reordered = sameRoom
        .sort((a, b) => a.position - b.position)
        .map((w, i) => ({ ...w, position: i + 1 }));

      return [...reordered, ...remaining.filter((w) => w.room !== entry.room)];
    });
  }

  function deleteWaitlist(waitlistId) {
    const entry = waitlists.find((w) => w.id === waitlistId);
    if (!entry) return;

    setWaitlists((prev) => {
      const remaining = prev.filter((w) => w.id !== waitlistId);
      const sameRoom = remaining.filter((w) => w.room === entry.room);

      const reordered = sameRoom
        .sort((a, b) => a.position - b.position)
        .map((w, i) => ({ ...w, position: i + 1 }));

      return [...reordered, ...remaining.filter((w) => w.room !== entry.room)];
    });
  }

  // -------------------------------------------------------

  return (
    <AdmissionsContext.Provider
      value={{
        students,
        packets,
        programs,
        waitlists,

        addStudent,
        updateStudent,

        addPacket,
        updatePacket,

        addProgram, // NEW
        updateProgram, // NEW

        enrollFromWaitlist,
        deleteWaitlist,
      }}
    >
      {children}
    </AdmissionsContext.Provider>
  );
}

export function useAdmissions() {
  return useContext(AdmissionsContext);
}
