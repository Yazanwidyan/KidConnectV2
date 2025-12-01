import React, { useState } from "react";
import { FaBox } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const ItemsModal = ({ isOpen, onClose, onAddItem }) => {
  // Hooks
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);

  // Sample items
  const recentItems = [
    { id: 1, name: "Uniform", sku: "UNI-250", category: "Apparel", quantity: 1, price: 15.0 },
    { id: 2, name: "Books", sku: "BK-250", category: "Supplies", quantity: 1, price: 20.0 },
    { id: 3, name: "Bags", sku: "BG-250", category: "Supplies", quantity: 1, price: 6.0 },
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSelection) {
      setSelectedItems([currentSelection]);
      setStep(2);
    }
  };

  const handleAdd = () => {
    onAddItem(selectedItems);
    // Reset modal state
    setStep(1);
    setCurrentSelection(null);
    setSelectedItems([]);
    onClose();
  };

  // Calculate total
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h2 className="text-lg font-semibold text-gray-800">{step === 1 ? "Add Item" : "Confirm Items"}</h2>
          <button
            onClick={() => {
              setStep(1);
              setCurrentSelection(null);
              setSelectedItems([]);
              onClose();
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            <FiX size={22} />
          </button>
        </div>

        {step === 1 && (
          <>
            {/* Search Section */}
            <div className="grid grid-cols-2 gap-3 px-5 py-4">
              <input
                type="text"
                placeholder="Item Name or SKU"
                className="rounded-lg border px-3 py-2 text-sm"
              />
              <select className="rounded-lg border px-3 py-2 text-sm">
                <option>Category</option>
                <option>Apparel</option>
                <option>Supplies</option>
              </select>
            </div>

            {/* Recent Items */}
            <p className="px-5 text-sm font-semibold text-gray-700">Recent</p>
            <div className="mt-2 max-h-80 overflow-y-auto px-5 pb-20">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className={`mt-3 flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                    currentSelection?.id === item.id ? "border-teal-500 bg-teal-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentSelection(item)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={currentSelection?.id === item.id}
                      onChange={() => setCurrentSelection(item)}
                    />
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/80 text-white">
                      <FaBox />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.sku} • {item.category}
                      </p>
                      <p className="mt-1 text-xs text-green-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-700">BHD {item.price.toFixed(3)}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t bg-white p-4">
              <button
                onClick={handleNext}
                disabled={!currentSelection}
                className={`w-full rounded-lg px-4 py-2 text-center text-white ${
                  currentSelection ? "bg-teal-600 hover:bg-teal-700" : "cursor-not-allowed bg-gray-300"
                }`}
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Selected Items Summary */}
            <div className="max-h-80 overflow-y-auto px-5 py-4">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.sku} • {item.category} • Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-semibold">BHD {(item.price * item.quantity).toFixed(3)}</div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between border-t px-5 py-3 font-semibold text-gray-800">
              <span>Total:</span>
              <span>BHD {totalAmount.toFixed(3)}</span>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t bg-white p-4">
              <button
                onClick={handleAdd}
                className="w-full rounded-lg bg-teal-600 px-4 py-2 text-center text-white hover:bg-teal-700"
              >
                ADD ITEMS
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemsModal;
