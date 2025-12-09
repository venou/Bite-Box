import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { GiKnifeFork } from "react-icons/gi";
import axios from "axios";
import { serverUrl } from "../App";
import { CiCirclePlus } from "react-icons/ci";
import { LuReceiptIndianRupee } from "react-icons/lu";

const Nav = () => {
  const { userData, currentCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  // -------------------------------------------------------------------
  // LOGOUT HANDLER
  // -------------------------------------------------------------------
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[80px] fixed top-0 left-0 z-[9999] bg-[#fff9f6] flex items-center px-5 justify-between shadow-sm">
      {/* ===================================================================
          MOBILE SEARCH BAR (Shows only when toggled)
      =================================================================== */}
      {showSearch && userData?.role === "user" && (
        <div className="fixed top-[80px] left-0 w-full h-[70px] bg-white shadow-xl rounded-b-xl flex items-center gap-4 px-4 md:hidden z-[9998]">
          {/* City Name */}
          <div className="flex items-center w-[30%] gap-2 pr-3 border-r border-gray-300">
            <FaLocationDot size={22} className="text-[#ff4d2d]" />
            <span className="truncate text-gray-600">{currentCity}</span>
          </div>

          {/* Search Input */}
          <div className="flex items-center w-[70%] gap-2">
            <IoIosSearch size={22} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="w-full outline-none text-gray-700 px-1"
            />
          </div>
        </div>
      )}

      {/* ===================================================================
          BRAND LOGO
      =================================================================== */}
      <h1 className="font-bold text-3xl md:text-4xl text-[#ff4d2d]">
        Bite<span className="text-black">Box</span>
      </h1>

      {/* ===================================================================
          DESKTOP SEARCH BAR (Only visible for users)
      =================================================================== */}
      {userData?.role === "user" && (
        <div className="hidden md:flex items-center w-[45%] h-[60px] bg-white shadow-md rounded-xl px-3 gap-4">
          {/* City Box */}
          <div className="flex items-center w-[30%] gap-2 pr-3 border-r border-gray-300">
            <FaLocationDot size={22} className="text-[#ff4d2d]" />
            <span className="truncate text-gray-600">{currentCity}</span>
          </div>

          {/* Search Input */}
          <div className="flex items-center w-[60%] gap-2">
            <IoIosSearch size={22} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="w-full outline-none text-gray-700 px-1"
            />
          </div>
        </div>
      )}

      {/* ===================================================================
          RIGHT SIDE BUTTONS (User / Owner)
      =================================================================== */}
      <div className="flex items-center gap-4">
        {/* ---------------------------------------------------------------
            MOBILE SEARCH ICON (User only)
        ---------------------------------------------------------------- */}
        {userData?.role === "user" &&
          (showSearch ? (
            <GiKnifeFork
              size={26}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoIosSearch
              size={26}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {/* ---------------------------------------------------------------
            OWNER BUTTONS — Add Food + Orders
        ---------------------------------------------------------------- */}
        {userData?.role === "owner" ? (
          <>
            {myShopData && (
              <>
                {/* Desktop Add Food */}
                <button className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer text-sm">
                  <CiCirclePlus size={22} />
                  <span>Add Food Item</span>
                </button>

                {/* Mobile Add Food */}
                <button className="md:hidden flex items-center p-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer">
                  <CiCirclePlus size={20} />
                </button>
              </>
            )}

            {/* Desktop My Orders */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">
              <LuReceiptIndianRupee size={20} />
              <span>My Orders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>

            {/* Mobile My Orders */}
            <div className="md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">
              <LuReceiptIndianRupee size={20} />
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>
          </>
        ) : (
          // ---------------------------------------------------------------
          // CART ICON (Visible for normal users)
          // ---------------------------------------------------------------
          <div className="relative cursor-pointer">
            <FaShoppingCart size={22} className="text-[#ff4d2d]" />
            <span className="absolute right-[-6px] top-[-8px] text-[#ff4d2d] text-xs font-bold">
              0
            </span>
          </div>
        )}

        {/* ---------------------------------------------------------------
            DESKTOP "MY ORDERS" BUTTON (User only)
        ---------------------------------------------------------------- */}
        {userData?.role === "user" && (
          <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
            My Orders
          </button>
        )}

        {/* ---------------------------------------------------------------
            AVATAR (Opens dropdown)
        ---------------------------------------------------------------- */}
        <div
          className="w-10 h-10 rounded-full bg-[#ff4d2d] text-white flex items-center justify-center text-lg font-semibold cursor-pointer shadow-md"
          onClick={() => setShowInfo(!showInfo)}
        >
          {userData?.fullName?.[0]}
        </div>

        {/* ---------------------------------------------------------------
            DROPDOWN (User + Owner)
        ---------------------------------------------------------------- */}
        {showInfo && (
          <div className="absolute top-[85px] right-4 w-[180px] bg-white shadow-xl rounded-xl p-4 flex flex-col gap-3 z-[9999]">
            <span className="font-semibold text-lg">{userData?.fullName}</span>

            {/* Mobile My Orders */}
            {userData.role === "user" && (
              <span className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
                My Orders
              </span>
            )}

            {/* Logout */}
            <span
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Log Out
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
