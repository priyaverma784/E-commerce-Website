import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setform] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    images: ""
  });

  const labels = {
    productName: "Product Name",
    description: "Description",
    price: "Price ($)",
    category: "Category",
    brand: "Brand",
    stock: "Stock Quantity",
    images: "Image URL"
  };

  const allowedFields = ["productName", "description", "price", "category", "brand", "stock", "images"];

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      const product = response.data.products.find((p) => p._id === id);
      if (product) setform(product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [id]);

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/update/${id}`, form);
      alert("Product Updated Successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.log("Error to edit the Product", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-sm font-sans antialiased">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
        <p className="text-xs text-gray-500 mt-1">Modify details for this entry. All edits take effect live.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {allowedFields.map((key) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700 tracking-wide">
              {labels[key]}
            </label>
            
            {key === "description" ? (
              <textarea
                name={key}
                value={form[key] || ""}
                placeholder={`Enter ${labels[key].toLowerCase()} details...`}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-h-[100px] transition-all resize-y"
              />
            ) : (
              <input
                type={key === "price" || key === "stock" ? "number" : "text"}
                name={key}
                value={form[key] || ""}
                placeholder={`Enter dynamic ${labels[key].toLowerCase()}...`}
                onChange={handleChange}
                step={key === "price" ? "0.01" : "1"}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
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
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm shadow-sm transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;