import React from "react";

const CategeoryCard = ({ data }) => {
  return (
    <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl border-2 border-[#ff4d2d]/20 shrink-0 overflow-hidden bg-white/80 backdrop-blur-sm shadow-2xl shadow-[#ff4d2d]/10 hover:shadow-[#ff4d2d]/20 transition-all duration-300 hover:scale-[1.02]">
      <img
        src={data.image}
        alt=""
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300 relative"
      />
      <div className="absolute bottom-0 w-full left-0 bg-[#ffffff96] bg-opacity-95 px-3 py-1 rounded-t-xl text-center shadow text-sm font-medium text-gray-800 backdrop-blur ">{data.category}</div>
    </div>
  );
};

export default CategeoryCard;
