'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  hours?: number;
  targetDate?: Date;
  className?: string;
}

export default function CountdownTimer({ hours = 24, targetDate, className = '' }: CountdownTimerProps) {
  const getTarget = () => {
    if (targetDate) return targetDate.getTime();
    const stored = typeof window !== 'undefined' ? localStorage.getItem('apex-sale-end') : null;
    if (stored) return parseInt(stored);
    const end = Date.now() + hours * 60 * 60 * 1000;
    if (typeof window !== 'undefined') localStorage.setItem('apex-sale-end', String(end));
    return end;
  };

  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = getTarget();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={`flex items-center gap-1 font-mono font-bold ${className}`}>
      {[{ label: 'HRS', val: timeLeft.h }, { label: 'MIN', val: timeLeft.m }, { label: 'SEC', val: timeLeft.s }].map(
        ({ label, val }, i) => (
          <span key={label} className="flex items-center gap-1">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-lg min-w-[3ch] text-center">
              {pad(val)}
            </span>
            <span className="text-xs text-gray-400 mr-1">{label}</span>
            {i < 2 && <span className="text-red-500 text-xl">:</span>}
          </span>
        )
      )}
    </div>
  );
}
