import express from "express";
import {
  getAdsByOwner,
  createAd,
  updateAd,
  deleteAd,
} from "../controllers/adController.js";
import { generateQRCode } from "../controllers/qrController.js";

const router = express.Router();

router.get("/ads/:ownerId", getAdsByOwner);
router.post("/ads", createAd);
router.put("/ads/:id", updateAd);
router.delete("/ads/:id", deleteAd);
router.get("/qrcode/:ownerId", generateQRCode);

export default router;