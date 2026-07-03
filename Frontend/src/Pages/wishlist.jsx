import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import api from "../api/axios.js";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    const load = async () => {
      try {
        const res = await api.get(`/wishlist/${userId}`);
        // Assumes backend populates product info; if not, fetch each product
        setItems(res.data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const removeItem = async (productId) => {
    try {
      await api.delete(`/wishlist/${userId}/${productId}`);
      setItems(items.filter((i) => (i.product?._id || i.productId) !== productId));
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error(err);
    }
  };

  const moveToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
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

  const getField = (item) => {
    const p = item.product || item; // support populated or flat
    return {
      id: p._id || item.productId,
      name: p.name || p.title || "Unnamed Product",
      price: p.price || 0,
      image:
        p.image ||
        p.imageUrl ||
        p.img ||
        (Array.isArray(p.images) ? p.images[0] : null) ||
        "https://via.placeholder.com/300x300/1a1a2e/a855f7?text=Product",
    };
  };

  return (
    <div className="min-h-screen bg-[#050816] px-4 sm:px-6 py-6 sm:py-10 relative overflow-hidden">
      {/* Ambient glows: smaller and clipped on mobile so they never force horizontal scroll */}
      <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-56 h-56 sm:w-96 sm:h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 rounded-full bg-pink-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
          My{" "}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            Wishlist
          </span>
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" fill="currentColor" />
        </h1>
        <p className="text-sm sm:text-base text-purple-300/70 mb-6 sm:mb-10">
          {loading ? "Loading..." : `${items.length} items saved`}
        </p>

        {loading ? (
          <div className="flex justify-center py-24 sm:py-32">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-purple-500/40 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            </div>
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-sm sm:text-base text-purple-300/70 mb-6">Save products you love for later.</p>
            <button
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.5)] active:scale-95 sm:hover:scale-105 transition"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {items.map((item, i) => {
              const p = getField(item);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative bg-[#0a0f24] border border-purple-500/30 rounded-xl sm:rounded-2xl overflow-hidden active:border-pink-500/60 sm:hover:border-pink-500/60 sm:hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all"
                >
                  <button
                    onClick={() => removeItem(p.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#050816]/70 backdrop-blur border border-pink-500/50 text-pink-400 active:bg-pink-500 active:text-white sm:hover:bg-pink-500 sm:hover:text-white flex items-center justify-center transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="w-full aspect-square sm:h-56 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover sm:group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-white text-sm sm:text-base font-semibold line-clamp-1 mb-1 sm:mb-2">
                        {p.name}
                      </h3>
                      <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        ₹{p.price}
                      </span>
                    </div>
                  </div>

                  <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                    <button
                      onClick={() => moveToCart(p.id)}
                      className="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] active:shadow-[0_0_25px_rgba(236,72,153,0.7)] sm:hover:shadow-[0_0_25px_rgba(236,72,153,0.7)] transition"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="truncate">Move to Cart</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
