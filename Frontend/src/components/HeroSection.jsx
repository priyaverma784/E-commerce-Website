import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import modelImage from "../assets/model.png";
import headphone from "../assets/headphone.png";
import shoes from "../assets/shoes.png";
import watch from "../assets/watch.png";
import glass from "../assets/glass.png";

export default function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 lg:gap-20 mb-5 overflow-hidden px-4 md:px-0">
      {/* LEFT SIDE — RESTORED & ALIGNED */}
      <div className="mt-6 md:mt-10 md:ml-15 w-full lg:w-auto text-left">
        <motion.div
          className="max-w-2xl mx-auto md:mx-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <button className="m-2 text-xs p-1 px-2 border border-purple-500/50 bg-[#050816] shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-2xl">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
              <Link to="/products">+ NEW COLLECTION</Link>
            </span>
          </button>

          <div className="m-2 font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
            <h1 className="text-white">Beyond Shopping.</h1>
            <h1 className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              It's an Experience.
            </h1>
          </div>
          
          <p className="m-2 text-white text-base sm:text-lg max-w-xl mx-auto md:mx-0">
            Discover the latest trends in fashion, tech and lifestyle. Curated just for you.
          </p>
          
          <button className="m-2 mt-5 text-white text-base sm:text-lg py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition-all">
            <Link to="/products">Shop Now →</Link>
          </button>
          
          <div className="m-2 mt-8 text-white flex flex-wrap justify-start gap-6 sm:gap-12">
            <div><p className="text-xl sm:text-2xl font-semibold">200k+</p><p className="text-xs sm:text-sm text-gray-400">Top Brands</p></div>
            <div><p className="text-xl sm:text-2xl font-semibold">10k+</p><p className="text-xs sm:text-sm text-gray-400">Happy Customers</p></div>
            <div><p className="text-xl sm:text-2xl font-semibold">50k+</p><p className="text-xs sm:text-sm text-gray-400">Products</p></div>
            <div><p className="text-xl sm:text-2xl font-semibold">24/7</p><p className="text-xs sm:text-sm text-gray-400">Support</p></div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE — RESPONSIVE GRAPHIC */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[340px] sm:min-h-[460px] md:min-h-[550px] lg:min-h-[600px] mt-10 lg:mt-0">
        <div className="relative w-[75vw] h-[75vw] max-w-[320px] max-h-[320px] sm:max-w-[420px] sm:max-h-[420px] md:max-w-[500px] md:max-h-[500px] lg:max-w-[550px] lg:max-h-[550px] flex items-center justify-center">
          
          {/* Background Ambient Glows */}
          <motion.div
            className="absolute w-1/2 h-1/2 rounded-full bg-pink-500/20 blur-[60px] sm:blur-[90px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "10%", left: "10%" }}
          />
          <motion.div
            className="absolute w-1/2 h-1/2 rounded-full bg-violet-600/20 blur-[60px] sm:blur-[90px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ bottom: "10%", right: "10%" }}
          />

          {/* Conic Glow behind model */}
          <motion.div
            className="absolute w-[80%] h-[80%] rounded-full z-0"
            style={{
              background: "conic-gradient(from 0deg, #ec4899, #a855f7, #8b5cf6, #ec4899)",
              filter: "blur(24px)",
              opacity: 0.35,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Outer Orbit Ring */}
          <motion.div
            className="absolute w-[105%] h-[105%] rounded-full border border-dashed border-purple-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          </motion.div>

          {/* Inner Orbit Ring */}
          <motion.div
            className="absolute w-[90%] h-[90%] rounded-full border border-dashed border-pink-500/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
          </motion.div>

          {/* Model Frame */}
          <motion.div
            className="relative w-[70%] h-[70%] z-20 p-[2.5px] rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-violet-500 shadow-[0_0_40px_rgba(168,85,247,0.5)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-full h-full rounded-full bg-[#050816] p-1.5 overflow-hidden">
              <img
                src={modelImage}
                alt="Model"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>

          {/* Floating Responsive Products */}
          <motion.div 
            className="absolute left-[-1%] top-[-1%] w-[28%] h-[28%] z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            transition={{ 
              scale: { duration: 1, delay: 0.2 }, 
              opacity: { duration: 1, delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img src={headphone} alt="Headphone" className="w-full h-full object-contain filter drop-shadow-[0_8px_15px_rgba(168,85,247,0.5)]" />
          </motion.div>

          <motion.div 
            className="absolute right-[-14%] top-[-4%] w-[34%] h-[34%] z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, 12, 0] }}
            transition={{ 
              scale: { duration: 1, delay: 0.4 }, 
              opacity: { duration: 1, delay: 0.4 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img src={shoes} alt="Shoes" className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(236,72,153,0.5)]" />
          </motion.div>

          <motion.div 
            className="absolute left-[-15%] bottom-[4%] w-[30%] h-[30%] z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, 8, 0] }}
            transition={{ 
              scale: { duration: 1, delay: 0.6 }, 
              opacity: { duration: 1, delay: 0.6 },
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img src={glass} alt="Glass" className="w-full h-full object-contain filter drop-shadow-[0_8px_15px_rgba(168,85,247,0.5)]" />
          </motion.div>

          <motion.div 
            className="absolute right-[-12%] bottom-[6%] w-[30%] h-[30%] z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -12, 0] }}
            transition={{ 
              scale: { duration: 1, delay: 0.8 }, 
              opacity: { duration: 1, delay: 0.8 },
              y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img src={watch} alt="Watch" className="w-full h-full object-contain filter drop-shadow-[0_8px_15px_rgba(236,72,153,0.5)]" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}