import React, { createContext, useContext, useState } from "react";

const PaperworkContext = createContext();

export const PaperworkProvider = ({ children }) => {
  // Forms
  const [forms, setForms] = useState([
    {
      id: 1,
      form: "2026 day care enrollment",
      type: "Fillable document",
      reviews: 0,
      due: "-",
      status: "Unshared",
    },
    {
      id: 2,
      form: "A new form for all multi-site locations",
      type: "Form",
      reviews: 0,
      due: "-",
      status: "Unshared",
    },
    {
      id: 3,
      form: "Immunizations",
      type: "Document request",
      reviews: 0,
      due: "Nov 24, 2025",
      status: "Shared",
    },
  ]);

  // Shared files are static for now
  const sharedFiles = [
    { id: 1, category: "Student Documents", description: "View uploaded student files." },
    { id: 2, category: "Staff Documents", description: "Staff contracts, certificates, and policies." },
    { id: 3, category: "Shared Resources", description: "School-wide documents and templates." },
  ];

  // Signups
  const [signups, setSignups] = useState([
    {
      id: 1,
      name: "Classroom Wishlist",
      dates: "-",
      people: "2/5",
      status: "Open",
      creator: "Hadley Elizabeth",
    },
    {
      id: 2,
      name: "Fall 2025 Secret Reader",
      dates: "Tue, Oct 14, Tue, Oct 21, Tue, Oct 28",
      people: "0/10",
      status: "Open",
      creator: "Hadley Elizabeth",
    },
  ]);

  // Add / update / delete handlers for forms
  const addForm = (form) => setForms((prev) => [...prev, { ...form, id: Date.now() }]);
  const updateForm = (id, updatedForm) =>
    setForms((prev) => prev.map((f) => (f.id === id ? { ...f, ...updatedForm } : f)));
  const deleteForm = (id) => setForms((prev) => prev.filter((f) => f.id !== id));

  // Add / update / delete handlers for signups
  const addSignup = (signup) => setSignups((prev) => [...prev, { ...signup, id: Date.now() }]);
  const updateSignup = (id, updatedSignup) =>
    setSignups((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedSignup } : s)));
  const deleteSignup = (id) => setSignups((prev) => prev.filter((s) => s.id !== id));

  return (
    <PaperworkContext.Provider
      value={{
        forms,
        sharedFiles,
        signups,
        addForm,
        updateForm,
        deleteForm,
        addSignup,
        updateSignup,
        deleteSignup,
      }}
    >
      {children}
    </PaperworkContext.Provider>
  );
};

export const usePaperwork = () => useContext(PaperworkContext);
