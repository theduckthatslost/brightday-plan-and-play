import { Calendar, Clock, Trophy, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useUserData } from '@/hooks/useUserData';
import { useEvents } from '@/hooks/useEvents';
import { EVENT_TYPE_CONFIG } from '@/types';

const ProfilePage = () => {
  const { user } = useUserData();
  const { getUpcomingEvents } = useEvents();
  const upcomingEvents = getUpcomingEvents(3);

  const levelProgress = ((user.points % 100) / 100) * 100;
  const unlockedBadges = user.badges.filter(badge => badge.unlockedAt);

  return (
    <div className="p-6 pb-24 space-y-6">
      {/* Profile Header */}
      <Card className="card-gradient border-0">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-2xl animate-float">
              {user.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Hello, {user.name}! 👋</h1>
              <p className="text-muted-foreground">Level {user.level}</p>
            </div>
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Level {user.level + 1}</span>
              <span className="font-semibold">{user.points % 100}/100 XP</span>
            </div>
            <Progress value={levelProgress} className="progress-glow" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="card-gradient border-0">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-orange-300 to-yellow-300 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-primary">{user.streak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-primary">{user.points}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="card-gradient border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Clock className="w-5 h-5" />
            Upcoming Plans
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No upcoming events</p>
          ) : (
            upcomingEvents.map((event) => {
              const config = EVENT_TYPE_CONFIG[event.type];
              return (
                <div
                  key={event.id}
                  className={`p-3 rounded-xl card-${event.type} animate-slide-up`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{event.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-primary">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {config.label}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="card-gradient border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Trophy className="w-5 h-5" />
            Achievements ({unlockedBadges.length}/{user.badges.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-xl transition-all duration-300 ${
                badge.unlockedAt
                  ? 'bg-gradient-to-r from-yellow-100 to-amber-100 badge-shine'
                  : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{badge.emoji}</span>
                  <div>
                    <h3
                      className={`font-semibold ${
                        badge.unlockedAt ? 'text-amber-700' : 'text-muted-foreground'
                      }`}
                    >
                      {badge.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {badge.description}
                    </p>
                  </div>
                </div>
                {badge.unlockedAt && (
                  <Badge className="bg-amber-500 text-white">Unlocked!</Badge>
                )}
              </div>
              {badge.maxProgress && !badge.unlockedAt && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>
                      {badge.progress || 0}/{badge.maxProgress}
                    </span>
                  </div>
                  <Progress
                    value={((badge.progress || 0) / badge.maxProgress) * 100}
                    className="h-2"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;