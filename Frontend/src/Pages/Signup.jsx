import { useState } from "react";
import api from "../api/axios.js";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6">
      <div className="relative flex flex-col md:flex-row w-full md:w-[900px] overflow-hidden rounded-3xl border border-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] bg-[#111827]">

        {/* Left Side - decorative panel (desktop only, unchanged) */}
        <div className="relative hidden md:block md:w-[100%] min-h-[550px]">
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-900 "
            style={{
              clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)",
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-center px-10 text-white">
            <h2 className="text-5xl font-bold mb-4">
              WELCOME
              <br />
              BACK!
            </h2>

            <p className="text-violet-200">
              Create your account and start exploring our <br></br> platform.
            </p>
          </div>
        </div>

        {/* Mobile-only compact header (replaces the decorative panel below md) */}
        <div className="md:hidden bg-gradient-to-br from-purple-700 to-purple-900 px-6 pt-8 pb-6 text-white text-center">
          <h2 className="text-3xl font-bold">WELCOME BACK!</h2>
          <p className="text-violet-200 text-sm mt-2">
            Create your account and start exploring our platform.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-[65%] p-6 md:p-10 md:mr-10 md:mt-10 items-center justify-center">
          <h2 className="text-4xl font-bold text-white text-center mb-2">
            Sign Up
          </h2>

          <p className="text-gray-400 text-center mb-8">
            Create your new account
          </p>

          {msg && (
            <div className="mb-5 rounded-lg border border-violet-500 bg-violet-500/10 p-3 text-violet-300">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={form.name}
              onChange={handleChange}
              className="w-full border-b border-gray-600 bg-transparent py-3 text-white outline-none focus:border-violet-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border-b border-gray-600 bg-transparent py-3 text-white outline-none focus:border-violet-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border-b border-gray-600 bg-transparent py-3 text-white outline-none focus:border-violet-500"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-purple-500 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Sign Up
            </button>
            <p className="text-gray-400 text-center">
              Already have an account? <a href="/login" className="text-violet-400 hover:underline">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;