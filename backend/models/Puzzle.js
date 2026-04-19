const mongoose = require('mongoose');

const PuzzleSchema = new mongoose.Schema({
  repoId: { type: String, unique: true, required: true },
  version: { type: Number, default: 1 },
  language: { type: String, default: 'python' },
  pythonVersion: { type: String, default: '3.11' },
  level: { type: Number, required: true },
  concept: { type: String, required: true },
  subConcept: String,
  prerequisiteConcepts: [String],
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  goal: {
    description: String,
    exampleInput: String,
    exampleOutput: String
  },
  bugType: String,
  bugDescription: String,
  files: [{
    filename: String,
    isPrimary: { type: Boolean, default: false },
    isEditable: { type: Boolean, default: true },
    lines: [{
      id: Number,
      content: String,
      correctIndent: Number,
      isFixed: { type: Boolean, default: false },
      isBuggy: { type: Boolean, default: false },
      bugNote: String,
      isDistractor: { type: Boolean, default: false }
    }]
  }],
  metadata: {
    generatedBy: { type: String, default: 'llm' },
    llmProvider: String,
    llmModel: String,
    generatedAt: { type: Date, default: Date.now },
    reviewedByHuman: { type: Boolean, default: false },
    qualityScore: { type: Number, default: 0 },
    timesServed: { type: Number, default: 0 },
    avgCompletionTime: Number,
    passRate: Number
  },
  reports: [{
    userId: mongoose.Schema.Types.ObjectId,
    reason: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Puzzle', PuzzleSchema);
