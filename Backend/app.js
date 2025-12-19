import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.route.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "https://bite-box-khaki.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server Started at ${port}`);
});
