import { useState } from 'react';
import { ACHIEVEMENT_MESSAGES, POINTS } from '@/lib/constants';

interface Achievement {
  title: string;
  description: string;
  emoji: string;
  points: number;
}

export const useAchievements = () => {
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showAchievement = (achievement: Achievement) => {
    setCurrentAchievement(achievement);
    setIsVisible(true);
  };

  const hideAchievement = () => {
    setIsVisible(false);
    setTimeout(() => setCurrentAchievement(null), 300); // Wait for animation
  };

  const showRandomMessage = () => {
    const randomMessage = ACHIEVEMENT_MESSAGES[Math.floor(Math.random() * ACHIEVEMENT_MESSAGES.length)];
    return randomMessage;
  };

  // Pre-defined achievements that can be triggered
  const triggerEarlyPlannerAchievement = () => {
    showAchievement({
      title: 'Early Planner',
      description: 'Planned an event 1 week ahead!',
      emoji: '📅',
      points: POINTS.EARLY_PLANNER,
    });
  };

  const triggerStreakAchievement = (streakCount: number) => {
    showAchievement({
      title: `${streakCount} Day Streak!`,
      description: 'Keep the momentum going!',
      emoji: '🔥',
      points: streakCount * POINTS.STREAK_BONUS,
    });
  };

  const triggerCompletionAchievement = () => {
    showAchievement({
      title: 'Task Complete!',
      description: showRandomMessage(),
      emoji: '✅',
      points: POINTS.COMPLETE_EVENT,
    });
  };

  const triggerSocialAchievement = () => {
    showAchievement({
      title: 'Social Butterfly',
      description: 'Created your 5th meetup!',
      emoji: '🦋',
      points: 50,
    });
  };

  return {
    currentAchievement,
    isVisible,
    hideAchievement,
    triggerEarlyPlannerAchievement,
    triggerStreakAchievement,
    triggerCompletionAchievement,
    triggerSocialAchievement,
    showAchievement,
  };
};