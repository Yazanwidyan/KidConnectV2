import React from "react";
import { FaTimes } from "react-icons/fa";

const ViewProductModal = ({ open, onClose, product }) => {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">View Product / Service</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaTimes />
          </button>
        </div>
        <div className="space-y-3">
          <p>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Sales Price:</strong> {product.price}
          </p>
          <p>
            <strong>Status:</strong> {product.status}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="rounded-md border px-4 py-2 hover:bg-gray-100">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
