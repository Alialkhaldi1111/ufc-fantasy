import { Lineup } from '@/types';

export const lineups: Lineup[] = [];

let nextId = 1;

export function addLineup(lineup: Omit<Lineup, 'id'>): Lineup {
  const newLineup: Lineup = { ...lineup, id: `lineup${nextId++}` };
  lineups.push(newLineup);
  return newLineup;
}

export function updateLineup(id: string, updates: Partial<Lineup>): Lineup | null {
  const idx = lineups.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  lineups[idx] = { ...lineups[idx], ...updates };
  return lineups[idx];
}

export function deleteLineup(id: string): boolean {
  const idx = lineups.findIndex((l) => l.id === id);
  if (idx === -1) return false;
  lineups.splice(idx, 1);
  return true;
}
