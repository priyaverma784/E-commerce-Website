import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Search, Loader2 } from "lucide-react";
import api from "../api/axios.js";
import { useLocation } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get("search") || "";
  const userId = localStorage.getItem("userId");
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
        navigate("/login");
        return;
      }

      const res = await api.post("/cart/add", {
        userId,
        productId,
        quantity: 1,
      });

      if (res.data.cart) {
        localStorage.setItem("cartCount", res.data.cart.items.length);
      }

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
      alert("Failed to add product to cart.");
    }
  };

  //  Duplicate products for seamless infinite loop
  const doubled = [...products, ...products];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products?search=${searchQuery}`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    const loadWishlist = async () => {
      if (!userId) return;
      try {
        const res = await api.get(`/wishlist/${userId}`);
        const ids = res.data.items.map((item) => item.productId);
        setWishlist(ids);
      } catch (err) {
        console.error("Error loading wishlist", err);
      }
    };
    loadWishlist();
  }, [userId]);

  // Toggle wishlist
  const toggleWishlist = async (productId, e) => {
    e.stopPropagation();
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      if (wishlist.includes(productId)) {
        // Remove
        await api.delete(`/wishlist/${userId}/${productId}`);
        setWishlist(wishlist.filter((id) => id !== productId));
      } else {
        // Add
        await api.post(`/wishlist/${userId}`, { productId });
        setWishlist([...wishlist, productId]);
      }
      window.dispatchEvent(new Event("wishlistUpdated")); // for navbar badge
    } catch (err) {
      console.error("Wishlist error", err);
    }
  };

  // Helper — get field values with fallbacks (works with any schema)
  const getField = (p) => ({
    id: p._id,
    name: p.name || p.title || p.productName || "Unnamed Product",
    price: p.price || 0,
    image:
      p.image ||
      p.imageUrl ||
      p.img ||
      p.thumbnail ||
      (Array.isArray(p.images) ? p.images[0] : null) ||
      "https://via.placeholder.com/300x300/1a1a2e/a855f7?text=Product",
    description: p.description || p.desc || "",
    category: p.category || "",
    rating: p.rating || 4.5,
  });

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    const aP = getField(a);
    const bP = getField(b);
    if (sortBy === "price-low") return aP.price - bP.price;
    if (sortBy === "price-high") return bP.price - aP.price;
    if (sortBy === "name") return aP.name.localeCompare(bP.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#050816] px-4 sm:px-6 py-6 sm:py-10 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-56 h-56 sm:w-96 sm:h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 rounded-full bg-pink-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              {searchQuery ? (
                <>
                  Results for{" "}
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                    "{searchQuery}"
                  </span>
                </>
              ) : (
                <>
                  All{" "}
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                    Products
                  </span>
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base text-purple-300/70">
              {loading ? "Loading..." : `${products.length} products found`}
            </p>
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto bg-[#0a0f24] border border-purple-500/40 text-white rounded-full px-5 py-3 sm:py-2.5 outline-none focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition cursor-pointer text-sm sm:text-base"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24 sm:py-32">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-purple-500/40 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            </div>
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-sm sm:text-base text-purple-300/70">Try a different search or check back later.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.map((raw, i) => {
              const p = getField(raw);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="group relative bg-[#0a0f24] border border-purple-500/30 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer active:border-pink-500/60 sm:hover:border-pink-500/60 sm:hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300"
                >
                  {/* Wishlist heart */}
                  <button
                    onClick={(e) => toggleWishlist(p.id, e)}
                    aria-label="Toggle wishlist"
                    className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#050816]/70 backdrop-blur border flex items-center justify-center transition ${
                      wishlist.includes(p.id)
                        ? "text-pink-500 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)]"
                        : "text-purple-300 border-purple-500/40 active:text-pink-400 active:border-pink-500 sm:hover:text-pink-400 sm:hover:border-pink-500"
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={wishlist.includes(p.id) ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Image */}
                  <div className="relative w-full aspect-square sm:h-56 bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover sm:group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300/1a1a2e/a855f7?text=Product";
                      }}
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition" />
                  </div>

                  {/* Details */}
                  <div className="p-3 sm:p-4">
                    {p.category && (
                      <span className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold">
                        {p.category}
                      </span>
                    )}
                    <h3 className="text-white text-sm sm:text-base font-semibold mt-1 mb-1 sm:mb-2 line-clamp-1">
                      {p.name}
                    </h3>

                    {p.description && (
                      <p className="hidden sm:block text-gray-400 text-xs line-clamp-2 mb-3">
                        {p.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        ₹{p.price}
                      </span>
                      <span className="text-xs text-yellow-400">
                        ★ {p.rating}
                      </span>
                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p.id);
                      }}
                      className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] active:shadow-[0_0_25px_rgba(236,72,153,0.7)] sm:hover:shadow-[0_0_25px_rgba(236,72,153,0.7)] sm:hover:scale-[1.02] transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="truncate">Add to Cart</span>
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