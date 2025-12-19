import express from "express";
import {
  createAndEditShop,
  getMyShop,
  getShopByCity,
} from "../controllers/shop.controllers.js";
import { upload } from "../middlewares/multer.js";
import isAuth from "../middlewares/isAuth.js";
const shopRouter = express.Router();

shopRouter.post(
  "/create-edit",
  isAuth,
  upload.single("image"),
  createAndEditShop
);

shopRouter.get("/get-my", isAuth, getMyShop);
shopRouter.get("/get-by-city/:city",  getShopByCity);

export default shopRouter;
