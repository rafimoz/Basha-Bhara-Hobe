import QRCode from "qrcode";

export const generateQRCode = async (req, res) => {
  const { ownerId } = req.params;
  const url = `http://localhost:5173/rents/${ownerId}`;
  const qr = await QRCode.toDataURL(url);
  res.json({ qr });
};