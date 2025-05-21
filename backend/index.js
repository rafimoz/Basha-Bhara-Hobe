import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import adRoutes from "./routes/adRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import connectCloudinary from './config/cloudinary.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './.env') });


const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use("/api", adRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello from backend API');
// });

connectCloudinary()
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
