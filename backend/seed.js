const mongoose = require('mongoose');
const Puzzle = require('./models/Puzzle');
require('dotenv').config();

const puzzles = [
  // Concept: Variables (10 puzzles)
  ...Array.from({ length: 10 }).map((_, i) => ({
    repoId: `var-${i}`,
    title: `Variable Puzzle ${i + 1}`,
    level: 1,
    concept: 'variables',
    files: [{ filename: 'main.py', lines: [{ id: 0, content: `x = ${i}`, correctIndent: 0 }] }]
  })),
  // Concept: Loops (10 puzzles)
  ...Array.from({ length: 10 }).map((_, i) => ({
    repoId: `loop-${i}`,
    title: `Loop Puzzle ${i + 1}`,
    level: 2,
    concept: 'loops',
    files: [{ filename: 'main.py', lines: [{ id: 0, content: `for i in range(${i + 5}):`, correctIndent: 0 }] }]
  })),
  // Concept: Conditionals (10 puzzles)
  ...Array.from({ length: 10 }).map((_, i) => ({
    repoId: `cond-${i}`,
    title: `Conditional Puzzle ${i + 1}`,
    level: 2,
    concept: 'conditionals',
    files: [{ filename: 'main.py', lines: [{ id: 0, content: `if x > ${i}:`, correctIndent: 0 }] }]
  })),
  // Concept: Functions (10 puzzles)
  ...Array.from({ length: 10 }).map((_, i) => ({
    repoId: `func-${i}`,
    title: `Function Puzzle ${i + 1}`,
    level: 3,
    concept: 'functions',
    files: [{ filename: 'main.py', lines: [{ id: 0, content: `def my_func_${i}():`, correctIndent: 0 }] }]
  })),
  // Concept: Data Structures (10 puzzles)
  ...Array.from({ length: 10 }).map((_, i) => ({
    repoId: `ds-${i}`,
    title: `DS Puzzle ${i + 1}`,
    level: 4,
    concept: 'data_structures',
    files: [{ filename: 'main.py', lines: [{ id: 0, content: `my_list = [${i}, ${i+1}]`, correctIndent: 0 }] }]
  })),
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.log('No MONGODB_URI found, skipping seed');
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
  await Puzzle.deleteMany({});
  await Puzzle.insertMany(puzzles);
  console.log('Seeded 50 puzzles');
  process.exit(0);
}

seed();
