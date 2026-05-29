import { Contest } from '@/types';

export const contests: Contest[] = [
  {
    id: 'c1',
    eventId: 'e1',
    name: 'UFC 310 Grand Slam',
    type: 'PUBLIC',
    status: 'OPEN',
    entryFee: 10,
    prizePool: 50000,
    maxEntries: 10000,
    currentEntries: 3241,
    salaryCap: 50000,
    rosterSize: 6,
    isGuaranteed: true,
  },
  {
    id: 'c2',
    eventId: 'e1',
    name: 'UFC 310 Head-to-Head',
    type: 'HEAD_TO_HEAD',
    status: 'OPEN',
    entryFee: 5,
    prizePool: 9,
    maxEntries: 2,
    currentEntries: 0,
    salaryCap: 50000,
    rosterSize: 6,
    isGuaranteed: false,
  },
  {
    id: 'c3',
    eventId: 'e1',
    name: 'UFC 310 Free Contest',
    type: 'PUBLIC',
    status: 'OPEN',
    entryFee: 0,
    prizePool: 1000,
    maxEntries: 5000,
    currentEntries: 1892,
    salaryCap: 50000,
    rosterSize: 6,
    isGuaranteed: true,
  },
  {
    id: 'c4',
    eventId: 'e1',
    name: 'Champions Tournament',
    type: 'TOURNAMENT',
    status: 'UPCOMING',
    entryFee: 25,
    prizePool: 250000,
    maxEntries: 20000,
    currentEntries: 0,
    salaryCap: 50000,
    rosterSize: 6,
    isGuaranteed: true,
  },
];

let nextId = 5;

export function addContest(contest: Omit<Contest, 'id' | 'currentEntries' | 'isGuaranteed'>): Contest {
  const newContest: Contest = {
    ...contest,
    id: `c${nextId++}`,
    currentEntries: 0,
    isGuaranteed: false,
  };
  contests.push(newContest);
  return newContest;
}

export function updateContest(id: string, updates: Partial<Contest>): Contest | null {
  const idx = contests.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  contests[idx] = { ...contests[idx], ...updates };
  return contests[idx];
}

export function deleteContest(id: string): boolean {
  const idx = contests.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  contests.splice(idx, 1);
  return true;
}
