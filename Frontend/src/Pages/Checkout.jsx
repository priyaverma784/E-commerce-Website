import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const userId = localStorage.getItem("userId");
    const [address, setAddress] = useState([]);
    const[selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userId){
            navigate("/login");
            return;
        }
        api.get(`/cart/${userId}`).then((res) => setCart(res.data));
        api.get(`/address/${userId}`).then((res) => {
            setAddress(res.data)
            setSelectAddress(res.data[0]); // Default to first address
        });
    }, []);

    if(!cart){
        return (
          <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
            <p className="text-gray-400 text-sm sm:text-base">Loading...</p>
          </div>
        );
    }

    const total = cart.items.reduce(
        (sum,i) => sum + i.quantity * i.productId.price, 0
    );

   const placeOrder = async () => {
    if (!selectAddress) {
        alert("Please select an address");
        return;
    }
    try {
        const res = await api.post("/order/place", {
            userId,
            address: selectAddress,
        });
        navigate(`/Order-placed/${res.data.orderId}`);
    } catch (err) {
        console.error(err.response?.data);  // ← see exact backend error
        alert(err.response?.data?.message || "Something went wrong");
    }
};

return (
  <div className="min-h-screen bg-[#0B1120] py-6 sm:py-10 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">

      <h1 className="text-2xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">

        {/* Address Section */}
        <div className="lg:col-span-2">
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Select Delivery Address
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {address.map((addr) => (
                <div
                  key={addr._id}
                  onClick={() => setSelectAddress(addr)}
                  className={`p-3 sm:p-4 rounded-xl border cursor-pointer transition ${
                    selectAddress?._id === addr._id
                      ? "border-violet-500 bg-[#1E293B]"
                      : "border-[#1E293B] active:border-violet-400 sm:hover:border-violet-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      checked={selectAddress?._id === addr._id}
                      readOnly
                      className="mt-1 shrink-0 w-4 h-4"
                    />

                    <div className="min-w-0">
                      <h3 className="text-white text-sm sm:text-base font-semibold break-words">
                        {addr.fullname}
                      </h3>

                      <p className="text-gray-400 text-sm sm:text-base">
                        {addr.phone}
                      </p>

                      <p className="text-gray-400 text-sm sm:text-base mt-1 break-words">
                        {addr.addressLine}, {addr.city},{" "}
                        {addr.state} - {addr.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {address.length === 0 && (
                <p className="text-gray-400 text-sm sm:text-base text-center py-6">
                  No saved addresses yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 sm:p-6 lg:sticky lg:top-6">

            <h2 className="text-lg sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Order Summary
            </h2>

            <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
              {cart.items.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex justify-between gap-3 text-gray-300 text-sm sm:text-base"
                >
                  <span className="break-words">
                    {item.productId.productName} × {item.quantity}
                  </span>

                  <span className="shrink-0">
                    ₹{item.productId.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1E293B] pt-4">
              <div className="flex justify-between items-center mb-4 gap-3">
                <span className="text-sm sm:text-lg text-gray-300">
                  Total Amount
                </span>

                <span className="text-xl sm:text-3xl font-bold text-violet-400">
                  ₹{total}
                </span>
              </div>

              <button
                onClick={placeOrder}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-500 text-white py-3.5 sm:py-4 rounded-xl font-semibold active:opacity-90 sm:hover:opacity-90 transition text-sm sm:text-base"
              >
                Place Order (COD)
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
);
}