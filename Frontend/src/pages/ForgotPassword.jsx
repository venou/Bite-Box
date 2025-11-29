import React, { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(2);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

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
              onClick={() => setStep(2)}
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
              onClick={() => setStep(2)}
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
              onClick={() => setStep(2)}
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
      </div>
    </div>
  );
};

export default ForgotPassword;
