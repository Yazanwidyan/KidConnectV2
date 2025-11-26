import React from "react";

const Header = () => {
  return (
    <header className="bg-header flex items-center justify-between p-4 shadow-md">
      <h1 className="text-primary text-xl font-bold">KidConnect</h1>
      <div>
        <button className="bg-primary rounded-full px-4 py-2 text-white hover:bg-blue-600">Sign In</button>
      </div>
    </header>
  );
};

export default Header;
