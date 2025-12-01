import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../utils/token.js";
import { sendOtopMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, mobile, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be grater than 8 characters" });
    }
    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Number must be atleast 10 digits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`Sign up error ${error}`);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "incorrect password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`Sign In error ${error}`);
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Sucessfully" });
  } catch (error) {
    return res.status(500).json(`logout error ${error}`);
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.restOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtopMail(email, otp);
    return res.status(200).json({ message: "otp sent sucessfully" });
  } catch (error) {
    return res.status(500).json(`send otp error ${error}`);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.restOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "otp expired/ invalid otp" });
    }
    user.isOtpVerified = true;
    user.restOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "otp verfied sucessfully" });
  } catch (error) {
    return res.status(500).json(`verift otp error ${error}`);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "otp verification required" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "password reset sucessfully" });
  } catch (error) {
    return res.status(500).json(`password reset error ${error}`);
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
      });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`googleauth error ${error}`);
  }
};
