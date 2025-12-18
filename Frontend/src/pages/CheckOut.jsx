import React from "react";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";

const CheckOut = () => {
  const Navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6 ">
      <div
        className=" absolute top-[20px] left-[20px] z-10 cursor-pointer"
        onClick={() => Navigate("/")}
      >
        <IoReturnUpBack size={35} className="text-[#ff4d2d] " />
      </div>
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className=" text-2xl font-bold text-gray-800">Checkout</h1>
        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
            <IoLocationSharp size={22} className="text-[#ff4d2d]" />
            Delivery Location
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
              type="text"
              placeholder="Enter Your Delivery Address"
            />
            <button className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center ">
              <IoSearch />
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center">
              <TbCurrentLocation />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
