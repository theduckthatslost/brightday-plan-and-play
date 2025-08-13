export const POINTS = {
  PLAN_AHEAD: 10,
  COMPLETE_EVENT: 25,
  STREAK_BONUS: 5,
  EARLY_PLANNER: 20, // 1 week ahead
} as const;

export const LEVEL_THRESHOLDS = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
} as const;

export const ACHIEVEMENT_MESSAGES = [
  "🌟 Amazing progress!",
  "🎉 You're on fire!",
  "✨ Keep it up!",
  "🚀 Fantastic work!",
  "💪 You're unstoppable!",
  "🎯 Goal achieved!",
  "🏆 Excellence unlocked!",
] as const;

export const MOBILE_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
} as const;