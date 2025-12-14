import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { categories } from "../categeory";
import CategeoryCard from "./CategeoryCard";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";

const UserDashboard = () => {
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const { shopInMyCity, currentCity, itemsInMyCity } = useSelector(
    (state) => state.user
  );
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [showLeftShoptButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

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
    const cateScrollHandler = () => {
      updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
    };

    const shopScrollHandler = () => {
      updateButton(
        shopScrollRef,
        setShowLeftShopButton,
        setShowRightShopButton
      );
    };

    if (cateScrollRef.current && shopScrollRef.current) {
      updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      updateButton(
        shopScrollRef,
        setShowLeftShopButton,
        setShowRightShopButton
      );

      cateScrollRef.current.addEventListener("scroll", cateScrollHandler);
      shopScrollRef.current.addEventListener("scroll", shopScrollHandler);
    }

    return () => {
      if (cateScrollRef.current) {
        cateScrollRef.current.removeEventListener("scroll", cateScrollHandler);
      }
      if (shopScrollRef.current) {
        shopScrollRef.current.removeEventListener("scroll", shopScrollHandler);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Nav />

      {/* Inspiration for order */}
      <div className="w-full max-w-6xl px-3 sm:px-5 mt-6">
        <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold mb-4">
          Inspiration for your first order
        </h1>

        <div className="relative">
          {/* LEFT BUTTON */}
          {showLeftButton && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2
                         bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg
                         opacity-80 hover:opacity-100 transition z-10"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaCaretSquareLeft size={22} />
            </button>
          )}

          {/* SCROLL AREA */}
          <div
            ref={cateScrollRef}
            className="flex gap-4 overflow-x-auto pb-3
                       scrollbar-thin scrollbar-thumb-[#ff4d2d]
                       scrollbar-track-transparent scroll-smooth"
          >
            {categories?.map((cate, index) => (
              <CategeoryCard
                key={index}
                name={cate.category}
                image={cate.image}
              />
            ))}
          </div>

          {/* RIGHT BUTTON */}
          {showRightButton && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2
                         bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg
                         opacity-80 hover:opacity-100 transition z-10"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaCaretSquareRight size={22} />
            </button>
          )}
        </div>
      </div>

      {/* Best shop in your city */}

      <div className="w-full max-w-6xl px-3 sm:px-5 mt-6">
        <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold mb-4">
          Best Shops in {currentCity}
        </h1>
        <div className="relative">
          {/* LEFT BUTTON */}
          {showLeftShoptButton && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2
                         bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg
                         opacity-80 hover:opacity-100 transition z-10"
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaCaretSquareLeft size={22} />
            </button>
          )}

          {/* SCROLL AREA */}
          <div
            ref={shopScrollRef}
            className="flex gap-4 overflow-x-auto pb-3
                       scrollbar-thin scrollbar-thumb-[#ff4d2d]
                       scrollbar-track-transparent scroll-smooth"
          >
            {shopInMyCity?.map((shop, index) => (
              <CategeoryCard key={index} name={shop.name} image={shop.image} />
            ))}
          </div>

          {/* RIGHT BUTTON */}
          {showRightShopButton && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2
                         bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg
                         opacity-80 hover:opacity-100 transition z-10"
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaCaretSquareRight size={22} />
            </button>
          )}
        </div>
      </div>

      {/* Items */}

      <div className="w-full max-w-6xl px-3 sm:px-5 mt-6">
        <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold mb-4">
          Suggested Food Items
        </h1>
        <div className="w-full flex flex-wrap gap-5 justify-center">
          {itemsInMyCity?.map((items, index) => (
            <FoodCard key={index} data={items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
