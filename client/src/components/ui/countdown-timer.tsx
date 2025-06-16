import { useState, useEffect } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Timer is complete
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    // Calculate immediately
    calculateTimeRemaining();
    
    // Then set up the interval
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    // Clean up
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  // Helper to pad with leading zeros
  const padWithZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="countdown-timer">
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="bg-primary/20 rounded-lg p-2 md:p-4 text-center">
          <p className="font-heading text-3xl md:text-5xl text-primary time-block">
            {padWithZero(timeRemaining.days)}
          </p>
          <p className="text-xs md:text-sm text-light-dark/70 font-technical">DAYS</p>
        </div>
        <div className="bg-primary/20 rounded-lg p-2 md:p-4 text-center">
          <p className="font-heading text-3xl md:text-5xl text-primary time-block">
            {padWithZero(timeRemaining.hours)}
          </p>
          <p className="text-xs md:text-sm text-light-dark/70 font-technical">HOURS</p>
        </div>
        <div className="bg-primary/20 rounded-lg p-2 md:p-4 text-center">
          <p className="font-heading text-3xl md:text-5xl text-primary time-block">
            {padWithZero(timeRemaining.minutes)}
          </p>
          <p className="text-xs md:text-sm text-light-dark/70 font-technical">MINUTES</p>
        </div>
        <div className="bg-primary/20 rounded-lg p-2 md:p-4 text-center">
          <p className="font-heading text-3xl md:text-5xl text-primary time-block">
            {padWithZero(timeRemaining.seconds)}
          </p>
          <p className="text-xs md:text-sm text-light-dark/70 font-technical">SECONDS</p>
        </div>
      </div>
    </div>
  );
}
