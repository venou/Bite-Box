import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeCartItems, updateQuantity } from "../redux/userSlice";

const CartItemCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: data.id, quantity: data.quantity + 1 }));
  };

  const handleDecrease = () => {
    if (data.quantity > 1) {
      dispatch(updateQuantity({ id: data.id, quantity: data.quantity - 1 }));
    }
  };

  return (
    <div className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm border hover:shadow-md transition">
      {/* Left */}
      <div className="flex gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-20 h-20 rounded-xl object-cover border"
        />

        <div className="flex flex-col justify-between">
          <h2 className="text-gray-800 font-semibold leading-tight">
            {data.name}
          </h2>

          <p className="text-sm text-gray-500">
            ₹{data.price} × {data.quantity}
          </p>

          <p className="text-lg font-bold text-gray-900">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
          <button
            onClick={handleDecrease}
            className="p-2 rounded-full hover:bg-gray-200 active:scale-95 transition"
          >
            <FaMinus size={12} />
          </button>

          <span className="min-w-[20px] text-center font-medium">
            {data.quantity}
          </span>

          <button
            onClick={handleIncrease}
            className="p-2 rounded-full hover:bg-gray-200 active:scale-95 transition"
          >
            <FaPlus size={12} />
          </button>
        </div>

        <button
          onClick={() => dispatch(removeCartItems(data.id))}
          className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition"
        >
          <CiTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
