import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    console.error("Full Error:", error); // Pura error dekhne ke liye
  }
};

export default connectDB;
