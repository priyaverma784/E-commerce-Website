import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { UserRound, Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import api from "../api/axios.js";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const userId = localStorage.getItem("userId");

  // Fetch suggestions (debounced)
  useEffect(() => {
    if (!search.trim()) {
      setProducts([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/products?search=${search}`);
        setProducts(res.data.products.slice(0, 6));
        setShowDropdown(true);
      } catch (err) {
        console.log("Search error", err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search}`);
      setShowDropdown(false);
      setMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!userId) return setCartCount(0);
        const res = await api.get(`/cart/${userId}`);
        setCartCount(res.data.items.reduce((s, i) => s + i.quantity, 0));
      } catch (err) {
        console.error(err);
      }
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [userId]);

  const SearchInput = ({ autoFocus = false, onSubmit }) => (
    <form onSubmit={onSubmit} className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
      <input
        autoFocus={autoFocus}
        placeholder="Search for products, brands and more..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => search && setShowDropdown(true)}
        className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#0a0f24] border border-purple-500/40 text-white placeholder-purple-300/50
                   focus:outline-none focus:border-pink-500 focus:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all"
      />
    </form>
  );

  const SuggestionsDropdown = () =>
    showDropdown &&
    products.length > 0 && (
      <div className="absolute top-full mt-2 w-full bg-[#0a0f24] border border-purple-500/40 rounded-2xl shadow-[0_10px_40px_rgba(168,85,247,0.3)] overflow-hidden z-50">
        {products.map((p) => {
          const imgSrc =
            p.image ||
            p.imageUrl ||
            p.img ||
            p.thumbnail ||
            (Array.isArray(p.images) ? p.images[0] : null) ||
            "https://via.placeholder.com/40x40/1a1a2e/a855f7?text=?";

          const productName =
            p.name || p.title || p.productName || p.product_name || "Unnamed Product";

          return (
            <Link
              key={p._id}
              to={`/product/${p._id}`}
              onClick={() => {
                setShowDropdown(false);
                setSearch("");
                setMobileSearchOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-purple-500/10 transition border-b border-purple-500/10 last:border-none"
            >
              <img
                src={imgSrc}
                alt={productName}
                className="w-10 h-10 rounded-lg object-cover bg-purple-500/10"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/40x40/1a1a2e/a855f7?text=?";
                }}
              />
              <p className="text-white text-sm flex-1 truncate">{productName}</p>
            </Link>
          );
        })}

        <button
          onClick={handleSubmit}
          className="w-full text-center py-2 text-sm bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-300 hover:from-pink-500/40 hover:to-violet-500/40 transition"
        >
          View all results for "{search}" →
        </button>
      </div>
    );

  return (
    <nav className="sticky top-0 z-50 bg-[#050816]/90 backdrop-blur-lg border-b border-purple-500/30 shadow-[0_4px_30px_rgba(168,85,247,0.15)]">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]"
          />
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            ShopEase
          </span>
        </Link>

        {/* Search - desktop only */}
        <div ref={searchRef} className="hidden md:block relative flex-1 max-w-xl mx-8">
          <SearchInput onSubmit={handleSubmit} />
          <SuggestionsDropdown />
        </div>

        {/* Right section - desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/wishlist" className="text-purple-300 hover:text-pink-400 transition">
            <Heart className="w-6 h-6" />
          </Link>
          <Link to="/cart" className="relative text-purple-300 hover:text-violet-400 transition">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(236,72,153,0.7)]">
                {cartCount}
              </span>
            )}
          </Link>
          {!userId ? (
            <>
              <Link to="/login" className="text-white/80 hover:text-white transition">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:scale-105 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <Link to="/profile">
              <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500">
                <div className="bg-[#050816] rounded-full p-1">
                  <UserRound className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Right section - mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="text-purple-300"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
          <Link to="/cart" className="relative text-purple-300">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="text-purple-300"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar row */}
      {mobileSearchOpen && (
        <div ref={searchRef} className="relative px-4 pb-3 md:hidden">
          <SearchInput autoFocus onSubmit={handleSubmit} />
          <SuggestionsDropdown />
        </div>
      )}

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t border-purple-500/20 pt-3">
          <Link
            to="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-purple-300 hover:text-pink-400 transition"
          >
            <Heart className="w-5 h-5" /> Wishlist
          </Link>
          {!userId ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-fit px-4 py-1.5 rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              >
                Signup
              </Link>
            </>
          ) : (
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-white"
            >
              <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500">
                <div className="bg-[#050816] rounded-full p-1">
                  <UserRound className="w-5 h-5 text-white" />
                </div>
              </div>
              Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}