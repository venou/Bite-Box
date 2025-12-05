import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

const UserNavUI = () => {
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6]">
      {/* Brand */}
      <h1 className="font-bold text-3xl md:text-4xl text-[#ff4d2d]">
        Bite<span className="text-black">Box</span>
      </h1>
      {/* Desktop search box */}
      <div className="hidden md:flex w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px]">
        {/* Location */}
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r border-gray-300">
          <FaLocationDot size={22} className="text-[#ff4d2d]" />
          <div className="truncate text-gray-600">Patna</div>
        </div>

        {/* Search Input */}
        <div className="w-[80%] flex items-center gap-[10px]">
          <IoIosSearch size={22} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="search delicious food..."
            className="px-[10px] text-gray-700 outline-none w-full"
          />
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-4">
        {/* Mobile search icon */}
        <IoIosSearch
          size={25}
          className="text-[#ff4d2d] md:hidden cursor-pointer"
        />

        {/* Cart */}
        <div className="relative cursor-pointer">
          <FaShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-8px] top-[-10px] text-[#ff4d2d] font-semibold"></span>
        </div>

        {/* My Orders (desktop) */}
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Orders
        </button>

        {/* User avatar */}
        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer">
          S
        </div>
      </div>
    </div>
  );
};

export default UserNavUI;
