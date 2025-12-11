import React, { useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice.js";
import { ClipLoader } from "react-spinners";

function EditItem() {
  const Navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [frontEndImage, setFrontEndImage] = useState("");
  const [backEndImage, setBackEndImage] = useState(null);
  const { itemId } = useParams();
  const [loading, setLoading] = useState(false);
  const categeories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizzas",
    "Burgers",
    "Sandwiches",
    "North Indian",
    "South Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];
  const [categeory, setCategeory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackEndImage(file);
    setFrontEndImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("categeory", categeory);
      formData.append("foodType", foodType);
      formData.append("price", price);

      if (backEndImage) {
        formData.append("image", backEndImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      Navigate("/ ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetItemById = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-id/${itemId}`,
          { withCredentials: true }
        );
        setCurrentItem(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetItemById();
  }, [itemId]);

  useEffect(() => {
    if (!currentItem) return;

    setName(currentItem.name || "");
    setPrice(currentItem.price || 0);
    setCategeory(currentItem.categeory || "");
    setFoodType(currentItem.foodType || "veg");
    setFrontEndImage(currentItem.image || "");
  }, [currentItem]);
  return (
    <div className=" flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div
        className=" absolute top-[20px] left-[20px] z-10 mb-[10px] cursor-pointer"
        onClick={() => Navigate("/")}
      >
        <IoReturnUpBack size={35} className="text-[#ff4d2d] " />
      </div>

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] h-16 w-16" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            Edit Food Items
          </div>
        </div>
        <form className=" space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Food Name"
              className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              onChange={handleImage}
            />
            {frontEndImage && (
              <div className="mt-4">
                <img
                  src={frontEndImage}
                  alt="shop image"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="0"
              className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Select Categeory
            </label>
            <select
              className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              onChange={(e) => setCategeory(e.target.value)}
              value={categeory}
            >
              <option value="" disabled>
                Select a Categeory
              </option>
              {categeories.map((categeory, index) => (
                <option key={index} value={categeory}>
                  {categeory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Select Food Type
            </label>
            <select
              className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="veg">veg </option>
              <option value="Non-veg">Non-veg </option>
            </select>
          </div>

          <button
            className=" w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all cursor-pointer "
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
