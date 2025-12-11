import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OwnerItemCard = ({ data }) => {
  const Navigate = useNavigate();
  return (
    <div className="flex bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#ff4d2d]/40 w-full max-w-2xl backdrop-blur-sm">
      {/* Image Section */}
      <div className="w-40 flex-shrink-0">
        <img
          src={data.image}
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h2 className="text-lg font-semibold text-[#ff4d2d] tracking-wide">
            {data.name}
          </h2>
          <p className="text-gray-600 mt-1">
            <span className="font-medium">Category:</span> {data.categeory}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Food Type:</span> {data.foodType}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="text-xl font-bold text-[#ff4d2d]">₹{data.price}</div>

          <div className="flex items-center gap-3">
            <button
              className="p-2.5 rounded-full hover:bg-[#ff4d2d]/15 text-[#ff4d2d] transition-all"
              onClick={() => Navigate(`/edit-item/${data._id}`)}
            >
              <FaPen size={16} />
            </button>
            <button className="p-2.5 rounded-full hover:bg-red-500/15 text-red-500 transition-all">
              <FaTrashAlt size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;
