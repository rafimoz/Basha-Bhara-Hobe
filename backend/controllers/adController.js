import Ad from "../models/Ad.js";
import cloudinary from "cloudinary";

export const getAdsByOwner = async (req, res) => {
  const { ownerId } = req.params;
  const ads = await Ad.find({ ownerId });
  res.json(ads);
};

export const createAd = async (req, res) => {
  const {
    ownerId,
    title,
    description,
    unitId,
    renter,
    price,
    availability,
    moveInDate,
    images,
  } = req.body;

  let uploadedImages = [];
  try {
    uploadedImages = await Promise.all(
      images.map(async (img) => {
        try {
          const result = await cloudinary.uploader.upload(img, {
            transformation: [
              { width: 800, height: 600, crop: "limit" },
              { quality: "auto:eco" },
            ],
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading image:", img, uploadError);
          return null;
        }
      })
    );
    // uploadedImages = uploadedImages.filter(img => img !== null);
  } catch (error) {
    console.error("Error uploading images:", error);
    return res
      .status(500)
      .json({ message: "Failed to upload images", error: error.message });
  }

  const parsedPrice = Number(price);

  if (isNaN(parsedPrice)) {
    return res
      .status(400)
      .json({ message: "Invalid price", error: "Price must be a number" });
  }

  const ad = new Ad({
    ownerId,
    title,
    description,
    unitId,
    renter,
    price: parsedPrice,
    availability,
    moveInDate,
    images: uploadedImages,
  });

  try {
    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error("Error saving ad:", error);
    res
      .status(500)
      .json({ message: "Failed to save ad", error: error.message });
  }
};

export const updateAd = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    unitId,
    renter,
    availability,
    moveInDate,
    images,
  } = req.body;

  try {
    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // Identify images to delete
    const imagesToDelete = ad.images.filter(
      (existingImage) => !images.includes(existingImage)
    );

    // Delete removed images from Cloudinary
    for (const imgUrl of imagesToDelete) {
      try {
        const publicId = getPublicIdFromUrl(imgUrl);
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", imgUrl, error);
      }
    }

    // Upload new images and keep existing ones
    const finalImages = await Promise.all(
      images.map(async (img) => {
        // If it's already a Cloudinary URL, keep it
        if (img.startsWith("http")) return img;

        // Else upload base64 image
        try {
          const result = await cloudinary.uploader.upload(img, {
            transformation: [
              { width: 800, height: 600, crop: "limit" },
              { quality: "auto:eco" },
            ],
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          return null;
        }
      })
    );

    // Filter out failed uploads (nulls)
    const cleanedImages = finalImages.filter((img) => img !== null);

    // Update the ad
    ad.title = title;
    ad.description = description;
    ad.price = price;
    ad.unitId = unitId;
    ad.renter = renter;
    ad.availability = availability;
    ad.moveInDate = moveInDate;
    ad.images = cleanedImages;

    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error("Error updating ad:", error);
    res
      .status(500)
      .json({ message: "Failed to update ad", error: error.message });
  }
};

export const addMonthlyExpense = async (req, res) => {
  try {
    const { adId } = req.params;
    const newMonthlyExpense = req.body; // This should contain month, waterBill, gasBill, etc.

    // Basic validation (optional, Mongoose schema handles much of this)
    if (!newMonthlyExpense.month) {
      return res.status(400).json({ message: "Month is required." });
    }

    const ad = await Ad.findById(adId);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found." });
    }

    // Add the new expense to the monthlyExpenses array
    ad.monthlyExpenses.push(newMonthlyExpense);

    // Save the updated Ad document
    await ad.save();

    res.status(201).json({
      message: "Monthly expense added successfully!",
      newExpense: newMonthlyExpense,
    });
  } catch (error) {
    console.error("Error saving monthly expense:", error); // <-- Look for this in your server console!
    // More specific error handling could be done here based on error.name (e.g., ValidationError)
    res.status(500).json({
      message: "Failed to save monthly expenses.",
      error: error.message,
    });
  }
};

export const updateMonthlyExpense = async (req, res) => {
  const { adId } = req.params; // Get both adId and expenseId
  const { waterBill, gasBill, trashBill, garageBill, electricityBill, price } =
    req.body;

  try {
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    // Update the ad
    ad.price = price;
    ad.waterBill = waterBill;
    ad.gasBill = gasBill;
    ad.trashBill = trashBill;
    ad.electricityBill = electricityBill;
    ad.garageBill = garageBill;

    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error("Error updating ad:", error);
    res
      .status(500)
      .json({ message: "Failed to update ad", error: error.message });
  }
};

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1]; // e.g., qxxjugrgqlkwbxmm59nw.jpg
  const publicIdWithExtension = filename;
  const publicId = publicIdWithExtension.split(".")[0]; // remove .jpg extension
  return publicId;
};

export const deleteAd = async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Ad.findById(id);

    if (!ad) {
      console.log("Ad not found");
      return res.status(404).json({ message: "Ad not found" });
    }

    if (Array.isArray(ad.images) && ad.images.length > 0) {
      const deleteImagePromises = ad.images.map(async (imgUrl) => {
        try {
          const publicId = getPublicIdFromUrl(imgUrl);
          const result = await cloudinary.v2.uploader.destroy(publicId);
          console.log(`Deleted from Cloudinary: ${publicId}`, result);
        } catch (err) {
          // Log the error, but don't stop execution
          console.warn(`Failed to delete image: ${imgUrl}`, err.message);
        }
      });

      await Promise.all(deleteImagePromises);
    }

    await Ad.findByIdAndDelete(id);
    console.log("Ad deleted successfully");
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting ad:", error);
    res
      .status(500)
      .json({ message: "Failed to delete ad", error: error.message });
  }
};
