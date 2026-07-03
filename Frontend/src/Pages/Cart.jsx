import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    const loadCart = async () => {
        try {
            if (!userId) return;
            const res = await api.get(`/cart/${userId}`);
            setCart(res.data);
        } catch (err) {
            console.error("Error loading cart:", err);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = async (productId) => {
        await api.post("/cart/remove", { userId, productId });
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId);
            return;
        }

        await api.post("/cart/update", { userId, productId, quantity });
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    if (!cart) {
        return (
          <div className="min-h-screen flex items-center justify-center px-4">
            <p className="text-gray-400 text-sm sm:text-base">Loading...</p>
          </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    return (
  <div className="min-h-screen py-6 sm:py-10 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">

      <h1 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
        Shopping Cart
      </h1>

      {cart.items.length === 0 ? (
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 sm:p-10 text-center">
          <p className="text-gray-400 text-base sm:text-lg">
            Your cart is empty
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 sm:space-y-4">

            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-5 active:border-violet-500 sm:hover:border-violet-500 transition"
              >
                {/* Product */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="bg-[#0F172A] rounded-xl p-2 shrink-0">
                    <img
                      src={
                        Array.isArray(item.productId.images)
                          ? item.productId.images[0]
                          : item.productId.images
                      }
                      alt={item.productId.productName}
                      className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-white font-semibold text-sm sm:text-lg break-words">
                      {item.productId.productName}
                    </h2>

                    <p className="text-violet-400 text-base sm:text-xl font-bold mt-1">
                      ₹{item.productId.price}
                    </p>
                  </div>
                </div>

                {/* Quantity + Remove (grouped together on mobile) */}
                <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                      aria-label="Decrease quantity"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1E293B] text-white active:bg-violet-600 sm:hover:bg-violet-600 transition"
                    >
                      -
                    </button>

                    <span className="text-white text-base sm:text-lg font-medium w-6 sm:w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                      aria-label="Increase quantity"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1E293B] text-white active:bg-violet-600 sm:hover:bg-violet-600 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeItem(item.productId._id)
                    }
                    className="text-red-400 active:text-red-300 sm:hover:text-red-300 font-medium text-sm sm:text-base shrink-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="mt-6 sm:mt-8 bg-[#111827] border border-[#1E293B] rounded-2xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-5 sm:mb-6 gap-3">
              <h2 className="text-white text-lg sm:text-2xl font-bold">
                Order Summary
              </h2>

              <span className="text-xl sm:text-3xl font-bold text-violet-400">
                ₹{total}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout-address")}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-500 text-white py-3.5 sm:py-4 rounded-xl font-semibold active:opacity-90 sm:hover:opacity-90 transition text-sm sm:text-base"
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);
}