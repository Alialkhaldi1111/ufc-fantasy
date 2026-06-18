'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate?: Date;
  hours?: number;
  className?: string;
}

export function CountdownTimer({ targetDate, hours = 24, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = targetDate ?? new Date(Date.now() + hours * 60 * 60 * 1000);

    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate, hours]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <span className={`font-mono font-bold ${className}`}>
      {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
    </span>
  );
}
