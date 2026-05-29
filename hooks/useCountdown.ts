'use client';

import { useState, useEffect, useCallback } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

function computeCountdown(targetDate: Date): CountdownResult {
  const now = Date.now();
  const target = targetDate.getTime();
  const diff = Math.max(0, target - now);

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isExpired: false, totalSeconds };
}

export function useCountdown(date: Date | string | number): CountdownResult {
  const targetDate = date instanceof Date ? date : new Date(date);

  const [state, setState] = useState<CountdownResult>(() =>
    computeCountdown(targetDate)
  );

  const tick = useCallback(() => {
    setState(computeCountdown(targetDate));
  }, [targetDate]);

  useEffect(() => {
    if (state.isExpired) return;

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick, state.isExpired]);

  return state;
}
