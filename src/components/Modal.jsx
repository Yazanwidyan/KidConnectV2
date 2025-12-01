import React from "react";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
