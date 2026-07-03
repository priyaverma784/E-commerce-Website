import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully");
      loadProducts();
    } catch (err) {
      console.log("Error deleting product", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans antialiased text-gray-800">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Product Management</h2>
          <p className="text-sm text-gray-500 mt-1">View, adjust, or remove inventory records instantly.</p>
        </div>
        <Link to="/admin/products/add">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm shadow-sm transition duration-200 flex items-center gap-1">
            <span className="text-lg leading-none">+</span> Add Product
          </button>
        </Link>
      </div>

      {/* Structured Table Layout Wrapper */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No products found in your database. Create one to get started!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.productName}</td>
                    <td className="px-6 py-4 text-gray-600">${product.price?.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.brand}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center text-xs font-medium ${
                        product.stock > 0 ? "text-emerald-700" : "text-rose-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"
                        }`}></span>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link to={`/admin/products/edit/${product._id}`}>
                          <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-1.5 rounded-md text-xs transition duration-150">
                            Edit
                          </button>
                        </Link>
                        <button 
                          onClick={() => deleteProduct(product._id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium px-3 py-1.5 rounded-md text-xs transition duration-150"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;