import { useState, useEffect } from 'react';
import { User, Badge } from '@/types';

// Mock badges data
const INITIAL_BADGES: Badge[] = [
  {
    id: '1',
    name: 'Early Planner',
    description: 'Plan an event 1 week in advance',
    emoji: '📅',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: '2',
    name: 'Streak Master',
    description: 'Maintain a 7-day planning streak',
    emoji: '🔥',
    progress: 0,
    maxProgress: 7,
  },
  {
    id: '3',
    name: 'Social Butterfly',
    description: 'Create 5 meetup events',
    emoji: '🦋',
    progress: 0,
    maxProgress: 5,
  },
  {
    id: '4',
    name: 'Goal Getter',
    description: 'Complete 50 events',
    emoji: '🎯',
    progress: 0,
    maxProgress: 50,
  },
];

export const useUserData = () => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('brightday-user');
    if (saved) {
      return JSON.parse(saved);
    }
    
    return {
      id: '1',
      name: 'Roam',
      avatar: '👨‍💼',
      email: 'roam@brightday.com',
      points: 125,
      level: 2,
      streak: 3,
      longestStreak: 7,
      badges: INITIAL_BADGES,
      joinedAt: new Date().toISOString(),
    };
  });

  useEffect(() => {
    localStorage.setItem('brightday-user', JSON.stringify(user));
  }, [user]);

  const addPoints = (points: number) => {
    setUser(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      };
    });
  };

  const updateStreak = (increment: boolean = true) => {
    setUser(prev => {
      const newStreak = increment ? prev.streak + 1 : Math.max(0, prev.streak - 1);
      const newLongestStreak = Math.max(prev.longestStreak, newStreak);
      
      return {
        ...prev,
        streak: newStreak,
        longestStreak: newLongestStreak,
      };
    });
  };

  const updateBadgeProgress = (badgeId: string, increment: number = 1) => {
    setUser(prev => ({
      ...prev,
      badges: prev.badges.map(badge => {
        if (badge.id === badgeId && badge.maxProgress && !badge.unlockedAt) {
          const newProgress = Math.min((badge.progress || 0) + increment, badge.maxProgress);
          return {
            ...badge,
            progress: newProgress,
            unlockedAt: newProgress >= badge.maxProgress ? new Date().toISOString() : undefined,
          };
        }
        return badge;
      }),
    }));
  };

  return {
    user,
    setUser,
    addPoints,
    updateStreak,
    updateBadgeProgress,
  };
};