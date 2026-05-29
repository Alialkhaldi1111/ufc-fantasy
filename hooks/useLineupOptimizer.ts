'use client';

import { useState, useCallback } from 'react';
import { Fighter } from '@/types';

interface UseLineupOptimizerResult {
  optimize: (fighters: Fighter[], salaryCap: number, rosterSize?: number) => Fighter[];
  optimizing: boolean;
  lastOptimized: Fighter[] | null;
}

/**
 * Greedy knapsack optimizer: sorts fighters by projected points per dollar,
 * then greedily adds fighters that fit under the salary cap.
 * Falls back to brute-force for small sets where it can afford to.
 */
function greedyOptimize(
  fighters: Fighter[],
  salaryCap: number,
  rosterSize: number
): Fighter[] {
  if (fighters.length === 0) return [];

  // Score per dollar for efficiency ranking
  const ranked = [...fighters].sort((a, b) => {
    const effA = a.projectedPoints / Math.max(a.salary, 1);
    const effB = b.projectedPoints / Math.max(b.salary, 1);
    return effB - effA;
  });

  const selected: Fighter[] = [];
  let remaining = salaryCap;

  for (const fighter of ranked) {
    if (selected.length >= rosterSize) break;
    if (fighter.salary <= remaining) {
      selected.push(fighter);
      remaining -= fighter.salary;
    }
  }

  // If we couldn't fill all slots with greedy, try to fill remaining slots
  // with the cheapest fighters that fit
  if (selected.length < rosterSize) {
    const selectedIds = new Set(selected.map((f) => f.id));
    const rest = ranked
      .filter((f) => !selectedIds.has(f.id))
      .sort((a, b) => a.salary - b.salary);

    for (const fighter of rest) {
      if (selected.length >= rosterSize) break;
      if (fighter.salary <= remaining) {
        selected.push(fighter);
        remaining -= fighter.salary;
      }
    }
  }

  return selected;
}

export function useLineupOptimizer(): UseLineupOptimizerResult {
  const [optimizing, setOptimizing] = useState(false);
  const [lastOptimized, setLastOptimized] = useState<Fighter[] | null>(null);

  const optimize = useCallback(
    (fighters: Fighter[], salaryCap: number, rosterSize = 6): Fighter[] => {
      setOptimizing(true);
      try {
        const result = greedyOptimize(fighters, salaryCap, rosterSize);
        setLastOptimized(result);
        return result;
      } finally {
        setOptimizing(false);
      }
    },
    []
  );

  return { optimize, optimizing, lastOptimized };
}
