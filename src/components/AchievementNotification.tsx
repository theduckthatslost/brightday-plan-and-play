import { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { confettiAnimation, hapticFeedback } from '@/utils/animations';

interface AchievementNotificationProps {
  isVisible: boolean;
  title: string;
  description: string;
  emoji: string;
  points: number;
  onClose: () => void;
}

const AchievementNotification = ({
  isVisible,
  title,
  description,
  emoji,
  points,
  onClose
}: AchievementNotificationProps) => {
  useEffect(() => {
    if (isVisible) {
      confettiAnimation();
      hapticFeedback([100, 50, 100]);
      
      // Auto-close after 5 seconds
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
      <Card className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-0 shadow-2xl max-w-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-700" />
              <span className="font-bold text-amber-700">Achievement Unlocked!</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-amber-500/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-bounce">
              {emoji}
            </div>
            <div>
              <h3 className="font-bold text-amber-800">{title}</h3>
              <p className="text-sm text-amber-700 mb-1">{description}</p>
              <div className="flex items-center space-x-1">
                <span className="text-lg">🌟</span>
                <span className="font-semibold text-amber-800">+{points} points!</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AchievementNotification;