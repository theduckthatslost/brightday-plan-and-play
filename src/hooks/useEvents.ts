import { useState, useEffect } from 'react';
import { Event, EventType } from '@/types';
import { useUserData } from './useUserData';

// Mock initial events
const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team sync',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    location: 'Conference Room A',
    type: 'work',
    emoji: '💼',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'React Workshop',
    description: 'Learning advanced React patterns',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time: '14:00',
    type: 'class',
    emoji: '📚',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Coffee with Sarah',
    description: 'Catch up over coffee',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // day after tomorrow
    time: '10:30',
    location: 'Central Perk',
    type: 'meetup',
    emoji: '☕',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('brightday-events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const { addPoints, updateStreak, updateBadgeProgress } = useUserData();

  useEffect(() => {
    localStorage.setItem('brightday-events', JSON.stringify(events));
  }, [events]);

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEvents(prev => [...prev, newEvent]);

    // Award points for planning ahead
    const eventDate = new Date(eventData.date);
    const today = new Date();
    const daysAhead = Math.floor((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysAhead > 0) {
      addPoints(10);
      if (daysAhead >= 7) {
        updateBadgeProgress('1'); // Early Planner badge
      }
    }

    // Update badge progress based on event type
    if (eventData.type === 'meetup') {
      updateBadgeProgress('3'); // Social Butterfly badge
    }

    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id
          ? { ...event, ...updates, updatedAt: new Date().toISOString() }
          : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const completeEvent = (id: string) => {
    setEvents(prev =>
      prev.map(event => {
        if (event.id === id && !event.completed) {
          // Award points for completing event
          addPoints(25);
          updateBadgeProgress('4'); // Goal Getter badge
          
          return { ...event, completed: true, updatedAt: new Date().toISOString() };
        }
        return event;
      })
    );
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const getUpcomingEvents = (limit: number = 5) => {
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter(event => event.date >= today && !event.completed)
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
      })
      .slice(0, limit);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    completeEvent,
    getEventsForDate,
    getUpcomingEvents,
  };
};