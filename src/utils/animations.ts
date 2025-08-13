// Animation utility functions for BrightDay

export const slideUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const bounceInVariants = {
  initial: { scale: 0.3, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const confettiAnimation = () => {
  if (typeof window !== 'undefined') {
    // Simple confetti effect simulation
    const confetti = document.createElement('div');
    confetti.innerHTML = '🎉';
    confetti.style.position = 'fixed';
    confetti.style.top = '50%';
    confetti.style.left = '50%';
    confetti.style.transform = 'translate(-50%, -50%)';
    confetti.style.fontSize = '2rem';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.animation = 'confetti 1s ease-out forwards';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      document.body.removeChild(confetti);
    }, 1000);
  }
};

export const hapticFeedback = (pattern: number | number[] = 50) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};