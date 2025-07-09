import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  ownerId: String,
  title: String,
  description: String,
  price: Number,
  unitId: String,
  renter: { type: String, default: "" },
  waterBill: { type: Number, default: 200 },
  gasBill: { type: Number, default: 1080 },
  trashBill: { type: Number, default: 100 },
  garageBill: { type: Number, default: 400 },
  availability: Boolean,
  moveInDate: Date,
  images: [String],
  monthlyExpenses: [
    {
      month: { type: String, required: true },
      waterBill: { type: Number, default: 0 }, // <--- MUST BE PRESENT
      gasBill: { type: Number, default: 0 }, // <--- MUST BE PRESENT
      trashBill: { type: Number, default: 0 }, // <--- MUST BE PRESENT
      garageBill: { type: Number, default: 0 }, // <--- MUST BE PRESENT
      electricityBill: { type: Number, default: 0 },
      totalBill: { type: Number, default: 0 },
    },
  ],
});

export default mongoose.model("Ad", adSchema);
