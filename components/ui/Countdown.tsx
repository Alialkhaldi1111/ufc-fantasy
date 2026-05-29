'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - Date.now();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

interface CountdownProps {
  targetDate: string;
  onExpire?: () => void;
  compact?: boolean;
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-lg border border-[#1e2a3a] bg-[#0a0f1a] shadow-[inset_0_0_10px_rgba(57,255,20,0.05)]">
        <span
          className="text-2xl font-mono font-bold tabular-nums text-[#39FF14]"
          style={{ textShadow: '0 0 10px rgba(57,255,20,0.6)' }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-gray-500">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="mb-5 self-center text-xl font-bold text-[#39FF14]/60"
      style={{ textShadow: '0 0 8px rgba(57,255,20,0.4)' }}
    >
      :
    </span>
  );
}

export function Countdown({ targetDate, onExpire, compact }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const next = calculateTimeLeft(targetDate);
      setTimeLeft(next);
      if (
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        setExpired(true);
        onExpire?.();
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate, onExpire]);

  if (expired) {
    return (
      <span className="text-sm font-semibold text-red-400 animate-pulse">
        Event Started
      </span>
    );
  }

  if (compact) {
    const { days, hours, minutes, seconds } = timeLeft;
    return (
      <span className="font-mono text-sm font-semibold text-[#39FF14]">
        {days > 0 && `${days}d `}
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </span>
    );
  }

  return (
    <div className="flex items-end gap-1.5">
      <TimeBox value={timeLeft.days} label="Days" />
      <Separator />
      <TimeBox value={timeLeft.hours} label="Hrs" />
      <Separator />
      <TimeBox value={timeLeft.minutes} label="Min" />
      <Separator />
      <TimeBox value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
