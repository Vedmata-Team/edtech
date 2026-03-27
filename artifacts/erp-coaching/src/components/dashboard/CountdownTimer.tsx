import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

interface CountdownTimerProps {
  targetDate: string;
  onExpire?: () => void;
}

export function CountdownTimer({ targetDate, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const secondsLeft = differenceInSeconds(new Date(targetDate), new Date());
      
      if (secondsLeft <= 0) {
        setIsExpired(true);
        setTimeLeft({ h: 0, m: 0, s: 0 });
        if (onExpire) onExpire();
        return;
      }

      setTimeLeft({
        h: Math.floor(secondsLeft / 3600),
        m: Math.floor((secondsLeft % 3600) / 60),
        s: secondsLeft % 60
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  if (!timeLeft) return <div className="h-6 w-24 bg-muted animate-pulse rounded-md"></div>;

  if (isExpired) {
    return <span className="text-destructive font-semibold text-sm">Started</span>;
  }

  let containerClass = "flex items-center gap-1.5 font-mono text-sm font-semibold px-3 py-1 rounded-lg ";
  let pulseClass = "";

  if (timeLeft.h === 0) {
    containerClass += "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-500 border border-red-200 dark:border-red-900 ";
    pulseClass = "animate-pulse";
  } else if (timeLeft.h < 24) {
    containerClass += "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-500 border border-orange-200 dark:border-orange-900 ";
  } else {
    containerClass += "bg-secondary text-secondary-foreground ";
  }

  return (
    <div className={containerClass}>
      <span className={pulseClass}>{String(timeLeft.h).padStart(2, '0')}</span><span className={pulseClass}>:</span>
      <span className={pulseClass}>{String(timeLeft.m).padStart(2, '0')}</span><span className={pulseClass}>:</span>
      <span className={`text-primary ${pulseClass}`}>{String(timeLeft.s).padStart(2, '0')}</span>
    </div>
  );
}
