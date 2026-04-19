const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Mock Google OAuth initiation
router.get('/google', (req, res) => {
  // In a real app, this redirects to Google
  // For V1.0 mock, we'll just redirect to a callback with mock data
  res.redirect('/auth/google/callback');
});

// Mock Google OAuth callback
router.get('/google/callback', async (req, res) => {
  // Simulate finding or creating a user
  let user = await User.findOne({ googleId: 'mock_google_id' });
  if (!user) {
    user = await User.create({
      googleId: 'mock_google_id',
      email: 'student@example.com',
      displayName: 'Mock Student',
      avatar: 'https://example.com/avatar.png'
    });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.redirect(process.env.CLIENT_URL || 'http://localhost:5173/home');
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
});

router.get('/me', async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
