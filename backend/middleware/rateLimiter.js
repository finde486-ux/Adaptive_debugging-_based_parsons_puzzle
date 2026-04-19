const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: 'Too many requests, please try again later.'
});

const executionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: 'Too many code execution requests, please wait.'
});

module.exports = { generalLimiter, executionLimiter };
