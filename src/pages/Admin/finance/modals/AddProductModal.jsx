import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";

// Validation schema
const ProductSchema = Yup.object().shape({
  sku: Yup.string().required("SKU is required"),
  name: Yup.string().required("Product/Service name is required"),
  category: Yup.string().required("Category is required"),
  salesPrice: Yup.string().required("Sales price is required"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
});

const AddProductModal = ({ open, onClose, onSubmit, initialValues }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialValues ? "Edit Product / Service" : "Add Product / Service"}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaTimes />
          </button>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={
            initialValues || {
              sku: "",
              name: "",
              category: "",
              salesPrice: "",
              status: "Active",
              description: "",
            }
          }
          validationSchema={ProductSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {() => (
            <Form className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">SKU</label>
                <Field
                  name="sku"
                  placeholder="Enter SKU"
                  className="mt-1 rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
                />
                <ErrorMessage name="sku" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Product / Service Name</label>
                <Field
                  name="name"
                  placeholder="Enter name"
                  className="mt-1 rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="mt-1 rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
                >
                  <option value="">Select Category</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Supplies">Supplies</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Sales Price</label>
                <Field
                  name="salesPrice"
                  placeholder="0.000 BHD"
                  className="mt-1 rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
                />
                <ErrorMessage name="salesPrice" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Status</label>
                <Field
                  as="select"
                  name="status"
                  className="mt-1 rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Field>
                <ErrorMessage name="status" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-medium text-gray-700">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter description"
                  rows="4"
                  className="mt-1 rounded-md border px-3 py-2 focus:border-[#3A49F9] focus:ring-1 focus:ring-[#3A49F9]"
                />
                <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div className="mt-3 flex justify-end gap-3 md:col-span-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border px-4 py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#3A49F9] px-6 py-2 text-white hover:bg-[#2e3ac5]"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductModal;
