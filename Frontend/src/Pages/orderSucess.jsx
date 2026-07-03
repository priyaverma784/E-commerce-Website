import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 sm:px-6 py-6">
      <div className="max-w-lg w-full bg-[#111827] border border-[#1E293B] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center shadow-2xl">

        {/* Success Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <span className="text-4xl sm:text-5xl text-green-400">✓</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-sm sm:text-base text-gray-400 mb-5 sm:mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
          <p className="text-gray-400 text-xs sm:text-sm mb-2">
            Order ID
          </p>

          <span className="text-violet-400 text-sm sm:text-base font-semibold break-all">
            {id}
          </span>
        </div>

        <button
          onClick={goHome}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-500 text-white py-3.5 sm:py-4 rounded-xl font-semibold active:opacity-90 sm:hover:opacity-90 transition text-sm sm:text-base"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}