import React from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeCartItems, updateQuantity } from "../redux/userSlice";

const CartItemCard = ({ data }) => {
  const dispatch = useDispatch((state) => state.user);
  const handleIncrease = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: (currentQuantity += 1) }));
  };
  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: (currentQuantity -= 1) }));
    }
  };
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border">
      <div className="flex items-center gap-4">
        <img
          className="w-20 h-20 object-cover rounded-lg border"
          src={data.image}
          alt="Food Image"
        />
        <div>
          <h1 className="font-medium text-gray-800">{data.name}</h1>
          <p className=" text-sm text-gray-600">
            ₹{data.price} x {data.quantity}
          </p>
          <p className=" text-sm text-gray-900 font-bold">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => handleDecrease(data.id, data.quantity)}
        >
          <FaMinus size={12} />
        </button>
        <span> {data.quantity} </span>
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => handleIncrease(data.id, data.quantity)}
        >
          <FaPlus size={12} />
        </button>
        <button
          className="bg-red-100 text-red-600 rounded-full hover:bg-red-200"
          onClick={() => dispatch(removeCartItems(data.id))}
        >
          <CiTrash size={22} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
