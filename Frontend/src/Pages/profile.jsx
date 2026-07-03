import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        setError(err.response?.data?.message || "Something went wrong loading your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, userId, token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <p className="text-gray-400 text-sm sm:text-base">Loading your profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1120] p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-sm sm:text-base text-center max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="w-full sm:w-auto bg-purple-600 text-white px-4 py-3 sm:py-2 rounded-xl active:bg-purple-700 sm:hover:bg-purple-700 transition text-sm sm:text-base"
        >
          Try again
        </button>
      </div>
    );
  }

  const userName = user?.name || "User";
  const email = user?.email || "user@example.com";
  const joinedDate = formatDate(user?.createdAt);

  return (
    <div className="min-h-screen bg-[#0B1120] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <div className="flex flex-col items-center">

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-white text-lg sm:text-xl font-semibold mt-4 text-center break-words">
                {userName}
              </h2>

              <p className="text-gray-400 mt-1 text-sm sm:text-base text-center break-all">
                {email}
              </p>

              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500 text-white py-3 sm:py-3 rounded-xl active:bg-red-700 sm:hover:bg-red-600 transition text-sm sm:text-base"
              >
                Logout
              </button>

            </div>
          </div>

          <div className="md:col-span-2 bg-[#111827] border border-[#1E293B] rounded-2xl sm:rounded-3xl p-4 sm:p-6">

            <h2 className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6">
              Account Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">

              <div>
                <p className="text-gray-400 text-sm sm:text-base">Full Name</p>
                <p className="text-white text-sm sm:text-base break-words">{userName}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm sm:text-base">Email</p>
                <p className="text-white text-sm sm:text-base break-all">{email}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm sm:text-base">Account Type</p>
                <p className="text-white text-sm sm:text-base">Customer</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm sm:text-base">Member Since</p>
                <p className="text-white text-sm sm:text-base">{joinedDate}</p>
              </div>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">

          <div
            onClick={() => navigate("/checkout-address")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/checkout-address")}
            className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 cursor-pointer active:border-purple-500 active:scale-[0.98] sm:hover:border-purple-500 sm:hover:scale-[1.02] transition focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <h3 className="text-white text-base sm:text-lg font-semibold">
              Addresses
            </h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Manage delivery addresses.
            </p>
          </div>

          <div
            onClick={() => navigate("/wishlist")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/wishlist")}
            className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 cursor-pointer active:border-purple-500 active:scale-[0.98] sm:hover:border-purple-500 sm:hover:scale-[1.02] transition focus:outline-none focus:ring-2 focus:ring-purple-500 sm:col-span-2 md:col-span-1"
          >
            <h3 className="text-white text-base sm:text-lg font-semibold">
              Wishlist
            </h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Your saved products.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;