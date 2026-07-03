import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Productdetails = () => {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");

      const p = response.data.products.find(
        (item) => item._id === id
      );

      setProduct(p);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-400 text-sm sm:text-base">Loading...</p>
      </div>
    );
  }

  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in to add items to your cart");
        return;
      }
      const res = await api.post(`/cart/add`, { userId, productId });
      const total = res.data.cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto bg-[#111827] border border-[#1E293B] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">

          {/* Product Image */}
          <div className="bg-[#0F172A] rounded-2xl flex items-center justify-center p-4 sm:p-6">
            <img
              src={
                Array.isArray(product.images)
                  ? product.images[0]
                  : product.images
              }
              alt={product.productName}
              className="max-h-[280px] sm:max-h-[450px] w-full object-contain sm:hover:scale-105 transition duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between gap-6 md:gap-0">

            <div>
              <span className="inline-block bg-violet-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full mb-3 sm:mb-4">
                {product.brand}
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 break-words">
                {product.productName}
              </h1>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                {product.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-4xl font-bold text-violet-400">
                  ₹{product.price}
                </span>

                <span className="text-gray-500 line-through text-sm sm:text-lg">
                  ₹{Math.floor(product.price * 1.2)}
                </span>
              </div>

              <div className="mb-4 sm:mb-6">
                {product.stock > 0 ? (
                  <span className="text-green-400 font-medium text-sm sm:text-base">
                    ✓ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-500 font-medium text-sm sm:text-base">
                    ✕ Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-yellow-400 mb-2 sm:mb-6 text-sm sm:text-base">
                ⭐⭐⭐⭐⭐
                <span className="text-gray-400">(4.8 Reviews)</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
              onClick={() => addToCart(product._id)}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-500 text-white py-3.5 sm:py-4 rounded-xl font-semibold active:opacity-90 sm:hover:opacity-90 transition text-sm sm:text-base">
                Add To Cart
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Productdetails;