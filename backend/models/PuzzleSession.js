const mongoose = require('mongoose');

const PuzzleSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  puzzleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Puzzle', required: true },
  puzzleVersion: Number,
  language: { type: String, default: 'python' },
  status: { type: String, enum: ['in_progress', 'completed', 'skipped'], default: 'in_progress' },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
  timeSpentSeconds: { type: Number, default: 0 },
  attempts: [{
    submittedOrder: [Number],
    indents: { type: Map, of: Number },
    isCorrect: Boolean,
    errorType: { type: String, enum: ['wrong_order', 'wrong_indent', 'wrong_line', 'distractor_included'] },
    timestamp: { type: Date, default: Date.now }
  }],
  hintsUsed: [{
    hintIndex: Number,
    usedAt: { type: Date, default: Date.now }
  }],
  distractorsRejected: [Number],
  xpEarned: { type: Number, default: 0 },
  resumeState: {
    workspaceOrder: [Number],
    pieceListOrder: [Number],
    indents: { type: Map, of: Number }
  }
});

module.exports = mongoose.model('PuzzleSession', PuzzleSessionSchema);
