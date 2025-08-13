import { User, Calendar, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: 'profile' | 'calendar';
  onTabChange: (tab: 'profile' | 'calendar') => void;
  onAddEvent: () => void;
}

const BottomNavigation = ({ activeTab, onTabChange, onAddEvent }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-border shadow-lg">
      <div className="flex items-center justify-around py-3 px-6">
        <button
          onClick={() => onTabChange('profile')}
          className={cn(
            'flex flex-col items-center space-y-1 transition-colors duration-200 btn-bounce',
            activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
          {activeTab === 'profile' && (
            <div className="absolute -bottom-1 w-8 h-1 bg-primary rounded-full" />
          )}
        </button>

        <button
          onClick={onAddEvent}
          className="fab-mini w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg btn-bounce"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={() => onTabChange('calendar')}
          className={cn(
            'flex flex-col items-center space-y-1 transition-colors duration-200 btn-bounce relative',
            activeTab === 'calendar' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs font-medium">Calendar</span>
          {activeTab === 'calendar' && (
            <div className="absolute -bottom-1 w-8 h-1 bg-primary rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;