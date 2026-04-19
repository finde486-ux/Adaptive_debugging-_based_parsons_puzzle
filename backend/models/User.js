const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, index: true },
  email: { type: String, unique: true },
  displayName: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: Date,
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActivityDate: Date,
    freezesAvailable: { type: Number, default: 0 } // max 2
  },
  xp: { type: Number, default: 0 },
  badges: [{
    badgeId: String,
    unlockedAt: { type: Date, default: Date.now }
  }],
  languages: [{
    language: { type: String, default: 'python' },
    placementCompleted: { type: Boolean, default: false },
    overallLevel: { type: Number, default: 1 },
    conceptMastery: [{
      concept: String,
      level: { type: Number, default: 1 },
      eloRating: { type: Number, default: 800 },
      totalAttempts: { type: Number, default: 0 },
      correctAttempts: { type: Number, default: 0 },
      lastAttemptAt: Date
      // FUTURE: spacedRepetitionDueAt: Date
    }]
  }],
  preferences: {
    theme: { type: String, default: 'dark' },
    fontSize: { type: Number, default: 16 },
    keyboardMode: { type: Boolean, default: false }
  }
  // FUTURE: classIds: [ObjectId]
  // FUTURE: weeklyXp: Number
});

module.exports = mongoose.model('User', UserSchema);
