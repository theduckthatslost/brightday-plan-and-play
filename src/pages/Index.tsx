import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import ProfilePage from '@/components/ProfilePage';
import CalendarPage from '@/components/CalendarPage';
import BottomNavigation from '@/components/BottomNavigation';
import AddEventModal from '@/components/AddEventModal';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'calendar'>('profile');
  const [showAddEvent, setShowAddEvent] = useState(false);

  const handleAddEvent = () => {
    setShowAddEvent(true);
    // Add a little haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleCloseAddEvent = () => {
    setShowAddEvent(false);
  };

  // Show achievement toast when user completes actions
  useEffect(() => {
    const showWelcome = () => {
      setTimeout(() => {
        toast({
          title: "Welcome to BrightDay! 🌟",
          description: "Your smart calendar for a brighter future!",
        });
      }, 3000);
    };

    if (!showSplash) {
      showWelcome();
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="mobile-container">
      {/* Main Content */}
      <div className="min-h-screen">
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'calendar' && <CalendarPage />}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddEvent={handleAddEvent}
      />

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={showAddEvent}
        onClose={handleCloseAddEvent}
      />
    </div>
  );
};

export default Index;
