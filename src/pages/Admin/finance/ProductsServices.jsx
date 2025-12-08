import {
  ArrowDownTrayIcon,
  BanknotesIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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
        <div aria-label="Breadcrumb">
          <h1 className="text-2xl font-bold text-black">Products & Services</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li className="inline-flex items-center">
                <div className="flex items-center text-sm font-semibold text-black">
                  <BanknotesIcon className="h-4 w-4 stroke-2" /> <h5>Finance</h5>
                </div>
              </li>
              <span className="text-xs text-gray-500">/</span>
              <li aria-current="page">
                <span className="text-sm font-semibold text-primary">Products & Services</span>
              </li>
            </ol>
          </nav>
        </div>
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
          className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
        />
        <select
          name="category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
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
          className="rounded-lg border border-gray-300 px-3 py-3 outline-none transition duration-300 ease-in-out focus:border-primary focus:ring-4 focus:ring-primary/20"
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

      {/* Export */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2 font-semibold text-white"
        >
          <ArrowDownTrayIcon className="h-5 w-5 stroke-2" /> Export as Excel
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full divide-y divide-dashed divide-gray-400/60">
          <thead>
            <tr>
              {["SKU", "Name", "Category", "Price", "Status", "Actions"].map((col) => (
                <th key={col} className="cursor-pointer px-6 py-3 text-left text-sm font-bold text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-gray-400/60">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <tr key={item.id} className="transition odd:bg-gray-100 even:bg-white hover:bg-gray-50">
                  <td className="px-6 py-3 font-normal text-gray-700">{item.sku}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{item.name}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{item.category}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">{item.price}</td>
                  <td className="px-6 py-3 font-normal text-gray-700">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="flex justify-end gap-2 px-6 py-3">
                    {/* View Product */}
                    <button
                      onClick={() => setViewProduct(item)}
                      className="rounded bg-blue-100 p-[5px] text-blue-500 ring-blue-700 transition duration-300 hover:ring-1"
                    >
                      <EyeIcon className="h-5 w-5 stroke-2" />
                    </button>

                    {/* Edit Product */}
                    <button
                      onClick={() => {
                        setEditProduct(item);
                        setOpenModal(true);
                      }}
                      className="rounded bg-green-100 p-[5px] text-green-500 ring-green-700 transition duration-300 hover:ring-1"
                    >
                      <PencilSquareIcon className="h-5 w-5 stroke-2" />
                    </button>

                    {/* Delete Product */}
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="rounded bg-red-100 p-[5px] text-red-500 ring-red-700 transition duration-300 hover:ring-1"
                    >
                      <TrashIcon className="h-5 w-5 stroke-2" />
                    </button>
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
