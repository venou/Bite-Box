import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createAndEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    // Validation
    if (!name || !city || !state || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl;
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userId });

    const shopData = {
      name,
      city,
      state,
      address,
      owner: req.userId,
    };

    // Add image only if uploaded
    if (imageUrl) {
      shopData.image = imageUrl;
    }

    if (!shop) {
      shop = await Shop.create(shopData);
    } else {
      shop = await Shop.findByIdAndUpdate(shop._id, shopData, { new: true });
    }

    await shop.populate("owner items");
    return res.status(201).json(shop);
  } catch (error) {
    console.error("Shop creation error:", error);
    return res.status(500).json({ message: "Failed to create/update shop" });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId })
      .populate("owner")
      .populate({ path: "items", options: { sort: { createdAt: -1 } } });
    if (!shop) {
      return null;
    }
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `get shop error ${error}` });
  }
};
