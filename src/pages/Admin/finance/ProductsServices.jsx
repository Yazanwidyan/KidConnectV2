import { saveAs } from "file-saver";
import React, { useEffect, useRef, useState } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import * as XLSX from "xlsx";

import AddProductModal from "./modals/AddProductModal";
import ViewProductModal from "./modals/ViewProductModal";

const ProductsServices = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      sku: "-",
      name: "Tshirt",
      category: "Apparel",
      price: "10.000 BHD",
      status: "Active",
      description: "A cool Tshirt",
    },
    {
      id: 2,
      sku: "-",
      name: "Books",
      category: "Supplies",
      price: "20.000 BHD",
      status: "Active",
      description: "Some study books",
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({ search: "", category: "", status: "" });

  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setActiveMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter functionality
  const handleFilter = () => {
    let temp = [...products];
    if (filters.search) {
      temp = temp.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.sku.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) temp = temp.filter((p) => p.category === filters.category);
    if (filters.status) temp = temp.filter((p) => p.status === filters.status);
    setFilteredProducts(temp);
  };

  const resetFilters = () => {
    setFilters({ search: "", category: "", status: "" });
    setFilteredProducts(products);
  };

  const handleAddEditProduct = (data) => {
    if (editProduct) {
      setProducts(products.map((p) => (p.id === editProduct.id ? { ...p, ...data } : p)));
      setEditProduct(null);
    } else {
      setProducts([...products, { ...data, id: products.length + 1 }]);
    }
    setOpenModal(false);
    setFilteredProducts(products); // refresh filtered list
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    }
  };

  const exportToExcel = () => {
    if (filteredProducts.length === 0) {
      alert("No data to export");
      return;
    }

    // Convert product objects to worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      filteredProducts.map(({ id, ...rest }) => rest) // exclude `id`
    );

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Write workbook and download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "products.xlsx");
  };

  // Update filteredProducts whenever products change
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="w-full p-6">
      {/* Add Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => {
            setOpenModal(true);
            setEditProduct(null);
          }}
          className="flex items-center gap-2 rounded-md bg-[#3A49F9] px-4 py-2 text-white"
        >
          <FaPlus /> ADD PRODUCT OR SERVICE
        </button>
      </div>

      {/* Filter Card */}
      <div className="mb-4 rounded-lg border bg-white p-6 shadow-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <div>
            <label className="font-medium text-gray-700">Product / SKU</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Product name or SKU"
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

      {/* Products Table */}
      <div ref={menuRef} className="overflow-x-auto rounded-lg border bg-white shadow-lg">
        <div className="mb-4 flex justify-end">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            Export Excel
          </button>
        </div>

        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">SKU</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{item.sku}</td>
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3">{item.category}</td>
                <td className="px-6 py-3">{item.price}</td>
                <td className="px-6 py-3">{item.status}</td>
                <td className="relative px-6 py-3">
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                    className="text-gray-600 hover:text-black"
                  >
                    <FaEllipsisV />
                  </button>
                  {activeMenu === item.id && (
                    <div className="absolute right-0 z-20 mt-2 w-32 rounded-lg border bg-white shadow-lg">
                      <button
                        onClick={() => {
                          setViewProduct(item);
                          setActiveMenu(null);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setEditProduct(item);
                          setOpenModal(true);
                          setActiveMenu(null);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenu(null);
                          handleDeleteProduct(item.id);
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

      {/* Add / Edit Modal */}
      <AddProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditProduct(null);
        }}
        onSubmit={handleAddEditProduct}
        initialValues={editProduct || undefined}
      />

      {/* View Modal */}
      <ViewProductModal open={!!viewProduct} onClose={() => setViewProduct(null)} product={viewProduct} />
    </div>
  );
};

export default ProductsServices;
