const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const QRCode = require('qrcode');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Cloudinary Config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Models
const Admin = mongoose.model('Admin', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  qrCodeUrl: String,
}));

const Ad = mongoose.model('Ad', new mongoose.Schema({
  adminId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  price: Number,
  available: Boolean,
  moveInDate: Date,
  images: [String]
}));

// Upload Setup
const upload = multer({ dest: 'uploads/' });

// Auth Middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes
app.post('/api/admin/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const admin = new Admin({ name, email, password: hashed });
  await admin.save();
  const qrUrl = `${process.env.CLIENT_URL}/houses/${admin._id}`;
  const qrCodeUrl = await QRCode.toDataURL(qrUrl);
  admin.qrCodeUrl = qrCodeUrl;
  await admin.save();
  res.json({ adminId: admin._id, qrCodeUrl });
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await bcrypt.compare(password, admin.password))) return res.sendStatus(401);
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.post('/api/ads', authenticateToken, upload.array('images'), async (req, res) => {
  const uploaded = await Promise.all(req.files.map(file => cloudinary.uploader.upload(file.path)));
  const imageUrls = uploaded.map(file => file.secure_url);
  const ad = new Ad({ ...req.body, adminId: req.user.id, images: imageUrls });
  await ad.save();
  res.json(ad);
});

app.get('/api/ads/:adminId', async (req, res) => {
  const ads = await Ad.find({ adminId: req.params.adminId, available: true });
  res.json(ads);
});

app.put('/api/ads/:id', authenticateToken, async (req, res) => {
  const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ad);
});

app.delete('/api/ads/:id', authenticateToken, async (req, res) => {
  await Ad.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(5000, () => console.log('Server running on port 5000'));