import { saveAs } from "file-saver";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

  const [filters, setFilters] = useState({ search: "", category: "", status: "" });
  const [appliedFilters, setAppliedFilters] = useState({ search: "", category: "", status: "" });

  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef();

  // Click outside for dropdown menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setActiveMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilters = () => setAppliedFilters(filters);
  const resetFilters = () => {
    setFilters({ search: "", category: "", status: "" });
    setAppliedFilters({ search: "", category: "", status: "" });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const searchMatch =
        p.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
        p.sku.toLowerCase().includes(appliedFilters.search.toLowerCase());
      const categoryMatch = appliedFilters.category ? p.category === appliedFilters.category : true;
      const statusMatch = appliedFilters.status ? p.status === appliedFilters.status : true;
      return searchMatch && categoryMatch && statusMatch;
    });
  }, [products, appliedFilters]);

  const handleAddEditProduct = (data) => {
    if (editProduct) {
      setProducts(products.map((p) => (p.id === editProduct.id ? { ...p, ...data } : p)));
      setEditProduct(null);
    } else {
      setProducts([...products, { ...data, id: products.length + 1 }]);
    }
    setOpenModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const exportToExcel = () => {
    if (filteredProducts.length === 0) {
      alert("No data to export");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredProducts.map(({ id, ...rest }) => rest));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "products.xlsx");
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <h1 className="text-primaryFont text-3xl font-bold">Products & Services</h1>
        <button
          onClick={() => {
            setOpenModal(true);
            setEditProduct(null);
          }}
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white hover:bg-primary/90"
        >
          <FaPlus className="h-4 w-4" /> Add Product / Service
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          name="search"
          placeholder="Product name or SKU"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="rounded border px-3 py-2"
        />
        <select
          name="category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="rounded border px-3 py-2"
        >
          <option value="">All Categories</option>
          <option value="Apparel">Apparel</option>
          <option value="Supplies">Supplies</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="rounded border px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          onClick={applyFilters}
          className="rounded bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20"
        >
          Filter
        </button>
        <button
          onClick={resetFilters}
          className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div ref={menuRef} className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <div className="mb-4 flex justify-end p-4">
          <button onClick={exportToExcel} className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
            Export Excel
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["SKU", "Name", "Category", "Price", "Status", "Actions"].map((col) => (
                <th key={col} className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <tr key={item.id} className="transition odd:bg-slate-100 even:bg-white hover:bg-gray-50">
                  <td className="px-6 py-3">{item.sku}</td>
                  <td className="px-6 py-3 font-medium text-blue-700">{item.name}</td>
                  <td className="px-6 py-3">{item.category}</td>
                  <td className="px-6 py-3">{item.price}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="relative px-6 py-3">
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FaEllipsisV />
                    </button>
                    {activeMenu === item.id && (
                      <div className="absolute right-0 z-20 mt-2 w-36 rounded border bg-white shadow-lg">
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
                            handleDeleteProduct(item.id);
                            setActiveMenu(null);
                          }}
                          className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-3 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditProduct(null);
        }}
        onSubmit={handleAddEditProduct}
        initialValues={editProduct || undefined}
      />
      <ViewProductModal open={!!viewProduct} onClose={() => setViewProduct(null)} product={viewProduct} />
    </div>
  );
};

export default ProductsServices;
