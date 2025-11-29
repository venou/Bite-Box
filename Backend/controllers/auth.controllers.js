import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../utils/token.js";

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
