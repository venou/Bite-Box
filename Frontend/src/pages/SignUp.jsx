import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true }
      );
      console.log(result);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#fff5f2]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-3 text-[#ff4d2d] tracking-tight">
          Bite-box
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Create your account and start ordering your favourite meals.
        </p>

        {/* Fullname */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            Fullname
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
            placeholder="Enter your Fullname"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Mobile */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            Mobile
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
            placeholder="Enter your Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="absolute right-3 top-3 text-gray-500 text-lg"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <VscEye /> : <VscEyeClosed />}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Role</label>
          <div className="grid grid-cols-3 gap-3">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className={`py-2 rounded-lg font-medium border transition cursor-pointer ${
                  role === r
                    ? "bg-[#ff4d2d] text-white shadow"
                    : "border-[#ff4d2d] text-[#ff4d2d] hover:bg-[#fff2ee]"
                }`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Signup button */}
        <button
          className="w-full bg-[#ff4d2d] text-white py-3 cursor-pointer rounded-lg font-semibold hover:bg-[#e64323] transition active:scale-[.98] shadow-md"
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        {/* Google */}
        <button className="w-full mt-4 flex items-center cursor-pointer justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 transition">
          <FcGoogle size={22} />
          <span className="font-medium">Sign up with Google</span>
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <Link to="/signin">
            <span className="text-[#ff4d2d] font-semibold hover:underline cursor-pointer">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
