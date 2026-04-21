const calculateXP = (result, level) => {
  const multipliers = { 1: 1, 2: 1.5, 3: 2, 4: 2.5, 5: 3 };
  const multiplier = multipliers[level] || 1;

  switch (result) {
    case 'first_try':
      return 100 * multiplier;
    case 'with_hints':
      return 60 * multiplier;
    case 'after_skip':
      return 20 * multiplier;
    case 'assessment':
      return 15;
    default:
      return 0;
  }
};

const checkStreak = (lastActivityDate) => {
  if (!lastActivityDate) return true;
  const last = new Date(lastActivityDate);
  const today = new Date();

  // Set times to midnight for comparison
  last.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today - last);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays === 1; // Streak increments if exactly 1 day since last activity
};

module.exports = { calculateXP, checkStreak };
