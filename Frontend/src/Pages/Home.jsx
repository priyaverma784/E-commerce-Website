import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection.jsx";
import Cards from "../components/cards.jsx";
import Footer from "../components/footer.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search") || "";
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(response.data.products);
    } catch (err) {
      console.log("Error in searching products", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

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

  //  Duplicate products for seamless infinite loop
  const doubled = [...products, ...products];

  return (
    <>
      <HeroSection />
      <div className="relative overflow-hidden py-5">

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 bg-gradient-to-r from-[#0a0f1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 md:w-24 bg-gradient-to-l from-[#0a0f1e] to-transparent z-10 pointer-events-none" />

        {/*  Use doubled array */}
        <div className="flex gap-3 sm:gap-4 md:gap-5 w-max animate-marquee hover:[animation-play-state:paused] mt-4">
          {doubled.map((product, i) => (
            <div
              key={`${product._id}-${i}`}
              className="w-[190px] sm:w-[220px] md:w-[260px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#0F172A] border border-[#1E293B] shadow-lg hover:border-violet-500 hover:-translate-y-1 transition-all duration-300"
            >
              <Link to={`/product/${product._id}`} draggable={false} className="block">
                <div className="bg-[#111827] h-32 sm:h-40 md:h-44 flex justify-center items-center overflow-hidden">
                  <img
                    src={Array.isArray(product.images) ? product.images[0] : product.images}
                    alt={product.productName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h2 className="text-[13px] sm:text-[15px] font-semibold text-slate-100 truncate">
                    {product.productName}
                  </h2>
                  <p className="text-violet-400 text-lg sm:text-xl font-bold mt-1.5">
                    ₹ {product.price}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Premium Quality Product</p>
                </div>
              </Link>
              <div className="flex gap-2 px-3 sm:px-4 pb-3 sm:pb-4">
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-500 text-white py-2 sm:py-2.5 text-sm sm:text-base rounded-lg font-medium hover:opacity-90 transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Cards />
      <Footer />
    </>
  );
};

export default Home;