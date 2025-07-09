import express from "express";
import {
  getAdsByOwner,
  createAd,
  updateAd,
  deleteAd,
  addMonthlyExpense,
  updateMonthlyExpense,
} from "../controllers/adController.js";
import { generateQRCode } from "../controllers/qrController.js";

const router = express.Router();

router.get("/ads/:ownerId", getAdsByOwner);
router.post("/ads", createAd);
router.post("/ads/monthlyexpenses/:adId", addMonthlyExpense);
router.put("/ads/updateexpenses/:adId", updateMonthlyExpense);
router.put("/ads/:id", updateAd);
router.delete("/ads/:id", deleteAd);
router.get("/qrcode/:ownerId", generateQRCode);

export default router;