import Ad from "../models/Ad.js";
import cloudinary from "cloudinary";
import dataUriToBuffer from "data-uri-to-buffer";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAdsByOwner = async (req, res) => {
  const { ownerId } = req.params;
  const ads = await Ad.find({ ownerId });
  res.json(ads);
};

export const createAd = async (req, res) => {
  const { ownerId, title, description, price, availability, moveInDate, images } = req.body;

  console.log("Received images:", images);

 let uploadedImages = [];
  try {
    uploadedImages = await Promise.all(
      images.map(async (img) => {
        try {
          const buffer = dataUriToBuffer(img);
          const result = await cloudinary.v2.uploader.upload(buffer, {
            folder: "ghor-bhara",
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading image:", img, uploadError);
          return null;
        }
      })
    );
    uploadedImages = uploadedImages.filter(img => img !== null);
  } catch (error) {
    console.error("Error uploading images:", error);
    return res.status(500).json({ message: "Failed to upload images", error: error.message });
  }

  const parsedPrice = Number(price);

  if (isNaN(parsedPrice)) {
    return res.status(400).json({ message: "Invalid price", error: "Price must be a number" });
  }

 const ad = new Ad({
    ownerId,
    title,
    description,
    price: parsedPrice,
    availability,
    moveInDate,
    images: uploadedImages,
  });

  console.log("Price being saved to database:", ad.price);

  try {
    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error("Error saving ad:", error);
    res.status(500).json({ message: "Failed to save ad", error: error.message });
  }
};

export const updateAd = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, availability, moveInDate } = req.body;
  const ad = await Ad.findByIdAndUpdate(
    id,
    { title, description, price, availability, moveInDate },
    { new: true }
  );
  res.json(ad);
};

export const deleteAd = async (req, res) => {
  const { id } = req.params;
  await Ad.findByIdAndDelete(id);
  res.sendStatus(204);
};
