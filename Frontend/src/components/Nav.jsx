import React from "react";
import { FaLocationDot } from "react-icons/fa6";

function Nav() {
  return (
    <nav className="w-full h-20 flex items-center justify-center px-4 md:px-8 fixed top-0 z-50 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center">
        <h1 className="font-bold text-3xl md:text-4xl text-[#ff4d2d]">
          Bite<span className="text-black">Box</span>
        </h1>
      </div>

      {/* Search/Location Section - Hidden on small screens, visible on medium+ */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8">
        <div className="w-full h-14 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center px-4 gap-3">
          <FaLocationDot className="text-[#ff4d2d] text-lg" />
          <span className="text-gray-700 font-medium truncate">Patna, Bihar</span>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <input
            type="text"
            placeholder=" Search for restaurants, dishes..."
            className="flex-1 outline-none text-gray-600 placeholder-gray-400"
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
