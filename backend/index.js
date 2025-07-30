import dotenv from "dotenv";

dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import adRoutes from "./routes/adRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import connectCloudinary from "./config/cloudinary.js";
import cloudinary from "cloudinary";
import UserModel from "./models/User.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "20mb" }));

// Required for Passport session
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", adRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => res.send("API is working"));

connectCloudinary();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "No record found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ success: true, id: user._id, token });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    // Check if required fields are present
    if (!name || !email || !password || !image) {
      return res.json({ success: false, message: "Missing Fields" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Upload base64 image string to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "user_profiles",
    });
    await UserModel.create({
      name,
      email,
      password: hashedPassword, // Not hashed (as per your request)
      image: result.secure_url,
    });
    res.send({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id }).select("-password"); // Exclude the 'password' field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return publicId; // assuming folder name
};

app.put("/api/user/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, phone } = req.body;

    const user = await UserModel.findById(id);
    const updateData = { name, phone };

    if (image && image.startsWith("data:image")) {
      // Delete previous image if it exists
      if (user.image) {
        const publicId = getPublicIdFromUrl(user.image);
        console.log(publicId);

        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Failed to delete old image from Cloudinary", err);
        }
      }

      // Upload new image
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "user_profiles",
      });
      updateData.image = uploadRes.secure_url;
    }

    await UserModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/user/:id", getUser);
