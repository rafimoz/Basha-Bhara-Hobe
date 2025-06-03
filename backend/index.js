import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import adRoutes from "./routes/adRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import connectCloudinary from "./config/cloudinary.js";
import cloudinary from "cloudinary";
import UserModel from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use("/api", adRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectCloudinary();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        let id = user._id;
        res.json({ success: true, id });
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    // Check if required fields are present
    if (!name || !email || !password || !image) {
      return res.json({ success: false, message: 'Missing Fields' });
    }

    // Upload base64 image string to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "user_profiles",
    });

    const newUser = await UserModel.create({
      name,
      email,
      password, // Not hashed (as per your request)
      image: result.secure_url,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

app.get("/api/user/:id", getUser);
