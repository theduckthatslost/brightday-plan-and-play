import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEvents } from '@/hooks/useEvents';
import { CalendarView, EVENT_TYPE_CONFIG } from '@/types';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const { getEventsForDate, completeEvent } = useEvents();

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const formatDateForApi = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const calendarDays = getCalendarDays();
  const today = formatDateForApi(new Date());
  const todayEvents = getEventsForDate(today);

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Calendar Header */}
      <Card className="card-gradient border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">
              {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="btn-bounce"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="btn-bounce"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {/* Week days header */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((date, index) => {
              const dateStr = formatDateForApi(date);
              const dayEvents = getEventsForDate(dateStr);
              const isCurrentMonthDay = isCurrentMonth(date);
              const isTodayDate = isToday(date);

              return (
                <div
                  key={index}
                  className={cn(
                    'h-12 flex flex-col items-center justify-center text-sm relative cursor-pointer rounded-lg transition-colors duration-200 btn-bounce',
                    isTodayDate
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold'
                      : isCurrentMonthDay
                      ? 'text-primary hover:bg-muted/50'
                      : 'text-muted-foreground/50'
                  )}
                >
                  <span>{date.getDate()}</span>
                  {dayEvents.length > 0 && (
                    <div className="flex space-x-1 absolute -bottom-1">
                      {dayEvents.slice(0, 3).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            event.type === 'work' && 'bg-blue-400',
                            event.type === 'class' && 'bg-purple-400',
                            event.type === 'meetup' && 'bg-orange-400',
                            event.type === 'personal' && 'bg-yellow-400'
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Events */}
      <Card className="card-gradient border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            📅 Today's Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayEvents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🌟</div>
              <p className="text-muted-foreground">No events today</p>
              <p className="text-sm text-muted-foreground">Enjoy your free day!</p>
            </div>
          ) : (
            todayEvents.map((event) => {
              const config = EVENT_TYPE_CONFIG[event.type];
              return (
                <div
                  key={event.id}
                  className={cn(
                    'p-4 rounded-xl animate-slide-up transition-all duration-300',
                    `card-${event.type}`,
                    event.completed && 'opacity-60'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{event.emoji}</span>
                      <div>
                        <h3 className={cn(
                          'font-semibold',
                          event.completed && 'line-through text-muted-foreground'
                        )}>
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {event.time} {event.location && `• ${event.location}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.description}
                    </p>
                  )}

                  {!event.completed && (
                    <Button
                      size="sm"
                      onClick={() => completeEvent(event.id)}
                      className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white btn-bounce"
                    >
                      Mark Complete ✨
                    </Button>
                  )}
                  
                  {event.completed && (
                    <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                      ✅ Completed
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;