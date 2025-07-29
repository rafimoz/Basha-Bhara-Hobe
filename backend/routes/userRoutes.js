import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import router from express.Router();

import "./config/passport.js";

// Google auth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/google-auth?token=${token}`);
  }
);
