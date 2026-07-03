import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function CheckoutAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        phone: "",
        addressLine: "",
        city:"",
        state:"",
        pincode:""
    });

    const handleChange = (e) =>  {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const saveAddress = async(e) => {
        await api.post("/address/add", {
            ...form,
            userId,
        });
        navigate("/checkout");
    }
return (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
    <div className="w-full max-w-2xl bg-[#111827] border border-[#1E293B] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
        Shipping Address
      </h1>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">

        <div>
          <label className="block text-gray-300 text-sm sm:text-base mb-2">
            Full Name
          </label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-3 text-white text-sm sm:text-base outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm sm:text-base mb-2">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            autoComplete="tel"
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-3 text-white text-sm sm:text-base outline-none focus:border-violet-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-300 text-sm sm:text-base mb-2">
            Address
          </label>
          <input
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            placeholder="Street address"
            autoComplete="street-address"
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-3 text-white text-sm sm:text-base outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm sm:text-base mb-2">
            City
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            autoComplete="address-level2"
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-3 text-white text-sm sm:text-base outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm sm:text-base mb-2">
            State
          </label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            autoComplete="address-level1"
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-3 text-white text-sm sm:text-base outline-none focus:border-violet-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-300 text-sm sm:text-base mb-2">
            Pincode
          </label>
          <input
            name="pincode"
            type="text"
            inputMode="numeric"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            autoComplete="postal-code"
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-3 text-white text-sm sm:text-base outline-none focus:border-violet-500"
          />
        </div>
      </div>

      <button
        onClick={saveAddress}
        className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-violet-600 to-purple-500 text-white py-3.5 sm:py-4 rounded-xl font-semibold active:opacity-90 sm:hover:opacity-90 transition text-sm sm:text-base"
      >
        Save Address
      </button>

    </div>
  </div>
);
}