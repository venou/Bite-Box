import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error.response?.data.message);
      setLoading(false);
    }
  };
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#fff5f2]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-3 text-[#ff4d2d] tracking-tight">
          Bite-box
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Login your account and start ordering your favourite meals.
        </p>

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
            required
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
              required
            />
            <button
              className="absolute right-3 top-3 text-gray-500 text-lg"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <VscEye /> : <VscEyeClosed />}
            </button>
          </div>
          <Link to="/forgot-password">
            <div className="mb-4 text-right text-[#ff4d2d] font-medium cursor-pointer">
              Forgot Password
            </div>
          </Link>
        </div>

        {/* SignIn button */}
        <button
          className="w-full bg-[#ff4d2d] text-white py-3 cursor-pointer rounded-lg font-semibold hover:bg-[#e64323] transition active:scale-[.98] shadow-md"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <ClipLoader size={22} color="white" /> : "Sign In"}
        </button>
        {err && <p className="text-center text-red-500 my-2.5">* {err}</p>}

        {/* Google */}
        <button
          type="button"
          className="w-full mt-4 flex items-center cursor-pointer justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 transition"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={22} />
          <span className="font-medium">Login with Google</span>
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <Link to="/signup">
            <span className="text-[#ff4d2d] font-semibold hover:underline cursor-pointer">
              Create One
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
