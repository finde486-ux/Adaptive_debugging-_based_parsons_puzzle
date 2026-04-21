const express = require('express');
const router = express.Router();

router.get('/puzzles', (req, res) => {
  res.json([
    { id: 1, title: 'Loop Debugging', level: 2, concept: 'loops', reviewed: true },
    { id: 2, title: 'List Comp Fix', level: 3, concept: 'data_structures', reviewed: false },
  ]);
});

router.get('/puzzles/reported', (req, res) => {
  res.json([
    { id: 1, reason: 'Wrong expected output', userId: 'user123', timestamp: new Date() }
  ]);
});

module.exports = router;
