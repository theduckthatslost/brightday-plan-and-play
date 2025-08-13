export type EventType = 'work' | 'class' | 'meetup' | 'personal';

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  type: EventType;
  emoji: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  points: number;
  level: number;
  streak: number;
  longestStreak: number;
  badges: Badge[];
  joinedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  emoji: string;
  achievedAt: string;
}

export type CalendarView = 'day' | 'week' | 'month';

export const EVENT_TYPE_CONFIG = {
  work: { emoji: '💼', color: 'work', label: 'Work' },
  class: { emoji: '📚', color: 'class', label: 'Class' },
  meetup: { emoji: '☕', color: 'meetup', label: 'Meetup' },
  personal: { emoji: '🧘‍♀️', color: 'personal', label: 'Personal' },
} as const;