import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  ownerId: String,
  title: String,
  description: String,
  price: Number,
  availability: Boolean,
  moveInDate: Date,
  images: [String],
});

export default mongoose.model("Ad", adSchema);