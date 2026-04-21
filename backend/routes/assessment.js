const express = require('express');
const router = express.Router();

const ASSESSMENT_QUESTIONS = {
  python: [
    { id: 1, level: 1, question: 'What is the output of print(2 + 2)?', options: ['3', '4', '5', '22'], answer: '4' },
    { id: 2, level: 2, question: 'Which keyword is used to define a function in Python?', options: ['func', 'define', 'def', 'function'], answer: 'def' },
    { id: 3, level: 3, question: 'What does [x**2 for x in range(3)] result in?', options: ['[0, 1, 4]', '[1, 4, 9]', '[0, 1, 2]', '[1, 2, 3]'], answer: '[0, 1, 4]' },
    { id: 4, level: 4, question: 'What is a decorator in Python?', options: ['A UI element', 'A function that modifies another function', 'A way to delete variables', 'A class attribute'], answer: 'A function that modifies another function' },
    { id: 5, level: 5, question: 'How do you handle multiple exceptions in one except block?', options: ['except (Err1, Err2):', 'except Err1 or Err2:', 'except Err1, Err2:', 'except [Err1, Err2]:'], answer: 'except (Err1, Err2):' },
  ]
};

router.get('/:language/next', (req, res) => {
  const { language } = req.params;
  const { step = 0 } = req.query;
  const questions = ASSESSMENT_QUESTIONS[language];

  if (!questions) return res.status(404).json({ message: 'Assessment not found' });

  const currentStep = parseInt(step);
  if (currentStep >= questions.length) {
    return res.json({ completed: true });
  }

  const question = questions[currentStep];
  res.json({
    id: question.id,
    question: question.question,
    options: question.options,
    step: currentStep
  });
});

router.post('/:language/submit', async (req, res) => {
  const { language } = req.params;
  const { questionId, answer, step } = req.body;
  const questions = ASSESSMENT_QUESTIONS[language];

  const question = questions.find(q => q.id === questionId);
  const isCorrect = question.answer === answer;

  const nextStep = parseInt(step) + 1;
  const completed = nextStep >= questions.length;

  let finalLevel = null;
  if (completed) {
    // Basic logic: level is based on how many they got right
    // In real app, this would be more adaptive
    finalLevel = Math.min(5, nextStep);
  }

  res.json({
    isCorrect,
    completed,
    nextStep,
    finalLevel
  });
});

module.exports = router;
