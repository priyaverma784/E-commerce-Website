export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-[#1E293B] text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              ShopEase
            </h2>
            <p className="text-sm max-w-xs mx-auto sm:mx-0">
              Discover premium products with a modern shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="/" className="hover:text-violet-400">Home</a></li>
              <li><a href="/products" className="hover:text-violet-400">Products</a></li>
              <li><a href="/cart" className="hover:text-violet-400">Cart</a></li>
              <li><a href="/contact" className="hover:text-violet-400">Contact</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="#" className="hover:text-violet-400">Help Center</a></li>
              <li><a href="#" className="hover:text-violet-400">Returns</a></li>
              <li><a href="#" className="hover:text-violet-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-violet-400">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-3 sm:mb-4">
              Newsletter
            </h3>

            <div className="flex max-w-sm mx-auto sm:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-[#111827] border border-[#1E293B] rounded-l-lg px-3 py-2 text-sm sm:text-base text-white outline-none"
              />

              <button className="bg-violet-600 px-4 rounded-r-lg text-white text-sm sm:text-base hover:bg-violet-700 shrink-0">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-[#1E293B] mt-8 sm:mt-10 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 md:gap-0">
          <p className="text-sm text-center">
            © 2026 ShopEase. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-violet-400">Instagram</a>
            <a href="#" className="hover:text-violet-400">Facebook</a>
            <a href="#" className="hover:text-violet-400">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}