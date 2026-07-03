import React from "react";
import { Link } from "react-router-dom";
import headphone from "../assets/headphone.png";
import game from "../assets/game.png";
import offer from "../assets/offer.png";

const Cards = () => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 px-4 sm:px-0">
      {/* Card 1 */}
      <div className="w-full sm:w-[450px] min-h-[200px] sm:h-[250px] bg-[#0D0B2D] rounded-xl flex items-center justify-between px-5 sm:px-8 py-6 sm:py-0 overflow-hidden border border-purple-900">
        <div className="text-white">
          <p className="text-xs sm:text-sm text-purple-400 uppercase">Mega Sale</p>
          <p className="text-lg sm:text-2xl mt-2">Get Up To</p>
          <h1 className="text-2xl sm:text-4xl font-bold text-purple-500">50% OFF</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">On Selected Items</p>

          <button className="mt-4 sm:mt-5 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm border border-purple-500 rounded-md hover:bg-purple-500 transition">
            <Link to="/products">Shop Now</Link>
          </button>
        </div>

        <img
          src={headphone}
          alt="Headphone"
          className="w-24 sm:w-56 object-contain shrink-0"
        />
      </div>

      {/* Card 2 */}
      <div className="w-full sm:w-[450px] min-h-[200px] sm:h-[250px] bg-[#0D0B2D] rounded-xl flex items-center justify-between px-5 sm:px-8 py-6 sm:py-0 overflow-hidden border border-purple-900">
        <div className="text-white">
          <h1 className="text-xl sm:text-3xl font-semibold">New Arrivals</h1>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            Fresh products just for you
          </p>

          <button className="mt-4 sm:mt-5 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm border border-purple-500 rounded-md hover:bg-purple-500 transition">
            <Link to="/products">Explore</Link>
          </button>
        </div>

        <img
          src={game}
          alt="Game"
          className="w-24 sm:w-56 object-contain shrink-0"
        />
      </div>

      {/* Card 3 */}
      <div className="w-full sm:w-[450px] min-h-[200px] sm:h-[250px] bg-[#0D0B2D] rounded-xl flex items-center justify-between px-5 sm:px-8 py-6 sm:py-0 overflow-hidden border border-purple-900">
        <div className="text-white">
          <h1 className="text-xl sm:text-3xl font-semibold">Exclusive Offers</h1>
          <p className="text-sm sm:text-base text-gray-400 mt-2">
            For premium members only
          </p>

          <button className="mt-4 sm:mt-5 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm border border-yellow-500 text-yellow-400 rounded-md hover:bg-yellow-500 hover:text-black transition">
            <Link to="/products">Join Now</Link>
          </button>
        </div>

        <img
          src={offer}
          alt="Offer"
          className="w-20 sm:w-52 object-contain shrink-0"
        />
      </div>
    </div>
  );
};

export default Cards;