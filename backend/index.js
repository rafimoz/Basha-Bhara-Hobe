import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import adRoutes from "./routes/adRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import connectCloudinary from "./config/cloudinary.js";
import UserModel from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use("/api", adRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend API");
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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then(user => {
    if (user) {
      if (user.password === password) {
        res.json(user._id);
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  })
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
