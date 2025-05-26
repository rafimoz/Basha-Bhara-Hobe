import QRCode from "qrcode";

export const generateQRCode = async (req, res) => {
  const { ownerId } = req.params;
  const frontendURL = process.env.FRONTEND_URL
  const url = frontendURL + `/rents/${ownerId}`;
  const qr = await QRCode.toDataURL(url);
  res.json({ qr });
};