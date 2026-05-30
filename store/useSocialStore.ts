'use client';
import { create } from 'zustand';

export interface ActivityItem {
  id: string;
  type: 'contest_entry' | 'lineup_submitted' | 'fight_result' | 'shoutout' | 'fighter_scored';
  userId: string;
  username: string;
  message: string;
  timestamp: number;
}

interface SocialStore {
  feed: ActivityItem[];
  addActivity: (item: Omit<ActivityItem, 'id' | 'timestamp'>) => void;
  postShoutout: (username: string, message: string) => void;
}

const seed: ActivityItem[] = [
  { id: '1', type: 'contest_entry', userId: 'u1', username: 'MMAfan99', message: 'MMAfan99 entered the UFC 315 Mega GPP ($10K prize pool)', timestamp: Date.now() - 120000 },
  { id: '2', type: 'lineup_submitted', userId: 'u2', username: 'BonesCrush', message: 'BonesCrush locked a lineup featuring Islam Makhachev & Ilia Topuria', timestamp: Date.now() - 300000 },
  { id: '3', type: 'shoutout', userId: 'u3', username: 'OctagonKing', message: 'Rakhmonov is going to SLEEP Muhammad in round 2. Book it 🔥', timestamp: Date.now() - 480000 },
  { id: '4', type: 'fighter_scored', userId: 'sys', username: 'OctaFight', message: 'Jon Jones is the highest projected fighter this week at 84 pts', timestamp: Date.now() - 660000 },
  { id: '5', type: 'contest_entry', userId: 'u4', username: 'KnockoutQueen', message: 'KnockoutQueen entered the UFC 315 Freeroll Contest', timestamp: Date.now() - 840000 },
  { id: '6', type: 'fight_result', userId: 'sys', username: 'OctaFight', message: 'RESULT: Dustin Poirier def. Justin Gaethje by KO R1 at UFC 314 🥊', timestamp: Date.now() - 86400000 },
];

let nextId = 100;

export const useSocialStore = create<SocialStore>((set) => ({
  feed: seed,

  addActivity: (item) =>
    set((s) => ({
      feed: [{ ...item, id: String(nextId++), timestamp: Date.now() }, ...s.feed].slice(0, 60),
    })),

  postShoutout: (username, message) =>
    set((s) => ({
      feed: [
        { id: String(nextId++), type: 'shoutout' as const, userId: 'me', username, message, timestamp: Date.now() },
        ...s.feed,
      ].slice(0, 60),
    })),
}));
