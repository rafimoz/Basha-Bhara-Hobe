import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle Google callback
router.get("/google/callback", passport.authenticate("google", {
  session: false,
  failureRedirect: "/login",
}), (req, res) => {
  const user = req.user;

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // Redirect to frontend with token and user id
  res.redirect(`${process.env.FRONTEND_URL}/google-auth?token=${token}&id=${user._id}`);
});

export default router;