import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner">
      <div className="container mx-auto px-6 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} KidConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
