import React, { useEffect, useRef, useState } from "react";
import { FaDownload, FaEllipsisV, FaPlus } from "react-icons/fa";

import AddProductModal from "./modals/AddProductModal";

const ProductsServices = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const products = [
    { id: 1, sku: "-", name: "Tshirt", category: "Apparel", price: "10.000 BHD", status: "Active" },
    { id: 2, sku: "-", name: "كتب دراسية", category: "Supplies", price: "20.000 BHD", status: "Active" },
    { id: 3, sku: "Bk01", name: "Books", category: "Other", price: "20.000 BHD", status: "Active" },
    { id: 4, sku: "-", name: "Uniform 01", category: "Other", price: "15.000 BHD", status: "Active" },
  ];

  const handleFilter = () => {
    console.log("Filtering...", filters);
  };

  const resetFilters = () => {
    setFilters({ search: "", category: "", status: "" });
  };

  return (
    <div className="w-full p-6">
      {/* Top Right Add Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-md bg-[#3A49F9] px-4 py-2 text-white"
        >
          <FaPlus /> ADD PRODUCT OR SERVICE
        </button>
      </div>

      {/* Filter Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <div>
            <label className="font-medium text-gray-700">Product or Service Name or SKU</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Product or Service Name or SKU"
              className="mt-1 w-full rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-[#3A49F9]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium text-gray-700">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-[#3A49F9]"
            >
              <option value="">Select</option>
              <option value="Apparel">Apparel</option>
              <option value="Supplies">Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="font-medium text-gray-700">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-[#3A49F9]"
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleFilter}
            className="rounded-md bg-[#3A49F9] px-5 py-2 text-white shadow hover:bg-[#2f3ac5]"
          >
            FILTER
          </button>
          <button
            onClick={resetFilters}
            className="rounded-md border px-5 py-2 text-gray-700 hover:bg-gray-100"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-4 flex justify-end">
        <button className="flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-gray-100">
          <FaDownload /> EXPORT
        </button>
      </div>

      {/* Table */}
      <div ref={menuRef} className="mt-4 overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600">SKU</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Product | Service</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Category</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Sales Price</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{item.sku}</td>
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3">{item.category}</td>
                <td className="px-6 py-3">{item.price}</td>
                <td className="px-6 py-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {item.status}
                  </span>
                </td>
                <td className="relative px-6 py-3">
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                    className="text-gray-600 hover:text-black"
                  >
                    <FaEllipsisV />
                  </button>

                  {/* Actions Dropdown */}
                  {activeMenu === item.id && (
                    <div className="absolute right-0 z-20 mt-2 w-32 rounded-lg border bg-white shadow-lg">
                      <button
                        onClick={() => {
                          setActiveMenu(null);
                          alert("View product " + item.name);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          setActiveMenu(null);
                          alert("Edit " + item.name);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setActiveMenu(null);
                          if (window.confirm("Are you sure you want to delete this item?")) {
                            alert("Deleted " + item.name);
                          }
                        }}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) => console.log("Product Added:", data)}
      />
    </div>
  );
};

export default ProductsServices;
