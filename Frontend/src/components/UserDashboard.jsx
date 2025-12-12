import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { categories } from "../categeory";
import CategeoryCard from "./CategeoryCard";
import { FaCaretSquareLeft } from "react-icons/fa";
import { FaCaretSquareRight } from "react-icons/fa";

const UserDashboard = () => {
  const cateScrollRef = useRef();
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const updateButton = (ref, setShowLeftButton, setShowRightButton) => {
    const element = ref.current;
    if (element) {
      setShowLeftButton(element.scrollLeft > 0);
      setShowRightButton(
        element.scrollLeft < element.scrollWidth - element.clientWidth
      );
    }
  };

  useEffect(() => {
    if (cateScrollRef.current) {
      cateScrollRef.current.addEventListener("scroll", () => {
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      });
    }
  }, []);

  return (
    <div className="w-full h-full gap-5  bg-[#fff9f6] flex flex-col items-center">
      <Nav />
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px] "></div>
      <h1 className="text-gray-800 text-2xl sm:text-3xl">
        Inspiration for your first Order.
      </h1>
      <div className="w-full ">
        <div className="w-full relative flex overflow-x-auto gap-4  pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth">
          {showLeftButton && (
            <button
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaCaretSquareLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2"
            ref={cateScrollRef}
          >
            {categories.map((cate, index) => (
              <CategeoryCard key={index} data={cate} />
            ))}
          </div>

          {showRightButton && (
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaCaretSquareRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
