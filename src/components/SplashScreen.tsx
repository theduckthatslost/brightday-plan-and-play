import { useEffect, useState } from 'react';
import brightdayLogo from '@/assets/brightday-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center mobile-container transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center">
        <div className="animate-bounce-in">
          <img
            src={brightdayLogo}
            alt="BrightDay Logo"
            className="w-32 h-32 mx-auto mb-6 animate-float"
          />
        </div>
        <div className="animate-slide-up animation-delay-300">
          <h1 className="text-4xl font-bold text-primary mb-2">BrightDay</h1>
          <p className="text-lg text-muted-foreground">Your Smart Calendar</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;