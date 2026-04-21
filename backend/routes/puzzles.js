const express = require('express');
const router = express.Router();
const llmService = require('../services/llm');

router.get('/next', (req, res) => {
  // Logic to select next puzzle based on user level and concept mastery
  res.json({ id: 'mock-puzzle-id', title: 'Example Puzzle' });
});

router.post('/:puzzleId/hint', async (req, res) => {
  const { puzzleId } = req.params;
  const { history, currentCode } = req.body;
  const hint = await llmService.generateHint(puzzleId, history, currentCode);
  res.json({ hint });
});

router.post('/:puzzleId/explain-line', async (req, res) => {
  const { puzzleId } = req.params;
  const { lineId } = req.body;
  const explanation = await llmService.explainLine(puzzleId, lineId);
  res.json({ explanation });
});

module.exports = router;
