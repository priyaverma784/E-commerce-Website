import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate, Link } from "react-router-dom";

const AddProduct = () => {
  const [form, setform] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    images: ""
  });

  const navigate = useNavigate();

  // Clean labels mapped to form keys
  const labels = {
    productName: "Product Name",
    description: "Description",
    price: "Price ($)",
    category: "Category",
    brand: "Brand",
    stock: "Stock Quantity",
    images: "Image URL"
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/add", form);
      alert("Product added Successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log("Error adding products!", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-sm font-sans antialiased">
      {/* Title Header */}
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
        <p className="text-xs text-gray-500 mt-1">Fill out the information below to add a new item to the store catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
              {labels[key]}
            </label>
            
            {key === "description" ? (
              <textarea
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={`Enter ${labels[key].toLowerCase()} details...`}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 min-h-[100px] transition-all resize-y"
                required={key !== "images"} // Makes fields required natively except optional image URLs
              />
            ) : (
              <input
                type={key === "price" || key === "stock" ? "number" : "text"}
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={`e.g. ${key === "price" ? "29.99" : key === "stock" ? "10" : labels[key]}`}
                step={key === "price" ? "0.01" : "1"}
                min="0"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                required={key !== "images"}
              />
            )}
          </div>
        ))}

        {/* Action Controls Section */}
        <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
          <Link 
            to="/admin/products" 
            className="flex-1 text-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium px-4 py-2.5 rounded-lg text-sm transition"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm shadow-sm transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;