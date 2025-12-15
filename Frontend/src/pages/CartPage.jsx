import React from "react";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const CartPage = () => {
  const Navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center p-6">
      <div className="w-full max-w-[800px]">
        <div className="">
          <div
            className=" absolute top-[20px] left-[20px] z-10 mb-[10px] cursor-pointer"
            onClick={() => Navigate("/")}
          >
            <IoReturnUpBack size={35} className="text-[#ff4d2d] " />
          </div>
          <h1>Your Cart</h1>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
