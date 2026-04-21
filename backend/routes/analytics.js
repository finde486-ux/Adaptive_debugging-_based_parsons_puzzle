const express = require('express');
const router = express.Router();

router.get('/overview', (req, res) => {
  res.json({
    totalXP: 1250,
    currentStreak: 5,
    puzzlesSolved: 12,
    badgesCount: 3
  });
});

router.get('/concepts', (req, res) => {
  res.json([
    { concept: 'Variables', mastery: 0.9, level: 4 },
    { concept: 'Loops', mastery: 0.6, level: 2 },
    { concept: 'Conditionals', mastery: 0.75, level: 3 },
  ]);
});

router.get('/timeline', (req, res) => {
  res.json([
    { date: '2024-04-12', xp: 100 },
    { date: '2024-04-13', xp: 150 },
    { date: '2024-04-14', xp: 200 },
    { date: '2024-04-15', xp: 300 },
  ]);
});

module.exports = router;
