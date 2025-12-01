import React, { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newPassword,
        },
        { withCredentials: true }
      );
      console.log(result);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#fff5f2]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/signin">
            <IoReturnUpBack
              size={24}
              className="text-[#ff4d2d] cursor-pointer hover:opacity-80"
            />
          </Link>
          <h1 className="text-3xl font-bold text-[#ff4d2d] tracking-tight">
            Forgot Password
          </h1>
        </div>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendOtp}
              disabled={!email.trim()}
              className={`w-full mt-5 py-3 cursor-pointer rounded-lg text-white font-semibold transition-all
                ${
                  email.trim()
                    ? "bg-[#ff4d2d] hover:bg-[#e04426]"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              Send OTP
            </button>
          </div>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              OTP
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              disabled={!otp.trim()}
              className={`w-full mt-5 py-3 cursor-pointer rounded-lg text-white font-semibold transition-all
                ${
                  otp.trim()
                    ? "bg-[#ff4d2d] hover:bg-[#e04426]"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              Verify
            </button>
          </div>
        )}

        {/* Step 3: Confirm Password */}
        {step === 3 && (
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              New Password
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d2d]"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              disabled={!otp.trim()}
              className={`w-full mt-5 py-3 cursor-pointer rounded-lg text-white font-semibold transition-all
                ${
                  otp.trim()
                    ? "bg-[#ff4d2d] hover:bg-[#e04426]"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
